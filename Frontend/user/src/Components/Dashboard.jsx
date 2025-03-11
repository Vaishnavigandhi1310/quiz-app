
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/Styles/Dashboard.css";

function Dashboard() {
  const [timeRemaining, setTimeRemaining] = useState(800);
  const [timerActive, setTimerActive] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [questions, setquestion] = useState([]);
  const [currentQueIndex, setCurrentQueIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const toggleTimer = () => {
    setIsStarted(true);

    if (timerActive) {
      setTimerActive(false);
    } else {
      setTimerActive(true);
    }
  };

  useEffect(() => {
    let interval;

    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeRemaining === 0) {
      setTimerActive(false);
      handleSubmit();
    }

    return () => clearInterval(interval);
  }, [timerActive, timeRemaining]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const updateDate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    setCurrentDate(formattedDate);
  };

  useEffect(() => {
    hendleGetQuestion();
    updateDate();
  }, []);

  const hendleGetQuestion = async () => {
    try {
      const respons = await axios.get(`http://localhost:8080/user/questions`);
      if (respons.status === 200) {
        setquestion(respons.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentQueIndexstion = questions[currentQueIndex]?._doc;

  const handleNextQue = () => {
    if (currentQueIndex < questions.length - 1) {
      setCurrentQueIndex(currentQueIndex + 1);
    }
  };

  const handlePreviousQue = () => {
    if (currentQueIndex > 0) {
      setCurrentQueIndex(currentQueIndex - 1);
    }
  };

  const handleQuestionChangeByNumber = (event) => {
    setCurrentQueIndex(Number(event.target.value));
  };

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    const questionId = currentQueIndexstion._id; // Get the question's ID

    // Update the answers array with the selected answer for the current question
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );

      if (existingAnswerIndex !== -1) {
        // If the answer for this question already exists, update it
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, selectedAnswer };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, selectedAnswer }];
      }
    });

    // Mark this question as answered
    if (!answeredQuestions.includes(questionId)) {
      setAnsweredQuestions((prevAnswered) => [...prevAnswered, questionId]);
    }
  };

  const getSelectedAnswer = (questionId) => {
    const answer = answers.find((answer) => answer.questionId === questionId);
    return answer ? answer.selectedAnswer : null;
  };

  const handleSubmit = async () => {
    try {
      // Send the answers to the backend for checking
      const response = await axios.post(
        "http://localhost:8080/user/check-answers",
        {
          answers: answers,
        }
      );

      if (response.status === 200) {
        console.log(response.data.score);

        // Set the score based on the backend response
        setScore(response.data.score);

        setIsSubmitted(true); // Mark as submitted
      }
    } catch (error) {
      console.log("Error submitting answers: ", error);
    }
  };

  return (
    <div className="p-0 m-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid m-3">
          <div className="d-flex justify-content-between w-100">
            <button
              className={`btn btn-primary  ${isStarted ? "d-none" : ""}`}
              onClick={toggleTimer}
            >
              start
            </button>
            <div>
              <span>{formatTime(timeRemaining)}</span> &nbsp;|&nbsp;
              <span>{currentDate}</span>
            </div>
          </div>
        </div>
      </nav>

      {isStarted ? (
        <div>
          {isSubmitted ? (
            <div className="mt-4">
              <h4>
                Your Score: {score} Out Of {questions.length}
              </h4>
            </div>
          ) : (
            <div className="p-2 ms-4 mt-4">
              <div className="row">
                <div className="col-lg-8">
                  <h2>Questions</h2>
                  <div>
                    <h4>
                      {currentQueIndex + 1}. {currentQueIndexstion?.que}
                    </h4>
                    <div className="flex-column text-center gap-3 ms-5 mt-4">
                      <div className="col-sm-6 d-flex gap-3 m-3">
                        <input
                          type="radio"
                          className="btn btn-primary"
                          id="a"
                          name="answer"
                          value="a"
                          checked={
                            getSelectedAnswer(currentQueIndexstion?._id) === "a"
                          }
                          onChange={handleAnswerChange}
                        />
                        <label htmlFor="a">A. {currentQueIndexstion?.a}</label>
                      </div>
                      <div className="col-sm-6 d-flex gap-3 m-3">
                        <input
                          type="radio"
                          className="btn btn-primary"
                          id="b"
                          name="answer"
                          value="b"
                          checked={
                            getSelectedAnswer(currentQueIndexstion?._id) === "b"
                          }
                          onChange={handleAnswerChange}
                        />
                        <label htmlFor="b">B. {currentQueIndexstion?.b}</label>
                      </div>
                      <div className="col-sm-6 d-flex gap-3 m-3">
                        <input
                          type="radio"
                          className="btn btn-primary"
                          id="c"
                          name="answer"
                          value="c"
                          checked={
                            getSelectedAnswer(currentQueIndexstion?._id) === "c"
                          }
                          onChange={handleAnswerChange}
                        />
                        <label htmlFor="c">C. {currentQueIndexstion?.c}</label>
                      </div>
                      <div className="col-sm-6 d-flex gap-3 m-3">
                        <input
                          type="radio"
                          className="btn btn-primary"
                          id="d"
                          name="answer"
                          value="d"
                          checked={
                            getSelectedAnswer(currentQueIndexstion?._id) === "d"
                          }
                          onChange={handleAnswerChange}
                        />
                        <label htmlFor="d">D. {currentQueIndexstion?.d}</label>
                      </div>
                    </div>
                    <div className="d-flex gap-5 p-4 m-3">
                      <button
                        className="btn btn-secondary"
                        onClick={handlePreviousQue}
                      >
                        Previous
                      </button>
                      <button
                        className="btn btn-secondary ms-5"
                        onClick={handleNextQue}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                {/* Question number buttons */}
                <div className="col-lg-4 questionNumber p-4 row">
                  {questions.map((question, index) => (
                    <div key={index} className="col-4">
                      <button
                        className={`numberbtn m-1 ${
                          index === currentQueIndex
                            ? "currentQuestion"
                            : getSelectedAnswer(question._doc?._id)
                            ? "answered" // Mark as answered
                            : ""
                        }`}
                        onClick={handleQuestionChangeByNumber}
                        value={index}
                      >
                        {index + 1}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="container p-5">
          <h1>Press start to start test</h1>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
