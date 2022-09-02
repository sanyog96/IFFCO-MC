const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const damageSchema = new Schema({
    orderId : {
        type: Schema.Types.ObjectId,
        ref: 'order'
    },
    date: {
        type: Date,
        default: Date.now
    },
    image : ImageSchema
});

module.exports = mongoose.model('damage', damageSchema);