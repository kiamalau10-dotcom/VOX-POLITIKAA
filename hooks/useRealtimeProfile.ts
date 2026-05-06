import { useState, useEffect } from 'react';
import { db, auth, doc, onSnapshot, collection, query, where, orderBy, limit, handleFirestoreError, OperationType } from '../firebase';
import { User } from '../types';

export const useRealtimeProfile = (username: string) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(() => !!username && !!auth.currentUser);

  useEffect(() => {
    if (!username || !auth.currentUser) {
      return;
    }

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
      handleFirestoreError(error, OperationType.GET, `users/${docId}`);
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
      handleFirestoreError(error, OperationType.GET, 'posts');
    });

    return () => {
      unsubProfile();
      unsubPosts();
    };
  }, [username]);

  return { profile, posts, loading };
};
