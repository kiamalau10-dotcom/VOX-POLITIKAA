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
  updateDoc, 
  signInAnonymously 
} from '../firebase';

interface AuthProps {
  isDarkMode: boolean;
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ isDarkMode, onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [authData, setAuthData] = useState({ username: '', password: '', displayName: '', rememberMe: false });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure username starts with @
    const formattedUsername = authData.username.startsWith('@') ? authData.username : `@${authData.username}`;
    const docId = formattedUsername.replace('@', '');

    try {
      // Sign in anonymously to get a Firebase UID for security rules if not already signed in
      let uid = auth.currentUser?.uid || '';
      if (!uid) {
        try {
          const userCredential = await signInAnonymously(auth);
          uid = userCredential.user.uid;
        } catch (err: any) {
          // Don't block the flow, but warn the user if it's the restricted operation error
          if (err.code === 'auth/admin-restricted-operation') {
            console.warn("Anonymous Authentication is disabled in Firebase Console. Real-time sync may be limited.");
          } else {
            console.error("Auth error: ", err);
          }
        }
      }

      if (isSignUpMode) {
        const userDoc = await getDoc(doc(db, 'users', docId));
        if (userDoc.exists()) {
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
          coins: 100,
          streakFreezeCount: 0,
          followers: [],
          following: [],
          uid: uid // Store the UID if we have it
        };

        await setDoc(doc(db, 'users', docId), newUser);
        
        // Also update local storage for compatibility
        localStorage.setItem(`user_data_${formattedUsername}`, JSON.stringify(newUser));
        const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
        localStorage.setItem('all_users', JSON.stringify([...allUsers, newUser]));

        alert("Akun berhasil dibuat! Silakan login.");
        setIsSignUpMode(false);
      } else {
        // UPDATED ADMIN LIST
        const admins = [
          { username: 'superadmin', password: 'devinakialarissa', displayName: 'Dekila' },
          { username: '@kia', password: 'kiacantik', displayName: 'Kia' },
          { username: '@larissa', password: 'larissabigayle123', displayName: 'Larissa' },
          { username: '@devina', password: 'devina321', displayName: 'Devina' }
        ];

        const adminMatch = admins.find(a => 
          (a.username.toLowerCase() === authData.username.toLowerCase() || 
           a.username.toLowerCase() === formattedUsername.toLowerCase()) && 
          a.password === authData.password
        );

        const userDoc = await getDoc(doc(db, 'users', docId));
        let savedUser: User | null = userDoc.exists() ? userDoc.data() as User : null;

        // Fallback to localStorage if not in Firestore yet (for existing users)
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
              followers: [],
              following: [],
              uid: uid
            };
            // Sync admin to Firestore if not exists
            await setDoc(doc(db, 'users', docId), user, { merge: true });
          } else {
            user = savedUser!;
            // Update UID if it's missing (for legacy users)
            if (!user.uid) {
              user.uid = uid;
              await updateDoc(doc(db, 'users', docId), { uid: uid });
            }
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
          
          // Sync to Firestore
          await updateDoc(doc(db, 'users', docId), { 
            lastLoginDate: today, 
            streak: user.streak, 
            streakFreezeCount: user.streakFreezeCount || 0,
            lastActive: new Date().toISOString()
          });

          localStorage.setItem(`user_data_${user.username}`, JSON.stringify(user));
          onLogin(user);
        } else {
          alert("Username atau Password salah!");
        }
      }
    } catch (error) {
      console.error("Auth error: ", error);
      alert("Terjadi kesalahan saat autentikasi. Silakan coba lagi.");
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
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className={`w-full p-4 rounded-xl border-2 outline-none transition-all ${isDarkMode ? 'bg-black border-white/5 focus:border-red-600 text-white' : 'bg-gray-50 border-gray-100 focus:border-red-600'}`}
              onChange={(e) => setAuthData({...authData, password: e.target.value})}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-600 transition-colors"
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
