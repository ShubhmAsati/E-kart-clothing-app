var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
const port = 8080;
var path_image = 'public/images';
var mongoose = require('mongoose');
var db_url = 'mongodb://localhost:27017/ecomm';
var client = require('./common/redis_client');

mongoose.connect(db_url,{ useNewUrlParser: true },function(error){
if(error){
console.log(error);
}
else{
console.log("database connection successfull");
}
});


app.use( bodyParser.json({limit: '50mb'}) );




// Add headers

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
});
app.use(express.static(path.join(__dirname,path_image)));

  
  
app.use(function(req,res,next){
res.setHeader('Content-Type', 'application/json');
// Print redis errors to the console
client.on('error', (err) => {
  if(err){
	  console.log("error in redis server");
	  next();
  }
});


client.get(req.originalUrl+JSON.stringify(req.body),(error,data)=>{
		if(error){
			console.log(error);
		}
		if(data){
			res.json(JSON.parse(data));
			return;
		}
		else{
		next();
		}
});
});

/*
app.all('/api/*',verifyVendorToken,function(error,result){
	console.log("inside verification token");
});
*/



app.get('/',(req,res)=>{
	res.send("you are welcomed");
});


var login_register = require('./common/login_signup');
app.use('/login_signup',login_register);



//this section have authentication of access token 
/*
app.all('/api/*',c_f.verifyVendorToken,(req,res,next)=>{
	console.log("hii");
	next();
});
*/

var test = require('./test');
app.use('/test',test);



var user_routes = require('./routes/user_route');
app.use('/api',user_routes);







//routes for user that requires token

var wishlist_routes = require('./routes/user/wishlist_route');
app.use('/user',wishlist_routes);

var bag_routes = require('./routes/user/bag_route');
app.use('/user',bag_routes);

var order_routes  = require('./routes/user/order_route');
app.use('/user',order_routes);


//routes for manager 

var manager_product_routes = require('./routes/manager/product_route');
app.use('/manager',manager_product_routes);

var manager_order_routes = require('./routes/manager/order_route');
app.use('/manager',manager_order_routes);





var product_routes = require('./routes/product_route');
app.use('/api',product_routes);


app.listen(port,()=>{
	console.log("----------------------------server started successfully-------------------------");
	
});