var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
var size = new Schema({
	size:{
		type:String,
		lowercase:true,
		trim:true,
		required:[true,"please provide a size"]
	},
	quantity:{
		type:String,
		lowercase:true,
		trim:true,
		required:[true,"please provide available quantity"]		
	}
});
var color = new Schema({
	color_name:{
		type:String,
		lowercase:true,
		trim:true,
		required:[true,"please provide a color"]
	},
	color_code:{
		type:String,
		lowercase:true,
		trim:true,
		required:[true,"please provide color code"]		
	}
});

var product_data = new Schema({
	_id: Schema.Types.ObjectId,
	name:{
		type:String,
		lowercase : true,
		trim : true,
		required: [true,"product name required"]
		},
	description:{
		type : String,
		lowercase : true,
		trim : true,
		required:[true,"product description required"]
	},
	price: {
		type: String,
		required : [true,"product price required"],
		match: [/^\d+$/,"Please fill a valid price"]
	},
	sizes:{
		type: [size]
	},
	specification:{
		type: [{type:String,required:[true,"please provide non empty specification"]}],
        required: [true,"please provide a atleast specification"]
	},
	gender:{
		type:Boolean,
		required:[true,"please provode appropriate gender"]
	},
	creation_date:{
		type: Date		
	},
	last_updated:{
		type: Date,
		default: Date.now
	},
	colors:{
		type:[color]
	},
	hashtag:{
		type:[String]
	},
	product_pic: {
		type: [{type:String,required:[true,"please provide non empty pic url"]}]
	},
	user_rating:{
		type:[Number]
	},
	is_deleted:{
		type:Boolean,
		default:false
	}
});
module.exports=mongoose.model('products',product_data);