const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    location: {
      type: String,
      required: true
    },
    state:{
      type: String,
      required: true
    },
    pincode: {
      type: Number,
      required: true
    }
  });

const partnerSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    address: addressSchema,
    contact:{
        type: Number,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('partner', partnerSchema);