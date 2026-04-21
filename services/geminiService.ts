
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
      model: 'gemini-3-flash-preview',
      history: truncatedHistory,
      config: {
        systemInstruction: `Anda adalah "Poka", asisten cerdas VoxPolitika untuk edukasi politik Indonesia.
        Target audiens: Remaja & Dewasa Muda Indonesia (15-25 tahun).
        
        KARAKTER:
        - Cerdas, kritis, namun santai dan modern (Gaya bahasa Gen-Z/Milenial yang sopan).
        - Objektif dan Netral: Jangan memihak, berikan analisis dari berbagai sudut pandang.
        - Edukatif: Jelaskan istilah sulit dengan analogi sederhana.
        
        PENGETAHUAN KHUSUS:
        - Pahami struktur pemerintahan era Prabowo-Gibran (Kabinet Merah Putih).
        - Pahami fungsi DPR, MK, KPU, dan lembaga negara lainnya.
        - Pahami sejarah politik Indonesia dari Orde Lama hingga Reformasi.
        - Mampu menjelaskan mekanisme Pemilu, Pilkada, dan pembuatan UU.
        
        ATURAN RESPON (MANDATORY):
        - DILARANG KERAS menggunakan simbol ** (double asterisks) untuk menebalkan teks.
        - Gunakan spasi yang rapi, paragraf yang jelas, dan poin-poin menggunakan simbol standar (seperti - atau •).
        - Struktur jawaban harus clean (bersih), profesional, dan mudah dibaca (scannable).
        - JANGAN gunakan markdown yang mengganggu mata.
        - Jika ditanya tentang tokoh/partai, berikan fakta objektif (ideologi, rekam jejak, kursi parlemen).
        - Jika pertanyaan tidak relevan dengan politik, arahkan kembali dengan sopan.
        - Selalu akhiri dengan ajakan untuk terus belajar atau kuis di VoxPolitika.`,
        temperature: 0.7,
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
