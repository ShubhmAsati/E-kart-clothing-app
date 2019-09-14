var exports = module.exports = {};
var bag = require('../../models/bag_model');
var product = require('../../models/product_model');

exports.add_item = function(req,res,empty){
bag.findOne({"user_id":req.body.user_id},function(error,result){
	if(error){
		res.status(400);
				  res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
	}
	else if(!req.body.product_id.match(/^[0-9a-fA-F]{24}$/)){
				res.status(403);
				  res.json({
					"id":"-1",
					"status":"403",
					"message":"product Id invalid"
				  });
				  return;
			}
	else{
		if(result){
			var product_data = {
				product_id:req.body.product_id,
				size:req.body.size
			};
			for(i =0 ; i< result.product.length;i++){
				if(result.product[i].product_id == req.body.product_id && result.product[i].size == req.body.size){
						res.status(403);
						  res.json({
							"id":"-1",
							"status":"403",
							"message":"product already added in bag"
						  });
						  return;	
				}
			}
			
				result.product.push(product_data);
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
								"message":"product added to bag",
								"data":results
							  });
							  return;
							
					}
				});
			
			
		}
		else{
			bag_data = bag({
				user_id:req.body.user_id,
				product:[{"product_id":req.body.product_id,"size":req.body.size}]
			});
			bag_data.save(function(error,result){
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
								"message":"product added to bag",
								"data":result
							  });
							  return;
				}
			});
		}
	}
	
});	
}


exports.remove_item = function(req,res,empty){
bag.findOne({"user_id":req.body.user_id},function(error,result){
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
			for(i =0 ; i< result.product.length;i++){
				if(result.product[i].product_id == req.body.product_id && result.product[i].size == req.body.size){
							result.product.remove(result.product[i]);
				            break;
				}
			}
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
									"message":"product removed from bag",
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


exports.get_items = function(req,res,empty){
	bag.findOne({"user_id":req.params.user_id}).populate('product.product_id').exec(function(error,result){
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
					"message":"product list in  bag",
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
		
		
