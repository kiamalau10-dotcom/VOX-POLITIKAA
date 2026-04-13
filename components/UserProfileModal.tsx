import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, UserMinus, Award, Flame, MessageSquare } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { User, Post } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUsername: string;
  currentUsername: string;
  isDarkMode: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, targetUsername, currentUsername, isDarkMode }) => {
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [followDocId, setFollowDocId] = useState<string | null>(null);
  const [stats, setStats] = useState({ followers: 0, following: 0 });

  useEffect(() => {
    if (!isOpen || !targetUsername) return;

    // Fetch Target User Data
    const userQuery = query(collection(db, 'users_by_uid'), where('username', '==', targetUsername));
    const unsubUser = onSnapshot(userQuery, (snapshot) => {
      if (!snapshot.empty) {
        setTargetUser(snapshot.docs[0].data() as User);
      }
    });

    // Fetch User Posts
    const postsQuery = query(collection(db, 'posts'), where('author', '==', targetUsername), orderBy('timestamp', 'desc'));
    const unsubPosts = onSnapshot(postsQuery, (snapshot) => {
      setUserPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Post[]);
    });

    // Check Follow Status
    const followQuery = query(collection(db, 'follows'), where('followerId', '==', currentUsername), where('followingId', '==', targetUsername));
    const unsubFollow = onSnapshot(followQuery, (snapshot) => {
      setIsFollowing(!snapshot.empty);
      if (!snapshot.empty) {
        setFollowDocId(snapshot.docs[0].id);
      } else {
        setFollowDocId(null);
      }
    });

    // Check if Friend (Mutual)
    const mutualQuery = query(collection(db, 'follows'), where('followerId', '==', targetUsername), where('followingId', '==', currentUsername));
    const unsubMutual = onSnapshot(mutualQuery, (snapshot) => {
      const isFollower = !snapshot.empty;
      setIsFriend(isFollowing && isFollower);
    });

    // Real-time Stats
    const followersQuery = query(collection(db, 'follows'), where('followingId', '==', targetUsername));
    const unsubFollowersCount = onSnapshot(followersQuery, (snapshot) => {
      setStats(prev => ({ ...prev, followers: snapshot.size }));
    });

    const followingQuery = query(collection(db, 'follows'), where('followerId', '==', targetUsername));
    const unsubFollowingCount = onSnapshot(followingQuery, (snapshot) => {
      setStats(prev => ({ ...prev, following: snapshot.size }));
    });

    return () => {
      unsubUser();
      unsubPosts();
      unsubFollow();
      unsubMutual();
      unsubFollowersCount();
      unsubFollowingCount();
    };
  }, [isOpen, targetUsername, currentUsername, isFollowing]);

  const handleFollow = async () => {
    if (isFollowing && followDocId) {
      try {
        await deleteDoc(doc(db, 'follows', followDocId));
      } catch (error) {
        console.error("Error unfollowing: ", error);
      }
    } else {
      try {
        await addDoc(collection(db, 'follows'), {
          followerId: currentUsername,
          followingId: targetUsername,
          timestamp: serverTimestamp()
        });
      } catch (error) {
        console.error("Error following: ", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] border ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/5 text-black'} shadow-2xl relative`}
        >
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-zinc-900 shadow-xl bg-white">
                <img 
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${targetUsername.replace('@', '')}&backgroundColor=f8fafc,f1f5f9&radius=20`}
                  alt={targetUsername}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter">{targetUsername}</h2>
                  {isFriend && (
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full border border-green-500/20">
                      Friends
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Level {targetUser?.level || 1} • {targetUser?.role || 'Warga Aktif'}</p>
              </div>
              {currentUsername !== targetUsername && (
                <button 
                  onClick={handleFollow}
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 ${
                    isFollowing 
                      ? 'bg-zinc-800 text-white hover:bg-red-600' 
                      : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20'
                  }`}
                >
                  {isFollowing ? <UserMinus size={18} /> : <UserPlus size={18} />}
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-black/5 text-center">
                <p className="text-2xl font-black text-red-600">{stats.followers}</p>
                <p className="text-[10px] font-bold uppercase opacity-50">Followers</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 text-center">
                <p className="text-2xl font-black text-red-600">{stats.following}</p>
                <p className="text-[10px] font-bold uppercase opacity-50">Following</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Flame size={16} className="text-orange-500" />
                  <p className="text-2xl font-black text-red-600">{targetUser?.streak || 0}</p>
                </div>
                <p className="text-[10px] font-bold uppercase opacity-50">Streak</p>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="space-y-8">
              {/* Achievements */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Award size={20} className="text-yellow-500" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Pencapaian</h4>
                </div>
                <div className="flex flex-wrap gap-3">
                  {targetUser?.achievements && targetUser.achievements.length > 0 ? (
                    targetUser.achievements.map((ach) => (
                      <div key={ach.id} className="px-4 py-2 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex items-center gap-2">
                        <Award size={14} className="text-yellow-500" />
                        <span className="text-[10px] font-black uppercase">{ach.title}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] font-bold opacity-30 italic uppercase">Belum ada pencapaian.</p>
                  )}
                </div>
              </div>

              {/* Feed */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={20} className="text-red-600" />
                  <h4 className="text-xs font-black uppercase tracking-widest">Vox Circle Feed</h4>
                </div>
                <div className="space-y-4">
                  {userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <div key={post.id} className="p-6 rounded-3xl bg-black/5 border border-black/5">
                        <p className="text-sm font-medium mb-4">{post.content}</p>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase opacity-50">
                          <span>{post.likes?.length || 0} Suka</span>
                          <span>{post.comments?.length || 0} Komentar</span>
                          <span>{post.timestamp ? new Date(post.timestamp.seconds * 1000).toLocaleDateString() : 'Baru saja'}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center border-2 border-dashed border-black/5 rounded-[2rem]">
                      <p className="text-[10px] font-bold uppercase opacity-30 italic">Belum ada postingan.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileModal;
