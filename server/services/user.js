const User = require('../models/user');
const Papa = require('papaparse');
const DuplicateUser = require("../models/duplicateUsr");
const utils = require('../utils/util')

module.exports = {
    
    add: async function(user,next){
        let result = "";
    try{
        let JsonVal = Papa.parse(user,{
            header: true,
            delimeter: ',',
            skipEmptyLines: true,
        });
        if(!JsonVal){
            throw 'uploaded csv file should not be empty'
        }
        if(JsonVal.meta.fields.includes('first_name') === false){
            let checkUser = JsonVal.data.map((val)=>val.email)
            let findUser = await User.find({"email" : { $in : checkUser}});
            findUser.forEach(async(usr)=>{
                JsonVal.data.forEach(async(val)=>{
                    if(usr.email === val.email && (usr.job_title === "" || usr.job_title === undefined)){
                        let response = await User.findByIdAndUpdate({_id : usr._id},{ '$set': {job_title : val.job_title} }); 
                        if(response){
                            result = 'Merged Successfully With job title'
                        } 
                    }else if(usr.email === val.email && usr.job_title !== "" || usr.job_title !== undefined){
                        let findUser = await User.findOne({email : usr.email})
                        if(findUser){
                            findUser = findUser.toObject();
                            delete findUser._id;
                            await new DuplicateUser(findUser).save()
                        }
                        let response = await User.findOneAndUpdate({_id : usr._id},{ '$set': {job_title : val.job_title} });
                        if(response){
                            result = 'Updated Successfully'
                        }
                    }
                }) 
            })
        }else{
            result = await User.insertMany([ 
                ...JsonVal.data
            ]) 
        }
        }catch(err){
            next(err);
        }
        return result
    },
    listAll: async function(start,length,next){
        let result = null;
        let condition = {};
        try{
            result = await User.find(condition)
                .limit(length)
                .skip(start)
                .sort({
                    name: 'asc'
                });
            return result
        }
        catch(err){
            next(err)
        }
    },
    getUser: async function(next){
        let result = null;
        try{
            result= await User.aggregate([{$group: { _id : { job_title: "$job_title"}, count: { "$sum": 1 } } }])
            return result
        }
        catch(err){
            next(err);
        }
    },
    login: async function (email,next) {
        let result = null,token  = null
        try {
          let user = await User.findOne({ email: email });
          if(!user){
            throw "user does not exist";
          }
        result = user;
        token = await utils.jwtEncode({ email: user.email, userId: user._id });
        } catch (err) {
          next(err)
        }
        return {result,token};
      },
}