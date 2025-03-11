const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const S_key = "password"; 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    Gender: {
        type:String,
        enum : ["male","female"],
        default:"male"
    },
    mobile: {
        type: Number,
        required: true
    }  
}, {
    timestamps: true
});


userSchema.static("generateToken", function(name, mobile) {
    const token = jwt.sign({ name: name, mobile: mobile }, S_key, { expiresIn: "1h" });
    return token;
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;



