exports = module.exports={};
var order = require('../../models/order_model');
var user = require('../../models/user_model');


exports.add_order = function(req,res,next){
	
	order_data = order({
		user_id:req.body.user_id,
		products: req.body.products,		
		address: req.body.address,
		order_type:'delivery'
	});
	order_data.save(function(error,result){
		if(error){
			if(error.errors){
				if(error.errors.address){
					res.status(401);
				    res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.address.message
				  });
				  return;
				}
				else if(error.errors.user_id){
					res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.user_id.message
				  });
				  return;
				}
				else{
					res.status(401);
				    res.json({
					"id":"0",
					"status":"401",
					"message":"error in placing order product data is invalid "
				  });
				  return;
				}
			}
			else{
				res.status(400);
				    res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
			}
		}
		else{
				res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order placed !! visit again",
					"data":result
				  });
		}	

	});
}

exports.get_order = function(req,res,next){
	user_id = req.params.user_id;
user.find({"_id":user_id},function(error,result){
		if(error){
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
				order.find({"user_id":user_id},function(error,result){
					if(error){
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
							"message":"list of orders",
							"data":result
						});

					}
				});
			}
			else{
							res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"no such  user exists"
								  });
							return;
				
			}
		}
	});
	
}


exports.cancel_order = function(req,res,next){
	order_id = req.body.order_id;
order.findById({"_id":order_id},function(error,result){
	if(error){
					res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in cancelling order"
								  });
							return;
	}
	else{
		if(result){
			if(result.order_status === 'placed' ){
				result.order_status = 'cancelled';
				result.order_cancelled_date = Date.now();
				result.save(function(error,result){
					if(error){
						res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"error in cancelling order"
								  });
							return;
					}
					else{
						res.status(200);
								  res.json({
									"id":"1",
									"status":"200",
									"message":"order cancelled successfully",
									"data":result
								  });
							return;
					}
				});
			}
			else if(result.order_status === 'cancelled'){
						res.status(200);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"cannot cancel order as it is already cancelled"
								  });
							return;
			}
			else{
						res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"cannot cancel order as it is dispatched"
								  });
							return;

			}
		
		}
		else{
							res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no such  order exists"
								  });
							return;
		}
	}
});
}

exports.completed_order = function(req,res,next){
	user_id = req.params.user_id;
	order.find({$and:[{"user_id":user_id},{order_status:{$in:["cancelled","delivered"]}}]},function(error,result){
		if(error){
			console.log(error);
			res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in fetching order list"
								  });
							return;
		}
		else{
			if(result){
				res.status(200);
								  res.json({
									"id":"1",
									"status":"200",
									"message":"completed order list",
									"data":result
								  });
							return;
			}
			else{
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no order for this user"
								  });
							return;
			}
		}
	});
}


exports.active_order = function(req,res,next){
	user_id = req.params.user_id;
	order.findOne({$and:[{"user_id":user_id},{order_status:{$nin:["cancelled","delivered"]}}]},function(error,result){
		if(error){
			res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in fetching order"
								  });
							return;
		}
		else{
			if(result){
				if(! (result.order_status ==='delivered' || result.order_status === 'cancelled')){
				
				res.status(200);
								  res.json({
									"id":"-1",
									"status":"200",
									"message":"active order list",
									"data":result
								  });
							return;
				}
				else{
					res.status(200);
								  res.json({
									"id":"1",
									"status":"200",
									"message":"there are no order active  for this user",
									"data":{}
								  });
							return;
				}
			}
			else{
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no order for this user"
								  });
							return;
			}
		}
	});
}

exports.order_details = function(req,res,next){
	order_id = req.params.order_id.trim();
order.findById({"_id":order_id},function(error,result){
	if(error){
		res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in fetching order details"
								  });
							return;
	}
	else{
		if(result){
							res.status(200);
								  res.json({
									"id":"1",
									"status":"200",
									"message":"order details for order id",
									"data":result
								  });
							return;
		}
		else{
			res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no such  order exists"
								  });
							return;
		}
	}
});
}

exports.return_order = function(req,res,empty){
	old_order_id = req.body.old_order_id;
	order.findById({"_id":old_order_id},function(error,result){
		if(error){
				res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in fetching order details"
								  });
							return;
	
		}
		else{
			if(result){
				
			 prod = result.products.id(req.body.products[0]._id);
			 if(result.order_status === 'delivered' && !prod.is_returned){
			 prod['is_returned']=true;
			 prod.set(prod);
			 result.save(function(error,result){
				if(error){
						res.status(400);
								  res.json({
									"id":"-1",
									"status":"400",
									"message":"error in fetching order details"
								  });
							return;
	
				} 
				else{
						var	return_data = order({
				old_order_id : req.body.old_order_id,
				user_id : req.body.user_id,
				products: req.body.products,
				order_type:'return',
				order_status:'placed',
				address: req.body.address
			});
			return_data.save(function(error,result1){
				if(error){
					if(error.errors){
				if(error.errors.address){
					res.status(401);
				    res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.address.message
				  });
				  return;
				}
				else if(error.errors.user_id){
					res.status(401);
				  res.json({
					"id":"0",
					"status":"401",
					"message":error.errors.user_id.message
				  });
				  return;
				}
				else{
					res.status(401);
				    res.json({
					"id":"0",
					"status":"401",
					"message":"error in returning order product data is invalid "
				  });
				  return;
				}
			}
			else{
				res.status(400);
				    res.json({
					"id":"0",
					"status":"400",
					"message":error
				  });
				  return;
			}
				}
				else{
						res.status(200);
								  res.json({
									"id":"1",
									"status":"200",
									"message":"order placed for return",
									"data":result1
								  });
							return;
							
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
									"message":"order is in process cannot return now . Order can only be returned after delivery"
								  });
							return;
				
			}
			}
			else{
				res.status(401);
								  res.json({
									"id":"-1",
									"status":"401",
									"message":"no such  order exists"
								  });
							return;
			}
		}
	});
}


