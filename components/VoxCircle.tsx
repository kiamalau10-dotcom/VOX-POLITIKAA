import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, MessageCircle, Heart, Share2, UserPlus, Search, Bomb } from 'lucide-react';
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
  getDocs,
  writeBatch,
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
  likes: string[];
  comments: { username: string; text: string; timestamp: any }[];
  role: 'ADMIN' | 'USER';
  shares?: number;
  userId?: string; // Tambahkan ini
  authorId?: string; // Tambahkan ini
}

const VoxCircle: React.FC<{ currentUser: User | null; isDarkMode: boolean }> = ({ currentUser, isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
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
  }, []);

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
        // DUA FIELD INI KUNCI AGAR BISA DIPOSTING & DIHAPUS
        authorId: currentUser.uid, 
        userId: currentUser.uid 
      });
      setNewPost('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Hapus postingan ini?")) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error: any) {
      alert("Gagal menghapus! Pastikan kamu pemilik post ini atau Admin.");
    }
  };

  // FUNGSI NUKE (HAPUS SEMUA) UNTUK ADMIN
  const handleNukeAll = async () => {
    const confirmName = window.prompt("⚠️ BAHAYA: Ketik 'HAPUS SEMUA' untuk meratakan VoxCircle:");
    if (confirmName === 'HAPUS SEMUA') {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const batch = writeBatch(db);
        querySnapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        await batch.commit();
        alert("VoxCircle berhasil dibersihkan!");
      } catch (error) {
        alert("Gagal membersihkan database. Cek izin Firestore.");
      }
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.likes.includes(currentUser.username);
    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(currentUser.username) : arrayUnion(currentUser.username)
      });
    } catch (error) {}
  };

  const handleComment = async (postId: string) => {
    if (!commentText.trim() || !currentUser) return;
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
    } catch (error) {}
  };

  const handleShare = async (post: Post) => {
    try {
      await navigator.clipboard.writeText(`${post.content}\n\nShared from VoxPolitika`);
      alert("Konten berhasil disalin!");
      const postRef = doc(db, 'posts', post.id);
      await updateDoc(postRef, { shares: (post.shares || 0) + 1 });
    } catch (error) {}
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    return posts.filter(p => 
      p.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Baru saja';
    try {
      const date = ts.toDate ? ts.toDate() : new Date(ts);
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return 'Baru saja'; }
  };

  const renderAvatar = (username: string) => (
    <div className="w-12 h-12 rounded-2xl bg-red-600/10 overflow-hidden border-2 border-red-600/20 shrink-0">
      <img 
        src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`} 
        alt="avatar" 
        className="w-full h-full object-contain"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-red-600 mb-4 tracking-tighter">VoxCircle</h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Suarakan opinimu di sini.</p>
          {currentUser?.role === 'ADMIN' && (
            <button onClick={handleNukeAll} className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-red-600 hover:text-red-700 border border-red-600/20 px-3 py-1 rounded-lg">
              <Bomb size={12} /> Nuke Database (Admin)
            </button>
          )}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text" placeholder="Cari..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none border-2 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}`}
          />
        </div>
      </motion.div>

      <div className={`p-8 rounded-[2.5rem] border mb-12 ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5'}`}>
        <div className="flex gap-4">
          {currentUser && renderAvatar(currentUser.username)}
          <div className="flex-1 space-y-4">
            <textarea
              value={newPost} onChange={(e) => setNewPost(e.target.value)}
              placeholder="Apa pendapat politikmu?"
              className={`w-full p-6 rounded-2xl outline-none border-2 h-32 ${isDarkMode ? 'bg-black border-white/10 focus:border-red-600' : 'bg-zinc-50 border-zinc-100 focus:border-red-600'}`}
            />
            <div className="flex justify-end">
              <button onClick={handlePost} className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-600/20">
                <Send size={16} /> Post
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {filteredPosts.map((post) => (
            <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/30 border-white/5' : 'bg-white border-black/5'}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  {renderAvatar(post.username)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black uppercase text-sm">{post.displayName}</h4>
                      <span className="text-[10px] opacity-40">{post.username}</span>
                      {post.role === 'ADMIN' && <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-black rounded-full">ADMIN</span>}
                    </div>
                    <p className="text-[10px] opacity-40">{formatTimestamp(post.timestamp)}</p>
                  </div>
                </div>
                {(currentUser?.role === 'ADMIN' || currentUser?.uid === post.userId || currentUser?.uid === post.authorId) && (
                  <button onClick={() => handleDelete(post.id)} className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-red-600 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <p className={`text-lg mb-8 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{post.content}</p>
              <div className="flex items-center gap-8 pt-6 border-t border-white/5">
                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-2 text-xs font-bold ${post.likes.includes(currentUser?.username || '') ? 'text-red-600' : 'opacity-50'}`}>
                  <Heart size={16} fill={post.likes.includes(currentUser?.username || '') ? 'currentColor' : 'none'} /> {post.likes.length}
                </button>
                <button onClick={() => setCommentingOn(commentingOn === post.id ? null : post.id)} className="flex items-center gap-2 text-xs font-bold opacity-50">
                  <MessageCircle size={16} /> {post.comments.length}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoxCircle;
