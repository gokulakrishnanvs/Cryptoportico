const axios = require("axios");

module.exports = {
  /**
   * This function is to consume API to fetch the exchange rate for a particular token
   * @param {String} token - token for which the exchange rates are to be fetched
   * @returns {String} - exxhange rate for the token in USD
   */
  getExchangeRates: async (token) => {
    try {
      const response = await axios.get(process.env.API_URL + "/price", {
        params: { fsym: token.toUpperCase(), tsyms: "USD" },
      });
      return response.data.USD;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  /**
   * This function is to consume API to fetch the exchange rate for a particular token on a given date
   * @param {String} token -token for which the exchange rates are to be fetched
   * @param {String} date - date on which the exchange rates are to be fetched for the given token
   * @returns {String} - exxhange rate for the token in USD
   */
  getExchangeRatesByDate: async (token, date) => {
    try {
      const response = await axios.get(process.env.API_URL + "/dayAvg", {
        params: { fsym: token.toUpperCase(), tsym: "USD", toTs: date },
      });
      return response.data.USD;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};
