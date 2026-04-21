import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from './CMSContext';
import { Palette, Move } from 'lucide-react';

interface EditableProps {
  cmsKey: string;
  children: React.ReactNode;
  className?: string;
  type?: 'text' | 'container';
}

const Editable: React.FC<EditableProps> = ({ cmsKey, children, className = '', type = 'text' }) => {
  const { isEditMode, cmsData, updateCMS } = useCMS();
  const [isDragging, setIsDragging] = useState(false);

  const savedData = cmsData[cmsKey] || {};
  const content = savedData.content !== undefined ? savedData.content : (typeof children === 'string' ? children : '');
  const color = savedData.color || '';
  const position = savedData.position || { x: 0, y: 0 };

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (!isEditMode) return;
    const newContent = e.target.innerText;
    updateCMS(cmsKey, { ...savedData, content: newContent });
  };

  const toggleColor = () => {
    const colors = ['', 'text-red-600', 'text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600'];
    const currentIndex = colors.indexOf(color);
    const nextIndex = (currentIndex + 1) % colors.length;
    updateCMS(cmsKey, { ...savedData, color: colors[nextIndex] });
  };

  const handleDragEnd = (_: any, info: any) => {
    const newPos = { 
      x: position.x + info.offset.x, 
      y: position.y + info.offset.y 
    };
    updateCMS(cmsKey, { ...savedData, position: newPos });
    setIsDragging(false);
  };

  const MotionTag = type === 'text' ? motion.span : motion.div;

  if (!isEditMode) {
    return (
      <MotionTag 
        style={{ x: position.x, y: position.y }}
        className={`${className} ${color} ${type === 'text' ? 'inline-block' : ''}`}
      >
        {savedData.content || children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      drag={isEditMode}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      style={{ x: position.x, y: position.y }}
      className={`relative group border-2 border-dashed ${isDragging ? 'border-red-500 z-50' : 'border-transparent hover:border-red-400/50'} transition-colors ${className} ${color} ${type === 'text' ? 'inline-block' : ''}`}
    >
      {isEditMode && (
        <span className="absolute -top-8 left-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-50 bg-white dark:bg-zinc-900 p-1 rounded-lg shadow-xl border border-red-500/20">
          <button onClick={toggleColor} className="p-1 hover:bg-red-500/10 rounded text-red-600"><Palette size={14} /></button>
          <span className="p-1 text-zinc-400 cursor-move"><Move size={14} /></span>
        </span>
      )}
      
      {type === 'text' ? (
        <span
          contentEditable={true}
          onBlur={handleBlur}
          suppressContentEditableWarning
          className="outline-none focus:ring-2 focus:ring-red-500/20 rounded px-1 inline-block min-w-[1ch]"
        >
          {content}
        </span>
      ) : (
        children
      )}
    </MotionTag>
  );
};

export default Editable;
