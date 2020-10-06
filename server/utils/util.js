const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = { 
    jwtEncode: function(paylod){
      let token = jwt.sign(paylod,process.env.JWT_KEY);
      return token;
    },
    jwtDecode: function(token){
      let paylodDecoded = jwt.verify(token, process.env.JWT_KEY);
      return paylodDecoded;
    },
    sendResponse: function(result, req,res){
      if(result==undefined && result==null){
        res.status(400).send("something went wrong!");  
      }else{
        res.send(result);
      }
    },
    ucfirst: (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    logIt: (message,type) => { //type-> info,error
      if(type=="error"){
        console.error("=====" + new Date().toString() + "=====");
        console.error(message);
      }
      else if(type=="info"){
        console.log("=====" + new Date().toString() + "=====");
        console.log(message);
      }
    }
}