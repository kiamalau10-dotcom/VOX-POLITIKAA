import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { PARTIES_DATA } from '../constants';
import { X, ExternalLink, Users } from 'lucide-react';
import { PoliticalParty } from '../types';

const Parties: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = true }) => {
  const [selectedParty, setSelectedParty] = useState<PoliticalParty | null>(null);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* BAGIAN KIRI: DAFTAR PARTAI */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter italic text-red-600">Partai Politik</h2>
            <p className="text-lg opacity-80 mb-10 font-bold leading-relaxed">
              Pilar demokrasi Indonesia. Ketahui siapa saja yang mewakili suaramu di kursi parlemen.
            </p>
            
            <div className="grid grid-cols-1 gap-8">
              {PARTIES_DATA.map((party) => (
                <motion.div
                  key={party.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedParty(party)}
                  className="group p-8 bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] border-2 border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center gap-8 transition-all hover:border-red-600/50 cursor-pointer"
                >
                  <div className="w-48 h-48 flex-shrink-0 bg-white dark:bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center overflow-hidden">
                    <img 
                      src={party.logo} 
                      alt={party.abbreviation} 
                      className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${party.abbreviation}&background=random&size=256`;
                      }}
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-4 py-1 mb-3 bg-red-600 text-white rounded-full text-[12px] font-black uppercase tracking-widest">
                      {party.ideology}
                    </div>
                    <h3 className="text-4xl font-black mb-1 group-hover:text-red-600 transition-colors">{party.abbreviation}</h3>
                    <p className="text-xl font-bold opacity-60 mb-2">{party.name}</p>
                    <div className="h-px w-12 bg-black/20 dark:bg-white/20 mb-3 mx-auto md:mx-0"></div>
                    <p className="text-sm font-black uppercase tracking-tighter opacity-80">
                      Ketua Umum: <span className="text-red-600">{party.chairman}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* BAGIAN KANAN: STATISTIK */}
          <div className="lg:w-1/2">
            <div className="sticky top-24 bg-white dark:bg-zinc-900 rounded-[3rem] p-10 shadow-2xl border-2 border-black/10 dark:border-white/10">
              <h3 className="text-2xl font-black mb-8 text-center uppercase italic tracking-tighter">Distribusi Kursi DPR 2024-2029</h3>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PARTIES_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="abbreviation" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(0,0,0,0.05)'}}
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: 'none', 
                        backgroundColor: '#000',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}
                    />
                    <Bar dataKey="seats" radius={[12, 12, 0, 0]} barSize={60}>
                      {PARTIES_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-10 p-6 bg-red-600/5 rounded-2xl border-2 border-red-600/20 text-center">
                <p className="text-sm leading-relaxed italic font-black uppercase opacity-80">
                  "Fungsi DPR mencakup Legislasi, Anggaran, dan Pengawasan terhadap pemerintah."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedParty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedParty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`max-w-4xl w-full rounded-[3rem] p-8 md:p-12 relative ${
                isDarkMode ? 'bg-zinc-900 text-white' : 'bg-white text-black'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedParty(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-black/10 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <div className="w-full aspect-square bg-white p-8 rounded-[2rem] shadow-2xl flex items-center justify-center">
                    <img src={selectedParty.logo} alt={selectedParty.abbreviation} className="w-full h-full object-contain" />
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-red-600/5 border border-red-600/10 text-center">
                      <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Kursi DPR</p>
                      <p className="text-2xl font-black text-red-600">{selectedParty.seats}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-600/5 border border-red-600/10 text-center">
                      <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Peringkat</p>
                      <p className="text-2xl font-black text-red-600">#{PARTIES_DATA.indexOf(selectedParty) + 1}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-[1.5] space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase rounded-full">{selectedParty.ideology}</span>
                    </div>
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-tight mb-2">{selectedParty.abbreviation}</h2>
                    <p className="text-xl font-bold opacity-60 mb-6">{selectedParty.name}</p>
                    <p className="text-lg font-medium opacity-80 leading-relaxed mb-6">{selectedParty.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Fungsi Demokrasi</h4>
                        <p className="text-sm font-bold leading-relaxed">{selectedParty.functionInDemocracy}</p>
                      </div>
                      <div className="p-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Peran Legislatif</h4>
                        <p className="text-sm font-bold leading-relaxed">{selectedParty.legislativeRole}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50">
                      <Users className="text-red-600" />
                      <div>
                        <p className="text-[10px] font-bold uppercase opacity-50">Ketua Umum</p>
                        <p className="font-black">{selectedParty.chairman}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-black/5 dark:border-white/5">
                    <button className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all flex items-center justify-center gap-2">
                      <ExternalLink size={16} /> Kunjungi Website Resmi
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Parties;
