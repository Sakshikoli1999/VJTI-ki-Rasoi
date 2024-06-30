const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const methodOverride = require('method-override');
const Menu = require('./models/menu');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const NewMember=require('./models/newmembership');
const Leave=require('./models/leave');
const Review=require('./models/review');

const { isLoggedIn,isAdmin,isMember,isGuest } = require('./middleware');
const router=express.Router();

const userRoutes=require('./routes/users');
const profileroutes=require('./routes/profile');
const newmemberRoutes=require('./routes/newmembership');
const leaveRoutes=require('./routes/leave');
const newmemberlistRoutes=require('./routes/newmemberlist');
const leavelistRoutes=require('./routes/leavelist');
const reviewRoutes=require('./routes/review');
const reviewlistRoutes=require('./routes/reviewlist');
const otherRoutes=require('./routes/others');


mongoose.connect('mongodb://127.0.0.1/mess-management');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))



app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}



app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));  

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    // if(req.user && req.user.username==='admin'){
    //     res.locals.admin=req.user;
    // }
    // if(req.user && req.user.card!=-1)
    // {
    //     res.locals.member=req.user;
    // }
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.static(path.join(__dirname, "public")));
app.use('/',userRoutes);
app.use('/',profileroutes);
app.use('/',newmemberRoutes);
app.use('/',leaveRoutes);
app.use('/',newmemberlistRoutes);
app.use('/',leavelistRoutes);
app.use('/',reviewRoutes);
app.use('/',reviewlistRoutes);
app.use('/',otherRoutes);

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/menus',isLoggedIn, async (req, res) => {
    const menus = await Menu.find({});
    res.render('menus/index', { menus })
})

app.post('/menus',isLoggedIn, async (req, res) => {
    const menu = new Menu(req.body.menu);
    await menu.save();
    res.redirect(`/menus/${menu._id}`);
    console.log(menu)
})

app.get('/menus/:id', async (req, res,) => {
    const menu = await Menu.findById(req.params.id)
    res.render('menus/show', { menu });
});

app.get('/menus/:id/edit',isLoggedIn,isAdmin, async (req, res) => {
    const menu = await Menu.findById(req.params.id);
    res.render('menus/edit', { menu });
})

app.put('/menus/:id', async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const menu = await Menu.findByIdAndUpdate(id, { breakfast: { fixed: ['Tea', 'Coffee', 'Milk'], variable_breakfast: req.body.breakfast.variable_breakfast } ,
    
    lunch: { fixed: ['roti', 'rice', 'salad'], variable_sabji: req.body.lunch.variable_sabji } ,

    dinner: { fixed: ['roti', 'rice', 'salad'], variable_sabji: req.body.dinner.variable_sabji , variable_sweets: req.body.dinner.variable_sweets} } );
    req.flash('success','successfully edited menu');
    
    res.redirect(`/menus/${menu._id}`);                    
});


app.listen(3000, () => {
    console.log('Serving on port 3000')
})

