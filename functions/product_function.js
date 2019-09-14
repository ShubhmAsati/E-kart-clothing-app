var exports = module.exports = {};
var product = require('../models/product_model');
var validator = require('validator');
var client = require('../common/redis_client');
exports.add_product = function(req,res,empty){
	images = ['default.png'];
	if(req.files !== 'undefined'){
		for( i in req.files['image']){
			console.log(req.files['image'][i])
			images.push(req.files['image'][i].filename);
		}
	}
	product_data = product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		sizes:req.body.sizes,
		specification:req.body.specification,
		creation_date:Date.now(),
		colors:req.body.colors,
		hashtag:req.body.hashtag,
		product_pic:images,
		gender:req.body.gender
	});
	product_data.save((error,result)=>{
	if(error){
		errmsg = '';
		status = 401;
		if(error.errors){
			err = Object.keys(error.errors);
			if(error.errors.name){errmsg = error.errors.name.message;}
			else if(error.errors.description){errmsg = error.errors.description.message;}
			else if(error.errors.price){errmsg = error.errors.price.message}
			else if(error.errors.gender){errmsg = error.errors.gender.message}
			else if(err[0].indexOf('sizes') >=0){errmsg = error.errors[err[0]].message + " for sizes of index " + err[0].substr(6,1) + " size";}
			else if(err[0].indexOf('specification')>=0){errmsg =error.errors[err[0]].message + " for specification of index " + err[0].substr(14,1) +" specification";}
			else if(err[0].indexOf('colors')>=0){errmsg =error.errors[err[0]].message + " for color of index " + err[0].substr(5,1) +" color";}	
		    
		}
		else if (error.code === 11000 && error.index === 0){
					errmsg = error.errmsg
		}
		else{
			errmsg="error in adding user";
			status = 400;
		}
		  res.status(status);
				  res.json({
					"id":"-1",
					"status":status,
					"message":errmsg
				  });
			   return;
	}
	else{
		res.status(200);
		res.json({
					"id":"1",
					"status":"200",
					"message":"product successfully added",
					"data":result
				  });
				  return;
	}
	});
	
	
}


exports.get_all_products = function(req,res,empty){
	product.find({},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			client.setex(req.originalUrl+JSON.stringify(req.body),3600,JSON.stringify({
				"id":"1",
					"status":"200",
					"message":"list of all products ",
					"data":result
				}));	 
			
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"list of all products",
					"data":result
				  });
				  return;
			
		}
	});
	
}

exports.get_all_deleted_products= function(req,res,empty){
	product.find({is_deleted:true},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			client.setex(req.originalUrl+JSON.stringify(req.body),3600,JSON.stringify({
				"id":"1",
					"status":"200",
					"message":"list of all deleted products",
					"data":result
				}));	 
			
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"list of all deleted products",
					"data":result
				  });
				  return;
			
		}
	});
}

exports.get_all_active_products= function(req,res,empty,ts1){
	product.find({is_deleted:false},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			client.setex(req.originalUrl+JSON.stringify(req.body),3600,JSON.stringify({
				"id":"1",
					"status":"200",
					"message":"list of all active products",
					"data":result
				}));	 
			
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"list of all active products",
					"data":result
				  });
				  return;
			
		}
	});
}

exports.get_product_by_gender = function(req,res,empty){
	
	if(! (req.params.gender.trim() === "true" || req.params.gender.trim() === "false")){
		res.status(401);
				  res.json({
					"id":"-1",
					"status":401,
					"message":"invalid gender"
				  });
			   return;
	}
	product.find({$and:[{gender:req.params.gender.trim()},{is_deleted:false}]},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			client.setex(req.originalUrl+JSON.stringify(req.body),3600,JSON.stringify({
				"id":"1",
					"status":"200",
					"message":"list of products by gender",
					"data":result
				}));	 
			res.status(200);
			res.json({
					"id":"1",
					"status":"200",
					"message":"list of products by gender",
					"data":result
				  });
				  
				  return;
			
		}
	});
		
}
exports.get_product_by_spec = function(req,res,empty){
	product.find({$and:[{gender:req.body.gender},{specification:{$in:req.body.specification}},{is_deleted:false}]},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,result){
		if(error){
			console.log(error);
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"list of products by gender",
					"data":result
				  });
				  return;
		}
	});
	
}

