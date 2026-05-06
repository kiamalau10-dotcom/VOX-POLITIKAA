import React from 'react';
import { AppSection } from '../types';
import { Menu, X, Coins, Zap, Trophy, Moon, Sun } from 'lucide-react';
import { useUser } from './useUser';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isDarkMode,
  onToggleDarkMode
}) => {
  const { currentUser, isLoggedIn } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // DAFTAR MENU (Sudah ditambah Dasar Politik)
  const menuItems = [
    { id: AppSection.HOME, label: 'Beranda' },
    { id: AppSection.BASICS, label: 'Dasar Politik' },
    { id: AppSection.CABINET, label: 'Kabinet' },
    { id: AppSection.PROGRAM, label: 'Program' },
    { id: AppSection.PARTIES, label: 'Partai' },
    { id: AppSection.MAP, label: 'Peta' },
    { id: AppSection.QUIZ, label: 'Kuis' },
    { id: AppSection.DASHBOARD, label: 'Dashboard' },
    { id: AppSection.AI, label: 'Tanya Poka' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-6 py-4 ${
      isDarkMode 
        ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-white/10 text-white' 
        : 'bg-white shadow-[0_4px_30px_-10px_rgba(15,23,42,0.1)] border-b border-[#0EA5E9]/10 text-vox-navy' 
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <div 
            className="text-xl md:text-2xl font-black italic tracking-tighter cursor-pointer flex items-center transition-transform hover:scale-105"
            onClick={() => setActiveSection(AppSection.HOME)}
          >
            <span className="uppercase italic">VOX<span className={isDarkMode ? 'text-vox-accent' : 'text-vox-primary'}>POLITIKA</span></span>
          </div>

          {/* USER STATS IN NAVBAR */}
          {isLoggedIn && currentUser && (
            <div className={`hidden xl:flex items-center gap-4 px-4 py-1.5 rounded-2xl border ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#F0F9FF] border-[#0EA5E9]/20 shadow-inner'
            }`}>
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-600" />
                <span className="text-[10px] font-black uppercase tracking-tighter">LVL {currentUser.level}</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-white/20' : 'bg-vox-primary/20'}`} />
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-vox-primary" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{currentUser.currentExp} EXP</span>
              </div>
              <div className={`w-px h-3 ${isDarkMode ? 'bg-white/20' : 'bg-vox-primary/20'}`} />
              <div className="flex items-center gap-1.5">
                <Coins size={14} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{currentUser.coins || 0}</span>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode}
            className={`mr-4 p-2 rounded-xl transition-all duration-300 ${
              isDarkMode ? 'bg-white/10 text-vox-accent hover:bg-white/20' : 'bg-vox-bg text-vox-primary hover:bg-vox-card'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (activeSection === AppSection.HOME) {
                  let targetId = '';
                  if (item.id === AppSection.NEWS) targetId = 'news-section';
                  
                  if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      return;
                    }
                  }
                }
                setActiveSection(item.id);
              }}
              className={`px-3 py-2 rounded-full text-[10px] font-bold uppercase tracking-tight transition-all duration-300 ${
                activeSection === item.id
                  ? (isDarkMode ? 'bg-white text-black' : 'bg-vox-primary text-white shadow-lg shadow-vox-primary/20')
                  : (isDarkMode ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-vox-slate hover:text-vox-primary hover:bg-vox-bg')
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON AND THEME TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          <button 
            onClick={onToggleDarkMode}
            className={`p-2 rounded-xl transition-all duration-300 ${
              isDarkMode ? 'bg-white/10 text-vox-accent' : 'bg-vox-bg text-vox-primary'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className={`p-2 ${isDarkMode ? 'text-white' : 'text-vox-navy'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className={`absolute top-full left-0 w-full lg:hidden flex flex-col p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300 ${
          isDarkMode ? 'bg-vox-deep-ocean border-b border-white/10' : 'bg-white border-b border-[#0EA5E9]/10'
        }`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (activeSection === AppSection.HOME) {
                  let targetId = '';
                  if (item.id === AppSection.NEWS) targetId = 'news-section';
                  
                  if (targetId) {
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                      setIsMobileMenuOpen(false);
                      return;
                    }
                  }
                }
                setActiveSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-bold uppercase tracking-wider py-2 transition-colors ${
                activeSection === item.id 
                  ? (isDarkMode ? 'text-white underline underline-offset-8' : 'text-vox-primary') 
                  : (isDarkMode ? 'text-white/70' : 'text-vox-slate')
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;