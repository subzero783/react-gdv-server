


const express = require('express');
const router = express.Router();
router.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const addEmailToNewsletter = require('../includes/add-email-to-newsletter');


router.get('/', (req, res)=>{
  res.send(`Working!`);
}); 

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