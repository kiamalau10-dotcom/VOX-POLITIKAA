import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';

interface AvatarLabProps {
  currentUser: any;
  onUpdateUser: (user: any) => void;
  isDarkMode: boolean;
  onClose: () => void;
}

const VOX_TITLES = [
  { id: 'none', label: 'Warga Biasa' },
  { id: 'presiden', label: 'Presiden Vox' },
  { id: 'menteri_kehutanan', label: 'Menteri Kehutanan Vox' },
  { id: 'menteri_pendidikan', label: 'Menteri Pendidikan Vox' },
  { id: 'menteri_keuangan', label: 'Menteri Keuangan Vox' },
  { id: 'menteri_pertahanan', label: 'Menteri Pertahanan Vox' },
  { id: 'menteri_kesehatan', label: 'Menteri Kesehatan Vox' },
  { id: 'menteri_sosial', label: 'Menteri Sosial Vox' },
  { id: 'menteri_perdagangan', label: 'Menteri Perdagangan Vox' },
  { id: 'menteri_hukum', label: 'Menteri Hukum Vox' },
];

const COSTUMES = [
  { id: 'none', label: 'Casual Tee', price: 0, icon: '👕' },
  { id: 'batik_modern', label: 'Batik Modern', price: 500, icon: '👔' },
  { id: 'formal_suit', label: 'Executive Suit', price: 1200, icon: '🧥' },
  { id: 'traditional_java', label: 'Beskap Jawa', price: 1500, icon: '👘' },
  { id: 'traditional_bali', label: 'Payas Agung', price: 1500, icon: '👑' },
  { id: 'democracy_jacket', label: 'Vox Jacket', price: 800, icon: '🧥' },
  { id: 'judge', label: 'Judge', price: 2000, icon: '👨‍⚖️' },
  { id: 'president', label: 'President', price: 2500, icon: '🤵' },
  { id: 'funny_candidate', label: 'Funny Candidate', price: 1000, icon: '🤡' },
  { id: 'cool_judge', label: 'Cool Judge', price: 2200, icon: '😎⚖️' },
];

const AVATAR_OPTIONS = {
  gender: [
    { id: 'male', label: 'Male', price: 0 },
    { id: 'female', label: 'Female', price: 0 },
  ],
  skin: [
    { id: 'light', label: 'Light', color: '#fce5d8', price: 0 },
    { id: 'medium', label: 'Medium', color: '#e0ac69', price: 0 },
    { id: 'dark', label: 'Dark', color: '#8d5524', price: 0 },
  ],
  hair: [
    { id: 'short', label: 'Short', price: 0 },
    { id: 'long', label: 'Long', price: 100 },
    { id: 'undercut', label: 'Undercut', price: 200 },
    { id: 'hijab', label: 'Hijab', price: 0 },
  ],
  eyes: [
    { id: 'black', label: 'Black', color: '#000000', price: 0 },
    { id: 'brown', label: 'Brown', color: '#4b2e1e', price: 50 },
    { id: 'blue', label: 'Blue', color: '#2563eb', price: 150 },
  ]
};

