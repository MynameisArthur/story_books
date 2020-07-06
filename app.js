const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
//Load config
dotenv.config({ path: './config/config.env' });
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`);
});
