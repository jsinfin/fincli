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

  const MarketTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      moment().format('MMMM Do YYYY'),
      'TAPEA',
      'TAPEB',
      'TAPEC',
      'TOTAL',
      'MARKET PERCENT'
    ]
  })

  const MarketTotalTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      'TOTAL',
      'TAPEA',
      'TAPEB',
      'TAPEC',
      'TOTAL',
      'MARKET PERCENT'
    ]
  })

  try {
    fetchIEXMarket()
      .then(response => {
        marketData = response

        for (let j=0; j < marketData.length; j++) {
          tapeATotal += marketData[j].tapeA,
          tapeBTotal += marketData[j].tapeB,
          tapeCTotal += marketData[j].tapeC
        }

        console.log(tapeATotal)

        for (let i=0; i < marketData.length; i++) {
          MarketTable.push([
            marketData[i].venueName,
            marketData[i].tapeA,
            marketData[i].tapeB,
            marketData[i].tapeC,
            marketData[i].tapeA + marketData[i].tapeB + marketData[i].tapeC,
            marketData[i].marketPercent
          ])
        }

        MarketTotalTable.push([
          tapeATotal,
          tapeBTotal,
          tapeCTotal
        ])

        console.log(MarketTable.toString())
        console.log(MarketTotalTable.toString())
      })

    spinner.stop()
  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
