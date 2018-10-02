const fetch = require('isomorphic-unfetch')
const BASE_URL = `https://api.iextrading.com/1.0/`
const market = `market`
const crypto = `crypto`
const quote = `quote`
const collection = `collection`
const sector = `sector`

let baseMarketData = null
let baseCryptoData = null
let baseStockQuoteData = null
let baskStockPriceData = null

module.exports = {
  baseMarketAPI: async() => {
    let response = await fetch(`${BASE_URL}${market}`)
    baseMarketData = await response.json()
    return baseMarketData
  },
  baseCryptoAPI: async() => {
    let response = await fetch(`${BASE_URL}/stock/${market}/${crypto}`)
    baseCryptoData = await response.json()
    return baseCryptoData
  },
  baseStockQuoteAPI: async(symbol) => {
    let response = await fetch(`${BASE_URL}/stock/${symbol}/${quote}`)
    baseStockQuoteData = await response.json()
    return baseStockQuoteData
  },
  baseStockPriceAPI: async(symbol) => {
    let response = await fetch(`${BASE_URL}/stock/${symbol}/price`)
    baskStockPriceData = await response.json()
    return baskStockPriceData
  },
  baseStockCollection: async(sector) => {
    let response = await fetch(`${BASE_URL}/stock/${market}/${collection}/sector?collectionName=${sector}`)
    baskStockPriceData = await response.json()
    return baskStockPriceData
  }
}

