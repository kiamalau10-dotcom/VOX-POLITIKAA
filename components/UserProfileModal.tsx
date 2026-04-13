import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import UserProfile from './UserProfile';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUsername: string;
  isDarkMode: boolean;
  isAdmin?: boolean;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  targetUsername,
  isDarkMode,
  isAdmin
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-[3rem] border shadow-2xl ${
              isDarkMode 
                ? 'bg-zinc-900 border-white/10 text-white' 
                : 'bg-white border-black/5 text-zinc-900'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-6 right-6 p-3 rounded-2xl transition-all z-10 ${
                isDarkMode 
                  ? 'bg-white/5 hover:bg-white/10 text-white' 
                  : 'bg-black/5 hover:bg-black/10 text-zinc-900'
              }`}
            >
              <X size={20} />
            </button>

            <div className="p-8 md:p-12">
              <UserProfile 
                targetUsername={targetUsername}
                isDarkMode={isDarkMode}
                isAdmin={isAdmin}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileModal;
