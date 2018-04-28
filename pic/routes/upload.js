const express=require("express");
const router = express.Router();
const multer=require("multer");
const path=require("path");
const fs=require("fs");


const upload=multer({
	dest:"upload"
});
const single=upload.single("file");
const uploads=upload.array("files",9);
const imgList=[];

router.get("/",function(req,res){
		const session=req.session||"";
	res.render("upload",{list:imgList,user:session.user})
});
router.post("/up",single,function(req,res){
	
	imgList.push(req.file);
	console.log(imgList)
	res.redirect("back");

});

router.post("/up2",uploads,function(req,res){
	res.send(req.files);
	
});
router.get("/img/:id",function(req,res){
	var _id=req.params.id;
	var rs=fs.createReadStream("upload/"+_id);
	rs.pipe(res);

});



module.exports=router;
