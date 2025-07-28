import React, { useState } from 'react';

const QuizForm = ({ onStart }) => {
  const [topic, setTopic] = useState('');

  const handleStart = () => {
    if (!topic.trim()) return alert("Enter a topic");
    onStart(topic);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Enter topic (e.g., cricket)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleStart} style={styles.button}>Start Quiz</button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default QuizForm;
