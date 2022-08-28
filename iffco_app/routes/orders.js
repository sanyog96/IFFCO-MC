const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');
const catchAsync = require('../utils/catchAsync');

router.route("/")
    .get(catchAsync(orders.index))

module.exports = router;