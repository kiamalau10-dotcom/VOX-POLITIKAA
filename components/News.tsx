import React from 'react';
import { motion } from 'framer-motion';
import { NEWS_DATA } from '../constants';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const News: React.FC = () => {
  const newsUrl = 'https://www.cnnindonesia.com/nasional/politik';

  // Fungsi untuk membuka artikel di tab yang sama
  const handleArticleClick = (url: string) => {
    window.open(url, '_self', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-vox-bg text-vox-navy transition-colors duration-500 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">Warta & Analisis</h2>
            <p className="opacity-60 mt-2 font-bold uppercase text-[10px] tracking-widest">Informasi Strategis Nasional</p>
          </div>
          
          <button 
            onClick={() => window.open(newsUrl, '_self')}
            className="hidden sm:flex items-center gap-3 px-8 py-3 border-2 border-black dark:border-white rounded-full text-xs font-black hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all uppercase tracking-tighter"
          >
            Lihat Berita Lainnya <ArrowRight size={16} />
          </button>
        </div>

        {/* Grid Kartu Berita */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {NEWS_DATA.map((item) => (
            <motion.article
              key={item.id}
              whileHover={{ y: -10 }}
              onClick={() => handleArticleClick(item.url)}
              className="group cursor-pointer bg-white border-2 border-vox-navy/5 hover:border-vox-primary rounded-[2.5rem] p-5 transition-all shadow-xl text-vox-navy"
            >
              <div className="relative rounded-[2rem] overflow-hidden mb-6 aspect-video">
                <LazyLoadImage 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  effect="blur"
                  onError={(e: any) => {
                    e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`;
                  }}
                />
                <div className="absolute top-5 left-5">
                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] opacity-40 font-black uppercase tracking-[0.2em]">{item.date}</p>
                  <ExternalLink className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-black mb-3 group-hover:text-blue-600 transition-colors leading-tight italic uppercase tracking-tighter">
                  {item.title}
                </h3>
                <p className="text-sm opacity-60 font-medium line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Tombol Mobile */}
        <div className="mt-10 sm:hidden">
          <button 
            onClick={() => window.open(newsUrl, '_self')}
            className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-xs uppercase tracking-widest"
          >
            Buka CNN Politik
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;