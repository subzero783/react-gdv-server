


const express = require('express');
const router = express.Router();
router.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const addEmailToNewsletter = require('../includes/add-email-to-newsletter');
const addContactPageEmail = require('../includes/add-contact-page-email');


router.get('/', (req, res)=>{
  res.send(`Working!`);
}); 

router.get('/newsletter-email', (req, res)=>{
  addEmailToNewsletter(req, res);
});

router.get('/contact-page-email', (req, res)=>{
  addContactPageEmail(req, res);
});

module.exports = router;