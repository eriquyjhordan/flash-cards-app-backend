const axios = require('axios');

const api = axios.create({
  baseUrl: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-us',
});

module.exports = api;
