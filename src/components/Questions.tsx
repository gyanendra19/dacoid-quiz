import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { AttemptsProp } from "../App";

type QuestionsProp = {
  setShowResults: (showResults: boolean) => void;
  setAttempts: any;
  attemptCount: number;
  setStartQuiz: (startQuiz: boolean) => void;
};

const Questions = ({
  setShowResults,
  setAttempts,
  attemptCount,
  setStartQuiz,
}: QuestionsProp) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [integerAnswer, setIntegerAnswer] = useState<null | string>(null);
  const [index, setIndex] = useState(0);

  const [timer, setTimer] = useState(30); // Timer for each question

  // timer for each question
  useEffect(() => {
    if (timer === 0) {
      setIndex(index + 1);
      handleOptionSelect("Not answered");
      return;
    }

    const countdown = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdown);
  }, [timer]);

  useEffect(() => {
    setTimer(30); // Reset timer when question changes
  }, [index]);

  const handleOptionSelect = async (answer: string) => {
    setSelectedOption(answer);
    setAttempts((prev: AttemptsProp[]) => {
      const existingAttemptIndex = prev.findIndex(
        (attempt) => attempt.id === attemptCount
      );

      if (existingAttemptIndex === -1) {
        // If attemptCount does not exist, add a new attempt
        return [
          ...prev,
          {
            id: attemptCount,
            time: Date.now(), // add time
            userAnswers: [
              { userAnswer: answer, correctAnswer: questions[index].answer },
            ],
          },
        ];
      }

      // Update existing attempt
      return prev.map((attempt) =>
        attempt.id === attemptCount
          ? {
              ...attempt,
              userAnswers: [
                ...attempt.userAnswers,
                {
                  userAnswer: answer,
                  correctAnswer: questions[index].answer,
                },
              ],
            }
          : attempt
      );
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-2xl w-full mx-auto p-8">
        <h1 className="text-purple-600 text-2xl text-center py-4 font-bold">
          {timer} Seconds left
        </h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white text-center">
              Question {index + 1}
            </h2>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <p className="text-lg text-gray-800 font-medium">
                {questions[index].question}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {questions[index].options ? (
                questions[index].options?.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setSelectedOption(option.text)}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedOption === option.text
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
                    }`}
                  >
                    <div
                      className={`h-5 w-5 rounded-full border ${
                        selectedOption === option.text
                          ? "border-indigo-500 bg-indigo-500"
                          : "border-gray-400"
                      } flex items-center justify-center mr-4`}
                    >
                      {selectedOption === option.text && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">
                        {option.id}.
                      </span>
                      <span className="ml-2 text-gray-700">{option.text}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">
                  <input
                    value={integerAnswer || ""}
                    onChange={(e) => setIntegerAnswer(e.target.value)}
                    className="border border-gray-200 focus:outline-none p-2 rounded-lg pl-4"
                    type="text"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={async () => {
                  if (index < 9) {
                    setIndex(index + 1);
                    handleOptionSelect(selectedOption ?? integerAnswer!);
                    setSelectedOption(null);
                    setIntegerAnswer(null);
                  }

                  if (index === 9) {
                    handleOptionSelect(selectedOption ?? integerAnswer!);
                    setShowResults(true);
                    setStartQuiz(false);
                  }
                }}
                className={`px-6 py-3 font-medium rounded-lg shadow-md transition duration-200
                    ${
                      selectedOption || integerAnswer
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }
            `}
              >
                {index === 9 ? "Finish" : "Next Question"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>Question {index + 1} of 10</span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
