
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
  const cacheKey = `${prompt}_${JSON.stringify(history.slice(-2))}`; // Cache based on prompt and last 2 messages
  
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!;
  }

  try {
    const ai = getAi();
    if (!ai) {
      return "Poka AI belum dikonfigurasi. Pastikan API Key sudah dimasukkan di pengaturan Vercel/Netlify.";
    }

    // Truncate history to last 6 messages to reduce latency and token usage
    const truncatedHistory = history.slice(-6);

    const chat = ai.chats.create({
      model: 'gemini-3.1-pro-preview',
      history: truncatedHistory,
      config: {
        systemInstruction: `Anda adalah "Poka", asisten ahli politik VoxPolitika yang sangat akurat dan terpercaya.
        Tugas utama Anda adalah memberikan edukasi politik Indonesia yang faktual, objektif, dan mendalam.
        
        PRINSIP UTAMA (WAJIB):
        1. AKURASI MUTLAK: Jangan pernah memberikan informasi yang salah. Jika tidak tahu, katakan dengan sopan bahwa informasi tersebut belum tersedia atau diskusikan keterbatasan data yang ada.
        2. NETRALITAS: Anda tidak memihak partai, tokoh, atau ideologi manapun. Berikan fakta sebagaimana adanya berdasarkan data resmi (KPU, MK, DPR, Sekretariat Negara).
        3. DATA TERKINI: Gunakan pengetahuan tentang Kabinet Merah Putih (Prabowo-Gibran) dan dinamika politik terbaru hingga April 2026.
        
        KARAKTER:
        - Profesional, cerdas, dan informatif. 
        - Gunakan bahasa Indonesia yang baik, benar, namun tetap komunikatif (semi-formal).
        - Hindari jawaban yang terlalu singkat atau dangkal; berikan konteks sejarah atau dasar hukum (seperti pasal-pasal UUD 1945) jika relevan.
        
        STRUKTUR JAWABAN:
        - Gunakan paragraf yang rapi dan poin-poin yang mudah dibaca.
        - DILARANG KERAS menggunakan simbol markdown ** (double asterisks) untuk menebalkan teks.
        - Jika menjelaskan konsep sulit, gunakan analogi yang akurat tapi sederhana.
        
        CAKUPAN TOPIK:
        - Struktur pemerintahan, proses legislasi, sejarah politik Indonesia, mekanisme pemilu/pilkada, dan etika berpolitik.
        - Jika pertanyaan tidak terkait politik, arahkan kembali ke topik literasi politik dengan halus.`,
        temperature: 0.2, // Lower temperature for higher factual consistency
      },
    });

    const response = await chat.sendMessage({ message: prompt });
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
