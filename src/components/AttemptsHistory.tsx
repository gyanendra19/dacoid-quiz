import { Calendar, ChevronRight } from "lucide-react";
import { AttemptsProp } from "../App";

type AttemptsHistoryProp = {
  attempts: AttemptsProp[];
  setShowResults: (showResults: boolean) => void;
  setAttemptCount: React.Dispatch<React.SetStateAction<number>>;
  setStartQuiz: (startQuiz: boolean) => void;
};

const AttemptsHistory = ({
  attempts,
  setShowResults,
  setAttemptCount,
  setStartQuiz
}: AttemptsHistoryProp) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl w-full mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Quiz Attempt History
            </h1>
          </div>

          {/* Attempts List */}
          <div className="p-6">
            <div className="space-y-4">
              {attempts.map((attempt, index) => (
                <div
                  onClick={() => {
                    setShowResults(true);
                    setAttemptCount(index);
                  }}
                  key={attempt.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-indigo-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center mb-4 md:mb-0">
                    <div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{new Date(attempt.time).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 flex items-center">
                        <span className="text-lg pl-5 font-semibold text-gray-800">
                          Attempt {attempt.id + 1}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Questions</p>
                      <p className="font-medium text-gray-800">10</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={() => setStartQuiz(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200">
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Click on any attempt to view detailed results
        </div>
      </div>
    </div>
  );
};

export default AttemptsHistory;
