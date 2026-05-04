import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Snowflake, Coins, RefreshCw, AlertTriangle } from 'lucide-react';
import { User } from '../types';

interface StreakProtectionModalProps {
  currentUser: User;
  isDarkMode: boolean;
  onResolve: (action: 'use' | 'buy' | 'reset') => Promise<void>;
}

const StreakProtectionModal: React.FC<StreakProtectionModalProps> = ({ currentUser, isDarkMode, onResolve }) => {
  const [isResolving, setIsResolving] = React.useState(false);

  const handleAction = async (action: 'use' | 'buy' | 'reset') => {
    setIsResolving(true);
    await onResolve(action);
    setIsResolving(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className={`relative w-full max-w-lg p-10 rounded-[3rem] border-4 ${
          isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black text-black'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-red-600/30">
            <AlertTriangle size={40} className="text-white" />
          </div>
          
          <h2 className="text-4xl font-black uppercase italic text-red-600 mb-4 tracking-tighter">Streak Terputus!</h2>
          <p className={`text-lg font-medium mb-8 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Waduh! Kamu melewatkan hari kemarin. Streak <span className="font-black text-red-600">{currentUser.previousStreak || 0} hari</span> kamu hampir hangus!
          </p>

          <div className="grid grid-cols-1 gap-4 w-full">
            {/* Use Streak Freeze */}
            <button 
              onClick={() => handleAction('use')}
              disabled={isResolving || !currentUser.streakFreezeCount}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                currentUser.streakFreezeCount 
                  ? 'border-blue-500 bg-blue-500/5 hover:scale-[1.02] active:scale-95' 
                  : 'opacity-50 grayscale cursor-not-allowed border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <Snowflake className="text-blue-500" size={24} />
                <div className="text-left">
                  <p className="font-black uppercase text-xs">Gunakan Streak Freeze</p>
                  <p className="text-[10px] font-bold opacity-60">Sisa: {currentUser.streakFreezeCount || 0}</p>
                </div>
              </div>
              <Zap size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Buy and Use */}
            <button 
              onClick={() => handleAction('buy')}
              disabled={isResolving || (currentUser.coins || 0) < 100}
              className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all group ${
                (currentUser.coins || 0) >= 100
                  ? 'border-yellow-500 bg-yellow-500/5 hover:scale-[1.02] active:scale-95'
                  : 'opacity-50 grayscale cursor-not-allowed border-zinc-500'
              }`}
            >
              <div className="flex items-center gap-4">
                <Coins className="text-yellow-500" size={24} />
                <div className="text-left">
                  <p className="font-black uppercase text-xs">Beli Streak Freeze</p>
                  <p className="text-[10px] font-bold opacity-60">Biaya: 100 Koin (Milikmu: {currentUser.coins || 0})</p>
                </div>
              </div>
              <Zap size={16} className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Let it reset */}
            <button 
              onClick={() => handleAction('reset')}
              disabled={isResolving}
              className="flex items-center justify-between p-6 rounded-2xl border-2 border-zinc-500 bg-zinc-500/5 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <div className="flex items-center gap-4">
                <RefreshCw className="text-zinc-500" size={24} />
                <div className="text-left">
                  <p className="font-black uppercase text-xs text-zinc-500">Relakan Saja</p>
                  <p className="text-[10px] font-bold opacity-60">Streak akan diulang dari 1.</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StreakProtectionModal;
