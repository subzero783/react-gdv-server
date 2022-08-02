
const express = require('express');
const router = express.Router();
router.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const client = require('../includes/databaseConnect');
const url = require('url');

const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());



async function addContactPageEmail( req, res ){

    try {


        const queryObject = url.parse(req.url, true).query;

        await client.connect();

        const collection = client.db('GaleriaDelValle').collection('contactPageEmails');

        const userMessage = {
            "email" : queryObject.email,
            "name" : queryObject.name, 
            "message" : queryObject.message
        };

        const objectSent = await collection.insertOne(userMessage);

        let contactEmailMessage = null;

        if( objectSent.acknowledged === true ){
            contactEmailMessage = 'We have received your message and will get back to shortly!'
        }else{
            contactEmailMessage = 'Something went wrong!'
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.send({
            data: contactEmailMessage
        })

        let transporter = nodeMailer.createTransport({
            // service: 'hotmail',
            host: 'smtp.sendgrid.net',
            port: 465, 
            secure: true, 
            auth: {
                user: process.env.SEND_EMAIL_EMAIL,
                pass: process.env.SEND_EMAIL_PASS
            }
        });

        let mailOptions = {
            from: '"Galeria del Valle" <'+process.env.SEND_EMAIL_USER_EMAIL+'>', // sender address
            to: queryObject.email, // list of receivers
            subject: 'SUBJECT LINE TEST', // Subject line
            text: '<h1>hello</h1>', // plain text body
            html: '<b>NodeJS Email Tutorial</b>' // html body
        };
  
        transporter.sendMail(mailOptions, (error, info) => {    
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        


    } finally {
        await client.close();
    }
}

module.exports = addContactPageEmail;