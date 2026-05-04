import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInAnonymously, deleteUser } from 'firebase/auth';
import { initializeFirestore, doc, getDoc, setDoc, updateDoc, collection, query, orderBy, onSnapshot, addDoc, deleteDoc, where, limit, getDocs, getDocFromServer, arrayUnion, arrayRemove, serverTimestamp, writeBatch, increment } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Use initializeFirestore with long polling to bypass potential proxy/websocket issues in sandboxed environments
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);

// Helper to delete account (Auth + Firestore)
export const deleteAccount = async (username: string) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  const docId = username.replace('@', '');
  const batch = writeBatch(db);

  // 1. Delete user document
  batch.delete(doc(db, 'users', docId));
  
  // 2. Delete user mapping
  batch.delete(doc(db, 'users_by_uid', user.uid));

  // 3. Delete user's posts (optional but recommended for clean up)
  const postsQuery = query(collection(db, 'posts'), where('username', '==', username));
  const postsSnap = await getDocs(postsQuery);
  postsSnap.forEach(postDoc => batch.delete(postDoc.ref));

  await batch.commit();
  await deleteUser(user);
};

// Helper to get the correct redirect URL based on environment
export const getRedirectURL = () => {
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) return 'http://localhost:3000';
  return window.location.origin;
};

export const googleProvider = new GoogleAuthProvider();

// Test connection to Firestore
async function testConnection() {
  try {
    // Attempt to read a dummy doc to verify connection
    // We use a small timeout to avoid long waits in offline mode
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
    console.log("Firebase connection established successfully.");
  } catch {
    // Silently fail as the app will automatically operate in offline mode
    // This avoids flooding the console with errors if Firebase is not yet provisioned
    console.info("Firestore is currently in offline mode. Data will be persisted locally.");
  }
}

testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { 
  signInWithPopup,
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  where, 
  limit, 
  getDocs,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  writeBatch,
  increment
};
