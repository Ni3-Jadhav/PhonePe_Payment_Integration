const express = require('express');
const cors = require('cors');
require('dotenv').config();
const payRoute = require('./Routes/payRoute')
const db = require('./Config/mongoDB');

const payApp = express();

payApp.use(cors());
payApp.use(express.json());
payApp.use(express.urlencoded({ extended : true }));

payApp.use('/',payRoute);

const PORT =  3050 || process.env.PORT

payApp.listen( PORT ,(eroor) => {
    if(eroor){
        console.log( 'ERROR in PORT ',eroor);
        
    }else{
        console.log(`Server has started on PORT ${PORT}`);
        
    };
})

db.connect();