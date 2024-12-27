import React, { useState, useEffect } from 'react';
import bombaSes from '../assets/bombaSes.mp3';
import errorSes from '../assets/errorSes.mp3';
import hapishaneBg from '../assets/hapishane.jpg';

// Tema resimleri importları aynı kalacak
import tema1 from '../tema/okan1.jpeg';
import tema2 from '../tema/okan2.jpg';
import tema3 from '../tema/okan3.jpg';
import tema4 from '../tema/okan4.jpg';
import tema5 from '../tema/okan5.jpg';
import tema6 from '../tema/okan6.jpg';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'info', 'prison', 'quiz'
  const [currentSetup, setCurrentSetup] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Sadece 1. seviye açık başlar
  const [completedLevels, setCompletedLevels] = useState([]); // Tamamlanan seviyeler
  
  let audio = new Audio(bombaSes);
  let wrongAudio = new Audio(errorSes);

  const questions = [
    {
      questionText: 'Kütle birimi aşağıdakilerden hangisidir?',
      answerOptions: [
        { answerText: 'Newton', isCorrect: false },
        { answerText: 'Kilogram', isCorrect: true },
        { answerText: 'Metre', isCorrect: false },
        { answerText: 'Saniye', isCorrect: false },
      ],
    },
    {
      questionText: 'Ağırlık birimi aşağıdakilerden hangisidir?',
      answerOptions: [
        { answerText: 'Kilogram', isCorrect: false },
        { answerText: 'Metre', isCorrect: false },
        { answerText: 'Newton', isCorrect: true },
        { answerText: 'Gram', isCorrect: false },
      ],
    },
    {
      questionText: "Dünyada 50 kg kütleli bir cismin ağırlığı kaç N'dur? (g=10 N/kg)",
      answerOptions: [
        { answerText: '50 N', isCorrect: false },
        { answerText: '100 N', isCorrect: false },
        { answerText: '500 N', isCorrect: true },
        { answerText: '5000 N', isCorrect: false },
      ],
    },
    {
      questionText: 'Aşağıdakilerden hangisi kütlenin özelliklerinden değildir?',
      answerOptions: [
        { answerText: 'Değişmez bir büyüklüktür', isCorrect: false },
        { answerText: 'Birimi kilogramdır', isCorrect: false },
        { answerText: 'Eşit kollu terazi ile ölçülür', isCorrect: false },
        { answerText: 'Bulunduğu yere göre değişir', isCorrect: true },
      ],
    },
    {
      questionText: "Ay'da bir cismin kütlesi ve ağırlığı için ne söylenebilir?",
      answerOptions: [
        { answerText: 'Kütle ve ağırlık aynı kalır', isCorrect: false },
        { answerText: 'Kütle aynı kalır, ağırlık azalır', isCorrect: true },
        { answerText: 'Kütle ve ağırlık artar', isCorrect: false },
        { answerText: 'Kütle ve ağırlık azalır', isCorrect: false },
      ],
    },
  ];

  // Tema değiştirme kodları aynı
  const temalar = [tema1, tema2, tema3, tema4, tema5, tema6];

  const arkaplanDegistir = () => {
    const rastgeleIndex = Math.floor(Math.random() * temalar.length);
    document.body.style.background = `url(${temalar[rastgeleIndex]})`;
  };

  useEffect(() => {
    arkaplanDegistir();
  }, [currentQuestion]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      wrongAudio.play();
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      audio.play();
      setShowScore(true);
      const quizSuccess = score + (isCorrect ? 1 : 0) === questions.length;
      handleQuizComplete(quizSuccess);
    }
  };

  const startGame = () => {
    setGameState('mission');
  };

  const startPrison = () => {
    setGameState('prison');
  };

  const startQuiz = (setupNumber) => {
    setCurrentSetup(setupNumber);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setGameState('quiz');
  };

  const handleLockClick = (lockNumber) => {
    if (unlockedLevels.includes(lockNumber)) {
      startQuiz(lockNumber);
    } else {
      wrongAudio.play();
      alert('Önceki kilidi tamamlamadan bu kilidi açamazsın!');
    }
  };

  const unlockNextLevel = () => {
    if (currentSetup < 4) {
      setUnlockedLevels([...unlockedLevels, currentSetup + 1]);
    }
  };

  const handleQuizComplete = (success) => {
    if (success) {
      setCompletedLevels([...completedLevels, currentSetup]);
      unlockNextLevel();
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setGameState('start');
    setCurrentSetup(1);
    setUnlockedLevels([1]);
    setCompletedLevels([]);
  };

  const renderMenuButton = () => {
    if (gameState !== 'start') {
      return (
        <button className="menu-button" onClick={resetGame}>
          <span className="menu-icon">🏠</span>
          <span className="menu-text">MENÜ</span>
        </button>
      );
    }
    return null;
  };

  const renderStartScreen = () => {
    return (
      <div className="welcome-container">
        <div className="welcome-content">
          <h1 className="main-title">OKANDAN KAÇIŞ</h1>
          <h2 className="subtitle">Kurtulabilecek misin?</h2>
          <p className="mission-text">Okan'ın sorularını doğru cevaplayarak kaçmalısın!</p>
          <button className="start-button" onClick={startGame}>
            GÖREVİ BAŞLAT
          </button>
        </div>
      </div>
    );
  };

  const renderMissionScreen = () => {
    return (
      <div className="mission-screen" style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hapishaneBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {renderMenuButton()}
        <div className="mission-content">
          <h1>GÖREV DOSYASI</h1>
          <div className="mission-details">
            <p className="location">KONUM: Okan'ın Hapishanesi</p>
            <p className="objective">HEDEF: Kaçış</p>
            <p className="warning">TEHLİKE SEVİYESİ: YÜKSEK</p>
            
            <div className="mission-text">
              <div className="mission-section">
                <h3>GÖREV DETAYLARI:</h3>
                <ul>
                  <li>Okan'ın hapishanesinden kaçmak için 4 farklı aşamayı geçmelisin.</li>
                  <li>Her aşamada farklı zorlukta sorular seni bekliyor.</li>
                  <li>Toplam 4 setup var ve her setup kendi içinde sorular barındırıyor.</li>
                  <li>Her yanlış cevap seni Okan'a yaklaştıracak.</li>
                </ul>
              </div>

              <div className="mission-section">
                <h3>UYARILAR:</h3>
                <ul>
                  <li>Her sorunun yalnızca bir doğru cevabı var.</li>
                  <li>Geri dönüş şansın yok, dikkatli ol!</li>
                  <li>Tüm setupları tamamlamadan kaçış mümkün değil.</li>
                  <li>Başarısız olursan Okan'ın eline düşersin!</li>
                </ul>
              </div>

              <div className="mission-section warning-box">
                <p>UNUTMA: Bu bir kaçış görevi. Her saniye önemli!</p>
              </div>
            </div>
          </div>
          <button className="mission-button" onClick={startPrison}>
            KAÇIŞI BAŞLAT
            <span className="button-effect"></span>
          </button>
        </div>
      </div>
    );
  };

  const renderPrisonScreen = () => {
    return (
      <div 
        className="prison-container" 
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hapishaneBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {renderMenuButton()}
        <div className="locks-container">
          {[1, 2, 3, 4].map((lockNumber) => (
            <button 
              key={lockNumber}
              className={`lock-button ${completedLevels.includes(lockNumber) ? 'completed' : ''} 
                         ${!unlockedLevels.includes(lockNumber) ? 'locked' : ''}`}
              onClick={() => handleLockClick(lockNumber)}
            >
              <span className="lock-number">{lockNumber}</span>
              <span className="lock-icon">
                {completedLevels.includes(lockNumber) ? '✅' : 
                 unlockedLevels.includes(lockNumber) ? '🔓' : '🔒'}
              </span>
              {!unlockedLevels.includes(lockNumber) && 
                <div className="lock-overlay">
                  <span className="lock-message">Kilitli</span>
                </div>
              }
            </button>
          ))}
        </div>
        <div className="prison-text">
          {completedLevels.length === 4 ? 
            "Tüm kilitleri açtın! Kaçış başarılı!" : 
            "Kilitleri sırayla açmalısın!"}
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    return (
      <div className="quiz-container">
        {renderMenuButton()}
        {showScore ? (
          <div className="score-section">
            <h2>{currentSetup}. Kilit Quiz Sonucu</h2>
            <p>{questions.length} sorudan {score} tanesini doğru bildiniz!</p>
            {score === questions.length ? (
              <>
                <p className="perfect-score">Tebrikler! Bu kilidi açtınız!</p>
                <button 
                  className="return-prison-button" 
                  onClick={() => setGameState('prison')}
                >
                  Diğer Kilitlere Dön
                </button>
              </>
            ) : (
              <>
                <p className="failed-score">Kilit açılamadı! Tekrar deneyin.</p>
                <button 
                  className="retry-button" 
                  onClick={() => startQuiz(currentSetup)}
                >
                  Tekrar Dene
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="setup-info">
              <h2>{currentSetup}. Kilit Quiz</h2>
            </div>
            <div className="question-section">
              <div className="question-count">
                <span>Soru {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerClick(answerOption.isCorrect)}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="quiz">
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'mission' && renderMissionScreen()}
      {gameState === 'prison' && renderPrisonScreen()}
      {gameState === 'quiz' && renderQuiz()}
    </div>
  );
}

export default Quiz; 