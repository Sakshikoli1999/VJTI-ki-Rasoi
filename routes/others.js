const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/aboutus',async (req, res) => {
    res.render('footers/aboutus')
})

router.get('/blog',(req,res)=>{
    res.render('footers/blog')
})

router.get('/contactus',(req,res)=>{
    res.render('footers/contactus')
})

router.get('/termsandconditions',(req,res)=>{
    res.render('footers/termsandconditions')
})

router.get('/blog',(req,res)=>{
    res.render('footers/privacypolicy')
})

module.exports=router;