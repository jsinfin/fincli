const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const sector = args.symbol || args.s
  let stockSectorData = null

  const StockSectorTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      chalk.bold.green('SYMBOL'),
      chalk.bold.green('PRIMARY EXCHANGE'),
      chalk.bold.green('OPEN'),
      chalk.bold.green('PREV CLOSE'),
      chalk.bold.green('CLOSE'),
      chalk.bold.green('HIGH'),
      chalk.bold.green('LOW'),
      chalk.bold.green('LATEST PRICE'),
      chalk.bold.green('VOLUME'),
      chalk.bold.green('CHANGE'),
      chalk.bold.green('52 WEEK HIGH'),
      chalk.bold.green('52 WEEK LOW')
    ]
  })

  try {
    apiRequest.baseStockCollection(sector)
      .then(response => {
        stockSectorData = response
        spinner.stop()

        for (let i = 0; i < stockSectorData.length; i++) {
          StockSectorTable.push([
            chalk.bold.white(stockSectorData[i].symbol.toUpperCase()),
            chalk.white(stockSectorData[i].primaryExchange),
            chalk.white(stockSectorData[i].open),
            chalk.white(stockSectorData[i].previousClose),
            chalk.white(stockSectorData[i].close),
            chalk.white(stockSectorData[i].high),
            chalk.white(stockSectorData[i].low),
            chalk.white(stockSectorData[i].latestPrice),
            chalk.white(stockSectorData[i].latestVolume),
            chalk.white(stockSectorData[i].change),
            chalk.white(stockSectorData[i].week52High),
            chalk.white(stockSectorData[i].week52Low)
          ])
        }

        console.log(StockSectorTable.toString())
        console.log(`
        `)
      })

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
