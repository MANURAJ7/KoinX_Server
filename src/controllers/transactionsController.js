const axios = require("axios");
const Transaction = require("../models/transactions");

const getUserTransactions = async (req, res) => {
  try {
    const { address } = req.params;

    // Check if the address already has transactions stored
    let existingTransactions = await Transaction.findOne({ address });

    if (existingTransactions) {
      return res.json({ transactions: existingTransactions.transactions });
    }

    // Fetch transactions from Etherscan if not in database
    const apiKey = process.env.ETHSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;

    const response = await axios.get(url);
    const transactions = response.data.result;

    // Store the transactions in MongoDB
    const newTransaction = new Transaction({
      address,
      transactions,
    });

    await newTransaction.save();

    res.json(newTransaction.transactions);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getUserTransactions;
