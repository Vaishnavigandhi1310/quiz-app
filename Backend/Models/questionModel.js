const { default: mongoose } = require("mongoose");

const questionSchema = new mongoose.Schema({
    que: String,
    a: String,
    b: String,
    c: String,
    d: String,
    ans: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;