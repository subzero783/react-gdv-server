

const dotenv = require('dotenv');
dotenv.config();
const client = require('../includes/databaseConnect');
const url = require('url');


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

        console.log(userMessage);

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


    } finally {
        await client.close();
    }
}

module.exports = addContactPageEmail;