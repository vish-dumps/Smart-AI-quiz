import React, { useState } from 'react';
import QuizForm from './components/QuizForm';
import QuizQuestion from './components/QuizQuestion';
import { generateQuiz } from './utils/generateQuiz';
import Navbar from './components/Navbar';

const App = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);

  const startQuiz = async (topic) => {
    setLoading(true);
    setQuizEnded(false);
    setCurrentIndex(0);
    setScore(0);

    try {
      const data = await generateQuiz(topic, 5);
      setQuizData(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      alert("❌ Failed to fetch quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (selected) => {
    const correct = quizData[currentIndex]?.answer;
    if (selected && selected === correct) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 px-4 py-8 font-sans">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">🧠 SmartQuiz</h1>

        {loading && <p className="text-center text-lg text-blue-600">Loading quiz...</p>}

        {!loading && quizData.length === 0 && <QuizForm onStart={startQuiz} />}

        {!loading && quizData.length > 0 && !quizEnded && (
          <>
            <p className="text-center text-sm text-gray-600 mb-4">
              Question {currentIndex + 1} of {quizData.length}
            </p>
            <QuizQuestion
              key={currentIndex} // ✅ Force full reset of component on question change
              questionData={quizData[currentIndex]}
              onAnswer={handleAnswer}
            />
          </>
        )}

        {quizEnded && (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Quiz Completed!</h2>
            <p className="text-lg mb-4">
              You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{quizData.length}</span>
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => setQuizData([])}
            >
              Try Another Topic
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
