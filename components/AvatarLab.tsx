import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';
import { getAvatarUrl } from '../services/avatarService';

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
  { id: 'justice_minister', label: 'Menteri Keadilan', price: 0, icon: '⚖️' },
  { id: 'judge', label: 'Hakim Agung', price: 1000, icon: '👨‍⚖️' },
  { id: 'prosecutor', label: 'Jaksa Agung', price: 1200, icon: '💼' },
  { id: 'senator', label: 'Anggota DPR', price: 800, icon: '🏛️' },
  { id: 'governor', label: 'Gubernur Polos', price: 1500, icon: '🎖️' },
  { id: 'mayor', label: 'Walikota Vox', price: 1000, icon: '🏢' },
  { id: 'police_chief', label: 'Kapolda Vox', price: 1800, icon: '👮' },
  { id: 'health_minister', label: 'Menteri Kesehatan', price: 1500, icon: '🏥' },
  { id: 'spokesperson', label: 'Juru Bicara', price: 700, icon: '🗣️' },
  { id: 'expert', label: 'Ahli Tata Negara', price: 1000, icon: '📚' },
  { id: 'clerk', label: 'Staf Ahli', price: 400, icon: '✍️' },
  { id: 'president', label: 'Presiden Vox', price: 2500, icon: '🇮🇩' },
  { id: 'activist', label: 'Aktivis Muda', price: 500, icon: '📣' },
  { id: 'general', label: 'Panglima Keamanan', price: 2000, icon: '🎖️' },
  { id: 'diplomat', label: 'Diplomat Senior', price: 1500, icon: '🌍' },
];

