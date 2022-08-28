const Order = require('../models/order');

module.exports.index = async (req, res) => {
    const orders = await Order.find({});
    res.render('orders/index', {orders});
}

module.exports.serveWhatsapp = async (req, res) => {
    console.log(req.body);
}