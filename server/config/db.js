// Import the mongoose module
const mongoose = require("mongoose");
require('dotenv').config();
let mongoDB=process.env.mongodburi;
mongoose.set("strictQuery", false);

if(!mongoDB){
console.log("MongoaDB connection key not defined in .env");
process.exit(1);
}
// Define the database URL to connect to.



const connectdb=async()=>{
    try{
        await mongoose.connect(mongoDB);
        console.log(mongoDB.uri)

    }
    catch(error){
        console.log("Error occured: ",error);
    }
}

module.exports=connectdb;