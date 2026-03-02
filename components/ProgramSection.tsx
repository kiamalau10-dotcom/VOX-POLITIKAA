import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, Wheat, Home, Laptop, Factory, Building, ChevronRight } from 'lucide-react';
import { STRATEGIC_PROGRAMS } from '../constants';
import { StrategicProgram } from '../types';

const ProgramSection: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  const [selectedProgram, setSelectedProgram] = useState<StrategicProgram | null>(null);

  return (
    <div className="min-h-screen py-20 px-6 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase italic text-red-600 mb-4 tracking-tighter">Program Strategis</h2>
          <p className={`text-xl font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Asta Cita & Transformasi Nasional 2024-2029
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRATEGIC_PROGRAMS.map((program, idx) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProgram(program)}
              className={`p-10 rounded-[3rem] border-4 cursor-pointer group transition-all ${
                isDarkMode 
                  ? 'bg-zinc-900 border-white/10 hover:border-red-600 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)]' 
                  : 'bg-white border-black shadow-[10px_10px_0px_0px_rgba(220,38,38,1)] hover:shadow-[15px_15px_0px_0px_rgba(220,38,38,1)]'
              }`}
            >
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-red-600/20 group-hover:scale-110 transition-transform">
                {program.icon === 'Utensils' && <Utensils size={32} />}
                {program.icon === 'Wheat' && <Wheat size={32} />}
                {program.icon === 'Home' && <Home size={32} />}
                {program.icon === 'Laptop' && <Laptop size={32} />}
                {program.icon === 'Factory' && <Factory size={32} />}
                {program.icon === 'Building' && <Building size={32} />}
              </div>
              
              <h3 className="text-2xl font-black uppercase italic mb-4 leading-tight group-hover:text-red-600 transition-colors">{program.title}</h3>
              <p className={`font-bold opacity-60 mb-8 leading-relaxed line-clamp-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{program.description}</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-black uppercase">
                  <span>Progres</span>
                  <span className="text-red-600">{program.progress}%</span>
                </div>
                <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border-2 border-black dark:border-white">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${program.progress}%` }}
                    className="h-full bg-red-600"
                  />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{program.status}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center gap-2 font-black text-red-600 uppercase text-xs opacity-0 group-hover:opacity-100 transition-all">
                Lihat Dokumentasi <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* DETAIL MODAL */}
        <AnimatePresence>
          {selectedProgram && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedProgram(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-4 p-8 md:p-12 relative ${
                  isDarkMode ? 'bg-zinc-950 border-white/20 text-white' : 'bg-white border-black text-black'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-8 right-8 p-3 rounded-full hover:bg-red-600 hover:text-white transition-all z-10"
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <div className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-red-600/30">
                      {selectedProgram.icon === 'Utensils' && <Utensils size={40} />}
                      {selectedProgram.icon === 'Wheat' && <Wheat size={40} />}
                      {selectedProgram.icon === 'Home' && <Home size={40} />}
                      {selectedProgram.icon === 'Laptop' && <Laptop size={40} />}
                      {selectedProgram.icon === 'Factory' && <Factory size={40} />}
                      {selectedProgram.icon === 'Building' && <Building size={40} />}
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">{selectedProgram.title}</h2>
                    <div className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-black uppercase tracking-widest rounded-full mb-8">
                      {selectedProgram.status}
                    </div>
                    
                    <div className="space-y-8">
                      <section>
                        <h4 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4">Dokumentasi & Analisis</h4>
                        <p className="text-lg font-medium leading-relaxed opacity-80">{selectedProgram.details}</p>
                      </section>
                      
                      <section className="p-8 bg-zinc-100 dark:bg-zinc-900 rounded-3xl border-2 border-black dark:border-white">
                        <h4 className="text-xs font-black uppercase tracking-widest text-red-600 mb-4">Dampak Strategis</h4>
                        <p className="text-xl font-black italic">"{selectedProgram.impact}"</p>
                      </section>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    {selectedProgram.images?.map((img, idx) => (
                      <img 
                        key={idx} 
                        src={img} 
                        alt={selectedProgram.title} 
                        className="w-full aspect-video object-cover rounded-3xl border-4 border-black dark:border-white shadow-lg"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="p-8 rounded-3xl border-4 border-black dark:border-white bg-red-600 text-white">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-black uppercase tracking-widest text-xs">Progres Nasional</span>
                        <span className="text-2xl font-black">{selectedProgram.progress}%</span>
                      </div>
                      <div className="h-4 bg-white/20 rounded-full overflow-hidden border-2 border-white">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedProgram.progress}%` }}
                          className="h-full bg-white"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProgram(null)}
                      className="w-full py-5 bg-black dark:bg-white text-white dark:text-black font-black uppercase rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      Tutup Detail Dokumentasi
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProgramSection;
