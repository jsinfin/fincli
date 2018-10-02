const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const symbol = args.symbol || args.s
  let stockQuoteData = null

  const StockQuoteTable = new Table({
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
    apiRequest.baseStockQuoteAPI(symbol)
      .then(response => {
        stockQuoteData = response
        spinner.stop()

        StockQuoteTable.push([
          chalk.white(stockQuoteData.symbol.toUpperCase()),
          chalk.white(stockQuoteData.primaryExchange),
          chalk.white(stockQuoteData.open),
          chalk.white(stockQuoteData.previousClose),
          chalk.white(stockQuoteData.close),
          chalk.white(stockQuoteData.high),
          chalk.white(stockQuoteData.low),
          chalk.white(stockQuoteData.latestPrice),
          chalk.white(stockQuoteData.latestVolume),
          chalk.white(stockQuoteData.change),
          chalk.white(stockQuoteData.week52High),
          chalk.white(stockQuoteData.week52Low)
        ])

        console.log(StockQuoteTable.toString())
        console.log(`
        `)
      })

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
