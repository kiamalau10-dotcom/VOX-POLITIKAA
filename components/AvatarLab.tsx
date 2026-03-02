import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';

interface AvatarLabProps {
  currentUser: any;
  onUpdateUser: (user: any) => void;
  isDarkMode: boolean;
  onClose: () => void;
}

const COSTUMES = [
  { id: 'none', label: 'Casual Tee', price: 0, icon: '👕' },
  { id: 'batik_modern', label: 'Batik Modern', price: 500, icon: '👔' },
  { id: 'formal_suit', label: 'Executive Suit', price: 1200, icon: '🧥' },
  { id: 'traditional_java', label: 'Beskap Jawa', price: 1500, icon: '👘' },
  { id: 'traditional_bali', label: 'Payas Agung', price: 1500, icon: '👑' },
  { id: 'democracy_jacket', label: 'Vox Jacket', price: 800, icon: '🧥' },
];

const AVATAR_OPTIONS = {
  gender: [
    { id: 'male', label: 'Male', price: 0 },
    { id: 'female', label: 'Female', price: 0 },
  ],
  skin: [
    { id: 'light', label: 'Light', color: '#fce5d8', price: 0 },
    { id: 'medium', label: 'Medium', color: '#e0ac69', price: 0 },
    { id: 'dark', label: 'Dark', color: '#8d5524', price: 0 },
  ],
  hair: [
    { id: 'short', label: 'Short', price: 0 },
    { id: 'long', label: 'Long', price: 100 },
    { id: 'undercut', label: 'Undercut', price: 200 },
    { id: 'hijab', label: 'Hijab', price: 0 },
  ],
  eyes: [
    { id: 'black', label: 'Black', color: '#000000', price: 0 },
    { id: 'brown', label: 'Brown', color: '#4b2e1e', price: 50 },
    { id: 'blue', label: 'Blue', color: '#2563eb', price: 150 },
  ]
};

