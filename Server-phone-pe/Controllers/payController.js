const crypto = require('crypto');
const axios = require('axios');
const paymentDB = require('../Models/paymentModel');

const Salt_Key = process.env.SALT_KEY;
const Merchant_Id = process.env.MERCHANT_ID;

exports.payOrder = async ( req , res ) => {

    try {
        
        let merchantTransactionId = req.body.transactionID;
        const data = {
            merchantId: Merchant_Id,
            merchantTransactionId: merchantTransactionId,
            name: req.body.userName,
            merchantUserId : req.body.MID,
            amount: req.body.payAmount * 100,
            redirectUrl: `http://localhost:3050/status?id=${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: req.body.userMo_No,
            paymentInstrument: {
                type: "PAY_PAGE"
            }
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + Salt_Key;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');

        const checksum = sha256 + '###' + keyIndex;

        // const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay" ;  
        // prod_URL for the real time use , at final stage

        // for testing use test_URL

        const test_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay"

        const options = {
            method: 'POST',
            url: test_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios(options);

        
        const paymentData = new paymentDB({
            userName: req.body.userName,
            mobile: req.body.userMo_No,
            product: req.body.selectProduct,
            merchantUserId : req.body.MID,
            amount: req.body.payAmount,
            transactionID: merchantTransactionId,
            paymentStatus: response.data.success ? 'Success' : 'Failure',
            paymentResponse: response.data,
        });

        await paymentData.save();
        return res.json(response.data);

    } catch (error) {
        console.log('Error in  payOrder Api', error);
         return res.status(500).json({ message: "Error processing order" });
    }
};

exports.payStatus = async ( req , res ) => {

    const merchantTransactionId = req.query.id
    const merchantId = Merchant_Id


    const keyIndex = 1
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + Salt_Key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');

    const checksum = sha256 + '###' + keyIndex;


    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }


    }


    axios.request(options).then( (response)=> {
        if (response.data.success === true) {
            const url = 'http://localhost:3000/paySuccess'
            return res.redirect(url)
        } else {
            const url = 'http://localhost:3000/payFail'
            return res.redirect(url)
        }

    }).catch( (error) => {
        console.log(error)
    })
};



exports.paymentHistory = async (req, res) => {

    try {

        const payments = await paymentDB.find();
        res.json(payments);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching payment data' });
    }
};