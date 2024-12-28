import React, { useRef } from 'react';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const sureAudioRef = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/sureSes.mp3`));
  const bombaAudioRef = useRef(new Audio(`${process.env.PUBLIC_URL}/sounds/bombaSes.mp3`));

  return (
    <div className="app">
      <Quiz />
    </div>
  );
}

export default App;
