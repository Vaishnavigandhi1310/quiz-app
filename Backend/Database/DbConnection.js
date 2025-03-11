const mongoose = require("mongoose");

const dbUrl = "mongodb://localhost:27017/quiz";

const dbConnection = ()=>{
    try {
        mongoose.connect(dbUrl);
        console.log("databse Connection  succeed");
        
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = dbConnection;