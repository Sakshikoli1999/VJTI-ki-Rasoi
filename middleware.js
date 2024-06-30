const flash=require('connect-flash');
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdmin = async (req, res, next) => {
    if (req.user.email === 'admin@gmail.com') {
        next();
    } else {
        req.flash('error', 'You are not an admin');
        return res.redirect("/login");
    }
}
module.exports.isMember=async(req,res,next)=>{
    if(req.user.card!=-1)
    {
        req.flash('success','you are logged in as a member');
        next();
    }
    else
    {
    req.flash('error','first log in as a member');
    return res.redirect('/login');
    }
}

module.exports.isGuest=async(req,res,next)=>{
    if(req.user.card===-1 && req.user.email!=='admin@gmail.com')
    {
        req.flash('success','you are logged in as a Guest');
        next();
    }
    else
    {
    req.flash('error','you are already a member or an admin');
    return res.redirect('/login');
    }
}