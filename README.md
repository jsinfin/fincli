## FINCLI

Initial version of a node CLI to app to find financial market, stock and related data...

## INSTALLATION

`npm install fincli -g`

## USAGE

Open your terminal, iTerm, Bash etc and start running commands.

Commands:

```bash
fincli
url: https://github.com/jsinfin/fincli
version: 1.0.0

> fincli [command] <options>

Commands:

market               show market data
quote                show quote data
crypto               get cryptocurrencies
price                get price of stick quote
collection           get a collection of stocks per sector
-h, -help            pass options to get help, /ie: 'fincli market -help'

Options:

-v, -version         show fincli package version
-h, -help            show fincli help menu for a command
-symbol, -s          get individual symbol data for crypto
-mic, -m             get individual mic data for market`
``` 


## ROADMAP

* add gui support for terminal
* add utils for sizing, pagination, long sets of data
* add filters for request params
* extend basics with more commands
* extend basics with more options
* real-time data in terminal challenges
