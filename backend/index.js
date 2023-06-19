const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express(); 
const teamRouter = require('./routes/team');
const playerRouter = require('./routes/player'); 
const HTTP_STATUS = require('./utils/httpStatus');
const cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json());  
const dotenv = require('dotenv');
const databaseConnection = require('./config/database'); 
const mongodb = require('mongodb');
dotenv.config();
app.use(express.urlencoded({extended: true}));
// Creates an Express application
  
app.use(express.json());   
app.use(teamRouter);  
app.use(playerRouter);  

databaseConnection(() => {
    console.log("MongoDB database is connected!!");
    app.listen(3000, () => {
        console.log('Application is running on 3000');
    });
})

export default app;