const Avatar2D = ({ username }: { username: string, config: any, costumeId: string }) => {
  // Use DiceBear Adventurer for a 2D anime/animated look
  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}&backgroundColor=f8fafc,f1f5f9&radius=20`;

  return (
    <div className="w-64 h-64 relative">
      <motion.img
        key={username + costumeId}
        src={avatarUrl}
        alt="Avatar Preview"
        className="w-full h-full object-contain drop-shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
        }}
      />
      {/* Animated Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 text-4xl"
      >
        ✨
      </motion.div>
    </div>
  );
};

const AvatarLab: React.FC<AvatarLabProps> = ({ currentUser, onUpdateUser, isDarkMode, onClose }) => {
  const isAdmin = currentUser.username === 'super admin' || currentUser.displayName === 'Dekila';
  const userCoins = isAdmin ? Infinity : (currentUser.coins || 0);

  const [config, setConfig] = useState(currentUser.avatarConfig || {
    gender: 'male',
    skin: 'light',
    hair: 'short',
    eyes: 'black',
  });
  const [equippedCostumeId, setEquippedCostumeId] = useState(currentUser.equippedCostumeId || 'none');
  const [voxTitle, setVoxTitle] = useState(currentUser.voxTitle || 'none');

  const handleSelect = (category: string, option: any) => {
    if (!isAdmin && option.price > userCoins) {
      alert("VoxCoins tidak cukup!");
      return;
    }
    setConfig({ ...config, [category]: option.id });
  };

  const handleEquipCostume = (costume: any) => {
    if (!isAdmin && costume.price > userCoins) {
      alert("VoxCoins tidak cukup!");
      return;
    }
    setEquippedCostumeId(costume.id);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      avatarConfig: config,
      equippedCostumeId: equippedCostumeId,
      voxTitle: voxTitle === 'none' ? undefined : VOX_TITLES.find(t => t.id === voxTitle)?.label,
      // Deduct coins if not admin (simplified logic for demo)
      coins: isAdmin ? currentUser.coins : (currentUser.coins || 0)
    };
    onUpdateUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`relative w-full max-w-6xl h-[85vh] rounded-[3rem] border overflow-hidden flex flex-col md:flex-row ${
          isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'
        }`}
      >
        {/* 2D Preview Area */}
        <div className={`flex-1 relative border-r flex items-center justify-center ${
          isDarkMode ? 'bg-black/50 border-white/5' : 'bg-zinc-50 border-black/5'
        }`}>
          <Avatar2D username={currentUser.username} config={config} costumeId={equippedCostumeId} />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <h2 className="text-3xl font-black uppercase italic text-red-600 tracking-tighter">Avatar Lab 2.0</h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.3em] mt-1">2D Identity System</p>
            {voxTitle !== 'none' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs font-black bg-red-600 text-white px-4 py-1 rounded-full uppercase tracking-widest"
              >
                {VOX_TITLES.find(t => t.id === voxTitle)?.label}
              </motion.p>
            )}
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg shadow-red-600/20">
            <span className="font-black">🪙 {isAdmin ? '∞' : (currentUser.coins || 0)}</span>
            <span className="text-[8px] font-black uppercase opacity-70">VoxCoins</span>
          </div>
        </div>

        {/* Customization Area */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-red-600" size={20} />
              <h3 className="font-black uppercase tracking-widest text-sm">Identity & Wardrobe</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-600/10 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(AVATAR_OPTIONS).map(([category, options]) => (
                <div key={category}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((opt: any) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(category, opt)}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                          config[category] === opt.id
                            ? 'border-red-600 bg-red-600/5'
                            : isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-zinc-50'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                        {opt.price > 0 && <span className="text-[8px] text-red-500">🪙{opt.price}</span>}
                        {config[category] === opt.id && <Check size={10} className="text-red-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Costumes */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Wardrobe Collection</h4>
              <div className="grid grid-cols-2 gap-4">
                {COSTUMES.map((costume) => (
                  <button
                    key={costume.id}
                    onClick={() => handleEquipCostume(costume)}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                      equippedCostumeId === costume.id
                        ? 'border-red-600 bg-red-600/5'
                        : isDarkMode ? 'border-white/5 bg-white/5 hover:border-white/20' : 'border-black/5 bg-zinc-50 hover:border-black/20'
                    }`}
                  >
                    <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-2xl">
                      {costume.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase mb-1">{costume.label}</p>
                      {costume.price > 0 && (
                        <p className="text-[10px] font-black text-red-600">🪙 {costume.price}</p>
                      )}
                    </div>
                    {equippedCostumeId === costume.id ? (
                      <span className="text-[8px] font-black bg-red-600 text-white px-2 py-1 rounded-full uppercase">Equipped</span>
                    ) : (
                      <span className="text-[8px] font-black opacity-30 uppercase">Select</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Vox Titles */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Vox Titles (Jabatan)</h4>
              <div className="grid grid-cols-2 gap-2">
                {VOX_TITLES.map((title) => (
                  <button
                    key={title.id}
                    onClick={() => setVoxTitle(title.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      voxTitle === title.id
                        ? 'border-red-600 bg-red-600/5'
                        : isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-zinc-50'
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-wider">{title.label}</p>
                    {voxTitle === title.id && <Check size={10} className="text-red-600 mt-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/5">
            <button 
              onClick={handleSave}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-95 shadow-2xl shadow-red-600/30"
            >
              Confirm Identity
            </button>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AvatarLab;
