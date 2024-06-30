const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const NewMember=require('../models/newmembership');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/newmemberlist',isLoggedIn,isAdmin, async (req, res) => {
    const newmemberlist = await NewMember.find({});
    res.render('admins/newmemberlist', { newmemberlist })
})


module.exports=router;