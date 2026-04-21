import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ArrowLeft, ChevronRight, Award,
  Scale, Landmark, Users, Search,
  BookOpen, Brain, ChevronDown, ChevronUp, Star, AlertCircle,
} from 'lucide-react';

// ============================================================
// 1. GLOSSARY DATA
// ============================================================
const glossaryData = {
  konsensus: {
    definition: 'Kesepakatan bersama yang dicapai melalui musyawarah dan mufakat, di mana semua pihak yang terlibat menyetujui suatu keputusan tanpa paksaan.',
    example: 'Dalam rapat DPR, konsensus dicapai ketika semua fraksi setuju untuk mengesahkan RUU tertentu setelah melalui pembahasan panjang.',
  },
  ubiquitous: {
    definition: 'Berasal dari bahasa Latin "ubique" yang berarti "di mana-mana" atau "serba hadir". Dalam konteks politik, berarti politik tidak hanya terjadi di pemerintahan tetapi juga dalam kehidupan sehari-hari.',
    example: 'Politik bersifat ubiquitous karena bahkan dalam organisasi sekolah pun ada proses pemilihan ketua OSIS yang melibatkan strategi dan kekuasaan.',
  },
  absolutism: {
    definition: 'Sistem pemerintahan di mana kekuasaan tertinggi terpusat pada satu orang atau satu kelompok tanpa adanya pembatasan hukum, konstitusi, atau oposisi.',
    example: 'Monarki absolut di Prancis sebelum Revolusi Prancis, di mana Raja Louis XIV memegang kekuasaan mutlak.',
  },
  ideologi: {
    definition: 'Kumpulan ide, keyakinan, dan nilai-nilai yang menjadi dasar teori dan tujuan suatu sistem politik, ekonomi, atau sosial.',
    example: 'Pancasila adalah ideologi bangsa Indonesia yang menjadi pedoman dalam berbangsa dan bernegara.',
  },
  kedaulatan: {
    definition: 'Kekuasaan tertinggi untuk membuat keputusan dalam suatu negara yang tidak berasal dari kekuasaan lain yang lebih tinggi.',
    example: 'Kedaulatan rakyat berarti rakyat memiliki kekuasaan tertinggi yang diwujudkan melalui Pemilu.',
  },
  tirani: {
    definition: 'Pemerintahan yang dijalankan dengan kekuasaan sewenang-wenang, kejam, dan tidak adil, biasanya oleh seorang penguasa absolut.',
    example: 'Tirani terjadi ketika penguasa mengabaikan hak asasi manusia dan hukum demi kepentingan pribadi.',
  },
  referendum: {
    definition: 'Pemungutan suara langsung oleh seluruh warga negara untuk mengambil keputusan politik tertentu.',
    example: 'Referendum kemerdekaan Timor Timur tahun 1999.',
  },
  otonomi: {
    definition: 'Kewenangan untuk mengatur dan mengurus urusan sendiri secara mandiri tanpa campur tangan pihak luar.',
    example: 'Otonomi daerah memberikan kewenangan kepada pemerintah daerah untuk mengelola sumber daya dan membuat kebijakan lokal.',
  },
  desentralisasi: {
    definition: 'Penyerahan wewenang pemerintahan dari pemerintah pusat kepada daerah otonom.',
    example: 'Desentralisasi memungkinkan Kabupaten Bogor membuat peraturan daerah sendiri tentang pariwisata.',
  },
  dekonsentrasi: {
    definition: 'Pelimpahan wewenang dari pemerintah pusat kepada gubernur sebagai wakil pemerintah pusat di daerah.',
    example: 'Gubernur Jawa Barat menjalankan fungsi dekonsentrasi saat mengkoordinasikan program nasional di wilayahnya.',
  },
  legitimasi: {
    definition: 'Pengakuan dan penerimaan masyarakat terhadap kekuasaan, wewenang, atau keputusan pemerintah sebagai sah dan layak dipatuhi.',
    example: 'Legitimasi presiden diperoleh melalui Pemilu yang jujur dan adil.',
  },
  pluralisme: {
    definition: 'Sistem nilai yang mengakui dan menghormati keberagaman dalam masyarakat.',
    example: 'Indonesia menjunjung tinggi pluralisme dengan semboyan Bhinneka Tunggal Ika.',
  },
  'check and balances': {
    definition: 'Sistem saling mengawasi dan mengimbangi antar lembaga negara untuk mencegah penyalahgunaan kekuasaan.',
    example: 'DPR mengawasi kinerja presiden, sementara MK menguji undang-undang yang dibuat DPR dan presiden.',
  },
  'money politics': {
    definition: 'Praktik pemberian uang atau materi lainnya kepada pemilih atau penyelenggara pemilu untuk mempengaruhi hasil pemilihan.',
    example: 'Politik uang terjadi ketika calon legislatif membagikan sembako kepada warga agar memilihnya.',
  },
  'judicial review': {
    definition: 'Proses pengujian undang-undang terhadap konstitusi oleh Mahkamah Konstitusi.',
    example: 'Masyarakat mengajukan judicial review UU Cipta Kerja ke MK karena merasa dirugikan.',
  },
  'omnibus law': {
    definition: 'Metode pembentukan undang-undang dengan menggabungkan beberapa undang-undang yang diubah sekaligus dalam satu payung hukum besar.',
    example: 'UU Cipta Kerja adalah omnibus law yang mengubah puluhan undang-undang sekaligus.',
  },
  idiil: {
    definition: 'Berasal dari kata "idea" yang berarti cita-cita atau pandangan hidup. Landasan idiil berarti dasar yang bersumber dari nilai-nilai filosofis dan pandangan hidup bangsa.',
    example: 'Pancasila adalah landasan idiil bagi politik luar negeri Indonesia.',
  },
  independen: {
    definition: 'Bebas dari campur tangan, pengaruh, atau tekanan pihak lain.',
    example: 'Hakim harus bersikap independen dalam memutus perkara, tidak terpengaruh oleh tekanan eksekutif atau legislatif.',
  },
  oligarki: {
    definition: 'Bentuk pemerintahan di mana kekuasaan politik secara efektif dipegang oleh kelompok kecil elit masyarakat.',
    example: 'Oligarki seringkali menghambat demokrasi karena kebijakan hanya menguntungkan segelintir orang kaya.',
  },
  demokrasi: {
    definition: 'Sistem pemerintahan di mana kekuasaan tertinggi berada di tangan rakyat dan dijalankan langsung oleh mereka atau oleh wakil-wakil yang mereka pilih.',
    example: 'Indonesia menganut demokrasi Pancasila di mana kedaulatan berada di tangan rakyat.',
  },
  konstitusi: {
    definition: 'Hukum dasar tertulis (UUD) atau tidak tertulis yang menjadi landasan penyelenggaraan suatu negara.',
    example: 'UUD 1945 adalah konstitusi negara Republik Indonesia.',
  },
  parlemen: {
    definition: 'Badan legislatif yang memiliki wewenang untuk membuat undang-undang, mengawasi pemerintah, dan menyusun anggaran.',
    example: 'Di Indonesia, fungsi parlemen dijalankan oleh DPR dan DPD.',
  },
};

// ============================================================
// 2. TOKOH BANGSA DATA
// ============================================================
const tokohBangsa = [
  {
    id: 'soekarno',
    name: 'Ir. Soekarno',
    role: 'Presiden ke-1 / Proklamator',
    period: '1945 – 1967',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Presiden_Sukarno.jpg',
    contribution: 'Merumuskan Pancasila sebagai dasar filsafat negara dan memimpin perjuangan kemerdekaan.',
    bio: 'Lahir di Surabaya, beliau adalah penyambung lidah rakyat yang menyatukan ribuan pulau dengan satu ideologi: Pancasila.',
    friendlyDesc: 'Bung Karno tuh orator ulung yang bisa bikin merinding seluruh rakyat Indonesia hanya dengan pidatonya. Di tengah ancaman negara-negara Barat yang nggak mau Indonesia merdeka, beliau berani memprakarsai Konferensi Asia Afrika (KAA) 1955. Bayangkan, 29 negara dari Asia dan Afrika datang ke Bandung! Hasilnya? Dunia mulai mengakui eksistensi Indonesia sebagai bangsa yang berdaulat. Beliau juga yang menciptakan istilah "Nekolim" (Neo-Kolonialisme dan Imperialisme) sebagai musuh bersama. Tanpa Bung Karno, mungkin Indonesia masih jadi "negara tak bernama" di mata dunia.',
    pencapaianKunci: ['Memproklamasikan kemerdekaan RI, 17 Agustus 1945', 'Memprakarsai Konferensi Asia Afrika di Bandung (1955)', 'Merumuskan konsep Pancasila dalam sidang BPUPKI', 'Menggagas Gerakan Non-Blok bersama Nehru & Tito'],
  },
  {
    id: 'hatta',
    name: 'Mohammad Hatta',
    role: 'Wakil Presiden ke-1 / Bapak Koperasi',
    period: '1945 – 1956',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/VP_Hatta.jpg',
    contribution: 'Meletakkan fondasi ekonomi kerakyatan melalui Koperasi.',
    bio: 'Seorang pemikir ekonomi dan organisator ulung yang percaya bahwa kemerdekaan politik harus dibarengi kemandirian ekonomi.',
    friendlyDesc: 'Bung Hatta ini pinter banget soal ekonomi. Waktu Indonesia baru merdeka, kondisi keuangan amburadul, belum lagi Belanda masih main blokade ekonomi. Bung Hatta lantas mencetuskan ide Koperasi sebagai tulang punggung ekonomi rakyat, bukan sistem kapitalis yang menguntungkan segelintir orang. Beliau juga berperan besar dalam Konferensi Meja Bundar (KMB) 1949, yang hasilnya Belanda resmi ngakuin kemerdekaan Indonesia. Tanpa Bung Hatta, ekonomi Indonesia mungkin akan diatur oleh asing, dan kita cuma jadi penonton di negeri sendiri.',
    pencapaianKunci: ['Bapak Koperasi Indonesia', 'Berperan dalam KMB 1949 — Belanda akui kemerdekaan RI', 'Mengelola keuangan negara di masa awal kemerdekaan', 'Mundur sebagai Wapres demi prinsip demokrasi (1956)'],
  },
  {
    id: 'sjahrir',
    name: 'Sutan Sjahrir',
    role: 'Perdana Menteri Pertama Indonesia',
    period: '1945 – 1947',
    image: 'https://images.squarespace-cdn.com/content/v1/5cecd9c1f824ce00010c16c0/1576124355957-4YOYEEPN1LRN91WD0HEU/SutanSjahrir.jpg',
    contribution: 'Memperjuangkan kedaulatan RI di forum internasional dan memimpin diplomasi awal.',
    bio: 'Intelektual muda yang menjadi arsitek diplomasi Indonesia untuk mendapatkan pengakuan dunia luar.',
    friendlyDesc: 'Sjahrir ini "duta keliling" Indonesia di masa-masa kritis. Waktu Belanda melancarkan Agresi Militer, Sjahrir bergerilya lewat jalur diplomasi. Beliau lobi ke PBB dan negara-negara berpengaruh kayak India, Australia, sampai AS. Hasilnya, PBB membentuk Komisi Tiga Negara (KTN) yang membantu menyelesaikan konflik Indonesia-Belanda. Intinya, kalau perjuangan fisik dilakuin TNI, perjuangan di meja diplomasi itu dimotori Sjahrir. Beliau buktiin bahwa pena (atau lobbying) bisa sama tajamnya dengan pedang.',
    pencapaianKunci: ['PM termuda dalam sejarah Indonesia (usia 36)', 'Merancang strategi diplomasi internasional pasca proklamasi', 'Mendorong pembentukan KTN di PBB', 'Menegosiasikan Perjanjian Linggarjati 1946'],
  },
  {
    id: 'kartini',
    name: 'R.A. Kartini',
    role: 'Pahlawan Emansipasi Wanita',
    period: '1879 – 1904',
    image: 'https://awsimages.detik.net.id/community/media/visual/2023/10/31/ra-kartini.jpeg?w=500&q=90',
    contribution: 'Memperjuangkan hak pendidikan bagi perempuan dan kesetaraan sosial.',
    bio: 'Pioneer pergerakan perempuan yang ide-idenya menjadi landasan kesetaraan gender dalam politik modern Indonesia.',
    friendlyDesc: 'Kartini hidup di zaman ketika perempuan Jawa nggak boleh sekolah tinggi dan harus dipingit sampai menikah. Tapi Kartini berani banget! Lewat surat-suratnya yang dikirim ke sahabatnya di Belanda (Mr. J.H. Abendanon), beliau mengkritik habis-habisan diskriminasi terhadap perempuan. Surat-surat itu kemudian dibukukan jadi "Habis Gelap Terbitlah Terang". Hasilnya? Gerakan feminisme di Indonesia mulai bangkit. Sekolah-sekolah untuk perempuan mulai berdiri. Semua itu dimulai dari pemikiran Kartini yang sederhana: "Perempuan punya hak buat sekolah!"',
    pencapaianKunci: ['Menulis surat-surat visioner tentang kesetaraan gender', 'Dibukukan menjadi "Habis Gelap Terbitlah Terang"', 'Mendirikan sekolah perempuan pertama di Jepara', 'Hari Kartini diperingati setiap 21 April'],
  },
  {
    id: 'tjokroaminoto',
    name: 'H.O.S. Tjokroaminoto',
    role: 'Guru Bangsa / Pemimpin Sarekat Islam',
    period: '1912 – 1934',
    image: 'https://kesbangpol.bandaacehkota.go.id/wp-content/uploads/2017/12/cokroaminoto_1-291x300.jpg',
    contribution: 'Mempelopori pergerakan politik massa pertama di Indonesia melalui Sarekat Islam.',
    bio: 'Guru bagi tokoh-tokoh besar seperti Soekarno; dikenal sebagai "Raja Jawa Tanpa Mahkota" karena pengaruh politiknya.',
    friendlyDesc: 'Coba bayangin, ada satu orang yang murid-muridnya jadi presiden, wapres, dan perdana menteri. Itu Tjokroaminoto. Beliau mendirikan Sarekat Islam (SI), organisasi politik modern pertama di Indonesia yang punya anggota sampai 2,5 juta orang! Tjokroaminoto mengajarkan bagaimana cara melakukan pergerakan politik yang terorganisir, bukan cuma protes-protesan. Murid-muridnya? Ada Soekarno, Semaoen, Alimin, Musso, dan Kartosuwiryo. Makanya dijuluki "De Ongekroonde Koning van Java" (Raja Jawa Tanpa Mahkota).',
    pencapaianKunci: ['Mendirikan Sarekat Islam (2,5 juta anggota)', 'Mentor langsung Soekarno, Semaoen, Musso', 'Pelopor pergerakan politik modern Indonesia', 'Mengajarkan konsep "Pan-Islamisme" sebagai kekuatan anti-kolonial'],
  },
  {
    id: 'tan-malaka',
    name: 'Tan Malaka',
    role: 'Bapak Republik Indonesia',
    period: '1921 – 1949',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tan_Malaka%2C_date_unknown.png',
    contribution: 'Penulis "Naar de Republiek Indonesia", konsep pertama tentang negara Republik Indonesia.',
    bio: 'Pemikir revolusioner yang menghabiskan hidupnya dalam pelarian demi memperjuangkan kemerdekaan penuh.',
    friendlyDesc: 'Tan Malaka ini orang yang pertama kali menulis konsep tentang "Republik Indonesia" secara rinci, jauh sebelum proklamasi 1945 lho! Dalam bukunya "Naar de Republiek Indonesia" (Menuju Republik Indonesia) tahun 1925, beliau udah ngegambarin gimana bentuk negara merdeka nanti. Karena tulisannya terlalu "revolusioner", beliau diburu Belanda dan harus hidup berpindah-pindah dari Singapura, Manila, Bangkok, sampai India. Sayangnya, beliau justru diculik dan dieksekusi oleh pihak sendiri di tahun 1949, hanya beberapa bulan sebelum Belanda mengakui kemerdekaan. Ironis banget.',
    pencapaianKunci: ['Menulis "Naar de Republiek Indonesia" (1925)', 'Merumuskan konsep "Perjuangan Rakyat Semesta"', 'Hidup dalam pelarian demi cita-cita kemerdekaan', 'Ditetapkan sebagai Pahlawan Nasional pada 1963'],
  },
  {
    id: 'soeharto',
    name: 'Jenderal Besar TNI (Purn.) H.M. Soeharto',
    role: 'Presiden RI ke-2',
    period: '1967 – 1998',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/President_Suharto%2C_1993.jpg',
    contribution: 'Menekankan stabilitas politik dan pembangunan infrastruktur (Revolusi Hijau).',
    bio: 'Presiden yang memimpin era Orde Baru dengan fokus pada pembangunan nasional.',
    friendlyDesc: 'Pak Harto memimpin Indonesia selama 32 tahun, waktu yang sangat panjang! Di masa pemerintahannya, beliau menerapkan "Revolusi Hijau" yang bikin Indonesia swasembada beras di tahun 1984. Selain itu, pembangunan infrastruktur kayak jalan tol, listrik masuk desa, dan irigasi masif dilakukan. Di geopolitik, beliau ikut mendirikan ASEAN (1967). Namun, di akhir masa jabatan, krisis moneter 1997-1998 meluluhlantakkan ekonomi. Rupiah anjlok dari Rp2.400 per dolar AS menjadi Rp16.800! Rakyat protes besar-besaran, dan Pak Harto akhirnya mundur tahun 1998.',
    pencapaianKunci: ['Swasembada beras 1984 lewat Revolusi Hijau', 'Ikut mendirikan ASEAN (1967)', 'Pembangunan infrastruktur masif: jalan tol & irigasi', 'Mundur setelah krisis moneter & Reformasi 1998'],
  },
  {
    id: 'gusdur',
    name: 'Abdurrahman Wahid',
    role: 'Presiden ke-4 / Bapak Pluralisme',
    period: '1999 – 2001',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/President_Abdurrahman_Wahid_-_Indonesia.jpg',
    contribution: 'Memulihkan hak-hak sipil warga Tionghoa dan mengakui Konghucu sebagai agama resmi.',
    bio: 'Tokoh kemanusiaan yang dikenal dengan pendekatan humor dalam menyelesaikan konflik.',
    friendlyDesc: 'Gus Dur ini presiden yang unik banget. Matanya hampir buta, tapi cara pandangnya paling jelas di antara yang lain. Di masa pemerintahannya yang hanya 21 bulan, beliau mencabut larangan terhadap budaya Tionghoa (Inpres No. 14 Tahun 1967), dan mengakui Konghucu sebagai agama resmi ke-6 di Indonesia. Bayangkan, Imlek baru boleh dirayakan bebas lagi setelah 32 tahun dilarang! Gus Dur juga sering melucu di tengah krisis, salah satu kutipannya: "Saya ini presiden, bukan diktator. Diktator itu pakai tongkat, saya pakai kacamata." Humornya jadi perekat bangsa saat hampir pecah karena konflik horizontal di Ambon dan Poso.',
    pencapaianKunci: ['Mencabut larangan budaya Tionghoa (Inpres 14/1967)', 'Mengakui Konghucu sebagai agama resmi ke-6', 'Meredakan konflik horizontal di Ambon & Poso', 'Simbol pluralisme dan demokrasi substantif Indonesia'],
  },
  {
    id: 'megawati',
    name: 'Megawati Soekarnoputri',
    role: 'Presiden ke-5 / Presiden Wanita Pertama',
    period: '2001 – 2004',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/President_Megawati_Sukarnoputri_-_Indonesia.jpg/1200px-President_Megawati_Sukarnoputri_-_Indonesia.jpg',
    contribution: 'Membentuk lembaga KPK dan menyelenggarakan Pemilu langsung pertama tahun 2004.',
    bio: 'Putri proklamator yang membawa stabilitas politik pasca krisis.',
    friendlyDesc: 'Ibu Mega adalah presiden perempuan pertama di Indonesia dan Asia Tenggara. Waktu beliau naik tahun 2001, Indonesia masih berdarah-darah karena konflik di Aceh, Papua, dan Poso. Beliau mengambil langkah tegas dengan memberlakukan Darurat Militer di Aceh (2003-2004). Pencapaian terbesarnya? Membentuk Komisi Pemberantasan Korupsi (KPK) lewat UU No. 30 Tahun 2002. Dan di tahun 2004, untuk pertama kalinya rakyat Indonesia memilih presiden secara langsung. Warisan KPK dan Pemilu langsung masih kita rasakan sampai sekarang.',
    pencapaianKunci: ['Presiden wanita pertama di Indonesia & Asia Tenggara', 'Mendirikan KPK (UU No. 30 Tahun 2002)', 'Menyelenggarakan Pemilu langsung pertama 2004', 'Memberlakukan Darurat Militer di Aceh 2003-2004'],
  },
  {
    id: 'sby',
    name: 'Susilo Bambang Yudhoyono',
    role: 'Presiden RI ke-6',
    period: '2004 – 2014',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Presiden_Susilo_Bambang_Yudhoyono.jpg',
    contribution: 'Menjaga stabilitas ekonomi selama satu dekade dan menyelesaikan konflik Aceh melalui Perjanjian Helsinki.',
    bio: 'Presiden pertama yang dipilih langsung oleh rakyat; dikenal dengan gaya kepemimpinan yang santun dan terukur.',
    friendlyDesc: 'Pak SBY adalah presiden pertama yang dipilih langsung oleh rakyat dalam sejarah Indonesia. Beliau memimpin selama dua periode (10 tahun). Di masa beliau, Indonesia berhasil keluar dari pengawasan IMF dan melunasi utang-utangnya. Salah satu prestasi terbesarnya adalah perdamaian di Aceh melalui kesepakatan Helsinki tahun 2005, yang mengakhiri konflik bersenjata selama 30 tahun. Beliau juga sangat aktif di forum internasional, membawa Indonesia masuk ke dalam G20.',
    pencapaianKunci: ['Perdamaian Aceh melalui MoU Helsinki (2005)', 'Indonesia masuk G20', 'Melunasi utang IMF lebih awal dari jadwal', 'Pemimipin 10 tahun dengan stabilitas ekonomi terjaga'],
  },
  {
    id: 'jokowi',
    name: 'Joko Widodo',
    role: 'Presiden RI ke-7',
    period: '2014 – 2024',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Joko_Widodo_2019_official_portrait.jpg',
    contribution: 'Melakukan pembangunan infrastruktur masif di seluruh Indonesia dan memulai pemindahan Ibu Kota Nusantara (IKN).',
    bio: 'Pemimpin yang dikenal dengan gaya "blusukan" dan fokus pada pembangunan fisik serta konektivitas antarwilayah.',
    friendlyDesc: 'Pak Jokowi membawa gaya kepemimpinan baru yang sangat merakyat lewat "blusukan". Fokus utamanya adalah infrastruktur: jalan tol Trans-Jawa, Trans-Sumatera, bendungan, bandara, sampai pelabuhan dibangun di mana-mana, bukan cuma di Jawa. Beliau juga berani mengambil keputusan besar untuk memindahkan ibu kota ke Kalimantan Timur (IKN). Di bidang ekonomi, beliau mendorong hilirisasi industri, terutama nikel, agar Indonesia punya nilai tambah. Sosoknya sangat populer karena dianggap sebagai "orang biasa" yang bisa jadi pemimpin tertinggi.',
    pencapaianKunci: ['Pembangunan 1.900 km jalan tol (Trans-Jawa & Trans-Sumatera)', 'Menginisiasi pemindahan ibu kota ke IKN, Kaltim', 'Hilirisasi nikel — Indonesia jadi produsen baterai EV', 'Penanganan pandemi COVID-19 dengan PPKM'],
  },
  {
    id: 'prabowo',
    name: 'Prabowo Subianto',
    role: 'Presiden RI ke-8',
    period: '2024 – Sekarang',
    image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS6BG0QnyNRGPhMtH8Ky-QvhS_PGGtCCFolTB9uhTN-2oEgyLF50NmtKSZv85j3Q2yzGzYIbrdTK5-Vyfo',
    contribution: 'Memimpin pemerintahan dengan fokus pada ketahanan pangan, energi, dan hilirisasi industri.',
    bio: 'Mantan Danjen Kopassus dan Menteri Pertahanan yang kini memimpin Indonesia periode 2024-2029.',
    friendlyDesc: 'Pak Prabowo ini perjalanan karirnya panjang banget. Dari tentara (eks Danjen Kopassus), lalu jadi pengusaha, menteri pertahanan, sekarang presiden. Beliau menjabat mulai 20 Oktober 2024. Di posisi presiden, beliau fokus banget pada "hilirisasi" — mengolah bahan mentah di dalam negeri sebelum diekspor. Targetnya, Indonesia bisa jadi pemain utama industri kendaraan listrik dunia. Di bidang geopolitik, Pak Prabowo terkenal dengan pendekatan "sahabat semua negara". Beliau dekat dengan China (investasi besar), juga dekat dengan AS dan Australia (latihan militer bersama). Mampukah beliau membawa Indonesia jadi negara maju di 2045? Kita tunggu aja!',
    pencapaianKunci: ['Pelantikan 20 Oktober 2024 sebagai Presiden ke-8', 'Program Makan Bergizi Gratis (Rp71 T/tahun)', 'Hilirisasi nikel, bauksit, dan tembaga', 'Diplomasi "sahabat semua negara" — bebas-aktif modern'],
  },
  {
    id: 'gibran',
    name: 'Gibran Rakabuming Raka',
    role: 'Wakil Presiden ke-14',
    period: '2024 – Sekarang',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Gibran_Rakabuming_2024_official_portrait.jpg',
    contribution: 'Wakil Presiden termuda dalam sejarah Indonesia, fokus pada pengembangan UMKM.',
    bio: 'Mantan Wali Kota Surakarta yang kini menjabat sebagai Wakil Presiden mendampingi Prabowo Subianto.',
    friendlyDesc: 'Mas Gibran ini anak sulung Presiden Jokowi. Tapi jangan salah, beliau nggak dapat posisi wakil presiden cuma karena "anak presiden". Sebelumnya, beliau sukses jadi pengusaha, lalu jadi Wali Kota Solo (2021-2024). Di Solo, beliau dikenal inovatif: bikin aplikasi "Solo Warga" buat aduan warga, revitalisasi taman kota, dan mendorong digitalisasi UMKM. Sebagai wakil presiden termuda (37 tahun saat dilantik 2024), Mas Gibran punya tugas besar mendampingi Pak Prabowo dan fokus pada program prioritas seperti makan siang bergizi gratis untuk anak sekolah.',
    pencapaianKunci: ['Wali Kota Solo termuda 2021-2024', 'Wakil Presiden termuda dalam sejarah RI (37 tahun)', 'Mengawasi implementasi program Makan Bergizi Gratis', 'Mendorong digitalisasi UMKM nasional'],
  },
];