// 3D Avatar Component with Detailed Customization
const Avatar3D = ({ config, costumeId }: { config: any, costumeId: string }) => {
  const skinColor = AVATAR_OPTIONS.skin.find(s => s.id === config.skin)?.color || '#fce5d8';
  const eyeColor = AVATAR_OPTIONS.eyes.find(e => e.id === config.eyes)?.color || '#000000';
  
  return (
    <group position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={skinColor} roughness={0.3} />
      </mesh>
      
      {/* Hair / Hijab */}
      {config.hair === 'short' && (
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#27272a" />
        </mesh>
      )}
      {config.hair === 'long' && (
        <group>
          <mesh position={[0, 1.7, 0]}>
            <sphereGeometry args={[0.42, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#27272a" />
          </mesh>
          <mesh position={[0, 1.3, -0.2]}>
            <boxGeometry args={[0.6, 0.8, 0.2]} />
            <meshStandardMaterial color="#27272a" />
          </mesh>
        </group>
      )}
      {config.hair === 'hijab' && (
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}

      {/* Eyes */}
      <mesh position={[-0.15, 1.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
      </mesh>
      <mesh position={[0.15, 1.55, 0.35]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.02]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color={eyeColor} />
        </mesh>
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.45, 1, 4, 16]} />
        <meshStandardMaterial 
          color={
            costumeId === 'batik_modern' ? '#8b4513' :
            costumeId === 'formal_suit' ? '#1e293b' :
            costumeId === 'traditional_java' ? '#000000' :
            costumeId === 'traditional_bali' ? '#facc15' :
            costumeId === 'democracy_jacket' ? '#dc2626' :
            '#e2e8f0'
          } 
          roughness={0.5} 
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.65, 0.8, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      <mesh position={[0.65, 0.8, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.15, 0.6, 4, 8]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
    </group>
  );
};

const AvatarLab: React.FC<AvatarLabProps> = ({ currentUser, onUpdateUser, isDarkMode, onClose }) => {
  const isAdmin = currentUser.username === 'super admin' || currentUser.displayName === 'Dekila';
  const userCoins = isAdmin ? Infinity : (currentUser.coins || 0);

  const [config, setConfig] = useState(currentUser.avatarConfig || {
    gender: 'male',
    skin: 'light',
    hair: 'short',
    eyes: 'black',
  });
  const [equippedCostumeId, setEquippedCostumeId] = useState(currentUser.equippedCostumeId || 'none');

  const handleSelect = (category: string, option: any) => {
    if (!isAdmin && option.price > userCoins) {
      alert("VoxCoins tidak cukup!");
      return;
    }
    setConfig({ ...config, [category]: option.id });
  };

  const handleEquipCostume = (costume: any) => {
    if (!isAdmin && costume.price > userCoins) {
      alert("VoxCoins tidak cukup!");
      return;
    }
    setEquippedCostumeId(costume.id);
  };

  const handleSave = () => {
    const updatedUser = {
      ...currentUser,
      avatarConfig: config,
      equippedCostumeId: equippedCostumeId,
      // Deduct coins if not admin (simplified logic for demo)
      coins: isAdmin ? currentUser.coins : (currentUser.coins || 0)
    };
    onUpdateUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className={`relative w-full max-w-6xl h-[85vh] rounded-[3rem] border overflow-hidden flex flex-col md:flex-row ${
          isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-white border-black/5'
        }`}
      >
        {/* 3D Preview Area */}
        <div className={`flex-1 relative border-r ${
          isDarkMode ? 'bg-black/50 border-white/5' : 'bg-zinc-50 border-black/5'
        }`}>
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center font-black uppercase text-red-600 animate-pulse">
              Loading 3D Avatar...
            </div>
          }>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Avatar3D config={config} costumeId={equippedCostumeId} />
              <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
              <Environment preset="city" />
              <ContactShadows opacity={0.4} scale={10} blur={2} far={10} resolution={256} color="#000000" />
            </Canvas>
          </Suspense>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <h2 className="text-3xl font-black uppercase italic text-red-600 tracking-tighter">Avatar Lab 3.0</h2>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.3em] mt-1">Next-Gen Identity System</p>
          </div>

          <div className="absolute top-8 left-8 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full shadow-lg shadow-red-600/20">
            <span className="font-black">🪙 {isAdmin ? '∞' : (currentUser.coins || 0)}</span>
            <span className="text-[8px] font-black uppercase opacity-70">VoxCoins</span>
          </div>
        </div>

        {/* Customization Area */}
        <div className="flex-1 flex flex-col h-full">
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-red-600" size={20} />
              <h3 className="font-black uppercase tracking-widest text-sm">Identity & Wardrobe</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-red-600/10 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-8">
              {Object.entries(AVATAR_OPTIONS).map(([category, options]) => (
                <div key={category}>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map((opt: any) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelect(category, opt)}
                        className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                          config[category] === opt.id
                            ? 'border-red-600 bg-red-600/5'
                            : isDarkMode ? 'border-white/5 bg-white/5' : 'border-black/5 bg-zinc-50'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                        {opt.price > 0 && <span className="text-[8px] text-red-500">🪙{opt.price}</span>}
                        {config[category] === opt.id && <Check size={10} className="text-red-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Costumes */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-4">Wardrobe Collection</h4>
              <div className="grid grid-cols-2 gap-4">
                {COSTUMES.map((costume) => (
                  <button
                    key={costume.id}
                    onClick={() => handleEquipCostume(costume)}
                    className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center ${
                      equippedCostumeId === costume.id
                        ? 'border-red-600 bg-red-600/5'
                        : isDarkMode ? 'border-white/5 bg-white/5 hover:border-white/20' : 'border-black/5 bg-zinc-50 hover:border-black/20'
                    }`}
                  >
                    <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-2xl">
                      {costume.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase mb-1">{costume.label}</p>
                      {costume.price > 0 && (
                        <p className="text-[10px] font-black text-red-600">🪙 {costume.price}</p>
                      )}
                    </div>
                    {equippedCostumeId === costume.id ? (
                      <span className="text-[8px] font-black bg-red-600 text-white px-2 py-1 rounded-full uppercase">Equipped</span>
                    ) : (
                      <span className="text-[8px] font-black opacity-30 uppercase">Select</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-white/5">
            <button 
              onClick={handleSave}
              className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-700 transition-all active:scale-95 shadow-2xl shadow-red-600/30"
            >
              Confirm Identity
            </button>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #dc2626; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default AvatarLab;
