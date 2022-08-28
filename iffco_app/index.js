if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}

const express = require("express");
const path = require('path');
const app = express()
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const session = require('express-session');
const flash = require('connect-flash');

const dbUrl = process.env.DB_URL

const homeRoutes = require('./routes/home');
const productRoutes = require('./routes/products');
const partnerRoutes = require('./routes/partners');
const orderRoutes = require('./routes/orders');

const MongoDBStore = require("connect-mongo");

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("Database Connected");
})
.catch(err => {
    console.log("Database Connection Error");
    console.log(err);
});

const secret = process.env.SECRET;

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + (1000 * 60 * 60 * 24 * 7),
    maxAge: (1000 * 60 * 60 * 24 * 7)
  }
}

app.use(session(sessionConfig));
app.use(flash());

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoSanitize());

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/partners', partnerRoutes);
app.use('/orders', orderRoutes);

//Error Middlewares

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});

const port = process.env.PORT || 8080;
app.listen(port, () =>{
  console.log(`Server started on port: ${port}`);
});