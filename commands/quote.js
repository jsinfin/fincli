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
      chalk.bold.green('52 WEEK LOW'),
    ]
  })

  try {
    apiRequest.baseStockQuoteAPI(symbol)
      .then(response => {
        stockQuoteData = response
        spinner.stop()

        console.log(stockQuoteData)

        for (let i=0; i < stockQuoteData.length; i++) {
          StockQuoteTable.push([
            chalk.bold.white(stockQuoteData[i].symbol.toUpperCase()),
            chalk.white(stockQuoteData[i].primaryExchange),
            chalk.white(stockQuoteData[i].open),
            chalk.white(stockQuoteData[i].previousClose),
            chalk.white(stockQuoteData[i].close),
            chalk.white(stockQuoteData[i].high),
            chalk.white(stockQuoteData[i].low),
            chalk.bold.white(stockQuoteData[i].latestPrice),
            chalk.bold.white(stockQuoteData[i].latestVolume),
            chalk.bold.white(stockQuoteData[i].change),
            chalk.bold.white(stockQuoteData[i].week52High),
            chalk.bold.white(stockQuoteData[i].week52Low)
          ])
        }
        console.log(StockQuoteTable.toString())
        console.log(`
        `)
      })

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
