import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldCheck, Lock } from 'lucide-react';
import { POLITICAL_BADGES } from '../constants';
import { getAvatarUrl } from '../services/avatarService';

interface AvatarLabProps {
  currentUser: any;
  onUpdateUser: (user: any) => void;
  onClose: () => void;
}

const AvatarLab: React.FC<AvatarLabProps> = ({ currentUser, onUpdateUser, onClose }) => {
  const isAdmin = currentUser.role === 'ADMIN' || 
                  currentUser.username.toLowerCase().includes('admin') || 
                  currentUser.displayName === 'Dekila';
                  
  const [ownedBadgeIds, setOwnedBadgeIds] = useState<string[]>(currentUser.ownedItems || ['simpatisan']);
  const [currentCoins, setCurrentCoins] = useState(currentUser.coins || 0);
  const [activeBadgeId, setActiveBadgeId] = useState(currentUser.voxTitle || 'simpatisan');
  const [confirmingBadge, setConfirmingBadge] = useState<any | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const isBadgeOwned = (badgeId: string) => {
    if (isAdmin) return true;
    return ownedBadgeIds.includes(badgeId);
  };

  const currentBadge = POLITICAL_BADGES.find(b => b.id === activeBadgeId) || POLITICAL_BADGES[0];

  const handlePurchaseOrEquip = (badge: any) => {
    const owned = isBadgeOwned(badge.id);

    if (owned) {
      setActiveBadgeId(badge.id);
      return;
    }

    const price = badge.price;
    const effectiveCoins = isAdmin ? 9999999 : currentCoins;

    if (effectiveCoins < price) {
      alert(`VP Coins tidak cukup! Harga ${badge.title} adalah 🪙${price}. Anda punya: 🪙${effectiveCoins}`);
      return;
    }

    setConfirmingBadge(badge);
  };

  const executePurchase = async () => {
    if (!confirmingBadge) return;
    
    setIsProcessing(true);
    const badge = confirmingBadge;
    
    try {
      const newOwnedItems = Array.from(new Set([...ownedBadgeIds, badge.id]));
      const newCoins = isAdmin ? currentCoins : currentCoins - badge.price;
      
      const updatedUser = {
        ...currentUser,
        voxTitle: badge.id,
        coins: newCoins,
        ownedItems: newOwnedItems
      };
      
      // Update local state first for instant feedback
      setOwnedBadgeIds(newOwnedItems);
      setCurrentCoins(newCoins);
      setActiveBadgeId(badge.id);
      
      // Notify parent/sync to DB
      await onUpdateUser(updatedUser);
      
      setConfirmingBadge(null);
      // Small delay for effect
      setTimeout(() => {
        setIsProcessing(false);
      }, 500);
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Terjadi kesalahan saat memproses pembelian. Silakan coba lagi.");
      setIsProcessing(false);
    }
  };

  const handleApplyChanges = () => {
    const updatedUser = {
      ...currentUser,
      voxTitle: activeBadgeId,
      ownedItems: ownedBadgeIds, // Ensure we send the latest owned items
      coins: currentCoins,
    };
    onUpdateUser(updatedUser);
    onClose();
  };

  // Group badges by ring
  const rings = Array.from(new Set(POLITICAL_BADGES.map(b => b.ring)));

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-[2rem] md:rounded-[3rem] border overflow-hidden flex flex-col md:flex-row bg-white border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
      >
        {/* Left: Preview Area */}
        <div className="md:w-1/3 relative border-b md:border-b-0 md:border-r flex flex-col items-center justify-center bg-zinc-50 border-black/5 p-8">
          <div className="w-48 h-48 md:w-64 md:h-64 relative mb-8">
            <motion.img
              key={currentUser.username}
              src={getAvatarUrl(currentUser.username)}
              alt="Avatar Preview"
              className="w-full h-full object-contain drop-shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-2xl shadow-lg border-4 border-white transform rotate-12">
              <span className="text-3xl">{currentBadge.icon}</span>
            </div>
          </div>

          <div className="text-center w-full">
            <h2 className="text-2xl font-black uppercase italic text-slate-900 tracking-tighter mb-1">Political Identity</h2>
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mb-6">badge & Gelar Lab yang dipilih oleh user</p>
            
            <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-900/20 text-left border-b-4 border-slate-950">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{currentBadge.icon}</span>
                <div>
                  <h3 className="font-black uppercase italic leading-none">{currentBadge.title}</h3>
                  <p className="text-[8px] font-bold uppercase opacity-50 tracking-widest mt-1">{currentBadge.ring}</p>
                </div>
              </div>
              <p className="text-xs font-medium leading-relaxed opacity-80 border-t border-white/10 pt-3">
                "{currentBadge.description}"
              </p>
            </div>
          </div>

          <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white/20">
              <span className="font-black text-sm">🪙 {isAdmin ? '∞' : currentCoins}</span>
              <span className="text-[8px] font-black uppercase opacity-60 tracking-wider">VP COIN</span>
            </div>
          </div>
        </div>

        {/* Right: Selection Area */}
        <div className="md:w-2/3 flex flex-col h-full bg-white relative">
          <div className="p-6 md:p-8 border-b border-black/5 flex justify-between items-center bg-white/50 sticky top-0 z-10 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-slate-900" size={24} />
              <h3 className="font-black uppercase tracking-widest text-sm">Pilih Gelar & Badge</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-900/10 rounded-xl transition-all">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-12 custom-scrollbar">
            {rings.map((ring) => (
              <div key={ring} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">{ring}</h4>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {POLITICAL_BADGES.filter(b => b.ring === ring).map((badge) => {
                    const owned = isBadgeOwned(badge.id);
                    const isActive = activeBadgeId === badge.id;
                    
                    return (
                      <button
                        key={badge.id}
                        onClick={() => handlePurchaseOrEquip(badge)}
                        className={`group relative p-5 rounded-3xl border-2 transition-all duration-300 text-left flex items-start gap-4 ${
                          isActive 
                            ? 'border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20' 
                            : 'border-black/5 bg-zinc-50 hover:border-slate-200 hover:bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'bg-white/20' : 'bg-slate-100'
                        }`}>
                          {badge.icon}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1 gap-2">
                            <h5 className="font-black uppercase text-xs truncate leading-none">{badge.title}</h5>
                            {!owned && !isAdmin && (
                              <div className="flex items-center gap-1 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded-full text-[8px] font-black">
                                🪙{badge.price}
                              </div>
                            )}
                            {owned && !isActive && <Check size={12} className="text-green-500" />}
                            {owned && isActive && <Check size={12} className="text-white" />}
                          </div>
                          <p className={`text-[10px] leading-snug line-clamp-2 ${isActive ? 'opacity-70' : 'opacity-40'}`}>
                            {badge.description}
                          </p>
                        </div>

                        {!owned && !isAdmin && (
                          <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-white text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg flex items-center gap-2">
                              <Lock size={12} /> Beli dengan 🪙{badge.price}
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8 border-t border-black/5 bg-zinc-50/50 backdrop-blur-md">
            <button 
              onClick={handleApplyChanges}
              className="w-full bg-sky-400 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-sky-500 transition-all active:scale-[0.98] shadow-2xl shadow-sky-400/20 flex items-center justify-center gap-3"
            >
              Simpan Identitas {currentBadge.icon}
            </button>
          </div>

          {/* Confirmation Overlay */}
          <AnimatePresence>
            {confirmingBadge && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-white/90 backdrop-blur-md"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                  className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl max-w-sm text-center border-4 border-white"
                >
                  <div className="text-6xl mb-6">{confirmingBadge.icon}</div>
                  <h3 className="text-2xl font-black uppercase italic mb-2">Beli Badge?</h3>
                  <p className="text-xs opacity-60 uppercase font-black tracking-widest mb-8">
                    {confirmingBadge.title} seharga 🪙{confirmingBadge.price}
                  </p>
                  
                  <div className="flex flex-col gap-3">
                    <button 
                      disabled={isProcessing}
                      onClick={executePurchase}
                      className="w-full bg-yellow-400 text-slate-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Memproses...' : `Ya, Beli Sekarang`}
                    </button>
                    <button 
                      disabled={isProcessing}
                      onClick={() => setConfirmingBadge(null)}
                      className="w-full bg-white/10 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all"
                    >
                      Batal
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default AvatarLab;
