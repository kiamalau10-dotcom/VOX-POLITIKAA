import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CABINET_DATA } from '../constants'; // Pastikan data di sini sudah berisi 50 entri
import { Minister } from '../types';
import { Search, X } from 'lucide-react';

const Cabinet: React.FC = () => {
  const [selectedMinister, setSelectedMinister] = useState<Minister | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Memastikan pencarian mencakup nama dan posisi
  const filteredData = CABINET_DATA.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          {/* Header yang sudah diubah sesuai permintaan */}
          <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tighter">Pimpinan & Kabinet Merah Putih</h2>
          <p className="text-lg font-medium max-w-2xl mx-auto opacity-70">
            Daftar lengkap Presiden, Wakil Presiden, dan para Menteri yang bertugas dalam jajaran pemerintahan Republik Indonesia.
          </p>
          
          <div className="mt-10 max-w-md mx-auto relative group">
            <input
              type="text"
              placeholder="Cari nama atau jabatan..."
              className="w-full px-6 py-4 rounded-2xl border-2 border-black dark:border-white bg-transparent shadow-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-4">
               <Search className="w-6 h-6 opacity-40" />
            </div>
          </div>
        </div>

        {/* Grid Menampilkan 50 Anggota (1 Presiden, 1 Wapres, 48 Menteri) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredData.map((person) => (
            <motion.div
              key={person.id}
              layoutId={person.id}
              onClick={() => setSelectedMinister(person)}
              whileHover={{ y: -8 }}
              className={`cursor-pointer bg-white dark:bg-black rounded-3xl overflow-hidden shadow-xl border-2 transition-colors duration-500 group ${
                person.position.includes('Presiden') ? 'border-red-600' : 'border-black/10 dark:border-white/20'
              }`}
            >
              <div className="relative overflow-hidden h-64">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                  />
                  {/* Badge Khusus untuk Presiden/Wapres */}
                  {person.position.includes('Presiden') && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      Pimpinan Negara
                    </div>
                  )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 line-clamp-1">{person.name}</h3>
                <p className="text-sm text-red-600 font-black mb-3 tracking-widest uppercase">{person.position}</p>
                <p className="text-sm opacity-60 line-clamp-2">{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMinister && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMinister(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              layoutId={selectedMinister.id}
              className="relative w-full max-w-3xl bg-white dark:bg-black text-black dark:text-white rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-black dark:border-white transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="w-full md:w-2/5 h-80 md:h-auto">
                  <img src={selectedMinister.image} alt={selectedMinister.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex flex-col flex-1 relative">
                  <button 
                    onClick={() => setSelectedMinister(null)}
                    className="absolute top-6 right-6 p-2.5 rounded-full bg-black/5 dark:bg-white/10 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-3xl font-extrabold mb-1">{selectedMinister.name}</h2>
                  <p className="text-red-600 font-bold mb-6 text-lg uppercase tracking-wide">{selectedMinister.position}</p>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-2 opacity-40 text-red-600">Profil Singkat</h4>
                      <p className="font-medium leading-relaxed">{selectedMinister.bio}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-3 opacity-40 text-red-600">Tanggung Jawab Utama</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedMinister.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-center text-xs font-bold bg-black/5 dark:bg-white/10 px-3 py-2 rounded-xl border border-black/10 dark:border-white/10">
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-3 shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cabinet;
