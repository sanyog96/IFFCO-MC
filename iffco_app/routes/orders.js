const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

router.route("/")
    .get(catchAsync(orders.index))

router.route("/:orderid/damage")
    .post(upload.single('image'), catchAsync(orders.damageForm))

router.route("/damages")
    .get(catchAsync(orders.damageIndex))

router.route("/whatsapp")
    .post(catchAsync(orders.serveWhatsapp))

router.route("/:contact/new")
    .get(catchAsync(orders.orderForm))
    .post(catchAsync(orders.placeOrder))

router.route("/:orderid/invoice")
    .get(catchAsync(orders.invoice))

router.route("/:orderid/track")
    .get(catchAsync(orders.track))

router.route("/:orderid/otp")
    .get(catchAsync(orders.otp))
    .post(catchAsync(orders.verifyOtp))

module.exports = router;