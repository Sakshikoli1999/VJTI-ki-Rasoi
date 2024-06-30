const express=require('express');
const router=express.Router();
const passport=require('passport');
const catchAsync =require('../utils/catchAsync');
const Review=require('../models/review');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/review',isLoggedIn,(req,res)=>{
    res.render('users/review')
})

router.post('/review',isLoggedIn,(req,res)=>{
    const review=new Review(req.body);
    review.save();
    req.flash('success','successfully added an review');
    res.redirect('/')
})

module.exports=router

