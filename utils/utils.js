module.exports = {
  filterCryptoBySymbol: function(data, sym) {
    if (typeof sym !== 'string') {
      throw new Error('arg must be a string')
    }
    return data.filter(s => s.symbol === sym)
  },
  filterMarketByMic: function(data, mic) {
    if (typeof mic !== 'string') {
      throw new Error('arg must be a string')
    }
    return data.filter(m => m.mic === mic)
  }
}
