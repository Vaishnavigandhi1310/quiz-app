const express = require('express');
const { userTokenVerification } = require("../Middleware/middleware");
const { addUser, getUser, updateUser, deleteUser, login } = require('../Controller/userController');
const{generateRandomQuestions,checkAnswers}=require('../Controller/questioncontroller')
const router = express.Router();


router.post('/add', addUser); 
router.get('/get', getUser);  
router.patch('/update', updateUser);  
router.delete('/delete', deleteUser);  
router.post('/login', login); 
router.get('/questions',generateRandomQuestions)
router.post('/check-answers',checkAnswers)


module.exports = router;
