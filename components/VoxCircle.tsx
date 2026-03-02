import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, MessageCircle, Heart, Share2, UserPlus, Search } from 'lucide-react';
import { User } from '../types';

interface Post {
  id: string;
  username: string;
  displayName: string;
  avatarConfig?: any;
  content: string;
  timestamp: string;
  likes: string[]; // array of usernames who liked
  comments: { username: string; text: string; timestamp: string }[];
  role: 'ADMIN' | 'USER';
}

const VoxCircle: React.FC<{ currentUser: User | null; isDarkMode: boolean }> = ({ currentUser, isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('vox_circle_posts');
    const parsed = savedPosts ? JSON.parse(savedPosts) : [];
    return parsed.map((p: any) => ({
      ...p,
      likes: Array.isArray(p.likes) ? p.likes : [],
      comments: Array.isArray(p.comments) ? p.comments : []
    }));
  });
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    localStorage.setItem('vox_circle_posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (!newPost.trim() || !currentUser) return;

    const post: Post = {
      id: Date.now().toString(),
      username: currentUser.username,
      displayName: currentUser.displayName,
      avatarConfig: currentUser.avatarConfig,
      content: newPost,
      timestamp: 'Baru saja',
      likes: [],
      comments: [],
      role: currentUser.role
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleLike = (postId: string) => {
    if (!currentUser) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const liked = p.likes.includes(currentUser.username);
        return {
          ...p,
          likes: liked 
            ? p.likes.filter(u => u !== currentUser.username)
            : [...p.likes, currentUser.username]
        };
      }
      return p;
    }));
  };

  const handleComment = (postId: string) => {
    if (!commentText.trim() || !currentUser) return;
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            username: currentUser.username,
            text: commentText,
            timestamp: 'Baru saja'
          }]
        };
      }
      return p;
    }));
    setCommentText('');
    setCommentingOn(null);
  };

  const handleFollow = (targetUsername: string) => {
    if (!currentUser || currentUser.username === targetUsername) return;
    
    const savedUserData = localStorage.getItem(`user_data_${currentUser.username}`);
    if (!savedUserData) return;
    
    const user: User = JSON.parse(savedUserData);
    const following = user.following || [];
    const isFollowing = following.includes(targetUsername);
    
    const newFollowing = isFollowing 
      ? following.filter(u => u !== targetUsername)
      : [...following, targetUsername];
      
    const updatedUser = { ...user, following: newFollowing };
    localStorage.setItem(`user_data_${currentUser.username}`, JSON.stringify(updatedUser));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update target user's followers
    const targetData = localStorage.getItem(`user_data_${targetUsername}`);
    if (targetData) {
      const target: User = JSON.parse(targetData);
      const followers = target.followers || [];
      const newFollowers = isFollowing
        ? followers.filter(u => u !== currentUser.username)
        : [...followers, currentUser.username];
      localStorage.setItem(`user_data_${targetUsername}`, JSON.stringify({ ...target, followers: newFollowers }));
    }

    // Trigger storage event for App.tsx
    window.dispatchEvent(new Event('storage'));
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    return posts.filter(p => 
      p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const renderAvatar = (config: any, username: string) => {
    if (config) {
      return (
        <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-2xl border-2 border-red-600/20">
          {config.base === 'male' ? '👨' : config.base === 'female' ? '👩' : '👤'}
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black shrink-0">
        {username[1]?.toUpperCase() || 'V'}
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
                    <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{post.timestamp}</p>
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
                  {(currentUser?.role === 'ADMIN' || currentUser?.username === post.username) && (
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
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
                <button className="flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 transition-all">
                  <Share2 size={16} /> Bagikan
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
