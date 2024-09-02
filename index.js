const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const transactions = require("./src/routes/transactions");
const expenses = require("./src/routes/expenses");
const fetchAndStoreEthereumPrice = require("./src/controllers/ethPriceController");
const cron = require("node-cron");

dotenv.config(); // Load env variables

connectDB(); // connecting to Mongodb server

const app = express();

app.use(express.json());

const startServer = async () => {
  await fetchAndStoreEthereumPrice(); // Fetching the price immediately when the server starts

  cron.schedule("*/10 * * * *", async () => {
    console.log("Fetched price at:", Date.now());
    await fetchAndStoreEthereumPrice();
  });

  app.use("/api/transactions", transactions);
  app.use("/api/expenses", expenses);

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

startServer();
