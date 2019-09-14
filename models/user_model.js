var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var address_data = new Schema({
	address_line_1:{
		type:String,
		lowercase:true,
		trim:true,
		required:[true,"please provide address line 1"]
	},
	address_line_2:{
		type:String,
		lowercase:true,
		trim:true
	},
	pincode:{
		type: String,
		required:[true,"please provide pincode"],
		match:[/^\d{6}$/,"Please enter a valid 6 digit  pincode"]
	},
	city:{
		type:String,
		required:[true,"please provide city"]
	},
	state:{
		type:String,
		required:[true,"please provide state"]
	},
	country:{
		type:String,
		required:[true,"please provide country"]
	},
	contact_number:{
		type:String,
		required:[true,"please provide contact person number"],
		match:[/^\d{10}$/,"invalid contact number"]
	},
	name:{
		type:String,
		required:[true,"please provide name for delivery"],
	},
	is_default:{
		type:Boolean,
		default:false
	}
	
});
var user_data = new Schema({

	email:{
		type:String,
		lowercase : true,
		trim : true,
		required: [true,"email required"],
		unique : [true,"user already exist with this email"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "email must be like example@example.com"]
	},
	name:{
		type : String,
		lowercase : true,
		trim : true,
		required:[true,"name required"]
	},
	contact_number: {
		type: String,
		required : [true,"contact number required"],
		unique : [true,"user already have this number"],
		match: [/^\d{10}$/,"Please fill a valid contact number"]
	},
	password:{
		type: String,
		required: [true,"Please provide a paasword"]
	},
	creation_date:{
		type: Date		
	},
	push_token: {
		type: String,
		required : [true,"push token required "]
	},
	last_updated:{
		type: Date,
		default: Date.now
	},
	profile_pic: {
		type: String,
		default:"demo.png"
	},
	security_code:{
		type: String,
		default: null
	},
	gender : {
		type:String,
	    required:[true,"invalid gender"]
	},
	address:[address_data]
	
   	
});
module.exports=mongoose.model('users',user_data);