const exp = require('constants');
const { Router } = require('express');
const express = require('express');
const tourRouters = require('./routes/tourRoutes');
const userRouters = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req,res,next)=>{
    console.log(req.headers);
    next();
})

app.use('/tours', tourRouters);
app.use('/users', userRouters);

app.all('*',(req,res,next)=>{
    res.status(404).json({
        status : "Failed",
        message : `Cannot find ${req.originalUrl} on this server!..`
    })
})

module.exports = app;
