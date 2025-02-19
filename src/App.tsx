import { useEffect, useState } from "react";
import Instructions from "./components/Instructions";
import Questions from "./components/Questions";
import Results from "./components/Results";
import { getAttempts, saveAttempt } from "./data/indexedDB";
import AttemptsHistory from "./components/AttemptsHistory";

type UserAnswer = {
  userAnswer: string;
  correctAnswer: string;
};

export type AttemptsProp = {
  id: number;
  time: string;
  userAnswers: UserAnswer[];
};

function App() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [attempts, setAttempts] = useState<AttemptsProp[]>([]);
  const [attemptCount, setAttemptCount] = useState<number>(
    attempts.length || 0
  );
  const [openHistory, setOpenHistory] = useState(false);

  // save the attempts history in indexed db
  useEffect(() => {
    if (attempts[attemptCount]?.userAnswers.length === 10) {
      saveAttempt(1, attempts);
    }
  }, [attempts]);

  // fetch attempts history from indexed db
  useEffect(() => {
    const fetchAttempts = async () => {
      const storedAttempts = await getAttempts();
      setAttempts(storedAttempts[0]?.attempts || []);
      setAttemptCount(storedAttempts[0]?.attempts.length || 0);
    };

    fetchAttempts();
  }, []);

  return (
    <>
      {startQuiz ? (
        <Questions
          setShowResults={setShowResults}
          setAttempts={setAttempts}
          attemptCount={attemptCount}
          setStartQuiz={setStartQuiz}
        />
      ) : showResults ? (
        <Results
          attempt={attempts[attemptCount]}
          setAttemptCount={setAttemptCount}
          setStartQuiz={setStartQuiz}
          setOpenHistory={setOpenHistory}
          setShowResults={setShowResults}
        />
      ) : openHistory ? (
        <AttemptsHistory
          attempts={attempts}
          setShowResults={setShowResults}
          setAttemptCount={setAttemptCount}
          setStartQuiz={setStartQuiz}
        />
      ) : (
        <Instructions
          setStartQuiz={setStartQuiz}
          setOpenHistory={setOpenHistory}
        />
      )}
    </>
  );
}

export default App;
