const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const symbol = args.symbol || args.s
  let quoteData = null

  const CryptoTable = new Table({
    chars: {
      'mid': '',
      'left-mid': '',
      'mid-mid': '',
      'right-mid': ''
    },
    head: [
      chalk.bold.green('NAME'),
      chalk.bold.green('OPEN'),
      chalk.bold.green('CLOSE'),
      chalk.bold.green('HIGH'),
      chalk.bold.green('LOW'),
      chalk.bold.green('LATEST PRICE'),
      chalk.bold.green('PREVIOUS CLOSE'),
      chalk.bold.green('CHANGE'),
    ]
  })

  try {
    apiRequest.baseCryptoAPI()
      .then(response => {
        quoteData = response
        spinner.stop()

        for (let i=0; i < quoteData.length; i++) {
          CryptoTable.push([
            chalk.bold.white(quoteData[i].companyName.toUpperCase()),
            chalk.white(quoteData[i].open),
            chalk.white(quoteData[i].close),
            chalk.white(quoteData[i].high),
            chalk.white(quoteData[i].low),
            chalk.white(quoteData[i].latestPrice),
            chalk.white(quoteData[i].previousClose),
            chalk.bold.white(quoteData[i].change)
          ])
        }
        console.log(CryptoTable.toString())
        console.log(`
        `)
      })

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
