
import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI correctly using the named parameter as required
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export const getAsistenResponse = async (prompt: string, history: { role: string; parts: { text: string }[] }[]) => {
  try {
    // Fix: Include conversation history to maintain context between turns
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
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
        
        ATURAN RESPON:
        - Jika ditanya tentang tokoh/partai, berikan fakta objektif (ideologi, rekam jejak, kursi parlemen).
        - Gunakan Markdown untuk struktur jawaban yang rapi (bold, list, quote).
        - Jika pertanyaan tidak relevan dengan politik, arahkan kembali dengan sopan.
        - Selalu akhiri dengan ajakan untuk terus belajar atau kuis di VoxPolitika.`,
        temperature: 0.7,
      },
    });

    // Fix: Using the correct sendMessage signature
    const response = await chat.sendMessage({ message: prompt });
    // Fix: Directly accessing the text property as per guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, Asisten Vox sedang mengalami kendala teknis. Coba lagi nanti ya!";
  }
};
