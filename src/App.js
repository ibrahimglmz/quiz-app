import React, { useRef } from 'react';
import Quiz from './components/Quiz';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const sureAudioRef = useRef(new Audio(`${process.env.PUBLIC_URL}/assets/sureSes.mp3`));
  const bombaAudioRef = useRef(new Audio(`${process.env.PUBLIC_URL}/assets/bombaSes.mp3`));

  return (
    <Router basename="/quiz-app">
      <Quiz />
    </Router>
  );
}

export default App;
