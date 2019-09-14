var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
product_data = new Schema({
product_id:{
		type:Schema.Types.ObjectId,
		required:[true,"product id required"],
		ref:'products'
		},
quantity:{
		type: Number,
		required:[true,"product quantity required"],
		min:[0,"Cannot be lesser than zero"]
		},
size:{
		type:String,
		required:[true,'Please provide a size'],
		match:[/^[m]{0,1}|[s]{0,1}|[l]{0,1}|[xl]{0,1}|[xxl]{0,1}$/,"Please fill a valid size"]
		},
product_price:{
		type: String,
		required : [true,"product price required"],
		match: [/^\d+$/,"Please fill a valid price"]
		},
reason_for_return:{
	type:String,
	required:[true,"please give a reason fo return"]
		},
order_accepted_by_us:{
	type:Boolean,
		},
reason_of_decline:{
	type:String,
		}
		
});
var return_data = new Schema({
	_id: Schema.Types.ObjectId,
	old_order_id:{
		type:Schema.Types.ObjectId,
		required:[true,"please provide previous order id"]
		},
	user_id:{
		type:Schema.Types.ObjectId,
		trim : true,
		required: [true,"User Id required"],
		ref:'users'
		},
	products:{
		type:[{type:product_data,required:[true,"atleast one product is required"]}]
		},
	order_type:{
		type:String,
		default:'return'
		},
	order_placed_date:{
		type:Date,
		default:Date.now
		},
	order_picked_date:{
		type:Date
		},
	order_reached_to_hub_date:{
		type:Date
		},
	order_dispatched_date:{
		type:Date
	    },
	order_delivered_date:{
		type: Date
		},
// order status can be from these placed,picked,reached_to_us,dispatched,delivered
	order_status:{
		type:String,
		default:"placed"
		},
	tracking_id:{
		type:String
		}
	
});
module.exports=mongoose.model('orders',return_data);