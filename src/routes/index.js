


import express from 'express';
const router = express.Router();
const addEmailToNewsletter = require('../includes/add-email-to-newsletter');

router.use(express.json());

const dotenv = require('dotenv');
dotenv.config();
 

router.get('/newsletter-email', (req, res)=>{
  addEmailToNewsletter(req, res);
});


router.get('/hello', (req, res) => {
    res.send(`Hello World!`);
});

router.get('/hello-world', (req, res) => {
    res.send(`Hello World!`);
});

module.exports = router;