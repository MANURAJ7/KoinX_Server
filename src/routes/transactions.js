const express = require("express");
const getUserTransactions = require("../controllers/transactionsController");
const router = express.Router();

// Route to fetch user transactions
router.get("/:address", getUserTransactions);

module.exports = router;
