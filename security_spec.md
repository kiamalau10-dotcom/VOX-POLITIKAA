# Firestore Security Specification - VoxPolitika

## 1. Data Invariants
- A **User** document (`/users/{username}`) must match the authenticated user's `uid`.
- A **UserByUid** document (`/users_by_uid/{uid}`) must accurately map the UID to the username for server-side role validation.
- A **Post** (`/posts/{postId}`) must have an `authorId` matching the creator's `uid`.
- **Global Stats** (`/stats/global`) can only be incremented/decremented by users performing specific actions (quiz completion, voting).
- **Admin Roles** cannot be self-assigned; they must be verified against the `users_by_uid` mapping.

## 2. The "Dirty Dozen" Payloads (Attacks)

### Attack 1: Identity Spoofing (User Creation)
- **Target:** `setDoc(doc(db, 'users', 'target_user'), { ...data, uid: 'attacker_uid' })`
- **Result:** `PERMISSION_DENIED` (User cannot create a profile for another username or spoof someone else's UID).

### Attack 2: Privilege Escalation (Self-Admin)
- **Target:** `updateDoc(doc(db, 'users', 'my_user'), { role: 'ADMIN' })`
- **Result:** `PERMISSION_DENIED` (Users cannot promote themselves to ADMIN).

### Attack 3: Ghost Field Injection (Shadow Update)
- **Target:** `updateDoc(doc(db, 'users', 'my_user'), { isAdmin: true, coins: 999999 })`
- **Result:** `PERMISSION_DENIED` (Strict field key tracking via `affectedKeys().hasOnly()`).

### Attack 4: Post Hijacking (Edit others' posts)
- **Target:** `updateDoc(doc(db, 'posts', 'others_post_id'), { content: 'Hacked!' })`
- **Result:** `PERMISSION_DENIED` (Only author can edit content).

### Attack 5: Like/Comment Flooding (Resource Exhaustion)
- **Target:** Sending a 1MB string as a comment.
- **Result:** `PERMISSION_DENIED` (Validation helper enforces `.size()` checks on all strings).

### Attack 6: ID Poisoning
- **Target:** `setDoc(doc(db, 'users', 'long_junk_id_1.5kb...'), { ... })`
- **Result:** `PERMISSION_DENIED` (isValidId() check on path variables).

### Attack 7: Global Stats Wipe
- **Target:** `setDoc(doc(db, 'stats', 'global'), { totalUsers: 0 })`
- **Result:** `PERMISSION_DENIED` (Only Admin can create/delete stats; updates are strictly limited to increments/specific fields).

### Attack 8: Orphaned Post Creation
- **Target:** `addDoc(collection(db, 'posts'), { authorId: 'non_existent_uid' })`
- **Result:** `PERMISSION_DENIED` (Validation helper ensures `authorId == request.auth.uid`).

### Attack 9: Immutable Field Mutation
- **Target:** `updateDoc(doc(db, 'users', 'my_user'), { username: 'new_username' })`
- **Result:** `PERMISSION_DENIED` (Username is immutable after creation).

### Attack 10: Anonymous Data Scraping
- **Target:** Listing all users without being logged in.
- **Result:** `PERMISSION_DENIED` (All read access requires `isSignedIn()`).

### Attack 11: Bulk User Deletion
- **Target:** `deleteDoc(doc(db, 'users', 'someone_else'))`
- **Result:** `PERMISSION_DENIED` (Non-admins can only delete their own profile).

### Attack 12: Fake Timestamp Injection
- **Target:** `addDoc(collection(db, 'posts'), { timestamp: '2000-01-01' })`
- **Result:** `PERMISSION_DENIED` (Validation helper enforces `timestamp is timestamp`).

## 3. Red Team Summary Table

| Collection | Identity Spoofing | State Shortcutting | Resource Poisoning |
| :--- | :--- | :--- | :--- |
| `users` | Blocked via `uid` check | Blocked via `affectedKeys` | Blocked via `.size()` |
| `users_by_uid` | Blocked via `isOwner` | Blocked via immutable `role` | Blocked via key check |
| `posts` | Blocked via `authorId` | Blocked via action-based `update` | Blocked via `.size()` |
| `stats` | Admin only create/delete | Restricted update keys | N/A (Admin only) |
