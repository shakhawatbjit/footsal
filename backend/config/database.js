const mongoose = require('mongoose');

const databaseConnection = async (callback)=>{
    try {
        mongoose.set("strictQuery", false);
        const client = await mongoose.connect(process.env.DATABASE_URI,  {
            useNewUrlParser: true, 
            ssl: true,
            sslValidate: false,});
        if (client) console.log("Database connected!");
        callback();
    } catch (error) {
        throw new Error(error.message);
    }
}


module.exports = databaseConnection;