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

router.route("/:orderid/invoice")
    .get(catchAsync(orders.invoice))

router.route("/:orderid/track")
    .get(catchAsync(orders.track))

module.exports = router;