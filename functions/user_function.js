var exports = module.exports = {};
var user = require('../models/user_model');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
var validator = require('validator');







exports.add_user = function(req,res){

	let user_data = user({
		email:req.body.email,
		name:req.body.name,
		contact_number:req.body.contact_number,
		password:bcrypt.hashSync(req.body.password, saltRounds),
		creation_date : Date.now(),
		profile_pic:req.body.profile_pic,
		push_token:req.body.push_token,
		gender:req.body.gender
	});
	user_data.save((error,result)=>{
	if(error){
		console.log(error);
		if(error.errors){
			if(error.errors.email){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.email.message
				  });
				  return;
			}
			else if (error.errors.name){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.name.message
				  });
				  return;
			}
			else if (error.errors.contact_number){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.contact_number.message
				  });
				  return;
			}
			else if (error.errors.push_token){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.push_token.message
				  });
				  return;
			}
			else if (error.errors.password){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.password.message
				  });
				  return;
			}
			else if (error.errors.gender){
				res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.gender.message
				  });
				  return;
			}
			
		}
		else if (error.code === 11000 && error.index === 0){
			 
			   temp = error.errmsg.indexOf('email');
			   ermsg = '';
			   if(temp === -1){
				   ermsg = "contact number already exists";
			   }
			   else{
				   ermsg = "email already exists";
			   }
			   res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":ermsg
				  });
				  return;
			}
			else{
				   res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in adding user"
				  });
			   return;
			}
		}
	else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user successfully added",
					"data":result
				  });
				  return;
			
		}
	});

}

exports.update_user = function(req,res){
		email = req.body.email;
		name = req.body.name;
		contact_number = req.body.contact_number;
		if(!validator.isEmail(email))
		{							   res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"incorrect email format"
								  });
		return;			
		}
		if(!name){
									   res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"invalid name"
								  });
		return;
		}
		if(!validator.isMobilePhone(contact_number)){
								   res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"incorrect contact number"
								  });
		return;
		}
			user.updateOne({"email":email},{email:email,name:name,contact_number:contact_number},function(error,result){
				if(error){
											   res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"oops some error occured"
								  });
		return;
				}
				else{
					if(result.nModified){
								res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"User updated successfully"
								  });
									return;
					}
					else{
							   res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"User does not exist"
								  });
								return;
					}
				}
			});

}


exports.get_all_user = function(req,res){
	user.find((err,result)=>{
		if(err){
							   res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in getting user"
								  });
		return;
		}
		else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user data ",
					"data":result
				  });
				  return;	
				  }
	});
}
exports.get_user_by_email = function(req,res){
	user.findOne({"email":req.body.email},(err,result)=>{
		if(err){
		res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in getting user"
								  });
		return;}
		else{
			if(result){
		res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user data ",
					"data":result
				  });
				  return;				}
			else{
			res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"no user"
								  });
		return;
			}
			
		}
	});
}
exports.get_user_by_number = function(req,res){
	user.findOne({"contact_number":req.body.contact_number},(err,result)=>{
		if(err){
		res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in getting user"
								  });
		return;}
		else{
			if(result){
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user data ",
					"data":result
				  });
				  return;		}
			else{
		res.status(400);
									  res.json({
										"id":"-1",
										"status":"400",
										"message":"error in getting user"
									  });
			return;	
			}
			
		}
	});
}
exports.get_user_by_id = function(req,res){
	user.findOne({"_id":req.params.id},(err,result)=>{
				if(err){
		res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in getting user"
								  });
		return;
		}
		else{
			if(result){
					res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user data ",
					"data":result
				  });
				  return;	}
			else{
				res.status(400);
												  res.json({
													"id":"-1",
													"status":"400",
													"message":"error in getting user"
												  });
						return;		
			}
			
		}
	});
}


exports.add_profile_pic = function(req,res){
	if(!req.files){
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error uploading images"
								  });
		return;
		
	}
	profile_pic = req.files['file'][0].filename;
	user.updateOne({"email":req.body.email},{profile_pic:profile_pic},function(error,result){
		if(error){
					res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error uploading images"
								  });
		return;
		}
		else{
			if(result.nModified){
							res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"profile pic uploaded"
								  });
						return;
			}
			else{
					res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"user does not exist"
								  });
		return;
			}
		}
	});
}


exports.add_address = function(req,res){

	user.findOne({"_id":req.body.user_id},function(error,result){
		if(error){
			res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
		}
		else{
				if(result){
		result.address.push(req.body);
		result.save(function(error,result){
		if(error){
			console.log(error);
			if(error.errors){
			if(error.errors['address.0.pincode']){
			res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.pincode'].message
								  });
		return;		
				}
				else if(error.errors['address.0.address_line_1']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.address_line_1'].message
								  });
		return;	
				}
				else if(error.errors['address.0.state']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.state'].message
								  });
		return;	
				}
				else if(error.errors['address.0.city']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.city'].message
								  });
		return;	
				}
				else if(error.errors['address.0.country']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.country'].message
								  });
		return;	
				}
				else if(error.errors['address.0.name']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.name'].message
								  });
		return;	
				}
				else if(error.errors['address.0.contact_number']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.contact_number'].message
								  });
		return;	
				}
			}
			else{
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
			}
			
		}
		else{
				res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"address added successfully"
								  });
		return;
		}
		
	});
				}
				else{
					res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"user does not exist"
								  });
		return;
				}
		}
	});
	
}

exports.get_address = function(req,res){
	user.findOne({"email":req.params.email.trim()},function(error,result){
		if(error){
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
		}
		else{
			if(result){
					res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"address list",
									"data":result.address
								  });
		return;
				
			}
			else{
					res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"user does not exist"
								  });
		return;
			}
		}
	});
}
exports.update_address = function(req,res){
	user.findOne({"email":req.body.email},function(error,result){
		if(error){
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
		}
		else{
			if(result){
			address = result.address.id(req.body._id);
		if(!address){
			res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no such address exist"
								  });
		return;
		}
		address.set(req.body);
		result.save(function(error,results){
			if(error){
				if(error.errors['address.0.pincode']){
			res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.pincode'].message
								  });
		return;		
				}
				else if(error.errors['address.0.address_line_1']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.address_line_1'].message
								  });
		return;	
				}
				else if(error.errors['address.0.state']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.state'].message
								  });
		return;	
				}
				else if(error.errors['address.0.city']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.city'].message
								  });
		return;	
				}
				else if(error.errors['address.0.country']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.country'].message
								  });
		return;	
				}
				else if(error.errors['address.0.name']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.name'].message
								  });
		return;	
				}
				else if(error.errors['address.0.contact_number']){
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":error.errors['address.0.contact_number'].message
								  });
		return;	
				}
			
			else{
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
			}
		}
			else{
				res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"address updated successfully"
								  });
		return;
			}
		});
		}
		else{
					res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"user does not exist"
								  });
		return;
		}
		}
	});
	
}


exports.delete_address = function(req,res){
	user.findOne({"email":req.body.email.trim()},function(error,result){
		if(error){
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"Oops some error occured"
								  });
		return;
		}
		else{
			if(result){
					var address = result.address.id(req.body._id).remove();
					
					result.save(function(error,result){
							if(error){
									res.status(400);
													  res.json({
														"id":"-1",
														"status":"400",
														"message":"Oops some error occured"
													  });
							return;
							}
							else{
											res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"address deleted successfully"
								  });
		return;
				
							}
					});
				
			}
			else{
					res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"user does not exist"
								  });
		return;
			}
		}
	});
}





