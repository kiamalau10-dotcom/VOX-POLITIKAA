import {
  assertFails,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, updateDoc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

describe('VoxPolitika Firestore Security Rules', () => {
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'ai-studio-applet-webapp-7d9e5',
      firestore: {
        host: 'localhost',
        port: 8080,
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
  });

  const getUnauthenticatedContext = () => testEnv.unauthenticatedContext().firestore();
  const getAuthenticatedContext = (uid: string) => testEnv.authenticatedContext(uid).firestore();

  // --- ATTACK 1: Identity Spoofing ---
  it('Attack 1: Deny creating profile for another user', async () => {
    const db = getAuthenticatedContext('attacker_uid');
    const maliciousData = {
      username: 'target_user',
      displayName: 'Target',
      role: 'USER',
      uid: 'attacker_uid'
    };
    await assertFails(setDoc(doc(db, 'users', 'target_user'), maliciousData));
  });

  // --- ATTACK 2: Privilege Escalation ---
  it('Attack 2: Deny self-promoting to ADMIN', async () => {
    // Setup admin record first
    await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'users_by_uid', 'admin_uid'), { username: 'admin', role: 'ADMIN' });
    });

    const db = getAuthenticatedContext('user_uid');
    await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'users', 'user'), { username: 'user', role: 'USER', uid: 'user_uid' });
    });

    await assertFails(updateDoc(doc(db, 'users', 'user'), { role: 'ADMIN' }));
  });

  // --- ATTACK 3: Ghost Field Injection ---
  it('Attack 3: Deny shadow updates with ghost fields', async () => {
    const db = getAuthenticatedContext('user_uid');
    await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'users', 'user'), { username: 'user', role: 'USER', uid: 'user_uid', level: 1 });
    });

    await assertFails(updateDoc(doc(db, 'users', 'user'), { level: 100, ghostField: 'malicious' }));
  });

  // --- ATTACK 4: Post Hijacking ---
  it('Attack 4: Deny editing posts by others', async () => {
    const db = getAuthenticatedContext('attacker_uid');
    await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'posts', 'post1'), { authorId: 'victim_uid', content: 'Original' });
    });

    await assertFails(updateDoc(doc(db, 'posts', 'post1'), { content: 'Hacked' }));
  });

  // --- ATTACK 5: Resource Poisoning ---
  it('Attack 5: Deny oversized content', async () => {
    const db = getAuthenticatedContext('user_uid');
    const hugeContent = 'a'.repeat(3000); // Max is 2000 in rules
    const maliciousPost = {
      username: 'user',
      content: hugeContent,
      timestamp: serverTimestamp(),
      authorId: 'user_uid'
    };
    await assertFails(addDoc(collection(db, 'posts'), maliciousPost));
  });

  // --- ATTACK 6: ID Poisoning ---
  it('Attack 6: Deny malicious path variable IDs', async () => {
    const db = getAuthenticatedContext('user_uid');
    const maliciousId = 'bad-id-'.repeat(20);
    await assertFails(setDoc(doc(db, 'users', maliciousId), { username: 'user', uid: 'user_uid', role: 'USER' }));
  });

  // --- ATTACK 7: Stats Wipe ---
  it('Attack 7: Deny unauthorized global stats modification', async () => {
    const db = getAuthenticatedContext('user_uid');
    await assertFails(setDoc(doc(db, 'stats', 'global'), { totalUsers: 0 }));
  });

  // --- ATTACK 10: Anonymous Scraping ---
  it('Attack 10: Deny anonymous reading of user profiles', async () => {
    const db = getUnauthenticatedContext();
    await assertFails(getDoc(doc(db, 'users', 'any_user')));
  });

});
