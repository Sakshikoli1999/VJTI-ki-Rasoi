const express=require('express');
const router=express.Router();
const passport=require('passport');
const catchAsync =require('../utils/catchAsync');
const User=require('../models/user');
const { isLoggedIn,isAdmin,isMember,isGuest} = require('../middleware');
const flash=require('connect-flash');


router.get('/register',(req,res)=>{
    res.render('users/register');
});


router.post('/register', catchAsync(async (req, res, next) => {
    try {
        let card;
        const { email,name, username, password } = req.body;
        
        if(!req.body.card)
        card=-1;
        else
        card=req.body.card;

        const user = new User({ email,card,name,username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'MESS!!');
            console.log(req.body)
            res.redirect('/');
            
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login',async(req,res)=>{
    res.render('users/login')
})

router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{

    req.flash('success','welcome back!! you are successfully logged in');
const redirectUrl = req.session.returnTo || '/';
delete req.session.returnTo;
res.redirect(redirectUrl);
})


router.get('/logout',isLoggedIn, (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
})

module.exports=router;
