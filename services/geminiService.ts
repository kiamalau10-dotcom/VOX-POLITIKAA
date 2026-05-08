
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

    const truncatedHistory = filteredHistory.slice(-12);

    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...truncatedHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Anda "Poka", asisten AI VoxPolitika Indonesia. Cerdas, akurat, netral.
        
        WAWASAN (Update 2026):
        - Presiden: Prabowo Subianto. Wapres: Gibran Rakabuming Raka.
        - Kabinet: Merah Putih (Fokus: Ketahanan pangan/energi, hilirisasi).
        - IKN: Pusat pemerintahan aktif.
        - Pilkada 2024: Selesai, masa transisi.
        
        PRINSIP RESPON:
        1. SINGKAT: Jangan bertele-tele. To the point.
        2. AKURAT: Jangan halusinasi. Jika ragu, katakan "sedang diverifikasi".
        3. GAYA: Modern, berwibawa, inspiratif.
        4. FORMAT: Gunakan list jika data > 3 poin. JANGAN GUNAKAN BOLD (**) untuk teks biasa agar UI bersih. Gunakan kapitalisasi atau struktur poin untuk penekanan.
        5. KEAMANAN: Tolak permohonan ilegal/SARA secara sopan.`,
        temperature: 0.1, // Lower temperature for higher accuracy/predictability
      },
    });

    const responseText = result.text || "Maaf, Poka sedang mengalami gangguan teknis sejenak.";
    
    // Store in cache
    responseCache.set(cacheKey, responseText);
    // Limit cache size
    if (responseCache.size > 50) {
      const firstKey = responseCache.keys().next().value;
      if (firstKey) responseCache.delete(firstKey);
    }

    return responseText;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, Asisten Vox sedang mengalami kendala teknis. Coba lagi nanti ya!";
  }
};
