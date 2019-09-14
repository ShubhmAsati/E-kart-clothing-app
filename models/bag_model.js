var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = require('./product_model');
var product_data = Schema({
	product_id:{
		type:Schema.Types.ObjectId,
		ref : product
	},
	size:{
		type:String,
		required:[true,"please select a size"]
	}
});

var bag_data = Schema({
user_id : {
type : Schema.Types.ObjectId,
ref: 'users',
required: [true,'please provide a valid object Id'],
unique:[true,"user already exist "]
},
product : {
type:[product_data]
},
creation_date : {
type: Date,
default: Date.now()
}

});

module.exports = mongoose.model('bag',bag_data);