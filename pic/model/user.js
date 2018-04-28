var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var _User=new Schema({
    username :{
    	type:String,
    	unique:true
    }, 
    name:String,
    password : String,
    usericon:String,
    registertime:String

})
module.exports = mongoose.model("user", _User);