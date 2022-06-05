


import express from 'express';
// import axios from 'axios';

const app = express();

const port = process.env.PORT || 8000;

const mainRoutes = require('./routes');

app.use(mainRoutes);

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
app.use((err, req, res, next)=>{
    res.locals.error = err;
    const status = err.status || 500;
    res.status(500).send({errors: err});
});

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});