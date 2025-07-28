import React from 'react';

const ResultScreen = ({ score, total, onRetry }) => {
  return (
    <div>
      <h2>Quiz Over!</h2>
      <p>Your Score: {score} / {total}</p>
      <button onClick={onRetry}>Try Another Topic</button>
    </div>
  );
};

export default ResultScreen;
