
export const getAvatarUrl = (username: string, config?: any) => {
  const seed = username.replace('@', '');
  
  if (!config || !config.costume) {
    return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=f8fafc,f1f5f9&radius=20`;
  }

  const params = new URLSearchParams({
    seed: seed,
    backgroundColor: 'f8fafc,f1f5f9',
    radius: '20'
  });

  // Costume mappings for avataaars v9
  const costumeMap: any = {
    justice_minister: {
      clothing: 'blazerAndShirt',
      top: 'shortFlat',
      clothingColor: '1a1a1a',
      accessories: 'variant02',
      eyes: 'default',
      mouth: 'smile'
    },
    judge: {
      clothing: 'blazerAndShirt',
      top: 'frizzle',
      clothingColor: '000000',
      eyes: 'default',
      mouth: 'serious'
    },
    president: {
      clothing: 'blazerAndShirt',
      top: 'shortFlat',
      clothingColor: 'bd10e0',
      accessories: 'variant05',
      eyes: 'wink',
      mouth: 'smile'
    },
    activist: {
      clothing: 'hoodie',
      top: 'dreads',
      clothingColor: '65c9ff',
      eyes: 'surprised',
      mouth: 'smile'
    },
    general: {
      clothing: 'blazerAndShirt',
      top: 'theCaesar',
      clothingColor: '228b22',
      eyes: 'default',
      mouth: 'serious'
    },
    diplomat: {
      clothing: 'shirtVNeck',
      top: 'shortFlat',
      clothingColor: 'e0ac69',
      eyes: 'happy',
      mouth: 'smile'
    },
    prosecutor: {
      clothing: 'blazerAndShirt',
      top: 'frizzle',
      clothingColor: '721c24',
      eyes: 'default',
      mouth: 'serious'
    },
    senator: {
      clothing: 'blazerAndShirt',
      top: 'shortRound',
      clothingColor: '262e33',
      eyes: 'default',
      mouth: 'smile'
    },
    governor: {
      clothing: 'blazerAndShirt',
      top: 'shortFlat',
      clothingColor: 'f8fafc',
      accessories: 'variant04',
      eyes: 'happy',
      mouth: 'smile'
    },
    mayor: {
      clothing: 'shirtVNeck',
      top: 'shortWaved',
      clothingColor: '0ea5e9',
      eyes: 'happy',
      mouth: 'smile'
    },
    spokesperson: {
      clothing: 'blazerAndShirt',
      top: 'shortRound',
      clothingColor: 'f43f5e',
      eyes: 'wink',
      mouth: 'smile'
    },
    health_minister: {
      clothing: 'overall',
      top: 'shortFlat',
      clothingColor: 'ffffff',
      eyes: 'default',
      mouth: 'smile',
      accessories: 'variant02'
    },
    police_chief: {
      clothing: 'blazerAndShirt',
      top: 'theCaesar',
      clothingColor: '422006',
      eyes: 'default',
      mouth: 'serious'
    },
    expert: {
      clothing: 'blazerAndShirt',
      top: 'shortFlat',
      clothingColor: '475569',
      accessories: 'variant02',
      eyes: 'default',
      mouth: 'serious'
    },
    clerk: {
      clothing: 'shirtVNeck',
      top: 'shortFlat',
      clothingColor: '2dd4bf',
      eyes: 'default',
      mouth: 'smile'
    }
  };

  const selected = costumeMap[config.costume] || costumeMap.justice_minister;

  params.set('clothing', selected.clothing);
  params.set('top', selected.top);
  params.set('clothingColor', selected.clothingColor);
  if (selected.accessories) params.set('accessories', selected.accessories);
  if (selected.eyes) params.set('eyes', selected.eyes);
  if (selected.mouth) params.set('mouth', selected.mouth);

  return `https://api.dicebear.com/9.x/avataaars/svg?${params.toString()}`;
};