const Avatar2D = ({ username, config }: { username: string, config: any }) => {
  const avatarUrl = getAvatarUrl(username, config);
  const costume = COSTUMES.find(c => c.id === config.costume);
  const [currentUrl, setCurrentUrl] = useState(avatarUrl);
  const [isChanging, setIsChanging] = useState(false);

  // Smooth transition for URLs
  React.useEffect(() => {
    if (avatarUrl !== currentUrl) {
      setIsChanging(true);
      const img = new Image();
      img.src = avatarUrl;
      img.onload = () => {
        setCurrentUrl(avatarUrl);
        setIsChanging(false);
      };
      // Timeout fallback to prevent stuck states
      const timeout = setTimeout(() => setIsChanging(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [avatarUrl, currentUrl]);

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-blue-600/20 blur-[80px] rounded-full" />
      
      <div className="relative w-56 h-56 rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-600 to-blue-900 border-4 border-white/20 shadow-2xl">
        {isChanging && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <motion.img
          src={currentUrl}
          alt="Avatar Preview"
          className={`w-full h-full object-contain scale-110 translate-y-4 transition-all duration-500 ${isChanging ? 'opacity-40 grayscale blur-[2px]' : 'opacity-100'}`}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
          }}
        />
        
        {/* Costume Badge/Overlay if needed */}
        {costume && (
          <div className="absolute top-4 right-4 text-2xl drop-shadow-lg scale-150 rotate-12">
            {costume.icon}
          </div>
        )}
      </div>

      {/* Floating Particles */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute -top-6 -right-6 text-4xl"
      >
        ✨
      </motion.div>
    </div>
  );
};

const AvatarLab: React.FC<AvatarLabProps> = ({ currentUser, onUpdateUser, onClose }) => {
  const isAdmin = currentUser.role === 'ADMIN' || 
                  currentUser.username.toLowerCase().includes('admin');
                  
  const userCoins = isAdmin ? 9999999 : (currentUser.coins || 0);
  const ownedItems = currentUser.ownedItems || [];

  const [equippedCostumeId, setEquippedCostumeId] = useState(currentUser.equippedCostumeId || 'justice_minister');
  const [voxTitle, setVoxTitle] = useState(currentUser.voxTitle || 'none');

  const isItemOwned = (id: string, price: number) => {
    if (price === 0 || isAdmin) return true;
    return ownedItems.includes(id);
  };

  const calculateTotalCost = () => {
    if (isAdmin) return 0;
    let total = 0;
    
    // Check costume
    const costume = COSTUMES.find(c => c.id === equippedCostumeId);
    if (costume && costume.price > 0 && !isItemOwned(costume.id, costume.price)) {
      total += costume.price;
    }

    return total;
  };

  const handleEquipCostume = (costume: any) => {
    setEquippedCostumeId(costume.id);
  };

  const handleSave = () => {
    const totalCost = calculateTotalCost();
    
    if (!isAdmin && totalCost > userCoins) {
      alert(`VoxCoins tidak cukup! Total biaya: 🪙${totalCost}. Anda punya: 🪙${userCoins}`);
      return;
    }

    // Collect newly purchased items
    const newPurchases: string[] = [];
    const costume = COSTUMES.find(c => c.id === equippedCostumeId);
    if (costume && costume.price > 0 && !isItemOwned(costume.id, costume.price)) {
      newPurchases.push(costume.id);
    }

    const updatedUser = {
      ...currentUser,
      equippedCostumeId: equippedCostumeId,
      avatarConfig: undefined, // Clear legacy config to force costume system
      voxTitle: voxTitle === 'none' ? undefined : (VOX_TITLES.find(t => t.id === voxTitle)?.label || voxTitle),
      coins: isAdmin ? currentUser.coins : (currentUser.coins || 0) - totalCost,
      ownedItems: Array.from(new Set([...ownedItems, ...newPurchases]))
    };

    onUpdateUser(updatedUser);
    onClose();
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-6xl h-[85vh] rounded-[3rem] border overflow-hidden flex flex-col md:flex-row bg-white border-vox-navy/10 text-vox-navy"
      >
        {/* 2D Preview Area */}
        <div className="flex-1 relative border-r flex items-center justify-center bg-vox-bg border-vox-navy/5">
          <Avatar2D username={currentUser.username} config={{ costume: equippedCostumeId }} />

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <h2 className="text-3xl font-black uppercase italic text-blue-600 tracking-tighter">Avatar Lab 2.0</h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.3em] mt-1">Cabinet Style System</p>
            {voxTitle !== 'none' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-xs font-black bg-blue-600 text-white px-4 py-1 rounded-full uppercase tracking-widest"
              >
                {VOX_TITLES.find(t => t.id === voxTitle)?.label}
              </motion.p>
            )}
          </div>

          <div className="absolute top-8 left-8 flex flex-col gap-2">
            <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg shadow-blue-600/20">
              <span className="font-black">🪙 {isAdmin ? '∞' : (currentUser.coins || 0)}</span>
              <span className="text-[8px] font-black uppercase opacity-70">VoxCoins</span>
            </div>
            {totalCost > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-yellow-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg"
              >
                Biaya Kostum: 🪙{totalCost}
              </motion.div>
            )}
          </div>
        </div>

        {/* Customization Area */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-blue-600" size={20} />
              <h3 className="font-black uppercase tracking-widest text-sm">Pilih Kostum Jabatan</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-blue-600/10 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Costumes */}
            <div>
              <div className="grid grid-cols-2 gap-4">
                {COSTUMES.map((costume) => {
                  const owned = isItemOwned(costume.id, costume.price);
                  return (
                    <button
                      key={costume.id}
                      onClick={() => handleEquipCostume(costume)}
                      className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                        equippedCostumeId === costume.id
                          ? 'border-blue-600 bg-blue-600/5'
                          : 'border-vox-navy/5 bg-vox-bg hover:border-vox-primary/50'
                      }`}
                    >
                      <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-3xl">
                        {costume.icon}
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase mb-1">{costume.label}</p>
                        {!owned && costume.price > 0 && (
                          <p className="text-[10px] font-black text-blue-600">🪙 {costume.price}</p>
                        )}
                        {owned && costume.price > 0 && (
                          <p className="text-[10px] font-black text-green-500 uppercase">Owned</p>
                        )}
                        {costume.price === 0 && (
                          <p className="text-[10px] font-black opacity-30 uppercase">Gratis</p>
                        )}
                      </div>
                      {equippedCostumeId === costume.id ? (
                        <span className="text-[8px] font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase">Dipakai</span>
                      ) : (
                        <span className="text-[8px] font-black opacity-30 uppercase tracking-widest">Pilih</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vox Titles */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Gelar Kehormatan (Titles)</h4>
              <div className="grid grid-cols-2 gap-2">
                {VOX_TITLES.map((title) => (
                  <button
                    key={title.id}
                    onClick={() => setVoxTitle(title.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      voxTitle === title.id
                        ? 'border-blue-600 bg-blue-600/5'
                        : 'border-vox-navy/5 bg-vox-bg'
                    }`}
                  >
                    <p className="text-[10px] font-black uppercase tracking-wider">{title.label}</p>
                    {voxTitle === title.id && <Check size={10} className="text-blue-600 mt-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/5">
            <button 
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all active:scale-95 shadow-2xl shadow-blue-600/30"
            >
              {totalCost > 0 ? `Beli & Simpan (🪙${totalCost})` : 'Simpan Identitas'}
            </button>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AvatarLab;
