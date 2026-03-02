import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';

interface AuthProps {
  isDarkMode: boolean;
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ isDarkMode, onLogin }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authData, setAuthData] = useState({ username: '', password: '', displayName: '', rememberMe: false });

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure username starts with @
    const formattedUsername = authData.username.startsWith('@') ? authData.username : `@${authData.username}`;

    if (isSignUpMode) {
      const existingUser = localStorage.getItem(`user_data_${formattedUsername}`);
      if (existingUser) {
        alert("Username sudah digunakan!");
        return;
      }

      const newUser: User = {
        username: formattedUsername,
        displayName: authData.displayName || authData.username,
        password: authData.password,
        role: 'USER',
        level: 1,
        currentExp: 0,
        streak: 1,
        lastLoginDate: new Date().toISOString().split('T')[0],
        progress: {},
        quizHistory: [],
        coins: 100, // Initial coins for regular users
        streakFreezeCount: 0,
        followers: [],
        following: []
      };
      localStorage.setItem(`user_data_${formattedUsername}`, JSON.stringify(newUser));
      
      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      localStorage.setItem('all_users', JSON.stringify([...allUsers, newUser]));

      alert("Akun berhasil dibuat! Silakan login.");
      setIsSignUpMode(false);
    } else {
      // UPDATED ADMIN LIST - MATCHING YOUR REQUEST
      const admins = [
        { username: 'superadmin', password: 'devinakialarissa', displayName: 'Dekila' },
        { username: '@kia', password: 'kiacantik', displayName: 'Kia' },
        { username: '@larissa', password: 'larissabigayle123', displayName: 'Larissa' },
        { username: '@devina', password: 'devina321', displayName: 'Devina' }
      ];

      // Check if the login matches superadmin or others
      const adminMatch = admins.find(a => 
        (a.username === authData.username || a.username === formattedUsername) && 
        a.password === authData.password
      );

      const savedUserDataStr = localStorage.getItem(`user_data_${formattedUsername}`);
      let savedUser: User | null = null;
      if (savedUserDataStr) {
        savedUser = JSON.parse(savedUserDataStr);
      }
      
      if (adminMatch || (savedUser && savedUser.password === authData.password)) {
        let user: User;
        if (adminMatch) {
          // Setting the Admin with Unlimited Coins and High Level
          user = {
            username: adminMatch.username.startsWith('@') ? adminMatch.username : `@${adminMatch.username}`,
            displayName: adminMatch.displayName,
            password: adminMatch.password,
            role: 'ADMIN', // This will change the red label to ADMIN
            level: 999,
            currentExp: 0,
            streak: 1,
            lastLoginDate: new Date().toISOString().split('T')[0],
            progress: {},
            quizHistory: [],
            coins: 9999999, // UNLIMITED COINS FOR ADMIN
            streakFreezeCount: 99,
            followers: [],
            following: []
          };
        } else {
          user = savedUser!;
        }
        
        // Streak Logic
        const today = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toISOString().split('T')[0];

        if (user.lastLoginDate === yesterday) {
          user.streak = (user.streak || 0) + 1;
        } else if (user.lastLoginDate !== today && user.lastLoginDate !== '') {
          if (user.streakFreezeCount && user.streakFreezeCount > 0) {
            user.streakFreezeCount -= 1;
          } else {
            user.streak = 1;
          }
        }
        user.lastLoginDate = today;

        (user as any).rememberMe = authData.rememberMe;
        
        // Save back to local storage so it persists
        localStorage.setItem(`user_data_${user.username}`, JSON.stringify(user));
        onLogin(user);
      } else {
        alert("Username atau Password salah!");
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-700 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className={`p-10 rounded-3xl shadow-2xl w-full max-w-md border ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'}`}
      >
        <h2 className="text-3xl font-black italic text-center mb-2 tracking-tighter uppercase text-red-600">
          {isSignUpMode ? 'Buat Akun' : 'VoxPolitika'}
        </h2>
        <p className="text-center text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8">
          {isSignUpMode ? 'Daftar untuk akses admin & user' : 'Masuk ke dashboard Anda'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUpMode && (
            <input 
              type="text" placeholder="Nama Lengkap" 
              className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${isDarkMode ? 'bg-black border-white/5 focus:border-red-600 text-white' : 'bg-gray-50 border-gray-100 focus:border-red-600'}`}
              onChange={(e) => setAuthData({...authData, displayName: e.target.value})}
              required
            />
          )}
          <input 
            type="text" placeholder="Username (ex: superadmin)" 
            className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${isDarkMode ? 'bg-black border-white/5 focus:border-red-600 text-white' : 'bg-gray-50 border-gray-100 focus:border-red-600'}`}
            onChange={(e) => setAuthData({...authData, username: e.target.value})}
            required
          />
          <input 
            type="password" placeholder="Password" 
            className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${isDarkMode ? 'bg-black border-white/5 focus:border-red-600 text-white' : 'bg-gray-50 border-gray-100 focus:border-red-600'}`}
            onChange={(e) => setAuthData({...authData, password: e.target.value})}
            required
          />
          
          {!isSignUpMode && (
            <div className="flex items-center gap-2 px-2">
              <input 
                type="checkbox" 
                id="rememberMe"
                checked={authData.rememberMe}
                onChange={(e) => setAuthData({...authData, rememberMe: e.target.checked})}
                className="w-4 h-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
              />
              <label htmlFor="rememberMe" className="text-xs font-bold text-zinc-500 uppercase tracking-widest cursor-pointer">Remember Me</label>
            </div>
          )}

          <button className="w-full bg-red-600 py-4 rounded-xl font-black italic text-white hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/30 uppercase tracking-widest text-xs">
            {isSignUpMode ? 'Daftar Sekarang' : 'Masuk Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors"
          >
            {isSignUpMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