// ============================================================
// 3. QUIZ DATA
// ============================================================
const quizData = {
  'hakekat-politik': [
    { q: 'Apa yang dimaksud dengan hakikat politik menurut Aristoteles?', options: ['Seni mengumpulkan kekayaan', 'Seni mengelola kekuasaan untuk kebaikan bersama', 'Cara memenangkan pemilu', 'Strategi militer'], correct: 1 },
    { q: 'Mengapa dikatakan bahwa politik bersifat "ubiquitous"?', options: ['Karena politik hanya ada di parlemen', 'Karena politik selalu melibatkan kekerasan', 'Karena politik hadir di mana-mana, termasuk organisasi kecil', 'Karena politik hanya untuk orang dewasa'], correct: 2 },
    { q: 'Apa fungsi politik sebagai mekanisme penyelesaian konflik?', options: ['Menghapus semua perbedaan', 'Memaksa minoritas ikut mayoritas', 'Mengelola perbedaan secara damai melalui konsensus', 'Menggunakan kekuatan militer'], correct: 2 },
  ],
  'lembaga-negara': [
    { q: 'Siapakah pencetus konsep Trias Politica yang digunakan saat ini?', options: ['John Locke', 'Montesquieu', 'Aristoteles', 'Rousseau'], correct: 1 },
    { q: 'Apa perbedaan antara konsep kekuasaan John Locke dan Montesquieu?', options: ['Locke tidak memisahkan yudikatif; Montesquieu memisahkannya', 'Keduanya sama persis', 'Montesquieu tidak mengenal kekuasaan eksekutif', 'Locke lebih modern dari Montesquieu'], correct: 0 },
    { q: 'Lembaga mana yang berwenang menguji undang-undang terhadap UUD 1945?', options: ['Mahkamah Agung', 'DPR RI', 'Mahkamah Konstitusi', 'Komisi Yudisial'], correct: 2 },
  ],
  'sistem-demokrasi': [
    { q: 'Apa kepanjangan asas LUBER JURDIL dalam Pemilu Indonesia?', options: ['Lugas, Bebas, Rahasia, Jujur, Adil', 'Langsung, Umum, Bebas, Rahasia, Jujur, Adil', 'Luwes, Universal, Bebas, Rahasia, Jelas, Adil', 'Langsung, Umum, Benar, Resmi, Jelas, Adil'], correct: 1 },
    { q: 'Berapa persen tingkat partisipasi Pemilu Presiden 2024?', options: ['72,5%', '78,2%', '81,48%', '85,3%'], correct: 2 },
    { q: 'Di Indonesia, era Demokrasi Reformasi dimulai pada tahun...', options: ['1945', '1966', '1998', '2004'], correct: 2 },
  ],
  'mekanisme-pemilu': [
    { q: 'Apa yang dimaksud dengan "Coklit" dalam tahapan Pemilu?', options: ['Penghitungan cepat suara', 'Pemutakhiran data pemilih dengan mendatangi rumah warga', 'Kampanye oleh peserta Pemilu', 'Verifikasi hasil suara di TPS'], correct: 1 },
    { q: 'Jika ada sengketa hasil Pemilu, lembaga mana yang menanganinya?', options: ['Bawaslu', 'KPU', 'Mahkamah Konstitusi', 'Mahkamah Agung'], correct: 2 },
    { q: 'Urutan rekapitulasi suara yang benar dari bawah ke atas adalah...', options: ['TPS → PPK → KPU Prov → KPU Kab → KPU RI', 'TPS → PPK → KPU Kab/Kota → KPU Prov → KPU RI', 'PPK → TPS → KPU Kab → KPU RI', 'TPS → KPU RI langsung'], correct: 1 },
  ],
  'penyelenggara-pemilu': [
    { q: 'Apa perbedaan tugas KPU dan Bawaslu?', options: ['Keduanya sama-sama mengawasi', 'KPU melaksanakan teknis; Bawaslu mengawasi jalannya proses', 'Bawaslu lebih berwenang dari KPU', 'KPU hanya bertugas di pusat'], correct: 1 },
    { q: 'Apa yang dilakukan DKPP?', options: ['Mengawasi jalannya kampanye', 'Menghitung suara pemilu', 'Menangani pelanggaran kode etik penyelenggara pemilu', 'Menetapkan jadwal pemilu'], correct: 2 },
  ],
  'hak-kewajiban': [
    { q: 'Pasal berapa UUD 1945 yang mengatur hak atas pendidikan?', options: ['Pasal 27', 'Pasal 28', 'Pasal 31', 'Pasal 30'], correct: 2 },
    { q: 'Manakah yang termasuk kewajiban warga negara?', options: ['Hak berpendapat', 'Membayar pajak', 'Hak atas pekerjaan layak', 'Kebebasan beragama'], correct: 1 },
  ],
  'filsafat-pancasila': [
    { q: 'Apa yang dimaksud dengan aspek "aksiologis" dalam filsafat Pancasila?', options: ['Hakikat keberadaan manusia', 'Sumber pengetahuan', 'Nilai-nilai yang menjadi pedoman tingkah laku', 'Sistem pemerintahan'], correct: 2 },
    { q: 'Pancasila sebagai sistem filsafat berarti...', options: ['Lima sila yang berdiri sendiri', 'Kesatuan sila yang organik, hierarkis, dan saling mengisi', 'Ideologi yang bisa diubah sewaktu-waktu', 'Hanya berlaku untuk agama Islam'], correct: 1 },
  ],
  'politik-luar-negeri': [
    { q: 'Apa yang dimaksud prinsip "bebas" dalam politik luar negeri Indonesia?', options: ['Bebas berperang dengan negara lain', 'Tidak memihak kekuatan-kekuatan dunia dan tidak bergabung pakta militer', 'Bebas melakukan apa saja di forum internasional', 'Bebas dari pengaruh ASEAN'], correct: 1 },
    { q: 'Apa landasan idiil politik luar negeri Indonesia?', options: ['UUD 1945', 'Pancasila', 'UU Hubungan Luar Negeri', 'Keppres'], correct: 1 },
  ],
  'uud-1945': [
    { q: 'Alinea keempat Pembukaan UUD 1945 memuat...', options: ['Penolakan penjajahan', 'Pengakuan rahmat Tuhan', 'Tujuan negara, bentuk negara, dan dasar negara (Pancasila)', 'Penghargaan perjuangan pahlawan'], correct: 2 },
    { q: 'Berapa jumlah pasal dalam Batang Tubuh UUD 1945 (setelah amandemen)?', options: ['37 pasal', '49 pasal', '51 pasal', '55 pasal'], correct: 0 },
  ],
  'otonomi-daerah': [
    { q: 'Apa perbedaan desentralisasi dan dekonsentrasi?', options: ['Desentralisasi ke gubernur; dekonsentrasi ke daerah otonom', 'Desentralisasi ke daerah otonom penuh; dekonsentrasi ke gubernur sebagai wakil pusat', 'Keduanya sama', 'Dekonsentrasi lebih luas cakupannya'], correct: 1 },
    { q: 'Urusan apa yang merupakan kewenangan mutlak pemerintah pusat?', options: ['Kesehatan dan pendidikan', 'Pariwisata dan pertanian', 'Pertahanan, keamanan, moneter, agama, yustisi', 'Perhubungan dan komunikasi'], correct: 2 },
  ],
  'partai-politik': [
    { q: 'Apa fungsi rekrutmen politik dari partai politik?', options: ['Mengumpulkan iuran anggota', 'Mencari dan melatih kader untuk menjadi pemimpin', 'Memenangkan pemilu dengan cara apapun', 'Mengawasi kinerja pemerintah'], correct: 1 },
    { q: 'Partai mana yang mendapatkan kursi terbanyak di DPR hasil Pemilu 2024?', options: ['Gerindra', 'PKB', 'Golkar', 'PDIP'], correct: 3 },
  ],
  'integritas-politik': [
    { q: 'Apa skor Indeks Persepsi Korupsi Indonesia tahun 2025?', options: ['34', '36', '38', '42'], correct: 2 },
    { q: 'Apa yang dimaksud dengan LHKPN?', options: ['Laporan Harta Kekayaan Penyelenggara Negara', 'Lembaga Hukum Keadilan Publik Nasional', 'Laporan Hibah Keuangan Publik Negara', 'Lembaga Hak Konstitusi Pejabat Negara'], correct: 0 },
  ],
  'hak-konstitusional': [
    { q: 'Hak apa yang tidak dapat dikurangi dalam keadaan apapun menurut UUD 1945?', options: ['Hak mendapat pekerjaan', 'Hak untuk tidak dituntut atas hukum yang berlaku surut (Pasal 28I)', 'Hak berorganisasi', 'Hak mendapat pendidikan'], correct: 1 },
    { q: 'Ke mana warga negara mengajukan uji materi (judicial review) atas undang-undang?', options: ['Mahkamah Agung', 'DPR', 'Mahkamah Konstitusi', 'Komnas HAM'], correct: 2 },
  ],
  'partisipasi-publik': [
    { q: 'Apa kepanjangan LAPOR! sebagai media partisipasi publik?', options: ['Layanan Aspirasi dan Pengaduan Online Rakyat', 'Lembaga Aduan Publik Organisasi Rakyat', 'Layanan Aspirasi Permohonan Online Resmi', 'Laporan Aduan Pelanggaran Online Resmi'], correct: 0 },
    { q: 'Tingkat partisipasi musrenbang paling tinggi terdapat di tingkat...', options: ['Nasional', 'Provinsi', 'Kabupaten/Kota', 'Desa/Kelurahan'], correct: 3 },
  ],
  'rekam-jejak-dpr': [
    { q: 'Berapa total UU yang disahkan DPR periode 2019-2024?', options: ['91 UU', '126 UU', '225 UU', '180 UU'], correct: 2 },
    { q: 'UU apa yang dianggap sebagai rekam jejak positif DPR 2019-2024?', options: ['UU Cipta Kerja', 'UU TPKS (Tindak Pidana Kekerasan Seksual)', 'Revisi UU KPK', 'UU IKN'], correct: 1 },
  ],
  'apbn-apbd': [
    { q: 'Berapa anggaran program Makan Bergizi Gratis tahun 2025?', options: ['Rp45 Triliun', 'Rp71 Triliun', 'Rp53 Triliun', 'Rp34 Triliun'], correct: 1 },
    { q: 'Apa target defisit anggaran pemerintah 2025?', options: ['Di bawah 5% PDB', 'Di bawah 3% PDB', 'Di bawah 1% PDB', 'Anggaran berimbang'], correct: 1 },
  ],
  'indeks-demokrasi': [
    { q: 'Provinsi mana yang memiliki skor IDI tertinggi tahun 2025?', options: ['DKI Jakarta', 'Jawa Tengah', 'DI Yogyakarta', 'Bali'], correct: 2 },
    { q: 'IDI mengukur tiga aspek utama, yaitu...', options: ['Ekonomi, Sosial, Politik', 'Kebebasan Sipil, Hak-hak Politik, Lembaga Demokrasi', 'Legislatif, Eksekutif, Yudikatif', 'Pemilu, Partai, Parlemen'], correct: 1 },
  ],
  'buku-putih': [
    { q: 'Apa fungsi Buku Putih Kebijakan?', options: ['Laporan keuangan tahunan', 'Panduan strategis berbasis data untuk menyelesaikan masalah spesifik', 'Catatan sejarah pemerintahan', 'Peraturan perundang-undangan'], correct: 1 },
    { q: 'Apa yang dimaksud dengan "evidence-based policy"?', options: ['Kebijakan berdasarkan bukti kriminal', 'Kebijakan yang disusun berdasarkan data dan penelitian', 'Kebijakan rahasia pemerintah', 'Kebijakan yang sudah terbukti gagal'], correct: 1 },
  ],
  'etika-politik': [
    { q: 'Apa yang dimaksud dengan konflik kepentingan dalam etika politik?', options: ['Konflik antara dua partai berbeda', 'Menggunakan jabatan untuk keuntungan bisnis pribadi/keluarga', 'Perbedaan pendapat dalam debat parlemen', 'Perselisihan antara eksekutif dan legislatif'], correct: 1 },
    { q: 'Apa sanksi DKPP bagi penyelenggara pemilu yang terbukti melanggar etika?', options: ['Denda finansial', 'Pemberhentian dari jabatan', 'Hukuman penjara', 'Penundaan gaji'], correct: 1 },
  ],
  'kalender-politik': [
    { q: 'Kapan Pidato Kenegaraan Presiden dalam rangka HUT RI ke-80?', options: ['17 Agustus 2025', '16 Agustus 2025', '20 Oktober 2025', '1 Juni 2025'], correct: 1 },
    { q: 'Pemilu 2029 akan mulai dipersiapkan dengan langkah apa di tahun 2025?', options: ['Pendaftaran calon legislatif', 'Verifikasi partai politik', 'Pemutakhiran data pemilih berkelanjutan', 'Pelaksanaan kampanye'], correct: 2 },
  ],
};

