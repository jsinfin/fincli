const Table = require('cli-table2')
const ora = require('ora')
const moment = require('moment')
const apiRequest = require('../utils/api')
const chalk = require('chalk')

module.exports = async (args) => {
  const spinner = ora().start()
  const symbol = args.symbol || args.s
  let stockPriceData = null

  try {
    apiRequest.baseStockPriceAPI(symbol)
      .then(response => {
        stockPriceData = response
        spinner.stop()

        console.log(`${symbol}: ${stockPriceData}`)
        console.log(`
        `)
      })

  } catch (err) {
    spinner.stop()
    console.log(err.message)
  }
}
