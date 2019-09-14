var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = require('./product_model');
var user = require('./user_model');
var wishlist_data = Schema({
user_id : {
type : Schema.Types.ObjectId,
ref: user,
required: [true,'please provide a valid object Id'],
unique:[true,"user already exist "]
},
product_id : {
type:[{type:Schema.Types.ObjectId,ref: product}]
},
creation_date : {
type: Date,
default: Date.now()
}

});
module.exports = mongoose.model('wishlist',wishlist_data);