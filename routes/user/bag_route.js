var express = require('express');
var router = express.Router();

var b_f = require('../../functions/user/bag_functions');

router.post('/bag',function(req,res,next){
	b_f.add_item(req,res,next);
});

router.get('/bag',function(req,res,next){
	b_f.get_all_items(req,res,next);
});

router.get('/bag/:user_id',function(req,res,next){
	b_f.get_items(req,res,next);
});

router.delete('/bag',function(req,res,next){
	b_f.remove_item(req,res,next);
});

module.exports = router;