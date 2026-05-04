import React, { useState, useEffect, useMemo } from 'react';
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

const PostCard = React.memo(({ post, currentUser, isDarkMode, onLike, onCommentToggle, onCommentDelete, onDelete, isCommenting }: {
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

  const avatarUrl = getAvatarUrl(post.username, post.avatarConfig);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-8 rounded-[2.5rem] border ${isDarkMode ? 'bg-zinc-900/30 border-white/5' : 'bg-white border-black/5 shadow-xl'} will-change-transform`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600/10 overflow-hidden border-2 border-red-600/20">
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
            <p className="text-[10px] font-bold opacity-40 uppercase">{formatTimestamp(post.timestamp)}</p>
          </div>
        </div>

        {(currentUser?.role === 'ADMIN' || currentUser?.username === post.username || currentUser?.username.toLowerCase() === '@superadmin') && (
          <button 
            onClick={() => onDelete(post.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-black text-[10px] uppercase shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all active:scale-95"
          >
            <Trash2 size={12} /> Hapus
          </button>
        )}
      </div>

      <p className={`text-lg mb-8 ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{post.content}</p>

      <div className="flex gap-8 pt-6 border-t border-white/5">
        <button onClick={() => onLike(post.id)} className={`flex items-center gap-2 text-xs font-bold ${post.likes.includes(currentUser?.username || '') ? 'text-red-600' : 'opacity-50'}`}>
          <Heart size={16} /> {post.likes.length}
        </button>
        <button onClick={() => onCommentToggle(post.id)} className="flex items-center gap-2 text-xs font-bold opacity-50">
          <MessageCircle size={16} /> {post.comments.length}
        </button>
      </div>

      <AnimatePresence>
        {isCommenting && (
          <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
            <div className="space-y-3">
              {post.comments.map((comment, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/5 flex justify-between items-start group/comment">
                  <div className="flex-1">
                    <p className="text-[10px] font-black uppercase text-red-600 mb-1">{comment.username}</p>
                    <p className="text-xs font-medium">{comment.text}</p>
                  </div>
                  {(currentUser?.role === 'ADMIN' || currentUser?.username === comment.username) && (
                    <button 
                      onClick={() => onCommentDelete(post.id, comment)}
                      className="p-1 text-zinc-400 hover:text-red-600 transition-colors opacity-0 group-hover/comment:opacity-100"
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
                className={`flex-1 p-3 rounded-xl text-xs outline-none border-2 transition-all ${isDarkMode ? 'bg-black border-white/5 focus:border-red-600' : 'bg-gray-50 border-black/5 focus:border-red-600'}`}
              />
              <button 
                onClick={() => {
                   if (commentText.trim()) {
                     // Pass the comment text up or handle here
                     (window as any).handleCommentInternal?.(post.id, commentText);
                     setCommentText('');
                   }
                }} 
                className="p-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all"
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

const VoxCircle: React.FC<{ currentUser: User | null; isDarkMode: boolean }> = ({ currentUser, isDarkMode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentingOn, setCommentingOn] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // Ambil data postingan
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
      // Only handle error if it's not a permission error during initial load for guests
      if (currentUser) {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handlePost = async () => {
    if (!newPost.trim() || !currentUser) return;
    
    setIsPosting(true);
    try {
      await addDoc(collection(db, 'posts'), {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarConfig: currentUser.avatarConfig || null,
        content: newPost,
        timestamp: serverTimestamp(),
        likes: [],
        comments: [],
        role: currentUser.role,
        shares: 0,
        authorId: currentUser.uid || 'unauthenticated'
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
      console.error("GAGAL HAPUS DARI FIREBASE:", error);
      alert("Gagal hapus: " + error.message);
      setPostToDelete(null);
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
      console.error("Gagal hapus feed:", error);
      setIsDeletingAll(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;
    const postRef = doc(db, 'posts', postId);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const isLiked = post.likes.includes(currentUser.username);
    await updateDoc(postRef, {
      likes: isLiked ? arrayRemove(currentUser.username) : arrayUnion(currentUser.username)
    });
  };

  const handleComment = React.useCallback(async (postId: string, textOverride?: string) => {
    const finalCommentText = textOverride || commentText;
    if (!finalCommentText.trim() || !currentUser) return;
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: arrayUnion({
        username: currentUser.username,
        text: finalCommentText,
        timestamp: new Date().toISOString()
      })
    });
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
    <div className="max-w-4xl mx-auto py-20 px-6">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase italic text-red-600 mb-4 tracking-tighter">VoxCircle</h2>
          {currentUser?.role === 'ADMIN' && (
            <button 
              onClick={() => setIsDeletingAll(true)}
              className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-red-600 border border-red-600/20 px-3 py-1 rounded-lg hover:bg-red-600/5"
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
            className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none border-2 ${isDarkMode ? 'bg-zinc-900 border-white/5' : 'bg-white border-black/5'}`}
          />
        </div>
      </div>

      {/* Post Input */}
      <div className={`p-8 rounded-[2.5rem] border mb-12 ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white shadow-2xl shadow-black/5'}`}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Apa pendapat politikmu hari ini?"
          className={`w-full p-6 rounded-2xl outline-none border-2 transition-all h-32 ${isDarkMode ? 'bg-black border-white/10 focus:border-red-600' : 'bg-zinc-50 border-zinc-100 focus:border-red-600'}`}
        />
        <div className="flex justify-end mt-4">
          <button 
            onClick={handlePost} 
            disabled={isPosting || !newPost.trim()}
            className={`bg-red-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all ${isPosting ? 'opacity-50 cursor-wait' : ''}`}
          >
            {isPosting ? 'Posting...' : <><Send size={16} className="inline mr-2" /> Post</>}
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
        <div className="mt-12 p-8 rounded-[2.5rem] border-4 border-dashed border-red-600/20 bg-red-600/5 text-center">
          <h4 className="text-sm font-black uppercase mb-4">Admin Control</h4>
          <button 
            onClick={handleClearAll}
            disabled={isDeletingAll}
            className={`px-8 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-600/20 transition-all ${isDeletingAll ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isDeletingAll ? 'Menghapus...' : 'Hapus Semua Postingan'}
          </button>
        </div>
      )}

      {/* Confirm Delete Popup */}
      <AnimatePresence>
        {postToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <div className={`p-8 rounded-[2rem] max-w-md w-full ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <h3 className="text-xl font-black mb-4">Hapus Postingan?</h3>
              <div className="flex gap-4">
                <button onClick={() => setPostToDelete(null)} className="flex-1 py-3 bg-zinc-200 rounded-xl font-black text-[10px] uppercase">Batal</button>
                <button onClick={() => handleDelete(postToDelete)} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-black text-[10px] uppercase">Ya, Hapus</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoxCircle;