const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const symbol = args.symbol || args.s
  let cryptoData = null

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
        cryptoData = response
        spinner.stop()

        for (let i=0; i < cryptoData.length; i++) {
          CryptoTable.push([
            chalk.bold.white(cryptoData[i].companyName.toUpperCase()),
            chalk.white(cryptoData[i].open),
            chalk.white(cryptoData[i].close),
            chalk.white(cryptoData[i].high),
            chalk.white(cryptoData[i].low),
            chalk.white(cryptoData[i].latestPrice),
            chalk.white(cryptoData[i].previousClose),
            chalk.bold.white(cryptoData[i].change)
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
