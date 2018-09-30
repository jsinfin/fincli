const fetch = require('isomorphic-unfetch')
const BASE_URL = `https://api.iextrading.com/1.0/`
const marketAPI = `market`
const crypto = 'crypto'

let baseMarketData
let baseCryptoData

module.exports = {
  baseMarketAPI: async() => {
    let response = await fetch(`${BASE_URL}${marketAPI}`)
    baseMarketData = await response.json()
    return baseMarketData
  },
  baseCryptoAPI: async() => {
    console.log(`${BASE_URL}${marketAPI}/${crypto}`)
    let response = await fetch(`${BASE_URL}/stock/${marketAPI}/${crypto}`)
    baseCryptoData = await response.json()
    return baseCryptoData
  }
}

