import { useState, useEffect } from 'react';
import { db, doc, onSnapshot, collection, query, where, orderBy, limit } from '../firebase';
import { User } from '../types';

export const useRealtimeProfile = (username: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    // Listen to profile changes
    const docId = username.replace('@', '');
    const userRef = doc(db, 'users', docId);
    const unsubProfile = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as User);
      } else {
        setProfile(null);
      }
      setLoading(false);
    }, (error) => {
      console.warn("Profile fetch error:", error);
      setLoading(false);
    });

    // Listen to user's posts
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('username', '==', username), orderBy('timestamp', 'desc'), limit(50));
    const unsubPosts = onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(fetchedPosts);
    }, (error) => {
      console.warn("User posts fetch error:", error);
    });

    return () => {
      unsubProfile();
      unsubPosts();
    };
  }, [username]);

  return { profile, posts, loading };
};
