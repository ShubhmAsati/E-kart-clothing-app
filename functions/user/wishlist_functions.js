var exports = module.exports = {};
var wishlist = require('../../models/wishlist_model');
var product = require('../../models/product_model');



exports.add_item = function(req,res,empty){
	wishlist.findOne({"user_id":req.body.user_id},function(error,result){
	if(error){
		res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
	}
	else{
		if(!req.body.product_id.match(/^[0-9a-fA-F]{24}$/)){
				res.status(403);
				  res.json({
					"id":"-1",
					"status":"403",
					"message":"product Id invalid"
				  });
				  return;
			}
		else if(result){
				console.log(result.product_id.indexOf(req.body.product_id));
				if(result.product_id.indexOf(req.body.product_id) !== -1){
				res.status(403);
				  res.json({
					"id":"-1",
					"status":"403",
					"message":"product already added in wishlist"
				  });
				  return;
			}
			else{
			result.product_id.push(req.body.product_id);
			result.save(function(error,results){
				if(error){
					res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
				}
				else{
					res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product added to wishlist",
					"data":result
				  });
				  return;
				}
			});
		}
		}
		else{
			wishlist_data = wishlist({
				user_id:req.body.user_id,
				product_id:[req.body.product_id]
			});
				wishlist_data.save(function(error,result){
				if(error){
				res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
				}
				else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product added to wishlist"
				  });
				  return;	
				}
		});
		}
	}
});

}

exports.remove_item = function(req,res,empty){
wishlist.findOne({"user_id":req.body.user_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
		}
		else{
			if(!req.body.product_id.match(/^[0-9a-fA-F]{24}$/)){
				res.status(403);
				  res.json({
					"id":"-1",
					"status":"403",
					"message":"product Id invalid"
				  });
				  return;
			}
		
			else if(result){
				
			result.product_id.remove(req.body.product_id);
			result.save(function(error,results){
				if(error){
				res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
				}
				else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product removed from wishlist",
					"data":result
				  });
				  return;
				}
				});
			}
			else{
			res.status(403);
				  res.json({
					"id":"1",
					"status":"403",
					"message":"No such user exist"
				  });
				  return;	
			}
		}
	});
}


exports.get_all_items = function(req,res,empty){
	wishlist.find(function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
		}
		else{
			if(result){
			product.find({"_id":{$in:result.product_id}},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,results){
				if(error){
					res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
				}
				else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product list in  wishlist",
					"data":result,
					"products":results
				  });
				  return;
	
				}
			});
			}
			else{
			res.status(403);
				  res.json({
					"id":"1",
					"status":"403",
					"message":"No such user exist"
				  });
				  return;	
			}
		}
	});
}


exports.get_items = function(req,res,empty){
	wishlist.findOne({"user_id":req.params.user_id}).populate('product_id').exec(function(error,result){
		if(error){
			console.log(error);
			res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
		}
		else{
			if(result){
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product list in  wishlist",
					"data":result
				  });
				  return;
	
				}
			else{
			res.status(403);
				  res.json({
					"id":"1",
					"status":"403",
					"message":"No such user exist"
				  });
				  return;	
			}
		}
	
			});
		}

exports.get_item = function(req,res,empty){
	wishlist.findOne({"user_id":req.params.user_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
		}
		else{
			if(result){
			product.find({"_id":{$in:result.product_id}},{"specification":1,"product_pic":1,"user_rating":1,"name":1,"price":1,"sizes":1,"creation_date":1,"_id":1},function(error,results){
				if(error){
					res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
				}
				else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"product list in  wishlist",
					"data":result,
					"products":results
				  });
				  return;
	
				}
			});
			}
			else{
			res.status(403);
				  res.json({
					"id":"1",
					"status":"403",
					"message":"No such user exist"
				  });
				  return;	
			}
		}
	});
}