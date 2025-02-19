import { Check, RefreshCw, X } from "lucide-react";
import { questions } from "../data/questions";
import { AttemptsProp } from "../App";

type ResultProp = {
  attempt: AttemptsProp;
  setAttemptCount: React.Dispatch<React.SetStateAction<number>>;
  setStartQuiz: (startQuiz: boolean) => void;
  setOpenHistory: (openHistory: boolean) => void;
  setShowResults: (showResults: boolean) => void;
};

const Results = ({
  attempt,
  setAttemptCount,
  setStartQuiz,
  setOpenHistory,
  setShowResults,
}: ResultProp) => {
  // filter out answers which are correct
  const score = attempt.userAnswers.filter(
    (item) => item.userAnswer === item.correctAnswer
  ).length;
  const total = questions.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-3xl w-full mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Quiz Results
            </h1>
          </div>

          <div className="p-8">
            {/* Score summary */}
            <div className="mb-8 text-center">
              <div className="inline-block px-6 py-3 bg-indigo-100 rounded-xl">
                <h2 className="text-lg font-medium text-indigo-800">
                  Your Score:{" "}
                  <span className="font-semibold">
                    {score}/{total}
                  </span>{" "}
                  ({percentage}%)
                </h2>
              </div>
            </div>

            {/* Questions and answers */}
            <div className="space-y-6 mb-10">
              {attempt.userAnswers.map((result: any, index) => (
                <div
                  key={result.id}
                  className="border rounded-lg overflow-hidden bg-white"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b">
                    <h3 className="font-medium text-gray-800">
                      {result.id}. {questions[index].question}
                    </h3>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* User's answer */}
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          result.userAnswer === result.correctAnswer
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {result.userAnswer === result.correctAnswer ? (
                          <Check size={16} className="text-green-600" />
                        ) : (
                          <X size={16} className="text-red-600" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-500">Your answer:</p>
                        <p
                          className={`text-sm font-medium ${
                            result.userAnswer === result.correctAnswer
                              ? "text-green-700"
                              : "text-red-700"
                          }`}
                        >
                          {result.userAnswer}
                        </p>
                      </div>
                    </div>

                    {/* Correct answer (only shown if user's answer is wrong) */}
                    {result.userAnswer !== result.correctAnswer && (
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check size={16} className="text-green-600" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-500">
                            Correct answer:
                          </p>
                          <p className="text-sm font-medium text-green-700">
                            {result.correctAnswer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  setOpenHistory(true);
                  setShowResults(false);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center"
              >
                Attempt History
              </button>
              <button
                onClick={() => {
                  setAttemptCount((prev) => prev + 1);
                  setStartQuiz(true);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 flex items-center"
              >
                <RefreshCw size={18} className="mr-2" />
                Attempt Again
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Thank you for completing the quiz! Keep learning and improving.
        </div>
      </div>
    </div>
  );
};

export default Results;
