const Order = require('../models/order');
const Partner = require('../models/partner');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.index = async (req, res) => {
    const orders = await Order.find({}).populate('partner');
    res.render('orders/index', {orders});
}

module.exports.serveWhatsapp = async (req, res) => {
    contactNo = req.body.From.slice(-10);
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello there! To place an order, visit at below link:\nhttps://e74e-103-232-241-147.in.ngrok.io/orders/' + contactNo + '/new',
         to: req.body.From
       })
      .then(message => console.log(message));
}

module.exports.orderForm = async (req, res) => {
  const {contact} = req.params;
  partner = await Partner.findOne({contact});
  console.log(partner)
  res.render('orders/newOrder', {partner});
}

module.exports.placeOrder = async (req, res) => {
  const {contact} = req.params;
  partnerDb = await Partner.findOne({contact});
  const order = new Order({partner : partnerDb._id});
  await order.save();
  req.flash('success', 'Successfully Placed Order');
    res.redirect('/');
}