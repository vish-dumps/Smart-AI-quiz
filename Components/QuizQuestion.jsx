import React, { useEffect, useState } from 'react';

const QuizQuestion = ({ questionData, onAnswer }) => {
  const { question, options, answer } = questionData;
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerAnswer(null); // Timeout auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionData]);

 const triggerAnswer = (opt) => {
  if (hasAnswered) return;
  setHasAnswered(true);

  // ✅ If user didn't select (opt === null), still show correct answer
  if (opt) {
    setSelected(opt);
  } else {
    // ❗ This will still allow the correct option to be highlighted in render logic
    setSelected(''); // Anything non-null to trigger re-render
  }

  setTimeout(() => {
    onAnswer(opt);
  }, 1500); // Delay to show feedback
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{question}</h2>
        <div className={`text-lg font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-blue-600'}`}>
          ⏱️ {timeLeft}s
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {options.map((opt, idx) => {
  let bgColor = 'bg-white';

  if (hasAnswered) {
    if (opt === answer) bgColor = 'bg-green-200 border-green-500';
    else if (opt === selected) bgColor = 'bg-red-200 border-red-500';
  }

  return (
    <button
      key={idx}
      onClick={() => triggerAnswer(opt)}
      disabled={hasAnswered}
      className={`border px-4 py-2 rounded text-left transition-all duration-200 ${bgColor} ${
        !hasAnswered ? 'hover:bg-blue-100' : ''
      }`}
    >
      {opt}
    </button>
  );
})}

      </div>
    </div>
  );
};

export default QuizQuestion;
