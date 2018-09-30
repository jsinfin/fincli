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
    -h, -help            pass options to get help, /ie: 'fincli market -help'

    ${d(`Options:`)}
    
    -v, -version         show fincli package version
    -h, -help            show fincli help menu for a command
    -symbol, -s          get individual symbol data for crypto
    -mic, -m             get individual mic data for market`,

  market: `
    ${d(`Basic Usage:`)}
    fincli market <options>

    -m, mic              get individual MIC (Market Identifier Code) data`,

  crypto: `
    ${d(`Basic Usage:`)}
    fincli crypto <options> 

    -s, -symbol          get individual symbol data`
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(cmdMenus[subCmd] || cmdMenus.index)
}

