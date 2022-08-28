const Order = require('../models/order');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports.index = async (req, res) => {
    const orders = await Order.find({});
    res.render('orders/index', {orders});
}

module.exports.serveWhatsapp = async (req, res) => {
    console.log(req.body);
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'Hello there! To place an order, visit at below link: \n https://agrosupply.herokuapp.com/',
         to: req.body.From
       })
      .then(message => console.log(message));
}