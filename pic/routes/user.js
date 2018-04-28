/* GET users listing. */
const express=require("express");
const router = express.Router();
const multer=require("multer");
const path=require("path");
const fs=require("fs");

const User=require("../model/user");

const upload=multer({
	dest:"icon"
});
const single=upload.single("file");
const uploads=upload.array("files",9);


router.get("/",function(req, res){
	res.locals.user=req.session.user||"";

	res.render("user",{user:req.session.user});
	

})

router.get("/reg",function(req,res){
	res.render("reg")

})
router.post("/reg",async function(req,res){
	var time=new Date();

  const user=new User({
  	username:req.body.username,
  	password:req.body.password,
  	usericon:"./images/father.png",
  	registertime: time.toLocaleDateString()+" "+time.toLocaleTimeString()
  });
  if(user.username==""&&user.password==""){
  	res.send({status:1,message:"用户名或者密码不能为空"})
  }
  const userdata=await User.findOne({username:req.body.username});
  if(userdata){
  		res.send({status:1,message:"此用户已被注册"})
  }else{
  		await user.save();
  		res.redirect("/user/login");
  }
})
router.get("/login",function(req,res){	
	res.render("login")
})
router.post("/login",function(req,res){

	var user={
		username:req.body.username,
		password:req.body.password
	}
	User.findOne({username:user.username},function(err,data){

		if(err){
			console.log(err);
		}
		if(data){
			if(data.password==user.password){

				req.session.user=data;
				res.locals.user=data;
				res.redirect("/user?"+data._id)
			}
		}

	})

})

router.get("/logout",function(req,res){
	req.session.user="";
	res.send({message:"退出登录"})
})
router.post("/logout",function(req,res){
	req.session.user="";
	res.send({message:"退出登录"})
})

router.post("/uploadicon",single,function(req,res){
	console.log(req.file);
	User.update({username:req.body.username},{usericon:"user/img/"+req.file.filename},function(err,data){
		if(err){
			console.log(err);
		}
		req.session.user.usericon="user/img/"+req.file.filename;
		res.send({status:0,message:"修改成功",result:"user/img/"+req.file.filename});
	})

})

router.get("/img/:id",function(req,res){
	//读取文件流  用导管传输给给响应
	fs.createReadStream("icon/"+req.params.id).pipe(res);
})
module.exports = router;

