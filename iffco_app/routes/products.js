const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const catchAsync = require('../utils/catchAsync');

router.route("/")
    .get(catchAsync(products.index));

router.route("/new")
    .get(catchAsync(products.renderForm))
    .post(catchAsync(products.createProduct));

router.route("/category")
    .get(catchAsync(products.renderCategoryForm))
    .post(catchAsync(products.createCategory));

module.exports = router;