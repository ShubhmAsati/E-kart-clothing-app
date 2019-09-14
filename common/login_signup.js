var express = require('express');

router = express.Router();
var c_f = require('./common_functions');
var user = require('../models/user_model');
var l_s_f = require('./login_signup_function');
router.post('/login',function(req,res){
l_s_f.login(req,res);

});
router.post('/signup',function(req,res){
l_s_f.signup(req,res);
});

router.post('/forgot_password',function(req,res){
	l_s_f.forgot_password(req,res);
});

router.post('/password_reset',function(req,res){
	l_s_f.password_reset(req,res);
});
module.exports = router;