/* GET home page. */
const express=require("express");
const router = express.Router();

router.get("/",function(req, res,next){

	const session=req.session;
  res.render('index', { title: 'Express',user:session.user})
})

module.exports= router;
