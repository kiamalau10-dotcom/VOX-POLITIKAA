import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSection, User } from './types';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cabinet from './components/Cabinet';
import Parties from './components/Parties';
import PoliticalMap from './components/PoliticalMap';
import PoliticsBasics from './components/PoliticsBasics';
import ChatBot from './components/ChatBot';
import News from './components/News';
import VoxCircle from './components/VoxCircle';
import AvatarLab from './components/AvatarLab';
import Quiz from './components/Quiz';
import Dashboard from './components/Dashboard';
import ProgramSection from './components/ProgramSection';
import { MessageSquare, Send } from 'lucide-react';

const App: React.FC = () => {
  // --- STATE AUTH ---
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const remembered = localStorage.getItem("isLoggedIn") === "true";
    const sessioned = sessionStorage.getItem("isLoggedIn") === "true";
    return remembered || sessioned;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  // --- STATE TEMA & NAVIGASI ---
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [isQuizActive, setIsQuizActive] = useState(false);

  // --- STATE FEEDBACK ---
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isAvatarLabOpen, setIsAvatarLabOpen] = useState(false);

  useEffect(() => {
    (window as any).openAvatarLab = () => setIsAvatarLabOpen(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  const handleLogin = (user: User) => {
    const rememberMe = (user as any).rememberMe;
    setIsLoggedIn(true);
    setCurrentUser(user);
    
    if (rememberMe) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }
    
    localStorage.setItem(`user_data_${user.username}`, JSON.stringify(user));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("currentUser");
    setActiveSection(AppSection.HOME);
  };

  // Sync currentUser from localStorage (for updates from other components)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Also poll for local changes since 'storage' event only fires for other windows
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSendFeedback = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const allFeedbacks = JSON.parse(localStorage.getItem('all_feedbacks') || '[]');
    const newFeedback = {
      id: Date.now().toString(),
      username: currentUser?.username || 'Anonymous',
      message: feedback,
      date: new Date().toISOString().split('T')[0]
    };
    localStorage.setItem('all_feedbacks', JSON.stringify([newFeedback, ...allFeedbacks]));
    setIsSent(true);
    setFeedback('');
    setTimeout(() => setIsSent(false), 3000);
  }, [feedback, currentUser]);

  const renderContent = useCallback(() => {
    switch (activeSection) {
      case AppSection.HOME:
        return (
          <div className="space-y-20">
            <Hero onStart={setActiveSection} isDarkMode={isDarkMode} />
            <div id="vox-circle">
              <VoxCircle currentUser={currentUser} isDarkMode={isDarkMode} />
            </div>
            <div id="news-section">
              <News />
            </div>
          </div>
        );
      case AppSection.CABINET: return <Cabinet />;
      case AppSection.PROGRAM: return <ProgramSection isDarkMode={isDarkMode} />;
      case AppSection.PARTIES: return <Parties isDarkMode={isDarkMode} />;
      case AppSection.MAP: return <PoliticalMap isDarkMode={isDarkMode} />;
      case AppSection.BASICS: return <PoliticsBasics />;
      case AppSection.AI: return <ChatBot />;
      case AppSection.NEWS: return <News />;
      case AppSection.QUIZ: return <Quiz isDarkMode={isDarkMode} currentUser={currentUser} onStateChange={setIsQuizActive} />;
      case AppSection.DASHBOARD: 
        if (!currentUser) {
          setIsLoggedIn(false);
          return <Auth isDarkMode={isDarkMode} onLogin={handleLogin} />;
        }
        return <Dashboard isDarkMode={isDarkMode} currentUser={currentUser} onLogout={handleLogout} />;
      case AppSection.FEEDBACK:
        return (
          <div className="max-w-4xl mx-auto py-20 px-6">
            <div className={`p-10 rounded-3xl border ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
              <h2 className="text-3xl font-black mb-2 uppercase italic text-red-600">Feedback Dashboard</h2>
              <p className={`mb-8 font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Suara Anda membangun demokrasi yang lebih baik.</p>
              
              <form onSubmit={handleSendFeedback} className="space-y-6">
                <textarea 
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tulis kritik atau saran Anda di sini..."
                  className={`w-full h-40 p-6 rounded-2xl outline-none transition-all border-2 ${
                    isDarkMode ? 'bg-black border-white/10 focus:border-red-600' : 'bg-gray-50 border-gray-200 focus:border-red-600'
                  }`}
                  required
                />
                <button type="submit" className="flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95">
                  <Send size={20} /> KIRIM MASUKAN
                </button>
              </form>

              <AnimatePresence>
                {isSent && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 p-4 bg-green-500/10 border border-green-500 text-green-500 rounded-xl font-bold text-center">
                    FEEDBACK BERHASIL TERKIRIM! TERIMA KASIH.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      default: return <Hero onStart={setActiveSection} />;
    }
  }, [activeSection, isDarkMode, feedback, isSent, handleSendFeedback, currentUser]);

  if (!isLoggedIn) {
    return <Auth isDarkMode={isDarkMode} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen antialiased transition-colors duration-700 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      {!isQuizActive && (
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      <main className={`relative ${isQuizActive ? 'pt-0' : 'pt-16'}`}> 
        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {!isQuizActive && (
        <footer className={`py-24 px-6 border-t mt-20 transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/10' : 'bg-gray-50 border-black/10'}`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-4xl font-black tracking-tighter text-red-600 italic">VOXPOLITIKA</span>
              <p className={`mt-6 max-w-sm font-medium leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Membangun fondasi demokrasi masa depan melalui literasi politik yang inovatif bagi generasi emas Indonesia.
              </p>
            </div>
            
            <div>
              <h4 className={`font-bold mb-6 uppercase tracking-widest text-xs ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Navigasi</h4>
              <ul className="space-y-4 text-sm font-bold">
                {Object.values(AppSection).filter(v => v !== 'home' && v !== 'login').map((sec) => (
                  <li key={sec}>
                    <button onClick={() => setActiveSection(sec as AppSection)} className="hover:text-red-600 transition-colors capitalize">
                      {sec.replace('_', ' ')}
                    </button>
                  </li>
                ))}
                <li><button onClick={() => setActiveSection(AppSection.FEEDBACK)} className="text-red-600 hover:underline">Kirim Feedback</button></li>
                <li><button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors">Logout</button></li>
              </ul>
            </div>
  
            <div>
              <h4 className={`font-bold mb-6 uppercase tracking-widest text-xs ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Legalitas</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><button className="hover:text-red-600 transition-colors">Kebijakan Privasi</button></li>
                <li><button className="hover:text-red-600 transition-colors">Syarat & Ketentuan</button></li>
              </ul>
            </div>
          </div>
          
          <div className={`max-w-7xl mx-auto mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'border-white/10 text-zinc-600' : 'border-black/10 text-zinc-400'}`}>
            <p>© 2026 VOXPOLITIKA INDONESIA. ALL RIGHTS RESERVED.</p>
            <span className="text-red-600 mt-4 md:mt-0 animate-pulse font-black">Indonesia Emas 2045</span>
          </div>
        </footer>
      )}

      {/* Avatar Lab Modal */}
      {isAvatarLabOpen && currentUser && (
        <AvatarLab 
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onClose={() => setIsAvatarLabOpen(false)}
          onUpdateUser={(updatedUser) => {
            setCurrentUser(updatedUser);
            localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Update allUsers list
            const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
            const updatedAllUsers = allUsers.map((u: any) => u.username === updatedUser.username ? updatedUser : u);
            localStorage.setItem('all_users', JSON.stringify(updatedAllUsers));
          }}
        />
      )}

      {activeSection !== AppSection.AI && activeSection !== AppSection.FEEDBACK && !isQuizActive && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setActiveSection(AppSection.FEEDBACK)}
          className={`fixed bottom-8 left-8 w-16 h-16 bg-white text-black rounded-2xl shadow-2xl flex items-center justify-center z-40 border-2 ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'border-black/5'}`}
        >
          <MessageSquare className="w-8 h-8" />
        </motion.button>
      )}
    </div>
  );
};

export default App;
