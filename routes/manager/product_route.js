var express = require('express');
var router = express.Router();
var m_p_f = require('../../functions/manager/product_function');
var multer = require('multer');
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

router.post('/product',cpUpload,function(req,res,next){
	m_p_f.add_product(req,res,next);
});

router.put('/product',function(req,res,next){
	m_p_f.update_product(req,res,next);
});

router.get('/product',function(req,res,next){
	m_p_f.get_all_products(req,res,next);
});



//route is used to delete multiple products only soft delete......
router.delete('/product',function(req,res,next){
	m_p_f.delete_product(req,res,next);
});













module.exports = router;