const fs = require("fs");
const readline = require("readline");

module.exports = {
  /**
   *This function is to load the transactions present in the CSV file
   * @param file - path of the transactions file
   * @returns {Promise}
   */
  loadTransactions: async (file) => {
    const transactions = [];

    //create an interface and provide input as a file stream

    const rl = readline.createInterface({
      input: fs.createReadStream(file),
    });

    // Read each line in CSV and store it in transactions array
    rl.on("line", (line) => {
      const [timestamp, transactionType, token, amount] = line.split(",");
      transactions.push({
        timestamp: parseInt(timestamp),
        type: transactionType,
        token,
        amount: parseFloat(amount),
      });
    });

    //
    return new Promise((resolve, reject) => {
      rl.on("close", () => {
        resolve(transactions);
      });
      rl.on("error", (error) => {
        reject(error);
      });
    });
  },

  /**
   * This function is to calculate balance for all the token types present in the given
   * set of transactions
   * @param {Object} transactions
   * @returns {Object} balances - balance for all the token types present in the transactions
   */
  calculateBalanceForEachToken: (transactions) => {
    let balances = {};
    transactions.forEach((tx) => {
      if (tx.type === "DEPOSIT") {
        if (balances[tx.token] === undefined) {
          balances[tx.token] = tx.amount;
        } else {
          balances[tx.token] += tx.amount;
        }
      } else if (tx.type === "WITHDRAWAL") {
        balances[tx.token] -= tx.amount;
      }
    });
    return balances;
  },

  /**
   * This function is to calculate balance for a specific token, which is given as a input to the user
   * @param {Object} transactions
   * @param {string} token - token for which the balances are to be calculated in the transaction
   * @returns {Object} balance - balance for a given token
   */
  calculateBalanceByToken: (transactions, token) => {
    let balance = 0;
    transactions.forEach((tx) => {
      if (tx.token === token && tx.type === "DEPOSIT") {
        balance += tx.amount;
      } else if (tx.token === token && tx.type === "WITHDRAWAL") {
        balance -= tx.amount;
      }
    });
    return balance;
  },

  /**
   * This function is to calculate balance on a specific date, which is given as a input to the user
   * @param {Object} transactions
   * @param {String} date - epoch time for the date input given by the user in MM-DD-YYYY Format
   * @returns  {Object} balances - balance for  the transactions done on the given date
   */
  calculateBalanceByDate: (transactions, date) => {
    let balances = {};
    transactions.forEach((tx) => {
      if ((tx.timestamp = date)) {
        if (tx.type === "DEPOSIT") {
          if (balances[tx.token] === undefined) {
            balances[tx.token] = tx.amount;
          } else {
            balances[tx.token] += tx.amount;
          }
        } else if (tx.type === "WITHDRAWAL") {
          balances[tx.token] -= tx.amount;
        }
      }
    });
    return balances;
  },

  /**
   * This function is to calculate balance on a specific date and
   * a specific token,  which is given as a input to the user
   * @param {Object} transactions
   * @param {String} token - token for which the balances are to be calculated in the transaction
   * @param {String} date -epoch time for the date input given by the user in MM-DD-YYYY Format
   * @returns
   */
  calculateBalanceByDateAndToken: (transactions, token, date) => {
    let balance = 0;
    transactions.forEach((tx) => {
      if ((tx.timestamp = date)) {
        if (tx.token === token && tx.type === "DEPOSIT") {
          balance += tx.amount;
        } else if (tx.token === token && tx.type === "WITHDRAWAL") {
          balance -= tx.amount;
        }
      }
    });
    return balance;
  },

  /**
   * This function is to calculate portfolio values for the given set of transactions based on the
   * chosen request.
   * @param {Object| String} balances - balance value for the token/token in the given transaction
   * @param {Object | String} rates - exchange rate/rates for the token/tokens
   * @param {String} receivedToken - optional parameter if , the portfolio is to be calculated for specific token
   * @returns {Object} portfolio of the tokens for the given transaction filter
   */
  calculatePortfolio: (balances, rates, receivedToken = "") => {
    let portfolio = {};
    if (isNaN(balances)) {
      for (const token in balances) {
        const balance = balances[token];
        const rate = rates[token];
        if (balance !== 0 && rate !== undefined) {
          portfolio[token] = balance * rate;
        }
      }
    } else {
      portfolio[receivedToken] = balances * rates;
    }

    return portfolio;
  },
};
