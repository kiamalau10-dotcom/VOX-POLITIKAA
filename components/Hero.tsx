import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppSection } from '../types';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroProps {
  onStart: (section: AppSection) => void;
  isDarkMode: boolean;
}

const AnimatedShape = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 40, 8]} />
        <meshPhongMaterial color="#0EA5E9" specular="#ffffff" shininess={100} />
      </mesh>
    </Float>
  );
};

import Editable from './Editable';

const Hero: React.FC<HeroProps> = ({ onStart, isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent relative flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0 opacity-40">
        {isVisible && (
          <Suspense fallback={null}>
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 45 }} 
              gl={{ 
                antialias: false, 
                powerPreference: "low-power",
                alpha: true
              }}
              dpr={[1, 1.5]}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <AnimatedShape />
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </Suspense>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mb-6 inline-block px-4 py-1.5 rounded-full border border-[#0EA5E9]/20 bg-[#E0F2FE] text-[#0284C7] font-bold uppercase tracking-widest text-[10px] shadow-sm`}
        >
          <Editable cmsKey="hero_badge">Masa Depan Indonesia Dimulai Dari Kamu</Editable>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] italic transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-vox-navy'
          }`}
        >
          <Editable cmsKey="hero_title_1">VoxPolitika:</Editable><br />
          <span className={isDarkMode ? 'text-vox-emerald' : 'text-vox-primary'}>
            <Editable cmsKey="hero_title_2">Edukasi Politik Modern</Editable>
          </span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto font-bold italic transition-colors duration-500 ${
            isDarkMode ? 'text-white/80' : 'text-vox-slate'
          }`}
        >
          <Editable cmsKey="hero_desc">Belajar Politik, Jelajahi Negara, dan Suarakan Opinimu.</Editable>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => onStart(AppSection.BASICS)}
            className="w-full sm:w-auto px-10 py-5 bg-vox-emerald text-vox-navy rounded-full font-black italic uppercase tracking-widest text-sm shadow-xl shadow-vox-emerald/20 hover:scale-105 hover:bg-white transition-all active:scale-95"
          >
            Mulai Belajar
          </button>
          <button 
            onClick={() => onStart(AppSection.AI)}
            className={`w-full sm:w-auto px-10 py-5 rounded-full font-black italic uppercase tracking-widest text-sm border-2 transition-all active:scale-95 ${
              isDarkMode 
                ? 'border-white/20 bg-white/5 text-white hover:bg-white hover:text-vox-navy' 
                : 'border-vox-navy/10 bg-white text-vox-navy hover:bg-vox-navy hover:text-white shadow-xl shadow-vox-navy/5'
            }`}
          >
            Tanya Poka
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;