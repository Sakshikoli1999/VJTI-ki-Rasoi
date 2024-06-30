const express=require('express');
const router=express.Router();
const catchAsync =require('../utils/catchAsync');
const NewMember=require('../models/newmembership');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');

router.get('/newmembership',isLoggedIn,isGuest, async (req, res,) => {
    res.render('newmembership/newmembership');
});


router.post('/newmembership',isLoggedIn,isGuest,(req,res)=>{
   const newmember=new NewMember(req.body);
    newmember.save();
    req.flash('success','you are registered as a member of mess');
    res.redirect('/');
})

module.exports=router;