const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')
const utils = require('../utils/utils')

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
      chalk.bold.green('SYMBOL'),
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
    if (symbol) {
      console.log('symbol arg passed')
      spinner.stop()

      // @todo: refactor to use just one loop
      apiRequest.baseCryptoAPI()
        .then(response => {
          cryptoData = response
          spinner.stop()

          const mySymbol = utils.filterCryptoBySymbol(cryptoData, symbol)

          for (let i=0; i < mySymbol.length; i++) {
            CryptoTable.push([
              chalk.bold.white(mySymbol[i].companyName.toUpperCase()),
              chalk.bold.white(mySymbol[i].symbol.toUpperCase()),
              chalk.white(mySymbol[i].open),
              chalk.white(mySymbol[i].close),
              chalk.white(mySymbol[i].high),
              chalk.white(mySymbol[i].low),
              chalk.white(mySymbol[i].latestPrice),
              chalk.white(mySymbol[i].previousClose),
              chalk.bold.white(mySymbol[i].change)
            ])
          }
          console.log(CryptoTable.toString())
          console.log(`
        `)
        })
    } else {
      apiRequest.baseCryptoAPI()
        .then(response => {
          cryptoData = response
          spinner.stop()

          for (let i=0; i < cryptoData.length; i++) {
            CryptoTable.push([
              chalk.white(cryptoData[i].companyName.toUpperCase()),
              chalk.white(cryptoData[i].symbol.toUpperCase()),
              chalk.white(cryptoData[i].open),
              chalk.white(cryptoData[i].close),
              chalk.white(cryptoData[i].high),
              chalk.white(cryptoData[i].low),
              chalk.white(cryptoData[i].latestPrice),
              chalk.white(cryptoData[i].previousClose),
              chalk.white(cryptoData[i].change)
            ])
          }
          console.log(CryptoTable.toString())
          console.log(`
        `)
        })
    }

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
