const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

const app = express();

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');
//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));

//Load config
dotenv.config({ path: './config/config.env' });
//Passport config
require('./config/passport')(passport);

//Sessions
app.use(session({
    secret: 'monday',
    resave: false,
    saveUninitialized: false
}));
//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
