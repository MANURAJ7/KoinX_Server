const mongoose = require("mongoose");

const EthPriceSchema = new mongoose.Schema({
  inr: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("EthereumPrice", EthPriceSchema);
