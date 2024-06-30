const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const Review=require('../models/review');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/reviewlist', async (req, res) => {
    const reviewlist = await Review.find({});
    res.render('users/reviewlist', { reviewlist })
})


module.exports=router;