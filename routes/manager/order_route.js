var express = require('express');
var router = express.Router();
var m_o_f = require('../../functions/manager/order_function'); 
//route to get all cancelled order......

router.get('/all_cancelled_order',function(req,res,next){
	m_o_f.get_all_cancelled_order(req,res,next);
});

router.get('/today_cancelled_order',function(req,res,next){
	m_o_f.get_today_cancelled_order(req,res,next);
});

router.get('/all_placed_order',function(req,res,next){
	m_o_f.get_all_placed_order(req,res,next);
});

router.get('/today_placed_order',function(req,res,next){
	m_o_f.get_today_placed_order(req,res,next);
});

router.get('/all_picked_order',function(req,res,next){
	m_o_f.get_all_picked_order(req,res,next);
});

router.get('/today_picked_order',function(req,res,next){
	m_o_f.get_today_picked_order(req,res,next);
});

router.get('/all_dispatched_order',function(req,res,next){
	m_o_f.get_all_dispatched_order(req,res,next);
});

router.get('/today_dispatched_order',function(req,res,next){
	m_o_f.get_today_dispatched_order(req,res,next);
});

router.get('/all_delivered_order',function(req,res,next){
	m_o_f.get_all_delivered_order(req,res,next);
});

router.get('/today_delivered_order',function(req,res,next){
	m_o_f.get_today_delivered_order(req,res,next);
});

router.post('/order_dispatched',function(req,res,next){
	m_o_f.update_order_to_dispatched(req,res,next);
});

router.post('/order_failed',function(req,res,next){
	m_o_f.update_order_to_failed(req,res,next);
});

router.post('/order_delivered',function(req,res,next){
	m_o_f.update_order_to_delivered(req,res,next);
});

router.post('/order_picked',function(req,res,next){
	m_o_f.update_order_to_picked(req,res,next);
});

router.post('/order_reached_to_hub',function(req,res,next){
	m_o_f.update_order_to_reached_to_hub(req,res,next);
});

router.post('/order_status',function(error,result){
	m_o_f.update_order_status(req,res,next);
});









module.exports = router;