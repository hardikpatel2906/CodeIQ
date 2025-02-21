import React, { useState } from "react";

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
];

const FlashCard: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      alert("Quiz completed! Restarting...");
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow-lg w-96 mx-auto mt-10">
      <h2 className="text-lg font-semibold text-gray-800">{questions[currentQuestion].question}</h2>

      <div className="mt-4 w-full">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            className={`block w-full px-4 py-2 mt-2 text-left rounded-lg border text-black 
                ${isAnswered ? (option === questions[currentQuestion].correctAnswer ? "bg-green-200" : "bg-red-200") : "bg-white"} 
                hover:bg-gray-200`}
            disabled={isAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <p className={`mt-4 text-lg font-bold ${selectedAnswer === questions[currentQuestion].correctAnswer ? "text-green-600" : "text-red-600"}`}>
          {selectedAnswer === questions[currentQuestion].correctAnswer ? "Correct!" : "Wrong Answer!"}
        </p>
      )}

      <button
        onClick={handleNextQuestion}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Next Question
      </button>
    </div>
  );
};

export default FlashCard;
