const mongoose = require("mongoose");

const duplicateUserSchema = mongoose.Schema({
    first_name : {
        type: String
    },
    last_name:{
        type: String
    }, 
    job_title:{
        type: String
    },
    email:{
        type: String
    },
    age:{
        type : Number
    }
});
module.exports = mongoose.model("DuplicateUser", duplicateUserSchema);