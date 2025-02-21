import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    options: ["let myVar = 10;", "variable myVar = 10;", "const: myVar = 10;", "int myVar = 10;"],
    correctAnswer: "let myVar = 10;",
  },
  {
    question: "Which keyword is used to define a function in JavaScript?",
    options: ["define", "function", "fun", "def"],
    correctAnswer: "function",
  },
  {
    question: "Which method is used to remove the last element from an array?",
    options: ["removeLast()", "pop()", "deleteLast()", "shift()"],
    correctAnswer: "pop()",
  },
  {
    question: "What does `typeof null` return?",
    options: ["null", "undefined", "object", "string"],
    correctAnswer: "object",
  },
  {
    question: "Which of these is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    correctAnswer: "React",
  },
];

const shuffleArray = (array: Question[]) => [...array].sort(() => Math.random() - 0.5);

const Flashcard: React.FC = () => {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const storedIndex = localStorage.getItem("quizProgress");
    if (storedIndex) {
      setCurrentQuestion(Number(storedIndex));
    }
    setQuizQuestions(shuffleArray(questions)); // Shuffle questions
  }, []);

  useEffect(() => {
    // Save progress to localStorage
    localStorage.setItem("quizProgress", currentQuestion.toString());
  }, [currentQuestion]);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      alert("Quiz completed! Restarting...");
      localStorage.removeItem("quizProgress");
      setCurrentQuestion(0);
      setQuizQuestions(shuffleArray(questions)); // Reshuffle for a fresh start
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg w-96 mx-auto mt-10">
      <h3 className="text-sm font-semibold text-gray-500">
        Question {currentQuestion + 1} of {quizQuestions.length}
      </h3>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <h2 className="text-lg font-semibold text-gray-800">{quizQuestions[currentQuestion]?.question}</h2>

        <div className="mt-4 w-full">
          {quizQuestions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={`block w-full px-4 py-2 mt-2 text-left rounded-lg border text-black
                ${
                  isAnswered
                    ? option === quizQuestions[currentQuestion].correctAnswer
                      ? "bg-green-200"
                      : "bg-red-200"
                    : "bg-white"
                } 
                hover:bg-gray-200`}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {isAnswered && (
          <p
            className={`mt-4 text-lg font-bold ${
              selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "text-green-600" : "text-red-600"
            }`}
          >
            {selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? "Correct!" : "Wrong Answer!"}
          </p>
        )}
      </motion.div>

      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handlePreviousQuestion}
          className={`px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 ${
            currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>

        <button
          onClick={handleNextQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {currentQuestion < quizQuestions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Flashcard;
