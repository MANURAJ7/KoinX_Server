const express = require("express");
const getUserExpenses = require("../controllers/expensesController");
const router = express.Router();

router.get("/:address", getUserExpenses);

module.exports = router;
