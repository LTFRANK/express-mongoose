var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var _Photo=new Schema({
    fileurl:{
    	type:String,
    	unique:true
    }
    albumname:String,
    albumid : {
    	type : mongoose.Schema.ObjectId,
    	ref:"album"
    },
    uploadtime:String

})
module.exports = mongoose.model("photo", _Photo);