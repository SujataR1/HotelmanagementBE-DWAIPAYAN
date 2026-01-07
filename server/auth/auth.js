const {customerlogin}=require("./customerlogin");
const {customersignup}=require("./customersignup");
const router=require("express").Router();

router.post("/customerlogin",customerlogin);
router.post("/customersignup",customersignup);
module.exports=router;