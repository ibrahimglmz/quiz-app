import React, { useState, useEffect, useRef } from 'react';
import hapishaneBg from '../assets/hapishane.jpeg';
import kelepcePng from '../assets/kelepce.png';
import kaybetBg from '../assets/kaybet.jpg';
import arkaSes from '../assets/arkaSes.mp3';
import tutuklaSes from '../assets/tutukla.mp3';

// Tema resimleri importları aynı kalacak
import tema1 from '../tema/okan10.jpg';
import tema2 from '../tema/okan11.jpg';
import tema3 from '../tema/okan13.jpg';
import tema4 from '../tema/okan14.jpg';
import tema5 from '../assets/kaybet.jpg';
import tema6 from '../tema/okan16.jpg';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'info', 'prison', 'quiz'
  const [currentSetup, setCurrentSetup] = useState(1);
  const [unlockedLevels, setUnlockedLevels] = useState([1]); // Sadece 1. seviye açık başlar
  const [completedLevels, setCompletedLevels] = useState([]); // Tamamlanan seviyeler
  const [wrongCount, setWrongCount] = useState(0);
  const [showPoliceBackground, setShowPoliceBackground] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Ses referansları için useRef kullanıyoruz
  const backgroundMusicRef = useRef(new Audio(arkaSes));
  const tutuklaRef = useRef(new Audio(tutuklaSes));

  // Tüm soruları burada tanımlıyoruz
  const allSetups = {
    1: [
      {
        questionText: "Kütle Nedir ? ",
        answerOptions: [
          { answerText: "Değişmeyen madde miktarıdır.", isCorrect: true },
          { answerText: "Bir cisme uygulanan kütle çekim kuvvetidir.", isCorrect: false },
          
        ],
      },
      {
        questionText: "Ağırlık Nedir ? ",
        answerOptions: [
          { answerText: "Değişmeyen madde miktarıdır.", isCorrect: false },
          { answerText: "Bir cisme uygulanan kütle çekim kuvvetidir.", isCorrect: true },
          
        ],
      },
      {
        questionText: "Kütle ölçen alet nedir?",
        answerOptions: [
          { answerText: "Dinamometre", isCorrect: false },
          { answerText: "Eşit kollu terazi", isCorrect: true },
          { answerText: "Metre", isCorrect: false },
          { answerText: "Barometre", isCorrect: false },
        ],
      },
      {
        questionText: "Ağırlığı ölçen alet nedir?",
        answerOptions: [
          { answerText: "Eşit Kollu terazi", isCorrect: false },
          { answerText: "Dinamometre", isCorrect: true },
        ],
      },
      {
        questionText: "Kütlenin birimi nedir?",
        answerOptions: [
          { answerText: "Newton", isCorrect: false },
          { answerText: "Kilogram", isCorrect: true },
        ],
      },
    ],
    2: [
      {
        questionText: "Ağırlığın birimi nedir?",
        answerOptions: [
          { answerText: "Kilogram", isCorrect: false },
          { answerText: "Newton", isCorrect: true },
          { answerText: "Gram", isCorrect: false },
        ],
      },
      {
        questionText: "Kütlen bir cismin boyutudur?",
        answerOptions: [
          { answerText: "Yanlış", isCorrect: true },
          { answerText: "Doğru", isCorrect: false },
        ],
      },
      {
        questionText: "Dinamometre ağırlığımızı ölçer?",
        answerOptions: [
          { answerText: "Yanlış", isCorrect: false },
          { answerText: "Doğru", isCorrect: true },
        ],
      },
      {
        questionText: "Kütle her yerde değişir?",
        answerOptions: [
          { answerText: "Doğru", isCorrect: false },
          { answerText: "Yanlış", isCorrect: true },
        ],
      },
      {
        questionText: "Benim kütlem 20 newton?",
        answerOptions: [
          { answerText: "Doğru", isCorrect: false },
          { answerText: "Yanlış", isCorrect: true },
        ],
      },
    ],
    3: [
      {
        questionText: "Dünyada 25 kg gelen bir insan Ay'da 15 KG gelir ?",
        answerOptions: [
          { answerText: "Doğru ", isCorrect: false },
          { answerText: "Yanlış ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Bir cismin hafif ya da ağır olma durumu kütlesi ile ilgilidir.",
        answerOptions: [
          { answerText: "Doğru ", isCorrect: false },
          { answerText: "Yanlış ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Manavlar ürünlerini dinamometre ile tartar.",
        answerOptions: [
          { answerText: "Doğru ", isCorrect: false },
          { answerText: "Yanlış ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Dünyanın merkezinden uzaklaştıkça değişen değer  nedir ?",
        answerOptions: [
          { answerText: "Kütle ", isCorrect: false },
          { answerText: "Ağırlık ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Kütle çekim kuvvetine ne denir?",
        answerOptions: [
          
          { answerText: "Ağırlık ", isCorrect: true },
          { answerText: "Kütle ", isCorrect: false },
          
        ],
      },
      
    ],
    4: [
      {
        questionText: "Gezegenler arasında çekim kuvveti yoktur.",
        answerOptions: [
          
          { answerText: "Doğru ", isCorrect: false },
          { answerText: "Yanlış ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Kütle deniz seviyesinden yukarılara çıkıldıkça artar.",
        answerOptions: [
          { answerText: "Yanlış", isCorrect: true },
          { answerText: "Doğru", isCorrect: false },
        ],
      },
      {
        questionText: "Ekvaktordan kutuplara doğru gidildikçe ağırlık azalır.",
        answerOptions: [
          
          { answerText: "Doğru", isCorrect: false },
          { answerText: "Yanlış ", isCorrect: true },
          
        ],
      },
      {
        questionText: "Kutuplardan ekvatora doğru gidildikçe kütle artar.",
        answerOptions: [
          
          { answerText: "Yanlış ", isCorrect: true },
          { answerText: "Doğru", isCorrect: false },
          
        ],
      },
      {
        questionText: "Dağdan deniz seviyesine inildikçe ağırlık artar.",
        answerOptions: [
          
          { answerText: "Doğru ", isCorrect: true },
          { answerText: "Yanlış ", isCorrect: false },
          
        ],
      },

      
    ]
  };


  // Aktif setup'ın sorularını al
  const questions = allSetups[currentSetup];

  // Tema değiştirme kodları aynı
  const temalar = [tema1, tema2, tema3, tema4, tema5, tema6];

  const arkaplanDegistir = () => {
    const rastgeleIndex = Math.floor(Math.random() * temalar.length);
    document.body.style.background = `url(${temalar[rastgeleIndex]})`;
  };

  useEffect(() => {
    arkaplanDegistir();
  }, [currentQuestion]);

  // Arka plan müziği ayarları
  useEffect(() => {
    const backgroundMusic = backgroundMusicRef.current;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;

    if (gameState !== 'start') {
      backgroundMusic.play().catch(e => console.log("Ses otomatik başlatılamadı"));
    }

    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, [gameState]);

  // Tutuklama sesi fonksiyonu
  const playTutuklaSes = () => {
    const tutukla = tutuklaRef.current;
    tutukla.volume = 0.5;
    backgroundMusicRef.current.pause(); // Arka plan müziğini durdur
    tutukla.play().then(() => {
      // Tutuklama sesi bittiğinde arka plan müziğini tekrar başlat
      tutukla.addEventListener('ended', () => {
        backgroundMusicRef.current.play();
      }, { once: true });
    });
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setWrongCount(wrongCount + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
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
    setWrongCount(0);
    setGameState('quiz');
  };

  const handleLockClick = (lockNumber) => {
    if (unlockedLevels.includes(lockNumber)) {
      startQuiz(lockNumber);
    } else {
      alert('Önceki kilidi tamamlamadan bu kilidi açamazsın!');
    }
  };

  const handleQuizComplete = (success) => {
    if (success) {
      if (currentSetup < 4) {
        setUnlockedLevels([...unlockedLevels, currentSetup + 1]);
      }
      setCompletedLevels([...completedLevels, currentSetup]);
      setShowPoliceBackground(false);
    } else {
      playTutuklaSes();
      setShowPoliceBackground(true); // Quiz başarısız olduğunda polis arka planını göster
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
    setWrongCount(0);
    
    // Sesleri resetle
    backgroundMusicRef.current.pause();
    backgroundMusicRef.current.currentTime = 0;
    tutuklaRef.current.pause();
    tutuklaRef.current.currentTime = 0;
  };

  const handleMenuClick = () => {
    if (window.confirm('Ana menüye dönmek istediğinize emin misiniz? İlerlemeniz kaydedilmeyecek.')) {
      // Oyunu başlangıç durumuna getir
      setCurrentQuestion(0);
      setShowScore(false);
      setScore(0);
      setGameState('start'); // 'prison' yerine 'start' yapıyoruz
      setCurrentSetup(1);
      setWrongCount(0);
      
      // Sesleri resetle
      backgroundMusicRef.current.pause();
      backgroundMusicRef.current.currentTime = 0;
      tutuklaRef.current.pause();
      tutuklaRef.current.currentTime = 0;
    }
  };

  const renderMenuButton = () => {
    return (
      <button className="menu-button" onClick={handleMenuClick}>
        <span className="menu-icon">≡</span>
        ANA MENÜ
      </button>
    );
  };

  const renderStartScreen = () => {
    return (
      <div className="start-screen">
        <button className="start-button" onClick={() => setGameState('mission')}>
          OYUNA BAŞLA
        </button>
      </div>
    );
  };

  const renderMissionScreen = () => {
    return (
      <div className="mission-screen">
        <div className="mission-briefing">
          <h2>GÖREV DOSYASI</h2>
          <div className="mission-details">
            <div className="mission-section">
              <h3>DURUM</h3>
              <p>Şu an hapishanede tutuklusun ve kaçman gerek!</p>
            </div>
            
            <div className="mission-section">
              <h3>GÖREV</h3>
              <ul className="mission-list">
                <li>
                  <span className="icon">🔒</span>
                  Hapishaneden kaçmak için 4 kilidi açmalısın
                </li>
                <li>
                  <span className="icon">✓</span>
                  Her kilidi açmak için tüm soruları doğru cevaplamalısın
                </li>
                <li>
                  <span className="icon">⚠️</span>
                  Yanlış cevap verirsen alarm çalar ve baştan başlarsın
                </li>
                <li>
                  <span className="icon">⭐</span>
                  Tüm kilitleri açarsan özgürlüğüne kavuşursun
                </li>
                <li>
                  <span className="icon">👮</span>
                  Başarısız olursan Okan seni yakalayacak!
                </li>
              </ul>
            </div>

            <button className="start-mission-button" onClick={() => setGameState('prison')}>
              ANLADIM, BAŞLA
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPrisonScreen = () => {
    return (
      <div className="prison-screen">
        <div className="mission-container">
          <h2>KİLİTLER</h2>
          <div className="mission-buttons">
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                className={`mission-button ${
                  unlockedLevels.includes(level) ? 'unlocked' : 'locked'
                } ${completedLevels.includes(level) ? 'completed' : ''}`}
                onClick={() => {
                  if (unlockedLevels.includes(level)) {
                    startQuiz(level);
                  }
                }}
                disabled={!unlockedLevels.includes(level)}
              >
                <div className="mission-content">
                  <span className="mission-number">{level}</span>
                  <span className="mission-text">Kilit {level}</span>
                  {!unlockedLevels.includes(level) && <span className="lock-icon">🔒</span>}
                  {completedLevels.includes(level) && <span className="complete-icon">✓</span>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    return (
      <div className="quiz-container">
        {renderMenuButton()}
        
        <div className="wrong-attempts">
          {[...Array(wrongCount)].map((_, index) => (
            <div key={index} className="wrong-attempt">
              <img src={kelepcePng} alt="Kelepçe" className="handcuff-icon" />
              <span className="attempt-number">{index + 1}</span>
            </div>
          ))}
        </div>

        {showScore ? (
          <div className="score-section">
            {score === questions.length ? (
              <div className="success-content">
                <div className="success-message">
                  <span className="success-icon">🔓</span>
                  <p>Kilit Başarıyla Açıldı!</p>
                </div>
                <button 
                  className="next-level-button" 
                  onClick={() => setGameState('prison')}
                >
                  <span>Diğer Kilitlere Dön</span>
                  <span className="button-icon">→</span>
                </button>
              </div>
            ) : (
              <div className="fail-screen" 
                   style={{
                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${kaybetBg})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundRepeat: 'no-repeat'
                   }}>
                <div className="handcuffs-animation">
                  <img src={kelepcePng} alt="Kelepçe" className="handcuffs-image" />
                </div>
                <div className="fail-content">
                  <h2>YAKALANDIN!</h2>
                  <p className="fail-score">
                    {score} / {questions.length} Doğru
                  </p>
                  <p className="fail-message">
                    Kaçış başarısız oldu ve yakalandın!
                  </p>
                  <button 
                    className="retry-button"
                    onClick={() => startQuiz(currentSetup)}
                  >
                    TEKRAR DENE
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="question-container">
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            
            <div className="question-header">
              <span className="question-number">SORU {currentQuestion + 1}/{questions.length}</span>
            </div>

            <div className="question-box">
              <h2 className="question">{questions[currentQuestion]?.questionText}</h2>
            </div>

            <div className="answers-grid">
              {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                <button
                  key={index}
                  className="answer-button"
                  onClick={() => handleAnswerClick(answerOption.isCorrect)}
                >
                  <span className="answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="answer-text">
                    {answerOption.answerText}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderImageGallery = () => {
    return (
      <div className="image-gallery">
        <div className="image-container">
          <img 
            src={temaImages[currentImageIndex].src} 
            alt={temaImages[currentImageIndex].title}
            className="fullscreen-image"
          />
          <div className="image-controls">
            <button 
              className="gallery-button"
              onClick={() => setCurrentImageIndex(prev => 
                prev === 0 ? temaImages.length - 1 : prev - 1
              )}
            >
              &#8592; Önceki
            </button>
            <span className="image-counter">
              {currentImageIndex + 1} / {temaImages.length}
            </span>
            <button 
              className="gallery-button"
              onClick={() => setCurrentImageIndex(prev => 
                prev === temaImages.length - 1 ? 0 : prev + 1
              )}
            >
              Sonraki &#8594;
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tema resimleri array'i
  const temaImages = [
    { id: 1, src: hapishaneBg, title: "Hapishane" },
    { id: 2, src: kaybetBg, title: "Yakalandın" },
    // Diğer tema resimleri buraya eklenecek
  ];

  useEffect(() => {
    // Kelepçe resmini CSS değişkeni olarak tanımla
    document.documentElement.style.setProperty(
      '--kelepce-background',
      `url(${kelepcePng})`
    );
  }, []);

  // Arka plan resmini body'ye bir kere uygula
  useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${hapishaneBg})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    
    // Component unmount olduğunda temizle
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  return (
    <div className="quiz-app">
      {gameState === 'gallery' && renderImageGallery()}
      {gameState === 'start' && renderStartScreen()}
      {gameState === 'mission' && renderMissionScreen()}
      {gameState === 'prison' && renderPrisonScreen()}
      {gameState === 'quiz' && renderQuiz()}
    </div>
  );
}

export default Quiz; 