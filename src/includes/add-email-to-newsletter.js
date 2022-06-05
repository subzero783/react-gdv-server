
import dotenv from 'dotenv';
dotenv.config();

import url from 'url';


const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoUri = process.env.MONGODB_URI;


async function addEmailToNewsletter( req, res ){
    const client = new MongoClient(mongoUri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    });

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

        res.status(200).send(emailSentMessage)


    } finally {
        await client.close();
    }
}

module.exports = addEmailToNewsletter;