const express=require('express');
const router=express.Router();
const passport=require('passport');
const catchAsync =require('../utils/catchAsync');

const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/profile',isLoggedIn, async (req, res) => {
    res.render('myprofile/profile')
})

module.exports=router


