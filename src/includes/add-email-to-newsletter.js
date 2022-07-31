

const dotenv = require('dotenv');
dotenv.config();
const client = require('../includes/databaseConnect');
const url = require('url');


async function addEmailToNewsletter( req, res ){
    try {


        const queryObject = url.parse(req.url, true).query;

        await client.connect();

        const collection = client.db('GaleriaDelValle').collection('newsletterEmails');

        const userInfo = {
            "email" : queryObject.email
        };

        const objectSent = await collection.insertOne(userInfo);

        let emailSentMessage = null;

        if( objectSent.acknowledged === true ){
            emailSentMessage = 'You have subscribed successfully!'
        }else{
            emailSentMessage = 'Something went wrong!'
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.send({
            data: emailSentMessage
        })


    } finally {
        await client.close();
    }
}

module.exports = addEmailToNewsletter;