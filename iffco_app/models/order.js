const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prodSchema = new Schema({
    prodId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    qty: {
      type: Number,
      required: true
    }
});

const orderSchema = new Schema({
    partner : {
        type: Schema.Types.ObjectId,
        ref: 'partner'
    },
    // products:[prodSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('order', orderSchema);