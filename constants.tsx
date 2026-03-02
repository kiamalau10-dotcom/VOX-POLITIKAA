import { Minister, PoliticalParty, ProvinceData, NewsItem, Quiz, StrategicProgram } from './types';

export const CABINET_DATA: Minister[] = [
  {
    id: 'pres',
    name: 'Prabowo Subianto',
    position: 'Presiden Republik Indonesia',
    bio: 'Pemimpin tertinggi negara yang terpilih untuk masa jabatan 2024-2029.',
    tasks: ['Memimpin seluruh rakyat Indonesia', 'Menjaga keamanan negara', 'Membuat aturan besar untuk kemajuan bangsa'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvVhoD8ekFJsMNSY0agx0R0PoXQfPHYJofYw&s'
  },
  {
    id: 'vpres',
    name: 'Gibran Rakabuming Raka',
    position: 'Wakil Presiden Republik Indonesia',
    bio: 'Membantu Presiden dalam menjalankan tugas-tugas penting negara.',
    tasks: ['Membantu Presiden bekerja', 'Mengawasi pembangunan di daerah', 'Mewakili Presiden jika berhalangan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Gibran_Rakabuming_2024_official_portrait.jpg/960px-Gibran_Rakabuming_2024_official_portrait.jpg'
  },
  {
    id: 'menko-polkam',
    name: 'Djamari Chaniago',
    position: 'Menko Bidang Politik dan Keamanan',
    bio: 'Mengatur agar politik Indonesia stabil dan negara tetap aman.',
    tasks: ['Menjaga ketertiban masyarakat', 'Mengatur kerjasama antar lembaga keamanan', 'Memastikan hukum berjalan baik'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsoKcOlrpIK383ZcfssxCGb1KdgvQADzcRGg&s'
  },
  {
    id: 'menkeu',
    name: 'Purbaya Yudhi Sadewa',
    position: 'Menteri Keuangan',
    bio: 'Bendahara negara yang mengatur uang Indonesia agar cukup untuk membangun.',
    tasks: ['Mengatur tabungan negara', 'Membagi uang untuk sekolah dan rumah sakit', 'Memastikan ekonomi tetap kuat'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6FoIbvEFcYkCLm_03utHoLAHb1RvUAvpyIw&s'
  },
  {
    id: 'menlu',
    name: 'Sugiono',
    position: 'Menteri Luar Negeri',
    bio: 'Wajah Indonesia di dunia internasional yang menjalin persahabatan antar negara.',
    tasks: ['Mencari teman antar negara', 'Melindungi warga Indonesia di luar negeri', 'Mempromosikan budaya Indonesia'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27cWgo1Giz4JojLXSaKICs97HP7Rdsguxnw&s'
  },
  {
    id: 'menhan',
    name: 'Sjafrie Sjamsoeddin',
    position: 'Menteri Pertahanan',
    bio: 'Penjaga kedaulatan wilayah Indonesia dari ancaman luar.',
    tasks: ['Memperkuat TNI', 'Menjaga perbatasan negara', 'Menyiapkan alat pertahanan yang canggih'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_RI_%282024%29.jpg/250px-Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_RI_%282024%29.jpg'
  },
  {
    id: 'menko-infra',
    name: 'Agus Harimurti Yudhoyono',
    position: 'Menko Bidang Infrastruktur & Pemb. Wilayah',
    bio: 'Membangun jalan, jembatan, dan fasilitas umum di seluruh Indonesia.',
    tasks: ['Membangun jalan tol dan bendungan', 'Memperbaiki fasilitas di desa-desa', 'Memastikan pembangunan merata'],
    image: 'https://sumselterkini.co.id/wp-content/uploads/2017/10/agus-harimurti-yudhoyono.jpg'
  },
  {
    id: 'menkes',
    name: 'Budi Gunadi Sadikin',
    position: 'Menteri Kesehatan',
    bio: 'Dokter seluruh rakyat Indonesia yang memastikan semua orang sehat.',
    tasks: ['Menyediakan obat dan vaksin', 'Memperbaiki puskesmas dan RS', 'Mencegah penyakit menular'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiOBn0GE2Cb1MLcq96gXQJZOXQyS3SeFkkgg&s'
  },
  {
    id: 'mendikdasmen',
    name: 'Abdul Mu\'ti',
    position: 'Menteri Pendidikan Dasar & Menengah',
    bio: 'Guru besar yang mengatur sekolah agar siswa SMP seperti kamu pintar.',
    tasks: ['Membuat kurikulum belajar yang seru', 'Meningkatkan kualitas guru', 'Memperbaiki bangunan sekolah'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Menteri_pendidikan_indonesia.jpg/250px-Menteri_pendidikan_indonesia.jpg'
  },
  {
    id: 'menko-pangan',
    name: 'Zulkifli Hasan',
    position: 'Menko Bidang Pangan',
    bio: 'Memastikan stok nasi, sayur, dan lauk pauk cukup untuk semua rakyat.',
    tasks: ['Membantu petani agar panen banyak', 'Menjaga harga beras agar murah', 'Mencapai swasembada pangan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYls3SoFQmoQyLxDbXX-GSl36DtDWdFJz0XQ&s'
  },
  {
    id: 'menko-pmk',
    name: 'Pratikno',
    position: 'Menko Bidang Pembangunan Manusia dan Kebudayaan',
    bio: 'Orang tua bagi seluruh rakyat yang memastikan kesejahteraan dan budaya tetap terjaga.',
    tasks: ['Mengurangi angka kemiskinan', 'Meningkatkan prestasi olahraga dan seni', 'Mengatur bantuan sosial agar tepat sasaran'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnw0Dv6-z_jA_8C-8lMIZAR6fM7YX_FRxBMg&s'
  },
  {
    id: 'menko-perekonomian',
    name: 'Airlangga Hartarto',
    position: 'Menko Bidang Perekonomian',
    bio: 'Arsitek ekonomi yang memastikan bisnis dan lapangan kerja terus bertumbuh.',
    tasks: ['Menjaga harga barang tetap stabil', 'Meningkatkan investasi asing', 'Menciptakan lapangan kerja baru'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmtfQL5BHU_G9GyKAYgMyEsIJBmvRX8xsltQ&s'
  },
  {
    id: 'menko-hukum-ham',
    name: 'Yusril Ihza Mahendra',
    position: 'Menko Bidang Hukum, HAM, Imigrasi, dan Pemasyarakatan',
    bio: 'Pakar hukum yang memastikan keadilan dan hak asasi manusia dihormati.',
    tasks: ['Menyelaraskan undang-undang', 'Melindungi hak asasi warga negara', 'Memperbaiki sistem penjara'],
    image: 'https://www.suarasurabaya.net/wp-content/uploads/2025/09/Screenshot-2025-09-13-162303-744x493.jpg.webp'
  },
  {
    id: 'mensesneg',
    name: 'Prasetyo Hadi',
    position: 'Menteri Sekretaris Negara',
    bio: 'Tangan kanan Presiden yang mengatur administrasi dan agenda harian pemimpin negara.',
    tasks: ['Mengelola jadwal kerja Presiden', 'Menyiapkan naskah pidato dan keputusan presiden', 'Mendukung kelancaran tugas harian Istana'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiMugT733AHJbFOYmGT0EE_J6e0KhZ0Si1tw&s'
  },
  {
    id: 'mendagri',
    name: 'Tito Karnavian',
    position: 'Menteri Dalam Negeri',
    bio: 'Pembina seluruh kepala daerah (Gubernur, Bupati, Wali Kota) di Indonesia.',
    tasks: ['Menjaga kerukunan di daerah', 'Memastikan KTP dan data kependudukan rapi', 'Mengawasi kinerja pemerintah daerah'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKfo83qo1Px7GAz20KhtHgkYHuyCpUDjSAxQ&s'
  },
  {
    id: 'menag',
    name: 'Nasaruddin Umar',
    position: 'Menteri Agama',
    bio: 'Pembimbing spiritual bangsa yang menjaga kerukunan antarumat beragama.',
    tasks: ['Mengatur ibadah Haji dan Umrah', 'Membina sekolah-sekolah keagamaan', 'Menjaga toleransi antar agama'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQragNnabAmQzKcfYkjgY3_4ytWYUDGqG8gbg&s'
  },
  {
    id: 'menkum',
    name: 'Supratman Andi Agtas',
    position: 'Menteri Hukum',
    bio: 'Pembuat aturan legal yang memastikan administrasi hukum negara tertib.',
    tasks: ['Mengurus hak cipta dan paten', 'Membentuk peraturan perundang-undangan', 'Memberikan bantuan hukum bagi masyarakat'],
    image: 'https://kompaspedia.kompas.id/wp-content/uploads/2024/09/agtas5.jpg'
  },
  {
    id: 'menkominfo',
    name: 'Meutya Hafid',
    position: 'Menteri Komunikasi dan Digital',
    bio: 'Penjaga dunia digital yang memastikan internet cepat dan aman bagi semua.',
    tasks: ['Membangun sinyal internet di pelosok', 'Memberantas berita bohong (hoax)', 'Menjaga keamanan data pribadi warga'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAWWP-4wBILfYn-PIMTFuWyITOeWR_P-IKXg&s'
  },
  {
    id: 'mensos',
    name: 'Saifullah Yusuf (Gus Ipul)',
    position: 'Menteri Sosial',
    bio: 'Pelindung warga yang kurang mampu dan penyandang disabilitas.',
    tasks: ['Menyalurkan bantuan sosial (Bansos)', 'Membantu korban bencana alam', 'Menangani masalah panti asuhan dan lansia'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKHatnq3n2tt-CWas-C8I_tmsJmabdtI21iw&s'
  },
  {
    id: 'menpora',
    name: 'Dito Ariotedjo',
    position: 'Menteri Pemuda dan Olahraga',
    bio: 'Menteri yang paling dekat dengan anak muda dan dunia olahraga.',
    tasks: ['Mencetak atlet juara dunia', 'Mendukung komunitas anak muda kreatif', 'Membangun fasilitas olahraga di daerah'],
    image: 'https://awsimages.detik.net.id/community/media/visual/2023/04/03/menpora-dito_169.jpeg?w=1200'
  },
    {    id: 'menham',
    name: 'Natalius Pigai',
    position: 'Menteri Hak Asasi Manusia',
    bio: 'Pejuang hak sipil yang memastikan martabat manusia terlindungi.',
    tasks: ['Edukasi HAM', 'Penyelesaian kasus pelanggaran HAM', 'Promosi kesetaraan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmJ3lIsVma4yWNB_pUDop7i8ITd8M9vRzuXQ&s'
  },
  {
    id: 'menimigrasi',
    name: 'Agus Andrianto',
    position: 'Menteri Imigrasi dan Pemasyarakatan',
    bio: 'Menjaga pintu gerbang negara dan membina warga binaan.',
    tasks: ['Keamanan perbatasan', 'Reformasi Lapas', 'Pelayanan dokumen perjalanan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4HuQ2XNaGL-D9s1xGtoqbF01Hz2MtwZ5q-g&s'
  },
  {
    id: 'mendiktisaintek',
    name: 'Satryo Soemantri Brodjonegoro',
    position: 'Menteri Pendidikan Tinggi, Sains, dan Teknologi',
    bio: 'Memajukan kampus dan riset teknologi masa depan.',
    tasks: ['Beasiswa mahasiswa', 'Inovasi teknologi', 'Kualitas universitas'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZTfNYXkv3qjT-JytWOBJurt7-326hH_ppag&s'
  },
  {
    id: 'menbud',
    name: 'Fadli Zon',
    position: 'Menteri Kebudayaan',
    bio: 'Penjaga warisan luhur dan pemaju industri kreatif budaya.',
    tasks: ['Pelestarian candi & situs', 'Diplomasi budaya', 'Dukungan seniman'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZwK5RI5i1SmfdctOXtR-j_nsAZ4H4-bxDbA&s'
  },
  {
    id: 'mennaker',
    name: 'Yassierli',
    position: 'Menteri Ketenagakerjaan',
    bio: 'Menjamin hak pekerja dan menciptakan SDM unggul.',
    tasks: ['Pelatihan kerja', 'Urusan upah/UMR', 'Keselamatan kerja'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOrLKZeCiHMm7by-EKfpUXftg_J_VObkMx0A&s'
  },
  {
    id: 'menperin',
    name: 'Agus Gumiwang Kartasasmita',
    position: 'Menteri Perindustrian',
    bio: 'Memajukan pabrik dan produk buatan dalam negeri.',
    tasks: ['Hilirisasi industri', 'Dukungan industri kecil', 'Ekspor manufaktur'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkeN1uMAVWafVk1Rt4mw-iqsG9ZJr8ymhuAg&s'
  },
  {
    id: 'mendag',
    name: 'Budi Santoso',
    position: 'Menteri Perdagangan',
    bio: 'Mengatur arus barang di pasar domestik dan global.',
    tasks: ['Stabilisasi harga sembako', 'Perjanjian dagang luar negeri', 'Perlindungan konsumen'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSog0n_37E62KVNQ7R5N159SnJ7kx9KlVatdg&s'
  },
  {
    id: 'men-esdm',
    name: 'Bahlil Lahadalia',
    position: 'Menteri Energi dan Sumber Daya Mineral',
    bio: 'Mengelola kekayaan alam minyak, gas, dan tambang.',
    tasks: ['Swasembada energi', 'Listrik masuk desa', 'Transisi energi hijau'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNYuQIi3BojMpgfccLUwdPCPqx9h6h1NV2Zw&s'
  },
  {
    id: 'men-pu',
    name: 'Dody Hanggodo',
    position: 'Menteri Pekerjaan Umum',
    bio: 'Insinyur negara yang membangun fisik Indonesia.',
    tasks: ['Pembangunan bendungan', 'Irigasi sawah', 'Penyediaan air bersih'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7CFjKAVWHZZtO1WZx9hLLNkWKuBqsDUT03g&s'
  },
  {
    id: 'men-perumahan',
    name: 'Maruarar Sirait',
    position: 'Menteri Perumahan dan Kawasan Permukiman',
    bio: 'Memastikan rakyat punya rumah yang layak dan murah.',
    tasks: ['Program 3 juta rumah', 'Renovasi rumah kumuh', 'Sanitasi warga'],
    image: 'https://asset.kompas.com/crops/YMVBASoffVA35ajY63hIVO4Lj5Y=/137x0:1757x1080/750x500/data/photo/2024/10/21/6715e671d4f39.jpg'
  },
  {
    id: 'mendes',
    name: 'Yandri Susanto',
    position: 'Menteri Desa dan Pembangunan Daerah Tertinggal',
    bio: 'Membangun kekuatan ekonomi dari level desa.',
    tasks: ['Dana desa', 'BUMDes', 'Infrastruktur desa'],
    image: 'https://cloud.jpnn.com/photo/arsip/normal/2024/12/09/menteri-desa-dan-pembangunan-daerah-tertinggal-yandri-susant-7vuf.jpg'
  },
  {
    id: 'men-trans',
    name: 'Iftitah Sulaiman',
    position: 'Menteri Transmigrasi',
    bio: 'Pemerataan penduduk untuk kemajuan wilayah baru.',
    tasks: ['Pemindahan penduduk', 'Pembukaan lahan baru', 'Kesejahteraan transmigran'],
    image: 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/01/2024/10/15/Muhammad-Iftitah-Sulaiman-Suryanagara-Dery-Ridwansah-2JPG-2752443324.jpg'
  },
  {
    id: 'men-hub',
    name: 'Dudy Purwaghandi',
    position: 'Menteri Perhubungan',
    bio: 'Mengatur konektivitas darat, laut, dan udara.',
    tasks: ['Keamanan transportasi', 'Tiket pesawat murah', 'Pembangunan pelabuhan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCIf2n1ViWaj4AEDE8BLcf1nRu8R6cKaOx8Q&s'
  },
  {
    id: 'men-tan',
    name: 'Andi Amran Sulaiman',
    position: 'Menteri Pertanian',
    bio: 'Penanggung jawab utama kecukupan pangan nasional.',
    tasks: ['Cetak sawah', 'Distribusi pupuk', 'Mekanisasi tani'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QbftfR_yF9IOjLt_Vsh8Gyua4aZhI1UYVQ&s'
  },
  {
    id: 'men-lh',
    name: 'Hanif Faisol Nurofiq',
    position: 'Menteri Lingkungan Hidup',
    bio: 'Penjaga alam dan pengendali polusi.',
    tasks: ['Penanganan sampah', 'Hutan lindung', 'Kualitas udara'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgRTalmp72IahEAi7aGnXvCWdOu5i3rjuZnQ&s'
  },
  {
    id: 'men-kkp',
    name: 'Sakti Wahyu Trenggono',
    position: 'Menteri Kelautan dan Perikanan',
    bio: 'Penjaga kekayaan laut dan kesejahteraan nelayan.',
    tasks: ['Ekspor ikan', 'Budidaya lobster', 'Perlindungan terumbu karang'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi9dFg8nFL8RvJthPEVy8mx0h4_HkWeIBQSw&s'
  },
  {
    id: 'men-atrbpn',
    name: 'Nusron Wahid',
    position: 'Menteri Agraria dan Tata Ruang/Kepala BPN',
    bio: 'Mengurus sertifikat tanah dan tata ruang wilayah.',
    tasks: ['Sertifikat gratis (PTSL)', 'Mafia tanah', 'Pemanfaatan lahan'],
    image: 'https://www.atrbpn.go.id/assets/7bd32731-b29b-4af4-80a6-3956ca5aa2c6'
  },
  {
    id: 'men-ppn',
    name: 'Rachmat Pambudy',
    position: 'Menteri PPN/Kepala Bappenas',
    bio: 'Perancang strategi pembangunan jangka panjang negara.',
    tasks: ['Visi Indonesia Emas 2045', 'Rencana pembangunan tahunan', 'Evaluasi proyek strategis'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXb6R9Vhplaxu_4Kj3lyqoaXvYwOJEOi2A6Q&s'
  },
  {
    id: 'men-panrb',
    name: 'Rini Widyantini',
    position: 'Menteri PAN-RB',
    bio: 'Pengatur birokrasi dan nasib PNS/ASN.',
    tasks: ['Efisiensi PNS', 'Rekrutmen CASN', 'Digitalisasi pemerintahan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9EB6ktSHsrTCgC5Qpw7NoYRhEcmg8WWeS4g&s'
  },
  {
    id: 'men-bumn',
    name: 'Ditiadakan',
    position: 'Menteri BUMN',
    bio: 'Pengelola perusahaan milik negara agar untung dan bermanfaat.',
    tasks: ['Restrukturisasi Garuda/Pertamina', 'Dukungan UMKM', 'Ekonomi syariah'],
    image: 'https://stmikkomputama.ac.id/wp-content/uploads/2025/09/Dony_Oskaria_-_foto_Denas.jpg'
  },
  {
    id: 'men-kependudukan',
    name: 'Wihaji',
    position: 'Menteri Kependudukan dan Pembangunan Keluarga',
    bio: 'Fokus pada pembangunan kualitas manusia sejak dini.',
    tasks: ['Keluarga berencana', 'Data penduduk akurat', 'Kesejahteraan ibu anak'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo8mT3ZsJ7OSdjGDlQW2nuEtpSEIQkXQ1SzQ&s'
  },
  {
    id: 'men-investasi',
    name: 'Rosan Roeslani',
    position: 'Menteri Investasi dan Hilirisasi',
    bio: 'Pencari dana modal untuk membangun industri dalam negeri.',
    tasks: ['Izin usaha mudah', 'Investasi hijau', 'Pabrik baterai EV'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPu813CKHsW_KJFea2wFYbpXIMkT9rDbaHEw&s'
  },
  {
    id: 'men-koperasi',
    name: 'Budi Arie Setiadi',
    position: 'Menteri Koperasi',
    bio: 'Menghidupkan ekonomi rakyat melalui koperasi.',
    tasks: ['Modernisasi koperasi', 'Bantuan modal', 'Koperasi digital'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Budi_Arie%2C_Menkominfo.jpg'
  },
  {
    id: 'men-umkm',
    name: 'Maman Abdurrahman',
    position: 'Menteri UMKM',
    bio: 'Sahabat pedagang kecil dan pengusaha kreatif.',
    tasks: ['Sertifikasi halal UMKM', 'Akses kredit bank', 'Pemasaran produk lokal'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDs1PPi9qx2v5xWmKDz8acP0ChAVRLtMs_pg&s'
  },
  {
    id: 'men-par',
    name: 'Widhianti Putri',
    position: 'Menteri Pariwisata',
    bio: 'Mempromosikan keindahan alam Indonesia ke dunia.',
    tasks: ['Wisata 5 Bali Baru', 'Event internasional', 'Kualitas hotel & resto'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC0XCnD8fk9twEPwcfqT1iuVs4gBaSkwbcIg&s'
  },
  {
    id: 'men-ekraf',
    name: 'Teuku Riefky Harsya',
    position: 'Menteri Ekonomi Kreatif',
    bio: 'Mendukung industri film, musik, dan game anak bangsa.',
    tasks: ['Hak kekayaan intelektual', 'Dana kreatif', 'Ekspor karya seni'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhmWKYYnqG8BtPnVAYNhwSNeyRYOBXTEuYQ&s'
  },
  {
    id: 'men-pppa',
    name: 'Arifatul Choiri Fauzi',
    position: 'Menteri Pemberdayaan Perempuan dan Perlindungan Anak',
    bio: 'Pelindung hak-hak perempuan dan anak-anak.',
    tasks: ['Stop kekerasan anak', 'Kesetaraan gender', 'Hak ibu pekerja'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXFEQoLZPRS3PvCY31dS5Y52SU8raoiAsHQg&s'
  },
  {
    id: 'men-pora',
    name: 'Erick Thohir',
    position: 'Menteri Pemuda dan Olahraga',
    bio: 'Mengurus prestasi atlet dan kreativitas anak muda.',
    tasks: ['Persiapan Olimpiade', 'Kepemudaan', 'Infrastruktur GOR'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwaxUN-LPBjBKpF_ryu-yBIbzUDzPxrmebww&s'
  },
  {
    id: 'men-kehutanan',
    name: 'Raja Juli Antoni',
    position: 'Menteri Kehutanan',
    bio: 'Menjaga paru-paru dunia yang ada di Indonesia.',
    tasks: ['Reboisasi', 'Hutan sosial', 'Pencegahan kebakaran hutan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDId60kkKC758Kq_SDUDM792bPQWnHyF6IXA&s'
  }
];
export const STRATEGIC_PROGRAMS: StrategicProgram[] = [

  {
    id: 'makan-gratis',
    title: 'Makan Siang & Susu Gratis',
    description: 'Pemberian makanan bergizi untuk anak sekolah agar tumbuh sehat dan cerdas.',
    progress: 45,
    status: 'Tahap Uji Coba Nasional',
    icon: 'Utensils',
    details: 'Program ini bertujuan untuk meningkatkan kualitas gizi anak-anak sekolah di seluruh Indonesia, mengurangi angka stunting, dan meningkatkan fokus belajar siswa. Implementasi melibatkan UMKM lokal untuk penyediaan makanan.',
    images: ['https://picsum.photos/seed/food1/800/600', 'https://picsum.photos/seed/food2/800/600'],
    impact: 'Peningkatan kehadiran siswa di sekolah dan perbaikan gizi anak-anak dari keluarga kurang mampu.'
  },

  {
    id: 'swasembada',
    title: 'Swasembada Pangan & Energi',
    description: 'Target agar Indonesia bisa menghasilkan makanan dan energi sendiri tanpa impor.',
    progress: 30,
    status: 'Perluasan Lahan Pertanian',
    icon: 'Wheat',
    details: 'Melalui intensifikasi lahan pertanian dan pengembangan energi terbarukan seperti biofuel dari kelapa sawit (B50). Fokus pada kemandirian nasional agar tidak bergantung pada pasar global.',
    images: ['https://picsum.photos/seed/farm1/800/600', 'https://picsum.photos/seed/energy1/800/600'],
    impact: 'Ketahanan nasional yang lebih kuat terhadap gejolak harga pangan dan energi dunia.'
  },

  {
    id: 'rumah',
    title: 'Pembangunan 3 Juta Rumah',
    description: 'Membangun rumah layak huni bagi masyarakat yang belum memiliki tempat tinggal.',
    progress: 20,
    status: 'Pendataan Lokasi Strategis',
    icon: 'Home',
    details: 'Program pembangunan rumah murah dan layak huni di perkotaan dan pedesaan. Menggunakan lahan milik negara dan BUMN untuk menekan biaya pembangunan.',
    images: ['https://picsum.photos/seed/house1/800/600'],
    impact: 'Mengurangi backlog perumahan dan meningkatkan kualitas hidup keluarga Indonesia.'
  },

  {
    id: 'digital-edu',
    title: 'Digitalisasi Pendidikan',
    description: 'Renovasi sekolah dan penyediaan alat digital untuk belajar di seluruh pelosok.',
    progress: 55,
    status: 'Distribusi Laptop & Internet',
    icon: 'Laptop',
    details: 'Penyediaan akses internet cepat ke sekolah-sekolah di daerah 3T (Terdepan, Terluar, Tertinggal) dan distribusi perangkat belajar digital untuk siswa dan guru.',
    images: ['https://picsum.photos/seed/edu1/800/600'],
    impact: 'Pemerataan kualitas pendidikan dan peningkatan literasi digital generasi muda.'
  },

  {
    id: 'hilirisasi',
    title: 'Hilirisasi Industri',
    description: 'Mengolah kekayaan alam sendiri agar memiliki nilai jual lebih tinggi.',
    progress: 65,
    status: 'Pembangunan Pabrik Pengolahan',
    icon: 'Factory',
    details: 'Melarang ekspor bahan mentah (seperti nikel, tembaga, bauksit) dan mewajibkan pengolahan di dalam negeri untuk menciptakan lapangan kerja dan nilai tambah ekonomi.',
    images: ['https://picsum.photos/seed/factory1/800/600'],
    impact: 'Peningkatan pendapatan negara secara signifikan dan penciptaan jutaan lapangan kerja baru.'
  },

  {
    id: 'ikn',
    title: 'Pembangunan IKN',
    description: 'Pembangunan Ibu Kota Nusantara sebagai simbol transformasi Indonesia.',
    progress: 75,
    status: 'Pembangunan Infrastruktur Inti',
    icon: 'Building',
    details: 'IKN dirancang sebagai kota hutan yang cerdas dan berkelanjutan. Menjadi pusat pemerintahan baru untuk memeratakan pembangunan di luar Pulau Jawa.',
    images: ['https://picsum.photos/seed/ikn1/800/600', 'https://picsum.photos/seed/ikn2/800/600'],
    impact: 'Pemerataan ekonomi nasional dan simbol kemajuan teknologi Indonesia.'
  }

];

export const PROVINCES_DATA: ProvinceData[] = [
  // --- SUMATERA ---
  { 
    id: '1', name: 'Aceh', capital: 'Banda Aceh', governor: 'Muzakir Manaf', party: 'Partai Aceh', population: '5.60 Juta', dprSeats: 13,
    details: "Provinsi otonomi khusus berbasis syariat Islam di ujung Utara Sumatera.",
    issues: ["Implementasi Syariat Islam", "Dana Otsus", "Infrastruktur Barat-Selatan"],
    trivia: "Satu-satunya provinsi dengan partai politik lokal.",
    dominantParty: "Partai Aceh", dominantPartyPercent: 45, isTrending: true
  },
  { 
    id: '2', name: 'Sumatera Utara', capital: 'Medan', governor: 'Bobby Nasution', party: 'Gerindra', population: '15.65 Juta', dprSeats: 30,
    details: "Pusat ekonomi Sumatera dengan keberagaman etnis yang sangat tinggi.",
    issues: ["Kriminalitas jalanan", "Perbaikan jalan", "Wisata Danau Toba"],
    trivia: "Jumlah pemilih terbesar di luar Pulau Jawa.",
    dominantParty: "Golkar", dominantPartyPercent: 22
  },
  { 
    id: '3', name: 'Sumatera Barat', capital: 'Padang', governor: 'Mahyeldi Ansharullah', party: 'PKS', population: '5.86 Juta', dprSeats: 14,
    details: "Pusat budaya Minangkabau dengan tradisi intelektual politik yang kuat.",
    issues: ["Mitigasi bencana", "Ekonomi UMKM", "Pelestarian adat"],
    trivia: "Basis massa PKS terkuat di Sumatera.",
    dominantParty: "PKS", dominantPartyPercent: 26
  },
  { 
    id: '4', name: 'Riau', capital: 'Pekanbaru', governor: 'Abdul Wahid', party: 'PKB', population: '7.12 Juta', dprSeats: 13,
    details: "Lumbung energi nasional melalui minyak bumi dan perkebunan sawit.",
    issues: ["Karhutla", "Konflik agraria", "Hilirisasi industri"],
    trivia: "Provinsi dengan PDRB per kapita tertinggi di Sumatera.",
    dominantParty: "Golkar", dominantPartyPercent: 19
  },
  { 
    id: '5', name: 'Jambi', capital: 'Jambi', governor: 'Al Haris', party: 'PAN', population: '3.79 Juta', dprSeats: 8,
    details: "Wilayah agraris dengan potensi perkebunan karet dan sawit masif.",
    issues: ["Logistik Batubara", "Restorasi lahan gambut", "Pendidikan"],
    trivia: "Rumah bagi Candi Muaro Jambi.",
    dominantParty: "PAN", dominantPartyPercent: 18
  },
  { 
    id: '6', name: 'Sumatera Selatan', capital: 'Palembang', governor: 'Herman Deru', party: 'NasDem', population: '8.89 Juta', dprSeats: 17,
    details: "Pusat pangan dan energi, bekas pusat Kerajaan Sriwijaya.",
    issues: ["Optimalisasi LRT", "Ketahanan pangan", "Tol Trans-Sumatera"],
    trivia: "Palembang adalah kota tertua di Indonesia.",
    dominantParty: "Gerindra", dominantPartyPercent: 21
  },
  { 
    id: '7', name: 'Bengkulu', capital: 'Bengkulu', governor: 'Rohidin Mersyah', party: 'Golkar', population: '2.11 Juta', dprSeats: 4,
    details: "Provinsi pesisir barat dengan sejarah kolonial Inggris yang kuat.",
    issues: ["Konektivitas", "Pengembangan pelabuhan", "Ekonomi pesisir"],
    trivia: "Tempat lahirnya Ibu Fatmawati.",
    dominantParty: "Golkar", dominantPartyPercent: 24
  },
  { 
    id: '8', name: 'Lampung', capital: 'Bandar Lampung', governor: 'Rahmat Mirzani Djausal', party: 'Gerindra', population: '9.46 Juta', dprSeats: 20,
    details: "Gerbang logistik Sumatera-Jawa dan pusat transmigrasi.",
    issues: ["Keamanan (Begal)", "Jalan rusak", "Swasembada Jagung"],
    trivia: "Titik nol Jalan Tol Trans Sumatera.",
    dominantParty: "Gerindra", dominantPartyPercent: 23
  },
  { 
    id: '9', name: 'Kepulauan Bangka Belitung', capital: 'Pangkalpinang', governor: 'Erzaldi Rosman', party: 'Gerindra', population: '1.53 Juta', dprSeats: 3,
    details: "Provinsi kepulauan penghasil timah terbesar di dunia.",
    issues: ["Reklamasi tambang", "Pariwisata bahari", "Ekonomi non-timah"],
    trivia: "Inspirasi lokasi novel Laskar Pelangi.",
    dominantParty: "Gerindra", dominantPartyPercent: 20
  },
  { 
    id: '10', name: 'Kepulauan Riau', capital: 'Tanjungpinang', governor: 'Ansar Ahmad', party: 'Golkar', population: '2.31 Juta', dprSeats: 4,
    details: "Pusat industri manufaktur perbatasan Singapura.",
    issues: ["Kedaulatan maritim", "Transportasi antar-pulau", "Batam-Bintan Bridge"],
    trivia: "Memiliki lebih dari 2.400 pulau.",
    dominantParty: "Golkar", dominantPartyPercent: 21
  },

  // --- JAWA ---
  { 
    id: '11', name: 'DKI Jakarta', capital: 'Jakarta', governor: 'Ridwan Kamil', party: 'Golkar', population: '10.74 Juta', dprSeats: 21,
    details: "Pusat ekonomi nasional dan barometer politik.",
    issues: ["Polusi udara", "Banjir", "Transisi pasca-IKN"],
    trivia: "Status Daerah Khusus Jakarta (DKJ).",
    dominantParty: "PKS", dominantPartyPercent: 28, isTrending: true
  },
  { 
    id: '12', name: 'Jawa Barat', capital: 'Bandung', governor: 'Dedi Mulyadi', party: 'Gerindra', population: '50.48 Juta', dprSeats: 91,
    details: "Provinsi populasi terbesar, battleground utama Pemilu.",
    issues: ["Pengangguran", "Sampah", "Kesenjangan"],
    trivia: "Pemilih terbanyak di Indonesia.",
    dominantParty: "Gerindra", dominantPartyPercent: 32, isTrending: true
  },
  { 
    id: '13', name: 'Banten', capital: 'Serang', governor: 'Airin Rachmi Diany', party: 'Golkar', population: '12.59 Juta', dprSeats: 22,
    details: "Pusat industri manufaktur dan gerbang udara.",
    issues: ["Pengangguran industri", "Korupsi", "Infrastruktur Banten Selatan"],
    trivia: "Gerbang utama udara Indonesia (Soekarno-Hatta).",
    dominantParty: "Gerindra", dominantPartyPercent: 22
  },
  { 
    id: '14', name: 'Jawa Tengah', capital: 'Semarang', governor: 'Ahmad Luthfi', party: 'Gerindra', population: '38.07 Juta', dprSeats: 77,
    details: "Basis massa tradisional dan pusat kebudayaan Jawa.",
    issues: ["Banjir Rob", "Kemiskinan Eks-Karesidenan Solo", "Industrialisasi"],
    trivia: "Pusat gravitasi politik Jawa.",
    dominantParty: "PDI-P", dominantPartyPercent: 34
  },
  { 
    id: '15', name: 'DI Yogyakarta', capital: 'Yogyakarta', governor: 'Sri Sultan Hamengkubuwono X', party: 'Independen', population: '3.80 Juta', dprSeats: 8,
    details: "Daerah Istimewa dengan sistem monarki konstitusional.",
    issues: ["Sampah", "Harga tanah", "Klithih"],
    trivia: "Gubernur dijabat oleh Sultan yang bertakhta.",
    dominantParty: "PDI-P", dominantPartyPercent: 24
  },
  { 
    id: '16', name: 'Jawa Timur', capital: 'Surabaya', governor: 'Khofifah Indar Parawansa', party: 'Independen/NU', population: '41.81 Juta', dprSeats: 87,
    details: "Pusat industri Timur Indonesia dan basis massa NU.",
    issues: ["Disparitas Madura", "Infrastruktur desa", "Gunung Berapi"],
    trivia: "Lumbung suara PKB dan PDI-P.",
    dominantParty: "PKB", dominantPartyPercent: 25
  },

  // --- BALI & NUSA TENGGARA ---
  { 
    id: '17', name: 'Bali', capital: 'Denpasar', governor: 'Wayan Koster', party: 'PDI-P', population: '4.41 Juta', dprSeats: 9,
    details: "Pusat pariwisata internasional.",
    issues: ["Over-tourism", "Kelangkaan air", "Adat vs Modernisasi"],
    trivia: "Basis terkuat PDI-P di Indonesia.",
    dominantParty: "PDI-P", dominantPartyPercent: 52
  },
  { 
    id: '18', name: 'Nusa Tenggara Barat', capital: 'Mataram', governor: 'Lalu Muhamad Iqbal', party: 'Independen', population: '5.51 Juta', dprSeats: 11,
    details: "Pusat wisata olahraga dan pertanian.",
    issues: ["Sirkuit Mandalika", "PMI Ilegal", "Kekeringan"],
    trivia: "Hub wisata halal Indonesia.",
    dominantParty: "Gerindra", dominantPartyPercent: 20
  },
  { 
    id: '19', name: 'Nusa Tenggara Timur', capital: 'Kupang', governor: 'Melkiades Laka Lena', party: 'Golkar', population: '5.56 Juta', dprSeats: 13,
    details: "Wilayah kepulauan dengan potensi wisata alam unik.",
    issues: ["Stunting", "Krisis air", "Konektivitas"],
    trivia: "Gerbang batas darat Timor Leste.",
    dominantParty: "PDI-P", dominantPartyPercent: 21
  },

  // --- KALIMANTAN ---
  { 
    id: '20', name: 'Kalimantan Barat', capital: 'Pontianak', governor: 'Sutarmidji', party: 'NasDem', population: '5.54 Juta', dprSeats: 12,
    details: "Berbatasan darat dengan Malaysia, pusat bauksit.",
    issues: ["Perbatasan", "Infrastruktur", "Karhutla"],
    trivia: "Dilalui garis khatulistiwa.",
    dominantParty: "PDI-P", dominantPartyPercent: 23
  },
  { 
    id: '21', name: 'Kalimantan Tengah', capital: 'Palangkaraya', governor: 'Sugianto Sabran', party: 'PDI-P', population: '2.77 Juta', dprSeats: 6,
    details: "Konservasi orangutan dan Food Estate.",
    issues: ["Food Estate", "Lahan Gambut", "Banjir"],
    trivia: "Ibu kota masa depan rancangan Bung Karno.",
    dominantParty: "PDI-P", dominantPartyPercent: 25
  },
  { 
    id: '22', name: 'Kalimantan Selatan', capital: 'Banjarbaru', governor: 'Muhidin', party: 'PAN', population: '4.22 Juta', dprSeats: 11,
    details: "Pusat batubara dan budaya religius.",
    issues: ["Lubang tambang", "Ibu kota Banjarbaru", "Konektivitas"],
    trivia: "Pusat perdagangan batu permata (Martapura).",
    dominantParty: "Golkar", dominantPartyPercent: 22
  },
  { 
    id: '23', name: 'Kalimantan Timur', capital: 'Samarinda', governor: 'Isran Noor', party: 'Independen', population: '3.94 Juta', dprSeats: 8,
    details: "Lokasi IKN, pusat migas dan batubara.",
    issues: ["IKN", "Hilirisasi", "Lingkungan"],
    trivia: "Provinsi terkaya di Kalimantan.",
    dominantParty: "Golkar", dominantPartyPercent: 23, isTrending: true
  },
  { 
    id: '24', name: 'Kalimantan Utara', capital: 'Tanjung Selor', governor: 'Zainal Arifin Paliwang', party: 'Gerindra', population: '0.74 Juta', dprSeats: 3,
    details: "Provinsi termuda di Kalimantan, energi hijau.",
    issues: ["Kawasan Industri Hijau", "PLTA Kayan", "Perbatasan"],
    trivia: "Provinsi dengan populasi paling sedikit.",
    dominantParty: "Gerindra", dominantPartyPercent: 24
  },

  // --- SULAWESI ---
  { 
    id: '25', name: 'Sulawesi Utara', capital: 'Manado', governor: 'Olly Dondokambey', party: 'PDI-P', population: '2.67 Juta', dprSeats: 6,
    details: "Pusat ekonomi Pasifik dan wisata bahari.",
    issues: ["Gerbang Pasifik", "Toleransi", "Infrastruktur"],
    trivia: "Sering disebut 'The Land of Smiling People'.",
    dominantParty: "PDI-P", dominantPartyPercent: 38
  },
  { 
    id: '26', name: 'Sulawesi Tengah', capital: 'Palu', governor: 'Rusdy Mastura', party: 'Gerindra', population: '3.08 Juta', dprSeats: 7,
    details: "Penghasil nikel dan wilayah pemulihan bencana.",
    issues: ["Nikel", "Likuifaksi", "Konflik agraria"],
    trivia: "Pusat industri nikel Morowali.",
    dominantParty: "Golkar", dominantPartyPercent: 20
  },
  { 
    id: '27', name: 'Sulawesi Selatan', capital: 'Makassar', governor: 'Andi Sudirman Sulaiman', party: 'Independen', population: '9.22 Juta', dprSeats: 24,
    details: "Hub transportasi udara dan laut Timur Indonesia.",
    issues: ["KA Trans-Sulawesi", "Ekonomi Makassar", "Pertanian"],
    trivia: "Gerbang utama Indonesia Timur.",
    dominantParty: "NasDem", dominantPartyPercent: 19
  },
  { 
    id: '28', name: 'Sulawesi Tenggara', capital: 'Kendari', governor: 'Andap Budhi Revianto', party: 'Pj (Pemerintah)', population: '2.70 Juta', dprSeats: 6,
    details: "Lumbung aspal dan nikel nasional.",
    issues: ["Smelter", "Wakatobi", "Aspal Buton"],
    trivia: "Memiliki aspal alam terbaik di dunia.",
    dominantParty: "NasDem", dominantPartyPercent: 18
  },
  { 
    id: '29', name: 'Gorontalo', capital: 'Gorontalo', governor: 'Rudy Salahuddin', party: 'Pj (Pemerintah)', population: '1.20 Juta', dprSeats: 3,
    details: "Provinsi agraris Serambi Madinah.",
    issues: ["Jagung", "Kemiskinan", "Pendidikan"],
    trivia: "Provinsi paling aman di Sulawesi.",
    dominantParty: "Golkar", dominantPartyPercent: 25
  },
  { 
    id: '30', name: 'Sulawesi Barat', capital: 'Mamuju', governor: 'Bahtiar Baharuddin', party: 'Pj (Pemerintah)', population: '1.45 Juta', dprSeats: 4,
    details: "Penghasil kakao terbesar.",
    issues: ["Kakao", "Gempa", "Infrastruktur"],
    trivia: "Memiliki tradisi bahari Sandeq.",
    dominantParty: "Golkar", dominantPartyPercent: 21
  },

  // --- MALUKU & PAPUA ---
  { 
    id: '31', name: 'Maluku', capital: 'Ambon', governor: 'Murad Ismail', party: 'PAN', population: '1.90 Juta', dprSeats: 4,
    details: "Provinsi kepulauan kekayaan rempah.",
    issues: ["Blok Masela", "LIN", "Konektivitas"],
    trivia: "Negeri Para Raja.",
    dominantParty: "PDI-P", dominantPartyPercent: 22
  },
  { 
    id: '32', name: 'Maluku Utara', capital: 'Sofifi', governor: 'Al Yasin Ali', party: 'PDI-P', population: '1.31 Juta', dprSeats: 3,
    details: "Investasi nikel dunia dan kesultanan.",
    issues: ["Nikel Weda Bay", "Ibu Kota Sofifi", "Pertambangan"],
    trivia: "Pertumbuhan ekonomi fenomenal.",
    dominantParty: "PDI-P", dominantPartyPercent: 20
  },
  { 
    id: '33', name: 'Papua', capital: 'Jayapura', governor: 'Ridwan Rumasukun', party: 'Pj (Pemerintah)', population: '1.03 Juta', dprSeats: 3,
    details: "Pusat pemerintahan tanah Papua.",
    issues: ["Otsus", "Keamanan", "Pendidikan"],
    trivia: "Ibu kota paling timur (Jayapura).",
    dominantParty: "PDI-P", dominantPartyPercent: 18
  },
  { 
    id: '34', name: 'Papua Barat', capital: 'Manokwari', governor: 'Ali Baham Temongmere', party: 'Pj (Pemerintah)', population: '0.56 Juta', dprSeats: 3,
    details: "Konservasi alam Raja Ampat.",
    issues: ["Konservasi", "Pariwisata", "Otsus"],
    trivia: "Pusat penelitian burung Cendrawasih.",
    dominantParty: "Golkar", dominantPartyPercent: 22
  },
  { 
    id: '35', name: 'Papua Tengah', capital: 'Nabire', governor: 'Ribka Haluk', party: 'Pj (Pemerintah)', population: '1.43 Juta', dprSeats: 3,
    details: "Lokasi tambang emas Grasberg.",
    issues: ["Tambang", "Pembangunan DOB", "Keamanan"],
    trivia: "Gunung tertinggi di Indonesia.",
    dominantParty: "PDI-P", dominantPartyPercent: 19
  },
  { 
    id: '36', name: 'Papua Selatan', capital: 'Merauke', governor: 'Apolo Safanpo', party: 'Pj (Pemerintah)', population: '0.52 Juta', dprSeats: 3,
    details: "Lumbung pangan Timur.",
    issues: ["Food Estate Merauke", "Perbatasan", "Sagu"],
    trivia: "Titik nol Kilometer Timur Indonesia.",
    dominantParty: "PDI-P", dominantPartyPercent: 24
  },
  { 
    id: '37', name: 'Papua Pegunungan', capital: 'Wamena', governor: 'Velix Wanggai', party: 'Pj (Pemerintah)', population: '1.43 Juta', dprSeats: 3,
    details: "Satu-satunya provinsi Landlocked (tanpa laut).",
    issues: ["Kesejahteraan", "Akses Logistik", "Budaya"],
    trivia: "Festival Budaya Lembah Baliem.",
    dominantParty: "PDI-P", dominantPartyPercent: 26
  },
  { 
    id: '38', name: 'Papua Barat Daya', capital: 'Sorong', governor: 'Mohammad Musa\'ad', party: 'Pj (Pemerintah)', population: '0.61 Juta', dprSeats: 3,
    details: "Gerbang utama Papua industri migas.",
    issues: ["Kawasan Ekonomi Khusus", "Pariwisata", "Migas"],
    trivia: "Provinsi paling bungsu (ke-38).",
    dominantParty: "Golkar", dominantPartyPercent: 21
  }
];

export const PARTIES_DATA: PoliticalParty[] = [
   {
    id: 'pdi-p',
    name: 'Partai Demokrasi Indonesia Perjuangan',
    abbreviation: 'PDI-P',
    chairman: 'Megawati Soekarnoputri',
    ideology: 'Marhaenisme, Pancasila',
    seats: 110,
    color: '#ef4444',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Q0BlfadJh1zbp_GT0G7F0RRhXPPX2tVHWA&s',
    description: "Partai pemenang Pemilu 2014 dan 2019. Berfokus pada wong cilik dan kedaulatan nasional berbasis ajaran Bung Karno.",
    functionInDemocracy: "Sebagai wadah perjuangan politik rakyat yang menekankan pada nilai-nilai kebangsaan dan kerakyatan.",
    legislativeRole: "Memperjuangkan kebijakan yang pro-rakyat kecil dan menjaga kedaulatan NKRI di parlemen."
  },
  {
    id: 'golkar',
    name: 'Partai Golongan Karya',
    abbreviation: 'Golkar',
    chairman: 'Bahlil Lahadalia',
    ideology: 'Konservatisme Liberal',
    seats: 102,
    color: '#facc15',
    logo: 'https://cdn.law-justice.co/posts/1/2025/2025-02-08/967e3bd5c35eae48306f4143bd602356_1.png',
    description: "Partai dengan sejarah panjang sejak era Orde Baru. Menekankan pada pembangunan ekonomi, stabilitas, dan teknokrasi.",
    functionInDemocracy: "Menjadi pilar stabilitas politik dan pembangunan ekonomi melalui pendekatan teknokratis.",
    legislativeRole: "Fokus pada regulasi ekonomi, investasi, dan pembangunan infrastruktur nasional."
  },
  {
    id: 'gerindra',
    name: 'Partai Gerakan Indonesia Raya',
    abbreviation: 'Gerindra',
    chairman: 'Prabowo Subianto',
    ideology: 'Nasionalisme Populis',
    seats: 86,
    color: '#d97706',
    logo: 'https://www.fraksigerindra.id/wp-content/uploads/2023/01/presiden22.jpg',
    description: "Partai yang didirikan oleh Presiden Prabowo Subianto. Mengusung visi kemandirian bangsa, pertahanan kuat, dan ekonomi kerakyatan.",
    functionInDemocracy: "Menggalang kekuatan nasional untuk kemandirian bangsa di segala bidang.",
    legislativeRole: "Memperkuat sistem pertahanan negara dan mendorong kebijakan ekonomi yang mandiri."
  },
  {
    id: 'nasdem',
    name: 'Partai NasDem',
    abbreviation: 'NasDem',
    chairman: 'Surya Paloh',
    ideology: 'Restorasi Indonesia',
    seats: 69,
    color: '#2563eb',
    logo: 'https://ppid.partainasdem.id/wp-content/uploads/2025/09/suryapaloh.jpg',
    description: "Mengusung gerakan perubahan untuk restorasi Indonesia. Menekankan pada politik tanpa mahar dan modernisasi institusi.",
    functionInDemocracy: "Mendorong perubahan fundamental dalam sistem politik Indonesia menuju arah yang lebih modern.",
    legislativeRole: "Aktif dalam reformasi birokrasi dan penegakan hukum yang transparan."
  },
  {
    id: 'pkb',
    name: 'Partai Kebangkitan Bangsa',
    abbreviation: 'PKB',
    chairman: 'Muhaimin Iskandar',
    ideology: 'Pluralisme, Moderat',
    seats: 68,
    color: '#059669', 
    logo: 'https://www.fraksipkb.com/wp-content/uploads/2025/06/Cak-Imin-Netral-PKB.jpg',
    description: "Partai yang lahir dari rahim Nahdlatul Ulama (NU). Memperjuangkan nilai-nilai Islam moderat dan pluralisme di Indonesia.",
    functionInDemocracy: "Menjembatani nilai-nilai religiusitas dengan semangat kebangsaan yang inklusif.",
    legislativeRole: "Fokus pada pendidikan pesantren, kesejahteraan desa, dan hak-hak kelompok minoritas."
  },
  {
    id: 'pks',
    name: 'Partai Keadilan Sejahtera',
    abbreviation: 'PKS',
    chairman: 'Ahmad Syaikhu',
    ideology: 'Islam Tradisionalis',
    seats: 53,
    color: '#f97316',
    logo: 'https://pks.id/contentAsset/resize-image/92dfd535-025f-4fed-89f9-105681d8ab13/image/?byInode=true&h=768',
    description: "Partai kader berbasis massa Islam perkotaan. Menekankan pada integritas, pelayanan masyarakat, dan nilai-nilai religius.",
    functionInDemocracy: "Menjadi kekuatan oposisi atau penyeimbang yang kritis berbasis nilai-nilai moral agama.",
    legislativeRole: "Konsisten dalam pengawasan anggaran dan kebijakan sosial yang berbasis keluarga."
  },
  {
    id: 'demokrat',
    name: 'Partai Demokrat',
    abbreviation: 'Demokrat',
    chairman: 'Agus Harimurti Yudhoyono',
    ideology: 'Nasionalisme Religius',
    seats: 44,
    color: '#1d4ed8',
    logo: 'https://www.demokrat.or.id/wp-content/uploads/2023/08/20230812_063711.jpg',
    description: "Partai yang didirikan oleh Presiden SBY. Mengusung nilai nasionalis-religius dan fokus pada kesejahteraan rakyat serta demokrasi.",
    functionInDemocracy: "Menjaga keseimbangan antara pertumbuhan ekonomi dan keadilan sosial bagi seluruh rakyat.",
    legislativeRole: "Mendorong kebijakan pro-pertumbuhan ekonomi yang inklusif dan perlindungan hak sipil."
  }
];

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'n1',
    title: 'Prabowo Subianto Tekankan Pentingnya Hilirisasi untuk Kemandirian Ekonomi',
    summary: 'Presiden Prabowo Subianto dalam pidatonya menegaskan bahwa hilirisasi industri adalah kunci utama bagi Indonesia untuk keluar dari jebakan pendapatan menengah.',
    date: '01 Mar 2026',
    category: 'Nasional',
    imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=600&h=400&fit=crop',
    url: 'https://nasional.kompas.com/'
  },
  {
    id: 'n2',
    title: 'Gibran Rakabuming Tinjau Proyek Infrastruktur Digital di Wilayah Timur',
    summary: 'Wakil Presiden Gibran Rakabuming Raka memastikan pemerataan akses internet cepat di Papua dan Maluku untuk mendukung ekonomi kreatif digital.',
    date: '28 Feb 2026',
    category: 'Teknologi',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&h=400&fit=crop',
    url: 'https://www.metrotvnews.com/'
  },
  {
    id: 'n3',
    title: 'DPR RI Sahkan Undang-Undang Perlindungan Data Pribadi Versi Terbaru',
    summary: 'Regulasi baru ini memberikan sanksi lebih berat bagi perusahaan yang gagal menjaga keamanan data pengguna di era AI.',
    date: '27 Feb 2026',
    category: 'Legislatif',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=600&h=400&fit=crop',
    url: 'https://nasional.tempo.co/'
  },
  {
    id: 'n4',
    title: 'Program Makan Bergizi Gratis Mulai Diimplementasikan di 100 Kabupaten',
    summary: 'Pemerintah mulai menyalurkan paket makanan bergizi bagi siswa sekolah dasar sebagai bagian dari investasi SDM jangka panjang.',
    date: '26 Feb 2026',
    category: 'Sosial',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&h=400&fit=crop',
    url: 'https://www.cnnindonesia.com/'
  },
  {
    id: 'n5',
    title: 'Pemerintah Targetkan Swasembada Pangan Tercapai pada Tahun 2028',
    summary: 'Menteri Pertanian Andi Amran Sulaiman optimis perluasan lahan sawah baru akan mencukupi kebutuhan beras nasional tanpa impor.',
    date: '25 Feb 2026',
    category: 'Ekonomi',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&h=400&fit=crop',
    url: 'https://www.metrotvnews.com/'
  },
  {
    id: 'n6',
    title: 'Kementerian Luar Negeri Perkuat Diplomasi Ekonomi di Kawasan Afrika',
    summary: 'Indonesia menjajaki kerjasama strategis di sektor energi dan infrastruktur dengan beberapa negara di benua Afrika.',
    date: '24 Feb 2026',
    category: 'Internasional',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&h=400&fit=crop',
    url: 'https://www.metrotvnews.com/'
  },
  {
    id: 'n7',
    title: 'IKN Nusantara Siap Menjadi Pusat Pemerintahan Baru pada Agustus 2026',
    summary: 'Progres pembangunan infrastruktur inti di IKN telah mencapai 85%, siap untuk upacara kemerdekaan mendatang.',
    date: '23 Feb 2026',
    category: 'Infrastruktur',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-f03d98c32a73?q=80&w=600&h=400&fit=crop',
    url: 'https://nasional.tempo.co/'
  },
  {
    id: 'n8',
    title: 'Reformasi Birokrasi: Pemerintah Terapkan Sistem Kerja Hybrid untuk ASN',
    summary: 'Kebijakan baru ini bertujuan meningkatkan efisiensi dan keseimbangan kerja bagi aparatur sipil negara di wilayah perkotaan.',
    date: '22 Feb 2026',
    category: 'Pemerintahan',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&h=400&fit=crop',
    url: 'https://www.metrotvnews.com/'
  },
  {
    id: 'n9',
    title: 'Pilkada Serentak 2026: KPU Pastikan Kesiapan Logistik di Daerah Terpencil',
    summary: 'KPU mulai mendistribusikan kotak suara dan surat suara ke wilayah kepulauan untuk menjamin hak pilih warga.',
    date: '21 Feb 2026',
    category: 'Politik',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-f03d98c32a73?q=80&w=600&h=400&fit=crop',
    url: 'https://nasional.kompas.com/'
  },
  {
    id: 'n10',
    title: 'Inovasi Energi Hijau: Pembangkit Listrik Tenaga Surya Terapung Terbesar Diresmikan',
    summary: 'Indonesia memperkuat komitmen transisi energi dengan meresmikan PLTS terapung yang mampu melistriki ribuan rumah.',
    date: '20 Feb 2026',
    category: 'Lingkungan',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&h=400&fit=crop',
    url: 'https://www.metrotvnews.com/'
  }
];

export const QUIZZES_DATA: Quiz[] = [
  {
    id: 'politik',
    topic: 'Apa itu Politik?',
    questions: [
      {
        question: "Jika sebuah kebijakan publik merugikan mayoritas warga namun menguntungkan segelintir elit, prinsip dasar politik manakah yang paling krusial untuk dievaluasi oleh publik?",
        options: ["Efisiensi Birokrasi", "Bonum Commune (Kesejahteraan Umum)", "Stabilitas Keamanan", "Pertumbuhan Ekonomi"],
        correctAnswer: 1,
        explanation: "Politik sejati bertujuan untuk 'Bonum Commune' atau kesejahteraan umum, di mana keputusan diambil untuk manfaat bersama, bukan segelintir orang."
      },
      {
        question: "Dalam konteks 'Politik adalah Seni Kemungkinan', bagaimana seorang legislator muda seharusnya menyikapi perbedaan pendapat yang tajam di parlemen?",
        options: ["Memaksakan kehendak dengan segala cara", "Mencari kompromi melalui diplomasi dan negosiasi berbasis data", "Mengundurkan diri karena frustasi", "Mengikuti suara terbanyak tanpa argumen"],
        correctAnswer: 1,
        explanation: "Legislasi adalah proses negosiasi. Kemampuan mencari jalan tengah (kompromi) yang tetap berpihak pada rakyat adalah inti dari praktik politik yang dewasa."
      },
      {
        question: "Mengapa literasi politik dianggap sebagai pertahanan terbaik warga negara terhadap populisme kosong?",
        options: ["Membuat warga jadi lebih pintar bicara", "Warga mampu menganalisis janji kampanye secara kritis dan berbasis rekam jejak", "Agar warga bisa mendapatkan jabatan", "Meningkatkan jumlah pemilih saja"],
        correctAnswer: 1,
        explanation: "Literasi politik memberikan alat analisis kepada warga agar tidak mudah terbuai janji manis yang tidak realistis (populisme) dan bisa melihat bukti nyata kinerja."
      },
      {
        question: "Manakah peran pemuda yang paling transformatif dalam ekosistem politik digital saat ini?",
        options: ["Menjadi buzzer partisan", "Melakukan pengawasan publik yang objektif melalui platform digital", "Hanya mencibir kebijakan di media sosial", "Menghapus semua aplikasi berita"],
        correctAnswer: 1,
        explanation: "Pemuda sebagai 'digital native' bisa berperan sebagai pengawas (watchdog) yang efektif dengan menyebarkan informasi edukatif dan melakukan pengawasan publik secara terbuka."
      }
    ]
  },
  {
    id: 'demokrasi',
    topic: 'Sistem Demokrasi',
    questions: [
      {
        question: "Dalam sistem demokrasi, pers sering disebut sebagai 'The Fourth Estate'. Mengapa peran ini sangat vital bagi kesehatan sebuah negara?",
        options: ["Untuk mencari keuntungan iklan", "Sebagai alat pemerintah menyebar info", "Sebagai penyeimbang dan pengawas (watchdog) kekuasaan agar tetap transparan", "Untuk menghibur rakyat"],
        correctAnswer: 2,
        explanation: "Pers yang bebas berfungsi mengawasi tiga cabang kekuasaan (Eksekutif, Legislatif, Yudikatif) agar tidak menyalahgunakan wewenang."
      },
      {
        question: "Apa risiko utama jika sebuah demokrasi hanya berfokus pada 'Tirani Mayoritas' tanpa perlindungan terhadap minoritas?",
        options: ["Negara jadi sangat kuat", "Hilangnya perlindungan hak asasi manusia bagi kelompok non-dominan", "Ekonomi akan maju pesat", "Pemilu akan jadi lebih mudah"],
        correctAnswer: 1,
        explanation: "Demokrasi yang sehat harus melindungi hak-hak minoritas agar tidak ditindas oleh keputusan mayoritas yang mungkin bias."
      },
      {
        question: "Manakah indikator paling akurat bahwa sebuah demokrasi sedang mengalami 'kemunduran' (backsliding)?",
        options: ["Banyak demonstrasi damai", "Pelemahan lembaga independen (seperti KPK atau MK) dan pembatasan suara kritis", "Pergantian pemimpin secara rutin", "Pertumbuhan ekonomi yang stabil"],
        correctAnswer: 1,
        explanation: "Kemunduran demokrasi sering dimulai dengan pelemahan institusi yang seharusnya menjadi pengawas kekuasaan."
      },
      {
        question: "Demokrasi Deliberatif menekankan pada...",
        options: ["Voting cepat tanpa debat", "Pengambilan keputusan melalui diskusi publik yang rasional dan terbuka", "Instruksi dari pemimpin tertinggi", "Keputusan berdasarkan survei popularitas"],
        correctAnswer: 1,
        explanation: "Deliberasi berarti mendiskusikan berbagai argumen secara mendalam sebelum mengambil keputusan kolektif."
      }
    ]
  },
  {
    id: 'cabang',
    topic: 'Tiga Cabang Kekuasaan',
    questions: [
      {
        question: "Mengapa independensi lembaga Yudikatif dianggap sebagai 'napas' bagi negara hukum?",
        options: ["Agar hakim bisa digaji tinggi", "Menjamin keadilan tanpa intervensi politik dari Eksekutif maupun Legislatif", "Agar proses sidang jadi lebih lama", "Menghindari adanya oposisi"],
        correctAnswer: 1,
        explanation: "Tanpa independensi yudikatif, hukum akan menjadi alat bagi penguasa untuk menindas lawan politik."
      },
      {
        question: "Jika terjadi sengketa antara kewenangan lembaga negara, lembaga manakah yang memiliki mandat konstitusional untuk menyelesaikannya?",
        options: ["DPR", "Mahkamah Konstitusi", "Polri", "Kejaksaan Agung"],
        correctAnswer: 1,
        explanation: "Mahkamah Konstitusi (MK) adalah penjaga konstitusi yang berwenang memutus sengketa kewenangan antar lembaga negara."
      },
      {
        question: "Apa konsekuensi jika fungsi 'Budgeting' di Legislatif tidak berjalan dengan kritis?",
        options: ["Uang negara tetap aman", "Risiko penyalahgunaan anggaran oleh Eksekutif meningkat karena kurang pengawasan", "Proyek pembangunan terhenti total", "Pajak akan otomatis turun"],
        correctAnswer: 1,
        explanation: "Legislatif harus kritis dalam penganggaran agar dana publik digunakan secara efisien dan tepat sasaran oleh pemerintah."
      },
      {
        question: "Mekanisme 'Checks and Balances' di Indonesia memungkinkan DPR untuk memberikan persetujuan terhadap...",
        options: ["Semua hobi presiden", "Pengangkatan Kapolri dan Panglima TNI", "Waktu libur nasional", "Menu makan siang menteri"],
        correctAnswer: 1,
        explanation: "Persetujuan DPR terhadap jabatan strategis adalah bentuk pengawasan agar presiden tidak sewenang-wenang memilih pejabat publik."
      }
    ]
  },
  {
    id: 'memilih',
    topic: 'Kenapa Harus Memilih?',
    questions: [
      {
        question: "Analisis dampak jangka panjang jika mayoritas pemilih pemuda bersikap apolitis (Golput) dalam beberapa pemilu berturut-turut.",
        options: ["Politik akan menjadi bersih dari konflik", "Kebijakan strategis masa depan tidak lagi mencerminkan aspirasi dan kebutuhan generasi muda", "Partai politik akan bubar dengan sendirinya", "Biaya pemilu akan berkurang drastis"],
        correctAnswer: 1,
        explanation: "Politisi akan mengabaikan kelompok pemilih yang pasif. Akibatnya, kebijakan pendidikan, lapangan kerja, dan lingkungan akan kurang memperhatikan suara pemuda."
      },
      {
        question: "Mana yang merupakan strategi 'Pemilih Cerdas' dalam menghadapi banjir disinformasi (hoaks) saat masa kampanye?",
        options: ["Percaya pada informasi yang paling banyak dibagikan", "Melakukan verifikasi data (cross-check) ke sumber resmi dan media kredibel", "Mengabaikan semua berita politik", "Memilih berdasarkan perasaan suka saja"],
        correctAnswer: 1,
        explanation: "Berpikir kritis dan verifikasi data adalah kunci agar pilihan kita objektif, bukan hasil manipulasi informasi."
      },
      {
        question: "Apa kaitan langsung antara partisipasi pemilih dengan kualitas akuntabilitas publik?",
        options: ["Tidak ada kaitan", "Partisipasi tinggi memaksa pemimpin untuk bekerja lebih baik karena merasa diawasi dan diberikan amanah", "Meningkatkan harga saham", "Membuat proses hitung suara jadi lambat"],
        correctAnswer: 1,
        explanation: "Legitimasi yang kuat dari rakyat memberikan mandat sekaligus tanggung jawab moral yang besar bagi pemimpin untuk akuntabel."
      },
      {
        question: "Mengapa 'Money Politics' (Politik Uang) dianggap sebagai racun mematikan bagi demokrasi?",
        options: ["Karena uang itu kotor", "Mengganti kompetisi gagasan dengan kompetisi modal, yang berakhir pada korupsi saat menjabat", "Hanya menguntungkan bank", "Membuat antrean di TPS jadi lama"],
        correctAnswer: 1,
        explanation: "Kandidat yang 'membeli' suara cenderung akan melakukan korupsi saat menjabat untuk mengembalikan modal yang telah dikeluarkan."
        
      }
    ]
  }
];