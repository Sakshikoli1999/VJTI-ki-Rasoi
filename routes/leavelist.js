const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const Leave=require('../models/leave');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/leavelist',isLoggedIn,isAdmin,async(req,res)=>{
    const leavelist = await Leave.find({});
    res.render('admins/leavelist',{leavelist})
})
module.exports=router;