// ============================================================
// 4. MODULES DATA
// ============================================================
const modules = [
  {
    id: 'hakekat-politik',
    title: 'Hakekat Politik',
    desc: 'Seni dan ilmu pengelolaan kekuasaan, pengambilan keputusan, serta perumusan kebijakan publik untuk mencapai tujuan bersama.',
    icon: '⚖️',
    color: 'bg-red-50 border-red-200',
    accent: 'text-red-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Hakikat politik adalah seni dan ilmu pengelolaan kekuasaan, pengambilan keputusan, serta perumusan kebijakan publik untuk mencapai tujuan bersama, kebaikan umum, dan kesejahteraan rakyat. Politik mencakup interaksi antara pemerintah dan masyarakat, serta mekanisme penyelesaian konflik melalui konsensus untuk menyeimbangkan kepentingan yang berbeda dalam sebuah negara.',
      poinPenting: [
        { title: 'Kekuasaan (Power)', desc: 'Politik selalu berkaitan dengan siapa yang memiliki, mempertahankan, dan menggunakan kekuasaan untuk memengaruhi keputusan dalam pemerintahan dan masyarakat.', icon: '👑' },
        { title: 'Kebaikan Bersama (Common Good)', desc: 'Menurut pemikiran klasik (seperti Aristoteles), politik seharusnya tidak hanya melayani kelompok tertentu, tetapi bertujuan menciptakan kesejahteraan dan kebaikan bagi seluruh warga negara.', icon: '🤝' },
        { title: 'Kebijakan Publik', desc: 'Politik terwujud dalam proses pembuatan dan pelaksanaan kebijakan yang bersifat mengikat, seperti undang-undang atau peraturan, yang mengatur kehidupan masyarakat.', icon: '📜' },
        { title: 'Pengabdian kepada Rakyat', desc: 'Kekuasaan politik idealnya digunakan sebagai sarana pelayanan, yaitu untuk memperbaiki kehidupan rakyat dan mewujudkan keadilan serta kemakmuran sosial.', icon: '❤️' },
        { title: 'Penyelesaian Konflik', desc: 'Karena masyarakat memiliki kepentingan yang berbeda-beda, politik berfungsi sebagai mekanisme damai untuk mengelola perbedaan, mencapai kompromi, dan membangun konsensus.', icon: '🕊️' },
        { title: 'Politik Bersifat Serba Hadir (Ubiquitous)', desc: 'Politik tidak hanya terjadi di negara atau pemerintahan, tetapi juga dalam organisasi, sekolah, komunitas, bahkan kehidupan sehari-hari, selama ada proses pengambilan keputusan dan pengaruh.', icon: '🌍' },
      ],
      expandedSections: [
        {
          title: 'Definisi Politik Menurut Para Ahli',
          items: [
            { label: 'Aristoteles', desc: '"Manusia adalah makhluk politik (zoon politikon)." Politik adalah cara manusia hidup bersama dan mengatur polis (negara-kota) demi kebaikan bersama.' },
            { label: 'Harold Lasswell', desc: 'Politik adalah tentang "who gets what, when, and how" — siapa mendapat apa, kapan, dan bagaimana. Definisi ini menekankan distribusi nilai-nilai di masyarakat.' },
            { label: 'Max Weber', desc: 'Politik adalah usaha untuk mempengaruhi distribusi kekuasaan. Weber memperkenalkan konsep legitimasi sebagai dasar kekuasaan yang sah.' },
            { label: 'David Easton', desc: 'Politik adalah "the authoritative allocation of values" — alokasi nilai-nilai secara otoritatif untuk seluruh masyarakat.' },
            { label: 'Miriam Budiardjo', desc: 'Politik adalah kegiatan yang menyangkut cara bagaimana kelompok-kelompok mencapai keputusan-keputusan yang bersifat kolektif dan mengikat bagi masyarakat.' },
          ],
        },
        {
          title: 'Ciri-Ciri Khas Politik Indonesia',
          items: [
            { label: 'Demokrasi Pancasila', desc: 'Mengutamakan musyawarah untuk mufakat, bukan voting semata. Semangat gotong royong menjadi ciri khas.' },
            { label: 'Pluralisme yang Kuat', desc: 'Indonesia dengan 17.000+ pulau, 300+ suku, dan 6 agama resmi membutuhkan politik yang inklusif.' },
            { label: 'Desentralisasi', desc: 'Sejak reformasi, kekuasaan didistribusikan ke daerah melalui otonomi daerah.' },
            { label: 'Sistem Multi-Partai', desc: 'Indonesia menganut sistem banyak partai yang mencerminkan keberagaman aspirasi rakyat.' },
          ],
        },
        {
          title: 'Perbandingan Sistem Politik di Dunia',
          items: [
            { label: 'Demokrasi Liberal (AS, Eropa)', desc: 'Menekankan kebebasan individu, pasar bebas, dan perlindungan hak-hak sipil.' },
            { label: 'Sistem Komunis (China, Kuba)', desc: 'Partai tunggal memegang kekuasaan; ekonomi dikendalikan negara; kebebasan sipil terbatas.' },
            { label: 'Monarki Konstitusional (Inggris, Jepang)', desc: 'Raja/Ratu sebagai kepala negara simbolis, sementara parlemen dan PM memegang kekuasaan nyata.' },
            { label: 'Teokrasi (Iran, Arab Saudi)', desc: 'Hukum agama menjadi hukum negara; pemimpin agama memiliki otoritas politik tertinggi.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Indeks Kualitas Kebijakan Publik 2025',
        periode: 'Januari – September 2025',
        sumber: 'Kementerian PANRB',
        data: [
          { indikator: 'Partisipasi Masyarakat', skor: '78.5', perubahan: '+2.3' },
          { indikator: 'Transparansi Kebijakan', skor: '72.1', perubahan: '+1.8' },
          { indikator: 'Akuntabilitas Publik', skor: '69.7', perubahan: '-0.5' },
          { indikator: 'Responsivitas Pemerintah', skor: '74.2', perubahan: '+3.1' },
        ],
      },
      subSections: [
        {
          title: 'Program Kebijakan Publik Prioritas 2025',
          content: 'Program-program unggulan pemerintah yang membutuhkan dukungan politik',
          data: [
            { program: 'Makan Bergizi Gratis', anggaran: 'Rp71 T', target: 'Anak sekolah & ibu hamil' },
            { program: 'Cek Kesehatan Gratis', anggaran: 'Rp3,2 T', target: 'Masyarakat umum' },
            { program: 'Program Keluarga Harapan', anggaran: 'Rp74,6 T', target: '10 juta keluarga' },
          ],
        },
      ],
    },
  },
  {
    id: 'lembaga-negara',
    title: 'Lembaga Negara',
    desc: 'Organisasi pemerintahan pusat yang dibentuk berdasarkan UUD 1945 untuk menjalankan fungsi legislatif, eksekutif, dan yudikatif.',
    icon: '🏛️',
    color: 'bg-blue-50 border-blue-200',
    accent: 'text-blue-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Lembaga negara Indonesia adalah organisasi pemerintahan pusat yang dibentuk berdasarkan UUD 1945, undang-undang, atau peraturan lebih rendah, untuk menjalankan fungsi legislatif, eksekutif, dan yudikatif. Utama (tinggi) negara meliputi MPR, DPR, DPD, Presiden/Wakil Presiden, MA, MK, dan BPK. Mereka menjaga demokrasi dan hukum.',
      bagianLembaga: [
        {
          kategori: 'Lembaga Legislatif — Pembuat Undang-Undang',
          desc: 'Lembaga legislatif berfungsi membentuk peraturan perundang-undangan dan melakukan pengawasan terhadap jalannya pemerintahan.',
          lembaga: [
            { nama: 'Majelis Permusyawaratan Rakyat (MPR)', ketua: 'Ahmad Muzani', tugas: 'Berwenang mengubah dan menetapkan UUD 1945 serta melantik Presiden dan Wakil Presiden.' },
            { nama: 'Dewan Perwakilan Rakyat (DPR)', ketua: 'Puan Maharani', tugas: 'Bertugas membentuk undang-undang bersama Presiden, menyusun anggaran negara, dan mengawasi kebijakan pemerintah.' },
            { nama: 'Dewan Perwakilan Daerah (DPD)', ketua: 'Sultan Bachtiar Najamudin', tugas: 'Mewakili kepentingan daerah dengan mengajukan dan membahas rancangan undang-undang yang berkaitan dengan otonomi daerah.' },
          ],
        },
        {
          kategori: 'Lembaga Eksekutif — Pelaksana Undang-Undang',
          desc: 'Lembaga eksekutif menjalankan undang-undang dan menyelenggarakan pemerintahan negara.',
          lembaga: [
            { nama: 'Presiden dan Wakil Presiden', ketua: 'Prabowo Subianto & Gibran Rakabuming Raka', tugas: 'Presiden adalah kepala negara sekaligus kepala pemerintahan, dibantu Wakil Presiden.' },
            { nama: 'Kementerian Negara', ketua: 'Kabinet Merah Putih 2024-2029', tugas: 'Membantu Presiden dalam menyelenggarakan urusan pemerintahan di bidang tertentu.' },
          ],
        },
        {
          kategori: 'Lembaga Yudikatif — Kekuasaan Kehakiman',
          desc: 'Lembaga yudikatif berfungsi menegakkan hukum dan keadilan secara independen.',
          lembaga: [
            { nama: 'Mahkamah Agung (MA)', ketua: 'Sunarto', tugas: 'Pengadilan tertinggi yang memeriksa perkara pada tingkat kasasi.' },
            { nama: 'Mahkamah Konstitusi (MK)', ketua: 'Suhartoyo', tugas: 'Menguji undang-undang terhadap UUD 1945, menyelesaikan sengketa kewenangan, dan memutus sengketa hasil pemilu.' },
            { nama: 'Komisi Yudisial (KY)', ketua: 'Abdul Chair Ramadhan', tugas: 'Menjaga kehormatan dan perilaku hakim.' },
          ],
        },
        {
          kategori: 'Lembaga Auditor — Pemeriksa Keuangan Negara',
          desc: 'Mengawasi pengelolaan dan tanggung jawab keuangan negara.',
          lembaga: [
            { nama: 'Badan Pemeriksa Keuangan (BPK)', ketua: 'Isma Yatun', tugas: 'Memeriksa pengelolaan keuangan negara untuk menjamin transparansi dan akuntabilitas.' },
          ],
        },
        {
          kategori: 'Lembaga Independen / Pendukung Negara',
          desc: 'Dibentuk untuk mendukung penyelenggaraan negara secara profesional.',
          lembaga: [
            { nama: 'KPU', ketua: 'Mochammad Afifuddin', tugas: 'Menyelenggarakan pemilihan umum secara LUBER JURDIL.' },
            { nama: 'KPK', ketua: 'Setyo Budiyanto', tugas: 'Pencegahan dan pemberantasan korupsi.' },
            { nama: 'Bank Indonesia (BI)', ketua: 'Perry Warjiyo', tugas: 'Bank sentral penjaga stabilitas rupiah.' },
          ],
        },
      ],
      triasPolitica: {
        pengertian: 'Trias Politika adalah konsep politik yang membagi kekuasaan pemerintahan negara menjadi tiga cabang utama untuk mencegah absolutisme dan penyalahgunaan kekuasaan. Dicetuskan oleh John Locke dan dikembangkan oleh Montesquieu.',
        perbedaanPandangan: [
          {
            tokoh: 'John Locke',
            poin: [
              { nama: 'Legislatif', desc: 'Kekuasaan tertinggi membuat undang-undang.' },
              { nama: 'Eksekutif', desc: 'Melaksanakan undang-undang dan mengurus pemerintahan.' },
              { nama: 'Federatif', desc: 'Mengatur hubungan luar negeri (perang, damai, diplomasi).' },
            ],
            catatan: 'Locke tidak memisahkan yudikatif — dianggap bagian dari eksekutif.',
          },
          {
            tokoh: 'Montesquieu',
            poin: [
              { nama: 'Legislatif', desc: 'Membuat undang-undang.' },
              { nama: 'Eksekutif', desc: 'Melaksanakan undang-undang dan menjalankan pemerintahan.' },
              { nama: 'Yudikatif', desc: 'Mengadili dan menegakkan hukum secara independen.' },
            ],
            catatan: 'Menekankan pemisahan tegas antar kekuasaan untuk mencegah tirani.',
          },
        ],
      },
      expandedSections: [
        {
          title: 'Fungsi Pengawasan DPR terhadap Presiden',
          items: [
            { label: 'Hak Interpelasi', desc: 'Hak DPR untuk meminta keterangan kepada Presiden mengenai kebijakan pemerintah yang penting.' },
            { label: 'Hak Angket', desc: 'Hak DPR melakukan penyelidikan terhadap kebijakan pemerintah yang diduga melanggar undang-undang.' },
            { label: 'Hak Menyatakan Pendapat', desc: 'Hak DPR menyatakan pendapat atas kebijakan pemerintah atau terhadap kejadian luar biasa.' },
            { label: 'Budget Control', desc: 'DPR memiliki wewenang menolak atau mengesahkan RAPBN yang diajukan Presiden.' },
          ],
        },
        {
          title: 'Hubungan Antar Lembaga (Check and Balances)',
          items: [
            { label: 'DPR ↔ Presiden', desc: 'DPR mengawasi kebijakan Presiden; Presiden membutuhkan persetujuan DPR untuk UU dan APBN.' },
            { label: 'MK ↔ DPR & Presiden', desc: 'MK dapat membatalkan UU yang dibuat DPR-Presiden jika bertentangan UUD 1945.' },
            { label: 'BPK ↔ Semua Lembaga', desc: 'BPK mengaudit penggunaan keuangan negara di seluruh kementerian dan lembaga.' },
            { label: 'KY ↔ MA', desc: 'KY mengawasi perilaku dan etika hakim MA dan pengadilan di bawahnya.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Komposisi Lembaga Tinggi Negara 2024-2029',
        periode: 'Hasil Pemilu 2024',
        sumber: 'KPU RI',
        data: [
          { lembaga: 'Presiden & Wakil Presiden', hasil: 'Prabowo-Gibran', periode: '2024-2029' },
          { lembaga: 'DPR RI', hasil: '8 partai (580 kursi)', periode: '2024-2029' },
          { lembaga: 'DPD RI', hasil: '152 anggota', periode: '2024-2029' },
          { lembaga: 'MPR RI', hasil: '711 anggota (DPR+DPD)', periode: '2024-2029' },
        ],
      },
      subSections: [
        {
          title: 'Kinerja Lembaga Negara Semester I 2025',
          content: 'Capaian dan tantangan lembaga negara',
          data: [
            { lembaga: 'Mahkamah Agung', indikator: 'Putusan kasasi', capaian: '12.450 perkara' },
            { lembaga: 'Mahkamah Konstitusi', indikator: 'Uji materi', capaian: '38 permohonan' },
            { lembaga: 'Komisi Yudisial', indikator: 'Pengawasan hakim', capaian: '21 laporan masyarakat' },
            { lembaga: 'BPK', indikator: 'Opini WTP', capaian: '85% kementerian/lembaga' },
          ],
        },
      ],
    },
  },
  {
    id: 'sistem-demokrasi',
    title: 'Sistem Demokrasi',
    desc: 'Bentuk pemerintahan di mana kedaulatan berada di tangan rakyat, baik secara langsung maupun melalui perwakilan.',
    icon: '🗳️',
    color: 'bg-green-50 border-green-200',
    accent: 'text-green-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Demokrasi adalah bentuk pemerintahan di mana kedaulatan atau kekuasaan tertinggi berada di tangan rakyat. Di Indonesia, kita menganut Demokrasi Pancasila, yang memiliki ciri khas: (a) Mengutamakan Musyawarah untuk Mufakat, (b) Semangat Gotong Royong, (c) Keseimbangan antara hak dan kewajiban warga negara.',
      prinsipUtama: [
        { nama: 'Kedaulatan Rakyat', desc: 'Rakyat adalah sumber kekuasaan negara.' },
        { nama: 'Persetujuan yang Diperintah', desc: 'Pemerintah memperoleh mandat melalui Pemilu yang jujur dan kompetitif.' },
        { nama: 'Perlindungan HAM', desc: 'Menjamin kebebasan berpendapat, beragama, dan berkumpul.' },
        { nama: 'Kesetaraan di Depan Hukum', desc: 'Tidak ada warga negara yang kebal hukum (Equality before the law).' },
        { nama: 'Trias Politica', desc: 'Pembagian kekuasaan agar tidak terjadi tirani.' },
      ],
      jenisDemokrasi: [
        { jenis: 'Demokrasi Langsung', desc: 'Rakyat ikut serta secara personal dalam membahas dan memutus kebijakan negara (contoh: referendum, e-partisipasi).' },
        { jenis: 'Demokrasi Tidak Langsung (Perwakilan)', desc: 'Rakyat memilih wakil-wakilnya melalui Pemilu untuk duduk di pemerintahan dan mengambil keputusan atas nama rakyat.' },
        { jenis: 'Demokrasi Pancasila', desc: 'Model khas Indonesia: memadukan kedaulatan rakyat dengan nilai-nilai Pancasila, musyawarah mufakat, dan gotong royong.' },
      ],
      apaItuPemilu: {
        judul: 'Apa Itu Pemilu?',
        pengertian: 'Pemilihan Umum (Pemilu) adalah sarana pelaksanaan kedaulatan rakyat yang dilaksanakan secara langsung, umum, bebas, rahasia, jujur, dan adil dalam NKRI berdasarkan Pancasila dan UUD 1945.',
        fungsiPemilu: [
          'Memilih wakil rakyat di DPR, DPD, dan DPRD',
          'Memilih Presiden dan Wakil Presiden',
          'Memilih kepala daerah melalui Pilkada',
          'Menjamin pergantian kepemimpinan secara damai dan konstitusional',
          'Mewujudkan akuntabilitas pejabat publik terhadap rakyat',
        ],
      },
      prinsipPemilu: {
        judul: 'Asas Pemilu: LUBER JURDIL',
        daftar: [
          { asas: 'Langsung', desc: 'Rakyat memberikan suaranya secara langsung, tanpa perantara.' },
          { asas: 'Umum', desc: 'Semua warga negara yang memenuhi syarat berhak ikut memilih (tidak diskriminatif).' },
          { asas: 'Bebas', desc: 'Pemilih bebas menentukan pilihannya tanpa tekanan atau paksaan.' },
          { asas: 'Rahasia', desc: 'Pilihan pemilih dirahasiakan untuk mencegah intervensi.' },
          { asas: 'Jujur', desc: 'Proses penyelenggaraan Pemilu harus sesuai aturan, tidak ada kecurangan.' },
          { asas: 'Adil', desc: 'Setiap pemilih dan peserta Pemilu diperlakukan sama.' },
        ],
      },
      sejarahDemokrasi: [
        { periode: 'Demokrasi Parlementer/Liberal (1950–1959)', desc: 'Sistem di mana parlemen sangat kuat dan sering terjadi pergantian kabinet.' },
        { periode: 'Demokrasi Terpimpin (1959–1965)', desc: 'Kekuasaan cenderung berpusat pada satu tangan, yakni Presiden Soekarno.' },
        { periode: 'Demokrasi Pancasila Era Orde Baru (1966–1998)', desc: 'Menitikberatkan pada stabilitas politik untuk pembangunan ekonomi, namun partisipasi politik rakyat dibatasi.' },
        { periode: 'Demokrasi Pancasila Era Reformasi (1998–Sekarang)', desc: 'Fase keterbukaan. Kebebasan pers dijamin, Pemilu langsung, dan transparansi pemerintahan lebih terjamin.' },
      ],
      expandedSections: [
        {
          title: 'Perbedaan Demokrasi Pancasila vs Demokrasi Liberal',
          items: [
            { label: 'Pengambilan Keputusan', desc: 'Pancasila: Musyawarah mufakat. Liberal: Voting (suara terbanyak).' },
            { label: 'Orientasi', desc: 'Pancasila: Keseimbangan hak & kewajiban, kepentingan bersama. Liberal: Dominan hak individu.' },
            { label: 'Nilai Dasar', desc: 'Pancasila: Berpijak pada nilai Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan. Liberal: Kebebasan individu dan pasar bebas.' },
            { label: 'Konteks', desc: 'Pancasila: Sesuai budaya dan kebhinekaan Indonesia. Liberal: Berkembang di Eropa Barat dan Amerika.' },
          ],
        },
        {
          title: 'Tantangan Demokrasi Era Digital 2025',
          items: [
            { label: 'Hoaks dan Disinformasi', desc: 'Berita palsu yang disebarkan lewat media sosial bisa mempengaruhi opini publik dan hasil Pemilu.' },
            { label: 'Polarisasi Digital', desc: 'Algoritma media sosial menciptakan "echo chamber" yang memperparah perpecahan.' },
            { label: 'Serangan Siber', desc: 'Potensi peretasan terhadap sistem KPU dan infrastruktur digital pemerintah.' },
            { label: 'Politik Uang Digital', desc: 'Praktik suap kini dilakukan lewat transfer e-money yang sulit dilacak.' },
          ],
        },
      ],
      indeksPartisipasiPemilu: {
        judul: 'Indeks Partisipasi Pemilu (IPP) 2024',
        capaianPartisipasi: [
          { jenisPemilu: 'Pemilu Presiden (Pilpres)', tingkatPartisipasi: '81,48%', keterangan: 'Tertinggi' },
          { jenisPemilu: 'Pemilu Legislatif (Pileg)', tingkatPartisipasi: '81,14%', keterangan: 'Sangat Tinggi' },
          { jenisPemilu: 'Pemilu DPD', tingkatPartisipasi: '81,50%', keterangan: 'Tertinggi' },
        ],
      },
      dataUtama: {
        judul: 'Indeks Demokrasi Indonesia (IDI) 2025',
        periode: 'Tahun 2025',
        sumber: 'Kemenko Polkam & BPS',
        peringkat: [
          { provinsi: 'DI Yogyakarta', skor: '89.25', perubahan: '+5.37' },
          { provinsi: 'DKI Jakarta', skor: '84.67', perubahan: '+2.10' },
          { provinsi: 'Jawa Tengah', skor: '83.42', perubahan: '+1.80' },
          { provinsi: 'Bali', skor: '82.91', perubahan: '+0.50' },
          { provinsi: 'Jawa Timur', skor: '81.73', perubahan: '-0.30' },
        ],
      },
      subSections: [
        {
          title: 'Partisipasi Pemuda dalam Pemilu 2024',
          content: 'Gen Z dan Milenial mendominasi 56% dari total DPT (~114 juta pemilih)',
          data: [
            'Menjadi pemilih cerdas: Mengecek fakta, tidak golput',
            'Menjadi relawan atau saksi di TPS',
            'Mengawasi jalannya Pemilu melalui media sosial',
            'Bergabung dengan organisasi kepemudaan atau partai politik',
          ],
        },
      ],
    },
  },
  {
    id: 'mekanisme-pemilu',
    title: 'Mekanisme Pemilu',
    desc: 'Wujud nyata kedaulatan rakyat dengan asas Luber Jurdil — tahapan dari persiapan hingga penetapan hasil.',
    icon: '📩',
    color: 'bg-yellow-50 border-yellow-200',
    accent: 'text-yellow-700',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: 'Pemilu di Indonesia adalah wujud nyata dari kedaulatan rakyat. Seluruh prosesnya berpijak pada asas Luber Jurdil (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil) dan dikelola oleh lembaga independen seperti KPU (penyelenggara), Bawaslu (pengawas), dan DKPP (penegak kode etik).',
      tahapanPemilu: [
        {
          fase: '1. Masa Persiapan & Pendaftaran',
          poin: [
            'Perencanaan: Penentuan anggaran dan penyusunan regulasi teknis.',
            'Pemutakhiran Data Pemilih (Coklit): Petugas mendatangi rumah warga untuk memastikan setiap orang yang berhak memilih terdaftar dalam DPT.',
            'Verifikasi Peserta: Partai politik harus melewati verifikasi administrasi dan faktual untuk bisa menjadi peserta Pemilu.',
          ],
        },
        {
          fase: '2. Pencalonan & Kampanye',
          poin: [
            'Pencalonan: Pendaftaran pasangan Capres/Cawapres serta calon anggota legislatif.',
            'Kampanye: Masa di mana calon menyampaikan visi, misi, dan program kerja.',
            'Masa Tenang: Tidak ada aktivitas kampanye sebelum hari pemungutan suara.',
          ],
        },
        {
          fase: '3. Pemungutan & Penghitungan Suara',
          poin: [
            'Di TPS: Rakyat memberikan suara secara langsung di bilik suara.',
            'Penghitungan Suara: Dilakukan secara terbuka di TPS segera setelah pemungutan.',
            'Rekapitulasi Berjenjang: TPS → PPK (Kecamatan) → KPU Kabupaten/Kota → KPU Provinsi → KPU RI.',
          ],
        },
        {
          fase: '4. Penetapan Hasil & Sengketa',
          poin: [
            'Penetapan: KPU mengumumkan hasil resmi secara nasional.',
            'Sengketa di MK: Pihak yang keberatan dapat mengajukan gugatan ke Mahkamah Konstitusi.',
            'Pengumuman Resmi: Presiden terpilih dilantik oleh MPR.',
          ],
        },
      ],
      expandedSections: [
        {
          title: 'Perbedaan Pemilu dan Pilkada',
          items: [
            { label: 'Pemilu Legislatif', desc: 'Memilih anggota DPR, DPD, DPRD Provinsi & Kabupaten/Kota. Diselenggarakan serentak setiap 5 tahun.' },
            { label: 'Pemilu Presiden', desc: 'Memilih Presiden dan Wakil Presiden secara langsung. Serentak dengan Pileg sejak 2019.' },
            { label: 'Pilkada', desc: 'Memilih Gubernur, Bupati, Wali Kota. Dilaksanakan serentak di seluruh Indonesia sejak 2024.' },
            { label: 'Pemilih', desc: 'WNI berusia 17 tahun atau sudah menikah, tidak sedang dicabut hak pilihnya.' },
          ],
        },
        {
          title: 'Inovasi Pemilu 2024',
          items: [
            { label: 'Sirekap', desc: 'Sistem Informasi Rekapitulasi berbasis digital untuk transparansi penghitungan suara real-time.' },
            { label: 'e-KTP Biometrik', desc: 'Penggunaan e-KTP sebagai identitas pemilih, menggantikan surat suara manual sebagian.' },
            { label: 'Pemilu Serentak', desc: 'Pemilu Legislatif, Pilpres, dan Pilkada digelar dalam satu tahun (2024) untuk efisiensi.' },
            { label: 'Pengawasan Digital', desc: 'Bawaslu menggunakan drone dan kamera CCTV untuk memantau TPS rawan kecurangan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Rekapitulasi Pemilu 2024',
        periode: 'Pemilu 14 Feb 2024',
        sumber: 'KPU RI',
        data: [
          { kategori: 'DPR RI', totalSuara: '151 juta', partisipasi: '81.4%' },
          { kategori: 'Presiden', pemenang: 'Prabowo-Gibran', persentase: '58.6%' },
          { kategori: 'Pilkada Serentak 2024', jumlahDaerah: '545 daerah', partisipasi: '76.5%' },
        ],
      },
      subSections: [
        {
          title: 'Pilkada Ulang 2025',
          content: 'Daerah yang menggelar Pilkada ulang akibat sengketa',
          data: [
            { daerah: 'Kabupaten Bangka', jadwal: 'Agustus 2025', partisipasi: '54,92%' },
            { daerah: 'Kota Pangkalpinang', jadwal: 'Agustus 2025', partisipasi: '48%' },
          ],
        },
      ],
    },
  },
  {
    id: 'penyelenggara-pemilu',
    title: 'Penyelenggara Pemilu',
    desc: 'Tiga lembaga independen dengan sistem checks and balances: KPU, Bawaslu, dan DKPP.',
    icon: '🛡️',
    color: 'bg-purple-50 border-purple-200',
    accent: 'text-purple-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Di Indonesia, terdapat tiga Lembaga penyelenggara pemilu yang didesain dengan sistem checks and balances (saling mengawasi) agar tidak ada lembaga yang memiliki kekuasaan absolut.',
      tigaLembaga: [
        {
          nama: 'KPU (Komisi Pemilihan Umum) — Sang Pelaksana',
          desc: 'KPU adalah lembaga yang bertanggung jawab penuh atas aspek teknis dan operasional pemilu.',
          tugas: [
            'Merencanakan anggaran dan menyusun tahapan pemilu',
            'Memutakhirkan data pemilih (Coklit)',
            'Menyiapkan logistik surat suara dan kotak suara',
            'Menetapkan hasil pemilu secara nasional',
            'Struktur: KPU RI → KPU Provinsi → KPU Kab/Kota → PPK → PPS → KPPS',
          ],
        },
        {
          nama: 'Bawaslu (Badan Pengawas Pemilu) — Sang Pengawas',
          desc: 'Bawaslu bertugas memastikan seluruh tahapan yang dijalankan KPU sesuai dengan aturan hukum.',
          tugas: [
            'Mengawasi jalannya kampanye dan pemungutan suara',
            'Menerima laporan dugaan pelanggaran',
            'Menyelesaikan sengketa proses pemilu',
            'Investigasi kecurangan dan memberikan rekomendasi sanksi',
          ],
        },
        {
          nama: 'DKPP (Dewan Kehormatan Penyelenggara Pemilu) — Penjaga Etika',
          desc: 'DKPP mengurusi pelanggaran kode etik yang dilakukan oleh oknum anggota KPU atau Bawaslu.',
          tugas: [
            'Menangani pelanggaran kode etik penyelenggara pemilu',
            'Memberikan sanksi termasuk pemberhentian anggota penyelenggara',
            'Menjaga integritas seluruh penyelenggara pemilu',
          ],
        },
      ],
      expandedSections: [
        {
          title: 'Mekanisme Pelaporan Kecurangan Pemilu',
          items: [
            { label: 'Pelaporan ke Bawaslu', desc: 'Warga yang menemukan dugaan kecurangan bisa melapor ke Bawaslu dalam waktu 7 hari setelah mengetahui kejadian.' },
            { label: 'Bukti yang Diperlukan', desc: 'Pelapor harus menyertakan identitas diri, uraian peristiwa, saksi, dan bukti (foto/video/dokumen).' },
            { label: 'Tindak Lanjut', desc: 'Bawaslu menindaklanjuti dalam 5 hari untuk pelanggaran administrasi, dan meneruskan ke penegak hukum jika berupa pidana.' },
            { label: 'Sengketa Hasil', desc: 'Jika terkait sengketa hasil, diselesaikan di Mahkamah Konstitusi maksimal 14 hari setelah KPU menetapkan hasil.' },
          ],
        },
        {
          title: 'Tantangan Penyelenggaraan Pemilu',
          items: [
            { label: 'Logistik', desc: 'Mendistribusikan surat suara ke 17.000+ pulau dan 800.000+ TPS dalam waktu terbatas.' },
            { label: 'Netralitas ASN', desc: 'Aparatur Sipil Negara dilarang berpihak, namun tekanan dari atasan sering terjadi.' },
            { label: 'Hoaks dan Disinformasi', desc: 'Narasi keliru soal kecurangan pemilu bisa tersebar luas di media sosial sebelum klarifikasi.' },
            { label: 'Pembiayaan', desc: 'Pemilu 2024 membutuhkan anggaran sekitar Rp76,6 triliun — terbesar dalam sejarah.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Kinerja Penyelenggara Pemilu 2025',
        periode: 'Januari – September 2025',
        sumber: 'DKPP RI',
        data: [
          { lembaga: 'KPU', jumlahPelanggaran: '23', sanksiDKPP: '5' },
          { lembaga: 'Bawaslu', jumlahPelanggaran: '17', sanksiDKPP: '3' },
          { lembaga: 'DKPP', putusanEtik: '31', pengadu: 'Masyarakat & peserta pemilu' },
        ],
      },
      subSections: [
        {
          title: 'Rekomendasi Bawaslu 2025',
          content: 'Catatan perbaikan untuk penyelenggaraan pemilu mendatang',
          data: [
            'Perbaikan daftar pemilih berkelanjutan',
            'Penguatan pengawasan kampanye di media sosial',
            'Peningkatan aksesibilitas TPS bagi disabilitas',
            'Penggunaan AI untuk deteksi hoaks pemilu',
          ],
        },
      ],
    },
  },
  {
    id: 'hak-kewajiban',
    title: 'Hak & Kewajiban Warga Negara',
    desc: 'Hubungan timbal balik antara warga negara dan negara yang diatur dalam konstitusi.',
    icon: '👤',
    color: 'bg-orange-50 border-orange-200',
    accent: 'text-orange-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Hak adalah kewenangan atau kekuasaan yang diberikan oleh negara kepada warga negaranya. Kewajiban adalah tanggung jawab yang harus dilaksanakan warga negara terhadap negara. Keduanya harus seimbang — tidak boleh hanya menuntut hak tanpa melaksanakan kewajiban.',
      hakWarga: [
        'Hak atas pekerjaan dan penghidupan yang layak (Pasal 27 ayat 2)',
        'Hak untuk hidup dan mempertahankan kehidupan (Pasal 28A)',
        'Hak mendapatkan perlindungan hukum dan keadilan (Pasal 27 ayat 1, Pasal 28D ayat 1)',
        'Hak mendapatkan pendidikan (Pasal 31 ayat 1)',
        'Hak atas kebebasan berpendapat, berserikat, dan berkumpul (Pasal 28)',
        'Hak atas lingkungan hidup yang baik dan sehat (Pasal 28H)',
        'Hak atas jaminan sosial (Pasal 28H ayat 3)',
        'Hak beragama dan beribadah (Pasal 29 ayat 2)',
      ],
      kewajibanWarga: [
        'Kewajiban menaati hukum dan pemerintahan (Pasal 27 ayat 1)',
        'Kewajiban membela negara (Pasal 27 ayat 3)',
        'Kewajiban menghormati hak asasi manusia orang lain (Pasal 28J ayat 1)',
        'Kewajiban tunduk kepada pembatasan yang ditetapkan undang-undang (Pasal 28J ayat 2)',
        'Kewajiban ikut serta dalam upaya pembelaan negara (Pasal 30)',
        'Kewajiban membayar pajak (Pasal 23A)',
        'Kewajiban mengikuti pendidikan dasar (Pasal 31 ayat 2)',
      ],
      expandedSections: [
        {
          title: 'Prinsip Keseimbangan Hak dan Kewajiban',
          items: [
            { label: 'Resiprositas', desc: 'Negara melindungi hak warga; warga menunaikan kewajiban. Keduanya saling menopang.' },
            { label: 'Pembatasan', desc: 'Hak boleh dibatasi untuk menjaga hak orang lain, ketertiban umum, dan kepentingan nasional (Pasal 28J).' },
            { label: 'Non-Diskriminasi', desc: 'Negara tidak boleh membedakan pemberian hak berdasarkan suku, agama, ras, atau golongan.' },
            { label: 'Hak Absolut', desc: 'Beberapa hak tidak bisa dibatasi dalam keadaan apapun: hak hidup, bebas dari penyiksaan, dan prinsip non-retroaktif (Pasal 28I).' },
          ],
        },
        {
          title: 'Praktik Nyata Hak dan Kewajiban',
          items: [
            { label: 'Pajak vs Layanan Publik', desc: 'Warga bayar pajak → negara wajib sediakan sekolah, rumah sakit, jalan, keamanan.' },
            { label: 'Bela Negara Modern', desc: 'Bela negara bukan hanya tentang militer, tapi juga menjaga kebhinekaan, membayar pajak, dan berkontribusi pada lingkungan.' },
            { label: 'Hak Pilih', desc: 'Setiap WNI berusia 17+ berhak memilih (hak), tapi memilih secara bertanggung jawab juga kewajiban moral.' },
            { label: 'Kebebasan Berpendapat', desc: 'Dijamin UUD 1945, tapi ada batas: tidak boleh ujaran kebencian, hoaks, atau menghasut kekerasan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Kepatuhan Wajib Pajak 2025',
        periode: 'Januari – Agustus 2025',
        sumber: 'Direktorat Jenderal Pajak',
        data: [
          { kategori: 'Wajib Pajak Orang Pribadi', kepatuhan: '72%', target: '80%' },
          { kategori: 'Wajib Pajak Badan', kepatuhan: '68%', target: '75%' },
          { kategori: 'Penerimaan Pajak', realisasi: 'Rp1.200 T', target: 'Rp1.850 T' },
        ],
      },
      subSections: [
        {
          title: 'Partisipasi Bela Negara 2025',
          content: 'Data kesadaran bela negara di kalangan generasi muda',
          data: [
            'Pendaftar TNI/Polri 2025: 850.000 pelamar (naik 12%)',
            'Peserta wajib latih bela negara: 45.000 mahasiswa',
            'Anggota Cadangan TNI: 5.200 personel tersebar di 34 provinsi',
          ],
        },
      ],
    },
  },
  {
    id: 'filsafat-pancasila',
    title: 'Filsafat Pancasila',
    desc: 'Lima nilai dasar Pancasila sebagai pandangan hidup, sistem etika, dan landasan filosofis bernegara.',
    icon: '🇮🇩',
    color: 'bg-red-50 border-red-300',
    accent: 'text-red-700',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Filsafat Pancasila adalah konsep pemikiran mendalam para pendiri bangsa yang menjadikan lima nilai dasar Pancasila sebagai pandangan hidup, sistem etika, dan landasan filosofis bernegara. Ini mencakup ajaran ontologis (hakikat keberadaan), epistemologis (sumber pengetahuan), dan aksiologis (nilai/manfaat) yang bersumber dari kebudayaan Indonesia.',
      poinPenting: [
        { title: 'Dimensi Ontologis', desc: 'Mengkaji hakikat keberadaan manusia Indonesia dan Tuhan sebagai pencipta. Manusia adalah makhluk monopluralis: individu sekaligus sosial, jasmani-rohani, makhluk bebas sekaligus terikat kodrat.', icon: '🌌' },
        { title: 'Dimensi Epistemologis', desc: 'Pengetahuan Pancasila berasal dari nilai-nilai luhur budaya bangsa Indonesia yang digali oleh para pendiri negara. Bukan teori impor, melainkan kristalisasi kearifan lokal Nusantara.', icon: '🔍' },
        { title: 'Dimensi Aksiologis', desc: 'Nilai-nilai Pancasila adalah pedoman tingkah laku dan moral (etika) yang membimbing kehidupan berbangsa dan bernegara Indonesia.', icon: '⭐' },
        { title: 'Sistem yang Organik', desc: 'Pancasila bukan lima sila yang berdiri sendiri. Mereka adalah satu kesatuan organik, hierarkis, dan piramidal yang saling mengisi dan memperkuat.', icon: '🔗' },
        { title: 'Dasar Negara', desc: 'Pancasila menjadi fundamen dan sumber dari segala sumber hukum di Indonesia. Tidak ada hukum yang boleh bertentangan dengan nilai-nilai Pancasila.', icon: '🏛️' },
        { title: 'Jati Diri Bangsa', desc: 'Pancasila adalah identitas dan kepribadian bangsa Indonesia yang membedakannya dari bangsa-bangsa lain di dunia.', icon: '🇮🇩' },
      ],
      expandedSections: [
        {
          title: 'Makna Mendalam Tiap Sila',
          items: [
            { label: 'Sila 1 — Ketuhanan YME', desc: 'Indonesia bukan negara agama, bukan negara sekuler. Negara menjamin kebebasan beragama; kehidupan bernegara dilandasi nilai-nilai religius.' },
            { label: 'Sila 2 — Kemanusiaan yang Adil & Beradab', desc: 'Penghormatan pada martabat manusia tanpa diskriminasi. Indonesia berkomitmen menjunjung HAM universal.' },
            { label: 'Sila 3 — Persatuan Indonesia', desc: 'Dari berbhinneka, menjadi satu. Kepentingan nasional di atas kepentingan golongan/suku/agama.' },
            { label: 'Sila 4 — Kerakyatan yang Dipimpin Hikmat', desc: 'Kedaulatan di tangan rakyat, dijalankan melalui musyawarah oleh wakil-wakil yang bijaksana (hikmat kebijaksanaan).' },
            { label: 'Sila 5 — Keadilan Sosial', desc: 'Tujuan akhir: semua warga negara mendapatkan bagian yang adil dari kekayaan dan kesempatan yang ada.' },
          ],
        },
        {
          title: 'Pancasila dalam Konteks Global',
          items: [
            { label: 'Bukan Komunisme', desc: 'Pancasila menolak ateisme dan materialisme dialektis; tetap mengakui Tuhan dan hak milik pribadi yang bertanggung jawab.' },
            { label: 'Bukan Liberalisme Murni', desc: 'Pancasila menekankan keseimbangan hak-kewajiban dan kepentingan bersama, bukan semata kebebasan individu tanpa batas.' },
            { label: 'Bukan Teokrasi', desc: 'Meski berketuhanan, Indonesia bukan negara agama. Syariat agama tidak dijadikan hukum positif secara langsung.' },
            { label: 'Jalan Tengah (Middle Way)', desc: 'Pancasila adalah ideologi yang berada di antara dua ekstrem — sintesis unik yang lahir dari budaya Nusantara.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Indeks Toleransi Beragama 2025',
        periode: 'Survei Setara Institute',
        sumber: 'Setara Institute',
        data: [
          { provinsi: 'Nusa Tenggara Timur', skor: '92.4', kategori: 'Sangat Tinggi' },
          { provinsi: 'Bali', skor: '90.2', kategori: 'Sangat Tinggi' },
          { provinsi: 'DIY', skor: '88.7', kategori: 'Tinggi' },
          { provinsi: 'DKI Jakarta', skor: '78.3', kategori: 'Sedang' },
          { provinsi: 'Aceh', skor: '65.1', kategori: 'Rendah' },
        ],
      },
      subSections: [
        {
          title: 'Implementasi Nilai Pancasila dalam Kebijakan 2025',
          content: 'Program-program yang merefleksikan nilai-nilai Pancasila',
          data: [
            { sila: 'Ketuhanan', program: 'Fasilitasi rumah ibadah', anggaran: 'Rp1,2 T' },
            { sila: 'Kemanusiaan', program: 'Bansos PKH', penerima: '10 juta keluarga' },
            { sila: 'Persatuan', program: 'Program Indonesia Pintar', siswa: '18,6 juta' },
            { sila: 'Kerakyatan', program: 'Musrenbang desa', partisipasi: '65% desa' },
            { sila: 'Keadilan', program: 'Subsidi energi', nilai: 'Rp108 T' },
          ],
        },
      ],
    },
  },
  {
    id: 'politik-luar-negeri',
    title: 'Politik Luar Negeri',
    desc: 'Strategi Indonesia dalam hubungan internasional berdasarkan prinsip bebas-aktif.',
    icon: '🌍',
    color: 'bg-teal-50 border-teal-200',
    accent: 'text-teal-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Politik luar negeri adalah strategi dan tindakan Pemerintah Indonesia untuk mengelola hubungan dengan negara lain, organisasi internasional, dan subjek hukum internasional lainnya, guna mencapai tujuan nasional, mempertahankan kepentingan nasional, dan berpartisipasi dalam ketertiban dunia, berdasarkan prinsip "bebas-aktif".',
      landasanPrinsip: {
        landasan: 'Dasar Idiil: Pancasila. Dasar Konstitusional: UUD 1945.',
        bebas: 'Indonesia tidak memihak kekuatan-kekuatan dunia yang tidak sesuai dengan kepribadian bangsa dan tidak bergabung dengan pakta militer manapun.',
        aktif: 'Indonesia berperan aktif dalam menciptakan perdamaian dunia, penyelesaian konflik, serta menjalin kerja sama bilateral dan multilateral.',
      },
      expandedSections: [
        {
          title: 'Perbedaan "Bebas" dan "Netral"',
          items: [
            { label: 'Bebas-Aktif', desc: 'Indonesia bebas dari pengaruh blok manapun, TAPI tetap aktif berkontribusi pada perdamaian dan pembangunan global. Bukan diam atau pasif.' },
            { label: 'Netral', desc: 'Negara netral (seperti Swiss) tidak memihak konflik apapun dan tidak ikut perang. Indonesia BUKAN negara netral — kita aktif berdiplomasi.' },
            { label: 'Nonblok', desc: 'Gerakan Non-Blok (GNB) yang diprakarsai Soekarno adalah wujud prinsip bebas-aktif: tidak ikut Blok Barat (AS) maupun Blok Timur (Soviet).' },
          ],
        },
        {
          title: 'Peran Indonesia di Forum Internasional',
          items: [
            { label: 'ASEAN', desc: 'Indonesia adalah anggota pendiri ASEAN (1967) dan sering menjadi "pemimpin tidak resmi" karena ukuran dan pengaruhnya.' },
            { label: 'PBB', desc: 'Indonesia aktif dalam Dewan Keamanan PBB (non-permanen) dan mengirimkan lebih dari 1.200 pasukan perdamaian ke berbagai negara.' },
            { label: 'G20', desc: 'Indonesia anggota G20 sejak awal, dan menjadi Presidensi G20 tahun 2022 dengan tema "Recover Together, Recover Stronger".' },
            { label: 'OKI (Organisasi Kerja Sama Islam)', desc: 'Indonesia aktif memperjuangkan hak-hak Palestina dan perdamaian di Timur Tengah melalui forum OKI.' },
          ],
        },
        {
          title: 'Diplomasi Era Prabowo 2024-2025',
          items: [
            { label: 'Penguatan Diplomasi Presidensial', desc: 'Prabowo lebih aktif melakukan perjalanan diplomatik langsung ke kepala negara, menghindari jalur birokrasi yang lambat.' },
            { label: 'Kemitraan Pertahanan', desc: 'Diversifikasi kemitraan militer: tidak hanya dengan AS, tapi juga dengan Prancis (Rafale), Korsel (KFX), dan Australia.' },
            { label: 'Jalur Sutra Digital', desc: 'Indonesia menjadi bagian penting dalam rantai pasok digital global, termasuk kabel bawah laut dan pusat data.' },
            { label: 'Mediasi Konflik Myanmar', desc: 'Indonesia memimpin upaya ASEAN untuk mendorong penyelesaian krisis politik Myanmar melalui Five-Point Consensus.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Peran Indonesia di Kancah Internasional 2025',
        periode: '2025',
        sumber: 'Kementerian Luar Negeri',
        data: [
          { peran: 'Misi Perdamaian PBB (UNIFIL)', jumlahPersonel: '1.200 personel', negara: 'Lebanon' },
          { peran: 'Presidensi G20', tahun: '2022', capaian: '48 kesepakatan' },
          { peran: 'Keketuaan ASEAN', tahun: '2023', capaian: '54 dokumen' },
          { peran: 'KTT Indonesia-Afrika', tahun: '2025', tuanRumah: 'Indonesia' },
        ],
      },
      subSections: [
        {
          title: 'Kerja Sama Ekonomi Internasional 2025',
          content: 'Nilai perdagangan dengan mitra strategis',
          data: [
            { mitra: 'China', ekspor: '$65,2 M', impor: '$58,1 M' },
            { mitra: 'Jepang', ekspor: '$24,5 M', impor: '$18,3 M' },
            { mitra: 'Amerika Serikat', ekspor: '$28,7 M', impor: '$12,9 M' },
            { mitra: 'Uni Eropa', ekspor: '$21,3 M', impor: '$15,2 M' },
          ],
        },
      ],
    },
  },
  {
    id: 'uud-1945',
    title: 'UUD 1945',
    desc: 'Hukum dasar tertulis sebagai sumber hukum tertinggi di Indonesia.',
    icon: '📜',
    color: 'bg-amber-50 border-amber-200',
    accent: 'text-amber-700',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'UUD 1945 adalah hukum dasar tertulis (konstitusi) yang menjadi sumber hukum tertinggi di Indonesia. Seluruh peraturan perundang-undangan di bawahnya tidak boleh bertentangan dengan UUD 1945.',
      maknaAlinea: [
        {
          alinea: 'Alinea Pertama',
          intisari: 'Kemerdekaan adalah hak segala bangsa — penjajahan harus dihapus.',
          makna: 'Mengandung dalil objektif (penjajahan itu salah secara moral) dan dalil subjektif (aspirasi Indonesia untuk merdeka). Indonesia menentang segala bentuk kolonialisme di dunia.',
        },
        {
          alinea: 'Alinea Kedua',
          intisari: 'Perjuangan pahlawan mengantarkan ke pintu gerbang kemerdekaan.',
          makna: 'Penghargaan atas perjuangan para pahlawan. Kemerdekaan adalah pintu masuk untuk mewujudkan cita-cita bangsa: merdeka, bersatu, berdaulat, adil, dan makmur.',
        },
        {
          alinea: 'Alinea Ketiga',
          intisari: 'Kemerdekaan diraih atas berkat rahmat Tuhan Yang Maha Esa.',
          makna: 'Pengakuan religius bahwa kemerdekaan Indonesia bukan semata-mata hasil usaha manusia, tetapi juga karena berkat Tuhan. Ini menunjukkan bangsa Indonesia adalah bangsa yang spiritual.',
        },
        {
          alinea: 'Alinea Keempat',
          intisari: 'Memuat tujuan negara, bentuk negara, dan dasar negara Pancasila.',
          makna: 'Bagian paling krusial: (1) Tujuan Negara — melindungi segenap bangsa, memajukan kesejahteraan, mencerdaskan bangsa, ikut ketertiban dunia. (2) Bentuk Negara — Republik berkedaulatan rakyat. (3) Dasar Negara — Pancasila.',
        },
      ],
      expandedSections: [
        {
          title: 'Hierarki Peraturan Perundang-Undangan (UU No. 12/2011)',
          items: [
            { label: '1. UUD 1945', desc: 'Hukum tertinggi. Tidak boleh ada peraturan yang bertentangan dengannya.' },
            { label: '2. TAP MPR', desc: 'Ketetapan MPR yang bersifat mengatur keluar.' },
            { label: '3. UU / Perpu', desc: 'Undang-Undang dan Peraturan Pemerintah Pengganti Undang-Undang.' },
            { label: '4. Peraturan Pemerintah (PP)', desc: 'Peraturan pelaksana UU yang dibuat oleh Presiden.' },
            { label: '5. Perpres / Peraturan Presiden', desc: 'Peraturan untuk melaksanakan PP atau Perpres di atasnya.' },
            { label: '6. Perda Provinsi & Kab/Kota', desc: 'Peraturan yang dibuat oleh DPRD bersama kepala daerah.' },
          ],
        },
        {
          title: 'Amandemen UUD 1945 (1999-2002)',
          items: [
            { label: 'Amandemen Pertama (1999)', desc: 'Membatasi kekuasaan Presiden; mengatur hak DPR mengajukan RUU.' },
            { label: 'Amandemen Kedua (2000)', desc: 'Otonomi daerah; HAM (Pasal 28A-J); pertahanan negara.' },
            { label: 'Amandemen Ketiga (2001)', desc: 'Bentuk dan kedaulatan negara; lembaga negara (MPR, DPR, DPD, Presiden, MA, MK, BPK).' },
            { label: 'Amandemen Keempat (2002)', desc: 'Pemilu langsung Presiden-Wapres; pendidikan dan kebudayaan; perekonomian nasional.' },
          ],
        },
        {
          title: 'Yang Tidak Boleh Diubah dalam UUD 1945',
          items: [
            { label: 'Pembukaan UUD 1945', desc: 'Seluruh 4 alinea pembukaan tidak bisa diubah karena mengandung dasar negara (Pancasila) dan tujuan kemerdekaan.' },
            { label: 'Bentuk NKRI', desc: 'Pasal 37 ayat 5: Khusus tentang bentuk Negara Kesatuan Republik Indonesia tidak dapat dilakukan perubahan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Perkara Uji Materi di MK 2025',
        periode: 'Januari – September 2025',
        sumber: 'Mahkamah Konstitusi RI',
        data: [
          { bulan: 'Januari', jumlahPerkara: '12', dikabulkan: '3', ditolak: '5' },
          { bulan: 'Februari', jumlahPerkara: '8', dikabulkan: '2', ditolak: '4' },
          { bulan: 'Maret', jumlahPerkara: '15', dikabulkan: '4', ditolak: '7' },
          { bulan: 'April', jumlahPerkara: '10', dikabulkan: '1', ditolak: '6' },
          { total: 'Total', jumlahPerkara: '45', dikabulkan: '10', ditolak: '22' },
        ],
      },
      subSections: [
        {
          title: 'Putusan MK Penting 2025',
          content: 'Putusan yang berdampak luas pada kebijakan nasional',
          data: [
            'UU Cipta Kerja: dikabulkan sebagian (Februari 2025)',
            'UU KPK: ditolak seluruhnya (Maret 2025)',
            'UU Pemilu: dikabulkan terkait ambang batas parlemen (Juni 2025)',
          ],
        },
      ],
    },
  },
  {
    id: 'otonomi-daerah',
    title: 'Otonomi Daerah',
    desc: 'Hak, wewenang, dan kewajiban daerah untuk mengatur dan mengurus sendiri urusan pemerintahannya.',
    icon: '🗺️',
    color: 'bg-emerald-50 border-emerald-200',
    accent: 'text-emerald-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Otonomi daerah adalah hak, wewenang, dan kewajiban daerah (Provinsi, Kabupaten, atau Kota) untuk mengatur dan mengurus sendiri urusan pemerintahan dan kepentingan masyarakatnya. Tujuan utamanya: meningkatkan pelayanan publik yang lebih cepat dan tepat sasaran, memberdayakan masyarakat lokal, dan meningkatkan daya saing daerah.',
      asas: [
        { nama: 'Desentralisasi', desc: 'Penyerahan wewenang sepenuhnya dari pemerintah pusat kepada daerah otonom (daerah punya kuasa penuh atas urusan tersebut).' },
        { nama: 'Dekonsentrasi', desc: 'Pelimpahan wewenang dari pusat kepada Gubernur (sebagai wakil pemerintah pusat di daerah).' },
        { nama: 'Tugas Pembantuan', desc: 'Penugasan dari pusat ke daerah atau desa untuk melaksanakan tugas tertentu dengan biaya dan sarana dari yang memberi tugas.' },
      ],
      pembagianUrusan: [
        {
          kategori: 'Urusan Absolut (Mutlak Milik Pusat)',
          desc: 'Daerah tidak boleh ikut campur dalam 6 hal: Politik luar negeri, Pertahanan, Keamanan, Yustisi, Moneter & Fiskal, dan Agama.',
        },
        {
          kategori: 'Urusan Konkuren (Dibagi Pusat & Daerah)',
          desc: 'Dikelola bersama: Pendidikan, Kesehatan, Lingkungan Hidup, Pariwisata, dll. Dibagi menjadi urusan wajib (pelayanan dasar) dan urusan pilihan.',
        },
        {
          kategori: 'Urusan Pemerintahan Umum',
          desc: 'Kewenangan yang menjadi ranah Presiden sebagai kepala pemerintahan, seperti pembinaan wawasan kebangsaan.',
        },
      ],
      expandedSections: [
        {
          title: 'Keuntungan dan Tantangan Otonomi Daerah',
          items: [
            { label: 'Keuntungan: Efisiensi', desc: 'Pengambilan keputusan lebih cepat karena tidak semua harus lapor ke Jakarta.' },
            { label: 'Keuntungan: Keadilan', desc: 'Daerah yang punya SDA besar bisa mengelola hasilnya sendiri melalui PAD dan Dana Bagi Hasil.' },
            { label: 'Tantangan: Korupsi', desc: 'Desentralisasi tanpa pengawasan ketat membuka peluang "raja-raja kecil" yang korup di daerah.' },
            { label: 'Tantangan: Ketimpangan', desc: 'Daerah kaya makin maju, daerah miskin tertinggal karena PAD yang kecil.' },
            { label: 'Tantangan: Pemekaran', desc: 'Ada 37 DOB (Daerah Otonomi Baru) yang dimekarkan belum berhasil mandiri; masih bergantung 90%+ dari DAU pusat.' },
          ],
        },
        {
          title: 'Pendapatan Asli Daerah (PAD) dan Dana Transfer',
          items: [
            { label: 'PAD', desc: 'Pajak Daerah, Retribusi Daerah, hasil pengelolaan kekayaan daerah. Idealnya jadi sumber utama keuangan daerah.' },
            { label: 'DAU (Dana Alokasi Umum)', desc: 'Transfer dari pusat untuk pemerataan, tidak ada syarat khusus penggunaannya.' },
            { label: 'DAK (Dana Alokasi Khusus)', desc: 'Transfer dengan tujuan spesifik (pendidikan, kesehatan, infrastruktur) sesuai prioritas nasional.' },
            { label: 'DBH (Dana Bagi Hasil)', desc: 'Bagi hasil pajak dan SDA antara pusat dan daerah penghasil.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Realisasi Transfer ke Daerah 2025',
        periode: 'Hingga September 2025',
        sumber: 'Kementerian Keuangan',
        data: [
          { jenis: 'Dana Alokasi Umum (DAU)', realisasi: 'Rp342,5 T', persentase: '78%' },
          { jenis: 'Dana Alokasi Khusus (DAK)', realisasi: 'Rp98,7 T', persentase: '65%' },
          { jenis: 'Dana Desa', realisasi: 'Rp52,3 T', persentase: '70%' },
          { jenis: 'Dana Bagi Hasil (DBH)', realisasi: 'Rp45,6 T', persentase: '82%' },
        ],
      },
      subSections: [
        {
          title: 'Evaluasi 4 Provinsi Baru Papua (2022-2025)',
          content: 'Progres pembangunan DOB Papua setelah 3 tahun',
          data: [
            'Papua Selatan: progres infrastruktur 45%',
            'Papua Tengah: progres infrastruktur 38%',
            'Papua Pegunungan: progres infrastruktur 42%',
            'Papua Barat Daya: progres infrastruktur 51%',
          ],
        },
      ],
    },
  },
  {
    id: 'partai-politik',
    title: 'Partai Politik',
    desc: 'Organisasi yang dibentuk untuk memperjuangkan cita-cita rakyat dan merebut kekuasaan secara konstitusional.',
    icon: '🚩',
    color: 'bg-rose-50 border-rose-200',
    accent: 'text-rose-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Partai politik adalah organisasi yang dibentuk untuk memperjuangkan cita-cita dan kepentingan rakyat serta merebut kekuasaan secara konstitusional.',
      fungsiUtama: [
        'Sarana Komunikasi Politik: Menghubungkan aspirasi rakyat dengan kebijakan pemerintah.',
        'Sosialisasi Politik: Mendidik masyarakat agar sadar akan hak dan kewajibannya sebagai warga negara.',
        'Rekrutmen Politik: Mencari dan melatih kader-kader berbakat untuk menjadi pemimpin.',
        'Pengatur Konflik: Membantu menyelesaikan perbedaan pendapat di masyarakat melalui cara-cara demokratis di parlemen.',
        'Agregasi Kepentingan: Mengumpulkan berbagai aspirasi masyarakat menjadi satu platform kebijakan yang koheren.',
      ],
      expandedSections: [
        {
          title: 'Sistem Multipartai Indonesia',
          items: [
            { label: 'Mengapa Multipartai?', desc: 'Indonesia yang heterogen membutuhkan banyak partai untuk mewakili beragam kepentingan suku, agama, kelas sosial, dan ideologi.' },
            { label: 'Parliamentary Threshold (PT)', desc: 'Partai harus mendapat minimal 4% suara nasional untuk bisa punya kursi di DPR. Ini untuk mencegah fragmentasi yang terlalu ekstrem.' },
            { label: 'Presidential Threshold (PT Pilpres)', desc: 'Koalisi partai pengusung Capres harus memiliki minimal 20% kursi DPR atau 25% suara nasional. Ini mendorong koalisi.' },
            { label: 'Koalisi Pemerintahan', desc: 'Di Indonesia, koalisi sering terbentuk setelah pemilu karena tidak ada satu partai yang mendominasi. Koalisi Prabowo 2024 menguasai lebih dari 70% kursi DPR.' },
          ],
        },
        {
          title: 'Tantangan Partai Politik Indonesia',
          items: [
            { label: 'Oligarki Partai', desc: 'Banyak partai dikendalikan oleh segelintir elit keluarga atau konglomerat, bukan kader profesional.' },
            { label: 'Pendanaan', desc: 'Biaya politik tinggi mendorong praktik korupsi dan ketergantungan pada "bandar" partai.' },
            { label: 'Kaderisasi Lemah', desc: 'Banyak kandidat dipilih berdasarkan popularitas atau uang, bukan kompetensi.' },
            { label: 'Ideologi yang Kabur', desc: 'Di era pragmatisme, banyak partai sulit dibedakan programnya — semua pro-rakyat, pro-pembangunan, tanpa diferensiasi yang jelas.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Komposisi DPR RI Hasil Pemilu 2024',
        periode: '2024-2029',
        sumber: 'KPU RI',
        data: [
          { partai: 'PDIP', kursi: '110', persentase: '19.1%' },
          { partai: 'Golkar', kursi: '102', persentase: '17.7%' },
          { partai: 'Gerindra', kursi: '86', persentase: '14.9%' },
          { partai: 'PKB', kursi: '68', persentase: '11.8%' },
          { partai: 'NasDem', kursi: '59', persentase: '10.2%' },
          { partai: 'PKS', kursi: '53', persentase: '9.2%' },
          { partai: 'Demokrat', kursi: '44', persentase: '7.6%' },
          { partai: 'PAN', kursi: '38', persentase: '6.6%' },
        ],
      },
      subSections: [
        {
          title: 'Pendanaan Partai Politik dari APBN 2025',
          content: 'Bantuan keuangan negara untuk partai politik',
          data: [
            'Total bantuan: Rp168 miliar per tahun',
            'Per kursi DPR: Rp1,5 miliar per tahun',
            'Partai penerima tertinggi: PDIP (Rp16,5 miliar)',
            '5 partai kena sanksi karena tidak laporkan keuangan',
          ],
        },
      ],
    },
  },
  {
    id: 'integritas-politik',
    title: 'Integritas Politik',
    desc: 'Konsistensi antara tindakan, nilai, dan prinsip para aktor politik dengan aturan hukum serta etika.',
    icon: '💎',
    color: 'bg-indigo-50 border-indigo-200',
    accent: 'text-indigo-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Integritas politik adalah konsistensi antara tindakan, nilai-nilai, metode, prinsip, serta harapan yang mendasari perilaku para aktor politik (pemimpin, pejabat, dan partai politik) dengan aturan hukum dan etika yang berlaku.',
      pilarUtama: [
        { nama: 'Kejujuran', desc: 'Bertindak transparan dan memberikan informasi yang benar kepada publik tanpa manipulasi.' },
        { nama: 'Tanggung Jawab', desc: 'Berani menanggung risiko dan konsekuensi dari setiap keputusan yang diambil untuk kepentingan rakyat.' },
        { nama: 'Keadilan', desc: 'Tidak memihak atau melakukan diskriminasi, serta mendahulukan kepentingan umum di atas kepentingan pribadi atau golongan.' },
        { nama: 'Ketaatan Hukum', desc: 'Selalu bergerak dalam koridor aturan perundang-undangan (konstitusional).' },
      ],
      expandedSections: [
        {
          title: 'Bentuk-Bentuk Korupsi dalam Politik',
          items: [
            { label: 'Suap (Bribery)', desc: 'Memberikan atau menerima sesuatu (uang/barang/jasa) agar seseorang melakukan atau tidak melakukan tugas jabatannya.' },
            { label: 'Gratifikasi', desc: 'Pemberian yang diterima oleh pejabat terkait jabatannya (wajib dilaporkan ke KPK dalam 30 hari).' },
            { label: 'Korupsi Kebijakan', desc: 'Membuat kebijakan yang menguntungkan kelompok tertentu (pengusaha, keluarga) atas nama kepentingan publik.' },
            { label: 'Pencucian Uang', desc: 'Menyembunyikan hasil korupsi dengan cara "mencuci" uang melalui bisnis legal atau rekening orang lain.' },
            { label: 'Nepotisme', desc: 'Memberikan jabatan atau keuntungan kepada keluarga/kerabat tanpa mempertimbangkan kompetensi.' },
          ],
        },
        {
          title: 'Peran Masyarakat dalam Menjaga Integritas Politik',
          items: [
            { label: 'Pilih Kandidat Bersih', desc: 'Gunakan hak pilih untuk memilih kandidat dengan rekam jejak bersih, bukan yang hanya membagi uang.' },
            { label: 'Laporkan Dugaan Korupsi', desc: 'Gunakan kanal pengaduan KPK (0800-1-200), Ombudsman, atau Bawaslu untuk melaporkan kecurangan.' },
            { label: 'Awasi LHKPN', desc: 'Publik bisa mengakses laporan harta kekayaan pejabat di elhkpn.kpk.go.id.' },
            { label: 'Literasi Anti-Korupsi', desc: 'Memahami dan menyebarkan pengetahuan tentang dampak korupsi bagi kemiskinan dan ketidakadilan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Indeks Persepsi Korupsi Indonesia 2025',
        periode: 'Tahun 2025',
        sumber: 'Transparency International',
        data: [
          { tahun: '2023', skor: '34', peringkat: '115 dari 180 negara' },
          { tahun: '2024', skor: '36', peringkat: '110 dari 180 negara' },
          { tahun: '2025', skor: '38', peringkat: '105 dari 180 negara' },
        ],
      },
      subSections: [
        {
          title: 'Penindakan Korupsi oleh KPK 2025',
          content: 'Data penanganan perkara korupsi',
          data: [
            { jenis: 'Penyelidikan', jumlah: '85 perkara' },
            { jenis: 'Penyidikan', jumlah: '62 perkara' },
            { jenis: 'Penuntutan', jumlah: '48 perkara' },
            { jenis: 'Eksekusi', jumlah: '35 perkara' },
            { jenis: 'Kerugian Negara Diselamatkan', nilai: 'Rp2,3 Triliun' },
          ],
        },
        {
          title: 'Kepatuhan LHKPN 2025',
          content: 'Pelaporan harta kekayaan pejabat negara',
          data: [
            'Wajib lapor: 375.000 pejabat',
            'Telah lapor: 326.250 (87%)',
            'Tepat waktu: 290.000 (77.3%)',
            'Sanksi administratif: 1.200 pejabat',
          ],
        },
      ],
    },
  },
  {
    id: 'hak-konstitusional',
    title: 'Hak Konstitusional Warga',
    desc: 'Hak-hak yang bersumber dan dilindungi langsung oleh konstitusi (UUD 1945).',
    icon: '⚖️',
    color: 'bg-sky-50 border-sky-200',
    accent: 'text-sky-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Hak konstitusional adalah hak-hak yang dimiliki setiap warga negara yang bersumber dan dilindungi langsung oleh konstitusi (UUD 1945). Jika hak ini dilanggar, warga negara memiliki dasar hukum yang kuat untuk menuntut keadilan.',
      penggolongan: [
        { golongan: 'Hak Sipil dan Politik', desc: 'Hak untuk hidup, hak bebas dari penyiksaan, hak beragama, serta hak untuk memilih dan dipilih dalam Pemilu.' },
        { golongan: 'Hak Ekonomi, Sosial, dan Budaya', desc: 'Hak atas pekerjaan yang layak, hak mendapatkan pendidikan, dan hak atas jaminan sosial.' },
        { golongan: 'Hak Kelompok Khusus', desc: 'Perlindungan khusus bagi hak anak dan hak masyarakat adat.' },
      ],
      expandedSections: [
        {
          title: 'Pasal-Pasal HAM dalam UUD 1945 (Pasal 28A-J)',
          items: [
            { label: 'Pasal 28A', desc: 'Hak untuk hidup dan mempertahankan kehidupan.' },
            { label: 'Pasal 28B', desc: 'Hak membentuk keluarga; hak anak atas perlindungan dari kekerasan dan diskriminasi.' },
            { label: 'Pasal 28C', desc: 'Hak mengembangkan diri melalui pendidikan; hak atas ilmu pengetahuan dan seni budaya.' },
            { label: 'Pasal 28D', desc: 'Hak atas pengakuan, jaminan, perlindungan dan kepastian hukum yang adil; hak atas imbalan kerja yang layak.' },
            { label: 'Pasal 28E', desc: 'Kebebasan memeluk agama; kebebasan berserikat dan berkumpul; kebebasan mengeluarkan pendapat.' },
            { label: 'Pasal 28G', desc: 'Hak atas perlindungan diri pribadi dan keluarga; hak untuk tidak disiksa.' },
            { label: 'Pasal 28H', desc: 'Hak hidup sejahtera; hak atas lingkungan hidup yang baik; hak atas jaminan sosial.' },
            { label: 'Pasal 28I', desc: 'Hak-hak yang tidak dapat dikurangi (non-derogable rights): hak hidup, bebas dari penyiksaan, non-retroaktif, dll.' },
            { label: 'Pasal 28J', desc: 'Kewajiban menghormati HAM orang lain; boleh dibatasi UU untuk ketertiban umum.' },
          ],
        },
        {
          title: 'Cara Memperjuangkan Hak Konstitusional',
          items: [
            { label: 'Judicial Review ke MK', desc: 'Jika ada UU yang merugikan hak konstitusional, bisa diuji ke MK. Terbuka untuk semua warga negara.' },
            { label: 'Pengaduan ke Komnas HAM', desc: 'Untuk pelanggaran HAM oleh negara atau aparat, lapor ke Komnas HAM.' },
            { label: 'Ombudsman RI', desc: 'Untuk maladministrasi layanan publik, pengaduan ke Ombudsman.' },
            { label: 'Banding ke PTUN', desc: 'Pengadilan Tata Usaha Negara untuk menggugat keputusan administratif pemerintah.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Pengaduan Masyarakat ke Komnas HAM 2025',
        periode: 'Januari – September 2025',
        sumber: 'Komnas HAM',
        data: [
          { jenisPelanggaran: 'Hak atas keadilan', jumlah: '234 laporan' },
          { jenisPelanggaran: 'Hak atas rasa aman', jumlah: '187 laporan' },
          { jenisPelanggaran: 'Hak berpendapat', jumlah: '98 laporan' },
          { jenisPelanggaran: 'Diskriminasi', jumlah: '76 laporan' },
          { jenisPelanggaran: 'Hak atas pekerjaan', jumlah: '45 laporan' },
        ],
      },
      subSections: [
        {
          title: 'Permohonan Uji Materi ke MK 2025',
          content: 'Perkara pengujian UU oleh warga negara',
          data: [
            'Total permohonan 2025: 45 perkara',
            'Pemohon perorangan: 28 perkara (62%)',
            'Pemohon LSM: 10 perkara (22%)',
            'Pemohon pemerintah daerah: 7 perkara (16%)',
          ],
        },
      ],
    },
  },
  {
    id: 'partisipasi-publik',
    title: 'Partisipasi Publik',
    desc: 'Keterlibatan sukarela warga negara dalam proses pengambilan keputusan dan pengawasan kebijakan.',
    icon: '📣',
    color: 'bg-lime-50 border-lime-200',
    accent: 'text-lime-700',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Partisipasi publik adalah keterlibatan sukarela warga negara dalam proses pengambilan keputusan, perencanaan, pelaksanaan, dan pengawasan kebijakan pemerintah. Dalam demokrasi, suara rakyat tidak hanya dibutuhkan saat Pemilu, tetapi juga dalam keseharian jalannya pemerintahan.',
      bentukPartisipasi: [
        { bentuk: 'Partisipasi Politik', desc: 'Menggunakan hak pilih dalam Pemilu atau Pilkada, serta menjadi anggota partai politik.' },
        { bentuk: 'Partisipasi Sosial', desc: 'Ikut serta dalam kegiatan kemasyarakatan, seperti gotong royong atau musyawarah warga.' },
        { bentuk: 'Partisipasi dalam Pengambilan Keputusan', desc: 'Memberikan masukan dalam penyusunan UU atau Perda (misalnya melalui Public Hearing atau Uji Publik).' },
        { bentuk: 'Partisipasi Pengawasan', desc: 'Memantau kinerja pejabat publik dan melaporkan jika ada dugaan pelanggaran atau korupsi.' },
      ],
      expandedSections: [
        {
          title: 'Tangga Partisipasi Arnstein (Ladder of Participation)',
          items: [
            { label: '8. Kontrol Warga Negara', desc: 'Tertinggi: Warga memiliki kekuasaan penuh atas program dan kebijakan.' },
            { label: '7. Kekuasaan yang Didelegasikan', desc: 'Warga memegang mayoritas kursi dalam komite yang mengambil keputusan.' },
            { label: '6. Kemitraan', desc: 'Kekuasaan dibagi antara pemerintah dan warga melalui negosiasi.' },
            { label: '5. Penenangan (Placation)', desc: 'Warga memberi saran, tapi pemerintah tidak harus mengikutinya.' },
            { label: '4. Konsultasi', desc: 'Pemerintah meminta pendapat warga, tapi tidak ada jaminan pendapat digunakan.' },
            { label: '3. Informasi', desc: 'Warga hanya diberi tahu soal kebijakan, tanpa saluran umpan balik.' },
            { label: '2. Terapi / Penyembuhan', desc: 'Partisipasi semu — "mengobati" frustrasi warga tanpa memberi kekuasaan nyata.' },
            { label: '1. Manipulasi', desc: 'Terendah: Warga "dilibatkan" hanya untuk legitimasi keputusan yang sudah dibuat.' },
          ],
        },
        {
          title: 'Kanal Partisipasi Digital di Indonesia',
          items: [
            { label: 'LAPOR! (lapor.go.id)', desc: 'Platform pengaduan resmi nasional. Sudah terintegrasi dengan 628 instansi pemerintah.' },
            { label: 'Satu Data Indonesia (data.go.id)', desc: 'Portal data terbuka pemerintah untuk transparansi kebijakan.' },
            { label: 'e-RKPD', desc: 'Sistem perencanaan pembangunan daerah yang bisa diakses publik.' },
            { label: 'Change.org / petisi.net', desc: 'Platform petisi online yang kerap menjadi saluran aspirasi warga ke DPR dan pemerintah.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Partisipasi Masyarakat dalam Musrenbang 2025',
        periode: 'Tahun 2025',
        sumber: 'Bappenas',
        data: [
          { tingkat: 'Desa/Kelurahan', partisipasi: '68%', usulan: '850.000 usulan' },
          { tingkat: 'Kecamatan', partisipasi: '52%', usulan: '420.000 usulan' },
          { tingkat: 'Kabupaten/Kota', partisipasi: '41%', usulan: '210.000 usulan' },
          { tingkat: 'Provinsi', partisipasi: '32%', usulan: '85.000 usulan' },
          { tingkat: 'Nasional', partisipasi: '18%', usulan: '12.000 usulan' },
        ],
      },
      subSections: [
        {
          title: 'Pengaduan Melalui LAPOR! 2025',
          content: 'Layanan Aspirasi dan Pengaduan Online Rakyat',
          data: [
            'Total laporan 2025: 450.000 laporan',
            'Terselesaikan: 382.500 (85%)',
            'Rata-rata waktu penyelesaian: 5 hari kerja',
            'Instansi teraktif: Kemensos (45.000 laporan)',
          ],
        },
      ],
    },
  },
  {
    id: 'rekam-jejak-dpr',
    title: 'Rekam Jejak DPR RI',
    desc: 'Catatan kinerja wakil rakyat — legislasi, anggaran, dan pengawasan periode 2019-2025.',
    icon: '📊',
    color: 'bg-cyan-50 border-cyan-200',
    accent: 'text-cyan-600',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: 'Rekam jejak anggota dewan adalah catatan kinerja wakil rakyat selama masa jabatan, meliputi fungsi legislasi (membuat UU), fungsi anggaran (menyetujui APBN), dan fungsi pengawasan (mengawasi pemerintah).',
      expandedSections: [
        {
          title: 'Fungsi Utama DPR dan Indikator Kinerjanya',
          items: [
            { label: 'Fungsi Legislasi', desc: 'Membuat UU bersama Presiden. Ukurannya: berapa banyak UU diselesaikan vs target Prolegnas.' },
            { label: 'Fungsi Anggaran', desc: 'Membahas dan menyetujui RAPBN menjadi APBN. Ukurannya: seberapa kritis DPR dalam mengawasi pos anggaran.' },
            { label: 'Fungsi Pengawasan', desc: 'Mengawasi pelaksanaan UU dan kebijakan pemerintah. Ukurannya: berapa hak interpelasi, angket, dan menyatakan pendapat digunakan.' },
            { label: 'Absensi & Kehadiran', desc: 'Tingkat kehadiran anggota DPR dalam rapat paripurna dan rapat komisi.' },
          ],
        },
        {
          title: 'Rekap UU Kontroversial DPR 2019-2024',
          items: [
            { label: 'UU Cipta Kerja (Omnibus Law)', desc: 'Menggabungkan puluhan UU untuk kemudahan investasi. Dikritik karena prosesnya terburu-buru dan minim partisipasi publik.' },
            { label: 'Revisi UU KPK (2019)', desc: 'Dianggap sebagai langkah pelemahan KPK: pegawai KPK jadi ASN, dibentuk Dewan Pengawas.' },
            { label: 'UU TPKS', desc: 'Rekam jejak POSITIF: memberikan perlindungan nyata bagi korban kekerasan seksual yang diperjuangkan selama 12 tahun.' },
            { label: 'UU IKN', desc: 'Dasar hukum pemindahan ibu kota ke Kalimantan Timur yang dibahas sangat cepat (11 hari).' },
            { label: 'UU Kesehatan (Omnibus Law)', desc: 'Reformasi besar di sektor kesehatan yang sempat ditolak oleh IDI, PDGI, dan organisasi profesi lainnya.' },
          ],
        },
        {
          title: 'Tantangan DPR 2024-2029',
          items: [
            { label: 'Koalisi Supergemuk', desc: 'Lebih dari 70% kursi DPR dikuasai partai koalisi pemerintah, melemahkan fungsi check and balances.' },
            { label: 'Transparansi', desc: 'Banyak rapat tertutup; publik kesulitan memantau proses pembahasan RUU secara real-time.' },
            { label: 'Kualitas vs Kuantitas', desc: 'Apakah banyaknya UU yang dibuat berbanding lurus dengan kualitas dan manfaat bagi rakyat?' },
            { label: 'Tunjangan dan Fasilitas', desc: 'Publik masih mempertanyakan korelasi antara besarnya tunjangan anggota DPR dengan kinerja yang dihasilkan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Kinerja DPR RI Tahun Sidang 2024-2025',
        periode: 'Agustus 2024 – Oktober 2025',
        sumber: 'DPR RI & Formappi',
        data: [
          { kategori: 'Rapat Paripurna', total: '48 rapat', kehadiranRata: '78%' },
          { kategori: 'RUU yang Disahkan', total: '32 RUU', inisiatifDPR: '18' },
          { kategori: 'Kunjungan Kerja', total: '125 kunjungan', anggaran: 'Rp45 M' },
          { kategori: 'Reses', total: '4 kali', serapanAspirasi: '12.000 usulan' },
        ],
      },
      subSections: [
        {
          title: 'Perbandingan Kinerja Legislasi Lintas Periode',
          content: 'Produktivitas legislasi DPR dari era ke era',
          data: [
            { periode: '2004-2009', jumlahUU: '189 UU', catatan: 'Era SBY periode 1' },
            { periode: '2009-2014', jumlahUU: '126 UU', catatan: 'Era SBY periode 2' },
            { periode: '2014-2019', jumlahUU: '91 UU', catatan: 'Terendah dalam 15 tahun' },
            { periode: '2019-2024', jumlahUU: '225 UU', catatan: 'Tertinggi dalam 15 tahun' },
          ],
        },
        {
          title: 'Tunjangan Anggota DPR 2025 (Pasca Pemangkasan)',
          content: 'Data setelah efisiensi anggaran September 2025',
          data: [
            { komponen: 'Take Home Pay baru', nominal: 'Rp65,5 juta/bulan' },
            { komponen: 'Tunjangan Komunikasi Intensif', nominal: 'Rp20,03 juta/bulan' },
            { komponen: 'UMR Jakarta (pembanding)', nominal: 'Rp5,39 juta/bulan' },
          ],
        },
      ],
    },
  },
  {
    id: 'apbn-apbd',
    title: 'APBN & APBD 2025-2026',
    desc: 'Tulang punggung finansial negara — program prioritas, defisit, dan transfer ke daerah.',
    icon: '💰',
    color: 'bg-yellow-50 border-yellow-300',
    accent: 'text-yellow-700',
    dataTahun: '2025-2026',
    fullContent: {
      pengertian: 'APBN (Anggaran Pendapatan dan Belanja Negara) adalah rencana keuangan tahunan pemerintah yang disetujui DPR. APBD adalah versi daerahnya. Tahun 2025-2026 adalah masa transisi krusial di mana anggaran mulai sepenuhnya mencerminkan visi pemerintahan Prabowo-Gibran.',
      expandedSections: [
        {
          title: 'Struktur APBN 2025',
          items: [
            { label: 'Total Belanja Negara', desc: 'Rp3.613,1 Triliun — terbesar dalam sejarah Indonesia.' },
            { label: 'Pendapatan Negara', desc: 'Rp2.996,9 Triliun (Pajak: Rp2.490 T + PNBP: Rp505 T + Hibah: Rp1,9 T).' },
            { label: 'Defisit', desc: 'Rp616,2 Triliun (2,53% PDB) — masih di bawah batas legal 3% PDB.' },
            { label: 'Pembiayaan', desc: 'Ditutup dengan penerbitan obligasi (SUN/SBSN) dan pinjaman luar negeri.' },
          ],
        },
        {
          title: 'Program Prioritas Pemerintahan Prabowo-Gibran',
          items: [
            { label: 'Makan Bergizi Gratis (MBG)', desc: 'Rp71 triliun/tahun untuk makan siang bergizi bagi siswa sekolah dan ibu hamil. Program paling ambisius.' },
            { label: 'Hilirisasi Industri', desc: 'Dana untuk membangun smelter dan pabrik pengolahan nikel, bauksit, tembaga agar Indonesia punya nilai tambah.' },
            { label: 'Ketahanan Pangan', desc: 'Cetak sawah baru, irigasi, pupuk bersubsidi untuk swasembada pangan di 2027.' },
            { label: 'Pembangunan IKN', desc: 'Anggaran dilanjutkan meski lebih selektif — fokus pada infrastruktur dasar dan pindahkan ASN secara bertahap.' },
          ],
        },
        {
          title: 'Efisiensi Anggaran 2025 — "Kebijakan Efisiensi" Prabowo',
          items: [
            { label: 'Pemangkasan Tunjangan', desc: 'Tunjangan anggota DPR, pejabat kementerian, dan TNI/Polri dipangkas 10-20% pada September 2025.' },
            { label: 'Pengurangan Perjalanan Dinas', desc: 'Kunjungan kerja DPR dan perjalanan dinas ASN dikurangi 30%; diganti rapat virtual.' },
            { label: 'Realokasi ke Program Prioritas', desc: 'Penghematan dialihkan untuk MBG, kesehatan, dan infrastruktur yang langsung menyentuh rakyat.' },
            { label: 'Kontroversi', desc: 'Beberapa akademisi menilai efisiensi anggaran tanpa peningkatan pendapatan akan mempersempit ruang fiskal jangka panjang.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Realisasi Program Prioritas APBN 2025',
        periode: 'Hingga Agustus 2025',
        sumber: 'Kementerian Keuangan',
        data: [
          { program: 'Program Keluarga Harapan (PKH)', anggaran: 'Rp74,6 T', penerima: '10 juta keluarga' },
          { program: 'Tunjangan Profesi Guru', anggaran: 'Rp53,2 T', penerima: 'Guru dan dosen' },
          { program: 'Subsidi Energi', anggaran: 'Rp41,5 T', keterangan: 'BBM & LPG 3kg' },
          { program: 'Jaminan Kesehatan Nasional', anggaran: 'Rp34,7 T', keterangan: 'PBI JKN' },
          { program: 'Program Indonesia Pintar', anggaran: 'Rp8,7 T', penerima: '18,6 juta siswa' },
          { program: 'Makan Bergizi Gratis', anggaran: 'Rp71 T (alokasi)', status: 'Mulai dijalankan 2025' },
        ],
      },
      subSections: [
        {
          title: 'Tantangan Fiskal 2026',
          content: 'Isu-isu keuangan negara yang perlu diwaspadai',
          data: [
            'Rasio pajak (tax ratio) Indonesia hanya 10,2% PDB — jauh di bawah rata-rata OECD 34%',
            'Utang negara mencapai Rp8.909 T (38,7% PDB) per September 2025',
            'Subsidi BBM & LPG yang tidak tepat sasaran: 30% penerima adalah kalangan mampu',
            'Ketergantungan pada komoditas — harga nikel turun 40% di 2024 tekan pendapatan negara',
          ],
        },
      ],
    },
  },
  {
    id: 'indeks-demokrasi',
    title: 'Indeks Demokrasi Indonesia',
    desc: 'Rapor kesehatan demokrasi berdasarkan kebebasan sipil, hak-hak politik, dan lembaga demokrasi.',
    icon: '📈',
    color: 'bg-violet-50 border-violet-200',
    accent: 'text-violet-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'IDI memberikan rapor mengenai kesehatan demokrasi Indonesia. IDI diukur berdasarkan tiga aspek utama: Kebebasan Sipil, Hak-Hak Politik, dan Lembaga Demokrasi.',
      expandedSections: [
        {
          title: 'Tiga Aspek IDI dan Indikator-Indikatornya',
          items: [
            { label: 'Kebebasan Sipil', desc: 'Mencakup kebebasan berkumpul dan berserikat, kebebasan berpendapat, kebebasan berkeyakinan/beragama, dan kebebasan dari diskriminasi.' },
            { label: 'Hak-Hak Politik', desc: 'Hak memilih dan dipilih, hak berpartisipasi dalam Pemilu dan partai politik, serta keterwakilan perempuan.' },
            { label: 'Lembaga Demokrasi', desc: 'Pemilu yang bebas dan adil, kemandirian DPR, akuntabilitas partai, penegakan hukum, dan kinerja birokrasi.' },
          ],
        },
        {
          title: 'Faktor Penaik dan Penurun IDI',
          items: [
            { label: 'Faktor Penaik IDI', desc: 'Pemilu yang berjalan damai, kebebasan pers yang terjaga, akses informasi publik yang luas, dan keterwakilan perempuan yang meningkat.' },
            { label: 'Faktor Penurun IDI', desc: 'Kasus intoleransi, pembatasan demonstrasi, kriminalisasi kritik media sosial (UU ITE), dan lemahnya oposisi di DPR.' },
            { label: 'Variasi Antar Provinsi', desc: 'DIY konsisten tertinggi karena budaya dialog yang kuat dan nilai toleransi. Papua terendah karena keamanan dan aksesibilitas terbatas.' },
          ],
        },
        {
          title: 'Posisi Indonesia di Indeks Internasional 2025',
          items: [
            { label: 'EIU Democracy Index', desc: 'Indonesia berada di peringkat 54 (skor 6,71) dengan kategori "Flawed Democracy" (Demokrasi Cacat).' },
            { label: 'Freedom House', desc: 'Indonesia mendapat skor "Partly Free" — kebebasan sipil dan hak politik dinilai "terbatas" tapi ada.' },
            { label: 'V-Dem (Varieties of Democracy)', desc: 'Indonesia masuk kategori "Electoral Democracy" — pemilu kompetitif, tapi institusi demokratis perlu penguatan.' },
            { label: 'Press Freedom Index (RSF)', desc: 'Peringkat ke-72 dari 180 negara — naik dari peringkat 100+ pada era Orde Baru, tapi masih perlu peningkatan.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'IDI 2025 — Provinsi Tertinggi & Terendah',
        periode: 'Tahun 2025',
        sumber: 'Kemenko Polkam & BPS',
        peringkat: [
          { provinsi: 'DI Yogyakarta', skor: '89.25', perubahan: '+5.37' },
          { provinsi: 'DKI Jakarta', skor: '84.67', perubahan: '+2.10' },
          { provinsi: 'Jawa Tengah', skor: '83.42', perubahan: '+1.80' },
          { provinsi: 'Bali', skor: '82.91', perubahan: '+0.50' },
          { provinsi: 'Jawa Timur', skor: '81.73', perubahan: '-0.30' },
          { provinsi: 'Aceh', skor: '64.32', perubahan: '-1.80' },
          { provinsi: 'Papua', skor: '62.18', perubahan: '-2.50' },
        ],
      },
      subSections: [
        {
          title: 'Studi Kasus: DIY vs Kalimantan Timur',
          content: 'Perbandingan faktor keberhasilan dan penurunan IDI',
          data: [
            { provinsi: 'DI Yogyakarta (naik 5,37)', faktor: 'Dialog publik konstruktif, kebebasan sipil terjamin, nilai lokalitas kuat' },
            { provinsi: 'Kalimantan Timur (turun 1,59)', faktor: 'Dampak pembangunan IKN: demo anarkis, resapan aspirasi menurun' },
          ],
        },
      ],
    },
  },
  {
    id: 'buku-putih',
    title: 'Buku Putih Kebijakan',
    desc: 'Dokumen strategis berbasis data untuk menyelesaikan masalah spesifik bangsa.',
    icon: '📖',
    color: 'bg-slate-50 border-slate-200',
    accent: 'text-slate-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Buku Putih adalah dokumen resmi yang berisi panduan strategis dan usulan kebijakan untuk menyelesaikan masalah spesifik bangsa. Berbeda dengan UU atau PP, Buku Putih lebih bersifat rekomendasi dan menjadi peta jalan bagi penyusunan regulasi.',
      expandedSections: [
        {
          title: 'Perbedaan Buku Putih, Naskah Akademik, dan UU',
          items: [
            { label: 'Buku Putih', desc: 'Dokumen strategis dari pemerintah/kementerian berisi analisis situasi dan rekomendasi kebijakan. Bersifat tidak mengikat.' },
            { label: 'Naskah Akademik', desc: 'Kajian ilmiah yang menjadi dasar penyusunan RUU. Wajib disertakan setiap RUU inisiatif DPR atau Presiden.' },
            { label: 'RUU/UU', desc: 'Produk hukum yang mengikat setelah disahkan DPR dan ditandatangani Presiden.' },
            { label: 'Peraturan Pemerintah (PP)', desc: 'Aturan pelaksana UU yang dibuat oleh Presiden tanpa persetujuan DPR.' },
          ],
        },
        {
          title: 'Contoh Buku Putih Berpengaruh di Indonesia',
          items: [
            { label: 'Buku Putih Pertahanan Indonesia', desc: 'Dikeluarkan Kemenhan secara berkala, berisi analisis ancaman dan strategi pertahanan nasional.' },
            { label: 'Grand Design Reformasi Birokrasi', desc: 'Roadmap Kemen-PANRB untuk mewujudkan birokrasi bersih, kompeten, dan melayani.' },
            { label: 'Indonesia Emas 2045', desc: 'Dokumen visi jangka panjang yang menjadi acuan RPJPN (Rencana Pembangunan Jangka Panjang Nasional).' },
            { label: 'Peta Jalan Hilirisasi Industri', desc: 'Panduan Kementerian ESDM dan Perindustrian untuk pengembangan industri hilir berbasis SDA.' },
          ],
        },
        {
          title: 'Proses Penyusunan Kebijakan Berbasis Bukti',
          items: [
            { label: '1. Identifikasi Masalah', desc: 'Mengumpulkan data dan bukti empiris tentang masalah yang perlu diselesaikan.' },
            { label: '2. Analisis Pilihan Kebijakan', desc: 'Mengevaluasi berbagai opsi kebijakan beserta risiko dan manfaatnya.' },
            { label: '3. Konsultasi Publik', desc: 'Melibatkan akademisi, LSM, masyarakat terdampak, dan pemangku kepentingan.' },
            { label: '4. Rekomendasi & Formulasi', desc: 'Merumuskan rekomendasi kebijakan yang paling efektif dan efisien.' },
            { label: '5. Implementasi & Evaluasi', desc: 'Menjalankan kebijakan dan terus mengevaluasi dampaknya dengan data.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Naskah Akademik yang Disusun 2025',
        periode: 'Januari – September 2025',
        sumber: 'Bappenas & DPR',
        data: [
          { judul: 'RUU Kesejahteraan Ibu dan Anak', status: 'Selesai', lembaga: 'Bappenas' },
          { judul: 'RUU Perampasan Aset', status: 'Pembahasan', lembaga: 'Kemenkumham' },
          { judul: 'RUU Masyarakat Hukum Adat', status: 'Naskah awal', lembaga: 'Kemendagri' },
          { judul: 'RUU Perlindungan Pekerja Rumah Tangga', status: 'Selesai', lembaga: 'Kemnaker' },
        ],
      },
      subSections: [
        {
          title: 'Prioritas Kajian Kebijakan 2026',
          content: 'Isu yang membutuhkan Buku Putih segera',
          data: [
            'Transisi Energi Hijau (Net Zero Emission 2060): roadmap penghapusan PLTU batubara',
            'Keamanan Siber Nasional: strategi pertahanan digital Indonesia',
            'Ketahanan Pangan 2030: mitigasi El Niño dan perubahan iklim',
            'Regulasi Kecerdasan Buatan (AI): etika, keamanan, dan tata kelola AI',
          ],
        },
      ],
    },
  },
  {
    id: 'etika-politik',
    title: 'Etika Politik',
    desc: 'Tanggung jawab moral para aktor politik dan dasar etis dari kekuasaan negara.',
    icon: '🔮',
    color: 'bg-fuchsia-50 border-fuchsia-200',
    accent: 'text-fuchsia-600',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Etika politik adalah cabang dari etika yang mempertanyakan tanggung jawab moral para aktor politik dan dasar moral dari kekuasaan negara. Ia mencari jawaban atas pertanyaan: "Apa yang membuat suatu kekuasaan itu sah atau adil?"',
      prinsipDasar: [
        'Keadilan Sosial: Kebijakan harus menguntungkan kelompok yang paling tidak beruntung.',
        'Kejujuran Publik: Pejabat harus terbuka mengenai harta kekayaan dan proses pengambilan keputusan.',
        'Netralitas Birokrasi: Aparatur sipil negara tidak boleh memihak kepentingan politik praktis.',
        'Penghormatan Martabat Manusia: Politik tidak boleh mengorbankan hak asasi manusia demi stabilitas.',
      ],
      expandedSections: [
        {
          title: 'Teori Etika Politik Utama',
          items: [
            { label: 'Utilitarisme (Jeremy Bentham & J.S. Mill)', desc: 'Kebijakan yang baik adalah yang menghasilkan kebahagiaan/manfaat terbesar bagi jumlah orang terbanyak. Masalah: bisa mengorbankan minoritas.' },
            { label: 'Deontologi (Immanuel Kant)', desc: 'Ada prinsip moral mutlak yang tidak boleh dilanggar meski hasilnya "demi kebaikan". Contoh: Tidak boleh berbohong meski untuk kebaikan.' },
            { label: 'Etika Kebajikan (Aristoteles)', desc: 'Fokus pada karakter pemimpin, bukan hanya pada aturan atau hasil. Pemimpin yang baik = yang punya keberanian, keadilan, kebijaksanaan.' },
            { label: 'Teori Kontrak Sosial (Rousseau & Rawls)', desc: 'Kekuasaan sah hanya jika rakyat telah "menyepakatinya". Rawls: kebijakan adil adalah yang bisa dipilih tanpa tahu posisi kita di masyarakat.' },
          ],
        },
        {
          title: 'Dilema Etis dalam Politik Indonesia',
          items: [
            { label: 'Stabilitas vs Kebebasan', desc: 'Seberapa besar kebebasan sipil boleh dibatasi "demi stabilitas"? Ini perdebatan sejak Orde Baru hingga kini.' },
            { label: 'Efisiensi vs Partisipasi', desc: 'Kebijakan yang efisien kadang membutuhkan keputusan cepat tanpa konsultasi publik. Mana yang diprioritaskan?' },
            { label: 'Kepentingan Nasional vs HAM', desc: 'Apakah kepentingan nasional (misal: investasi besar) boleh mengorbankan hak-hak masyarakat adat?' },
            { label: 'Dinasti Politik', desc: 'Apakah seseorang boleh mencalonkan diri hanya karena punya hubungan keluarga dengan pemimpin? Di sini etika bertemu hukum.' },
          ],
        },
        {
          title: 'Kode Etik Penyelenggara Negara',
          items: [
            { label: 'Kode Etik Anggota DPR', desc: 'Dilarang rangkap jabatan; wajib laporkan LHKPN; dilarang terima imbalan terkait tugas legislasi; wajib jaga rahasia negara.' },
            { label: 'Kode Etik Hakim', desc: 'Wajib imparsial; dilarang komunikasi satu pihak dalam perkara; dilarang terima gratifikasi; wajib menjaga martabat pengadilan.' },
            { label: 'Kode Etik ASN', desc: 'Netral dalam Pemilu; menjaga rahasia negara; melayani tanpa diskriminasi; tidak menyalahgunakan wewenang.' },
            { label: 'Kode Etik Penyelenggara Pemilu', desc: 'Independen dari semua pihak; transparan dalam setiap keputusan; akuntabel kepada publik.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Laporan Pelanggaran Etika 2025',
        periode: 'Januari – Agustus 2025',
        sumber: 'KPK & Ombudsman RI',
        data: [
          { kategori: 'Konflik Kepentingan', jumlahLaporan: '142', status: 'Ditindaklanjuti' },
          { kategori: 'Maladministrasi', jumlahLaporan: '286', status: 'Selesai 70%' },
          { kategori: 'Penyalahgunaan Wewenang', jumlahLaporan: '94', status: 'Penyidikan' },
          { kategori: 'Gratifikasi', jumlahLaporan: '1.205', nilai: 'Rp12,4 Miliar' },
        ],
      },
      subSections: [
        {
          title: 'Putusan DKPP Terpenting 2025',
          content: 'Keputusan Dewan Kehormatan Penyelenggara Pemilu',
          data: [
            '8 komisioner KPU daerah diberhentikan karena pelanggaran etik berat',
            '3 anggota Bawaslu provinsi dikenai sanksi peringatan keras',
            '21 penyelenggara pemilu mendapat sanksi rehabilitasi',
          ],
        },
      ],
    },
  },
  {
    id: 'kalender-politik',
    title: 'Kalender Politik 2025-2026',
    desc: 'Agenda politik pasca Pemilu 2024 — konsolidasi kekuasaan dan persiapan Pemilu 2029.',
    icon: '📅',
    color: 'bg-neutral-50 border-neutral-200',
    accent: 'text-neutral-600',
    dataTahun: '2025-2026',
    fullContent: {
      pengertian: 'Pasca pemilu besar 2024, kalender politik 2025-2026 fokus pada konsolidasi kekuasaan dan persiapan menuju pemerintahan yang stabil serta persiapan awal Pemilu 2029.',
      expandedSections: [
        {
          title: 'Fokus Politik 2025: Tahun Konsolidasi',
          items: [
            { label: 'Pelantikan Kepala Daerah', desc: 'Ribuan bupati, walikota, dan gubernur hasil Pilkada 2024 dilantik bertahap pada semester I 2025.' },
            { label: 'Penyusunan RPJMD', desc: 'Setiap kepala daerah baru wajib menyusun Rencana Pembangunan Jangka Menengah Daerah dalam 6 bulan pertama.' },
            { label: 'Pembahasan APBN 2026', desc: 'DPR dan pemerintah mulai bahas RAPBN 2026 mulai Agustus-Oktober 2025.' },
            { label: 'Reorganisasi Kementerian', desc: 'Penyesuaian struktur dan SDM kementerian/lembaga pasca dibentuknya kabinet Prabowo.' },
          ],
        },
        {
          title: 'Fokus Politik 2026: Evaluasi Mid-Term',
          items: [
            { label: 'Evaluasi 100 Hari & 2 Tahun', desc: 'Publik dan parlemen mengevaluasi realisasi janji kampanye Prabowo-Gibran di tahun ke-2 kepemimpinan.' },
            { label: 'Stabilitas Koalisi', desc: 'Apakah koalisi superbesar (70%+ kursi DPR) masih solid atau mulai terkoreksi seiring kepentingan yang berbeda?' },
            { label: 'Pemilu 2029 — Persiapan Awal', desc: 'KPU mulai tahap awal persiapan: penyusunan regulasi teknis dan pemutakhiran data pemilih.' },
            { label: 'Perang Melawan Korupsi', desc: 'Setengah masa jabatan adalah masa ujian: apakah KPK dan KPPU masih independen?' },
          ],
        },
        {
          title: 'Isu Struktural yang Akan Memengaruhi Politik 2025-2029',
          items: [
            { label: 'Bonus Demografi', desc: 'Indonesia dalam puncak bonus demografi 2025-2035. Keberhasilan menyerap tenaga kerja muda menentukan stabilitas politik.' },
            { label: 'Perubahan Iklim & Ketahanan Pangan', desc: 'El Niño dan kekeringan berpotensi mengguncang stabilitas sosial-politik jika ketahanan pangan lemah.' },
            { label: 'Rivalitas AS-China', desc: 'Indonesia harus navigasi ketegangan dua kekuatan besar yang makin intens, terutama di Laut China Selatan.' },
            { label: 'Digitalisasi & AI', desc: 'Transformasi digital mengubah lanskap politik: informasi instan, pemilu berbasis data, tapi juga hoaks dan serangan siber.' },
          ],
        },
      ],
      dataUtama: {
        judul: 'Agenda Politik Nasional 2025-2026',
        periode: 'Oktober 2025 – Desember 2026',
        sumber: 'KPU RI & DPR RI',
        data: [
          { tanggal: '16 Agustus 2025', agenda: 'Pidato Kenegaraan Presiden', keterangan: 'HUT RI ke-80' },
          { tanggal: 'September 2025', agenda: 'Pengumuman IDI 2025', keterangan: 'Kemenko Polkam' },
          { tanggal: 'Okt-Des 2025', agenda: 'Masa Sidang DPR', keterangan: 'Pembahasan RAPBN 2026' },
          { tanggal: 'Februari 2026', agenda: 'Pilkada Ulang', keterangan: 'Daerah sengketa' },
          { tanggal: 'Agustus 2026', agenda: 'Penyampaian RAPBN 2027', keterangan: 'Presiden ke DPR' },
          { tanggal: 'November 2026', agenda: 'Reses DPR', keterangan: 'Penyerapan aspirasi' },
        ],
      },
      subSections: [
        {
          title: 'Milestone Persiapan Pemilu 2029',
          content: 'Jadwal tahapan yang sudah dimulai',
          data: [
            '2025: Pemutakhiran data pemilih berkelanjutan',
            '2026: Penyusunan regulasi teknis Pemilu 2029',
            '2027: Verifikasi administrasi dan faktual partai politik',
            '2028: Pendaftaran calon legislatif dan kampanye awal',
            '2029: Pelaksanaan Pemilu Serentak',
          ],
        },
      ],
    },
  },
];

// ============================================================
// 5. GLOSSARY POPUP
// ============================================================
const GlossaryPopup = ({ term, onClose, position }) => {
  const data = glossaryData[term.toLowerCase()] || { definition: `Definisi "${term}" sedang dalam pengembangan.`, example: '' };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      style={{ position: 'fixed', top: Math.max(10, position.y - 160), left: Math.max(10, Math.min(position.x - 200, window.innerWidth - 410)), zIndex: 9999 }}
      className="w-96 bg-black text-white p-5 rounded-2xl border-4 border-red-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-lg font-black uppercase text-red-400">{term}</h4>
        <button onClick={onClose} className="text-white hover:text-red-400 font-bold text-lg leading-none">✕</button>
      </div>
      <p className="text-sm leading-relaxed mb-3">{data.definition}</p>
      {data.example && (
        <div className="border-t border-white/20 pt-3">
          <p className="text-[10px] font-black text-red-400 uppercase mb-1">Contoh:</p>
          <p className="text-xs italic opacity-80">{data.example}</p>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================
// 6. TEXT WITH GLOSSARY
// ============================================================
const TextWithGlossary = ({ text }) => {
  const [activeTerm, setActiveTerm] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  if (!text || typeof text !== 'string') return null;
  const hardWords = Object.keys(glossaryData);
  const handleWordClick = (e, word) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top });
    setActiveTerm(word);
  };
  const words = text.split(' ');
  return (
    <span className="inline">
      {words.map((word, index) => {
        const cleanWord = word.replace(/[.,!?;:()'"]/g, '').toLowerCase();
        const isHard = hardWords.includes(cleanWord);
        return isHard ? (
          <React.Fragment key={index}>
            <span onClick={(e) => handleWordClick(e, cleanWord)} className="cursor-pointer border-b-2 border-dotted border-red-500 hover:bg-red-500 hover:text-white transition-colors px-0.5 rounded">
              {word}
            </span>{' '}
          </React.Fragment>
        ) : (
          <span key={index}>{word} </span>
        );
      })}
      <AnimatePresence>
        {activeTerm && createPortal(
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setActiveTerm(null)} />
            <GlossaryPopup term={activeTerm} onClose={() => setActiveTerm(null)} position={popupPosition} />
          </>,
          document.body
        )}
      </AnimatePresence>
    </span>
  );
};

// ============================================================
// 7. DATA TABLE
// ============================================================
const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) return null;
  const keys = columns || Object.keys(data[0]);
  return (
    <div className="overflow-x-auto border border-white/20 rounded-xl mt-3">
      <table className="min-w-full divide-y divide-white/10 text-sm">
        <thead>
          <tr>
            {keys.map((key, i) => (
              <th key={i} className="px-4 py-2 text-left text-[10px] font-black uppercase tracking-wider text-red-400">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {data.map((row, ri) => (
            <tr key={ri} className="hover:bg-white/5">
              {keys.map((key, ci) => (
                <td key={ci} className="px-4 py-2 text-white/80">
                  {row[key] !== undefined ? String(row[key]) : '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ============================================================
// 8. QUIZ COMPONENT
// ============================================================
const QuizSection = ({ moduleId }) => {
  const questions = quizData[moduleId];
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!questions) return null;

  const handleAnswer = (qIdx, oIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    let s = 0;
    questions.forEach((q, i) => { if (answers[i] === q.correct) s++; });
    setScore(s);
    setSubmitted(true);
  };

  const handleReset = () => { setAnswers({}); setSubmitted(false); setScore(0); };

  return (
    <div className="mt-16 bg-zinc-950 text-white rounded-[2rem] p-8 border-4 border-red-600">
      <div className="flex items-center gap-3 mb-8">
        <Brain className="text-red-500 w-7 h-7" />
        <h3 className="text-2xl font-black uppercase">Uji Pemahaman</h3>
      </div>

      {submitted && (
        <div className={`mb-8 p-6 rounded-2xl border-4 text-center ${score === questions.length ? 'border-green-500 bg-green-900/30' : score >= questions.length / 2 ? 'border-yellow-500 bg-yellow-900/30' : 'border-red-500 bg-red-900/30'}`}>
          <div className="text-5xl font-black mb-2">{score}/{questions.length}</div>
          <div className="text-lg font-bold">
            {score === questions.length ? '🎉 Sempurna! Kamu benar-benar menguasai materi ini.' : score >= questions.length / 2 ? '👍 Bagus! Coba ulangi untuk hasil lebih baik.' : '📚 Yuk baca ulang materinya ya!'}
          </div>
        </div>
      )}

      <div className="space-y-8">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="font-black text-base mb-4 leading-relaxed">
              <span className="text-red-400 mr-2">{qi + 1}.</span>{q.q}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt, oi) => {
                let cls = 'p-4 rounded-xl border-2 text-sm font-medium cursor-pointer transition-all ';
                if (!submitted) {
                  cls += answers[qi] === oi ? 'border-red-500 bg-red-900/30 text-white' : 'border-white/20 hover:border-white/50 text-white/70 hover:text-white';
                } else {
                  if (oi === q.correct) cls += 'border-green-500 bg-green-900/40 text-green-300';
                  else if (answers[qi] === oi && oi !== q.correct) cls += 'border-red-500 bg-red-900/40 text-red-300';
                  else cls += 'border-white/10 text-white/30';
                }
                return (
                  <div key={oi} className={cls} onClick={() => handleAnswer(qi, oi)}>
                    <span className="font-black mr-2 text-xs">{String.fromCharCode(65 + oi)}.</span>
                    {opt}
                    {submitted && oi === q.correct && <span className="ml-2 text-green-400 text-xs font-black">✓ BENAR</span>}
                    {submitted && answers[qi] === oi && oi !== q.correct && <span className="ml-2 text-red-400 text-xs font-black">✗ SALAH</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="flex-1 py-4 bg-red-600 disabled:bg-zinc-700 text-white font-black uppercase rounded-2xl transition-all hover:bg-red-700 disabled:cursor-not-allowed"
          >
            {Object.keys(answers).length < questions.length ? `Jawab ${questions.length - Object.keys(answers).length} soal lagi` : 'Kumpulkan Jawaban'}
          </button>
        ) : (
          <button onClick={handleReset} className="flex-1 py-4 bg-zinc-700 text-white font-black uppercase rounded-2xl hover:bg-zinc-600">
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================================
// 9. EXPANDED SECTION RENDERER
// ============================================================
const ExpandableSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-black dark:border-white/20 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left font-black uppercase text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
      >
        {title}
        {open ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 border-t-2 border-black dark:border-white/20">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================
// 10. STUDY ROOM — FULL CONTENT RENDERER
// ============================================================
const StudyRoom = ({ module, onBack, onComplete }) => {
  const fc = module.fullContent;

  const renderExpandedSections = () => {
    if (!fc.expandedSections) return null;
    return (
      <div className="mt-12 space-y-4">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-6">
          Materi Lebih Dalam
        </h3>
        {fc.expandedSections.map((sec, i) => (
          <ExpandableSection key={i} title={sec.title}>
            <div className="space-y-4">
              {sec.items.map((item, j) => (
                <div key={j} className="flex gap-4">
                  <div className="w-2 flex-shrink-0 bg-red-600 rounded-full mt-1" />
                  <div>
                    <p className="font-black text-sm mb-1">{item.label}</p>
                    <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>
        ))}
      </div>
    );
  };

  const renderPoinPenting = () => {
    if (!fc.poinPenting) return null;
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-6">Poin Penting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fc.poinPenting.map((p, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white/20 rounded-2xl">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h4 className="font-black mb-2">{p.title}</h4>
              <p className="text-sm opacity-70 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPilarUtama = () => {
    if (!fc.pilarUtama) return null;
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-6">Pilar Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fc.pilarUtama.map((p, i) => (
            <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-l-4 border-red-600">
              <h4 className="font-black mb-2">{p.nama}</h4>
              <p className="text-sm opacity-70">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPrinsipUtama = () => {
    if (!fc.prinsipUtama) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Prinsip Utama Demokrasi</h3>
        <div className="space-y-3">
          {fc.prinsipUtama.map((p, i) => (
            <div key={i} className="flex gap-4 p-4 bg-white dark:bg-zinc-900 border-2 border-black/10 rounded-xl">
              <CheckCircle2 className="text-red-600 w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-black text-sm">{p.nama}: </span>
                <span className="text-sm opacity-70">{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderJenisDemokrasi = () => {
    if (!fc.jenisDemokrasi) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Jenis-Jenis Demokrasi</h3>
        <div className="space-y-3">
          {fc.jenisDemokrasi.map((j, i) => (
            <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
              <h4 className="font-black mb-1 text-sm">{j.jenis}</h4>
              <p className="text-sm opacity-70">{j.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPrinsipPemilu = () => {
    if (!fc.prinsipPemilu) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Asas Pemilu: LUBER JURDIL</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fc.prinsipPemilu.daftar.map((item, i) => (
            <div key={i} className="p-4 bg-black text-white rounded-2xl text-center">
              <div className="text-2xl font-black text-red-400 mb-1">{item.asas.charAt(0)}</div>
              <div className="font-black text-sm mb-1">{item.asas}</div>
              <div className="text-xs opacity-60 leading-tight">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSejarahDemokrasi = () => {
    if (!fc.sejarahDemokrasi) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Sejarah Demokrasi Indonesia</h3>
        <div className="relative pl-8 border-l-4 border-red-600 space-y-6">
          {fc.sejarahDemokrasi.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[2.3rem] w-4 h-4 bg-red-600 rounded-full" />
              <h4 className="font-black text-sm mb-1">{item.periode}</h4>
              <p className="text-sm opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBagianLembaga = () => {
    if (!fc.bagianLembaga) return null;
    return (
      <div className="mt-12 space-y-8">
        {fc.bagianLembaga.map((bag, i) => (
          <ExpandableSection key={i} title={bag.kategori}>
            <p className="text-sm opacity-70 mb-4">{bag.desc}</p>
            <div className="space-y-4">
              {bag.lembaga.map((l, j) => (
                <div key={j} className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-black/10">
                  <div className="flex justify-between flex-wrap gap-2 mb-1">
                    <h4 className="font-black text-sm">{l.nama}</h4>
                    <span className="text-xs font-bold bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full">{l.ketua}</span>
                  </div>
                  <p className="text-sm opacity-60">{l.tugas}</p>
                </div>
              ))}
            </div>
          </ExpandableSection>
        ))}
      </div>
    );
  };

  const renderTriasPolitica = () => {
    if (!fc.triasPolitica) return null;
    return (
      <div className="mt-12">
        <ExpandableSection title="Trias Politica: Locke vs Montesquieu">
          <p className="text-sm opacity-70 mb-6 leading-relaxed">{fc.triasPolitica.pengertian}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fc.triasPolitica.perbedaanPandangan.map((pandangan, i) => (
              <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-800 rounded-2xl">
                <h4 className="font-black text-base mb-4 text-red-600">{pandangan.tokoh}</h4>
                <div className="space-y-2">
                  {pandangan.poin.map((p, j) => (
                    <div key={j} className="flex gap-2">
                      <span className="text-red-500 font-black text-xs mt-0.5">▸</span>
                      <div>
                        <span className="font-black text-sm">{p.nama}: </span>
                        <span className="text-sm opacity-70">{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded-xl leading-relaxed">{pandangan.catatan}</p>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </div>
    );
  };

  const renderTahapanPemilu = () => {
    if (!fc.tahapanPemilu) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Tahapan Pemilu</h3>
        <div className="space-y-4">
          {fc.tahapanPemilu.map((fase, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border-2 border-black/10 rounded-2xl">
              <h4 className="font-black mb-3 text-red-600">{fase.fase}</h4>
              <ul className="space-y-2">
                {fase.poin.map((p, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <span className="text-red-500 flex-shrink-0">•</span>
                    <span className="opacity-70">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTigaLembaga = () => {
    if (!fc.tigaLembaga) return null;
    return (
      <div className="mt-10 space-y-6">
        {fc.tigaLembaga.map((l, i) => (
          <div key={i} className="p-6 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white/20 rounded-2xl">
            <h4 className="font-black text-base mb-2 text-red-600">{l.nama}</h4>
            <p className="text-sm opacity-70 mb-4 italic">{l.desc}</p>
            <ul className="space-y-2">
              {l.tugas.map((t, j) => (
                <li key={j} className="flex gap-2 text-sm">
                  <CheckCircle2 className="text-red-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="opacity-70">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderAsas = () => {
    if (!fc.asas) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Asas Otonomi Daerah</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fc.asas.map((a, i) => (
            <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-t-4 border-red-600">
              <h4 className="font-black mb-2">{a.nama}</h4>
              <p className="text-sm opacity-70">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPembagianUrusan = () => {
    if (!fc.pembagianUrusan) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Pembagian Urusan Pemerintahan</h3>
        <div className="space-y-3">
          {fc.pembagianUrusan.map((u, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 rounded-2xl border-l-4 border-red-600">
              <h4 className="font-black mb-1">{u.kategori}</h4>
              <p className="text-sm opacity-70">{u.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMaknaAlinea = () => {
    if (!fc.maknaAlinea) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Makna Pembukaan UUD 1945</h3>
        <div className="space-y-4">
          {fc.maknaAlinea.map((a, i) => (
            <div key={i} className="p-5 bg-white dark:bg-zinc-900 border-2 border-black/10 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full">{a.alinea}</span>
                <span className="font-black text-sm">{a.intisari}</span>
              </div>
              <p className="text-sm opacity-70 leading-relaxed">{a.makna}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderIPP = () => {
    if (!fc.indeksPartisipasiPemilu) return null;
    const ipp = fc.indeksPartisipasiPemilu;
    return (
      <div className="mt-10 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
        <h3 className="text-xl font-black mb-4">Capaian Partisipasi Pemilu 2024</h3>
        <div className="grid grid-cols-3 gap-4">
          {ipp.capaianPartisipasi.map((c, i) => (
            <div key={i} className="bg-black text-white p-4 rounded-xl text-center">
              <div className="text-2xl font-black text-red-400">{c.tingkatPartisipasi}</div>
              <div className="text-xs mt-1 opacity-60">{c.jenisPemilu}</div>
              <div className="text-xs mt-1 text-green-400 font-bold">{c.keterangan}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBentukPartisipasi = () => {
    if (!fc.bentukPartisipasi) return null;
    return (
      <div className="mt-10">
        <h3 className="text-2xl font-black uppercase text-red-600 border-b-4 border-black dark:border-white pb-2 mb-5">Bentuk Partisipasi Publik</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fc.bentukPartisipasi.map((b, i) => (
            <div key={i} className="p-5 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
              <h4 className="font-black text-sm mb-2">{b.bentuk}</h4>
              <p className="text-sm opacity-70">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDataUtama = () => {
    if (!fc.dataUtama) return null;
    return (
      <div className="bg-black text-white p-8 rounded-[2rem] border-4 border-red-600 my-8">
        <h2 className="text-xl font-black uppercase mb-2 text-red-400">{fc.dataUtama.judul}</h2>
        <p className="text-xs opacity-60 mb-4">Periode: {fc.dataUtama.periode} | Sumber: {fc.dataUtama.sumber}</p>
        {fc.dataUtama.peringkat && <DataTable data={fc.dataUtama.peringkat} columns={['provinsi', 'skor', 'perubahan']} />}
        {fc.dataUtama.data && <DataTable data={fc.dataUtama.data} />}
      </div>
    );
  };

  const renderSubSections = () => {
    if (!fc.subSections) return null;
    return (
      <div className="space-y-12 mt-12">
        {fc.subSections.map((sub, i) => (
          <div key={i}>
            <h3 className="text-xl font-black uppercase text-red-600 border-b-2 border-black dark:border-white/20 pb-2 mb-4">{sub.title}</h3>
            <p className="text-base opacity-70 mb-4">{sub.content}</p>
            {sub.data && Array.isArray(sub.data) && (
              typeof sub.data[0] === 'object'
                ? <div className="overflow-x-auto border-2 border-black dark:border-white/20 rounded-xl"><table className="min-w-full text-sm"><thead className="bg-zinc-100 dark:bg-zinc-800"><tr>{Object.keys(sub.data[0]).map((k, ki) => <th key={ki} className="px-4 py-2 text-left text-xs font-black uppercase">{k}</th>)}</tr></thead><tbody>{sub.data.map((row, ri) => <tr key={ri} className="border-t border-zinc-200 dark:border-zinc-700">{Object.values(row).map((v, vi) => <td key={vi} className="px-4 py-3 text-sm">{String(v)}</td>)}</tr>)}</tbody></table></div>
                : <div className="space-y-2">{sub.data.map((item, idx) => <div key={idx} className="flex gap-3 items-start p-4 bg-white dark:bg-zinc-900 border border-black/10 rounded-xl"><CheckCircle2 className="text-red-500 w-4 h-4 flex-shrink-0 mt-0.5" /><span className="text-sm opacity-80">{item}</span></div>)}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 z-[200] bg-zinc-50 dark:bg-zinc-950 overflow-y-auto"
    >
      <nav className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black dark:border-white/20">
        <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="flex gap-3 items-center">
          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black">Data {module.dataTahun}</span>
          <span className="font-black text-red-600 uppercase text-xs hidden md:block">{module.title}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-12">
          <span className="text-7xl mb-4 block">{module.icon}</span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-6">{module.title}</h1>
          <div className="text-lg font-medium opacity-60 italic border-l-8 border-red-600 pl-5 leading-relaxed">
            <TextWithGlossary text={fc.pengertian} />
          </div>
        </header>

        {renderDataUtama()}
        {renderPoinPenting()}
        {renderPrinsipUtama()}
        {renderJenisDemokrasi()}
        {renderPrinsipPemilu()}
        {renderIPP()}
        {renderSejarahDemokrasi()}
        {renderBagianLembaga()}
        {renderTriasPolitica()}
        {renderTahapanPemilu()}
        {renderTigaLembaga()}
        {renderPilarUtama()}
        {renderAsas()}
        {renderPembagianUrusan()}
        {renderMaknaAlinea()}
        {renderBentukPartisipasi()}
        {renderExpandedSections()}
        {renderSubSections()}

        <QuizSection moduleId={module.id} />

        <button
          onClick={() => { onComplete(module.id); onBack(); }}
          className="w-full mt-12 py-6 bg-red-600 text-white text-xl font-black uppercase rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:shadow-none transition-all"
        >
          ✓ Tandai Selesai & Kembali
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================
// 11. PROFILE ROOM — EXPANDED WITH FRIENDLY DESC
// ============================================================
const ProfileRoom = ({ tokoh, onBack }) => {
  return (
    <motion.div
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 z-[300] bg-white dark:bg-zinc-950 overflow-y-auto"
    >
      <nav className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black dark:border-white/20">
        <button onClick={onBack} className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <span className="font-black text-red-600 uppercase text-xs tracking-widest">{tokoh.name}</span>
      </nav>

      <div className="max-w-5xl mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <div className="sticky top-32 space-y-6">
              <img
                src={tokoh.image} alt={tokoh.name} referrerPolicy="no-referrer"
                className="w-full aspect-[3/4] object-cover object-top rounded-[2.5rem] border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(220,38,38,1)]"
                onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/600x800?text=${tokoh.name}`; }}
              />
              <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl">
                <p className="text-[10px] font-black text-red-600 uppercase mb-1">Masa Pengabdian</p>
                <p className="text-xl font-black italic">{tokoh.period}</p>
              </div>
              {tokoh.pencapaianKunci && (
                <div className="bg-black text-white p-5 rounded-2xl">
                  <p className="text-[10px] font-black text-red-400 uppercase mb-3">Pencapaian Kunci</p>
                  <ul className="space-y-2">
                    {tokoh.pencapaianKunci.map((p, i) => (
                      <li key={i} className="flex gap-2 text-xs">
                        <Star className="text-yellow-400 w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                        <span className="opacity-80">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex-[1.5] space-y-10">
            <div>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-2">{tokoh.name}</h1>
              <p className="text-xl font-black text-red-600 uppercase mb-2">{tokoh.role}</p>
              <p className="text-base opacity-50 font-medium italic">{tokoh.bio}</p>
            </div>

            <div className="bg-black text-white p-8 rounded-[2rem]">
              <p className="text-[10px] font-black text-red-400 uppercase flex items-center gap-2 mb-4">
                <Award className="w-3.5 h-3.5" /> Kontribusi Terbesar
              </p>
              <p className="text-2xl font-black italic leading-tight">"{tokoh.contribution}"</p>
            </div>

            {tokoh.friendlyDesc && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-red-600 w-5 h-5" />
                  <h3 className="font-black uppercase text-sm tracking-widest">Cerita Seru</h3>
                </div>
                <div className="p-6 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border-l-4 border-red-600">
                  <p className="text-base leading-relaxed opacity-80">{tokoh.friendlyDesc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// 12. MODULE CARD
// ============================================================
const ModuleCard = ({ mod, completedModules, setActiveModule }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -4 }}
    onClick={() => setActiveModule(mod)}
    className={`cursor-pointer p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white/20 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] flex flex-col justify-between relative overflow-hidden`}
  >
    {completedModules.includes(mod.id) && (
      <div className="absolute top-4 right-4 bg-green-500 text-white p-1.5 rounded-full">
        <CheckCircle2 size={14} />
      </div>
    )}
    <div>
      <span className="text-4xl mb-3 block">{mod.icon}</span>
      <h4 className="text-base font-black uppercase mb-2 leading-tight pr-6">{mod.title}</h4>
      <p className="text-xs opacity-50 mb-3 line-clamp-2 leading-relaxed">{mod.desc}</p>
      <div className="bg-zinc-100 dark:bg-zinc-800 inline-block px-2 py-1 rounded-full text-[10px] font-black">
        Data {mod.dataTahun}
      </div>
    </div>
    <div className="flex items-center gap-1 font-black text-red-600 uppercase text-[10px] tracking-widest mt-4">
      Pelajari <ChevronRight size={10} />
    </div>
  </motion.div>
);

// ============================================================
// 13. MAIN COMPONENT
// ============================================================
const PoliticsBasics = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeTokoh, setActiveTokoh] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleComplete = (id) => {
    if (!completedModules.includes(id)) setCompletedModules(prev => [...prev, id]);
  };

  const cat1 = modules.slice(0, 6);
  const cat2 = modules.slice(6, 12);
  const cat3 = modules.slice(12, 20);

  const filteredModules = useMemo(() => {
    if (!searchQuery) return null;
    return modules.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const progress = Math.round((completedModules.length / modules.length) * 100);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white py-16 px-4 md:px-6 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none mb-3 uppercase">
            <span className="text-red-600">DASAR</span><span className="text-black dark:text-white">POLITIK</span>
          </h1>
          <p className="text-lg font-bold opacity-40 uppercase tracking-widest mb-6">
            20 Modul Lengkap · Data Aktual 2025-2026
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono mb-8">
            {['IDI 2025','APBN 2025','DPR 2024-2025','Pilkada 2025','KPK 2025','MK 2025'].map(tag => (
              <span key={tag} className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">{tag}</span>
            ))}
          </div>

          {/* PROGRESS BAR */}
          <div className="bg-zinc-100 dark:bg-zinc-900 p-5 rounded-2xl border-2 border-black dark:border-white/20">
            <div className="flex justify-between items-center mb-2">
              <span className="font-black text-sm uppercase">Progress Belajar</span>
              <span className="font-black text-red-600">{completedModules.length}/{modules.length} modul · {progress}%</span>
            </div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </header>

        {/* SEARCH */}
        <div className="relative mb-12">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari modul... (contoh: Pancasila, Pemilu, DPR)"
            className="w-full pl-14 pr-6 py-5 text-base bg-zinc-100 dark:bg-zinc-900 border-2 border-black dark:border-white/20 rounded-2xl font-medium outline-none focus:border-red-600 transition-colors"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600 font-black">✕</button>
          )}
        </div>

        {/* SEARCH RESULTS */}
        {searchQuery && filteredModules && (
          <div className="mb-16">
            <h2 className="text-lg font-black uppercase mb-4 opacity-60">
              {filteredModules.length} hasil untuk "{searchQuery}"
            </h2>
            {filteredModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModules.map(mod => (
                  <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 opacity-40">
                <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                <p className="font-black">Modul tidak ditemukan.</p>
              </div>
            )}
          </div>
        )}

        {/* MODULE SECTIONS */}
        {!searchQuery && (
          <>
            <section className="mb-20">
              <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-4">
                <Landmark className="text-red-600 w-7 h-7" /> Dasar Tata Negara
                <span className="text-sm font-mono opacity-40 ml-auto">Modul 1–6</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat1.map(mod => <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />)}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-4">
                <Scale className="text-red-600 w-7 h-7" /> Ideologi & Struktur Hukum
                <span className="text-sm font-mono opacity-40 ml-auto">Modul 7–12</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat2.map(mod => <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />)}
              </div>
            </section>

            <section className="mb-20">
              <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black dark:border-white pb-4">
                <Users className="text-red-600 w-7 h-7" /> Instrumen & Partisipasi Publik
                <span className="text-sm font-mono opacity-40 ml-auto">Modul 13–20</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat3.map(mod => <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />)}
              </div>
            </section>
          </>
        )}

        {/* TOKOH GALLERY */}
        {!searchQuery && (
          <section className="mt-24">
            <h2 className="text-4xl font-black uppercase italic mb-10 flex items-center gap-4 border-b-4 border-black dark:border-white pb-4">
              <Award className="text-red-600 w-8 h-8" /> Galeri Kepemimpinan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tokohBangsa.map(tokoh => (
                <motion.div
                  key={tokoh.id}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveTokoh(tokoh)}
                  className="group cursor-pointer relative h-[280px] md:h-[320px] rounded-[1.5rem] overflow-hidden bg-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]"
                >
                  <img
                    src={tokoh.image}
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-500"
                    alt={tokoh.name} referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = `https://via.placeholder.com/400x500?text=${tokoh.name}`; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <h4 className="text-sm font-black text-white uppercase leading-none mb-1">{tokoh.name}</h4>
                    <p className="text-red-400 font-black text-[10px] uppercase leading-tight">{tokoh.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-32 text-center text-xs opacity-30 pb-8">
          <p>20 Modul Pembelajaran Politik · Data: Kemenko Polkam, BPS, KPU, Bawaslu, MK, KPK, DPR RI, Kemenkeu, Formappi, Transparency International · 2025-2026</p>
        </footer>
      </div>

      <AnimatePresence>
        {activeModule && <StudyRoom module={activeModule} onBack={() => setActiveModule(null)} onComplete={handleComplete} />}
        {activeTokoh && <ProfileRoom tokoh={activeTokoh} onBack={() => setActiveTokoh(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default PoliticsBasics;
