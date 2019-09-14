var exports = module.exports = {};
var c_f = require('./common_functions');
var user = require('../models/user_model');
var bcrypt = require('bcryptjs');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer'); 
var saltRounds = 10;
exports.login = function(req,res){
 user_data = req.body.user.trim(); 
 password = req.body.password.trim();
 temp = user_data.indexOf('@');
 if(temp === -1){
	 user.findOne({"contact_number":user_data},function(error,result){
			if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in adding user"
				  });
			   return;
			}
			else{
				
			if(result){
				console.log(result);
				row = bcrypt.compare(password, result.password, function(err, rs) {
					if(err){
							res.status(401);
						  res.json({
							"id":"-1",
							"status":"400",
							"message":"incorrect password"
						  });
					   return;
					}
					else{
					let payload = {email:result.email};
					let token = c_f.createToken(payload);
            		            res.status(200);
						res.json({
						  "id":"1",
						  "status":"200",
						  "message":"Login successful",
						  "access_token" :token,
						  "data":result
						});
					}
					});
			}
			else{
							res.status(401);
						  res.json({
							"id":"-1",
							"status":"401",
							"message":"contact number does not match"
						  });
					   return;
				
			}
			}
 });
 }
 else{
	 user.findOne({"email":user_data},function(error,result){
			if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in adding user"
				  });
			   return;
			}
			else{
				
			if(result){
				console.log(result);
				row = bcrypt.compare(password, result.password, function(err, rs) {
					
					if(!rs){
							res.status(401);
						  res.json({
							"id":"-1",
							"status":"401",
							"message":"incorrect password"
						  });
					   return;
					}
					else{
					let payload = {email:result.email};
					let token = c_f.createToken(payload);
            		            res.status(200);
						res.json({
						  "id":"1",
						  "status":"200",
						  "message":"Login successful",
						  "access_token" :token,
						  "data":result
						});
					}
					});
			}
			else{
							res.status(401);
						  res.json({
							"id":"-1",
							"status":"401",
							"message":"email does not match"
						  });
					   return;
				
			}
			}
 }); 
 }
 }

exports.signup = function(req,res){
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
			
		}
		else if (error.code === 11000 && error.index === 0){
			   res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errmsg
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
					
				  let payload = {email:req.body.email};
				  let token = c_f.createToken(payload);	
				  res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"user successfully added",
					"data":result,
					"access_token":token
				  });
				  return;
			
		}
	});
}

/*Super Admin forgot password function starts here*/
exports.forgot_password = function(req,res)
{
  var user_data = req.body.user_data.trim();
    user.findOne({$or:[{"contact_number":user_data},{"email":user_data}]},function(error,result){
	if(error){
		   res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"query error"
				  });
			   return;
	}
	else{
		if(result){
						     security_code = randomstring.generate({
							length: 4,
							charset: 'numeric'
						  });
						  var dt = Date.now();
						  console.log(dt);
							user.updateOne({"email":result.email},{security_code:security_code},function(error,results){
								if(error){
								   res.status(400);
										  res.json({
											"id":"-1",
											"status":"400",
											"message":"query error"
										  });
									   return;									
								}
								else{
									console.log(results);
									  var transporter = nodemailer.createTransport({
														  service: 'gmail',
														  auth: {
															user: 'shubham.asati2626@gmail.com',
															pass: 'mnblkjpoi'
														  },
														  tls: {
															rejectUnauthorized: false
														  }
														});

									                var mailOptions = {
														  from: 'shubham.asati2626@gmail.com',
														  to: 'shashanksoni271296@gmail.com',
														  subject: 'Password reset code',
														  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
														  'Please paste this into your app to complete the process:\n\n' +
														  'security code : '+security_code +
														  '\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n'
														};

														transporter.sendMail(mailOptions, function(error, info){
														  if (error) {
															res.status(400);
															res.json({
															  "status": "400",
															  "message": "Oops some error has occurred.",
															  "data":error
															});
															return;
														  } else {
															res.status(200);
															res.json({
															  "id":"1",
															  "status": "200",
															  "message": "Email Has been sent successfully.",
															});

														  }
														});
												

  
								}
						  });
					 
		}
		else{
			res.status(401);
				  res.json({
					"id":"-1",
					"status":"401",
					"message":"email or contact does not exist"
				  });
			   return;
		}
		
	}
	});

         
    }

  


//Admin Password Reset Functions//
exports.password_reset = function(req,res,empty) {
  var dt = Date.now();
  var email = req.body.email.trim();
  if(!req.body.security_code){
	  					res.status(401);
															res.json({
															  "status": "401",
															  "message": "please provide security code.",
															  
															});
															return;
		
  }
  if(!req.body.password){
	  					res.status(401);
															res.json({
															  "status": "401",
															  "message": "please provide password code.",
															  
															});
															return;
		
  }
  user.findOne({"email":email},function(error,result){
						if(error){
							res.status(400);
															res.json({
															  "status": "400",
															  "message": "Oops some error has occurred.",
															  "data":error
															});
						return;
						}
						else{
							if(result){
										new_password = bcrypt.hashSync(req.body.password, saltRounds);
										user.updateOne({$and:[{"email":result.email},{security_code:req.body.security_code}]},{password:new_password,security_code:''},function(error,results){
											if(error){
													res.status(400);
															res.json({
															  "status": "400",
															  "message": "Oops some error has occurred.",
															  "data":error
															});
												}
												else{
													if(results.nModified){
													res.status(200);
															res.json({
															  "status": "200",
															  "message": "password changed successfully."
															});						
														return;
													}
													else{
													res.status(401);
															res.json({
															  "status": "401",
															  "message": "invalid Otp"
															});	
													return;
													}
													
												}
										});
							}
							else{
									res.status(401);
									  res.json({
										"id":"-1",
										"status":"401",
										"message":"email  does not exist"
									  });
								   return;
							}
						}
  });   
}
   

