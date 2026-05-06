import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { Eye, EyeOff } from 'lucide-react';
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  setDoc, 
  handleFirestoreError,
  OperationType,
  signInAnonymously
} from '../firebase';

interface AuthProps {
  isDarkMode: boolean;
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ isDarkMode, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState({ username: '', password: '', displayName: '', rememberMe: false });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    // Ensure username starts with @
    const rawUsername = authData.username.trim();
    if (!rawUsername) {
      alert("Masukkan username!");
      return;
    }

    const formattedUsername = rawUsername.startsWith('@') ? rawUsername : `@${rawUsername}`;
    const docId = formattedUsername.replace('@', '');

    try {
      setIsLoading(true);
      
      // If auth isn't ready, wait a bit or try to sign in
      let uid = auth.currentUser?.uid;
      if (!uid) {
        console.log("Auth not ready, signing in anonymously...");
        const userCred = await signInAnonymously(auth);
        uid = userCred.user.uid;
      }

      if (isSignUpMode) {
        const userPath = `users/${docId}`;
        try {
          const userDoc = await getDoc(doc(db, 'users', docId));
          if (userDoc.exists()) {
            alert("Username sudah digunakan!");
            setIsLoading(false); // Explicitly set false
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
            coins: 100,
            streakFreezeCount: 0,
            uid: uid || ''
          };

          await setDoc(doc(db, 'users', docId), newUser);
          
          if (uid) {
            await setDoc(doc(db, 'users_by_uid', uid), {
              username: formattedUsername,
              role: 'USER'
            }).catch(err => console.error("UID mapping error:", err));
          }
          
          localStorage.setItem(`user_data_${formattedUsername}`, JSON.stringify(newUser));
          onLogin(newUser);
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, userPath);
          setIsLoading(false);
        }
      } else {
        const userPath = `users/${docId}`;
        try {
          const admins = [
            { username: 'superadmin', password: 'devinakialarissa', displayName: 'Dekila' }
          ];

          const adminMatch = admins.find(a => 
            (a.username.toLowerCase() === authData.username.toLowerCase() || 
             a.username.toLowerCase() === formattedUsername.toLowerCase()) && 
            a.password === authData.password
          );

          const userDoc = await getDoc(doc(db, 'users', docId));
          let savedUser: User | null = userDoc.exists() ? userDoc.data() as User : null;

          if (!savedUser) {
            const localData = localStorage.getItem(`user_data_${formattedUsername}`);
            if (localData) savedUser = JSON.parse(localData);
          }
          
          if (adminMatch || (savedUser && savedUser.password === authData.password)) {
            let user: User;
            if (adminMatch) {
              user = {
                username: adminMatch.username.startsWith('@') ? adminMatch.username : `@${adminMatch.username}`,
                displayName: adminMatch.displayName,
                password: adminMatch.password,
                role: 'ADMIN',
                level: 999,
                currentExp: 0,
                streak: 1,
                lastLoginDate: new Date().toISOString().split('T')[0],
                progress: {},
                quizHistory: [],
                coins: 9999999,
                streakFreezeCount: 99,
                uid: uid || ''
              };
            } else {
              user = savedUser!;
            }

            if (uid) user.uid = uid;

            const today = new Date().toISOString().split('T')[0];
            const yesterdayDate = new Date();
            yesterdayDate.setDate(yesterdayDate.getDate() - 1);
            const yesterday = yesterdayDate.toISOString().split('T')[0];

            if (user.lastLoginDate === yesterday) {
              user.streak = (user.streak || 0) + 1;
            } else if (user.lastLoginDate !== today && user.lastLoginDate !== '') {
              user.needsStreakProtection = true;
              user.previousStreak = user.streak;
            }
            user.lastLoginDate = today;

            const syncData: any = {
              lastLoginDate: today,
              streak: user.streak,
              streakFreezeCount: user.streakFreezeCount || 0,
              needsStreakProtection: user.needsStreakProtection || false,
              previousStreak: user.previousStreak || 0,
              lastActive: new Date().toISOString()
            };
            if (uid) syncData.uid = uid;

            await setDoc(doc(db, 'users', docId), syncData, { merge: true });

            if (uid) {
              await setDoc(doc(db, 'users_by_uid', uid), {
                username: user.username,
                role: user.role
              }, { merge: true }).catch(err => console.error("UID mapping error:", err));
            }

            localStorage.setItem(`user_data_${user.username}`, JSON.stringify(user));
            onLogin(user);
          } else {
            alert("Username atau Password salah!");
            setIsLoading(false);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, userPath);
          setIsLoading(false);
        }
      }
    } catch (error: any) {
      console.error("Auth error details:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        env: process.env.NODE_ENV,
        hostname: window.location.hostname
      });
      alert(`Terjadi kesalahan saat autentikasi: ${error.message || 'Silakan coba lagi.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-vox-navy text-white' : 'bg-vox-bg text-vox-navy'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className={`p-10 rounded-3xl w-full max-w-md border bg-white border-vox-primary/5 shadow-2xl shadow-blue-200/20`}
      >
        <h2 className="text-3xl font-black italic text-center mb-2 tracking-tighter uppercase text-vox-primary">
          {isSignUpMode ? 'Buat Akun' : 'VoxPolitika'}
        </h2>
        <p className="text-center text-[10px] font-bold text-vox-slate uppercase tracking-[0.2em] mb-8">
          {isSignUpMode ? 'Daftar untuk akses admin & user' : 'Masuk ke dashboard Anda'}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUpMode && (
            <input 
              type="text" placeholder="Nama Lengkap" 
              className="w-full p-4 rounded-xl border-2 outline-none transition-all bg-vox-bg border-vox-primary/5 focus:border-vox-primary text-vox-navy"
              onChange={(e) => setAuthData({...authData, displayName: e.target.value})}
              required
            />
          )}
          <input 
            type="text" placeholder="Username (ex: superadmin)" 
            className="w-full p-4 rounded-xl border-2 outline-none transition-all bg-vox-bg border-vox-primary/5 focus:border-vox-primary text-vox-navy"
            onChange={(e) => setAuthData({...authData, username: e.target.value})}
            required
          />
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full p-4 rounded-xl border-2 outline-none transition-all bg-vox-bg border-vox-primary/5 focus:border-vox-primary text-vox-navy"
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-vox-slate hover:text-vox-primary transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {!isSignUpMode && (
            <div className="flex items-center gap-2 px-2">
              <input 
                type="checkbox" 
                id="rememberMe"
                checked={authData.rememberMe}
                onChange={(e) => setAuthData({...authData, rememberMe: e.target.checked})}
                className="w-4 h-4 rounded border-vox-primary text-vox-primary focus:ring-vox-primary"
              />
              <label htmlFor="rememberMe" className="text-xs font-bold text-vox-slate uppercase tracking-widest cursor-pointer">Remember Me</label>
            </div>
          )}

          <button 
            disabled={isLoading}
            className={`w-full bg-vox-emerald py-4 rounded-xl font-black italic text-vox-navy hover:bg-vox-primary hover:text-white transition-all active:scale-95 shadow-lg shadow-vox-emerald/20 uppercase tracking-widest text-xs ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isLoading ? (isSignUpMode ? 'Mendaftar...' : 'Masuk...') : (isSignUpMode ? 'Daftar Sekarang' : 'Masuk Dashboard')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="text-[10px] font-black uppercase tracking-widest text-vox-slate hover:text-vox-primary transition-colors"
          >
            {isSignUpMode ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
