import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, History, TrendingUp, MessageSquare, Users, Award, LogOut, Flame, BookOpen, CheckCircle2, AlertCircle, Sparkles, Trash2, Coins, Snowflake } from 'lucide-react';
import { User, Feedback, Vote } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useCMS } from './CMSContext';
import { useUser } from './useUser';

import { 
  db, 
  collection, 
  onSnapshot, 
  doc, 
  updateDoc,
  deleteDoc, 
  getDocs,
  writeBatch,
  query,
  orderBy,
  limit,
  OperationType,
  handleFirestoreError,
  deleteAccount
} from '../firebase';
import { where } from 'firebase/firestore';

// ==================== KOMPONEN PENDUKUNG (TIDAK DIUBAH) ====================
const StreakFire: React.FC<{ count: number; isPopping: boolean }> = ({ count, isPopping }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <motion.div
        animate={isPopping ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-orange-500/40 blur-3xl rounded-full scale-150" />
        <motion.svg
          width="80"
          height="100"
          viewBox="0 0 100 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          className="relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        >
          <defs>
            <linearGradient id="fireGradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <path d="M50 120C77.6142 120 100 97.6142 100 70C100 42.3858 80 10 50 0C20 10 0 42.3858 0 70C0 97.6142 22.3858 120 50 120Z" fill="url(#fireGradient)" />
          <path d="M50 100C66.5685 100 80 86.5685 80 70C80 53.4315 70 30 50 20C30 30 20 53.4315 20 70C20 86.5685 33.4315 100 50 100Z" fill="#FACC15" opacity="0.6" />
        </motion.svg>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
        <span className="text-4xl font-black italic uppercase text-red-600 drop-shadow-sm">{count} Hari Streak!</span>
      </motion.div>
    </div>
  );
};

const CinematicStreakOverlay: React.FC<{ count: number; motivation: string; onClose: () => void }> = ({ count, motivation, onClose }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="text-center max-w-2xl">
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-600/30 blur-[100px] rounded-full scale-150 animate-pulse" />
          <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-9xl relative z-10 drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]">🔥</motion.div>
        </div>
        <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-6xl md:text-8xl font-black italic uppercase text-white mb-4 tracking-tighter">{count} Hari!</motion.h2>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl font-bold text-red-500 mb-12 uppercase tracking-widest leading-relaxed">{motivation}</motion.p>
        <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} onClick={onClose} className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95">Lanjutkan Perjuangan</motion.button>
      </motion.div>
    </motion.div>
  );
};

