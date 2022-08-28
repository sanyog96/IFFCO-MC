const express = require('express');
const router = express.Router();
const partners = require('../controllers/partners');
const catchAsync = require('../utils/catchAsync');

router.route("/")
    .get(catchAsync(partners.index))
    .post(catchAsync(partners.create));

module.exports = router;