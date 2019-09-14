var express = require('express');
var router = express.Router();
var w_f = require('../../functions/user/wishlist_functions');

router.post('/wishlist',function(req,res,next){
	w_f.add_item(req,res,next);
});

router.get('/wishlist',function(req,res,next){
	w_f.get_all_items(req,res,next);
});

router.get('/wishlist/:user_id',function(req,res,next){
	w_f.get_items(req,res,next);
});

router.delete('/wishlist',function(req,res,next){
	w_f.remove_item(req,res,next);
});
module.exports = router;