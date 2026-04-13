import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { MessageSquare, Send, Trash2, Edit3, CheckCircle } from 'lucide-react';
import { db, collection, addDoc, OperationType, handleFirestoreError, getDocs, writeBatch } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';

import { CMSProvider, useCMS } from './components/CMSContext';
import { UserProvider } from './components/UserContext';
import { useUser } from './components/useUser';

// --- SUB-COMPONENT: CONTENT ---
const Content = ({ 
  activeSection, currentUser, isDarkMode, setActiveSection, 
  setIsLoggedIn, handleLogin, handleLogout, feedback, setFeedback, 
  handleSendFeedback, isSent, setIsQuizActive 
}: any) => {
  const contentProps = useMemo(() => ({
    isDarkMode, currentUser, setActiveSection
  }), [isDarkMode, currentUser, setActiveSection]);

  switch (activeSection) {
    case AppSection.HOME:
      return (
        <div className="space-y-20">
          <Hero onStart={setActiveSection} isDarkMode={isDarkMode} />
          <div id="vox-circle"><VoxCircle {...contentProps} /></div>
          <div id="news-section"><News /></div>
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
          <div className={`p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-2xl'}`}>
            <h2 className="text-4xl font-black mb-2 uppercase italic text-red-600">Feedback Dashboard</h2>
            <p className={`mb-8 font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Suara Anda membangun demokrasi yang lebih baik.</p>
            <form onSubmit={handleSendFeedback} className="space-y-6">
              <textarea 
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tulis kritik atau saran Anda di sini..."
                className={`w-full h-48 p-8 rounded-3xl outline-none transition-all border-2 text-lg ${
                  isDarkMode ? 'bg-black border-white/10 focus:border-red-600' : 'bg-gray-50 border-gray-200 focus:border-red-600'
                }`}
                required
              />
              <button type="submit" className="flex items-center gap-3 bg-red-600 text-white px-10 py-5 rounded-2xl font-black italic hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-red-600/20">
                <Send size={20} /> KIRIM MASUKAN
              </button>
            </form>
            <AnimatePresence>
              {isSent && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-6 p-6 bg-green-500/10 border border-green-500 text-green-500 rounded-2xl font-black text-center uppercase tracking-widest">
                  Feedback Berhasil Terkirim!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    default: return <Hero onStart={setActiveSection} isDarkMode={isDarkMode} />;
  }
};

// --- MAIN APP CONTENT ---
const AppContent: React.FC = () => {
  const { isEditMode, setIsEditMode } = useCMS();
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout, isLoading } = useUser();
  const [legalModal, setLegalModal] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") !== "light");
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isAvatarLabOpen, setIsAvatarLabOpen] = useState(false);

  // Sync Theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const handleLogin = (user: User) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    const storage = (user as any).rememberMe ? localStorage : sessionStorage;
    storage.setItem("isLoggedIn", "true");
    storage.setItem("currentUser", JSON.stringify(user));
  };

  const handleSendFeedback = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    try {
      await addDoc(collection(db, 'feedbacks'), {
        username: currentUser?.username || 'Anonymous',
        message: feedback,
        timestamp: new Date().toISOString()
      });
      setIsSent(true);
      setFeedback('');
      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'feedbacks');
    }
  }, [feedback, currentUser]);

  const handleNukeAllPosts = async () => {
    const confirm = window.prompt("⚠️ BAHAYA: Hapus SEMUA postingan? Ketik 'HAPUS SEMUA':");
    if (confirm === 'HAPUS SEMUA') {
      try {
        const snap = await getDocs(collection(db, 'posts'));
        const batch = writeBatch(db);
        snap.docs.forEach(d => batch.delete(d.ref));
        await batch.commit();
        alert("💥 VOXCIRCLE DIBERSIHKAN!");
        window.location.reload();
      } catch (e: any) {
        alert("Gagal: " + e.message);
      }
    }
  };

  if (isLoading) return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full" />
    </div>
  );

  if (!isLoggedIn) return <Auth isDarkMode={isDarkMode} onLogin={handleLogin} />;

  return (
    <div className={`min-h-screen antialiased transition-colors duration-700 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      {!isQuizActive && (
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)} 
        />
      )}
      
      <main className={`relative ${isQuizActive ? 'pt-0' : 'pt-16'}`}> 
        {currentUser?.role === 'ADMIN' && (
          <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
            <button onClick={handleNukeAllPosts} className="p-4 rounded-2xl bg-black text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all shadow-2xl flex items-center gap-2 font-black italic text-xs uppercase">
              <Trash2 size={16} /> Nuke Posts
            </button>
            <button onClick={() => setIsEditMode(!isEditMode)} className={`p-4 rounded-2xl shadow-2xl transition-all flex items-center gap-2 font-black italic text-xs uppercase ${isEditMode ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}>
              {isEditMode ? <CheckCircle size={16} /> : <Edit3 size={16} />} {isEditMode ? 'Finish Edit' : 'Edit Mode'}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={activeSection} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <Content 
              activeSection={activeSection} currentUser={currentUser} isDarkMode={isDarkMode}
              setActiveSection={setActiveSection} setIsLoggedIn={setIsLoggedIn} 
              handleLogin={handleLogin} handleLogout={() => { logout(); setActiveSection(AppSection.HOME); }}
              feedback={feedback} setFeedback={setFeedback} handleSendFeedback={handleSendFeedback} 
              isSent={isSent} setIsQuizActive={setIsQuizActive}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer & Modals tetap sama seperti kodemu namun dengan sedikit perbaikan styling */}
      {/* ... [Bagian Footer & Modals] ... */}
      
      {/* Tombol Floating Feedback */}
      {activeSection !== AppSection.FEEDBACK && !isQuizActive && (
        <motion.button
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setActiveSection(AppSection.FEEDBACK)}
          className={`fixed bottom-8 left-8 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center z-40 border-2 ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/5 text-black'}`}
        >
          <MessageSquare className="w-8 h-8" />
        </motion.button>
      )}

      {/* Avatar Lab */}
      {isAvatarLabOpen && currentUser && (
        <AvatarLab 
          currentUser={currentUser} isDarkMode={isDarkMode} 
          onClose={() => setIsAvatarLabOpen(false)}
          onUpdateUser={(updated) => {
            setCurrentUser(updated);
            localStorage.setItem('currentUser', JSON.stringify(updated));
          }}
        />
      )}
    </div>
  );
};

const App: React.FC = () => (
  <ErrorBoundary>
    <CMSProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </CMSProvider>
  </ErrorBoundary>
);

export default App;