const LiveVotes: React.FC<{ votes: Vote[]; totalVotes: number; isDarkMode: boolean }> = ({ votes, totalVotes, isDarkMode }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><TrendingUp size={20} className="text-red-600" /><h4 className="text-xs font-black uppercase tracking-widest">Live Voices</h4></div>
        <div className="px-3 py-1 bg-red-600 rounded-full text-[10px] font-black text-white animate-pulse">{totalVotes} TOTAL</div>
      </div>
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {votes.map((vote) => (
            <motion.div key={vote.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-between p-3 rounded-xl bg-black/5 border border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-600/10 flex items-center justify-center text-red-600 font-black text-[10px]">{vote.username.charAt(1).toUpperCase()}</div>
                <div><p className="text-[10px] font-black uppercase">{vote.username}</p><p className="text-[8px] font-bold opacity-50 uppercase">Menyuarakan Aspirasi</p></div>
              </div>
              <div className="text-[8px] font-bold opacity-30 uppercase">{vote.timestamp?.seconds ? new Date(vote.timestamp.seconds * 1000).toLocaleTimeString() : 'Baru saja'}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        {votes.length === 0 && <p className="text-[10px] font-bold uppercase opacity-30 italic text-center py-4">Menunggu suara baru...</p>}
      </div>
    </motion.div>
  );
};

const AdminStatsPlatform: React.FC<{ stats: any; liveStats?: any; isDarkMode: boolean }> = ({ stats, liveStats, isDarkMode }) => {
  const chartData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Active', value: liveStats?.activeNow || stats.activeUsers },
    { name: 'Votes', value: stats.totalVotes },
    { name: 'Quizzes', value: stats.totalQuizzesTaken },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
        <div className="flex items-center gap-3 mb-8"><TrendingUp size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Real-time Analytics</h3></div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#333' : '#eee'} />
              <XAxis dataKey="name" stroke={isDarkMode ? '#666' : '#999'} fontSize={10} fontWeight="bold" />
              <YAxis stroke={isDarkMode ? '#666' : '#999'} fontSize={10} fontWeight="bold" />
              <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#18181b' : '#fff', border: 'none', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
              <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={4} dot={{ r: 6, fill: '#dc2626' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
          { label: 'Active Now', value: liveStats?.activeNow || stats.activeUsers, icon: Shield, color: 'text-green-500' },
          { label: 'Total Voices', value: stats.totalVotes, icon: MessageSquare, color: 'text-red-500' },
          { label: 'Quizzes Taken', value: stats.totalQuizzesTaken, icon: BookOpen, color: 'text-purple-500' },
        ].map((item, idx) => (
          <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-lg'}`}>
            <item.icon className={`mb-4 ${item.color}`} size={24} />
            <p className="text-[10px] font-black uppercase opacity-50 mb-1">{item.label}</p>
            <p className="text-3xl font-black italic tracking-tighter">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DashboardAvatar2D = ({ username, config }: { username: string, config: any }) => {
  const isMale = config?.gender === 'male';
  const maleHair = ['short01', 'short02', 'short03', 'short04', 'short05'];
  const femaleHair = ['long01', 'long02', 'long03', 'long04', 'long05', 'hijab01'];
  
  const hairPool = isMale ? maleHair : femaleHair;
  const hairIndex = Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % hairPool.length;
  const hair = isMale ? hairPool[hairIndex] : (config?.hair === 'hijab' ? 'hijab01' : hairPool[hairIndex]);

  const params = new URLSearchParams({
    seed: username,
    hair: hair,
  });

  if (config?.skin === 'light') params.set('skinColor', 'fce5d8');
  if (config?.skin === 'medium') params.set('skinColor', 'e0ac69');
  if (config?.skin === 'dark') params.set('skinColor', '8d5524');

  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}&backgroundColor=f8fafc,f1f5f9&radius=20`;
  return (
    <div className="w-full h-full p-2 bg-gradient-to-br from-red-50 to-red-100 dark:from-zinc-800 dark:to-zinc-900 relative">
      <LazyLoadImage 
        key={username} 
        src={avatarUrl} 
        alt="Avatar" 
        className="w-full h-full object-contain drop-shadow-xl" 
        effect="opacity"
        wrapperClassName="w-full h-full"
        referrerPolicy="no-referrer" 
        onError={(e: any) => { e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`; }} 
      />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
    </div>
  );
};

// ==================== KOMPONEN UTAMA DASHBOARD (YANG DIMODIFIKASI) ====================
const Dashboard: React.FC<{ isDarkMode: boolean; currentUser: User | null; onLogout: () => void }> = ({ isDarkMode, onLogout }) => {
  const { currentUser, logout } = useUser();
  const { isEditMode, setIsEditMode } = useCMS();
  const role = currentUser?.role;
  const username = currentUser?.username;

  // --- State yang diperlukan (tanpa following/followers) ---
  const [streakData, setStreakData] = useState(() => {
    if (!currentUser) return { count: 1, lastLogin: '' };
    return { count: currentUser.streak || 1, lastLogin: currentUser.lastLoginDate || '' };
  });
  const [isPopping, setIsPopping] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [showCinematic, setShowCinematic] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{id: string, type: 'post' | 'user' | 'all_posts' | 'my_account'}>({id: '', type: 'post'});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [globalStats, setGlobalStats] = useState({ totalUsers: 0, activeUsers: 0, totalVotes: 0, totalQuizzesTaken: 0 });
  const [liveVotes, setLiveVotes] = useState<Vote[]>([]);
  const [liveStats, setLiveStats] = useState({ activeNow: 0, newUsersToday: 0, votesToday: 0 });
  const [hasCheckedToday, setHasCheckedToday] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return currentUser?.lastLoginDate === today;
  });
  const [adminQuizHistory, setAdminQuizHistory] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]); // Untuk admin
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isVoxStudioEnabled, setIsVoxStudioEnabled] = useState(false);

  // --- Real-time Global Stats ---
  useEffect(() => {
    const statsRef = doc(db, 'stats', 'global');
    const unsubscribe = onSnapshot(statsRef, (docSnap) => { 
      if (docSnap.exists()) setGlobalStats(docSnap.data() as any); 
    }, (error) => {
      console.warn("Stats fetch error:", error);
    });
    return () => unsubscribe();
  }, []);

  // --- Real-time Live Votes ---
  useEffect(() => {
    const votesRef = collection(db, 'votes');
    const q = query(votesRef, orderBy('timestamp', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => { 
      setLiveVotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Vote[]); 
    }, (error) => {
      console.warn("Live votes fetch error:", error);
    });
    return () => unsubscribe();
  }, []);

  // --- Real-time Users List (admin only) ---
  useEffect(() => {
    if (role === 'ADMIN' && currentUser) {
      const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
        const users = snapshot.docs.map(doc => doc.data() as User);
        setUsersList(users);
        const today = new Date().toISOString().split('T')[0];
        const activeToday = users.filter(u => u.lastLoginDate === today).length;
        setLiveStats(prev => ({ ...prev, activeNow: activeToday || 1, newUsersToday: users.filter(u => u.lastLoginDate === today).length }));
      }, (error) => {
        console.warn("Users list fetch error:", error);
      });
      const unsubscribePostsCount = onSnapshot(collection(db, 'posts'), (snapshot) => { 
        setLiveStats(prev => ({ ...prev, votesToday: snapshot.size })); 
      }, (error) => {
        console.warn("Posts count fetch error:", error);
      });
      return () => { unsubscribeUsers(); unsubscribePostsCount(); };
    }
  }, [role, currentUser]);

  // --- Real-time quiz history for admin ---
  useEffect(() => {
    if (!currentUser || role !== 'ADMIN') return;
    const q = query(collection(db, 'quiz_results'), orderBy('date', 'desc'), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => { 
      setAdminQuizHistory(snapshot.docs.map(doc => doc.data())); 
    }, (error) => {
      console.warn("Quiz history fetch error:", error);
    });
    return () => unsubscribe();
  }, [currentUser, role]);

  // --- Real-time feedbacks for admin ---
  useEffect(() => {
    if (role === 'ADMIN') {
      const q = collection(db, 'feedbacks');
      const unsubFeedbacks = onSnapshot(q, (snapshot) => {
        const fbs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feedback));
        // Sort manually to ensure BOTH existing and new feedback appear correctly
        fbs.sort((a, b) => {
          const tA = (a.timestamp?.seconds || (new Date(a.date).getTime() / 1000) || Date.now() / 1000);
          const tB = (b.timestamp?.seconds || (new Date(b.date).getTime() / 1000) || Date.now() / 1000);
          return tB - tA;
        });
        setFeedbacks(fbs); 
      }, (error) => {
        console.warn("Feedbacks fetch error:", error);
      });
      return () => unsubFeedbacks();
    }
  }, [role]);

  // --- Real-time user's own posts ---
  useEffect(() => {
    if (!currentUser || role === 'ADMIN') return;
    const q = query(collection(db, 'posts'), where('username', '==', currentUser.username), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => { 
      setMyPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); 
    }, (error) => {
      console.warn("My posts fetch error:", error);
    });
    return () => unsubscribe();
  }, [currentUser, role]);

  // --- Real-time all posts for admin ---
  useEffect(() => {
    if (role !== 'ADMIN') return;
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => { 
      setAllPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); 
    }, (error) => {
      console.warn("All posts fetch error:", error);
    });
    return () => unsubscribe();
  }, [role]);

  // --- Helper functions ---
  const handleCheckStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newCount = streakData.count;
    let currentFreeze = currentUser?.streakFreezeCount || 0;
    if (streakData.lastLogin === yesterday) newCount += 1;
    else if (streakData.lastLogin !== today && streakData.lastLogin !== '') {
      if (currentFreeze > 0) { currentFreeze -= 1; }
      else newCount = 1;
    }
    setStreakData({ count: newCount, lastLogin: today });
    setHasCheckedToday(true);
    if (currentUser) {
      const updatedUser = { ...currentUser, streak: newCount, lastLoginDate: today, streakFreezeCount: currentFreeze };
      localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // SYNC TO FIRESTORE
      const docId = updatedUser.username.replace('@', '');
      updateDoc(doc(db, 'users', docId), {
        streak: newCount,
        lastLoginDate: today,
        streakFreezeCount: currentFreeze
      }).catch(err => console.error("Streak sync error:", err));
    }
    const phrases = ["Luar biasa! Pertahankan semangat literasi politikmu! 🔥", "Satu hari lagi lebih cerdas. Sampai jumpa besok, Pejuang Demokrasi! 🇮🇩", "Semangatmu membara! Jangan biarkan apinya padam besok ya!", "Keren! Konsistensi adalah kunci perubahan besar. Besok lanjut lagi!", "Kamu sudah lebih paham politik hari ini. Besok kita ulas materi baru!", "Jangan kasih kendor! Masa depan bangsa ada di tangan pemilih cerdas seperti kamu.", "Streak bertambah, wawasan meluas! Sampai ketemu di level berikutnya besok!"];
    setMotivation(phrases[Math.floor(Math.random() * phrases.length)]);
    setShowCinematic(true);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 1000);
  };

  const handleBuyFreeze = async () => {
    if (currentUser && (currentUser.coins || 0) >= 50) {
      const newCoins = (currentUser.coins || 0) - 50;
      const newFreeze = (currentUser.streakFreezeCount || 0) + 1;
      const updatedUser = { ...currentUser, coins: newCoins, streakFreezeCount: newFreeze };
      
      // Update state and local storage
      localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // Sync to Firestore
      try {
        const docId = updatedUser.username.replace('@', '');
        await updateDoc(doc(db, 'users', docId), {
          coins: newCoins,
          streakFreezeCount: newFreeze
        });
        alert("Streak Freeze berhasil dibeli! 🪙50 koin telah dipotong.");
      } catch (error) {
        console.error("Error buying freeze:", error);
        handleFirestoreError(error, OperationType.UPDATE, `users/${updatedUser.username}`);
      }
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
      setIsConfirmOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${postId}`);
    }
  };

  const handleRemoveUser = async (usernameToRemove: string) => {
    try {
      await deleteDoc(doc(db, 'users', usernameToRemove.replace('@', '')));
      setIsConfirmOpen(false);
      alert("User berhasil dihapus.");
    } catch (error) { console.error(error); alert("Gagal menghapus user."); }
  };

  const handleClearAllPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      const batch = writeBatch(db);
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      setIsConfirmOpen(false);
      alert("Semua postingan berhasil dihapus.");
    } catch (error) { console.error(error); alert("Gagal menghapus semua postingan."); }
  };

  const learningProgress = useMemo(() => {
    if (!currentUser) return { percent: 0, completed: 0, total: 4 };
    const progress = currentUser.progress || {};
    const completed = Object.keys(progress).length;
    return { percent: Math.round((completed / 4) * 100), completed, total: 4, details: progress };
  }, [currentUser]);

  const quizHistory = useMemo(() => (role === 'USER' ? currentUser?.quizHistory || [] : adminQuizHistory), [role, currentUser?.quizHistory, adminQuizHistory]);

  const reportCard = useMemo(() => {
    if (!currentUser || currentUser.role === 'ADMIN') return null;
    const totalQuizzes = quizHistory.length;
    const avgScore = totalQuizzes > 0 ? quizHistory.reduce((acc: number, curr: any) => acc + curr.score, 0) / totalQuizzes : 0;
    let strength = 'Pemula', weakness = 'Belum Terdeteksi', suggestion = 'Selesaikan kuis pertama kamu untuk mendapatkan analisis.';
    if (totalQuizzes > 0) {
      if (avgScore >= 90) { strength = 'Negarawan Muda'; weakness = 'Tantangan Global'; suggestion = 'Luar biasa! Kamu memiliki pemahaman yang sangat tajam. Coba tantang dirimu dengan topik geopolitik internasional.'; }
      else if (avgScore >= 75) { strength = 'Analisis Kebijakan'; weakness = 'Detail Konstitusi'; suggestion = 'Kamu sudah sangat baik! Coba pelajari lebih dalam tentang sejarah amandemen UUD 1945.'; }
      else if (avgScore >= 50) { strength = 'Pemahaman Dasar'; weakness = 'Lembaga Negara'; suggestion = 'Bagus! Fokuskan belajarmu pada pembagian kekuasaan Eksekutif, Legislatif, dan Yudikatif.'; }
      else { strength = 'Semangat Belajar'; weakness = 'Konsep Politik'; suggestion = 'Jangan menyerah! Ulangi materi "Dasar Politik" untuk memperkuat fondasi pemahamanmu.'; }
    }
    return { totalQuizzes, avgScore: avgScore.toFixed(1), strength, weakness, suggestion };
  }, [currentUser, quizHistory]);

  if (!currentUser) return null;

  const displayName = currentUser.displayName || username;
  const level = currentUser.level || 1;
  const currentExp = currentUser.currentExp || 0;
  const expNeeded = level * 100;
  const expPercent = Math.min(100, (currentExp / expNeeded) * 100);

  const renderAvatar = () => {
    return (
      <div className="w-24 h-24 bg-red-600/10 rounded-3xl overflow-hidden border-2 border-red-600/20 shadow-xl relative group">
        <DashboardAvatar2D username={currentUser.username} config={currentUser.avatarConfig} />
        {role === 'ADMIN' && <div className="absolute top-1 right-1"><Shield size={12} className="text-red-600" /></div>}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-red-600">Dashboard {role === 'ADMIN' ? 'Admin' : 'User'}</h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Selamat datang kembali, <span className="text-red-600 font-black">{username}</span>.</p>
        </div>
        {role === 'ADMIN' ? (
          <div className="flex items-center gap-4">
            <button onClick={() => setIsVoxStudioEnabled(!isVoxStudioEnabled)} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase transition-all border-2 ${isVoxStudioEnabled ? 'bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-100'}`}><Sparkles size={16} className={isVoxStudioEnabled ? 'animate-spin' : ''} /> Vox-Studio {isVoxStudioEnabled ? 'ON' : 'OFF'}</button>
            <button onClick={() => { logout(); onLogout(); }} className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-red-600 transition-all"><LogOut size={16} /> Logout</button>
          </div>
        ) : (
          <button onClick={() => { logout(); onLogout(); }} className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-red-600 transition-all"><LogOut size={16} /> Logout</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN (Sama seperti asli, tidak ada perubahan berarti) */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-6 mb-8">
                  {renderAvatar()}
                  <div>
                    <h3 className="text-2xl font-black uppercase italic">{displayName}</h3>
                    {currentUser.voxTitle && <p className="text-[10px] font-black uppercase text-red-600 tracking-[0.2em] mb-1">{currentUser.voxTitle}</p>}
                    <div className="flex items-center gap-2"><span className="text-[10px] font-black uppercase tracking-widest opacity-50">{username}</span><span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{role}</span></div>
                    {role === 'USER' && <button onClick={() => (window as any).openAvatarLab()} className="mt-2 text-[10px] font-black uppercase text-red-600 hover:underline">Ganti Avatar →</button>}
                  </div>
                </div>
            <div className="space-y-4">
              {role === 'USER' && (
                <div className="p-4 rounded-2xl bg-black/5 space-y-2">
                  <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-widest opacity-50">EXP Progress</span><span className="text-[10px] font-black uppercase text-red-600">{currentExp} / {expNeeded}</span></div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${expPercent}%` }} className="h-full bg-red-600" /></div>
                </div>
              )}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5"><div className="flex items-center gap-3"><Coins size={18} className="text-yellow-500" /><span className="text-xs font-bold uppercase">Koin Saya</span></div><span className="text-xs font-black uppercase text-yellow-500">{currentUser.coins || 0} Koin</span></div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5"><div className="flex items-center gap-3"><Snowflake size={18} className="text-blue-400" /><span className="text-xs font-bold uppercase">Streak Freeze</span></div><span className="text-xs font-black uppercase text-blue-400">{currentUser.streakFreezeCount || 0} Tersedia</span></div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5"><div className="flex items-center gap-3"><Award size={18} className="text-red-600" /><span className="text-xs font-bold uppercase">Level Literasi</span></div><span className="text-xs font-black uppercase">{role === 'ADMIN' ? 'Super Admin' : learningProgress.percent === 100 ? 'Pakar Muda' : 'Warga Aktif'}</span></div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5"><div className="flex items-center gap-3"><TrendingUp size={18} className="text-red-600" /><span className="text-xs font-bold uppercase">Status</span></div><span className="text-xs font-black uppercase text-green-500">Online</span></div>
              {role === 'USER' && (
                <>
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-red-600/10 border border-red-600/20"><div className="flex items-center gap-3"><motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Flame size={20} className="text-red-600" /></motion.div><span className="text-xs font-bold uppercase">Streak</span></div><span className="text-xs font-black uppercase text-red-600">{streakData.count} Hari</span></div>
                  <div className="pt-4 border-t border-black/5 dark:border-white/5"><button onClick={() => { setShowDeleteConfirm({ id: currentUser.username, type: 'my_account' }); setIsConfirmOpen(true); }} className="w-full py-3 rounded-xl bg-red-600/10 text-red-600 font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Hapus Akun Saya</button></div>
                </>
              )}
            </div>
          </motion.div>

          {role === 'USER' && (
            <>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={`p-8 rounded-[2.5rem] border overflow-hidden relative ${isDarkMode ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-6 relative z-10"><Sparkles size={20} className="text-yellow-500" /><h4 className="text-xs font-black uppercase tracking-widest">Aktivitas Harian</h4></div>
                <StreakFire count={streakData.count} isPopping={isPopping} />
                <button onClick={handleCheckStreak} disabled={hasCheckedToday} className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg relative z-10 ${hasCheckedToday ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20'}`}>{hasCheckedToday ? 'Streak Secured!' : 'Cek Streak Hari Ini'}</button>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-6"><BookOpen size={20} className="text-red-600" /><h4 className="text-xs font-black uppercase tracking-widest">Progress Belajar</h4></div>
                <div className="space-y-4">
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${learningProgress.percent}%` }} className="h-full bg-red-600" /></div>
                  <p className="text-[10px] font-bold uppercase opacity-50">{learningProgress.percent}% Materi Selesai</p>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['politik'] !== undefined ? '' : 'opacity-30'}`}>{learningProgress.details['politik'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}<span>Dasar Politik</span></div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['demokrasi'] !== undefined ? '' : 'opacity-30'}`}>{learningProgress.details['demokrasi'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}<span>Sistem Demokrasi</span></div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['cabang'] !== undefined ? '' : 'opacity-30'}`}>{learningProgress.details['cabang'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}<span>Tujuan & Fungsi</span></div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['memilih'] !== undefined ? '' : 'opacity-30'}`}>{learningProgress.details['memilih'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}<span>Urgensi Memilih</span></div>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-6"><Sparkles size={20} className="text-yellow-500" /><h4 className="text-xs font-black uppercase tracking-widest">Daily Shop</h4></div>
                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-between mb-4"><div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center"><Snowflake className="text-blue-400" /></div><div><p className="text-sm font-black uppercase">Streak Freeze</p><p className="text-[10px] font-bold text-blue-400 uppercase">50 Koin</p></div></div><button onClick={handleBuyFreeze} disabled={(currentUser.coins || 0) < 50} className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all ${(currentUser.coins || 0) >= 50 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>Beli</button></div>
                <p className="text-[10px] font-medium opacity-50 italic">Gunakan Streak Freeze untuk menyelamatkan streak-mu jika lupa login sehari!</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-6"><AlertCircle size={20} className="text-red-600" /><h4 className="text-xs font-black uppercase tracking-widest">Analisis Nilai</h4></div>
                <p className="text-xs font-medium italic mb-4">"{reportCard?.suggestion}"</p>
                <button 
                  onClick={() => (window as any).setActiveSection('basics')}
                  className="text-[10px] font-black uppercase text-red-600 hover:underline"
                >
                  Pelajari Sekarang →
                </button>
              </motion.div>
              <LiveVotes votes={liveVotes} totalVotes={globalStats.totalVotes} isDarkMode={isDarkMode} />
            </>
          )}
        </div>

        {/* RIGHT COLUMN (HANYA OVERVIEW, TANPA TAB TEMAN) */}
        <div className="lg:col-span-2 space-y-8">
          {role === 'USER' ? (
            // TAMPILAN USER
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-8"><Award size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Rapor Literasi</h3></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-black/5"><p className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Kuis</p><p className="text-2xl font-black text-red-600">{reportCard?.totalQuizzes}</p></div>
                  <div className="p-4 rounded-2xl bg-black/5"><p className="text-[10px] font-bold uppercase opacity-50 mb-1">Rata-rata</p><p className="text-2xl font-black text-red-600">{reportCard?.avgScore}</p></div>
                  <div className="p-4 rounded-2xl bg-black/5"><p className="text-[10px] font-bold uppercase opacity-50 mb-1">Kekuatan</p><p className="text-xs font-black uppercase">{reportCard?.strength}</p></div>
                  <div className="p-4 rounded-2xl bg-black/5"><p className="text-[10px] font-bold uppercase opacity-50 mb-1">Kelemahan</p><p className="text-xs font-black uppercase">{reportCard?.weakness}</p></div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-8"><Award size={24} className="text-yellow-500" /><h3 className="text-2xl font-black uppercase italic">Pencapaian</h3></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentUser?.achievements && currentUser.achievements.length > 0 ? currentUser.achievements.map((ach) => (
                    <div key={ach.id} className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-4"><div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shrink-0"><Award size={20} className="text-black" /></div><div><p className="text-[10px] font-black uppercase leading-tight">{ach.title}</p><p className="text-[8px] font-bold opacity-50 uppercase">{new Date(ach.date).toLocaleDateString()}</p></div></div>
                  )) : <div className="col-span-full py-8 text-center border-2 border-dashed border-black/5 rounded-2xl"><p className="text-[10px] font-bold uppercase opacity-30 italic">Belum ada pencapaian. Teruslah belajar!</p></div>}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-3"><History size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Riwayat Kuis</h3></div><span className="text-[10px] font-black uppercase opacity-50">{quizHistory.length} Sesi Terakhir</span></div>
                <div className="space-y-4">
                  {quizHistory.length > 0 ? quizHistory.map((quiz: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-black/5 border border-transparent hover:border-red-600/20 transition-all">
                      <div className="flex items-center gap-4"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quiz.score >= 70 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{quiz.score >= 70 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}</div><div><p className="text-sm font-black uppercase">{quiz.topic || quiz.category || 'Pengetahuan Umum'}</p><p className="text-[10px] font-bold opacity-50 uppercase">{new Date(quiz.date).toLocaleDateString()}</p></div></div>
                      <div className="text-right"><p className="text-lg font-black text-red-600">{quiz.score}</p><p className="text-[8px] font-black uppercase opacity-50">Skor</p></div>
                    </div>
                  )) : <div className="py-12 text-center"><p className="text-xs font-bold uppercase opacity-30 italic">Belum ada riwayat kuis.</p></div>}
                </div>
              </motion.div>

              {/* VoxCircle Saya (user hanya bisa hapus postingan sendiri) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center gap-3 mb-8"><MessageSquare size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">VoxCircle Saya</h3></div>
                <div className="space-y-4">
                  {myPosts.length > 0 ? myPosts.map((post: any) => (
                    <div key={post.id} className="p-4 rounded-2xl bg-black/5 flex justify-between items-start">
                      <div className="flex-1"><p className="text-sm font-medium mb-2 line-clamp-2">{post.content}</p><div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-50"><span>{post.likes?.length || 0} Suka</span><span>{post.comments?.length || 0} Komentar</span><span>{post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString('id-ID') : 'Baru saja'}</span></div></div>
                      <button onClick={() => { setShowDeleteConfirm({ id: post.id, type: 'post' }); setIsConfirmOpen(true); }} className="p-2 rounded-xl text-zinc-400 hover:bg-red-600 hover:text-white transition-all" title="Hapus Postingan"><Trash2 size={14} /></button>
                    </div>
                  )) : <div className="py-8 text-center"><p className="text-xs font-bold uppercase opacity-30 italic">Kamu belum membagikan pemikiran di VoxCircle.</p></div>}
                </div>
              </motion.div>
            </div>
          ) : (
            // TAMPILAN ADMIN
            <div className="space-y-8">
              <AdminStatsPlatform stats={globalStats} liveStats={liveStats} isDarkMode={isDarkMode} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Daftar Pengguna */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                  <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-3"><Users size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Daftar Pengguna</h3></div><div className="flex items-center gap-4"><button onClick={handleClearAllPosts} className="px-4 py-2 bg-red-600/10 text-red-600 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all">Reset VoxCircle</button><span className="text-[10px] font-black uppercase opacity-50">{usersList.length} Total</span></div></div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {usersList.map((user) => (
                      <div key={user.username} className="flex items-center justify-between p-4 rounded-2xl bg-black/5">
                        <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 font-black uppercase">{user.username.charAt(0)}</div><div><p className="text-sm font-black uppercase">{user.username}</p><p className="text-[8px] font-bold opacity-50 uppercase">{user.role}</p></div></div>
                        {user.role !== 'ADMIN' && <button onClick={() => handleRemoveUser(user.username)} className="p-2 text-zinc-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Feedback Pengguna */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                  <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-3"><MessageSquare size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Feedback Pengguna</h3></div><span className="text-[10px] font-black uppercase opacity-50">{feedbacks.length} Pesan</span></div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {feedbacks.map((fb) => (
                      <div key={fb.id} className={`p-4 rounded-2xl border transition-all ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-white border-black/5 shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-red-600/10 flex items-center justify-center text-[8px] font-black text-red-600 uppercase">
                              {(fb as any).displayName?.charAt(0) || fb.username.charAt(0)}
                            </div>
                            <div>
                              <p className="text-[10px] font-black uppercase text-red-600">{(fb as any).displayName || fb.username}</p>
                              <p className="text-[8px] font-bold opacity-30 uppercase">@{fb.username}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] font-bold opacity-50 uppercase">{fb.date}</p>
                            <p className="text-[8px] font-black text-red-600 uppercase">{(fb as any).time || 'Baru'}</p>
                          </div>
                        </div>
                        <p className="text-xs font-medium italic leading-relaxed">"{fb.message}"</p>
                      </div>
                    ))}
                    {feedbacks.length === 0 && (
                      <div className="py-12 text-center opacity-30 italic">
                        <MessageSquare size={32} className="mx-auto mb-4 opacity-20" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Belum ada feedback masuk.</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* SEMUA POSTINGAN VOXCIRCLE (ADMIN BISA HAPUS SEMUA) */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-3"><MessageSquare size={24} className="text-red-600" /><h3 className="text-2xl font-black uppercase italic">Semua Postingan VoxCircle</h3></div><span className="text-[10px] font-black uppercase opacity-50">{allPosts.length} Postingan</span></div>
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {allPosts.length > 0 ? allPosts.map((post) => (
                    <div key={post.id} className="p-4 rounded-2xl bg-black/5 flex justify-between items-start">
                      <div className="flex-1"><div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-black uppercase text-red-600">@{post.username}</span><span className="text-[8px] font-bold opacity-50 uppercase">{post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString('id-ID') : 'Baru saja'}</span></div><p className="text-sm font-medium mb-2 line-clamp-2">{post.content}</p><div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-50"><span>{post.likes?.length || 0} Suka</span><span>{post.comments?.length || 0} Komentar</span></div></div>
                      <button onClick={() => { setShowDeleteConfirm({ id: post.id, type: 'post' }); setIsConfirmOpen(true); }} className="p-2 rounded-xl text-zinc-400 hover:bg-red-600 hover:text-white transition-all" title="Hapus Postingan (Admin)"><Trash2 size={14} /></button>
                    </div>
                  )) : <div className="py-8 text-center"><p className="text-xs font-bold uppercase opacity-30 italic">Belum ada postingan di VoxCircle.</p></div>}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Cinematic Streak Overlay */}
      <AnimatePresence>{showCinematic && <CinematicStreakOverlay count={streakData.count} motivation={motivation} onClose={() => setShowCinematic(false)} />}</AnimatePresence>

      {/* Admin Edit Button */}
      {role === 'ADMIN' && (
        <div className="mt-20 flex flex-col items-center gap-6 p-12 rounded-[3rem] border-4 border-dashed border-red-600/30 bg-red-600/5">
          <div className="text-center"><h3 className="text-3xl font-black uppercase italic text-red-600 mb-2">Admin Control Center</h3><p className="text-sm font-bold opacity-50 uppercase tracking-widest">Aktifkan mode edit untuk memodifikasi konten secara inline</p></div>
          <div className="flex gap-4">
            <button onClick={() => setIsEditMode(!isEditMode)} className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl flex items-center gap-3 ${isEditMode ? 'bg-red-600 text-white shadow-red-600/40 scale-105' : 'bg-zinc-900 text-white hover:bg-red-600'}`}><Sparkles size={20} className={isEditMode ? 'animate-spin' : ''} />{isEditMode ? 'Matikan Mode Edit' : 'Edit Dashboard'}</button>
            {isEditMode && <button onClick={() => { setIsEditMode(false); alert('Perubahan telah disimpan secara real-time!'); }} className="px-12 py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-2xl">Simpan / OK</button>}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isConfirmOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsConfirmOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className={`relative w-full max-w-md p-8 rounded-[2.5rem] border transition-all ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5 shadow-2xl'}`}>
              <h3 className="text-xl font-black uppercase italic mb-4 text-red-600">Konfirmasi Hapus</h3>
              <p className="opacity-60 mb-8 text-sm font-medium">
                {showDeleteConfirm.type === 'post' && "Apakah Anda yakin ingin menghapus postingan ini?"}
                {showDeleteConfirm.type === 'user' && `Apakah Anda yakin ingin menghapus user "${showDeleteConfirm.id}"? Semua data kuis dan progres akan hilang.`}
                {showDeleteConfirm.type === 'all_posts' && "PERINGATAN: Ini akan menghapus SEMUA postingan di VoxCircle secara global. Lanjutkan?"}
                {showDeleteConfirm.type === 'my_account' && "PERINGATAN: Ini akan menghapus akun Anda secara permanen beserta seluruh data kuis, progres, dan postingan. Anda akan langsung logout."}
              </p>
              <div className="flex gap-4">
                <button onClick={() => setIsConfirmOpen(false)} className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-zinc-100 hover:bg-zinc-200'}`}>Batal</button>
                <button onClick={async () => {
                  if (showDeleteConfirm.type === 'post') handleDeletePost(showDeleteConfirm.id);
                  else if (showDeleteConfirm.type === 'user') handleRemoveUser(showDeleteConfirm.id);
                  else if (showDeleteConfirm.type === 'all_posts') handleClearAllPosts();
                  else if (showDeleteConfirm.type === 'my_account') {
                    try { await deleteAccount(showDeleteConfirm.id); logout(); onLogout(); } catch (error) { console.error(error); alert("Gagal menghapus akun. Silakan coba lagi."); }
                  }
                }} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">Ya, Hapus</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;