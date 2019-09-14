var express = require('express');
var router = express.Router();
var pf = require('../functions/product_function');
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
var cpUpload = upload.fields([{name:"image",maxcount:5}]);


router.get('/product_by_search/:search',function(req,res,next){
	pf.get_product_by_search(req,res,next);
});

router.post('/product',cpUpload,function(req,res,next){
	pf.add_product(req,res,next);
	
});

router.get('/product',function(req,res,next){
	pf.get_all_products(req,res,next);
});

router.get('/product_deleted',function(req,res,next){
	pf.get_all_deleted_products(req,res,next);
});

router.get('/product_active',function(req,res,next){
	pf.get_all_active_products(req,res,next);
});


router.get('/product_gender/:gender',function(req,res,next){

	pf.get_product_by_gender(req,res,next);  
});


router.get('/product/:id',function(req,res,next){
	pf.get_product_by_id(req,res,next);
});



router.post('/product_spec',function(req,res,next){
	pf.get_product_by_spec(req,res,next);
});

router.post('/product_size_color',function(req,res,next){
	pf.get_product_by_size_color(req,res,next);
});

router.put('/product',function(req,res,next){
	pf.update_product(req,res,next);
});

router.post('/add_images',cpUpload,function(req,res,next){
	pf.add_images(req,res,next);
});
router.post('/rating',function(req,res,next){
	pf.add_rating(req,res,next);
});

module.exports = router;