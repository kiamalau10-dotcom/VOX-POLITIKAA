import React from 'react';
import { AppSection } from '../types';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeSection, 
  setActiveSection, 
  isDarkMode, 
  toggleDarkMode 
}) => {
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
        ? 'bg-black/90 backdrop-blur-md border-b border-white/10 text-white' 
        : 'bg-red-600 shadow-xl text-white' 
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <div 
          className="text-xl md:text-2xl font-black italic tracking-tighter cursor-pointer flex items-center transition-transform hover:scale-105"
          onClick={() => setActiveSection(AppSection.HOME)}
        >
          <span className="uppercase italic">VOX<span className="text-red-600">POLITIKA</span></span>
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
                  ? (isDarkMode ? 'bg-white text-black' : 'bg-black/20 text-white shadow-inner')
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="ml-2 pl-2 border-l border-white/20 flex items-center">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-black/10 hover:bg-black/20 text-white'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
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
        <div className={`absolute top-full left-0 w-full lg:hidden flex flex-col p-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300 ${
          isDarkMode ? 'bg-zinc-900 border-b border-white/10' : 'bg-red-700'
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