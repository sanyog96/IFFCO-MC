const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    prodId:{
      type: String
    },
    name: {
      type: String,
      required: true
    },
    category : {
      type: Schema.Types.ObjectId,
      ref: 'category'
    },
    description:{
      type: String
    }
});

module.exports = mongoose.model('product', productSchema);