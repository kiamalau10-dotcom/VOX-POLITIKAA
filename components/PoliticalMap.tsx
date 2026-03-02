import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROVINCES_DATA } from '../constants';
import { ProvinceData } from '../types';
import { MapPin, X, Info, Award, PieChart, Activity } from 'lucide-react';

// --- Komponen Peta visual SVG telah dihapus untuk kerapihan ---

const PoliticalMap: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = true }) => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [show3DMap, setShow3DMap] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const strategicAnalysis = useMemo(() => {
    if (!selectedProvince) return null;
    const seats = selectedProvince.dprSeats;
    return {
      priority: seats > 20 ? 'HIGH PRIORITY' : seats > 10 ? 'MEDIUM' : 'STABLE',
      riskIndex: (60 + (parseInt(selectedProvince.id) * 7 % 35)) + "%",
      growthPotential: (seats * 1.2).toFixed(1) + "%",
      note: seats > 50 
        ? "Battleground utama. Pergeseran 2% suara merubah konstelasi nasional." 
        : "Wilayah kunci untuk penguatan basis massa akar rumput."
    };
  }, [selectedProvince]);

  return (
    <div className={`min-h-screen py-20 px-6 font-sans overflow-x-hidden transition-colors duration-700 ${isDarkMode ? 'bg-[#050505] text-white' : 'bg-zinc-50 text-black'}`}>
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-16 relative">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[2px] w-12 bg-red-600 animate-pulse" />
              <span className="text-red-500 font-black tracking-[0.4em] text-[10px] uppercase">VoxPolitika Map Revolution v3.0</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter leading-none mb-6 italic uppercase">
              Peta <span className="text-red-600 outline-text not-italic">Interaktif</span>
            </h1>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: DAFTAR PROVINSI (INTERFACE MAP YANG BARU) */}
          <div className="lg:col-span-7 space-y-10">
            <div className={`p-8 rounded-[3rem] border ${isDarkMode ? 'bg-zinc-900/50 border-white/5' : 'bg-white border-black/5'}`}>
                <h3 className="text-xl font-black uppercase tracking-widest mb-6">Pilih Provinsi</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                    {PROVINCES_DATA.map((prov) => (
                    <motion.button
                        key={prov.id}
                        onClick={() => setSelectedProvince(prov)}
                        className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                        selectedProvince?.id === prov.id 
                        ? 'bg-red-600 text-white border-red-600 shadow-xl' 
                        : isDarkMode ? 'bg-zinc-900/30 border-white/5 hover:border-red-600/50' : 'bg-white border-black/5 hover:border-red-600/50 shadow-sm'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                        <h5 className="font-black text-[10px] uppercase tracking-tight truncate w-full">{prov.name}</h5>
                        {prov.isTrending && <Activity size={10} className="text-yellow-500 animate-pulse shrink-0" />}
                        </div>
                        <p className={`text-[8px] font-bold uppercase ${selectedProvince?.id === prov.id ? 'opacity-80' : 'opacity-50'} mt-1`}>{prov.capital}</p>
                        {prov.isTrending && (
                        <span className="absolute -right-4 -top-4 bg-yellow-500 text-black text-[6px] font-black px-6 py-1 rotate-45 uppercase">Trending</span>
                        )}
                    </motion.button>
                    ))}
                </div>
            </div>
          </div>

          {/* RIGHT: LIVE DASHBOARD PANEL */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              {selectedProvince ? (
                <motion.div
                  key={selectedProvince.id}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className={`rounded-[3rem] border overflow-hidden ${isDarkMode ? 'bg-zinc-900/50 border-white/10' : 'bg-white border-black/5 shadow-2xl'}`}
                >
                  <div className="p-10 space-y-8">
                    {/* Header Info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-4xl font-black italic tracking-tighter uppercase">{selectedProvince.name}</h2>
                          {selectedProvince.isTrending && (
                            <span className="bg-yellow-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase animate-bounce">Hot</span>
                          )}
                        </div>
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">{selectedProvince.capital} • Sektor {selectedProvince.id}</p>
                      </div>
                      <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
                        <MapPin size={24} className="text-red-600" />
                      </div>
                    </div>

                    {/* Live Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <Award size={16} className="text-red-600" />
                          <span className="text-[9px] font-black uppercase opacity-50">Kursi DPR</span>
                        </div>
                        <p className="text-3xl font-black text-red-600">{selectedProvince.dprSeats}</p>
                        <p className="text-[8px] font-bold opacity-40 uppercase mt-1">Mandat Nasional</p>
                      </div>
                      <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <PieChart size={16} className="text-blue-500" />
                          <span className="text-[9px] font-black uppercase opacity-50">Dominasi Partai</span>
                        </div>
                        <p className="text-3xl font-black text-blue-500">{selectedProvince.dominantPartyPercent}%</p>
                        <p className="text-[8px] font-bold opacity-40 uppercase mt-1">{selectedProvince.dominantParty || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Governor Card */}
                    <div className={`p-6 rounded-3xl border flex items-center gap-6 ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-zinc-50 border-black/5'}`}>
                      <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-red-600/20 relative group">
                        <img 
                          src={selectedProvince.governorPhoto || `https://picsum.photos/seed/${selectedProvince.governor}/200/200`} 
                          alt={selectedProvince.governor}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black uppercase opacity-50 mb-1">Gubernur Aktif</p>
                        <h4 className="text-lg font-black uppercase italic leading-tight mb-1">{selectedProvince.governor}</h4>
                        <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">{selectedProvince.party}</span>
                      </div>
                    </div>

                    {/* Trivia Section: Tahukah Kamu? */}
                    <div className="p-6 rounded-3xl bg-red-600/5 border border-red-600/10 relative overflow-hidden">
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                          <Info size={14} className="text-red-600" />
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-red-600">Tahukah Kamu?</h4>
                        </div>
                        <p className="text-xs font-medium leading-relaxed italic opacity-80">"{selectedProvince.trivia || "Data trivia sedang dikumpulkan..."}"</p>
                      </div>
                      <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
                        <Info size={80} />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setShowAnalysis(!showAnalysis)}
                        className="py-4 bg-red-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                      >
                        {showAnalysis ? 'Tutup Analisis' : 'Analisis Intel'}
                      </button>
                      <button 
                        onClick={() => setShow3DMap(true)}
                        className={`py-4 border rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${isDarkMode ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/5 bg-zinc-50 hover:bg-zinc-100'}`}
                      >
                        Satelit 3D
                      </button>
                    </div>

                    {/* Strategic Analysis Overlay */}
                    <AnimatePresence>
                      {showAnalysis && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="pt-6 border-t border-white/5 space-y-4 overflow-hidden"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black uppercase opacity-40">Prioritas Strategis</span>
                            <span className="text-xs font-black text-red-600">{strategicAnalysis?.priority}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black uppercase opacity-40">Indeks Kerawanan</span>
                            <span className="text-xs font-black">{strategicAnalysis?.riskIndex}</span>
                          </div>
                          <p className="text-[10px] font-medium leading-relaxed opacity-60 italic">"{strategicAnalysis?.note}"</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <div className={`h-[600px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed rounded-[4rem] ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                   <div className="relative mb-8">
                     <div className="w-24 h-24 rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin" />
                     <MapPin size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-600" />
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-widest opacity-20 italic">Select a Sector to Scan...</h3>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 3D Map Modal */}
      <AnimatePresence>
        {show3DMap && selectedProvince && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/98 backdrop-blur-3xl">
            <motion.div initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-7xl h-[85vh] bg-black rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(220,38,38,0.2)]">
              <div className="absolute top-0 left-0 right-0 p-10 bg-gradient-to-b from-black via-black/80 to-transparent z-20 flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center font-black text-3xl italic shadow-[0_0_30px_rgba(220,38,38,0.5)]">{selectedProvince.name.charAt(0)}</div>
                  <div>
                    <h3 className="text-white text-4xl font-black italic uppercase tracking-tighter">Live Scan: {selectedProvince.name}</h3>
                    <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.4em]">Satellite Connection Established</p>
                  </div>
                </div>
                <button onClick={() => setShow3DMap(false)} className="p-5 bg-white/5 hover:bg-red-600 rounded-full transition-all border border-white/10 group"><X size={32} className="group-hover:rotate-90 transition-transform" /></button>
              </div>
              <iframe 
                src={`https://earth3dmap.com/#?l=provinsi${selectedProvince.name.toLowerCase().replace(/\s+/g, '')}`} 
                className="w-full h-full grayscale-[0.3] invert-[0.05] contrast-[1.1]" 
                allow="geolocation" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #dc2626; }
        .outline-text { -webkit-text-stroke: 1px #dc2626; color: transparent; }
      `}</style>
    </div>
  );
};

export default PoliticalMap;