const mongoose = require("mongoose");

const TransactionsSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  transactions: [
    {
      blockNumber: { type: String, required: true },
      timeStamp: { type: String, required: true },
      hash: { type: String, required: true, unique: true },
      nonce: { type: String, required: true },
      blockHash: { type: String, required: true },
      transactionIndex: { type: String, required: true },
      from: { type: String, required: true },
      to: { type: String, default: null },
      value: { type: String, required: true },
      gas: { type: String, required: true },
      gasPrice: { type: String, required: true },
      isError: { type: String, required: true },
      txreceipt_status: { type: String, required: true },
      input: { type: String, required: true },
      contractAddress: { type: String, default: null },
      cumulativeGasUsed: { type: String, required: true },
      gasUsed: { type: String, required: true },
      confirmations: { type: String, required: true },
      methodId: { type: String, default: null },
      functionName: { type: String, default: null },
    },
  ],
});

module.exports = mongoose.model("Transaction", TransactionsSchema);
