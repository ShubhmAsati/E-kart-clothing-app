var exports = module.exports = {};
var config = require('./custom_config');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.randomID = function(length,ALPHABET) {
    var rtn = '';
    ALPHABET = ALPHABET.replace(/\s/g,'');
    for (var i = 0; i < length; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}
exports.verifyVendorToken = function(req,res,next){
 
	if(!req.headers.authorization){
//        return  res.status(401).send("Unauthorizeddd request");
 return res.json({
                          "id":"-1",
                            "status":"401",
                            "message":"Unauthorized request"
                        });
    }
    let token = req.headers.authorization.split(" ")[0];
	if(token === "null"){
    return

   return  res.status(401).send("Unauthorized request");
    }

    jwt.verify(token, config.jwtTokenSecret, function(err, decoded) {
        if (err){
			console.log(err);
           return res.json({
                                     "id":"-1",
                                       "status":"401",
                                       "message":"Unauthorized request"
                                   });
        }else{
            // if everything good, save to request for use in other routes
			req.email = decoded.email;
	        next();
        }
    });
}

exports.decodeVendorToken = function(req,token1){
    //let token = req.headers.authorization.split(" ")[1];
    return jwt.decode(token1, config.jwtTokenSecret);
}
exports.createToken = function(obj){
    var token = jwt.sign(obj, config.jwtTokenSecret, {
        expiresIn: 86400 // expires in 24 hours
    });

    return token;
}
exports.createPassword = function(str){
    var t = bcrypt.hash(str, saltRounds, function(err, hash) {
        return hash;
    });
    return t;
}