exports.get_product_by_size_color = function(req,res,empty){
	product.find({$and:[{gender:req.body.gender},{specification:{$in:req.body.specification}},{"sizes.size":{$in:req.body.sizes}},{"color.color_name":{$in:req.body.colors}},{is_deleted:false}]},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,result){
		if(error){
			console.log(error);
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"list of products by gender",
					"data":result
				  });
				  return;
			
		}
	});
	
}



exports.get_product_by_id = function(req,res,empty){
	product_id = req.params.id.trim();
	product.find({"_id":product_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			if(result){
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product details",
					"data":result
				  });
				  return;
			}
			else{
				res.status(401);
				res.json({
					"id":"-1",
					"status":"401",
					"message":"no such product exists"
				  });
				  return;
				
			}
		}
	});
	
}


exports.update_product = function(req,res,empty){
	product_id = req.body._id.trim();
	product.findOne({"_id":product_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}
		else{
			if(result){

						product_data = product({
							name: req.body.name,
							description: req.body.description,
							price: req.body.price,
							sizes:req.body.sizes,
							specification:req.body.specification,
							creation_date:Date.now(),
							colors:req.body.colors,
							hashtag:req.body.hashtag
							});
						product_data.save((error,results)=>{
						if(error){
							errmsg = '';
							status = 401;
							if(error.errors){
								err = Object.keys(error.errors);
								if(error.errors.name){errmsg = error.errors.name.message;}
								else if(error.errors.description){errmsg = error.errors.description.message;}
								else if(error.errors.price){errmsg = error.errors.price.message}
								else if(err[0].indexOf('sizes') >=0){errmsg = error.errors[err[0]].message + " for sizes of index " + err[0].substr(6,1) + " size";}
								else if(err[0].indexOf('specification')>=0){errmsg =error.errors[err[0]].message + " for specification of index " + err[0].substr(14,1) +" specification";}
								else if(err[0].indexOf('colors')>=0){errmsg =error.errors[err[0]].message + " for color of index " + err[0].substr(5,1) +" color";}	
								
							}
							else if (error.code === 11000 && error.index === 0){
										errmsg = error.errmsg
							}
							else{
								errmsg="error in updating user";
								status = 400;
							}
							  res.status(status);
									  res.json({
										"id":"-1",
										"status":status,
										"message":errmsg
									  });
								   return;
						}
						else{
							res.status(200);
							res.json({
										"id":"1",
										"status":"200",
										"message":"product updated successfully ",
										"data":results
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
					"message":"No such product exist"
				  });
				  return;
			}
		}
	});
}

exports.add_images = function(req,res,next){
	product_id = req.body._id;
		image = req.body.images;
					if(req.files !== 'undefined'){
						for( i in req.files['image']){
							console.log(req.files['image'][i])
							image.push(req.files['image'][i].filename);
						}
					}
				
	product.updateOne({"_id":product_id},{product_pic:image},function(error,result){
		if(error){
		res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in updating images"
				  });
			   return;
		}
		else{
			
			if(result.nModified){
				res.status(200);
						res.json({
									"id":"1",
									"status":"200",
									"message":"images addedd successfully",
									"data":result
									  });
									  return;
						

			}
			else{
				res.status(401);
				res.json({
					"id":"-1",
					"status":"401",
					"message":"No such product exist"
				  });
				  return;
			}
		}	
		
	});
}

exports.add_rating = function(req,res,empty){
		product.updateOne({_id:req.body._id},{$push:{user_rating:req.body.user_rating}},(error,result)=>{
		if(error){
		res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in adding rating try again"
				  });
			   return;
		}
		else{
			if(result.nModified){
				res.status(200);
						res.json({
									"id":"1",
									"status":"200",
									"message":"Thanks for  rating our product",
									"data":result
									  });
									  return;
						

			}
			else{
				res.status(401);
				res.json({
					"id":"-1",
					"status":"401",
					"message":"No such product exist"
				  });
				  return;
			}
		}	
		
	});
}

//this api supports for specification and description test searching 
//created index by text for specification and description 

exports.get_product_by_search = function(req,res,empty){
	var search = req.params.search.trim();
	product.find({$text:{$search:search}},function(error,result){
		if(error){
		res.status(400);
				  res.json({
					"id":"-1",
					"status":400,
					"message":"error in fetching products"
				  });
			   return;
		}	
		else{
				res.status(200);
						res.json({
									"id":"1",
									"status":"200",
									"message":"list of products",
									"data":result
									  });
									  return;
		}
	
	
});
}