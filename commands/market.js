const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const fetchIEXMarket = require('../utils/api')

module.exports = async (args) => {
  const spinner = ora().start()
  const MarketTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      moment().format('MMMM Do YYYY'),
      'TapeA',
      'TapeB',
      'TapeC',
      'Total',
      'Market Percent'
    ]
  })

  try {
    const mic = args.mic || args.m
    let marketData

    fetchIEXMarket()
      .then(response => {
        console.log(response)
        marketData = response

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
        console.log(MarketTable.toString())
      })

    spinner.stop()
  } catch (err) {
    spinner.stop()

    console.error(err)
  }
}
