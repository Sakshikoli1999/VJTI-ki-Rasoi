const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const Leave=require('../models/leave');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/putleave',isLoggedIn,isMember,(req,res)=>{
    res.render('members/leave')
})

router.post('/putleave',isLoggedIn,isMember,async(req,res)=>{
    const date1=new Date(req.body.leaveStartDate);
    const date2=new Date(req.body.leaveEndDate);
    var leaves;
    const time_difference=date2.getTime()-date1.getTime();
    if(time_difference===0){
        leaves=1;
    }
    else{
        leaves=time_difference/(1000*60*60*24)
    }
    const leave= await Leave.create({
        card:req.body.card,
        leaveStartDate:req.body.leaveStartDate,
        leaveEndDate:req.body.leaveEndDate,
        totalLeaves:leaves
    })
    console.log(leave)
    leave.save();
    req.flash('success','successfully leave recorded');
    res.redirect('/');
})

module.exports=router;