import React from 'react';
import { AppSection } from '../types';
import { Menu, X, Coins, Zap, Trophy } from 'lucide-react';
import { useUser } from './useUser';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection
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
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-6 py-4 bg-sky-600/90 backdrop-blur-md border-b border-white/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-8">
          <div 
            className="text-xl md:text-2xl font-black italic tracking-tighter cursor-pointer flex items-center transition-transform hover:scale-105"
            onClick={() => setActiveSection(AppSection.HOME)}
          >
            <span className="uppercase italic">VOX<span className="text-slate-900">POLITIKA</span></span>
          </div>

          {/* USER STATS IN NAVBAR */}
          {isLoggedIn && currentUser && (
            <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 rounded-2xl bg-white/10 border border-white/10">
              <div className="flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-[10px] font-black uppercase tracking-tighter">LVL {currentUser.level}</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Zap size={14} className="text-slate-900" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{currentUser.currentExp} EXP</span>
              </div>
              <div className="w-px h-3 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Coins size={14} className="text-yellow-500" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{currentUser.coins || 0}</span>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP MENU - Dioptimalkan untuk 6 item */}
        <div className="hidden lg:flex items-center space-x-1">
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
                  ? 'bg-white text-sky-600 shadow-md'
                  : 'hover:bg-white/10 text-white hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full lg:hidden flex flex-col p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300 bg-sky-700 border-b border-white/10">
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
                activeSection === item.id ? 'text-white underline underline-offset-8' : 'text-white/70'
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