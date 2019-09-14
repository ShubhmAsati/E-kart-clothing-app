var express = require('express');
var router = express.Router();
var o_f = require('../../functions/user/order_functions');


router.post('/order',function(req,res,next){
	o_f.add_order(req,res,next);	
});

router.get('/order/:user_id',function(req,res,next){
	o_f.get_order(req,res,next);
});

router.post('/cancel_order',function(req,res,next){
	o_f.cancel_order(req,res,next);
});

router.get('/completed_order/:user_id',function(req,res,next){
	o_f.completed_order(req,res,next);
});

router.get('/active_order/:user_id',function(req,res,next){
	o_f.active_order(req,res,next);
});

router.get('/order_details/:order_id',function(req,res,next){
		o_f.order_details(req,res,next);
});
 
//a user can only return one product at a time
router.post('/return',function(req,res,next){
		o_f.return_order(req,res,next);
});


















module.exports = router;