var mongoose = require('mongoose');


//mongoose.connect('mongodb://username:password@host:port/database');

mongoose.connect('mongodb://localhost:27017/ecomm',function(error){
if(error){
console.log(error);
}
else{
console.log("database connection successfull");
});

