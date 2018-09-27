const cmdMenus = {
  index: `
    fincli 1.0.0
    url: https://github.com/jsinfin/fincli
    
    Basic Commands:
    fincli [command] <options>
    
    market ............. show market data
    version ............ show fincli package version
    help ............... show fincli help menu for a command
    config ............. path to your config file`,

  market: `
    Basic Usage:
    fincli market <options>

    --mic, -m ..... get MIC as a param`,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(cmdMenus[subCmd] || cmdMenus.index)
}
