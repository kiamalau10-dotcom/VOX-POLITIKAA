import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, MessageCircle, Heart, Share2, UserPlus, Search } from 'lucide-react';
import { User } from '../types';
import { 
  db, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc, 
  arrayUnion, 
  arrayRemove,
  serverTimestamp,
  OperationType,
  handleFirestoreError
} from '../firebase';

interface Post {
  id: string;
  username: string;
  displayName: string;
  avatarConfig?: any;
  content: string;
  timestamp: any;
  likes: string[]; // array of usernames who liked
  comments: { username: string; text: string; timestamp: any }[];
  role: 'ADMIN' | 'USER';
  shares?: number;
}

const VoxCircle: React.FC<{ currentUser: User | null; isDarkMode: boolean }> = ({ currentUser, isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    const path = 'posts';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(fetchedPosts);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handlePost = async () => {
    if (!newPost.trim() || !currentUser) return;

    const path = 'posts';
    try {
      await addDoc(collection(db, path), {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarConfig: currentUser.avatarConfig || null,
        content: newPost,
        timestamp: serverTimestamp(),
        likes: [],
        comments: [],
        role: currentUser.role,
        shares: 0,
        authorId: currentUser.uid // CRITICAL: Added authorId for security rules
      });
      setNewPost('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus postingan ini?")) return;
    const path = `posts/${id}`;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;
    const path = `posts/${postId}`;
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.likes.includes(currentUser.username);
    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(currentUser.username) : arrayUnion(currentUser.username)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleComment = async (postId: string) => {
    if (!commentText.trim() || !currentUser) return;
    const path = `posts/${postId}`;
    const postRef = doc(db, 'posts', postId);
    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          username: currentUser.username,
          text: commentText,
          timestamp: new Date().toISOString()
        })
      });
      setCommentText('');
      setCommentingOn(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  const handleShare = async (post: Post) => {
    const shareData = {
      title: 'VoxCircle Post',
      text: `${post.displayName} (@${post.username}): ${post.content}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n\nShared from VoxPolitika`);
        alert("Link dan konten post berhasil disalin ke clipboard!");
      }
      
      // Increment share count in Firestore
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, {
        shares: (post.shares || 0) + 1
      });
    } catch (error) {
      console.error("Error sharing: ", error);
    }
  };

  const handleFollow = async (targetUsername: string) => {
    if (!currentUser || currentUser.username === targetUsername) return;
    
    try {
      // 1. Update current user's following list in Firestore
      // We use the username as the document ID for simplicity in this mapping
      const currentUserRef = doc(db, 'users', currentUser.username.replace('@', ''));
      const targetUserRef = doc(db, 'users', targetUsername.replace('@', ''));

      const isFollowing = currentUser.following?.includes(targetUsername);

      // Update current user
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(targetUsername) : arrayUnion(targetUsername)
      });

      // Update target user
      await updateDoc(targetUserRef, {
        followers: isFollowing ? arrayRemove(currentUser.username) : arrayUnion(currentUser.username)
      });

      // Also update local storage for immediate UI feedback if needed, 
      // but App.tsx should ideally listen to Firestore for currentUser too.
      const updatedUser = { 
        ...currentUser, 
        following: isFollowing 
          ? currentUser.following?.filter(u => u !== targetUsername) 
          : [...(currentUser.following || []), targetUsername] 
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      localStorage.setItem(`user_data_${currentUser.username}`, JSON.stringify(updatedUser));
      
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error("Error following user: ", error);
      alert("Gagal mengikuti user. Pastikan Anda sudah terdaftar di database.");
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    return posts.filter(p => 
      p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Baru saja';
    if (ts.toDate) {
      const date = ts.toDate();
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return ts;
  };

  const renderAvatar = (costumeId: any, username: string) => {
    const avatarUrl = costumeId === 'none' || !costumeId
      ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&backgroundColor=f8fafc,f1f5f9&radius=20`
      : costumeId;
    
    return (
      <div className="w-12 h-12 rounded-2xl bg-red-600/10 overflow-hidden border-2 border-red-600/20 shrink-0">
        <img 
          src={avatarUrl} 
          alt={username} 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
          }}
        />
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6"
      >
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-red-600 mb-4 tracking-tighter">VoxCircle</h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Suarakan opinimu, bangun komunitas pemilih cerdas.
          </p>
          {currentUser?.role === 'ADMIN' && (
            <button 
              onClick={() => {
                if (window.confirm("Hapus SEMUA postingan di feed? Tindakan ini tidak bisa dibatalkan.")) {
                  setPosts([]);
                  localStorage.setItem('vox_circle_posts', JSON.stringify([]));
                }
              }}
              className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-red-600 hover:text-red-700 transition-all border border-red-600/20 px-3 py-1 rounded-lg hover:bg-red-600/5"
            >
              <Trash2 size={12} /> Clear All Feed (Admin)
            </button>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text"
            placeholder="Cari @username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none border-2 transition-all text-sm ${
              isDarkMode ? 'bg-zinc-900 border-white/5 focus:border-red-600' : 'bg-white border-black/5 focus:border-red-600'
            }`}
          />
        </div>
      </motion.div>

      {/* Post Input */}
      <div className={`p-8 rounded-[2.5rem] border mb-12 transition-all ${
        isDarkMode 
          ? 'bg-zinc-900/50 border-white/10 backdrop-blur-xl' 
          : 'bg-white border-black/5 shadow-2xl shadow-black/5'
      }`}>
        <div className="flex gap-4">
          {currentUser && renderAvatar(currentUser.avatarConfig, currentUser.username)}
          <div className="flex-1 space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Apa pendapat politikmu hari ini?"
              className={`w-full p-6 rounded-2xl outline-none border-2 transition-all resize-none h-32 ${
                isDarkMode 
                  ? 'bg-black border-white/10 focus:border-red-600' 
                  : 'bg-zinc-50 border-zinc-100 focus:border-red-600'
              }`}
            />
            <div className="flex justify-end">
              <button 
                onClick={handlePost}
                className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-600/20"
              >
                <Send size={16} /> Post Something
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <AnimatePresence>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 opacity-50 font-black uppercase tracking-widest flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center text-3xl">
                📢
              </div>
              <p className="text-sm">Belum ada suara rakyat di sini. Jadilah yang pertama bersuara!</p>
            </div>
          ) : filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-8 rounded-[2.5rem] border transition-all ${
                isDarkMode 
                  ? 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50' 
                  : 'bg-white border-black/5 shadow-xl hover:shadow-2xl'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  {renderAvatar(post.avatarConfig, post.username)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black uppercase text-sm tracking-tight">{post.displayName}</h4>
                      <span className="text-[10px] font-bold opacity-40">{post.username}</span>
                      {post.role === 'ADMIN' && (
                        <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-full uppercase">Admin</span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{formatTimestamp(post.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {currentUser && currentUser.username !== post.username && (
                    <button 
                      onClick={() => handleFollow(post.username)}
                      className={`p-2 rounded-xl transition-all ${
                        currentUser.following?.includes(post.username)
                          ? 'bg-red-600 text-white'
                          : 'bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white'
                      }`}
                    >
                      <UserPlus size={16} />
                    </button>
                  )}
                  
                  {/* Admin Specific Delete Button */}
                  {currentUser?.role === 'ADMIN' ? (
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                    >
                      <Trash2 size={12} /> Hapus (Admin)
                    </button>
                  ) : (
                    currentUser?.username === post.username && (
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all shadow-lg"
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    )
                  )}
                </div>
              </div>

              <p className={`text-lg font-medium leading-relaxed mb-8 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
                {post.content}
              </p>

              <div className="flex items-center gap-8 pt-6 border-t border-white/5">
                <button 
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 text-xs font-bold transition-all ${
                    post.likes.includes(currentUser?.username || '') ? 'text-red-600' : 'opacity-50 hover:opacity-100 hover:text-red-600'
                  }`}
                >
                  <Heart size={16} fill={post.likes.includes(currentUser?.username || '') ? 'currentColor' : 'none'} /> {post.likes.length}
                </button>
                <button 
                  onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)}
                  className="flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 transition-all"
                >
                  <MessageCircle size={16} /> {post.comments.length}
                </button>
                <button 
                  onClick={() => handleShare(post)}
                  className="flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 transition-all"
                >
                  <Share2 size={16} /> {post.shares || 0} Bagikan
                </button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {commentingOn === post.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="mt-6 pt-6 border-t border-white/5 space-y-4 overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <input 
                        type="text"
                        placeholder="Tulis balasan..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className={`flex-1 px-4 py-2 rounded-xl outline-none border-2 text-sm ${
                          isDarkMode ? 'bg-black border-white/5 focus:border-red-600' : 'bg-zinc-50 border-zinc-100 focus:border-red-600'
                        }`}
                      />
                      <button 
                        onClick={() => handleComment(post.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-xl font-black text-[10px] uppercase"
                      >
                        Kirim
                      </button>
                    </div>
                    {post.comments.map((c, idx) => (
                      <div key={idx} className="flex gap-3 text-sm">
                        <span className="font-black text-red-600">{c.username}</span>
                        <span className="opacity-70">{c.text}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoxCircle;
