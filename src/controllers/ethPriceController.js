const axios = require("axios");
const EthereumPrice = require("../models/ethPrice");

const fetchAndStoreEthereumPrice = async () => {
  try {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr";
    const response = await axios.get(url);

    const priceInINR = response.data.ethereum.inr;

    const newEthereumPrice = new EthereumPrice({ inr: priceInINR });
    await newEthereumPrice.save();

    console.log(`Ethereum price stored: ₹${priceInINR}`);
  } catch (err) {
    console.error("Error fetching Ethereum price:", err.message);
  }
};

module.exports = fetchAndStoreEthereumPrice;
