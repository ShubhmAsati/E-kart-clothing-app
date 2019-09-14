var exports = module.exports = {};
var product = require('../../models/product_model');



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

exports.get_all_products = function(req,res,empty){
	product.find({"is_deleted":false},function(error,result){
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


exports.delete_product = function(req,res,next){
	console.log(req.body);
	product_ids = req.body.product_id;
	product.update({"_id":{$in:product_ids}},{"is_deleted":true},{multi:true},function(error,result){
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
					"message":"product deleted successfully"
				  });
				  return;
		}
	});
}