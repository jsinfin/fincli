const chalk = require('chalk')
const b = chalk.bold
const u = chalk.underline
const d = chalk.dim

const cmdMenus = {
  index: `
    ${b(`fincli`)}
    url: https://github.com/jsinfin/fincli
    version: 1.0.0
    
    ${b(`> fincli`)} [command] <options>
    
    ${d(`Commands:`)}
    
    market               show market data
    quote                show quote data
    crypto               get cryptocurrencies
    price                get price of stick quote
    collection           get a collection of stocks per sector
    -h, -help            pass options to get help, /ie: 'fincli market -help'

    ${d(`Options:`)}
    
    -v, -version         show fincli package version
    -h, -help            show fincli help menu for a command
    -symbol, -s          get individual symbol data for crypto
    -mic, -m             get individual mic data for market
    -sector, -s          get collection based on sector

    ${b(`Thanks!`)}
  
    ${d(`A big thanks to IEX Trading for the open API that powers all the data:
    https://iextrading.com/
    https://iextrading.com/developer/`)}`,

  market: `
    ${d(`Basic Usage:`)}
    fincli market <options>

    -m, mic              get individual MIC (Market Identifier Code) data`,

  crypto: `
    ${d(`Basic Usage:`)}
    fincli crypto <options> 

    -s, -symbol          get individual symbol data`,

  price: `
    ${d(`Basic Usage:`)}
    fincli price <options> 

    -s, -symbol          get individual price data for symbol`,

  collection: `
    ${d(`Basic Usage:`)}
    fincli collection <options> 

    -s, -sector          get collection based on sector`
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(cmdMenus[subCmd] || cmdMenus.index)
}

