var exports = module.exports = {};
var order = require('../../models/order_model');

exports.get_all_cancelled_order = function(req,res,next){
 order.find({"order_status":"cancelled"},function(error,result){
	 if(error){
		res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
	} 
	else{
		res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
				return;
	}
 });
}

exports.get_today_cancelled_order = function(req,res,next){
	current_date = new Date();
	current_date-= 24 * 3600 * 1000;
	var prev = new Date(current_date);
	console.log(prev)
	order.find({$and:[{"order_status":"cancelled"},{"order_cancelled_date":{$gte:prev}}]},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
				return;
		}
		
	});
}

exports.get_all_placed_order = function(req,res,next){
	order.find({$and:[{"order_status":"placed"},{"order_type":"delivery"}]},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
			   return;
		}
	});
}

exports.get_today_placed_order = function(req,res,next){
	current_date = new Date();
	current_date-= 24 * 3600 * 1000;
	var prev = new Date(current_date);
	console.log(prev)
	order.find({$and:[{"order_status":"placed"},{"order_placed_date":{$gte:prev}},{"order_type":"delivery"}]},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
				return;
		}
		
	});
}


exports.get_all_picked_order = function(req,res,next){
	order.find({"order_status":"picked"},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
			   return;
		}
	});
}

exports.get_today_picked_order = function(req,res,next){
	current_date = new Date();
	current_date-= 24 * 3600 * 1000;
	var prev = new Date(current_date);
	console.log(prev)
	order.find({$and:[{"order_status":"picked"},{"order_picked_date":{$gte:prev}}]},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
				return;
		}
		
	});
}

exports.get_all_dispatched_order = function(req,res,next){
	order.find({"order_status":"dispatched"},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
			   return;
		}
	});
}

exports.get_today_dispatched_order = function(req,res,next){
	current_date = new Date();
	current_date-= 24 * 3600 * 1000;
	var prev = new Date(current_date);
	console.log(prev)
	order.find({$and:[{"order_status":"dispatched"},{"order_dispatched_date":{$gte:prev}}]},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in fetching orders"
				  });
			   return;
		}
		else{
			res.status(200);
				  res.json({
					"id":"1",
					"status":"200",
					"message":"order list",
					"data":result
				  });
				return;
		}
		
	});
}


exports.update_order_to_dispatched = function(req,res,next){
	order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
				if(result.order_status === 'placed'){
					result.order_status = 'dispatched';
					result.order_dispatched_date = Date.now();
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to dispatched mode"
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
					"message":"Cannot dispatch order as it is in other state rather than placed"
				  });
				return;
				}
			}
			else{
				res.status(401);
				  res.json({
					"id":"-1",
					"status":"401",
					"message":"Invalid order ID"
				  });
				return;
			}
		}
	});
}




exports.update_order_to_failed = function(req,res,next){
		order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
					result.order_status = 'failed';
					result.order_failed_reason = req.body.reason;
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to failed state"
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
					"message":"Invalid order ID"
				  });
				return;
			}
		}
	});
}


exports.update_order_to_delivered = function(req,res,next){
	order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
				if(result.order_status === 'dispatched'){
					result.order_status = 'delivered';
					result.order_delivered_date = Date.now();
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to delivered state"
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
					"message":"Cannot deliver order as it is in other state rather than dispatched"
				  });
				return;
				}
			}
			else{
				res.status(401);
				  res.json({
					"id":"-1",
					"status":"401",
					"message":"Invalid order ID"
				  });
				return;
			}
		}
	});
}

exports.update_order_to_picked = function(req,res,next){
	order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
				if(result.order_status === 'placed' && order_type === 'return'){
					result.order_status = 'picked';
					result.order_picked_date = Date.now();
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to picked state"
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
					"message":"Cannot pick order as it is in other state rather than delivered"
				  });
				return;
				}
			}
			else{
				res.status(401);
				  res.json({
					"id":"-1",
					"status":"401",
					"message":"Invalid order ID"
				  });
				return;
			}
		}
	});
}


exports.update_order_to_reached_to_hub = function(req,res,next){
	order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
				if(result.order_type === 'return' && order_status === 'picked'){
					result.order_status = 'reached_to_hub';
					result.order_reached_to_hub_date = Date.now();
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to picked state"
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
					"message":"Cannot pick order as it is in other state rather than delivered"
				  });
				return;
				}
			}
			else{
				res.status(401);
				  res.json({
					"id":"-1",
					"status":"401",
					"message":"Invalid order ID"
				  });
				return;
			}
		}
	});
}


exports.update_order_status = function(req,res,next){
	order.findById({"_id":req.body.order_id},function(error,result){
		if(error){
			res.status(400);
				  res.json({
					"id":"-1",
					"status":"400",
					"message":"error in updating order"
				  });
				return;
		}
		else{
			if(result){
					result.order_status = req.body.order_status;
					result.save(function(error,result){
						if(error){
						res.status(400);
						res.json({
							"id":"-1",
							"status":"400",
							"message":"error in updating order"
						});
						return;		
						}
					else{
							res.status(200);
							res.json({
								"id":"1",
								"status":"200",
								"message":"order updated to picked state"
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
					"message":"Cannot pick order as it is in other state rather than delivered"
				  });
				return;
				}
			}
		
	});
}