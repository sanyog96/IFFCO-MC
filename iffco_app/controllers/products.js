const Category = require('../models/category');
const Product = require('../models/product');

module.exports.index = async (req, res) => {
    const products = await Product.find({}).populate('category');
    res.render('products/index',{products});
}

module.exports.renderCategoryForm = async (req, res) => {
    res.render('products/newCategoryForm');
}

module.exports.renderForm = async (req, res) => {
    const categories = await Category.find({});
    res.render('products/newProductForm', {categories});
}

module.exports.createProduct = async(req, res) => {
    const product = new Product({... req.body.product, category: req.body.category});
    await product.save();
    req.flash('success', 'Successfully Created New Product');
    res.redirect('/products');
}

module.exports.createCategory = async (req, res) => {
    const category = new Category({ ... req.body.category});
    await category.save();
    req.flash('success', 'Successfully created new category');
    res.redirect('/products/category');
}