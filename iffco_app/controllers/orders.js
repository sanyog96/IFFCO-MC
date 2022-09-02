const Order = require('../models/order');
const Partner = require('../models/partner');
const Product = require('../models/product');
const qr = require('qrcode');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.index = async (req, res) => {
    const orders = await Order.find({}).populate('partner').populate('products.prodId');
    res.render('orders/index', {orders});
}

module.exports.serveWhatsapp = async (req, res) => {
    contactNo = req.body.From.slice(-10);
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello there! To place an order, visit at below link:\nhttps://agrosupply.herokuapp.com/orders/' + contactNo + '/new',
         to: req.body.From
       })
      .then(message => console.log(message));
}

module.exports.orderForm = async (req, res) => {
  const {contact} = req.params;
  partner = await Partner.findOne({contact});
  products = await Product.find({});
  res.render('orders/newOrder', {partner, products});
}

module.exports.placeOrder = async (req, res) => {
  const {contact} = req.params;
  partnerDb = await Partner.findOne({contact});
  xs = req.body.products[0];
  var productsCart = [];
  for (var i = 0; i < xs['prodId'].length; i++) {
    if (xs['qty'][i] > 0){
      productsCart.push({"prodId" : xs['prodId'][i], "qty" : xs['qty'][i]}) 
    } 
  }
  const order = new Order({partner : partnerDb._id, products : productsCart});
  const savedOrder = await order.save();
  
  const myOrder = await Order.findOne({_id : savedOrder._id}).populate('partner').populate('products.prodId');

  string = '\n';

  for (var i = 0; i < myOrder.products.length; i++) {
    if (myOrder.products[i].qty > 0){
       string += myOrder.products[i].prodId.name + " : " + myOrder.products[i].qty + "\n"
    } 
  }

  message = 'Thank you for choosing IFFCO-MC!\n\nOrder Id : '+savedOrder._id+ '\n\nOrders : ' + string + '\nBilling Name : '+partnerDb.name+'\nBilling Address : '+partnerDb.address.location+'\nDated : '+savedOrder.date;
  message += '\n\n Get your invoice at : https://agrosupply.herokuapp.com/orders/' + savedOrder._id + '/invoice';

  client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: message,
         to: 'whatsapp:+91'+contact
       })
      .then(message => console.log(message));
  req.flash('success', 'Successfully Placed Order');
  res.redirect('/orders/'+savedOrder._id+'/invoice');
}

module.exports.invoice = async (req, res) => {
  const {orderid} = req.params;
  const order = await Order.findOne({_id : orderid}).populate('partner').populate('products.prodId');
  url = 'https://agrosupply.herokuapp.com/orders/' + order._id + '/track';
  qr.toDataURL(url, function (err, url) {
    res.render('orders/invoice', {order, url});
  });
}

module.exports.track = async (req, res) => {
  const {orderid} = req.params;
  const order = await Order.findOne({_id : orderid}).populate('partner').populate('products.prodId');
  res.render('orders/track', {order});
}