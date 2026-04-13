import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import UserProfile from './UserProfile';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUsername: string;
  currentUsername: string;
  isDarkMode: boolean;
  isAdmin?: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, targetUsername, currentUsername, isDarkMode, isAdmin }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] border ${isDarkMode ? 'bg-zinc-900 border-white/10 text-white' : 'bg-white border-black/5 text-black'} shadow-2xl relative`}
        >
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-red-600 to-red-800 relative">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-all z-10"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-8 pb-12 -mt-16 relative">
            <UserProfile 
              targetUsername={targetUsername} 
              currentUsername={currentUsername} 
              isDarkMode={isDarkMode} 
              isAdmin={isAdmin}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserProfileModal;
