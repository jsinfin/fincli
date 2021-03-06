const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')
const d = chalk.dim
const utils = require('../utils/utils')

module.exports = async (args) => {
  utils.getTermSize()
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
      chalk.bold.green('MIC'),
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
    if (mic) {
      spinner.stop()

      // @todo: refactor to use just one loop
      apiRequest.baseMarketAPI()
        .then(response => {
          marketData = response
          spinner.stop()
          console.log(mic)

          const myMic = utils.filterMarketByMic(marketData, mic)

          for (let i=0; i < myMic.length; i++) {
            let myMicTotal = myMic[i].tapeA + myMic[i].tapeB + myMic[i].tapeC
            MarketTable.push([
              chalk.bold.white(myMic[i].venueName),
              chalk.bold.white(myMic[i].mic),
              chalk.white(myMic[i].tapeA.toLocaleString()),
              chalk.white(myMic[i].tapeB.toLocaleString()),
              chalk.white(myMic[i].tapeC.toLocaleString()),
              chalk.bold.white(myMicTotal.toLocaleString()),
              chalk.white(myMic[i].marketPercent + ' ' + '%')
            ])
          }
          console.log(MarketTable.toString())
          console.log(`
        `)
        })
    } else {
      utils.getTermSize(console.log())
      apiRequest.baseMarketAPI()
        .then(response => {
          marketData = response
          spinner.stop()

          for (let j = 0; j < marketData.length; j++) {
            tapeATotal += marketData[j].tapeA,
              tapeBTotal += marketData[j].tapeB,
              tapeCTotal += marketData[j].tapeC,
              marketPercentTotal += marketData[j].marketPercent
          }

          for (let i = 0; i < marketData.length; i++) {
            let marketDataTotal = marketData[i].tapeA + marketData[i].tapeB + marketData[i].tapeC
            MarketTable.push([
              chalk.bold.white(marketData[i].venueName),
              chalk.bold.white(marketData[i].mic),
              chalk.white(marketData[i].tapeA.toLocaleString()),
              chalk.white(marketData[i].tapeB.toLocaleString()),
              chalk.white(marketData[i].tapeC.toLocaleString()),
              chalk.bold.white(marketDataTotal.toLocaleString()),
              chalk.white(marketData[i].marketPercent + ' ' + '%')
            ])
          }

          MarketTotalTable.push([
            chalk.bold.underline.green('TOTALS'),
            chalk.bold.white(`TAPEA: `) + tapeATotal.toLocaleString(),
            chalk.bold.white(`TAPEB: `) + tapeBTotal.toLocaleString(),
            chalk.bold.white(`TAPEC: `) + tapeCTotal.toLocaleString(),
            chalk.bold.white(`MARKET PERCENT: `) + marketPercentTotal.toLocaleString()
          ])

          console.log(MarketTable.toString())
          console.log(MarketTotalTable.toString())
          console.log(`${d(`This endpoint: 'https://api.iextrading.com/1.0/stock/market/crypto' returns near real
time traded volume on the markets. Market data is captured by the IEX system from approximately 
7:45 a.m. to 5:15 p.m. ET.`)}`)
          console.log(``)
        })
    }
  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
