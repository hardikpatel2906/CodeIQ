import { useParams } from "react-router-dom";
import { useState } from "react";
// import { questions } from "../data/questions";

const QuizPage: React.FC = () => {
    const { language } = useParams<{ language: string }>(); // Ensure language is always a string

    if (!language) {
        return <p className="text-red-500 text-center mt-10">Invalid language selected.</p>;
    }

    const selectedLanguage = language.toLowerCase();
    const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");

    //   const languageQuestions = questions[language as keyof typeof questions];

    //   if (!languageQuestions) {
    //     return <p className="text-red-500 text-center mt-10">Questions not found for this language.</p>;
    //   }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl text-center font-bold text-gray-800">{selectedLanguage.toUpperCase()} Quiz</h1>

            {/* Difficulty Selector */}
            <div className="flex justify-center my-4 space-x-3">
                {["beginner", "intermediate", "advanced"].map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => setLevel(lvl as "beginner" | "intermediate" | "advanced")}
                        className={`px-4 py-2 rounded-md ${level === lvl ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            {/* <div className="mt-4 space-y-4">
        {languageQuestions[level].map((q, index) => (
          <div key={index} className="p-4 bg-white rounded-md shadow-md">
            <p className="font-medium">{q.question}</p>
            <ul className="mt-2 space-y-2">
              {q.options.map((opt, idx) => (
                <li key={idx} className="p-2 border rounded-md cursor-pointer hover:bg-gray-200">
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}
        </div>
    );
};

export default QuizPage;
