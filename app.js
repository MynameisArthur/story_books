const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const app = express();

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', ' .hbs');

//Load config
dotenv.config({ path: './config/config.env' });
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
