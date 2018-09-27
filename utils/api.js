const fetch = require('isomorphic-unfetch')
const BASE_URL = `https://api.iextrading.com/1.0/`
const marketAPI = `market`

// async function
module.exports = async () => {
  let response = await fetch(`${BASE_URL}${marketAPI}`)
  let data = await response.json()
  // only proceed once second promise is resolved
  return data
}

