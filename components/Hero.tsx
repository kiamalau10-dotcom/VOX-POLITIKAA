import React, { useRef, Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AppSection } from '../types';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeroProps {
  onStart: (section: AppSection) => void;
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
        <torusKnotGeometry args={[1, 0.3, 64, 16]} />
        <meshPhongMaterial color="#dc2626" specular="#ffffff" shininess={100} />
      </mesh>
    </Float>
  );
};

import Editable from './Editable';

const Hero: React.FC<HeroProps> = ({ onStart }) => {
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
      <div className="absolute inset-0 z-0 opacity-60">
        {isVisible && (
          <Suspense fallback={null}>
            <Canvas 
              camera={{ position: [0, 0, 5], fov: 45 }} 
              gl={{ antialias: false, powerPreference: "high-performance" }}
              style={{ backgroundColor: '#83f9f8' }}
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
          className="mb-6 inline-block px-4 py-1.5 rounded-full border border-black/30 bg-black/5 text-slate-900 font-bold uppercase tracking-widest text-sm transition-colors duration-500"
        >
          <Editable cmsKey="hero_badge">Masa Depan Indonesia Dimulai Dari Kamu</Editable>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight transition-colors duration-500 text-slate-900"
        >
          <Editable cmsKey="hero_title_1">VoxPolitika:</Editable>
          <span className="text-slate-900">
            <Editable cmsKey="hero_title_2">Edukasi Politik Modern</Editable>
          </span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium transition-colors duration-500 text-slate-800/80"
        >
          <Editable cmsKey="hero_desc">Belajar Politik, Jelajahi Negara, dan Suarakan Opinimu.</Editable>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => onStart(AppSection.BASICS)}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl shadow-black/30 hover:bg-black hover:-translate-y-1 transition-all"
          >
            Mulai Belajar
          </button>
          <button 
            onClick={() => onStart(AppSection.AI)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-lg"
          >
            Tanya Poka
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;