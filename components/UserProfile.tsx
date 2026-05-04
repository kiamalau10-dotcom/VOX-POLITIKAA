import React from 'react';
import { motion } from 'framer-motion';
import { Award, Flame, MessageSquare, Shield } from 'lucide-react';
import { useRealtimeProfile } from '../hooks/useRealtimeProfile';
import { getAvatarUrl } from '../services/avatarService';

interface UserProfileProps {
  targetUsername: string;
  currentUsername: string;
  isDarkMode: boolean;
  isAdmin?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ targetUsername, isDarkMode, isAdmin }) => {
  const { profile, posts, loading } = useRealtimeProfile(targetUsername);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase opacity-50 tracking-widest">Memuat Profil...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-sm font-black uppercase opacity-50">User tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-red-600/20 shadow-2xl bg-white relative group">
          <img 
            src={getAvatarUrl(targetUsername, profile.avatarConfig)}
            alt={targetUsername}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          {profile.role === 'ADMIN' && (
            <div className="absolute top-2 right-2 p-1 bg-red-600 rounded-lg text-white">
              <Shield size={12} />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">{profile.username}</h2>
          </div>
          <p className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4">
            {profile.voxTitle || 'Warga Aktif'} • Level {profile.level}
          </p>
          
          <div className="flex items-center justify-center md:justify-start gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1">
                <Flame size={14} className="text-orange-500" />
                <p className="text-xl font-black text-red-600">{profile.streak || 0}</p>
              </div>
              <p className="text-[8px] font-black uppercase opacity-50">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-50">
          <span>Progress Level {profile.level}</span>
          <span>{profile.currentExp} / {profile.level * 100} EXP</span>
        </div>
        <div className="h-3 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (profile.currentExp / (profile.level * 100)) * 100)}%` }}
            className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]"
          />
        </div>
      </div>

      {/* Stats & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Award size={20} className="text-yellow-500" />
            <h4 className="text-xs font-black uppercase tracking-widest">Pencapaian</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.achievements && profile.achievements.length > 0 ? (
              profile.achievements.map((ach) => (
                <div key={ach.id} className="px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-2">
                  <span className="text-lg">{ach.icon || '🏆'}</span>
                  <span className="text-[9px] font-black uppercase">{ach.title}</span>
                </div>
              ))
            ) : (
              <p className="text-[10px] font-bold opacity-30 italic uppercase">Belum ada pencapaian.</p>
            )}
          </div>
        </div>

        <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-blue-500" />
            <h4 className="text-xs font-black uppercase tracking-widest">Statistik Kuis</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-2xl bg-black/5">
              <p className="text-xl font-black text-red-600">{profile.quizHistory?.length || 0}</p>
              <p className="text-[8px] font-black uppercase opacity-50">Total Kuis</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-black/5">
              <p className="text-xl font-black text-red-600">
                {profile.quizHistory?.length ? Math.round(profile.quizHistory.reduce((acc, curr) => acc + curr.score, 0) / profile.quizHistory.length) : 0}
              </p>
              <p className="text-[8px] font-black uppercase opacity-50">Rata-rata</p>
            </div>
          </div>
        </div>
      </div>

      {/* VoxCircle Feed */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-red-600" />
          <h4 className="text-xs font-black uppercase tracking-widest">VoxCircle Thoughts</h4>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-[2rem]">
              <p className="text-[10px] font-bold uppercase opacity-30 italic">Belum ada postingan.</p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'}`}
              >
                <p className="text-sm font-medium mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[9px] font-black uppercase opacity-50">
                    <span className="flex items-center gap-1"><MessageSquare size={10} /> {post.comments?.length || 0}</span>
                    <span>{post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString() : 'Baru saja'}</span>
                  </div>
                  {isAdmin && (
                    <button className="text-red-600 hover:opacity-70 transition-opacity">
                      <Shield size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
