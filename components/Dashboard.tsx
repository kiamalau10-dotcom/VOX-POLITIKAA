import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, History, TrendingUp, MessageSquare, Users, Award, LogOut, Flame, BookOpen, CheckCircle2, AlertCircle, Sparkles, Trash2, Coins, Snowflake } from 'lucide-react';
import { User, Feedback } from '../types';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useCMS } from './CMSContext';

import { 
  db, 
  collection, 
  onSnapshot, 
  doc, 
  deleteDoc, 
  getDocs,
  writeBatch,
  OperationType,
  handleFirestoreError
} from '../firebase';

const StreakFire: React.FC<{ count: number; isPopping: boolean }> = ({ count, isPopping }) => {
  return (
    <div className="relative flex flex-col items-center justify-center py-6">
      <motion.div
        animate={isPopping ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-orange-500/40 blur-3xl rounded-full scale-150" />
        
        {/* Fire SVG */}
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
          transition={{ 
            repeat: Infinity, 
            duration: 0.8,
            ease: "easeInOut"
          }}
          className="relative z-10 drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]"
        >
          <defs>
            <linearGradient id="fireGradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FACC15" /> {/* Yellow-400 */}
              <stop offset="50%" stopColor="#F97316" /> {/* Orange-500 */}
              <stop offset="100%" stopColor="#DC2626" /> {/* Red-600 */}
            </linearGradient>
          </defs>
          <path
            d="M50 120C77.6142 120 100 97.6142 100 70C100 42.3858 80 10 50 0C20 10 0 42.3858 0 70C0 97.6142 22.3858 120 50 120Z"
            fill="url(#fireGradient)"
          />
          <path
            d="M50 100C66.5685 100 80 86.5685 80 70C80 53.4315 70 30 50 20C30 30 20 53.4315 20 70C20 86.5685 33.4315 100 50 100Z"
            fill="#FACC15"
            opacity="0.6"
          />
        </motion.svg>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center"
      >
        <span className="text-4xl font-black italic uppercase text-red-600 drop-shadow-sm">
          {count} Hari Streak!
        </span>
      </motion.div>
    </div>
  );
};

const CinematicStreakOverlay: React.FC<{ 
  count: number; 
  motivation: string; 
  onClose: () => void 
}> = ({ count, motivation, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="text-center max-w-2xl"
      >
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-600/30 blur-[100px] rounded-full scale-150 animate-pulse" />
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut"
            }}
            className="text-9xl relative z-10 drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]"
          >
            🔥
          </motion.div>
        </div>
        
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-black italic uppercase text-white mb-4 tracking-tighter"
        >
          {count} Hari!
        </motion.h2>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-bold text-red-500 mb-12 uppercase tracking-widest leading-relaxed"
        >
          {motivation}
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={onClose}
          className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95"
        >
          Lanjutkan Perjuangan
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const DashboardAvatar2D = ({ username, costumeId }: { username: string, costumeId: string }) => {
  // Use DiceBear Adventurer for a 2D anime/animated look
  const avatarUrl = costumeId === 'none' 
    ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&backgroundColor=f8fafc,f1f5f9&radius=20`
    : costumeId;

  return (
    <div className="w-full h-full p-2 bg-gradient-to-br from-red-50 to-red-100 dark:from-zinc-800 dark:to-zinc-900 relative">
      <motion.img
        key={avatarUrl}
        src={avatarUrl}
        alt="Avatar"
        className="w-full h-full object-contain drop-shadow-xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
        }}
      />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900 animate-pulse" />
    </div>
  );
};

const AvatarSelector: React.FC<{ 
  currentUser: User; 
  onSelect: (avatarId: string, price: number) => void;
  isDarkMode: boolean;
}> = ({ currentUser, onSelect, isDarkMode }) => {
  const avatars = [
    { id: 'none', label: 'Rakyat Biasa', type: 'FREE', url: `https://api.dicebear.com/9.x/adventurer/svg?seed=${currentUser.username}&backgroundColor=f8fafc,f1f5f9&radius=20` },
    { id: 'presiden-kesayangan', label: 'Presiden Kesayangan', type: 'FREE', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Felix&radius=20' },
    { id: 'menteri-cinta', label: 'Menteri Cinta', type: 'FREE', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka&radius=20' },
    { id: 'gubernur-love', label: 'Gubernur Love', type: 'FREE', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Mimi&radius=20' },
    { id: 'duta-besar-galau', label: 'Duta Besar Galau', type: 'FREE', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jasper&radius=20' },
    { id: 'camat-perhatian', label: 'Camat Perhatian', type: 'FREE', url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Luna&radius=20' },
    { id: 'lurah-estetik', label: 'Lurah Estetik', type: 'PREMIUM', price: 150, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Oliver&radius=20' },
    { id: 'staf-ahli-rindu', label: 'Staf Ahli Rindu', type: 'PREMIUM', price: 200, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Jack&radius=20' },
    { id: 'walikota-chill', label: 'Walikota Chill', type: 'PREMIUM', price: 250, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Zoe&radius=20' },
    { id: 'bupati-skena', label: 'Bupati Skena', type: 'PREMIUM', price: 300, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Leo&radius=20' },
    { id: 'diplomat-senja', label: 'Diplomat Senja', type: 'PREMIUM', price: 350, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Maya&radius=20' },
    { id: 'konsul-hati', label: 'Konsul Hati', type: 'PREMIUM', price: 400, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Toby&radius=20' },
    { id: 'atase-curhat', label: 'Atase Curhat', type: 'PREMIUM', price: 450, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ruby&radius=20' },
    { id: 'sekjen-healing', label: 'Sekjen Healing', type: 'PREMIUM', price: 500, url: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Finn&radius=20' },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
      {avatars.map((avatar) => (
        <button
          key={avatar.id}
          onClick={() => onSelect(avatar.url, avatar.price || 0)}
          className={`relative group p-3 rounded-3xl border-2 transition-all duration-300 ${
            currentUser.equippedCostumeId === avatar.url 
              ? 'border-red-600 bg-red-600/10 scale-95' 
              : isDarkMode ? 'border-white/10 hover:border-white/30 hover:bg-white/5' : 'border-black/5 hover:border-black/20 hover:bg-black/5'
          }`}
        >
          <div className="aspect-square mb-3 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
            <img 
              src={avatar.url} 
              alt={avatar.label} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${avatar.label}`;
              }}
            />
          </div>
          <div className="text-[9px] font-black uppercase text-center leading-tight mb-1 truncate">
            {avatar.label}
          </div>
          <div className={`text-[7px] font-black uppercase text-center tracking-widest ${avatar.type === 'FREE' ? 'text-green-500' : 'text-yellow-500'}`}>
            {avatar.type === 'FREE' ? 'GRATIS' : `${avatar.price} KOIN`}
          </div>
          {currentUser.equippedCostumeId === avatar.url && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg">
              <CheckCircle2 size={12} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

const Dashboard: React.FC<{ 
  isDarkMode: boolean, 
  currentUser: User | null,
  onLogout: () => void
}> = ({ isDarkMode, currentUser, onLogout }) => {
  const { isEditMode, setIsEditMode } = useCMS();
  const role = currentUser?.role;
  const username = currentUser?.username;

  const [activeTab, setActiveTab] = useState<'overview' | 'friends'>('overview');
  const [friendTab, setFriendTab] = useState<'followers' | 'following'>('followers');

  // --- STREAK LOGIC ---
  const [streakData, setStreakData] = useState(() => {
    if (!currentUser) return { count: 1, lastLogin: '' };
    return { count: currentUser.streak || 1, lastLogin: currentUser.lastLoginDate || '' };
  });

  const [isPopping, setIsPopping] = useState(false);
  const [motivation, setMotivation] = useState('');
  const [showCinematic, setShowCinematic] = useState(false);
  const [coins, setCoins] = useState(currentUser?.coins || 0);
  const [freezeCount, setFreezeCount] = useState(currentUser?.streakFreezeCount || 0);
  const [hasCheckedToday, setHasCheckedToday] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return currentUser?.lastLoginDate === today;
  });

  const handleCheckStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];
    
    let newCount = streakData.count;
    let currentFreeze = freezeCount;
    
    if (streakData.lastLogin === yesterday) {
      newCount += 1;
    } else if (streakData.lastLogin !== today && streakData.lastLogin !== '') {
      // Gap > 1 day
      if (currentFreeze > 0) {
        currentFreeze -= 1;
        setFreezeCount(currentFreeze);
        // Streak is preserved
      } else {
        newCount = 1;
      }
    }

    const newData = { count: newCount, lastLogin: today };
    setStreakData(newData);
    setHasCheckedToday(true);
    
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        streak: newCount, 
        lastLoginDate: today,
        streakFreezeCount: currentFreeze
      };
      localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    // Cinematic Animation & Motivation
    const phrases = [
      "Luar biasa! Pertahankan semangat literasi politikmu! 🔥",
      "Satu hari lagi lebih cerdas. Sampai jumpa besok, Pejuang Demokrasi! 🇮🇩",
      "Semangatmu membara! Jangan biarkan apinya padam besok ya!",
      "Keren! Konsistensi adalah kunci perubahan besar. Besok lanjut lagi!",
      "Kamu sudah lebih paham politik hari ini. Besok kita ulas materi baru!",
      "Jangan kasih kendor! Masa depan bangsa ada di tangan pemilih cerdas seperti kamu.",
      "Streak bertambah, wawasan meluas! Sampai ketemu di level berikutnya besok!"
    ];
    
    setMotivation(phrases[Math.floor(Math.random() * phrases.length)]);
    setShowCinematic(true);
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 1000);
  };

  const handleBuyFreeze = () => {
    if (coins >= 50 && currentUser) {
      const newCoins = coins - 50;
      const newFreeze = freezeCount + 1;
      setCoins(newCoins);
      setFreezeCount(newFreeze);
      
      const updatedUser = { 
        ...currentUser, 
        coins: newCoins, 
        streakFreezeCount: newFreeze 
      };
      localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  const [quizHistory] = useState(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'ADMIN') {
      return JSON.parse(localStorage.getItem('all_quiz_results') || '[]');
    }
    return currentUser.quizHistory || [];
  });
  
  const [feedbacks] = useState<Feedback[]>(() => {
    const saved = localStorage.getItem('all_feedbacks');
    return saved ? JSON.parse(saved) : [
      { id: '1', username: 'Sistem', message: 'Selamat datang di dashboard VoxPolitika 2026.', date: '2026-01-01' },
    ];
  });

  const [usersList, setUsersList] = useState<User[]>([]);
  const [liveStats, setLiveStats] = useState({ activeNow: 0, votesToday: 0, newUsersToday: 0 });

  // Dynamic Usage Data for Admin Graphs
  const usageData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const currentMonth = new Date().getMonth();
    const data = [];
    
    // Base growth simulation (Deterministic for purity)
    for (let i = 0; i <= currentMonth; i++) {
      const baseUsers = 100 + (i * 150);
      // Use a deterministic "fluctuation" based on index i
      const fluctuation = (i * 13) % 50;
      data.push({ 
        name: months[i], 
        users: usersList.length > 0 ? Math.max(baseUsers, usersList.length * 10 + fluctuation) : baseUsers 
      });
    }
    return data;
  }, [usersList.length]);

  // Real-time Users List and Stats
  useEffect(() => {
    if (role === 'ADMIN' && currentUser) {
      const usersPath = 'users';
      const unsubscribeUsers = onSnapshot(collection(db, usersPath), (snapshot) => {
        const users = snapshot.docs.map(doc => doc.data() as User);
        setUsersList(users);
        
        // Calculate stats
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        const newUsers = users.filter(u => u.lastLoginDate === today).length;
        
        setLiveStats(prev => ({
          ...prev,
          activeNow: Math.floor(users.length * 0.3) + 1, // Simulated active users based on total
          newUsersToday: newUsers
        }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, usersPath);
      });

      const postsPath = 'posts';
      const unsubscribePosts = onSnapshot(collection(db, postsPath), (snapshot) => {
        setLiveStats(prev => ({
          ...prev,
          votesToday: snapshot.size
        }));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, postsPath);
      });

      return () => {
        unsubscribeUsers();
        unsubscribePosts();
      };
    }
  }, [role, currentUser]);

  const handleRemoveUser = async (usernameToRemove: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user "${usernameToRemove}"? Semua data kuis dan progres akan hilang.`)) {
      try {
        const docId = usernameToRemove.replace('@', '');
        await deleteDoc(doc(db, 'users', docId));
        alert("User berhasil dihapus.");
      } catch (error) {
        console.error("Error removing user: ", error);
        alert("Gagal menghapus user.");
      }
    }
  };

  const handleClearAllPosts = async () => {
    if (window.confirm("PERINGATAN: Ini akan menghapus SEMUA postingan di VoxCircle secara global. Lanjutkan?")) {
      try {
        const snapshot = await getDocs(collection(db, 'posts'));
        const batch = writeBatch(db);
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        alert("Semua postingan telah dihapus.");
      } catch (error) {
        console.error("Error clearing posts: ", error);
        alert("Gagal menghapus postingan.");
      }
    }
  };

  const learningProgress = useMemo(() => {
    if (!currentUser) return { percent: 0, completed: 0, total: 4 };
    const progress = currentUser.progress || {};
    const completed = Object.keys(progress).length;
    const total = 4; // Sesuai jumlah modul di PoliticsBasics
    return {
      percent: Math.round((completed / total) * 100),
      completed,
      total,
      details: progress
    };
  }, [currentUser]);

  const reportCard = useMemo(() => {
    if (!currentUser || currentUser.role === 'ADMIN') return null;
    const totalQuizzes = quizHistory.length;
    const avgScore = totalQuizzes > 0 ? quizHistory.reduce((acc: number, curr: any) => acc + curr.score, 0) / totalQuizzes : 0;
    
    // Analisis mendalam berdasarkan performa
    let strength = 'Pemula';
    let weakness = 'Belum Terdeteksi';
    let suggestion = 'Selesaikan kuis pertama kamu untuk mendapatkan analisis.';

    if (totalQuizzes > 0) {
      if (avgScore >= 90) {
        strength = 'Negarawan Muda';
        weakness = 'Tantangan Global';
        suggestion = 'Luar biasa! Kamu memiliki pemahaman yang sangat tajam. Coba tantang dirimu dengan topik geopolitik internasional.';
      } else if (avgScore >= 75) {
        strength = 'Analisis Kebijakan';
        weakness = 'Detail Konstitusi';
        suggestion = 'Kamu sudah sangat baik! Coba pelajari lebih dalam tentang sejarah amandemen UUD 1945.';
      } else if (avgScore >= 50) {
        strength = 'Pemahaman Dasar';
        weakness = 'Lembaga Negara';
        suggestion = 'Bagus! Fokuskan belajarmu pada pembagian kekuasaan Eksekutif, Legislatif, dan Yudikatif.';
      } else {
        strength = 'Semangat Belajar';
        weakness = 'Konsep Politik';
        suggestion = 'Jangan menyerah! Ulangi materi "Dasar Politik" untuk memperkuat fondasi pemahamanmu.';
      }
    }
    
    return {
      totalQuizzes,
      avgScore: avgScore.toFixed(1),
      strength,
      weakness,
      suggestion
    };
  }, [currentUser, quizHistory]);

  const [isVoxStudioEnabled, setIsVoxStudioEnabled] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  
  const myPosts = useMemo(() => {
    const savedPosts = JSON.parse(localStorage.getItem('vox_circle_posts') || '[]');
    return savedPosts
      .map((p: any) => ({
        ...p,
        likes: Array.isArray(p.likes) ? p.likes : [],
        comments: Array.isArray(p.comments) ? p.comments : []
      }))
      .filter((p: any) => p.username === currentUser?.username);
  }, [currentUser?.username]);

  if (!currentUser) return null;

  const displayName = currentUser.displayName || username;
  const level = currentUser.level || 1;
  const currentExp = currentUser.currentExp || 0;
  const expNeeded = level * 100;
  const expPercent = Math.min(100, (currentExp / expNeeded) * 100);

  const handleSelectAvatar = (avatarId: string, price: number) => {
    if (!currentUser) return;
    
    if (price > coins) {
      alert('Koin tidak cukup!');
      return;
    }

    const newCoins = coins - price;
    setCoins(newCoins);
    
    const updatedUser = { 
      ...currentUser, 
      equippedCostumeId: avatarId,
      coins: newCoins
    };
    localStorage.setItem(`user_data_${updatedUser.username}`, JSON.stringify(updatedUser));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setShowAvatarSelector(false);
    
    // Force refresh to update avatar everywhere
    window.location.reload();
  };

  const renderAvatar = () => {
    const costumeId = currentUser.equippedCostumeId || 'none';

    return (
      <div className="w-24 h-24 bg-red-600/10 rounded-3xl overflow-hidden border-2 border-red-600/20 shadow-xl relative group">
        <DashboardAvatar2D username={currentUser.username} costumeId={costumeId} />
        {role === 'ADMIN' && (
          <div className="absolute top-1 right-1">
            <Shield size={12} className="text-red-600" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-red-600">Dashboard {role === 'ADMIN' ? 'Admin' : 'User'}</h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Selamat datang kembali, <span className="text-red-600 font-black">{username}</span>.
          </p>
        </div>
        {role === 'ADMIN' ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsVoxStudioEnabled(!isVoxStudioEnabled)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase transition-all border-2 ${
                isVoxStudioEnabled 
                  ? 'bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]' 
                  : 'bg-white text-zinc-900 border-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <Sparkles size={16} className={isVoxStudioEnabled ? 'animate-spin' : ''} />
              Vox-Studio {isVoxStudioEnabled ? 'ON' : 'OFF'}
            </button>
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-red-600 transition-all"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-red-600 transition-all"
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Profile & Stats */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
          >
              <div className="flex items-center gap-6 mb-8">
                {renderAvatar()}
                <div>
                  <h3 className="text-2xl font-black uppercase italic">{displayName}</h3>
                  {currentUser.voxTitle && (
                    <p className="text-[10px] font-black uppercase text-red-600 tracking-[0.2em] mb-1">
                      {currentUser.voxTitle}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{username}</span>
                    <span className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{role}</span>
                  </div>
                  {role === 'USER' && (
                    <button 
                      onClick={() => setShowAvatarSelector(true)}
                      className="mt-2 text-[10px] font-black uppercase text-red-600 hover:underline"
                    >
                      Ganti Avatar →
                    </button>
                  )}
                </div>
              </div>  

              <AnimatePresence>
                {showAvatarSelector && currentUser && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-black/5 dark:border-white/5"
                  >
                    <AvatarSelector 
                      currentUser={currentUser} 
                      isDarkMode={isDarkMode} 
                      onSelect={handleSelectAvatar} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {role === 'USER' && (
                  <div className="p-4 rounded-2xl bg-black/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50">EXP Progress</span>
                      <span className="text-[10px] font-black uppercase text-red-600">{currentExp} / {expNeeded}</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${expPercent}%` }}
                        className="h-full bg-red-600"
                      />
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5">
                  <div className="flex items-center gap-3">
                    <Coins size={18} className="text-yellow-500" />
                    <span className="text-xs font-bold uppercase">Koin Saya</span>
                  </div>
                  <span className="text-xs font-black uppercase text-yellow-500">{coins} Koin</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5">
                  <div className="flex items-center gap-3">
                    <Snowflake size={18} className="text-blue-400" />
                    <span className="text-xs font-bold uppercase">Streak Freeze</span>
                  </div>
                  <span className="text-xs font-black uppercase text-blue-400">{freezeCount} Tersedia</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5">
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-red-600" />
                    <span className="text-xs font-bold uppercase">Level Literasi</span>
                  </div>
                  <span className="text-xs font-black uppercase">{role === 'ADMIN' ? 'Super Admin' : learningProgress.percent === 100 ? 'Pakar Muda' : 'Warga Aktif'}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-black/5">
                  <div className="flex items-center gap-3">
                    <TrendingUp size={18} className="text-red-600" />
                    <span className="text-xs font-bold uppercase">Status</span>
                  </div>
                  <span className="text-xs font-black uppercase text-green-500">Online</span>
                </div>
                {role === 'USER' && (
                  <div className="flex justify-between items-center p-4 rounded-2xl bg-red-600/10 border border-red-600/20">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Flame size={20} className="text-red-600" />
                      </motion.div>
                      <span className="text-xs font-bold uppercase">Streak</span>
                    </div>
                    <span className="text-xs font-black uppercase text-red-600">{streakData.count} Hari</span>
                  </div>
                )}
              </div>
          </motion.div>

          {role === 'USER' && (
            <>
              {/* NEW STREAK FIRE CARD */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`p-8 rounded-[2.5rem] border overflow-hidden relative ${isDarkMode ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Sparkles size={20} className="text-yellow-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Aktivitas Harian</h4>
                </div>

                <StreakFire count={streakData.count} isPopping={isPopping} />

                <button
                  onClick={handleCheckStreak}
                  disabled={hasCheckedToday}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg relative z-10 ${
                    hasCheckedToday 
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20'
                  }`}
                >
                  {hasCheckedToday ? 'Streak Secured!' : 'Cek Streak Hari Ini'}
                </button>

                {/* Decorative element */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/10 rounded-full blur-3xl" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen size={20} className="text-red-600" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Progress Belajar</h4>
                </div>
                <div className="space-y-4">
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${learningProgress.percent}%` }}
                      className="h-full bg-red-600" 
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase opacity-50">{learningProgress.percent}% Materi Selesai</p>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['politik'] !== undefined ? '' : 'opacity-30'}`}>
                      {learningProgress.details['politik'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                      <span>Dasar Politik</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['demokrasi'] !== undefined ? '' : 'opacity-30'}`}>
                      {learningProgress.details['demokrasi'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                      <span>Sistem Demokrasi</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['cabang'] !== undefined ? '' : 'opacity-30'}`}>
                      {learningProgress.details['cabang'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                      <span>Tujuan & Fungsi</span>
                    </div>
                    <div className={`flex items-center gap-2 text-[10px] font-bold uppercase ${learningProgress.details['memilih'] !== undefined ? '' : 'opacity-30'}`}>
                      {learningProgress.details['memilih'] !== undefined ? <CheckCircle2 size={12} className="text-green-500" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                      <span>Urgensi Memilih</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles size={20} className="text-yellow-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Daily Shop</h4>
                </div>
                <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Snowflake className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase">Streak Freeze</p>
                      <p className="text-[10px] font-bold text-blue-400 uppercase">50 Koin</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleBuyFreeze}
                    disabled={coins < 50}
                    className={`px-4 py-2 rounded-lg font-black text-[10px] uppercase transition-all ${
                      coins >= 50 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    Beli
                  </button>
                </div>
                <p className="text-[10px] font-medium opacity-50 italic">Gunakan Streak Freeze untuk menyelamatkan streak-mu jika lupa login sehari!</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle size={20} className="text-red-600" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Analisis Nilai</h4>
                </div>
                <p className="text-xs font-medium italic mb-4">"{reportCard?.suggestion}"</p>
                <button className="text-[10px] font-black uppercase text-red-600 hover:underline">Pelajari Sekarang →</button>
              </motion.div>
            </>
          )}
        </div>
        {/* RIGHT COLUMN: History or Admin Lists */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-4">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === 'overview' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-black/5 opacity-50 hover:opacity-100'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                activeTab === 'friends' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-black/5 opacity-50 hover:opacity-100'
              }`}
            >
              Teman ({ (currentUser?.followers?.length || 0) + (currentUser?.following?.length || 0) })
            </button>
          </div>

          {activeTab === 'overview' ? (
            <>
              {role === 'USER' ? (
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <Award size={24} className="text-red-600" />
                  <h3 className="text-2xl font-black uppercase italic">Rapor Literasi</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-black/5">
                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Total Kuis</p>
                    <p className="text-2xl font-black text-red-600">{reportCard?.totalQuizzes}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5">
                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Rata-rata</p>
                    <p className="text-2xl font-black text-red-600">{reportCard?.avgScore}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5">
                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Kekuatan</p>
                    <p className="text-xs font-black uppercase">{reportCard?.strength}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5">
                    <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Kelemahan</p>
                    <p className="text-xs font-black uppercase">{reportCard?.weakness}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <Award size={24} className="text-yellow-500" />
                  <h3 className="text-2xl font-black uppercase italic">Pencapaian</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentUser?.achievements && currentUser.achievements.length > 0 ? (
                    currentUser.achievements.map((ach) => (
                      <div key={ach.id} className="p-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                          <Award size={20} className="text-black" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase leading-tight">{ach.title}</p>
                          <p className="text-[8px] font-bold opacity-50 uppercase">{new Date(ach.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-8 text-center border-2 border-dashed border-black/5 rounded-2xl">
                      <p className="text-[10px] font-bold uppercase opacity-30 italic">Belum ada pencapaian. Teruslah belajar!</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <History size={24} className="text-red-600" />
                    <h3 className="text-2xl font-black uppercase italic">Riwayat Kuis</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase opacity-50">{quizHistory.length} Sesi Terakhir</span>
                </div>
                
                <div className="space-y-4">
                  {quizHistory.length > 0 ? (
                    quizHistory.slice().reverse().map((quiz: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-black/5 border border-transparent hover:border-red-600/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${quiz.score >= 70 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {quiz.score >= 70 ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase">{quiz.category || 'Pengetahuan Umum'}</p>
                            <p className="text-[10px] font-bold opacity-50 uppercase">{quiz.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-black text-red-600">{quiz.score}</p>
                          <p className="text-[8px] font-black uppercase opacity-50">Skor</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-xs font-bold uppercase opacity-30 italic">Belum ada riwayat kuis.</p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <MessageSquare size={24} className="text-red-600" />
                  <h3 className="text-2xl font-black uppercase italic">VoxCircle Saya</h3>
                </div>
                <div className="space-y-4">
                  {myPosts.length > 0 ? (
                    myPosts.map((post: any) => (
                      <div key={post.id} className="p-4 rounded-2xl bg-black/5">
                        <p className="text-sm font-medium mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-50">
                          <span>{post.likes.length} Suka</span>
                          <span>{post.comments.length} Komentar</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      <p className="text-xs font-bold uppercase opacity-30 italic">Kamu belum membagikan pemikiran di VoxCircle.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* ADMIN VIEW */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-8 rounded-[2.5rem] border mb-8 ${isDarkMode ? 'bg-red-600/5 border-red-600/20' : 'bg-red-50 border-red-200 shadow-xl'}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
                    <h3 className="text-xl font-black uppercase italic">Live Platform Pulse</h3>
                  </div>
                  <span className="text-[10px] font-black uppercase opacity-50">Real-time Feed</span>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-black text-red-600 tabular-nums">{liveStats.activeNow}</p>
                    <p className="text-[10px] font-bold uppercase opacity-50">Aktif Sekarang</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-red-600 tabular-nums">{liveStats.votesToday}</p>
                    <p className="text-[10px] font-bold uppercase opacity-50">Suara Masuk</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-red-600 tabular-nums">{liveStats.newUsersToday}</p>
                    <p className="text-[10px] font-bold uppercase opacity-50">User Baru</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp size={24} className="text-red-600" />
                  <h3 className="text-2xl font-black uppercase italic">Statistik Platform</h3>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={usageData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#333' : '#eee'} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#666' : '#999' }} 
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fontWeight: 900, fill: isDarkMode ? '#666' : '#999' }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#18181b' : '#fff', 
                          border: 'none', 
                          borderRadius: '12px',
                          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                        }}
                        itemStyle={{ fontSize: 12, fontWeight: 900, textTransform: 'uppercase' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#dc2626" 
                        strokeWidth={4} 
                        dot={{ r: 6, fill: '#dc2626', strokeWidth: 2, stroke: isDarkMode ? '#18181b' : '#fff' }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <Users size={24} className="text-red-600" />
                      <h3 className="text-2xl font-black uppercase italic">Daftar Pengguna</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handleClearAllPosts}
                        className="px-4 py-2 bg-red-600/10 text-red-600 rounded-xl text-[10px] font-black uppercase hover:bg-red-600 hover:text-white transition-all"
                      >
                        Reset VoxCircle
                      </button>
                      <span className="text-[10px] font-black uppercase opacity-50">{usersList.length} Total</span>
                    </div>
                  </div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {usersList.map((user) => (
                      <div key={user.username} className="flex items-center justify-between p-4 rounded-2xl bg-black/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-600/10 flex items-center justify-center text-red-600 font-black uppercase">
                            {user.username.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-black uppercase">{user.username}</p>
                            <p className="text-[8px] font-bold opacity-50 uppercase">{user.role}</p>
                          </div>
                        </div>
                        {user.role !== 'ADMIN' && (
                          <button 
                            onClick={() => handleRemoveUser(user.username)}
                            className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <MessageSquare size={24} className="text-red-600" />
                      <h3 className="text-2xl font-black uppercase italic">Feedback Pengguna</h3>
                    </div>
                    <span className="text-[10px] font-black uppercase opacity-50">{feedbacks.length} Pesan</span>
                  </div>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {feedbacks.slice().reverse().map((fb) => (
                      <div key={fb.id} className="p-4 rounded-2xl bg-black/5">
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[10px] font-black uppercase text-red-600">{fb.username}</p>
                          <p className="text-[8px] font-bold opacity-50 uppercase">{fb.date}</p>
                        </div>
                        <p className="text-xs font-medium italic">"{fb.message}"</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Friends List View */
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-10 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-xl'}`}
        >
          <div className="flex gap-8 border-b border-black/5 dark:border-white/5 mb-8">
            <button 
              onClick={() => setFriendTab('followers')}
              className={`pb-4 font-black text-xs uppercase tracking-widest transition-all relative ${
                friendTab === 'followers' ? 'text-red-600' : 'opacity-50'
              }`}
            >
              Followers ({currentUser?.followers?.length || 0})
              {friendTab === 'followers' && <motion.div layoutId="friendTab" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />}
            </button>
            <button 
              onClick={() => setFriendTab('following')}
              className={`pb-4 font-black text-xs uppercase tracking-widest transition-all relative ${
                friendTab === 'following' ? 'text-red-600' : 'opacity-50'
              }`}
            >
              Following ({currentUser?.following?.length || 0})
              {friendTab === 'following' && <motion.div layoutId="friendTab" className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />}
            </button>
          </div>

          <div className="space-y-4">
            {(friendTab === 'followers' ? currentUser?.followers : currentUser?.following)?.length === 0 ? (
              <div className="text-center py-12 opacity-50 font-bold uppercase tracking-widest text-xs">
                Belum ada {friendTab === 'followers' ? 'pengikut' : 'yang diikuti'}.
              </div>
            ) : (
              (friendTab === 'followers' ? currentUser?.followers : currentUser?.following)?.map((friendUsername) => (
                <div key={friendUsername} className="flex items-center justify-between p-4 rounded-2xl bg-black/5 hover:bg-black/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-red-600/20">
                      <img 
                        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${friendUsername.replace('@', '')}&backgroundColor=f8fafc,f1f5f9&radius=20`}
                        alt={friendUsername}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold uppercase tracking-tight">{friendUsername}</p>
                      <p className="text-[10px] font-bold text-red-600 uppercase">Warga Aktif</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      // Navigate to VoxCircle and filter for this user
                      (window as any).setActiveSection('home');
                      setTimeout(() => {
                        const voxCircle = document.getElementById('vox-circle');
                        if (voxCircle) voxCircle.scrollIntoView({ behavior: 'smooth' });
                      }, 500);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all"
                  >
                    Lihat Profil
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
      </div>

      <AnimatePresence>
        {showCinematic && (
          <CinematicStreakOverlay 
            count={streakData.count} 
            motivation={motivation} 
            onClose={() => setShowCinematic(false)} 
          />
        )}
      </AnimatePresence>

      {/* ADMIN EDIT BUTTON AT BOTTOM */}
      {role === 'ADMIN' && (
        <div className="mt-20 flex flex-col items-center gap-6 p-12 rounded-[3rem] border-4 border-dashed border-red-600/30 bg-red-600/5">
          <div className="text-center">
            <h3 className="text-3xl font-black uppercase italic text-red-600 mb-2">Admin Control Center</h3>
            <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Aktifkan mode edit untuk memodifikasi konten secara inline</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl flex items-center gap-3 ${
                isEditMode 
                  ? 'bg-red-600 text-white shadow-red-600/40 scale-105' 
                  : 'bg-zinc-900 text-white hover:bg-red-600'
              }`}
            >
              <Sparkles size={20} className={isEditMode ? 'animate-spin' : ''} />
              {isEditMode ? 'Matikan Mode Edit' : 'Edit Dashboard'}
            </button>
            {isEditMode && (
              <button 
                onClick={() => {
                  setIsEditMode(false);
                  alert('Perubahan telah disimpan secara real-time!');
                }}
                className="px-12 py-5 bg-green-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-2xl"
              >
                Simpan / OK
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
