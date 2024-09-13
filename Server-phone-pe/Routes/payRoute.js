const express = require('express');
const payController = require('../Controllers/payController')

const router = express.Router();

router.get('/',( req , res ) => {
    res.send('Phone Pay Payment Integration')
})

router.post('/payOrder', payController.payOrder );
router.post('/status', payController.payStatus);
router.get('/payHistory', payController.paymentHistory);

module.exports = router;