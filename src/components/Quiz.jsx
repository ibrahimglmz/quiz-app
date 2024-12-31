import React, { useState, useEffect, useRef } from 'react';

// Assets için yeni yollar
const hapishaneBg = `${process.env.PUBLIC_URL}/assets/hapishane.jpeg`;
const kelepcePng = `${process.env.PUBLIC_URL}/assets/kelepce.png`;
const kaybetBg = `${process.env.PUBLIC_URL}/assets/kaybet.jpg`;
const bittiImg = `${process.env.PUBLIC_URL}/assets/bitti.jpg`;
const arkaSes = `${process.env.PUBLIC_URL}/assets/arkaSes.mp3`;
const tutuklaSes = `${process.env.PUBLIC_URL}/assets/tutukla.mp3`;
const bittiSes = `${process.env.PUBLIC_URL}/assets/bittiSes.mp3`;

// Tema resimleri için yeni yollar
const tema1 = `${process.env.PUBLIC_URL}/tema/okan10.jpg`;
const tema2 = `${process.env.PUBLIC_URL}/tema/okan11.jpg`;
const tema3 = `${process.env.PUBLIC_URL}/tema/okan13.jpg`;
const tema4 = `${process.env.PUBLIC_URL}/tema/okan14.jpg`;
const tema6 = `${process.env.PUBLIC_URL}/tema/okan16.jpg`;

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
  const bittiSesRef = useRef(new Audio(bittiSes));

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
        questionText: "Kütle bir cismin boyutudur?",
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

  // Tema resimleri array'i
  const temalar = [tema1, tema2, tema3, tema4, tema6];

  const arkaplanDegistir = () => {
    const rastgeleIndex = Math.floor(Math.random() * temalar.length);
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${temalar[rastgeleIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.transition = 'background-image 0.5s ease-in-out';
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
      if (wrongCount + 1 >= 3) {
        setShowScore(true);
        handleFailure(); // Başarısız olunca handleFailure fonksiyonunu çağır
        return;
      }
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      arkaplanDegistir();
    } else {
      setShowScore(true);
      if (score + (isCorrect ? 1 : 0) < questions.length) {
        handleFailure(); // Skor yetersizse handleFailure fonksiyonunu çağır
      }
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
        <div className="start-content">
          <h1 className="game-title">Kütle Ağırlık Kaçağı</h1>
          <button className="start-button" onClick={() => setGameState('mission')}>
            OYUNA BAŞLA
          </button>
        </div>
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
                  Başarısız olursan Görevli  seni yakalayacak!
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

  // Tüm kilitlerin açılıp açılmadığını kontrol et
  const checkAllLevelsCompleted = () => {
    const allLevels = [1, 2, 3, 4];
    const allCompleted = allLevels.every(level => completedLevels.includes(level));
    
    // Eğer tüm seviyeler tamamlandıysa ve ses daha önce çalınmadıysa
    if (allCompleted) {
      backgroundMusicRef.current.pause(); // Arka plan müziğini durdur
      bittiSesRef.current.currentTime = 0; // Sesi başa sar
      bittiSesRef.current.play(); // Bitiş sesini çal
    }
    
    return allCompleted;
  };

  const handleLevelCompletion = (level) => {
    // Tamamlanan seviyeyi ekle
    setCompletedLevels(prev => [...prev, level]);
    
    // Bir sonraki seviyeyi aç
    if (level < 4) { // 4 son seviye olduğu için kontrol ediyoruz
      setUnlockedLevels(prev => [...prev, level + 1]);
    }
  };

  const renderPrisonScreen = () => {
    if (checkAllLevelsCompleted()) {
      return (
        <div className="completion-screen"
             style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: '100%',
               height: '100vh',
               backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bittiImg})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center',
               alignItems: 'center',
               color: 'white',
               textAlign: 'center',
               zIndex: 1000
             }}>
          <h1 className="completion-title">TEBRİKLER!</h1>
          <p className="completion-text">Tüm kilitleri başarıyla açtın ve özgürlüğüne kavuştun!</p>
          <button 
            className="restart-button"
            onClick={() => {
              bittiSesRef.current.pause(); // Bitiş sesini durdur
              setGameState('start');
              setCompletedLevels([]);
              setUnlockedLevels([1]);
              setCurrentSetup(1);
            }}
          >
            YENİDEN BAŞLA
          </button>
        </div>
      );
    }

    // Normal prison screen
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
                  <span className="mission-text">
                    {completedLevels.includes(level) 
                      ? "Kilit Açıldı" 
                      : unlockedLevels.includes(level) 
                        ? "Kilidi Aç" 
                        : "Kilitli"}
                  </span>
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

  const handleFailure = () => {
    // Ses efektini çal
    tutuklaRef.current.play();
    // Arka plan müziğini durdur
    backgroundMusicRef.current.pause();
    // 3 saniye sonra menüye dön
    setTimeout(() => {
      setGameState('prison');
      setShowScore(false);
      setCurrentQuestion(0);
      setScore(0);
      setWrongCount(0);
    }, 3000);
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
                  <div className="success-icon-container">
                    <span className="success-icon">🔓</span>
                  </div>
                  <h2 className="success-title">Kilit {currentSetup} Başarıyla Açıldı!</h2>
                  <p className="success-score">
                    Tüm soruları doğru yanıtladın!
                  </p>
                </div>
                <button 
                  className="next-level-button" 
                  onClick={() => {
                    handleLevelCompletion(currentSetup);
                    setGameState('prison');
                  }}
                >
                  <div className="button-content">
                    <span className="button-icon">🔒</span>
                    <span className="button-text">Diğer Kilitlere Dön</span>
                    <span className="button-arrow">→</span>
                  </div>
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

  // Component unmount olduğunda sesleri temizle
  useEffect(() => {
    return () => {
      backgroundMusicRef.current.pause();
      tutuklaRef.current.pause();
      bittiSesRef.current.pause();
    };
  }, []);

  // CSS stillerini ekleyin (eğer inline stil kullanıyorsanız)
  const styles = `
    .start-screen {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }

    .start-content {
      text-align: center;
    }

    .game-title {
      font-size: 3.5rem;
      color: #fff;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      margin-bottom: 3rem;
      font-family: 'Arial', sans-serif;
      animation: fadeInDown 1.2s ease-out;
    }

    .start-button {
      padding: 1.2rem 2.5rem;
      font-size: 1.5rem;
      background-color: #e63946;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      font-weight: bold;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      animation: fadeInUp 1.2s ease-out;
    }

    .start-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3);
      background-color: #dc2f3c;
    }

    @keyframes fadeInDown {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Stilleri head'e ekleyin
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
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