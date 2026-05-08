
export const getAvatarUrl = (username: string) => {
  // Use a consistent 'adventurer' theme for a unified political identity look
  const seed = username.replace('@', '').toLowerCase();
  
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seed}&backgroundColor=f8fafc,f1f5f9&radius=20`;
};
