const Questions = require("../Models/questionModel");

const generateRandomQuestions = async (req, res) => {
  let count = 10;
  try {
    let questions = [];
    let semple = await Questions.find({});

    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * semple.length);
      questions.push({ ...semple[randomIndex] });
    }

    res.status(200).send({ message: "suc0", data: questions });
  } catch (error) {
    console.log(error);

    res.status(404).send({ message: "failed", data: error });
  }
};

const checkAnswers = async (req, res) => {
  let score = 0;
  const userAnswers = req.body.answers; // Array of answers (questionId and selectedAnswer)
  
  try {
    // Using a for...of loop to handle async await properly.
    for (const userAnswer of userAnswers) {
      // Find the question by its ID
      const question = await Questions.findById(userAnswer.questionId); 

      if (question) {
        // Compare the answer with the correct answer
        if (question.ans === userAnswer.selectedAnswer) {
          score += 1;
        }
      }
    }

    // After all answers are checked, send the response with the score
    res.status(200).send({ message: "success", score });
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "error", error: error.message });
  }
};


module.exports = { generateRandomQuestions,checkAnswers };
