var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var _Album=new Schema({
    albumname :{//相册名
    	type:String,
    	unique:true
    }, 
    coverurl:String,//相册封面地址
    createtime:String,//创建时间
    creator:String//创建人
})
module.exports = mongoose.model("album", _Album);