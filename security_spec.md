# Security Specification - VoxPolitika

## Data Invariants
1. A post must belong to a valid user (identified by `username`).
2. A user profile is identified by their unique `username`.
3. Admin roles can only be verified via the `users_by_uid` collection mapping.
4. Users can only modify their own profile and posts.

## The Dirty Dozen Payloads (Targeting Posts)
1. **The Identity Spoof**: Create a post with someone else's `username`.
2. **The Unauthorized Deletion**: Delete a post as an unauthenticated guest.
3. **The Ghost Field Update**: Update a post adding `isAdmin: true`.
4. **The Timestamp Override**: Create a post with a fake `timestamp` from the past.
5. **The Massive Payload**: Create a post with a 1MB `content` string.
6. **The Admin Escalation**: Try to update `users_by_uid` to set role to `ADMIN`.
7. **The Feedback Scraping**: Try to list `feedbacks` as a non-admin.
8. **The Settings Sabotage**: Try to update `settings/global` as a normal user.
9. **The PII Leak**: Try to read another user's email/sensitive info (if added).
10. **The Orphaned Post**: Create a post for a `username` that doesn't exist in `users`.
11. **The Negative Score**: Submit a `quiz_result` with score `-100`.
12. **The ID Poisoning**: Create a post with a `postId` that is a 1KB junk string.

## Test Strategy
- Ensure `allow read: if true` on `/posts/{postId}` is explicitly working even for unauthenticated users.
- Verify `isAdmin()` logic correctly fetches from `users_by_uid`.
- Enforce `isValidPost` on all writes.
