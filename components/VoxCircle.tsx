import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Send, MessageCircle, Heart, Search } from 'lucide-react';
import { User } from '../types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { getAvatarUrl } from '../services/avatarService';
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
  getDocs,
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
  likes: string[];
  comments: { username: string; text: string; timestamp: any }[];
  role: 'ADMIN' | 'USER';
  shares?: number;
  authorId?: string;
}

const PostCard = React.memo(({ post, currentUser, onLike, onCommentToggle, onCommentDelete, onDelete, isCommenting }: {
  post: Post,
  currentUser: User | null,
  isDarkMode: boolean,
  onLike: (id: string) => void,
  onCommentToggle: (id: string) => void,
  onCommentDelete: (id: string, comment: any) => void,
  onDelete: (id: string) => void,
  isCommenting: boolean
}) => {
  const [commentText, setCommentText] = React.useState('');

  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Baru saja';
    if (ts.toDate) return ts.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
    return ts;
  };

  const avatarUrl = getAvatarUrl(post.username, post.equippedCostumeId ? { costume: post.equippedCostumeId } : post.avatarConfig);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-[2.5rem] border bg-white border-vox-primary/5 shadow-xl shadow-blue-100/20 will-change-transform text-vox-navy`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-vox-primary/10 overflow-hidden border-2 border-vox-primary/20">
              <LazyLoadImage 
                src={avatarUrl} 
                alt="avatar" 
                effect="blur"
                wrapperClassName="w-full h-full"
                referrerPolicy="no-referrer"
              />
          </div>
          <div>
            <h4 className="font-black uppercase text-sm">{post.displayName}</h4>
            <p className="text-[10px] font-bold text-vox-slate uppercase">{formatTimestamp(post.timestamp)}</p>
          </div>
        </div>

        {(currentUser?.role === 'ADMIN' || currentUser?.username === post.username || currentUser?.username.toLowerCase() === '@superadmin') && (
          <button 
            onClick={() => onDelete(post.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-vox-primary text-white font-black text-[10px] uppercase shadow-lg shadow-vox-primary/20 hover:bg-red-500 transition-all active:scale-95"
          >
            <Trash2 size={12} /> Hapus
          </button>
        )}
      </div>

      <p className="text-lg mb-8 text-vox-navy font-medium leading-relaxed">{post.content}</p>

      <div className="flex gap-8 pt-6 border-t border-vox-bg">
        <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 text-xs font-bold transition-colors ${post.likes.includes(currentUser?.username || '') ? 'text-vox-primary' : 'text-vox-slate hover:text-vox-primary'}`}>
          <Heart size={16} fill={post.likes.includes(currentUser?.username || '') ? "currentColor" : "none"} /> {post.likes.length}
        </button>
        <button onClick={() => onCommentToggle(post.id)} className="flex items-center gap-2 text-xs font-bold text-vox-slate hover:text-vox-primary transition-colors">
          <MessageCircle size={16} /> {post.comments.length}
        </button>
      </div>

      <AnimatePresence>
        {isCommenting && (
          <div className="mt-6 pt-6 border-t border-vox-bg space-y-4">
            <div className="space-y-3">
              {post.comments.map((comment, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-vox-bg flex justify-between items-start group/comment">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-vox-primary mb-1">{comment.username}</p>
                    <p className="text-xs font-medium text-vox-navy">{comment.text}</p>
                  </div>
                  {(currentUser?.role === 'ADMIN' || currentUser?.username === comment.username) && (
                    <button 
                      onClick={() => onCommentDelete(post.id, comment)}
                      className="p-1 text-vox-slate hover:text-red-500 transition-colors opacity-0 group-hover/comment:opacity-100"
                      title="Hapus Komentar"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Tulis komentar..."
                className="flex-1 p-3 rounded-xl text-xs outline-none border-2 bg-vox-bg border-vox-primary/5 focus:border-vox-primary text-vox-navy transition-all"
              />
              <button 
                onClick={() => {
                   if (commentText.trim()) {
                     (window as any).handleCommentInternal?.(post.id, commentText);
                     setCommentText('');
                   }
                }} 
                className="p-3 bg-vox-primary text-white rounded-xl hover:bg-vox-accent shadow-md transition-all active:scale-95"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// Data awal untuk seeding jika database kosong
const INITIAL_POSTS: Post[] = [
  {
    id: 'seed-1',
    username: '@superadmin',
    displayName: 'Dekila (Admin)',
    content: 'Selamat datang di VoxCircle! Tempat di mana gagasan politik bertemu dengan inovasi. Mari berdiskusi dengan cerdas dan santun demi Indonesia Emas 2045.',
    timestamp: { toDate: () => new Date('2025-05-01T08:00:00Z') },
    likes: ['@hizkia', '@devina'],
    comments: [
      { username: '@warga_aktif', text: 'Keren banget platformnya!', timestamp: '2025-05-01T08:30:00Z' }
    ],
    role: 'ADMIN'
  },
  {
    id: 'seed-2',
    username: '@warga_politik',
    displayName: 'Andi Politika',
    content: 'Apa pendapat kalian tentang target pertumbuhan ekonomi 8%? Ambisius tapi menarik untuk dikawal!',
    timestamp: { toDate: () => new Date('2025-05-02T10:00:00Z') },
    likes: ['@superadmin'],
    comments: [],
    role: 'USER'
  },
  {
    id: 'seed-3',
    username: '@gen_emas',
    displayName: 'Siti Literasi',
    content: 'Digitalisasi birokrasi lewat INA Digital bakal jadi game changer buat kita yang males antre di kantor pemerintahan. Setuju?',
    timestamp: { toDate: () => new Date('2025-05-03T14:20:00Z') },
    likes: ['@superadmin', '@warga_politik'],
    comments: [],
    role: 'USER'
  }
];

const VoxCircle: React.FC<{ currentUser: User | null; isDarkMode: boolean }> = ({ currentUser, isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const isInitialLoadRef = useRef(true);

  // Ambil data postingan
  useEffect(() => {
    const path = 'posts';
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      
      // Jika kosong, pakai seed data
      if (fetchedPosts.length === 0) {
        fetchedPosts = INITIAL_POSTS;
      }
      
      setPosts(fetchedPosts);
      isInitialLoadRef.current = false;
    }, (error) => {
      // Offline fallback
      if (isInitialLoadRef.current) {
        setPosts(INITIAL_POSTS);
        isInitialLoadRef.current = false;
      }
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handlePost = async () => {
    if (!currentUser || !auth.currentUser) {
      alert("Silakan masuk untuk berdiskusi di VoxCircle.");
      (window as any).setActiveSection?.('dashboard'); 
      return;
    }
    if (!newPost.trim()) return;
    
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarConfig: null, // switch to costume system
        equippedCostumeId: currentUser.equippedCostumeId || 'justice_minister',
        content: newPost,
        timestamp: serverTimestamp(),
        likes: [],
        comments: [],
        role: currentUser.role,
        shares: 0,
        authorId: auth.currentUser.uid
      });
      setNewPost('');
    } catch (error) {
      console.error("Post error:", error);
      handleFirestoreError(error, OperationType.CREATE, 'posts');
    } finally {
      setIsPosting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      setPostToDelete(null);
      alert("Postingan berhasil dihapus!");
    } catch (error: any) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  const handleClearAll = async () => {
    setIsDeletingAll(true);
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);
      setIsDeletingAll(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'posts');
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) {
      alert("Silakan masuk untuk menyukai postingan.");
      (window as any).setActiveSection?.('dashboard');
      return;
    }
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.likes.includes(currentUser.username);
    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(currentUser.username) : arrayUnion(currentUser.username)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `posts/${postId}`);
    }
  };

  const handleComment = React.useCallback(async (postId: string, textOverride?: string) => {
    const finalCommentText = textOverride || commentText;
    if (!currentUser) {
      alert("Silakan masuk untuk berkomentar.");
      (window as any).setActiveSection?.('dashboard');
      return;
    }
    if (!finalCommentText.trim()) return;
    const postRef = doc(db, 'posts', postId);
    try {
      await updateDoc(postRef, {
        comments: arrayUnion({
          username: currentUser.username,
          text: finalCommentText,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `posts/${postId}`);
    }
    if (!textOverride) setCommentText('');
    setCommentingOn(null);
  }, [currentUser, commentText]);

  useEffect(() => {
    (window as any).handleCommentInternal = handleComment;
  }, [handleComment]);

  const handleDeleteComment = async (postId: string, comment: any) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        comments: arrayRemove(comment)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `posts/${postId}`);
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    return posts.filter(p => 
      p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.displayName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return (
    <div className={`max-w-4xl mx-auto py-20 px-6 ${isDarkMode ? '' : 'text-vox-navy'}`}>
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-vox-primary mb-4 tracking-tighter">VoxCircle</h2>
          {currentUser?.role === 'ADMIN' && (
            <button 
              onClick={() => setIsDeletingAll(true)}
              className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-vox-primary border border-vox-primary/20 px-3 py-1 rounded-lg hover:bg-vox-primary/5"
            >
              <Trash2 size={12} /> Clear All Feed (Admin)
            </button>
          )}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
          <input 
            type="text" 
            placeholder="Cari user..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none border-2 ${isDarkMode ? 'bg-vox-deep-ocean border-white/5 text-white' : 'bg-white border-vox-primary/10 text-vox-navy'}`}
          />
        </div>
      </div>

      {/* Post Input */}
      <div className="p-8 rounded-[2.5rem] border mb-12 bg-white shadow-2xl shadow-blue-200/20 border-vox-primary/5">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Apa pendapat politikmu hari ini?"
          className="w-full p-6 rounded-2xl outline-none border-2 transition-all h-32 bg-vox-bg border-vox-primary/10 focus:border-vox-primary text-vox-navy"
        />
        <div className="flex justify-end mt-4">
          <button 
            onClick={handlePost} 
            disabled={isPosting || !newPost.trim()}
            className={`bg-vox-emerald text-vox-navy px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-vox-primary hover:text-white transition-all shadow-lg shadow-vox-emerald/20 active:scale-95 ${isPosting ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isPosting ? 'Posting...' : <><Send size={16} className="inline mr-2" /> Post Sekarang</>}
          </button>
        </div>
      </div>

      {/* Feed Section */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <PostCard 
            key={post.id}
            post={post}
            currentUser={currentUser}
            isDarkMode={isDarkMode}
            onLike={handleLike}
            onCommentToggle={(id) => setCommentingOn(commentingOn === id ? null : id)}
            onCommentDelete={handleDeleteComment}
            onDelete={setPostToDelete}
            isCommenting={commentingOn === post.id}
          />
        ))}
      </div>

      {/* Admin Actions */}
      {currentUser?.role === 'ADMIN' && posts.length > 0 && (
        <div className="mt-12 p-8 rounded-[2.5rem] border-4 border-dashed border-vox-primary/20 bg-vox-primary/5 text-center">
          <h4 className="text-sm font-black uppercase mb-4">Admin Control</h4>
          <button 
            onClick={handleClearAll}
            disabled={isDeletingAll}
            className={`px-8 py-3 bg-vox-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-vox-accent shadow-lg shadow-vox-primary/20 transition-all ${isDeletingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDeletingAll ? 'Menghapus...' : 'Hapus Semua Postingan'}
          </button>
        </div>
      )}

      {/* Confirm Delete Popup */}
      <AnimatePresence>
        {postToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-zinc-950/80 backdrop-blur-sm">
            <div className={`p-8 rounded-[2rem] max-w-md w-full ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <h3 className="text-xl font-black mb-4">Hapus Postingan?</h3>
              <div className="flex gap-4">
                <button onClick={() => setPostToDelete(null)} className="flex-1 py-3 bg-zinc-200 rounded-xl font-black text-[10px] uppercase">Batal</button>
                <button onClick={() => handleDelete(postToDelete)} className="flex-1 py-3 bg-vox-primary text-white rounded-xl font-black text-[10px] uppercase">Ya, Hapus</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoxCircle;