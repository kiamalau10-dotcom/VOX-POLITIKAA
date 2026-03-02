import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, History, CheckCircle2, ArrowLeft, ChevronRight, Award, 
  Gavel, Users, BarChart3, PieChart, ShieldAlert, FileText, MessageSquare, 
  Calendar, ExternalLink, TrendingUp, TrendingDown, Scale, Landmark, 
  Globe, Heart, Shield, Eye, Newspaper, Link, Zap, Target, Compass
} from 'lucide-react';

// --- 1. DATA TOKOH BANGSA (8 tokoh) ---
const tokohBangsa = [
  {
    id: 'soekarno',
    name: "Ir. Soekarno",
    role: "Presiden ke-1 / Proklamator",
    period: "1945 - 1967",
    image: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1629103956/ruro8lifdnazz6rfnlhn.jpg",
    contribution: "Merumuskan Pancasila sebagai dasar filsafat negara dan memimpin perjuangan kemerdekaan.",
    bio: "Lahir di Surabaya, beliau adalah penyambung lidah rakyat yang menyatukan ribuan pulau dengan satu ideologi: Pancasila."
  },
  {
    id: 'hatta',
    name: "Mohammad Hatta",
    role: "Wakil Presiden ke-1 / Bapak Koperasi",
    period: "1945 - 1956",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/VP_Hatta.jpg/500px-VP_Hatta.jpg",
    contribution: "Meletakkan fondasi ekonomi kerakyatan melalui Koperasi.",
    bio: "Seorang pemikir ekonomi dan organisator ulung yang percaya bahwa kemerdekaan politik harus dibarengi kemandirian ekonomi."
  },
  {
    id: 'habibie',
    name: "B.J. Habibie",
    role: "Presiden ke-3 / Bapak Teknologi",
    period: "1998 - 1999",
    image: "https://www.infobiografi.com/wp-content/uploads/2016/12/biografi-bj-habibie.jpg",
    contribution: "Mempelopori kebebasan pers dan otonomi daerah di era reformasi.",
    bio: "Ilmuwan dirgantara kelas dunia yang menjadi presiden di masa transisi tersulit Indonesia."
  },
  {
    id: 'gusdur',
    name: "Abdurrahman Wahid",
    role: "Presiden ke-4 / Bapak Pluralisme",
    period: "1999 - 2001",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/35/President_Abdurrahman_Wahid_-_Indonesia.jpg",
    contribution: "Memulihkan hak-hak sipil warga Tionghoa dan mengakui Konghucu sebagai agama resmi.",
    bio: "Tokoh kemanusiaan yang dikenal dengan pendekatan humor dalam menyelesaikan konflik."
  },
  {
    id: 'megawati',
    name: "Megawati Soekarnoputri",
    role: "Presiden ke-5 / Presiden Wanita Pertama",
    period: "2001 - 2004",
    image: "https://derapjuang.id/wp-content/uploads/2023/12/Megawati-Soekarnoputri-1.jpg?v=1703235442",
    contribution: "Membentuk lembaga KPK dan menyelenggarakan Pemilu langsung pertama tahun 2004.",
    bio: "Putri proklamator yang membawa stabilitas politik pasca krisis."
  },
  {
    id: 'soeharto',
    name: "Jenderal Besar TNI (Purn.) H.M. Soeharto",
    role: "Presiden RI ke-2",
    period: "1967–1998",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/President_Suharto%2C_1993.jpg/960px-President_Suharto%2C_1993.jpg",
    contribution: "Menekankan stabilitas politik dan pembangunan infrastruktur (Revolusi Hijau).",
    bio: "Presiden yang memimpin era Orde Baru dengan fokus pada pembangunan nasional."
  },
  {
    id: 'hamengkubuwono',
    name: "Sultan Hamengkubuwono IX",
    role: "Bapak Pramuka / Tokoh Diplomasi",
    period: "1945 - 1988",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hamengkubuwono_IX_official.jpg",
    contribution: "Menyatakan Yogyakarta bergabung dengan RI dan menjadi Wakil Presiden RI ke-2.",
    bio: "Raja yang meletakkan jabatan dan fasilitas kerajaannya demi kedaulatan Republik Indonesia."
  },
  {
    id: 'natsir',
    name: "Mohammad Natsir",
    role: "Perumus Mosi Integral Natsir",
    period: "1950 - 1951",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/02/Mohammad_Natsir.jpg",
    contribution: "Menyatukan kembali Indonesia dari negara serikat menjadi NKRI.",
    bio: "Pimpinan Masyumi yang dikenal sangat sederhana dan jujur."
  }
];

// --- 2. DATA MODUL LENGKAP 20 DENGAN DATA AKTUAL ---
const modules = [
  // === KELOMPOK 1: DASAR TATA NEGARA (1-6) ===
  {
    id: 'hakekat-politik',
    title: 'Hakekat Politik',
    desc: 'Memahami politik sebagai seni mengelola kekuasaan dan kebijakan publik.',
    icon: '⚖️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Politik adalah seni dan ilmu untuk mencapai kekuasaan secara konstitusional serta cara masyarakat mengatur dirinya sendiri melalui kebijakan publik.",
      dataUtama: {
        judul: "Indeks Kualitas Kebijakan Publik 2025",
        periode: "Januari - September 2025",
        sumber: "Kementerian PANRB",
        data: [
          { indikator: "Partisipasi Masyarakat", skor: 78.5, perubahan: "+2.3" },
          { indikator: "Transparansi Kebijakan", skor: 72.1, perubahan: "+1.8" },
          { indikator: "Akuntabilitas Publik", skor: 69.7, perubahan: "-0.5" },
          { indikator: "Responsivitas Pemerintah", skor: 74.2, perubahan: "+3.1" }
        ]
      },
      subSections: [
        {
          title: "Kekuasaan & Etika dalam Praktik Terkini",
          content: "Implementasi etika politik di lingkungan pemerintahan 2025",
          data: [
            "LHKPN: 87% pejabat wajib lapor telah menyerahkan laporan (target 95%)",
            "Kasus pelanggaran etik DPR: 12 laporan ke MKD sepanjang 2025",
            "Putusan DKPP: 8 penyelenggara pemilu dijatuhi sanksi etik"
          ]
        },
        {
          title: "Kebijakan Publik Prioritas 2025",
          content: "Program-program unggulan pemerintah yang membutuhkan dukungan politik",
          data: [
            { program: "Makan Bergizi Gratis", anggaran: "Rp71 T", target: "Anak sekolah & ibu hamil" },
            { program: "Cek Kesehatan Gratis", anggaran: "Rp3,2 T", target: "Masyarakat umum" },
            { program: "Program Keluarga Harapan", anggaran: "Rp74,6 T", target: "10 juta keluarga" }
          ]
        }
      ]
    }
  },
  {
    id: 'lembaga-negara',
    title: 'Lembaga Negara',
    desc: 'Struktur Trias Politica (Eksekutif, Legislatif, Yudikatif) di Indonesia.',
    icon: '🏛️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Lembaga negara adalah institusi yang menjalankan kekuasaan negara berdasarkan UUD 1945 dengan sistem check and balances.",
      dataUtama: {
        judul: "Komposisi Lembaga Tinggi Negara 2024-2029",
        periode: "Hasil Pemilu 2024",
        sumber: "KPU RI",
        data: [
          { lembaga: "Presiden & Wakil Presiden", hasil: "Prabowo-Gibran", periode: "2024-2029" },
          { lembaga: "DPR RI", hasil: "8 partai (58% kursi)", periode: "2024-2029" },
          { lembaga: "DPD RI", hasil: "152 anggota", periode: "2024-2029" },
          { lembaga: "MPR RI", hasil: "711 anggota (DPR+DPD)", periode: "2024-2029" }
        ]
      },
      subSections: [
        {
          title: "Kinerja Lembaga Negara 2025",
          content: "Capaian dan tantangan lembaga negara semester I 2025",
          data: [
            { lembaga: "Mahkamah Agung", indikator: "Putusan kasasi", capaian: "12.450 perkara" },
            { lembaga: "Mahkamah Konstitusi", indikator: "Uji materi", capaian: "38 permohonan" },
            { lembaga: "Komisi Yudisial", indikator: "Pengawasan hakim", capaian: "21 laporan masyarakat" },
            { lembaga: "BPK", indikator: "Opini WTP", capaian: "85% kementerian/lembaga" }
          ]
        }
      ]
    }
  },
  {
    id: 'sistem-demokrasi',
    title: 'Sistem Demokrasi',
    desc: 'Kedaulatan rakyat dan prinsip musyawarah dalam Demokrasi Pancasila.',
    icon: '🗳️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Demokrasi adalah sistem pemerintahan di mana kekuasaan tertinggi berada di tangan rakyat dan dijalankan melalui mekanisme perwakilan maupun langsung.",
      dataUtama: {
        judul: "Indeks Demokrasi Indonesia (IDI) 2025",
        periode: "Tahun 2025",
        sumber: "Kemenko Polkam & BPS",
        peringkat: [
          { provinsi: "DI Yogyakarta", skor: 89.25, perubahan: "+5.37", status: "naik" },
          { provinsi: "DKI Jakarta", skor: 84.67, perubahan: "+2.10", status: "naik" },
          { provinsi: "Jawa Tengah", skor: 83.42, perubahan: "+1.80", status: "naik" },
          { provinsi: "Bali", skor: 82.91, perubahan: "+0.50", status: "naik" },
          { provinsi: "Jawa Timur", skor: 81.73, perubahan: "-0.30", status: "turun" }
        ]
      },
      subSections: [
        {
          title: "3 Aspek IDI 2025",
          content: "Performa demokrasi berdasarkan tiga aspek utama",
          data: [
            { aspek: "Kebebasan Sipil", skorNasional: 85.3, provinsiTertinggi: "DIY (92.1)" },
            { aspek: "Kesetaraan", skorNasional: 79.8, provinsiTertinggi: "Bali (88.4)" },
            { aspek: "Kapasitas Lembaga", skorNasional: 81.2, provinsiTertinggi: "Jateng (87.6)" }
          ]
        }
      ]
    }
  },
  {
    id: 'mekanisme-pemilu',
    title: 'Mekanisme Pemilu',
    desc: 'Penjelasan asas LUBER JURDIL dan sirkulasi kepemimpinan.',
    icon: '📩',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: "Pemilu adalah proses demokratis untuk memilih pemimpin dan wakil rakyat yang dilaksanakan secara periodik.",
      dataUtama: {
        judul: "Rekapitulasi Pemilu 2024 & Pilkada 2024",
        periode: "Pemilu 14 Feb 2024, Pilkada 27 Nov 2024",
        sumber: "KPU RI",
        data: [
          { kategori: "DPR RI", totalSuara: "151 juta", partisipasi: "81.4%" },
          { kategori: "Presiden", pemenang: "Prabowo-Gibran", persentase: "58.6%" },
          { kategori: "Pilkada Serentak", jumlahDaerah: "545 daerah", partisipasi: "76.5%" }
        ]
      },
      subSections: [
        {
          title: "Pilkada Ulang 2025",
          content: "Daerah yang menggelar Pilkada ulang akibat sengketa atau bencana",
          data: [
            { daerah: "Kabupaten Bangka", jadwal: "Agustus 2025", partisipasi: "54,92%" },
            { daerah: "Kota Pangkalpinang", jadwal: "Agustus 2025", partisipasi: "48%" }
          ]
        }
      ]
    }
  },
  {
    id: 'penyelenggara-pemilu',
    title: 'Penyelenggara Pemilu',
    desc: 'Mengenal peran independen KPU, Bawaslu, dan DKPP.',
    icon: '🛡️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Lembaga independen yang memastikan pemilu berjalan bersih, jujur, dan adil.",
      dataUtama: {
        judul: "Kinerja Penyelenggara Pemilu 2025",
        periode: "Januari - September 2025",
        sumber: "DKPP RI",
        data: [
          { lembaga: "KPU", jumlahPelanggaran: "23", sanksiDKPP: "5" },
          { lembaga: "Bawaslu", jumlahPelanggaran: "17", sanksiDKPP: "3" },
          { lembaga: "DKPP", putusanEtik: "31", pengadu: "Masyarakat & peserta pemilu" }
        ]
      },
      subSections: [
        {
          title: "Rekomendasi Bawaslu 2025",
          content: "Catatan perbaikan untuk penyelenggaraan pemilu mendatang",
          data: [
            "Perbaikan daftar pemilih berkelanjutan",
            "Penguatan pengawasan kampanye di media sosial",
            "Peningkatan aksesibilitas TPS bagi disabilitas"
          ]
        }
      ]
    }
  },
  {
    id: 'hak-kewajiban',
    title: 'Hak & Kewajiban',
    desc: 'Tanggung jawab etis dan kontrak sosial warga negara terhadap negara.',
    icon: '👤',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Hubungan timbal balik antara individu dan negara yang diatur dalam konstitusi dan undang-undang.",
      dataUtama: {
        judul: "Kepatuhan Wajib Pajak 2025",
        periode: "Januari - Agustus 2025",
        sumber: "Direktorat Jenderal Pajak",
        data: [
          { kategori: "Wajib Pajak Orang Pribadi", kepatuhan: "72%", target: "80%" },
          { kategori: "Wajib Pajak Badan", kepatuhan: "68%", target: "75%" },
          { kategori: "Penerimaan Pajak", realisasi: "Rp1.200 T", target: "Rp1.850 T" }
        ]
      },
      subSections: [
        {
          title: "Partisipasi Bela Negara",
          content: "Data kesadaran bela negara di kalangan generasi muda",
          data: [
            "Pendaftar TNI/Polri 2025: 850.000 pelamar (naik 12%)",
            "Peserta wajib latih bela negara: 45.000 mahasiswa",
            "Anggota Cadangan TNI: 5.200 personel tersebar di 34 provinsi"
          ]
        }
      ]
    }
  },

  // === KELOMPOK 2: IDEOLOGI & STRUKTUR HUKUM (7-12) ===
  {
    id: 'filsafat-pancasila',
    title: 'Filsafat Pancasila',
    desc: 'Bedah mendalam 5 sila sebagai dasar hukum dan identitas bangsa.',
    icon: '🇮🇩',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Pancasila adalah ideologi bangsa yang menjadi sumber dari segala sumber hukum dan pandangan hidup bangsa Indonesia.",
      dataUtama: {
        judul: "Indeks Toleransi Beragama 2025",
        periode: "Survei Setara Institute",
        sumber: "Setara Institute",
        data: [
          { provinsi: "Nusa Tenggara Timur", skor: 92.4, kategori: "Sangat Tinggi" },
          { provinsi: "Bali", skor: 90.2, kategori: "Sangat Tinggi" },
          { provinsi: "DIY", skor: 88.7, kategori: "Tinggi" },
          { provinsi: "DKI Jakarta", skor: 78.3, kategori: "Sedang" },
          { provinsi: "Aceh", skor: 65.1, kategori: "Rendah" }
        ]
      },
      subSections: [
        {
          title: "Implementasi Nilai Pancasila dalam Kebijakan",
          content: "Program-program yang merefleksikan nilai-nilai Pancasila",
          data: [
            { sila: "Ketuhanan", program: "Fasilitasi rumah ibadah", anggaran: "Rp1,2 T" },
            { sila: "Kemanusiaan", program: "Bansos PKH", penerima: "10 juta keluarga" },
            { sila: "Persatuan", program: "Program Indonesia Pintar", siswa: "18,6 juta" },
            { sila: "Kerakyatan", program: "Musrenbang desa", partisipasi: "65% desa" },
            { sila: "Keadilan", program: "Subsidi energi", nilai: "Rp108 T" }
          ]
        }
      ]
    }
  },
  {
    id: 'politik-luar-negeri',
    title: 'Politik Luar Negeri',
    desc: 'Prinsip Bebas Aktif Indonesia dan peran dalam perdamaian dunia.',
    icon: '🌍',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Politik luar negeri Indonesia adalah kebijakan, sikap, dan langkah pemerintah dalam hubungan dengan negara lain untuk kepentingan nasional.",
      dataUtama: {
        judul: "Peran Indonesia di Kancah Internasional 2025",
        periode: "2025",
        sumber: "Kementerian Luar Negeri",
        data: [
          { peran: "Misi Perdamaian PBB (UNIFIL)", jumlahPersonel: "1.200 personel", negara: "Lebanon" },
          { peran: "Presidensi G20", tahun: "2022", capaian: "48 kesepakatan" },
          { peran: "Keketuaan ASEAN", tahun: "2023", capaian: "54 dokumen" },
          { peran: "Konferensi Tingkat Tinggi", tahun: "2025", tuanRumah: "Indonesia-Afrika" }
        ]
      },
      subSections: [
        {
          title: "Kerja Sama Ekonomi Internasional",
          content: "Nilai perdagangan dan investasi dengan mitra strategis",
          data: [
            { mitra: "China", ekspor: "$65,2 M", impor: "$58,1 M" },
            { mitra: "Jepang", ekspor: "$24,5 M", impor: "$18,3 M" },
            { mitra: "Amerika Serikat", ekspor: "$28,7 M", impor: "$12,9 M" },
            { mitra: "Uni Eropa", ekspor: "$21,3 M", impor: "$15,2 M" }
          ]
        }
      ]
    }
  },
  {
    id: 'uud-1945',
    title: 'UUD 1945',
    desc: 'Sejarah konstitusi dan poin-poin penting pasca empat kali amandemen.',
    icon: '📜',
    dataTahun: '2025',
    fullContent: {
      pengertian: "UUD 1945 adalah hukum dasar tertulis yang menjadi sumber segala peraturan perundang-undangan di Indonesia.",
      dataUtama: {
        judul: "Perkara Uji Materi di Mahkamah Konstitusi 2025",
        periode: "Januari - September 2025",
        sumber: "Mahkamah Konstitusi RI",
        data: [
          { bulan: "Januari", jumlahPerkara: "12", dikabulkan: "3", ditolak: "5" },
          { bulan: "Februari", jumlahPerkara: "8", dikabulkan: "2", ditolak: "4" },
          { bulan: "Maret", jumlahPerkara: "15", dikabulkan: "4", ditolak: "7" },
          { bulan: "April", jumlahPerkara: "10", dikabulkan: "1", ditolak: "6" },
          { total: "Total", jumlahPerkara: "45", dikabulkan: "10", ditolak: "22" }
        ]
      },
      subSections: [
        {
          title: "Putusan MK Penting 2025",
          content: "Putusan yang berdampak luas pada kebijakan nasional",
          data: [
            "UU Cipta Kerja: dikabulkan sebagian (Februari 2025)",
            "UU KPK: ditolak seluruhnya (Maret 2025)",
            "UU Pemilu: dikabulkan terkait ambang batas parlemen (Juni 2025)"
          ]
        }
      ]
    }
  },
  {
    id: 'otonomi-daerah',
    title: 'Otonomi Daerah',
    desc: 'Sistem desentralisasi dan pembagian wewenang pusat ke daerah.',
    icon: '🗺️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Otonomi daerah adalah hak, wewenang, dan kewajiban daerah otonom untuk mengatur dan mengurus sendiri urusan pemerintahan.",
      dataUtama: {
        judul: "Realisasi Transfer ke Daerah 2025",
        periode: "Hingga September 2025",
        sumber: "Kementerian Keuangan",
        data: [
          { jenis: "Dana Alokasi Umum (DAU)", realisasi: "Rp342,5 T", persentase: "78%" },
          { jenis: "Dana Alokasi Khusus (DAK)", realisasi: "Rp98,7 T", persentase: "65%" },
          { jenis: "Dana Desa", realisasi: "Rp52,3 T", persentase: "70%" },
          { jenis: "Dana Bagi Hasil (DBH)", realisasi: "Rp45,6 T", persentase: "82%" }
        ]
      },
      subSections: [
        {
          title: "Kinerja Pemerintah Daerah 2025",
          content: "Evaluasi kinerja pemda berdasarkan laporan Kemendagri",
          data: [
            { provinsi: "Jawa Timur", opiniBPK: "WTP", inovasi: "25 program unggulan" },
            { provinsi: "Jawa Barat", opiniBPK: "WTP", inovasi: "18 program unggulan" },
            { provinsi: "Papua", opiniBPK: "WDP", inovasi: "5 program unggulan" }
          ]
        },
        {
          title: "Provinsi Baru Hasil Pemekaran",
          content: "Evaluasi 4 DOB Papua (2022-2025)",
          data: [
            "Papua Selatan: progres infrastruktur 45%",
            "Papua Tengah: progres infrastruktur 38%",
            "Papua Pegunungan: progres infrastruktur 42%",
            "Papua Barat Daya: progres infrastruktur 51%"
          ]
        }
      ]
    }
  },
  {
    id: 'partai-politik',
    title: 'Partai Politik',
    desc: 'Fungsi partai sebagai pilar rekrutmen dan artikulasi politik rakyat.',
    icon: '🚩',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Partai politik adalah organisasi yang dibentuk untuk memperjuangkan cita-cita dan kepentingan rakyat serta merebut kekuasaan secara konstitusional.",
      dataUtama: {
        judul: "Komposisi DPR RI Hasil Pemilu 2024",
        periode: "2024-2029",
        sumber: "KPU RI",
        data: [
          { partai: "PDIP", kursi: "110", persentase: "19.1%" },
          { partai: "Golkar", kursi: "102", persentase: "17.7%" },
          { partai: "Gerindra", kursi: "86", persentase: "14.9%" },
          { partai: "PKB", kursi: "68", persentase: "11.8%" },
          { partai: "NasDem", kursi: "59", persentase: "10.2%" },
          { partai: "PKS", kursi: "53", persentase: "9.2%" },
          { partai: "Demokrat", kursi: "44", persentase: "7.6%" },
          { partai: "PAN", kursi: "38", persentase: "6.6%" }
        ]
      },
      subSections: [
        {
          title: "Pendanaan Partai Politik 2025",
          content: "Bantuan keuangan partai politik dari APBN",
          data: [
            "Total bantuan: Rp168 miliar per tahun",
            "Per kursi DPR: Rp1,5 miliar per tahun",
            "Partai penerima tertinggi: PDIP (Rp16,5 miliar)",
            "Sanksi pengurangan: 5 partai kena sanksi karena tidak laporkan keuangan"
          ]
        }
      ]
    }
  },
  {
    id: 'integritas-politik',
    title: 'Integritas Politik',
    desc: 'Budaya anti-korupsi dan transparansi dalam birokrasi.',
    icon: '💎',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Integritas politik adalah nilai kejujuran, transparansi, dan akuntabilitas sebagai dasar tata kelola pemerintahan yang bersih.",
      dataUtama: {
        judul: "Indeks Persepsi Korupsi Indonesia 2025",
        periode: "Tahun 2025",
        sumber: "Transparency International",
        data: [
          { tahun: "2023", skor: "34", peringkat: "115 dari 180 negara" },
          { tahun: "2024", skor: "36", peringkat: "110 dari 180 negara" },
          { tahun: "2025", skor: "38", peringkat: "105 dari 180 negara" }
        ]
      },
      subSections: [
        {
          title: "Penindakan Korupsi oleh KPK 2025",
          content: "Data penanganan perkara korupsi",
          data: [
            { jenis: "Penyelidikan", jumlah: "85 perkara" },
            { jenis: "Penyidikan", jumlah: "62 perkara" },
            { jenis: "Penuntutan", jumlah: "48 perkara" },
            { jenis: "Eksekusi", jumlah: "35 perkara" },
            { jenis: "Kerugian Negara", nilai: "Rp2,3 Triliun" }
          ]
        },
        {
          title: "LHKPN 2025",
          content: "Kepatuhan pelaporan harta kekayaan pejabat negara",
          data: [
            "Wajib lapor: 375.000 pejabat",
            "Telah lapor: 326.250 (87%)",
            "Tepat waktu: 290.000 (77.3%)",
            "Sanksi administratif: 1.200 pejabat"
          ]
        }
      ]
    }
  },

  // === KELOMPOK 3: INSTRUMEN & PARTISIPASI PUBLIK (13-20) ===
  {
    id: 'hak-konstitusional',
    title: 'Hak Konstitusional',
    desc: 'Ringkasan hak dasar warga dan cara menggugat jika hak dilanggar.',
    icon: '⚖️',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Hak konstitusional adalah hak-hak yang diberikan langsung oleh UUD 1945 kepada warga negara.",
      dataUtama: {
        judul: "Pengaduan Masyarakat ke Komnas HAM 2025",
        periode: "Januari - September 2025",
        sumber: "Komnas HAM",
        data: [
          { jenisPelanggaran: "Hak atas keadilan", jumlah: "234 laporan" },
          { jenisPelanggaran: "Hak atas rasa aman", jumlah: "187 laporan" },
          { jenisPelanggaran: "Hak berpendapat", jumlah: "98 laporan" },
          { jenisPelanggaran: "Diskriminasi", jumlah: "76 laporan" },
          { jenisPelanggaran: "Hak atas pekerjaan", jumlah: "45 laporan" }
        ]
      },
      subSections: [
        {
          title: "Permohonan Uji Materi ke MK",
          content: "Perkara pengujian undang-undang oleh warga negara",
          data: [
            "Total permohonan 2025: 45 perkara",
            "Pemohon perorangan: 28 perkara (62%)",
            "Pemohon LSM: 10 perkara (22%)",
            "Pemohon pemerintah daerah: 7 perkara (16%)"
          ]
        }
      ]
    }
  },
  {
    id: 'partisipasi-publik',
    title: 'Partisipasi Publik',
    desc: 'Panduan praktis cara menyampaikan aspirasi dan audiensi parlemen.',
    icon: '📣',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Partisipasi publik adalah keterlibatan warga negara dalam proses pengambilan keputusan kebijakan publik.",
      dataUtama: {
        judul: "Partisipasi Masyarakat dalam Musrenbang 2025",
        periode: "Tahun 2025",
        sumber: "Bappenas",
        data: [
          { tingkat: "Desa/Kelurahan", partisipasi: "68%", usulan: "850.000 usulan" },
          { tingkat: "Kecamatan", partisipasi: "52%", usulan: "420.000 usulan" },
          { tingkat: "Kabupaten/Kota", partisipasi: "41%", usulan: "210.000 usulan" },
          { tingkat: "Provinsi", partisipasi: "32%", usulan: "85.000 usulan" },
          { tingkat: "Nasional", partisipasi: "18%", usulan: "12.000 usulan" }
        ]
      },
      subSections: [
        {
          title: "Pengaduan Melalui LAPOR!",
          content: "Layanan Aspirasi dan Pengaduan Online Rakyat",
          data: [
            "Total laporan 2025: 450.000 laporan",
            "Terselesaikan: 382.500 (85%)",
            "Rata-rata waktu penyelesaian: 5 hari kerja",
            "Instansi teraktif: Kemensos (45.000 laporan)"
          ]
        }
      ]
    }
  },
  {
    id: 'rekam-jejak-dpr',
    title: 'Rekam Jejak DPR',
    desc: 'Data kehadiran, inisiasi UU, dan kinerja wakil rakyat.',
    icon: '📊',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: "Rekam jejak anggota dewan adalah catatan kinerja wakil rakyat selama masa jabatan.",
      dataUtama: {
        judul: "Kinerja DPR RI Tahun Sidang 2024-2025",
        periode: "Agustus 2024 - Oktober 2025",
        sumber: "DPR RI & Formappi",
        data: [
          { kategori: "Rapat Paripurna", total: "48 rapat", kehadiranRata: "78%" },
          { kategori: "RUU yang Disahkan", total: "32 RUU", inisiatifDPR: "18" },
          { kategori: "Kunjungan Kerja", total: "125 kunjungan", anggaran: "Rp45 M" },
          { kategori: "Reses", total: "4 kali", serapanAspirasi: "12.000 usulan" }
        ]
      },
      subSections: [
        {
          title: "Tunjangan Anggota DPR (Pasca Pemangkasan 2025)",
          content: "Data tunjangan setelah pemangkasan September 2025",
          data: [
            { komponen: "Take Home Pay sebelumnya", nominal: "Rp100+ juta/bulan" },
            { komponen: "Take Home Pay baru", nominal: "Rp65,5 juta/bulan" },
            { komponen: "Tunjangan Komunikasi Intensif", nominal: "Rp20,03 juta/bulan" },
            { komponen: "UMR Jakarta (pembanding)", nominal: "Rp5,39 juta/bulan" }
          ]
        },
        {
          title: "Kritik Formappi",
          content: "Catatan Forum Masyarakat Peduli Parlemen Indonesia",
          data: [
            "Tunjangan komunikasi intensif belum jelas output komunikasi",
            "Duplikasi tunjangan: tunjangan jabatan dan tunjangan kehormatan",
            "Respon Puan: 'DPR harus berani dikritik, jawab dengan kerja nyata'"
          ]
        }
      ]
    }
  },
  {
    id: 'apbn-apbd',
    title: 'APBN & APBD 2025',
    desc: 'Visualisasi aliran uang rakyat (pajak) untuk layanan publik.',
    icon: '💰',
    dataTahun: '2025',
    fullContent: {
      pengertian: "APBN adalah rencana keuangan tahunan negara yang disetujui DPR, APBD untuk pemerintah daerah.",
      dataUtama: {
        judul: "Realisasi Program Prioritas APBN 2025",
        periode: "Hingga Agustus 2025",
        sumber: "Kementerian Keuangan",
        totalRealisasi: "Rp 420,2 Triliun",
        data: [
          { program: "Program Keluarga Harapan (PKH)", anggaran: "Rp74,6 T", penerima: "10 juta keluarga" },
          { program: "Tunjangan Profesi Guru", anggaran: "Rp53,2 T", penerima: "Guru dan dosen" },
          { program: "Subsidi Energi", anggaran: "Rp41,5 T", keterangan: "Hingga September 2025" },
          { program: "Kompensasi Energi", anggaran: "Rp66,5 T", keterangan: "Menjaga stabilitas harga" },
          { program: "Program Sembako/BPNT", anggaran: "Rp34,4 T", penerima: "KPM" },
          { program: "Jaminan Kesehatan Nasional", anggaran: "Rp34,7 T", keterangan: "Hingga September 2025" },
          { program: "Program Indonesia Pintar", anggaran: "Rp8,7 T", penerima: "18,6 juta siswa" },
          { program: "KIP Kuliah", anggaran: "Rp9,8 T", penerima: "1,05 juta mahasiswa" },
          { program: "Tapera & FLPP", anggaran: "Rp21,3 T", penerima: "226 ribu MBR" }
        ]
      },
      subSections: [
        {
          title: "Program Makan Bergizi Gratis",
          content: "Program unggulan pemerintahan baru",
          data: [
            { tahun: "2025", anggaran: "Rp71 Triliun", keterangan: "Anggaran awal" },
            { target: "Penerima Manfaat", nilai: "Anak sekolah dan ibu hamil", keterangan: "Nasional" }
          ]
        },
        {
          title: "Cek Kesehatan Gratis",
          content: "Program prioritas kesehatan 2025",
          data: [
            { anggaran: "Rp3,2 Triliun", keterangan: "Alokasi APBN 2025" },
            { sumber: "Kemenkeu", detail: "Bagian dari belanja kesehatan Rp218,5 T" }
          ]
        }
      ]
    }
  },
  {
    id: 'indeks-demokrasi',
    title: 'Indeks Demokrasi Indonesia (IDI)',
    desc: 'Parameter pengukuran kesehatan kebebasan pers dan hak sipil.',
    icon: '📈',
    dataTahun: '2025',
    fullContent: {
      pengertian: "IDI adalah instrumen yang mengukur perkembangan demokrasi di tingkat provinsi berdasarkan tiga aspek.",
      dataUtama: {
        judul: "IDI 2025 - 10 Provinsi Tertinggi & Terendah",
        periode: "Tahun 2025 (diumumkan September 2025)",
        sumber: "Kemenko Polkam & BPS",
        peringkat: [
          { provinsi: "DI Yogyakarta", skor: 89.25, perubahan: "+5.37", status: "naik", peringkat: 1 },
          { provinsi: "DKI Jakarta", skor: 84.67, perubahan: "+2.10", status: "naik", peringkat: 2 },
          { provinsi: "Jawa Tengah", skor: 83.42, perubahan: "+1.80", status: "naik", peringkat: 3 },
          { provinsi: "Bali", skor: 82.91, perubahan: "+0.50", status: "naik", peringkat: 4 },
          { provinsi: "Jawa Timur", skor: 81.73, perubahan: "-0.30", status: "turun", peringkat: 5 },
          { provinsi: "Papua", skor: 62.18, perubahan: "-2.50", status: "turun", peringkat: 34 },
          { provinsi: "Aceh", skor: 64.32, perubahan: "-1.80", status: "turun", peringkat: 33 }
        ]
      },
      subSections: [
        {
          title: "Studi Kasus: DIY vs Kaltim",
          content: "Perbandingan faktor keberhasilan dan penurunan",
          data: [
            { provinsi: "DI Yogyakarta (naik 5,37)", faktor: "Kebebasan sipil terjamin, dialog publik konstruktif, nilai lokalitas" },
            { provinsi: "Kalimantan Timur (turun 1,59)", faktor: "Demo anarkis (kebebasan turun), resapan aspirasi menurun (kesetaraan turun)" }
          ]
        }
      ]
    }
  },
  {
    id: 'buku-putih',
    title: 'Buku Putih Kebijakan',
    desc: 'Dokumentasi naskah akademik di balik kebijakan-kebijakan besar.',
    icon: '📖',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Buku putih kebijakan adalah dokumen resmi yang menjelaskan latar belakang, analisis, dan argumentasi kebijakan publik.",
      dataUtama: {
        judul: "Naskah Akademik yang Disusun 2025",
        periode: "Januari - September 2025",
        sumber: "Bappenas & DPR",
        data: [
          { judul: "RUU Kesejahteraan Ibu dan Anak", status: "Selesai", lembaga: "Bappenas" },
          { judul: "RUU Perampasan Aset", status: "Pembahasan", lembaga: "Kemenkumham" },
          { judul: "RUU Masyarakat Hukum Adat", status: "Naskah awal", lembaga: "Kemendagri" },
          { judul: "RUU Perlindungan Pekerja Rumah Tangga", status: "Selesai", lembaga: "Kemnaker" }
        ]
      },
      subSections: [
        {
          title: "Penyempurnaan Naskah Akademik IDI",
          content: "Penguatan metodologi IDI 2025",
          data: [
            "Indikator 15: Kinerja legislasi DPRD - disempurnakan",
            "Indikator 22: Fungsi kaderisasi partai politik - ditambahkan",
            "Indikator baru: Partisipasi perempuan dalam politik"
          ]
        }
      ]
    }
  },
  {
    id: 'forum-pakar',
    title: 'Forum Tanya Pakar',
    desc: 'Ruang interaktif untuk konsultasi isu politik dengan para ahli.',
    icon: '💬',
    dataTahun: '2025',
    fullContent: {
      pengertian: "Forum tanya pakar adalah wadah diskusi antara masyarakat dengan akademisi, praktisi hukum, dan mantan pejabat.",
      dataUtama: {
        judul: "Topik Diskusi Publik 2025",
        periode: "Januari - September 2025",
        sumber: "Berbagai platform",
        data: [
          { topik: "Efektivitas Pemilu 2024", panelis: "Titi Anggraini", peserta: "1.200" },
          { topik: "Korupsi Politik", panelis: "Laode Syarif", peserta: "850" },
          { topik: "Reformasi Birokrasi", panelis: "Eko Prasojo", peserta: "950" },
          { topik: "Otonomi Daerah", panelis: "Ryaas Rasyid", peserta: "700" }
        ]
      },
      subSections: [
        {
          title: "Kesimpulan Diskusi",
          content: "Rangkuman pandangan pakar",
          data: [
            "Titi Anggraini: 'Perlu penyederhanaan sistem pemilu untuk efisiensi'",
            "Laode Syarif: 'Korupsi politik mencegah jika transparansi pendanaan partai'",
            "Eko Prasojo: 'Digitalisasi birokrasi kunci efisiensi'"
          ]
        }
      ]
    }
  },
  {
    id: 'kalender-politik',
    title: 'Kalender Politik 2025-2026',
    desc: 'Jadwal krusial Pemilu, Pilkada, dan masa sidang kenegaraan.',
    icon: '📅',
    dataTahun: '2025-2026',
    fullContent: {
      pengertian: "Kalender politik adalah agenda penting ketatanegaraan yang memuat jadwal-jadwal krusial dalam siklus politik Indonesia.",
      dataUtama: {
        judul: "Agenda Politik Nasional 2025-2026",
        periode: "Oktober 2025 - Desember 2026",
        sumber: "KPU RI & DPR RI",
        data: [
          { tanggal: "16 Agustus 2025", agenda: "Pidato Kenegaraan Presiden", keterangan: "HUT RI ke-80" },
          { tanggal: "September 2025", agenda: "Pengumuman IDI 2025", keterangan: "Kemenko Polkam" },
          { tanggal: "Oktober - Desember 2025", agenda: "Masa Sidang DPR", keterangan: "Pembahasan RAPBN 2026" },
          { tanggal: "Februari 2026", agenda: "Pilkada Ulang", keterangan: "Daerah sengketa" },
          { tanggal: "Agustus 2026", agenda: "Penyampaian RAPBN 2027", keterangan: "Presiden" },
          { tanggal: "November 2026", agenda: "Reses DPR", keterangan: "Penyerapan aspirasi" }
        ]
      },
      subSections: [
        {
          title: "Tahapan Pemilu 2029",
          content: "Jadwal persiapan Pemilu 2029 yang sudah dimulai",
          data: [
            "2025: Pemutakhiran data pemilih berkelanjutan",
            "2026: Penyusunan regulasi teknis",
            "2027: Verifikasi partai politik",
            "2028: Pendaftaran calon legislatif",
            "2029: Pelaksanaan Pemilu"
          ]
        }
      ]
    }
  }
];

