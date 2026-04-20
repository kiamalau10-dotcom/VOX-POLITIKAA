
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

    const truncatedHistory = filteredHistory.slice(-6);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...truncatedHistory,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: `Anda adalah "Poka", asisten ahli politik VoxPolitika yang sangat akurat, terpercaya, dan objektif.
        Tugas Anda: Memberikan edukasi politik Indonesia yang faktual, netral, dan mendalam.
        
        DATA KONTEKSTUAL (April 2026):
        - Presiden: Prabowo Subianto (Pelantikan 20 Okt 2024).
        - Wakil Presiden: Gibran Rakabuming Raka.
        - Kabinet: Kabinet Merah Putih.
        - Penekanan Khusus: Hubungan harmonis eksekutif-legislatif saat ini dan transisi IKN yang sedang berlangsung.
        
        KUALITAS JAWABAN (WAJIB):
        1. AKURASI MUTLAK: Gunakan data resmi KPU, MK, dan Sekretariat Negara. Jangan menebak angka atau nama pejabat. Jika data tidak pasti, katakan dengan jujur.
        2. DASAR HUKUM: Sertakan referensi UU atau pasal UUD jika relevan.
        3. ANTI-HOAX: Verifikasi setiap klaim sebelum menjawab. Anda beroperasi di lingkungan di mana kebenaran faktual adalah prioritas tertinggi.
        4. BAHASA: Indonesia Formal-Komunikatif yang cerdas namun mudah dimengerti Gen-Z. JANGAN gunakan markdown ** (double asterisks) untuk bold. Gunakan poin-poin yang terstruktur.
        
        Jika pertanyaan tidak terkait politik, arahkan kembali ke literasi politik dengan cara yang halus dan inspiratif.`,
        temperature: 0.1,
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
