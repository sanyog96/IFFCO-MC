const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');
const catchAsync = require('../utils/catchAsync');

router.route("/")
    .get(catchAsync(orders.index))

router.route("/whatsapp")
    .post(catchAsync(orders.serveWhatsapp))

router.route("/:contact/new")
    .get(catchAsync(orders.orderForm))
    .post(catchAsync(orders.placeOrder))

module.exports = router;