
export const getAvatarUrl = (username: string, config?: any) => {
  if (!config) {
    return `https://api.dicebear.com/9.x/adventurer/svg?seed=${username.replace('@', '')}&backgroundColor=f8fafc,f1f5f9&radius=20`;
  }

  const params = new URLSearchParams({
    seed: username.replace('@', ''),
    flip: 'false',
    backgroundColor: 'f8fafc,f1f5f9',
    radius: '20'
  });

  const isMale = config.gender === 'male';
  const maleHairPool = ['short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09', 'short10'];
  const femaleHairPool = ['long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10'];
  const femaleShortHairPool = ['short01', 'short02', 'short05', 'short06', 'short09', 'short10']; // Pick more feminine short hairs if possible or just short hairs

  // Base features to differentiate gender
  if (isMale) {
    // Beard/Rougher features for male
    params.set('features', 'variant03'); 
    params.set('featuresProbability', '20');
    params.set('eyebrows', 'variant01,variant02,variant06,variant07,variant08,variant09');
  } else {
    // Eyelashes and feminine features for female
    params.set('features', 'variant02'); // eyelashes
    params.set('featuresProbability', '100');
    params.set('earringsProbability', '60');
    params.set('eyebrows', 'variant03,variant04,variant05,variant10,variant11,variant12,variant13,variant14,variant15');
  }

  if (config.hair === 'hijab') {
    params.set('hair', 'hijab01');
    params.set('hairProbability', '100');
    params.set('earringsProbability', '0'); // Hide earrings for hijab
  } else if (config.hair === 'long') {
    const pool = femaleHairPool;
    const idx = Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % pool.length;
    params.set('hair', pool[idx]);
    params.set('hairProbability', '100');
  } else if (config.hair === 'short' || config.hair === 'undercut') {
    const pool = isMale ? maleHairPool : femaleShortHairPool;
    const idx = Math.abs(username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) * 7) % pool.length;
    params.set('hair', pool[idx]);
    params.set('hairProbability', '100');
  }

  if (config.skin) {
    const skinMap: any = { light: 'fce5d8', medium: 'e0ac69', dark: '8d5524' };
    params.set('skinColor', skinMap[config.skin] || 'fce5d8');
  }

  if (config.eyes) {
    const eyesMap: any = { black: '000000', brown: '4b2e1e', blue: '2563eb' };
    params.set('eyesColor', eyesMap[config.eyes] || '000000');
  }

  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
};
