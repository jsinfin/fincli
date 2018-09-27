const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const fetchIEXMarket = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const mic = args.mic || args.m
  let marketData = null
  let tapeATotal = 0
  let tapeBTotal = 0
  let tapeCTotal = 0
  let marketPercentTotal = 0

  const MarketTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      chalk.bold.green(moment().format('MMMM Do YYYY')),
      chalk.bold.green('TAPEA'),
      chalk.bold.green('TAPEB'),
      chalk.bold.green('TAPEC'),
      chalk.bold.underline.green('TOTAL'),
      chalk.bold.green('MARKET PERCENT')
    ]
  })

  const MarketTotalTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    }
  })

  try {
    fetchIEXMarket()
      .then(response => {
        marketData = response

        for (let j=0; j < marketData.length; j++) {
          tapeATotal += marketData[j].tapeA,
          tapeBTotal += marketData[j].tapeB,
          tapeCTotal += marketData[j].tapeC,
          marketPercentTotal += marketData[j].marketPercent
        }

        console.log(tapeATotal)

        for (let i=0; i < marketData.length; i++) {
          MarketTable.push([
            chalk.bold.white(marketData[i].venueName),
            chalk.white(marketData[i].tapeA),
            chalk.white(marketData[i].tapeB),
            chalk.white(marketData[i].tapeC),
            chalk.bold.white(marketData[i].tapeA + marketData[i].tapeB + marketData[i].tapeC),
            chalk.white(marketData[i].marketPercent)
          ])
        }

        MarketTotalTable.push([
          chalk.bold.underline.green('TOTALS'),
          chalk.bold.white(`TAPEA:`) + tapeATotal,
          `TAPEB: ${tapeBTotal}`,
          `TAPEC: ${tapeCTotal}`,
          `MARKET PERCENT: ${marketPercentTotal}`
        ])

        console.log(MarketTable.toString())
        console.log(MarketTotalTable.toString())
        console.log()
      })

    spinner.stop()
  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
