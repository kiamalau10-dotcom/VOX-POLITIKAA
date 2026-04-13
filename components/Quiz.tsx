import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight, RotateCcw, ShieldAlert, Medal, Zap, Star, Mountain } from 'lucide-react';
import { Question, User } from '../types';
import { ALL_QUESTIONS } from '../services/quizData';
import { 
  db, 
  collection, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  updateDoc, 
  doc, 
  getDoc,
  OperationType,
  handleFirestoreError
} from '../firebase';

const MountainTracker: React.FC<{ level: number, isDarkMode: boolean }> = ({ level, isDarkMode }) => {
  const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/30 border-white/5' : 'bg-gray-50 border-black/5'}`}>
      <div className="flex items-center gap-3 mb-8">
        <Mountain className="text-red-600" />
        <h3 className="text-xl font-black uppercase italic">Puncak Literasi</h3>
      </div>
      <div className="relative h-40 flex items-end justify-between px-4">
        {/* Mountain Path */}
        <div className="absolute bottom-4 left-0 right-0 h-1 bg-black/5 dark:bg-white/5" />
        {levels.map((l) => {
          const isActive = l <= level;
          const isCurrent = l === level;
          const height = 20 + (l * 10);
          return (
            <div key={l} className="relative flex flex-col items-center group">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                className={`w-1 rounded-t-full transition-all duration-500 ${isActive ? 'bg-red-600' : 'bg-black/10 dark:bg-white/10'}`}
              />
              <div className={`mt-2 w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-black ${
                isCurrent ? 'bg-red-600 text-white shadow-lg shadow-red-600/40 scale-125 z-10' : 
                isActive ? 'bg-red-600/20 text-red-600' : 'bg-black/5 dark:bg-white/5 opacity-30'
              }`}>
                {l}
              </div>
              {isCurrent && (
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-8"
                >
                  <Trophy size={14} className="text-yellow-500" />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-center mt-6 text-[10px] font-black uppercase opacity-40 tracking-widest">
        Daki terus untuk mencapai Puncak Demokrasi
      </p>
    </div>
  );
};

const AchievementPopup: React.FC<{ title: string, icon: string, onClose: () => void }> = ({ title, icon, onClose }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.5, y: 100 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.5, y: 100 }}
    className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] w-full max-w-sm px-6"
  >
    <div className="bg-zinc-900 border-2 border-yellow-500 p-6 rounded-3xl shadow-2xl flex items-center gap-6">
      <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-yellow-500/20">
        {icon === 'Star' ? <Star size={32} className="text-black" /> : <Zap size={32} className="text-black" />}
      </div>
      <div>
        <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">Pencapaian Baru!</p>
        <h4 className="text-xl font-black text-white uppercase italic leading-tight">{title}</h4>
      </div>
      <button onClick={onClose} className="ml-auto text-white/50 hover:text-white">
        <XCircle size={20} />
      </button>
    </div>
  </motion.div>
);

const Quiz: React.FC<{ 
  isDarkMode: boolean, 
  currentUser: User | null,
  onStateChange?: (isActive: boolean) => void 
}> = ({ isDarkMode, currentUser, onStateChange }) => {
  const [currentStep, setCurrentStep] = useState<'start' | 'playing' | 'result'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [history, setHistory] = useState<{ q: string, correct: boolean, explanation: string }[]>([]);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [achievement, setAchievement] = useState<{ title: string, icon: string } | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    const path = 'users';
    const q = query(
      collection(db, path),
      orderBy('level', 'desc'),
      orderBy('currentExp', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => doc.data() as User);
      setLeaderboardData(users);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(currentStep === 'playing');
    }
  }, [currentStep, onStateChange]);

  // Fisher-Yates Shuffle
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startQuiz = () => {
    const userLevel = currentUser?.level || 1;
    
    // Get used questions from localStorage to avoid repetition
    const usedQuestionsKey = `used_questions_${currentUser?.username || 'guest'}`;
    const usedQuestions: string[] = JSON.parse(localStorage.getItem(usedQuestionsKey) || '[]');

    // Progressive Difficulty Logic:
    // We pick questions around the user's current level.
    // As level increases, the pool shifts towards higher level questions.
    const filteredQuestions = ALL_QUESTIONS.filter(q => {
      const minLevel = Math.max(1, userLevel - 2);
      const maxLevel = Math.min(10, userLevel + 1);
      return q.level >= minLevel && q.level <= maxLevel;
    });

    // Filter out recently used questions
    let availableQuestions = filteredQuestions.filter(q => !usedQuestions.includes(q.question));

    // If not enough available questions, fallback to all filtered questions and reset history
    if (availableQuestions.length < 10) {
      availableQuestions = filteredQuestions;
      localStorage.setItem(usedQuestionsKey, JSON.stringify([]));
    }

    // Shuffle and pick 10
    const shuffledQuestions = shuffle(availableQuestions).slice(0, 10).map(q => ({
      ...q,
      options: shuffle(q.options) // Shuffle options too
    }));

    // Update used questions list (keep last 50 to ensure variety without infinite growth)
    const currentUsed = shuffledQuestions.map(q => q.question);
    const updatedUsed = Array.from(new Set([...usedQuestions, ...currentUsed])).slice(-50);
    localStorage.setItem(usedQuestionsKey, JSON.stringify(updatedUsed));

    // Find new correct answer index after shuffle
    const processedQuestions = shuffledQuestions.map(q => {
      const originalQ = ALL_QUESTIONS.find(aq => aq.question === q.question);
      if (originalQ) {
        const correctText = originalQ.options[originalQ.correctAnswer];
        const newCorrectIndex = q.options.indexOf(correctText);
        return { ...q, correctAnswer: newCorrectIndex };
      }
      return q;
    });

    setQuestions(processedQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setHistory([]);
    setCurrentStep('playing');
  };

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const submitAnswer = () => {
    if (selectedOption === null || isAnswered) return;
    
    const currentQ = questions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) setCorrectCount(prev => prev + 1);
    
    setHistory(prev => [...prev, {
      q: currentQ.question,
      correct: isCorrect,
      explanation: currentQ.explanation
    }]);
    
    setIsAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const expGained = correctCount * 10;
    const coinsGained = Math.floor(finalScore * 0.5);
    
    if (currentUser) {
      const docId = currentUser.username.replace('@', '');
      const userRef = doc(db, 'users', docId);
      
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          const updatedUser = { ...userData };
          
          updatedUser.currentExp += expGained;
          updatedUser.coins = (updatedUser.coins || 0) + coinsGained;
          
          let leveledUp = false;
          const expNeeded = updatedUser.level * 100;
          if (finalScore >= 80) {
            updatedUser.level += 1;
            leveledUp = true;
            if (updatedUser.currentExp >= expNeeded) {
              updatedUser.currentExp -= expNeeded;
            }
          } else if (updatedUser.currentExp >= expNeeded) {
            updatedUser.level += 1;
            updatedUser.currentExp -= expNeeded;
            leveledUp = true;
          }

          const quizResult = {
            quizId: `quiz_${Date.now()}`,
            score: finalScore,
            date: new Date().toISOString(),
            topic: "Literasi Politik"
          };
          updatedUser.quizHistory = [quizResult, ...updatedUser.quizHistory].slice(0, 50);

          // Achievement Check
          if (leveledUp && updatedUser.level === 5) {
            const ach = { id: 'level_5', title: 'Warga Terpelajar', date: new Date().toISOString(), icon: 'Star' };
            updatedUser.achievements = [...(updatedUser.achievements || []), ach];
            setAchievement({ title: ach.title, icon: ach.icon });
          } else if (finalScore === 100) {
            const ach = { id: 'perfect_score', title: 'Politikus Jenius', date: new Date().toISOString(), icon: 'Zap' };
            if (!(updatedUser.achievements || []).find(a => a.id === ach.id)) {
              updatedUser.achievements = [...(updatedUser.achievements || []), ach];
              setAchievement({ title: ach.title, icon: ach.icon });
            }
          }

          await updateDoc(userRef, {
            currentExp: updatedUser.currentExp,
            coins: updatedUser.coins,
            level: updatedUser.level,
            quizHistory: updatedUser.quizHistory,
            achievements: updatedUser.achievements || []
          });

          // Sync local storage
          localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error("Error updating quiz results: ", error);
      }
    }

    setCurrentStep('result');
  };

  const handleExit = () => {
    if (currentStep === 'playing') {
      setShowExitWarning(true);
    } else {
      setCurrentStep('start');
    }
  };

  const confirmExit = () => {
    setShowExitWarning(false);
    setCurrentStep('start');
    if (onStateChange) onStateChange(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <AnimatePresence mode="wait">
        {currentStep === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className={`p-12 rounded-[2.5rem] text-center border ${
              isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-2xl'
            }`}>
              <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-red-600/20">
                <Trophy size={40} className="text-white" />
              </div>
              <h2 className="text-4xl font-black uppercase italic text-red-600 mb-4">Uji Literasi Politik</h2>
              <p className={`mb-4 text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Level Anda: <span className="text-red-600 font-black">{currentUser?.level || 1}</span>
              </p>
              <p className={`mb-10 text-sm font-medium ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Jawab 10 pertanyaan adaptif. Skor ≥ 80 untuk naik level!
              </p>
              <button 
                onClick={startQuiz}
                className="bg-red-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/30"
              >
                Mulai Kuis
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MountainTracker level={currentUser?.level || 1} isDarkMode={isDarkMode} />
              
              {/* Leaderboard Section */}
              <div className={`p-10 rounded-[2.5rem] border ${
                isDarkMode ? 'bg-zinc-900/30 border-white/5' : 'bg-gray-50 border-black/5'
              }`}>
                <div className="flex items-center gap-3 mb-8">
                  <Medal className="text-yellow-500" />
                  <h3 className="text-xl font-black uppercase italic">Peringkat Nasional</h3>
                </div>
                <div className="space-y-4">
                  {leaderboardData.map((user, idx) => (
                    <div key={user.username} className={`flex items-center justify-between p-4 rounded-2xl ${
                      idx === 0 ? 'bg-yellow-500/10 border border-yellow-500/20' : 
                      isDarkMode ? 'bg-white/5' : 'bg-white'
                    }`}>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-black opacity-30">#{idx + 1}</span>
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-black/5">
                          <img 
                            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username.replace('@', '')}&backgroundColor=f8fafc,f1f5f9&radius=20`}
                            alt={user.username}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-bold uppercase tracking-tight">{user.username}</p>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase">Level {user.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black text-red-600 uppercase">{user.currentExp} EXP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'playing' && questions.length > 0 && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Pertanyaan {currentIndex + 1}/10</span>
                  {questions[currentIndex].isHots && (
                    <span className="px-2 py-0.5 bg-yellow-500 text-black text-[8px] font-black uppercase rounded flex items-center gap-1">
                      <Zap size={8} fill="currentColor" /> HOTS
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-black uppercase italic mt-2 leading-tight">{questions[currentIndex].question}</h3>
              </div>
              <button 
                onClick={handleExit}
                className="p-3 rounded-xl bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentIndex].options.map((opt, idx) => {
                let statusClass = isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-gray-50 border-black/5';
                if (isAnswered) {
                  if (idx === questions[currentIndex].correctAnswer) {
                    statusClass = 'bg-green-500/20 border-green-500 text-green-500';
                  } else if (idx === selectedOption) {
                    statusClass = 'bg-red-500/20 border-red-500 text-red-500';
                  }
                } else if (selectedOption === idx) {
                  statusClass = 'border-red-600 bg-red-600/5';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className={`p-6 rounded-2xl border-2 text-left font-bold transition-all flex items-center justify-between gap-4 ${statusClass}`}
                  >
                    <span className="leading-relaxed">{opt}</span>
                    {isAnswered && idx === questions[currentIndex].correctAnswer && <CheckCircle2 size={20} className="shrink-0" />}
                    {isAnswered && idx === selectedOption && idx !== questions[currentIndex].correctAnswer && <XCircle size={20} className="shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border ${
                  isDarkMode ? 'bg-zinc-900/80 border-white/10' : 'bg-gray-100 border-black/5'
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">
                  <span className="font-black uppercase text-red-600 block mb-2">Penjelasan:</span>
                  {questions[currentIndex].explanation}
                </p>
              </motion.div>
            )}

            <div className="flex justify-end">
              {!isAnswered ? (
                <button 
                  onClick={submitAnswer}
                  disabled={selectedOption === null}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest disabled:opacity-50 shadow-lg shadow-red-600/20"
                >
                  Kirim Jawaban
                </button>
              ) : (
                <button 
                  onClick={nextQuestion}
                  className="bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-red-600/20"
                >
                  {currentIndex === questions.length - 1 ? 'Lihat Hasil' : 'Lanjut'} <ArrowRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {currentStep === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-12 rounded-[2.5rem] border ${
              isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-2xl'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-5xl font-black uppercase italic text-red-600 mb-4">Hasil Kuis</h2>
              <div className="text-8xl font-black mb-4">{Math.round((correctCount / 10) * 100)}</div>
              <p className="text-xl font-bold opacity-50 uppercase tracking-widest">Skor Akhir Anda</p>
              <div className="mt-6 p-4 bg-red-600/10 rounded-2xl inline-block">
                <p className="text-xs font-black text-red-600 uppercase">+{correctCount * 10} EXP Gained</p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h4 className="font-black uppercase tracking-widest text-xs opacity-50 mb-4">Ringkasan Jawaban</h4>
              {history.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                  {item.correct ? <CheckCircle2 className="text-green-500 shrink-0" /> : <XCircle className="text-red-500 shrink-0" />}
                  <div>
                    <p className="text-sm font-bold mb-1 leading-tight">{item.q}</p>
                    <p className="text-xs opacity-60 leading-relaxed">{item.explanation}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setCurrentStep('start')}
                className="flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg shadow-red-600/20"
              >
                <RotateCcw size={18} /> Selesai
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Popup */}
      <AnimatePresence>
        {achievement && (
          <AchievementPopup 
            title={achievement.title} 
            icon={achievement.icon} 
            onClose={() => setAchievement(null)} 
          />
        )}
      </AnimatePresence>

      {/* Exit Warning Modal */}
      <AnimatePresence>
        {showExitWarning && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className={`p-10 rounded-[2.5rem] max-w-md w-full border ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'}`}
            >
              <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldAlert size={32} className="text-red-600" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4">Hentikan Kuis?</h3>
              <p className={`mb-8 font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Jika Anda keluar sekarang, progres kuis ini akan hilang dan skor dianggap 0. Yakin ingin menyerah?
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowExitWarning(false)}
                  className={`flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs border ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'}`}
                >
                  Lanjutkan
                </button>
                <button 
                  onClick={confirmExit}
                  className="flex-1 py-4 rounded-xl font-bold uppercase tracking-widest text-xs bg-red-600 text-white hover:bg-red-700"
                >
                  Keluar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
