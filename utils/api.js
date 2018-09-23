const fetch = require('isomorphic-unfetch')

// async function
module.exports = async () => {
  let response = await fetch('https://api.iextrading.com/1.0/market')
  let data = await response.json();
  // only proceed once second promise is resolved
  return data
}

