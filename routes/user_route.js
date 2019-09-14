var express = require('express');
var router = express.Router();
var uf = require('../functions/user_function');
var multer = require('multer');
var dir  = './public/images';
var path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG and PNG  and jpg is allowed!'), false);
    }
  }
let upload = multer({fileFilter,storage: storage});  

router.post('/user',function(req,res,next){
	uf.add_user(req,res);
});
router.put('/user',function(req,res,next){
	uf.update_user(req,res);
});


router.get('/user',function(req,res,next){
	uf.get_all_user(req,res);
});

router.post('/get_user_by_email',function(req,res,next){
	uf.get_user_by_email(req,res);
});

router.post('/get_user_by_number',function(req,res,next){
	uf.get_user_by_number(req,res);
});

router.post('/get_user_by_id',function(req,res,next){
	uf.get_user_by_id(req,res);
});

cpUpload = upload.fields([{name:'file',maxcount:1}])
router.post('/add_profile_pic',cpUpload,function(req,res,next){
	uf.add_profile_pic(req,res);
});

router.post('/address',function(req,res){
	uf.add_address(req,res);
});
router.get('/address/:email',function(req,res){
	uf.get_address(req,res);
});

router.put('/address',function(req,res){
	uf.update_address(req,res);
});

router.delete('/address',function(req,res){
	uf.delete_address(req,res);
});



module.exports = router;