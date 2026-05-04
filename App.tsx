import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSection, User } from './types';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load heavy components for performance
const Cabinet = React.lazy(() => import('./components/Cabinet'));
const Parties = React.lazy(() => import('./components/Parties'));
const PoliticalMap = React.lazy(() => import('./components/PoliticalMap'));
const PoliticsBasics = React.lazy(() => import('./components/PoliticsBasics'));
const ChatBot = React.lazy(() => import('./components/ChatBot'));
const News = React.lazy(() => import('./components/News'));
const VoxCircle = React.lazy(() => import('./components/VoxCircle'));
const AvatarLab = React.lazy(() => import('./components/AvatarLab'));
const Quiz = React.lazy(() => import('./components/Quiz'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const ProgramSection = React.lazy(() => import('./components/ProgramSection'));
import StreakProtectionModal from './components/StreakProtectionModal';
import { MessageSquare, Send } from 'lucide-react';
import { db, collection, addDoc, doc, updateDoc, OperationType, handleFirestoreError, serverTimestamp, query, where, orderBy, onSnapshot } from './firebase';
import ErrorBoundary from './components/ErrorBoundary';

import { CMSProvider, useCMS } from './components/CMSContext';
import { UserProvider } from './components/UserContext';
import { useUser } from './components/useUser';

const Content = React.memo(({ 
  activeSection, 
  currentUser, 
  isDarkMode, 
  setActiveSection, 
  setIsLoggedIn, 
  handleLogin, 
  handleLogout, 
  feedback, 
  setFeedback, 
  handleSendFeedback, 
  isSent,
  setIsQuizActive,
  userFeedbacks
}: { 
  activeSection: AppSection, 
  currentUser: User | null, 
  isDarkMode: boolean, 
  setActiveSection: (section: AppSection) => void,
  setIsLoggedIn: (val: boolean) => void,
  handleLogin: (user: User) => void,
  handleLogout: () => void,
  feedback: string,
  setFeedback: (val: string) => void,
  handleSendFeedback: (e: React.FormEvent) => void,
  isSent: boolean,
  setIsQuizActive: (val: boolean) => void,
  userFeedbacks: any[]
}) => {
  return (
    <React.Suspense fallback={<SectionLoader isDarkMode={isDarkMode} />}>
      {(() => {
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

                  <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5">
                    <h3 className="text-xl font-black uppercase italic mb-6">Riwayat Feedback Anda</h3>
                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {userFeedbacks.map((fb) => (
                        <div key={fb.id} className={`p-4 rounded-xl border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-black/5'}`}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-black uppercase text-red-600">{fb.date} • {fb.time || 'Baru'}</span>
                            <span className="text-[8px] font-bold opacity-30 uppercase">TERKIRIM</span>
                          </div>
                          <p className="text-xs font-medium italic opacity-80 leading-relaxed">"{fb.message}"</p>
                        </div>
                      ))}
                      {userFeedbacks.length === 0 && (
                        <p className="text-center py-8 text-[10px] font-bold uppercase opacity-30 italic">Belum ada feedback yang dikirim.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          default: return <Hero onStart={setActiveSection} isDarkMode={isDarkMode} />;
        }
      })()}
    </React.Suspense>
  );
});

const SectionLoader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className={`h-[60vh] flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full"
    />
  </div>
);

const LegalModal: React.FC<{ 
  title: string; 
  content: React.ReactNode; 
  onClose: () => void;
  isDarkMode: boolean;
}> = ({ title, content, onClose, isDarkMode }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative w-full max-w-2xl p-12 rounded-[3rem] border-4 ${
        isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black text-black'
      }`}
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-red-600 text-white rounded-full hover:scale-110 transition-transform">
        <Send size={20} className="rotate-45" />
      </button>
      <h3 className="text-3xl font-black uppercase italic text-red-600 mb-8">{title}</h3>
      <div className={`text-sm font-medium leading-relaxed space-y-4 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
        {content}
      </div>
    </motion.div>
  </div>
);

const AppContent: React.FC = () => {
  const { isEditMode, setIsEditMode } = useCMS();
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, logout, isLoading, resolveStreak } = useUser();
  const [legalModal, setLegalModal] = useState<{ title: string; content: React.ReactNode } | null>(null);
  
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
  const [userFeedbacks, setUserFeedbacks] = useState<any[]>([]);
  const [isAvatarLabOpen, setIsAvatarLabOpen] = useState(false);

  useEffect(() => {
    (window as any).openAvatarLab = () => setIsAvatarLabOpen(true);
    (window as any).setActiveSection = (section: AppSection) => setActiveSection(section);
  }, []);

  // Fetch real-time feedback history ONLY for the logged-in user
  useEffect(() => {
    if (isLoggedIn && currentUser?.uid) {
      const q = query(
        collection(db, 'feedbacks'), 
        where('uid', '==', currentUser.uid),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fbs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserFeedbacks(fbs);
      }, (err) => {
        console.warn("User feedbacks fetch error:", err);
      });
      return () => unsubscribe();
    }
  }, [isLoggedIn, currentUser?.uid]);

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
    logout();
    setActiveSection(AppSection.HOME);
  };

  // Sync currentUser from Firestore in real-time
  // (Moved to UserContext)

  // Sync currentUser from localStorage (for updates from other components)
  // (Moved to UserContext)

  const handleSendFeedback = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    const path = 'feedbacks';
    try {
      const now = new Date();
      await addDoc(collection(db, path), {
        uid: currentUser?.uid || auth.currentUser?.uid || 'anonymous',
        username: currentUser?.username || 'Anonymous',
        displayName: currentUser?.displayName || 'Warga Anonim',
        message: feedback,
        date: now.toISOString().split('T')[0],
        time: now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        timestamp: serverTimestamp()
      });
      setIsSent(true);
      setFeedback('');
      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      console.error("Error sending feedback:", error);
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  }, [feedback, currentUser]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Auth isDarkMode={isDarkMode} onLogin={handleLogin} />;
  }

  return (
    <div className={`min-h-screen antialiased transition-colors duration-300 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      {!isQuizActive && (
        <Navbar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      
      <main className={`relative ${isQuizActive ? 'pt-0' : 'pt-16'}`}> 
        {currentUser?.role === 'ADMIN' && (
          <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-6 py-3 rounded-xl font-black italic uppercase tracking-widest text-xs shadow-2xl transition-all active:scale-95 ${
                isEditMode ? 'bg-green-500 text-white' : 'bg-red-600 text-white'
              }`}
            >
              {isEditMode ? '✓ SIMPAN / OK' : '✎ EDIT MODE'}
            </button>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSection} 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.02 }} 
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Content 
              activeSection={activeSection}
              currentUser={currentUser}
              isDarkMode={isDarkMode}
              setActiveSection={setActiveSection}
              setIsLoggedIn={setIsLoggedIn}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              feedback={feedback}
              setFeedback={setFeedback}
              handleSendFeedback={handleSendFeedback}
              isSent={isSent}
              setIsQuizActive={setIsQuizActive}
              userFeedbacks={userFeedbacks}
            />
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
                {Object.values(AppSection).filter(v => v !== 'home' && v !== 'login' && v !== 'feedback').map((sec) => (
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
                <li>
                  <button 
                    onClick={() => setLegalModal({
                      title: 'Siapa Kami?',
                      content: (
                        <div className="space-y-6">
                          <p className="text-2xl font-black text-red-600 tracking-tighter leading-tight mb-6">
                            MENHUBUNGKAN GAGASAN,<br />MENCERDASKAN PILIHAN.
                          </p>
                          
                          <p className="font-medium text-lg leading-relaxed">
                            Selamat datang di <span className="text-red-600 font-bold">VoxPolitika</span>! Kami adalah tim kecil dengan visi besar dari <span className="underline decoration-red-600 underline-offset-4 font-bold">SMA Unggul Del</span> yang digerakkan oleh <span className="text-red-600">Devina Purba</span>, <span className="text-red-600">Hizkia Malau</span>, dan <span className="text-red-600">Larissa Siahaan</span>.
                          </p>

                          <div className={`p-8 border-l-8 border-red-600 rounded-r-3xl italic font-medium ${isDarkMode ? 'bg-white/5' : 'bg-red-50'}`}>
                            <p className="mb-4">"VoxPolitika lahir dari sebuah keresahan di meja riset. Melalui kompetisi penelitian yang kami ikuti, kami menyadari bahwa data angka saja tidak cukup untuk membawa perubahan."</p>
                            <p>Kami percaya bahwa literasi politik harus bersifat inklusif, mudah diakses, dan berdampak nyata. Karena itulah, kami mentransformasi hasil riset tersebut menjadi sebuah platform interaktif yang dirancang khusus untuk membantu khalayak luas memahami dinamika politik dengan cara yang lebih segar.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/5 bg-gray-50'}`}>
                              <span className="block text-[10px] font-black uppercase text-red-600 mb-1">Misi Kami</span>
                              <p className="text-xs font-bold leading-tight">Inklusivitas & Literasi Digital</p>
                            </div>
                            <div className={`p-4 rounded-2xl border ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/5 bg-gray-50'}`}>
                              <span className="block text-[10px] font-black uppercase text-red-600 mb-1">Target</span>
                              <p className="text-xs font-bold leading-tight">Generasi Emas Indonesia 2045</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    className="hover:text-red-600 transition-colors flex items-center gap-2 group"
                  >
                    About Us
                    <span className="bg-red-600 text-white text-[8px] px-1.5 py-0.5 rounded-full scale-0 group-hover:scale-100 transition-transform origin-left">BARU</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModal({
                      title: 'Kebijakan Privasi',
                      content: (
                        <>
                          <p>Di VoxPolitika, kami sangat menghargai privasi kamu. Kami ingin kamu belajar dengan tenang tanpa merasa diawasi.</p>
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Data yang Kami Kumpulkan: Hanya Nama Lengkap dan Password.</li>
                            <li>Tanpa Pelacak Pihak Ketiga: Kami tidak menggunakan Google Analytics.</li>
                            <li>Penggunaan Data: Murni untuk manajemen akun internal.</li>
                            <li>Jaminan Keamanan: Data kamu tidak akan pernah dijual.</li>
                          </ul>
                        </>
                      )
                    })}
                    className="hover:text-red-600 transition-colors"
                  >
                    Kebijakan Privasi
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setLegalModal({
                      title: 'Syarat & Ketentuan',
                      content: (
                        <>
                          <p>Supaya komunitas VoxPolitika tetap sehat dan seru, ada beberapa aturan main:</p>
                          <ul className="list-disc pl-4 space-y-2">
                            <li>Batasan Umur: Ditujukan untuk pengguna berusia 13 tahun ke atas.</li>
                            <li>Etika Berdiskusi: Dilarang keras ujaran kebencian, SARA, atau pornografi.</li>
                            <li>Zero Tolerance for Hoaxes: Jangan menyebarkan berita bohong.</li>
                            <li>Tanggung Jawab Konten: Segala isi komentar adalah tanggung jawab penulis.</li>
                            <li>Moderasi: Admin berhak menghapus postingan yang melanggar aturan.</li>
                          </ul>
                        </>
                      )
                    })}
                    className="hover:text-red-600 transition-colors"
                  >
                    Syarat & Ketentuan
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={`max-w-7xl mx-auto mt-20 pt-10 border-t flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'border-white/10 text-zinc-600' : 'border-black/10 text-zinc-400'}`}>
            <p>© 2026 VOXPOLITIKA INDONESIA. ALL RIGHTS RESERVED.</p>
            <span className="text-red-600 mt-4 md:mt-0 animate-pulse font-black">Indonesia Emas 2045</span>
          </div>
        </footer>
      )}

      {/* Legal Modal */}
      <AnimatePresence>
        {legalModal && (
          <LegalModal 
            title={legalModal.title} 
            content={legalModal.content} 
            isDarkMode={isDarkMode} 
            onClose={() => setLegalModal(null)} 
          />
        )}
      </AnimatePresence>

      {/* Streak Protection Modal */}
      <AnimatePresence>
        {currentUser && currentUser.needsStreakProtection && (
          <StreakProtectionModal 
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onResolve={resolveStreak}
          />
        )}
      </AnimatePresence>

      {/* Avatar Lab Modal */}
      {isAvatarLabOpen && currentUser && (
        <AvatarLab 
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onClose={() => setIsAvatarLabOpen(false)}
          onUpdateUser={async (updatedUser) => {
            setCurrentUser(updatedUser);
            localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            // Update allUsers list
            const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
            const updatedAllUsers = allUsers.map((u: any) => u.username === updatedUser.username ? updatedUser : u);
            localStorage.setItem('all_users', JSON.stringify(updatedAllUsers));

            // Sync to Firestore
            try {
              const docId = updatedUser.username.replace('@', '');
              await updateDoc(doc(db, 'users', docId), {
                avatarConfig: updatedUser.avatarConfig,
                equippedCostumeId: updatedUser.equippedCostumeId,
                voxTitle: updatedUser.voxTitle || null,
                coins: updatedUser.coins,
                ownedItems: updatedUser.ownedItems || []
              });
            } catch (error) {
              console.error("Error syncing avatar update to Firestore:", error);
            }
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

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CMSProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </CMSProvider>
    </ErrorBoundary>
  );
};

export default App;
