
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAsistenResponse } from '../services/geminiService';

import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Halo! Aku Poka. Ada hal tentang politik Indonesia yang bikin kamu penasaran? Tanya aja, ya!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await getAsistenResponse(userMsg, history as any);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-black rounded-[2.5rem] shadow-2xl border-2 border-black dark:border-white overflow-hidden flex flex-col h-[750px] transition-colors duration-500">
        {/* Header */}
        <div className="p-8 bg-red-600 text-white flex items-center justify-between shadow-lg relative z-10">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner border border-white/30">🤖</div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Poka</h3>
              <p className="text-xs text-red-100 font-bold uppercase tracking-widest">Edukasi & Literasi Politik</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-black/10 px-5 py-2.5 rounded-2xl border border-white/20">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Sistem Aktif</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] px-7 py-5 rounded-[2rem] shadow-lg text-base leading-relaxed font-medium ${
                  msg.role === 'user' 
                    ? 'bg-black dark:bg-white text-white dark:text-black rounded-tr-none' 
                    : 'bg-white dark:bg-black rounded-tl-none border-2 border-black/10 dark:border-white/10'
                } transition-colors duration-500`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-black px-7 py-5 rounded-[2rem] rounded-tl-none border-2 border-black/10 dark:border-white/10 shadow-md transition-colors duration-500">
                <div className="flex space-x-2">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="p-8 border-t border-black/10 dark:border-white/10">
          <div className="flex space-x-5">
            <input
              type="text"
              placeholder="Tanya apapun tentang politik..."
              className="flex-1 px-8 py-5 rounded-2xl border-2 border-black dark:border-white bg-transparent font-semibold focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all shadow-inner"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping}
              className="p-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-95 disabled:opacity-50"
            >
              <Send className="w-7 h-7" />
            </button>
          </div>
          <p className="mt-5 text-[10px] text-center opacity-40 font-bold uppercase tracking-widest">
            Poka menggunakan AI. Pastikan verifikasi info penting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
