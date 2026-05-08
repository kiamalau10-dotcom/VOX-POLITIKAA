import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Users, Globe, TrendingUp, Landmark, Cpu, Factory, Utensils, X, ArrowRight } from 'lucide-react';
import { STRATEGIC_PROGRAMS } from '../constants';
import { StrategicProgram } from '../types';

const IconMap: Record<string, any> = {
  Shield, Zap, Users, Globe, TrendingUp, Landmark, Cpu, Factory, Utensils
};

const ProgramSection: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<StrategicProgram | null>(null);

  return (
    <div className="min-h-screen py-20 px-6 bg-sky-200 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase italic text-slate-900 mb-4 tracking-tighter">Program Strategis</h2>
          <p className="text-xl font-bold uppercase tracking-widest opacity-40 text-slate-900">
            Analisis Strategis Kebijakan Pembangunan Nasional Era Prabowo-Gibran
          </p>
        </motion.div>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STRATEGIC_PROGRAMS.map((program) => {
            const Icon = IconMap[program.icon] || Globe;
            return (
              <motion.div
                key={program.id}
                layoutId={`card-${program.id}`}
                onClick={() => setSelectedProgram(program)}
                whileHover={{ y: -10 }}
                className="group cursor-pointer rounded-[2.5rem] overflow-hidden border-4 border-black bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(15,23,42,1)] hover:border-slate-900 transition-all"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={program.images?.[0]} 
                    alt={program.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform-gpu group-hover:scale-110"
                    style={{ imageRendering: 'auto' }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/800x600?text=${encodeURIComponent(program.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                    <Icon size={20} className="text-slate-900" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{program.status}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black uppercase italic mb-3 group-hover:text-slate-900 transition-colors text-slate-900">{program.title}</h3>
                  <p className="text-sm font-medium line-clamp-2 mb-6 text-zinc-600">
                    {program.description}
                  </p>
                  <div className="flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest">
                    Selengkapnya <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* MODAL VIEW */}
        <AnimatePresence>
          {selectedProgram && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProgram(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              
              <motion.div
                layoutId={`card-${selectedProgram.id}`}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-4 bg-white border-black text-slate-900"
              >
                <button 
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-6 right-6 z-10 p-2 bg-slate-900 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                >
                  <X size={24} />
                </button>

                <div className="h-64 md:h-80 relative">
                  <img 
                    src={selectedProgram.images?.[0]} 
                    alt={selectedProgram.title} 
                    className="w-full h-full object-cover transform-gpu"
                    style={{ imageRendering: 'auto' }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/1200x800?text=${encodeURIComponent(selectedProgram.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-slate-900 rounded-xl text-white">
                        {React.createElement(IconMap[selectedProgram.icon] || Globe, { size: 24 })}
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-800">{selectedProgram.status}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black uppercase italic text-white">{selectedProgram.title}</h2>
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                      <section className="space-y-4">
                        <h4 className="text-xl font-black uppercase italic text-slate-900">Detail Program</h4>
                        <p className="text-lg font-medium leading-relaxed opacity-80 whitespace-pre-line text-slate-800">{selectedProgram.details}</p>
                      </section>

                      {selectedProgram.points && (
                        <section className="space-y-6">
                          <h4 className="text-xl font-black uppercase italic text-slate-900">
                            {selectedProgram.points.length} {selectedProgram.id === 'asta-cita' ? 'Poin Utama' : 'Fokus Utama'} {selectedProgram.title}
                          </h4>
                          <div className="overflow-hidden rounded-2xl border-2 border-black/10">
                            <table className="w-full text-left border-collapse">
                              <thead>
                                <tr className="bg-slate-900 text-white">
                                  <th className="p-4 uppercase font-black italic text-[10px]">No</th>
                                  <th className="p-4 uppercase font-black italic text-[10px]">Fokus Utama</th>
                                  <th className="p-4 uppercase font-black italic text-[10px]">Penjabaran Singkat</th>
                                </tr>
                              </thead>
                              <tbody className="font-bold text-xs text-slate-800">
                                {selectedProgram.points.map((point) => (
                                  <tr key={point.no} className="border-b border-black/5 hover:bg-slate-500/5 transition-colors">
                                    <td className="p-4">{point.no}</td>
                                    <td className="p-4 text-slate-900">{point.focus}</td>
                                    <td className="p-4 opacity-70 leading-relaxed">{point.explanation}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </section>
                      )}

                      {selectedProgram.quickWins && (
                        <section className="space-y-6">
                          <h4 className="text-xl font-black uppercase italic text-slate-900">Fokus Strategis (Quick Wins)</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedProgram.quickWins.map((win, idx) => (
                              <div key={idx} className="p-6 rounded-2xl border-2 bg-gray-50 border-black/10">
                                <h5 className="font-black text-slate-900 uppercase italic mb-2 tracking-tight">{win.title}</h5>
                                <p className="text-xs font-medium opacity-70 leading-relaxed text-slate-700">{win.explanation}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      <section className="space-y-4">
                        <h4 className="text-xl font-black uppercase italic text-slate-900">Dampak Strategis</h4>
                        <p className="text-lg font-medium leading-relaxed opacity-80 text-slate-800">{selectedProgram.impact}</p>
                      </section>

                      {/* MACROECONOMIC TABLE */}
                      <section className="space-y-6">
                        <h4 className="text-xl font-black uppercase italic text-slate-900">Indikator Makroekonomi</h4>
                        <div className="overflow-hidden rounded-2xl border-2 border-black/10">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-900 text-white">
                                <th className="p-4 uppercase font-black italic text-xs">Indikator</th>
                                <th className="p-4 uppercase font-black italic text-xs">Target</th>
                              </tr>
                            </thead>
                            <tbody className="font-bold text-sm text-slate-800">
                              <tr className="border-b border-black/5">
                                <td className="p-4">Pertumbuhan Ekonomi</td>
                                <td className="p-4 text-slate-900">6% - 8%</td>
                              </tr>
                              <tr className="border-b border-black/5">
                                <td className="p-4">Rasio Pajak</td>
                                <td className="p-4 text-slate-900">23%</td>
                              </tr>
                              <tr className="border-b border-black/5">
                                <td className="p-4">Rasio Utang/PDB</td>
                                <td className="p-4 text-slate-900">{"<"} 40%</td>
                              </tr>
                              <tr>
                                <td className="p-4">Investasi Hilirisasi</td>
                                <td className="p-4 text-slate-900">US$ 545,3 Miliar</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </section>
                    </div>

                    <aside className="space-y-6">
                      <div className="bg-black p-6 rounded-3xl text-white">
                        <Globe size={32} className="mb-4 text-slate-900" />
                        <h5 className="text-sm font-black uppercase italic mb-2">Indonesia Emas</h5>
                        <p className="text-[10px] font-bold opacity-70">Menuju ekonomi terbesar ke-5 dunia pada tahun 2045.</p>
                      </div>
                    </aside>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProgramSection;
