const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name : {
        type: String
    } ,
    last_name:{
        type: String
    }, 
    job_title:{
        type: String
    },
    email:{
        type: String,
        unique:true
    },
    age:{
        type : Number
    },
    user:{
        type : Object
    }
});
module.exports = mongoose.model("User", userSchema);