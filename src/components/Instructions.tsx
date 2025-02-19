import { Clock } from "lucide-react";

type InstructionsProp = {
    setStartQuiz: (startQuiz: boolean) => void
    setOpenHistory: (startQuiz: boolean) => void
}

const Instructions = ({setStartQuiz, setOpenHistory}: InstructionsProp) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-2xl w-full mx-auto p-2">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white text-center">
              Quiz Instructions
            </h1>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                <Clock size={48} className="text-indigo-500" />
              </div>

              <div className="text-center mb-6">
                <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
                  Time Allowed: 30 seconds / Question
                </span>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex h-6 w-6 bg-indigo-500 text-white rounded-full items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  1
                </span>
                <p className="text-gray-700">
                  For multiple-choice questions, select the one best answer (A,
                  B, C, or D).
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 bg-indigo-500 text-white rounded-full items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  2
                </span>
                <p className="text-gray-700">
                  For integer-type questions, write your numerical answer
                  clearly.
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 bg-indigo-500 text-white rounded-full items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  3
                </span>
                <p className="text-gray-700">
                  No calculators unless specified.
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex h-6 w-6 bg-indigo-500 text-white rounded-full items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  4
                </span>
                <p className="text-gray-700">
                  There are 10 Questions in Total
                </p>
              </li>
            </ul>

            <div className="mt-8 flex gap-3 justify-center">
              <button onClick={() => setStartQuiz(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                Begin Quiz
              </button>
              <button onClick={() => setOpenHistory(true)} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1">
                Attempts History
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-sm">
          Good luck! Approach each question calmly and carefully.
        </div>
      </div>
    </div>
  );
};

export default Instructions;
