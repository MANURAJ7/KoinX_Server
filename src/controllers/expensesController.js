const Transaction = require("../models/transactions");
const EthPrice = require("../models/ethPrice");
const fetchAndStoreEthereumPrice = require("../controllers/ethPriceController");

const getUserExpenses = async (req, res) => {
  try {
    const { address } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 transactions per page
    const skip = (page - 1) * limit;

    console.log(limit, page);

    // getting ethprice from doc
    let ethPriceDoc = await EthPrice.findOne().sort({ _id: -1 }).limit(1);
    let ethPriceInINR = ethPriceDoc ? ethPriceDoc.inr : null;

    if (!ethPriceInINR) {
      fetchAndStoreEthereumPrice();
      ethPriceDoc = await EthPrice.findOne().sort({ _id: -1 }).limit(1);
      ethPriceInINR = ethPriceDoc ? ethPriceDoc.inr : null;
      if (!ethPriceInINR) {
        return res
          .status(500)
          .json({ error: "Ethereum price not available in DB ..." });
      }
    }

    // Fetching user transaction from Transactions doc
    const userTransactions = await Transaction.findOne({ address });

    if (!userTransactions) {
      return res
        .status(404)
        .json({ error: "No transactions found for this address" });
    }

    console.log(userTransactions);

    // Paginate transactions
    const paginatedTransactions = userTransactions.transactions.slice(
      skip,
      skip + limit
    );

    // Calculate total expense for the paginated transactions
    let totalExpense = 0;
    const transactions = paginatedTransactions.map((tx) => {
      const expense = (tx.gasUsed * tx.gasPrice) / 1e18; // Convert to Ether
      totalExpense += expense;
      return {
        transaction_hash: tx.hash,
        expense: expense, // Convert to INR
      };
    });

    res.json({
      ethPrice: ethPriceInINR,
      totalExpense: totalExpense,
      transactions,
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getUserExpenses;
