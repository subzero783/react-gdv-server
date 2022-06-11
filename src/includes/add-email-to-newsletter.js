

const dotenv = require('dotenv');
dotenv.config();

const url = require('url');

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

        console.log(emailSentMessage);

        res.header('Access-Control-Allow-Origin', '*');
        res.send({
            data: emailSentMessage
        })


    } finally {
        await client.close();
    }
}

module.exports = addEmailToNewsletter;