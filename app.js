require('dotenv').config();
const express = require('express');
const app = express();

// DB
const mongoose = require('mongoose');
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECITON}?retryWrites=true&w=majority`;

// routes
const userRoute = require('./routes/user-route');

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, PUT, GET, POST, DELETE, PATCH');
    next();
});

// set routes
app.use('/user', userRoute);

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(process.env.PORT);
    } catch (error) {
        console.log('DB Error', error);
    }
};
connect();
