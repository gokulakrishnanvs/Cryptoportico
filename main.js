require("dotenv").config(); // Load environment variables from .env file
const transactions = require("./transactions");
const api = require("./api");
const readline = require("readline");

//Load CSV data
transactions
  .loadTransactions(process.env.TRANSACTIONS_FILE)
  .then((txs) => {
    // Define functions

    /**
     * This function is to calculate and display the latest portfolio value of the
     * tokens present in the given transaction
     * @returns portfolio
     */
    const getLatestPortfolioValue = async () => {
      console.log("Fetching latest portfolio value...\n");

      const tokens = process.env.TOKENS.split(",");
      const rates = {};
      // Get current exchange rates for all tokens
      for (const token of tokens) {
        const rate = await api.getExchangeRates(token);
        if (rate !== null) {
          rates[token] = rate;
        }
      }
      // Calculate balance for each token
      const balances = transactions.calculateBalanceForEachToken(txs);

      // Calculate portfolio value in USD for each token
      const portfolio = transactions.calculatePortfolio(balances, rates);

      //Display the portfolio value
      console.log("latest portfolio values are \n");

      for (const token of tokens) {
        console.log(token, " ", portfolio[token], " USD");
      }

      return portfolio;
    };

    /**
     * This function is to calculate and display the  portfolio value present in the given transaction
     *  of token specified by the user
     * @param {String} token - token for which portfolio value has to be calculated
     * @returns
     */
    const getPortfolioValueByToken = async (token) => {
      console.log("Fetching portfolio value for the given token...");

      // Get exchange rates for the given token
      const rates = await api.getExchangeRates(token);
      if (rates === null) {
        console.log(`Unable to get exchange rates for ${token}.`);
        return null;
      }

      // Calculate balance for  the given token
      const balance = transactions.calculateBalanceByToken(txs, token);
      if (balance === 0) {
        console.log(`You don't have any ${token}.`);
        return null;
      }

      // Calculate portfolio value in USD  on the given token
      const portfolio = transactions.calculatePortfolio(balance, rates, token);

      //Display the portfolio value
      console.log("portfolio value for", token, "is ", portfolio[token], "USD");
      return portfolio;
    };

    /**
     * This function is to calculate and display the  portfolio value present in the given transaction
     *  on the date specified by the user
     * @param {String} dateString
     * @returns
     */
    const getPortfolioValueByDate = async (dateString) => {
      console.log("Fetching portfolio value for the given date...\n");

      let date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log("Invalid date.");
        return null;
      } else {
        date = Date.parse(date);
      }
      const tokens = process.env.TOKENS.split(",");
      const rates = {};
      // Get exchange rates for all tokens on the given date
      for (const token of tokens) {
        const rate = await api.getExchangeRatesByDate(token, date);
        if (rate !== null) {
          rates[token] = rate;
        }
      }
      // Calculate balance for each token on the given date
      const balances = transactions.calculateBalanceByDate(txs, date);

      // Calculate portfolio value in USD for each token on the given date
      const portfolio = transactions.calculatePortfolio(balances, rates);

      //Display the portfolio value
      console.log("latest portfolio values by the date ", dateString, "are \n");

      for (const token of tokens) {
        console.log(token, " ", portfolio[token], " USD");
      }

      return portfolio;
    };

    /**
     * This function is to calculate and display the  portfolio value present in the given transaction
     *  on the date  and token specified by the user
     * @param {String} dateString
     * @param {String} token
     * @returns
     */
    const getPortfolioValueByDateAndToken = async (dateString, token) => {
      console.log("Fetching portfolio value for the given date and token");

      let date = new Date(dateString);
      if (isNaN(date.getTime())) {
        console.log("Invalid date.");
        return null;
      } else {
        date = Date.parse(date);
      }

      // Get exchange rates for the given date and token
      const rates = await api.getExchangeRatesByDate(token, date);
      if (rates === null) {
        console.log(`Unable to get exchange rates for ${token}.`);
        return null;
      }

      // Calculate balance for each token on the given date and token
      const balance = transactions.calculateBalanceByDateAndToken(
        txs,
        token,
        date
      );
      if (balance === 0) {
        console.log(`You don't have any ${token}.`);
        return null;
      }

      // Calculate portfolio value in USD  on the given date and token
      const portfolio = transactions.calculatePortfolio(balance, rates, token);

      //Display the portfolio value

      console.log(
        "portfolio value for",
        token,
        "by the date",
        dateString,
        " is ",
        portfolio[token],
        "USD"
      );
      return portfolio;
    };

    /**
     * ---------------------------------------------------------------------------
     * User Interface for the console program starts here
     * --------------------------------------------------------------------------
     */

    /**
     * This function is to display the welcome message for the Cryptoportico Users
     */
    const welcomePrompt = () => {
      console.clear();
      console.log(
        "\x1b[36m%s\x1b[0m",
        "╭────────────────────────────────CRYPTOPORTICO ─────────────────────────────────╮"
      );
      console.log(
        "│                                                                             │"
      );
      console.log(
        "│  Welcome to Cryptoporto, your one stop Portfolio management console         │"
      );
      console.log(
        "│  Please Ensure you have you transactions in a CSV file, loaded in the same  │"
      );
      console.log(
        "│  Folder as the console App and Enjoy seamless calculations automated!       │"
      );
      console.log(
        "│                                                                             │"
      );
      console.log(
        "│  Note: while calculating portifolio value for larger number of transactions,│"
      );
      console.log(
        "│  run the following command, to ensure JS doest run into heap memory  issue  │"
      );
      console.log(
        '│   $env:NODE_OPTIONS="--max-old-space-size=8192"                             │'
      );
      console.log(
        "│                                                                             │"
      );
      console.log(
        "│  Main menu                                                                  │"
      );
      console.log(
        "│  1. Get latest portfolio value                                              │"
      );
      console.log(
        "│  2. Get portfolio value by token",
        "Available token are: ",
        process.env.TOKENS,
        "         │"
      );
      console.log(
        "│  3. Get portfolio value by date                                             │"
      );
      console.log(
        "│  4. Get portfolio value by date and token",
        "Available token are: ",
        process.env.TOKENS,
        "│"
      );
      console.log(
        "│  5. Exit                                                                    │"
      );
      console.log(
        "╰─────────────────────────────────────────────────────────────────────────────╯"
      );
    };

    /**
     * This Function is a start-up function that is triggered once the program is executed
     */
    const start = () => {
      //Create a readline interface , for the user to interact with the program
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      /**
       * This Function is to initialize the user interface to capture the user input
       * via the readline interface created
       * @param {readline} rl
       */
      const InitializeUserInterface = (rl) => {
        welcomePrompt();

        rl.question("Choose an option: ", async (answer) => {
          switch (answer) {
            case "1":
              await getLatestPortfolioValue();
              promptReturnToMainMenu(rl);
              break;
            case "2":
              rl.question("Enter token: ", async (token) => {
                await getPortfolioValueByToken(token);
                promptReturnToMainMenu(rl);
              });
              break;
            case "3":
              rl.question("Enter date (MM-DD-YYYY): ", async (date) => {
                await getPortfolioValueByDate(date);
                promptReturnToMainMenu(rl);
              });
              break;
            case "4":
              rl.question("Enter token: ", (token) => {
                rl.question("Enter date (MM-DD-YYYY): ", async (date) => {
                  await getPortfolioValueByDateAndToken(date, token);
                  promptReturnToMainMenu(rl);
                });
              });
              break;
            case "5":
              rl.close();
              break;
            default:
              console.log("Please Choose From the Available options!");
              break;
          }
        });
      };

      /**
       * This function is to reinitialize the interface to have a clean user interaction experience
       * which is called , if the user wishes to keep using the program
       * @param {readline} rl
       */
      const reInitializeUserInterface = (rl) => {
        rl.close();
        const newRL = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        InitializeUserInterface(newRL);
      };

      /**
       * This Function is to prompt the user , requesting a response ,  whether the user
       * wishes to continue using the application.
       * @param {readline} rl
       */
      const promptReturnToMainMenu = (rl) => {
        rl.question("Do you wish to continue? (Y/N) ", (answer) => {
          if (answer.toLowerCase() === "y") {
            console.clear();
            reInitializeUserInterface(rl);
          } else {
            rl.close();
          }
        });
      };

      //calling the initialization function to lay the interface for use.
      InitializeUserInterface(rl);
    };

    //starting up the program.
    start();
  })
  .catch((err) => {
    console.error(err);
  });