// --- 3. KOMPONEN TABEL DATA ---
const DataTable: React.FC<{ data: any[], columns?: string[] }> = ({ data, columns }) => {
  if (!data || data.length === 0) return null;
  
  const keys = columns || Object.keys(data[0]);
  
  return (
    <div className="overflow-x-auto my-6 border-2 border-black rounded-xl">
      <table className="min-w-full divide-y divide-black">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {keys.map((key, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200">
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
              {keys.map((key, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-sm">
                  {row[key] !== undefined && row[key] !== null ? String(row[key]) : '-'}
                  {key === 'perubahan' && row.status === 'naik' && <TrendingUp className="inline ml-2 text-green-600 w-4 h-4" />}
                  {key === 'perubahan' && row.status === 'turun' && <TrendingDown className="inline ml-2 text-red-600 w-4 h-4" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- 4. KOMPONEN STUDY ROOM ---
const StudyRoom: React.FC<{ module: typeof modules[0]; onBack: () => void; onComplete: (id: string) => void }> = ({ module, onBack, onComplete }) => {
  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25 }} className="fixed inset-0 z-[200] bg-zinc-50 dark:bg-zinc-950 overflow-y-auto">
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black">
        <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600"><ArrowLeft /> Back</button>
        <div className="flex gap-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black">Data {module.dataTahun}</span>
          <span className="font-black text-red-600 uppercase text-xs">Modul: {module.title}</span>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-16">
          <span className="text-8xl mb-6 block">{module.icon}</span>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic mb-4 leading-none">{module.title}</h1>
          <p className="text-2xl font-bold opacity-60 italic mb-6">"{module.fullContent.pengertian}"</p>
          
          {/* Data Utama */}
          {module.fullContent.dataUtama && (
            <div className="bg-black text-white p-8 rounded-[2rem] border-4 border-red-600 my-8">
              <h2 className="text-2xl font-black uppercase mb-4 text-red-500">{module.fullContent.dataUtama.judul}</h2>
              <p className="text-sm opacity-80 mb-6">Periode: {module.fullContent.dataUtama.periode} | Sumber: {module.fullContent.dataUtama.sumber}</p>
              
              {module.fullContent.dataUtama.totalRealisasi && (
                <div className="text-4xl font-black text-green-400 mb-6">Rp {module.fullContent.dataUtama.totalRealisasi}</div>
              )}
              
              {module.fullContent.dataUtama.peringkat && (
                <DataTable data={module.fullContent.dataUtama.peringkat} columns={['provinsi', 'skor', 'perubahan', 'peringkat']} />
              )}
              
              {module.fullContent.dataUtama.data && (
                <DataTable data={module.fullContent.dataUtama.data} />
              )}
            </div>
          )}
        </header>
        
        {/* Sub Sections */}
        <div className="space-y-24">
          {module.fullContent.subSections.map((sub, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-3xl font-black uppercase text-red-600 border-b-4 border-black pb-2">{sub.title}</h3>
              <p className="text-xl font-medium leading-relaxed">{sub.content}</p>
              
              {sub.data && Array.isArray(sub.data) && (
                <>
                  {typeof sub.data[0] === 'object' ? (
                    <DataTable data={sub.data} />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 my-6">
                      {sub.data.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center p-6 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl shadow-md">
                          <CheckCircle2 className="text-red-600 w-6 h-6 flex-shrink-0" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => { onComplete(module.id); onBack(); }} 
          className="w-full mt-16 py-8 bg-red-600 text-white text-2xl font-black uppercase rounded-[3rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all"
        >
          Tandai Selesai
        </button>
      </div>
    </motion.div>
  );
};

// --- 5. KOMPONEN PROFILE ROOM ---
const ProfileRoom: React.FC<{ tokoh: typeof tokohBangsa[0]; onBack: () => void }> = ({ tokoh, onBack }) => {
  return (
    <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25 }} className="fixed inset-0 z-[300] bg-white dark:bg-zinc-950 overflow-y-auto">
      <nav className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black dark:border-white">
        <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600"><ArrowLeft /> Back</button>
        <span className="font-black text-red-600 uppercase text-xs tracking-widest">{tokoh.name}</span>
      </nav>
      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="sticky top-32">
              <img src={tokoh.image} alt={tokoh.name} className="w-full aspect-[3/4] object-cover rounded-[3rem] border-4 border-black dark:border-white shadow-[15px_15px_0px_0px_rgba(220,38,38,1)] mb-8" />
              <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl">
                <p className="text-xs font-black text-red-600 uppercase mb-2">Masa Pengabdian</p>
                <p className="text-2xl font-black italic">{tokoh.period}</p>
              </div>
            </div>
          </div>
          <div className="flex-[1.5]">
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">{tokoh.name}</h1>
            <p className="text-2xl font-black text-red-600 uppercase mb-12 border-b-4 border-red-600 inline-block">{tokoh.role}</p>
            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-6"><History /> Biografi Singkat</h3>
                <p className="text-2xl opacity-80 leading-relaxed font-medium">{tokoh.bio}</p>
              </section>
              <section className="bg-black text-white dark:bg-white dark:text-black p-10 rounded-[3rem]">
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-6 text-red-500"><Award /> Kontribusi Terbesar</h3>
                <p className="text-3xl font-black italic leading-tight">"{tokoh.contribution}"</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 6. KOMPONEN UTAMA ---
const PoliticsBasics: React.FC = () => {
  const [activeModule, setActiveModule] = useState<any>(null);
  const [activeTokoh, setActiveTokoh] = useState<any>(null);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const handleComplete = (id: string) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
    }
  };

  // Kelompokkan modul berdasarkan kategori
  const kategori1 = modules.slice(0, 6);  // Dasar Tata Negara
  const kategori2 = modules.slice(6, 12); // Ideologi & Struktur Hukum
  const kategori3 = modules.slice(12, 20); // Instrumen & Partisipasi Publik

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter leading-none mb-4 uppercase text-red-600">
            DASAR<span className="text-black dark:text-white">POLITIK</span>
          </h1>
          <p className="text-xl font-bold opacity-40 uppercase tracking-widest">
            20 Modul Lengkap dengan Data Aktual 2025-2026
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
            <span className="bg-red-100 px-3 py-1 rounded-full">IDI 2025</span>
            <span className="bg-blue-100 px-3 py-1 rounded-full">APBN 2025</span>
            <span className="bg-yellow-100 px-3 py-1 rounded-full">DPR 2024-2025</span>
            <span className="bg-green-100 px-3 py-1 rounded-full">Pilkada 2025</span>
            <span className="bg-purple-100 px-3 py-1 rounded-full">KPK 2025</span>
            <span className="bg-orange-100 px-3 py-1 rounded-full">MK 2025</span>
          </div>
        </header>

        {/* KATEGORI 1: DASAR TATA NEGARA */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Landmark className="text-red-600"/> Dasar Tata Negara (1-6)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori1.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        {/* KATEGORI 2: IDEOLOGI & STRUKTUR HUKUM */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Scale className="text-red-600"/> Ideologi & Struktur Hukum (7-12)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori2.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        {/* KATEGORI 3: INSTRUMEN & PARTISIPASI PUBLIK */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Users className="text-red-600"/> Instrumen & Partisipasi Publik (13-20)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori3.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        {/* SECTION: TOKOH BANGSA */}
        <section className="mt-32">
          <h2 className="text-4xl font-black uppercase italic mb-12 flex items-center gap-4 border-b-4 border-black pb-4">
            <Award className="text-red-600"/> Galeri Kepemimpinan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tokohBangsa.map((tokoh) => (
              <motion.div 
                key={tokoh.id} 
                whileHover={{ scale: 1.05 }} 
                onClick={() => setActiveTokoh(tokoh)} 
                className="group cursor-pointer relative h-[300px] rounded-[2rem] overflow-hidden bg-black border-2 border-black"
              >
                <img src={tokoh.image} className="absolute inset-0 w-full h-full object-cover opacity-70 grayscale group-hover:grayscale-0 transition-all duration-500" alt={tokoh.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-xl font-black text-white uppercase leading-none mb-1">{tokoh.name}</h4>
                  <p className="text-red-500 font-black text-[10px] uppercase tracking-tighter">{tokoh.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="mt-40 text-center text-xs opacity-40">
          <p>20 Modul Pembelajaran Politik • Sumber: Kemenko Polkam, BPS, KPU, Bawaslu, MK, KPK, DPR RI, Kemenkeu, Formappi • Data diperbarui 2025-2026</p>
        </footer>

        <AnimatePresence>
          {activeModule && <StudyRoom module={activeModule} onBack={() => setActiveModule(null)} onComplete={handleComplete} />}
          {activeTokoh && <ProfileRoom tokoh={activeTokoh} onBack={() => setActiveTokoh(null)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Komponen ModuleCard (dipisahkan agar lebih rapi)
const ModuleCard: React.FC<{ mod: any; completedModules: string[]; setActiveModule: (mod: any) => void }> = ({ mod, completedModules, setActiveModule }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -5 }} 
      onClick={() => setActiveModule(mod)} 
      className="cursor-pointer p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex flex-col justify-between relative"
    >
      {completedModules.includes(mod.id) && (
        <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full">
          <CheckCircle2 size={16} />
        </div>
      )}
      <div>
        <span className="text-4xl mb-3 block">{mod.icon}</span>
        <h4 className="text-lg font-black uppercase mb-2 leading-tight">{mod.title}</h4>
        <p className="text-xs font-bold opacity-60 mb-3">{mod.desc}</p>
        <div className="bg-blue-100 dark:bg-blue-900 inline-block px-2 py-1 rounded-full text-[10px] font-black mb-2">
          Data {mod.dataTahun}
        </div>
      </div>
      <div className="flex items-center gap-2 font-black text-red-600 uppercase text-[10px] tracking-widest mt-3">
        Lihat Data <ChevronRight size={12} />
      </div>
    </motion.div>
  );
};

export default PoliticsBasics;