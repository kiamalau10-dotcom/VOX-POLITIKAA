import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import { AppSection } from '../types';

// Komponen Bola 3D yang warnanya berubah sesuai mode
const AnimatedShape = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          // Jika Gelap: Merah Terang. Jika Terang: Merah Lembut (agar teks hitam terbaca)
          color={isDarkMode ? "#dc2626" : "#fecaca"} 
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={isDarkMode ? 0.8 : 0.2}
        />
      </Sphere>
    </Float>
  );
};

interface HeroProps {
  onStart: (section: AppSection) => void;
  isDarkMode: boolean; // Tambahkan props ini
}

const Hero: React.FC<HeroProps> = ({ onStart, isDarkMode }) => {
  return (
    <div className="min-h-screen bg-transparent relative flex flex-col items-center justify-center overflow-hidden px-6">
      
      {/* BACKGROUND CANVAS */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color={isDarkMode ? "#0ea5e9" : "#ef4444"} />
          <pointLight position={[-10, -10, -10]} color="#dc2626" />
          <AnimatedShape isDarkMode={isDarkMode} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mb-6 inline-block px-4 py-1.5 rounded-full border font-bold uppercase tracking-widest text-sm transition-colors duration-500 ${
            isDarkMode 
              ? 'border-red-500/20 bg-red-500/10 text-red-500' 
              : 'border-red-600/30 bg-red-600/10 text-red-700'
          }`}
        >
          Masa Depan Indonesia Dimulai Dari Kamu
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          VoxPolitika: <br />
          <span className="text-red-600">
            Edukasi Politik Modern
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto font-medium transition-colors duration-500 ${
            isDarkMode ? 'text-white/70' : 'text-black/70'
          }`}
        >
          Belajar Politik, Jelajahi Negara, dan Suarakan Opinimu.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => onStart(AppSection.BASICS)}
            className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-500/30 hover:bg-red-700 hover:-translate-y-1 transition-all"
          >
            Mulai Belajar
          </button>
          <button 
            onClick={() => onStart(AppSection.AI)}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all ${
              isDarkMode 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-black text-black hover:bg-black hover:text-white'
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