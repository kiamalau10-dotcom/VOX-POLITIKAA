import { useState, useEffect, useMemo } from 'react';
import { db, collection, query, where, onSnapshot, doc, deleteDoc, addDoc, serverTimestamp, getDocs } from '../firebase';

export const useFollowStatus = (currentUsername: string, targetUsername: string) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollower, setIsFollower] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (!currentUsername || !targetUsername) return;

    const followsRef = collection(db, 'follows');

    // Check if current user is following target
    const q1 = query(followsRef, where('followerId', '==', currentUsername), where('followingId', '==', targetUsername));
    const unsub1 = onSnapshot(q1, (snapshot) => {
      setIsFollowing(!snapshot.empty);
    });

    // Check if target user is following current user
    const q2 = query(followsRef, where('followerId', '==', targetUsername), where('followingId', '==', currentUsername));
    const unsub2 = onSnapshot(q2, (snapshot) => {
      setIsFollower(!snapshot.empty);
    });

    // Get target's follower count
    const q3 = query(followsRef, where('followingId', '==', targetUsername));
    const unsub3 = onSnapshot(q3, (snapshot) => {
      setFollowerCount(snapshot.size);
    });

    // Get target's following count
    const q4 = query(followsRef, where('followerId', '==', targetUsername));
    const unsub4 = onSnapshot(q4, (snapshot) => {
      setFollowingCount(snapshot.size);
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
    };
  }, [currentUsername, targetUsername]);

  const isFriends = useMemo(() => isFollowing && isFollower, [isFollowing, isFollower]);

  const toggleFollow = async () => {
    if (!currentUsername || !targetUsername || currentUsername === targetUsername) return;

    try {
      const followsRef = collection(db, 'follows');
      const q = query(followsRef, where('followerId', '==', currentUsername), where('followingId', '==', targetUsername));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // Unfollow
        const followDoc = snapshot.docs[0];
        await deleteDoc(doc(db, 'follows', followDoc.id));
      } else {
        // Follow
        await addDoc(followsRef, {
          followerId: currentUsername,
          followingId: targetUsername,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return { isFollowing, isFollower, isFriends, followerCount, followingCount, toggleFollow };
};
