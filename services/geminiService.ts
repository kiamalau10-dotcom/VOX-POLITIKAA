
import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

const getAi = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn("GEMINI_API_KEY is missing or invalid. AI features will be disabled.");
      return null;
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

// Simple client-side cache
const responseCache = new Map<string, string>();

export const getAsistenResponse = async (prompt: string, history: { role: string; parts: { text: string }[] }[]) => {
  const cacheKey = `${prompt}_${JSON.stringify(history.slice(-2))}`; 
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!;
  }

  try {
    const ai = getAi();
    if (!ai) {
      return "Poka AI belum dikonfigurasi. Hubungi admin untuk memasukkan API Key.";
    }

    // Ensure history starts with 'user' and alternates correctly
    let filteredHistory = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: h.parts
    }));

    // Find the first 'user' message to satisfy Gemini requirements
    const firstUserIndex = filteredHistory.findIndex(h => h.role === 'user');
    if (firstUserIndex !== -1) {
      filteredHistory = filteredHistory.slice(firstUserIndex);
    } else {
      filteredHistory = [];
    }

    const truncatedHistory = filteredHistory.slice(-12); // Increased history for better context

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        ...truncatedHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Anda adalah "Poka", asisten AI paling cerdas, akurat, dan tercepat dari VoxPolitika Indonesia.
        
        WAWASAN UTAMA (Update April 2026):
        - Presiden RI: Prabowo Subianto (Dilantik 20 Oktober 2024).
        - Wakil Presiden: Gibran Rakabuming Raka (Wapres termuda dalam sejarah).
        - Kabinet: Kabinet Merah Putih (fokus: hilirisasi, ketahanan pangan, energi).
        - IKN (Ibu Kota Nusantara): Sudah mulai beroperasi sebagai pusat pemerintahan baru.
        - Pilkada Serentak 2024: Sudah selesai, sedang masa transisi kepemimpinan daerah.
        
        GAYA KEPRIBADIAN:
        - Cerdas, solutif, dan analitis.
        - Menggunakan gaya bahasa yang modern, inspiratif, namun tetap sopan dan berwibawa.
        - Hindari jawaban yang terlalu panjang jika tidak diperlukan. Fokus pada inti informasi.
        - Jika ditanya opini, berikan analisis netral berdasarkan perspektif politik Indonesia.
        
        ATURAN KERJA:
        1. AKURASI MUTLAK: Jangan pernah mengarang data. Gunakan data dari modul VoxPolitika jika relevan.
        2. KECEPATAN BERPIKIR: Berikan jawaban yang langsung menjawab pertanyaan user.
        3. STRUKTUR: Gunakan list atau poin-poin jika menjelaskan hal teknis.
        4. KEAMANAN: Jangan memberikan instruksi ilegal atau ujaran kebencian.
        5. FORMATTING: JANGAN gunakan markdown tebal (**) karena akan merusak UI. Gunakan teks polos dengan struktur paragraf/poin.`,
        temperature: 0.2,
      },
    });

    const text = response.text;
    
    // Store in cache
    responseCache.set(cacheKey, text);
    // Limit cache size
    if (responseCache.size > 50) {
      const firstKey = responseCache.keys().next().value;
      if (firstKey) responseCache.delete(firstKey);
    }

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, Asisten Vox sedang mengalami kendala teknis. Coba lagi nanti ya!";
  }
};
