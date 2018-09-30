const fetch = require('isomorphic-unfetch')
const BASE_URL = `https://api.iextrading.com/1.0/`
const marketAPI = `market`
const crypto = 'crypto'
const quote = 'quote'

let baseMarketData = null
let baseCryptoData = null
let baseStockQuoteData = null

module.exports = {
  baseMarketAPI: async() => {
    let response = await fetch(`${BASE_URL}${marketAPI}`)
    baseMarketData = await response.json()
    return baseMarketData
  },
  baseCryptoAPI: async() => {
    let response = await fetch(`${BASE_URL}/stock/${marketAPI}/${crypto}`)
    baseCryptoData = await response.json()
    return baseCryptoData
  },
  baseStockQuoteAPI: async(symbol) => {
    let response = await fetch(`${BASE_URL}/stock/${symbol}/${quote}`)
    baseStockQuoteData = await response.json()
    return baseStockQuoteData
  }
}

