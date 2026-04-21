import { Minister, PoliticalParty, ProvinceData, NewsItem, Quiz, StrategicProgram } from './types';

export const CABINET_DATA: Minister[] = [
  {
    id: 'pres',
    name: 'Prabowo Subianto',
    position: 'Presiden Republik Indonesia',
    bio: 'Pemimpin tertinggi negara yang terpilih untuk masa jabatan 2024-2029.',
    tasks: ['Memimpin seluruh rakyat Indonesia', 'Menjaga keamanan negara', 'Membuat aturan besar untuk kemajuan bangsa'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Prabowo_Subianto_2024_official_portrait.jpg'
  },
  {
    id: 'vpres',
    name: 'Gibran Rakabuming Raka',
    position: 'Wakil Presiden Republik Indonesia',
    bio: 'Membantu Presiden dalam menjalankan tugas-tugas penting negara.',
    tasks: ['Membantu Presiden bekerja', 'Mengawasi pembangunan di daerah', 'Mewakili Presiden jika berhalangan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Gibran_Rakabuming_2024_official_portrait.jpg'
  },
  {
    id: 'menko-polkam',
    name: 'Djamari Chaniago',
    position: 'Menteri Koordinator Bidang Politik dan Keamanan',
    bio: 'Mengatur agar politik Indonesia stabil dan negara tetap aman. Mulai menjabat 17 September 2025.',
    tasks: ['Menjaga ketertiban masyarakat', 'Mengatur kerjasama antar lembaga keamanan', 'Memastikan hukum berjalan baik'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Djamari_Chaniago%2C_Menteri_Koordinator_Bidang_Politik_dan_Keamanan_%282025%29.png'
  },
  {
    id: 'menko-hukum-ham',
    name: 'Yusril Ihza Mahendra',
    position: 'Menteri Koordinator Bidang Hukum, HAM, Imigrasi, dan Pemasyarakatan',
    bio: 'Pakar hukum yang memastikan keadilan dan hak asasi manusia dihormati.',
    tasks: ['Menyelaraskan undang-undang', 'Melindungi hak asasi warga negara', 'Memperbaiki sistem penjara'],
    image: 'https://www.suarasurabaya.net/wp-content/uploads/2025/09/Screenshot-2025-09-13-162303-744x493.jpg.webp'
  },
  {
    id: 'menko-perekonomian',
    name: 'Airlangga Hartarto',
    position: 'Menteri Koordinator Bidang Perekonomian',
    bio: 'Arsitek ekonomi yang memastikan bisnis dan lapangan kerja terus bertumbuh.',
    tasks: ['Menjaga harga barang tetap stabil', 'Meningkatkan investasi asing', 'Menciptakan lapangan kerja baru'],
    image: 'https://assets.weforum.org/sf_account/image/bAJLKzn26ttzF6DcpZYrLJPZ1OP7TZ4ovBxL9t8FJXU.jpg'
  },
  {
    id: 'menko-pmk',
    name: 'Pratikno',
    position: 'Menteri Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
    bio: 'Orang tua bagi seluruh rakyat yang memastikan kesejahteraan dan budaya tetap terjaga.',
    tasks: ['Mengurangi angka kemiskinan', 'Meningkatkan prestasi olahraga dan seni', 'Mengatur bantuan sosial agar tepat sasaran'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Secretary_of_State_of_Indonesia_Pratikno.jpg'
  },
  {
    id: 'menko-infra',
    name: 'Agus Harimurti Yudhoyono',
    position: 'Menteri Koordinator Bidang Infrastruktur dan Pembangunan Kewilayahan',
    bio: 'Membangun jalan, jembatan, dan fasilitas umum di seluruh Indonesia.',
    tasks: ['Membangun jalan tol dan bendungan', 'Memperbaiki fasilitas di desa-desa', 'Memastikan pembangunan merata'],
    image: 'https://sumselterkini.co.id/wp-content/uploads/2017/10/agus-harimurti-yudhoyono.jpg'
  },
  {
    id: 'menko-pemberdayaan-masyarakat',
    name: 'Abdul Muhaimin Iskandar',
    position: 'Menteri Koordinator Bidang Pemberdayaan Masyarakat',
    bio: 'Memastikan masyarakat mendapat kesempatan yang adil untuk maju dan sejahtera.',
    tasks: ['Mengkoordinasikan program pemberdayaan masyarakat', 'Meningkatkan kesejahteraan warga', 'Memperkuat ekonomi kerakyatan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Muhaimin_Iskandar%2C_Candidate_for_Indonesia%27s_Vice_President_in_2024.jpg'
  },
  {
    id: 'menko-pangan',
    name: 'Zulkifli Hasan',
    position: 'Menteri Koordinator Bidang Pangan',
    bio: 'Memastikan stok nasi, sayur, dan lauk pauk cukup untuk semua rakyat.',
    tasks: ['Membantu petani agar panen banyak', 'Menjaga harga beras agar murah', 'Mencapai swasembada pangan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Wakil_Ketua_MPR_Zulkifli_Hasan_%282019%29.jpg'
  },
  {
    id: 'mensesneg',
    name: 'Prasetyo Hadi',
    position: 'Menteri Sekretaris Negara',
    bio: 'Tangan kanan Presiden yang mengatur administrasi dan agenda harian pemimpin negara.',
    tasks: ['Mengelola jadwal kerja Presiden', 'Menyiapkan naskah pidato dan keputusan presiden', 'Mendukung kelancaran tugas harian Istana'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69BniaYqvyzOaX47FnoVw3USj6VIjIw9smw&s'
  },
  {
    id: 'mendagri',
    name: 'Muhammad Tito Karnavian',
    position: 'Menteri Dalam Negeri',
    bio: 'Pembina seluruh kepala daerah (Gubernur, Bupati, Wali Kota) di Indonesia.',
    tasks: ['Menjaga kerukunan di daerah', 'Memastikan KTP dan data kependudukan rapi', 'Mengawasi kinerja pemerintah daerah'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKfo83qo1Px7GAz20KhtHgkYHuyCpUDjSAxQ&s'
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Sjafrie_Sjamsoeddin%2C_Menteri_Pertahanan_RI_%282024%29.jpg'
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
    id: 'menham',
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
    id: 'menkeu',
    name: 'Purbaya Yudhi Sadewa',
    position: 'Menteri Keuangan',
    bio: 'Bendahara negara yang mengatur uang Indonesia agar cukup untuk membangun. Mulai menjabat 8 September 2025.',
    tasks: ['Mengatur tabungan negara', 'Membagi uang untuk sekolah dan rumah sakit', 'Memastikan ekonomi tetap kuat'],
    image: 'https://ceknricek.com/wp-content/uploads/2025/09/PURBAYA-YUDHI-SADEWA.jpg'
  },
  {
    id: 'mendikdasmen',
    name: 'Abdul Mu\'ti',
    position: 'Menteri Pendidikan Dasar dan Menengah',
    bio: 'Guru besar yang mengatur sekolah agar siswa pintar.',
    tasks: ['Membuat kurikulum belajar yang seru', 'Meningkatkan kualitas guru', 'Memperbaiki bangunan sekolah'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Menteri_pendidikan_indonesia.jpg'
  },
  {
    id: 'mendiktisaintek',
    name: 'Brian Yuliarto',
    position: 'Menteri Pendidikan Tinggi, Sains, dan Teknologi',
    bio: 'Memajukan kampus dan riset teknologi masa depan. Mulai menjabat 19 Februari 2025.',
    tasks: ['Beasiswa mahasiswa', 'Inovasi teknologi', 'Kualitas universitas'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Menteri_Pendidikan_Tinggi%2C_Sains%2C_dan_Teknologi_Republik_Indonesia_Brian_Yuliarto_%28cropped%29.jpg'
  },
  {
    id: 'menbud',
    name: 'Fadli Zon',
    position: 'Menteri Kebudayaan',
    bio: 'Penjaga warisan luhur dan pemaju industri kreatif budaya.',
    tasks: ['Pelestarian candi & situs', 'Diplomasi budaya', 'Dukungan seniman'],
    image: 'https://www.fraksigerindra.id/wp-content/uploads/2021/03/FADLI-ZON.png'
  },
  {
    id: 'menkes',
    name: 'Budi Gunadi Sadikin',
    position: 'Menteri Kesehatan',
    bio: 'Dokter seluruh rakyat Indonesia yang memastikan semua orang sehat.',
    tasks: ['Menyediakan obat dan vaksin', 'Memperbaiki puskesmas dan RS', 'Mencegah penyakit menular'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69BniaYqvyzOaX47FnoVw3USj6VIjIw9smw&s'
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
    id: 'mennaker',
    name: 'Yassierli',
    position: 'Menteri Ketenagakerjaan',
    bio: 'Menjamin hak pekerja dan menciptakan SDM unggul.',
    tasks: ['Pelatihan kerja', 'Urusan upah/UMR', 'Keselamatan kerja'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Yassierli%2C_Menteri_Ketenagakerjaan_%282024%29.jpg'
  },
  {
    id: 'menp2mi',
    name: 'Mukhtarudin',
    position: 'Menteri Pelindungan Pekerja Migran Indonesia',
    bio: 'Melindungi dan membina pekerja migran Indonesia di dalam dan luar negeri. Mulai menjabat 8 September 2025.',
    tasks: ['Melindungi hak pekerja migran', 'Memastikan keberangkatan prosedural', 'Membantu purna pekerja migran'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Mukhtarudin_Golkar.png'
  },
  {
    id: 'menperin',
    name: 'Agus Gumiwang Kartasasmita',
    position: 'Menteri Perindustrian',
    bio: 'Memajukan pabrik dan produk buatan dalam negeri.',
    tasks: ['Hilirisasi industri', 'Dukungan industri kecil', 'Ekspor manufaktur'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Agus_Gumiwang_Kartasasmita%2C_DPR_RI_2014%E2%80%9319.jpg/250px-Agus_Gumiwang_Kartasasmita%2C_DPR_RI_2014%E2%80%9319.jpg'
  },
  {
    id: 'mendag',
    name: 'Budi Santoso',
    position: 'Menteri Perdagangan',
    bio: 'Mengatur arus barang di pasar domestik dan global.',
    tasks: ['Stabilisasi harga sembako', 'Perjanjian dagang luar negeri', 'Perlindungan konsumen'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Menteri_Perdagangan_Republik_Indonesia_Budi_Santoso.jpg'
  },
  {
    id: 'men-esdm',
    name: 'Bahlil Lahadalia',
    position: 'Menteri Energi dan Sumber Daya Mineral',
    bio: 'Mengelola kekayaan alam minyak, gas, dan tambang.',
    tasks: ['Swasembada energi', 'Listrik masuk desa', 'Transisi energi hijau'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Kepala_Badan_Koordinasi_Penanaman_Modal_Bahlil_Lahadalia_%28cropped%29.jpg/960px-Kepala_Badan_Koordinasi_Penanaman_Modal_Bahlil_Lahadalia_%28cropped%29.jpg'
  },
  {
    id: 'men-pu',
    name: 'Dody Hanggodo',
    position: 'Menteri Pekerjaan Umum',
    bio: 'Insinyur negara yang membangun fisik Indonesia.',
    tasks: ['Pembangunan bendungan', 'Irigasi sawah', 'Penyediaan air bersih'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Dody_Hanggodo%2C_Menteri_Pekerjaan_Umum_%282024%29.jpg/250px-Dody_Hanggodo%2C_Menteri_Pekerjaan_Umum_%282024%29.jpg'
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
    name: 'M. Iftitah Sulaiman',
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Dudy_Purwagandhi%2C_Menteri_Perhubungan_%282025%29.jpg/960px-Dudy_Purwagandhi%2C_Menteri_Perhubungan_%282025%29.jpg'
  },
  {
    id: 'menkominfo',
    name: 'Meutya Hafid',
    position: 'Menteri Komunikasi dan Digital',
    bio: 'Penjaga dunia digital yang memastikan internet cepat dan aman bagi semua.',
    tasks: ['Membangun sinyal internet di pelosok', 'Memberantas berita bohong (hoax)', 'Menjaga keamanan data pribadi warga'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Menteri_Komunikasi_dan_Digital_Indonesia_Meutya_Viada_Hafid.jpg'
  },
  {
    id: 'men-tan',
    name: 'Andi Amran Sulaiman',
    position: 'Menteri Pertanian',
    bio: 'Penanggung jawab utama kecukupan pangan nasional.',
    tasks: ['Cetak sawah', 'Distribusi pupuk', 'Mekanisasi tani'],
    image: 'https://badanpangan.go.id/storage/app/media/uploaded-files/1760320782201.png'
  },
  {
    id: 'men-kehutanan',
    name: 'Raja Juli Antoni',
    position: 'Menteri Kehutanan',
    bio: 'Menjaga paru-paru dunia yang ada di Indonesia.',
    tasks: ['Reboisasi', 'Hutan sosial', 'Pencegahan kebakaran hutan'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDId60kkKC758Kq_SDUDM792bPQWnHyF6IXA&s'
  },
  {
    id: 'men-kkp',
    name: 'Sakti Wahyu Trenggono',
    position: 'Menteri Kelautan dan Perikanan',
    bio: 'Penjaga kekayaan laut dan kesejahteraan nelayan.',
    tasks: ['Ekspor ikan', 'Budidaya lobster', 'Perlindungan terumbu karang'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Wamenhan-Sakti-Wahyu-Trenggono.jpeg'
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
    position: 'Menteri Perencanaan Pembangunan Nasional/Kepala Bappenas',
    bio: 'Perancang strategi pembangunan jangka panjang negara.',
    tasks: ['Visi Indonesia Emas 2045', 'Rencana pembangunan tahunan', 'Evaluasi proyek strategis'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Rachmat_Pambudy%2C_Menteri_Perencanaan_Pembangunan_%282025%29.png'
  },
  {
    id: 'men-panrb',
    name: 'Rini Widyantini',
    position: 'Menteri PAN-RB',
    bio: 'Pengatur birokrasi dan nasib PNS/ASN.',
    tasks: ['Efisiensi PNS', 'Rekrutmen CASN', 'Digitalisasi pemerintahan'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Rini_Widyantini%2C_Menteri_PAN-RB_%282024%29.png'
  },
  {
    id: 'men-bumn',
    name: 'Dony Oskaria',
    position: 'Kepala Badan Pengelola BUMN',
    bio: 'Pengelola perusahaan milik negara agar untung dan bermanfaat. Mulai menjabat 17 September 2025.',
    tasks: ['Restrukturisasi Garuda/Pertamina', 'Dukungan UMKM', 'Ekonomi syariah'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Dony_Oskaria_-_foto_Denas.jpg'
  },
  {
    id: 'men-kependudukan',
    name: 'Wihaji',
    position: 'Menteri Kependudukan dan Pembangunan Keluarga',
    bio: 'Fokus pada pembangunan kualitas manusia sejak dini.',
    tasks: ['Keluarga berencana', 'Data penduduk akurat', 'Kesejahteraan ibu anak'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Dr._Wihaji%2C_S.Ag.%2C_M.Pd_Mendukbangga.jpg'
  },
  {
    id: 'men-lh',
    name: 'Hanif Faisol Nurofiq',
    position: 'Menteri Lingkungan Hidup',
    bio: 'Penjaga alam dan pengendali polusi.',
    tasks: ['Penanganan sampah', 'Hutan lindung', 'Kualitas udara'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Hanif_Faisol_Nurofiq%2C_Menteri_Lingkungan_Hidup_%282024%29.jpg'
  },
  {
    id: 'men-investasi',
    name: 'Rosan Roeslani',
    position: 'Menteri Investasi dan Hilirisasi',
    bio: 'Pencari dana modal untuk membangun industri dalam negeri.',
    tasks: ['Izin usaha mudah', 'Investasi hijau', 'Pabrik baterai EV'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Rosan_Perkasa_Roeslani%2C_Menteri_Investasi_dan_Hilirisasi_%282024%29.webp'
  },
  {
    id: 'men-koperasi',
    name: 'Ferry Juliantono',
    position: 'Menteri Koperasi',
    bio: 'Menghidupkan ekonomi rakyat melalui koperasi. Mulai menjabat 8 September 2025.',
    tasks: ['Modernisasi koperasi', 'Bantuan modal', 'Koperasi digital'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Ferry_Juliantono6.jpg'
  },
  {
    id: 'men-umkm',
    name: 'Maman Abdurrahman',
    position: 'Menteri UMKM',
    bio: 'Sahabat pedagang kecil dan pengusaha kreatif.',
    tasks: ['Sertifikasi halal UMKM', 'Akses kredit bank', 'Pemasaran produk lokal'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Anggota_DPR_Maman_Abdurrahman.jpg'
  },
  {
    id: 'men-par',
    name: 'Widiyanti Putri',
    position: 'Menteri Pariwisata',
    bio: 'Mempromosikan keindahan alam Indonesia ke dunia.',
    tasks: ['Wisata 5 Bali Baru', 'Event internasional', 'Kualitas hotel & resto'],
    image: 'https://kemenpar.go.id/_next/image?url=https%3A%2F%2Fapi.kemenpar.go.id%2Fstorage%2Fapp%2Fuploads%2Fpublic%2F68e%2F2af%2F85a%2F68e2af85af89b551556027.png&w=3840&q=75'
  },
  {
    id: 'men-ekraf',
    name: 'Teuku Riefky Harsya',
    position: 'Menteri Ekonomi Kreatif',
    bio: 'Mendukung industri film, musik, dan game anak bangsa.',
    tasks: ['Hak kekayaan intelektual', 'Dana kreatif', 'Ekspor karya seni'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Teuku_Riefky_Harsya%2C_Menteri_Ekonomi_Kreatif_%282025%29.png'
  },
  {
    id: 'men-pppa',
    name: 'Arifatul Choiri Fauzi',
    position: 'Menteri Pemberdayaan Perempuan dan Perlindungan Anak',
    bio: 'Pelindung hak-hak perempuan dan anak-anak.',
    tasks: ['Stop kekerasan anak', 'Kesetaraan gender', 'Hak ibu pekerja'],
    image: 'https://mail.suaramuhammadiyah.id/storage/posts/image/Menteri_PPPA_RI-20250507115404.jpeg'
  },
  {
    id: 'menpora',
    name: 'Erick Thohir',
    position: 'Menteri Pemuda dan Olahraga',
    bio: 'Mengurus prestasi atlet dan kreativitas anak muda. Mulai menjabat 17 September 2025.',
    tasks: ['Persiapan Olimpiade', 'Kepemudaan', 'Infrastruktur GOR'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Menteri_Pemuda_dan_Olahraga_Indonesia_Erick_Thohir.png'
  },
  {
    id: 'men-haji-umrah',
    name: 'Mochamad Irfan Yusuf',
    position: 'Menteri Haji dan Umrah',
    bio: 'Mengatur penyelenggaraan ibadah haji dan umrah. Jabatan baru mulai 8 September 2025.',
    tasks: ['Meningkatkan layanan haji dan umrah', 'Mengelola kuota dan biaya', 'Memastikan kenyamanan jemaah'],
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Mochamad_Irfan_Yusuf%2C_Kepala_BP_Haji.jpg'
  }
];
export const STRATEGIC_PROGRAMS: StrategicProgram[] = [
  {
    id: 'asta-cita',
    title: 'Asta Cita',
    description: '8 Misi utama untuk memperkokoh ideologi, ekonomi, dan kedaulatan bangsa.',
    progress: 0,
    status: 'Visi Utama',
    icon: 'Shield',
    details: 'Asta Cita mencakup: 1. Memperkokoh ideologi Pancasila, 2. Memantapkan sistem pertahanan keamanan, 3. Meningkatkan lapangan kerja, 4. Memperkuat pembangunan SDM, 5. Melanjutkan hilirisasi, 6. Membangun dari desa, 7. Memperkuat reformasi politik/hukum, 8. Menyelaraskan kehidupan yang harmonis dengan lingkungan.',
    images: ['https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800'],
    impact: 'Transformasi struktural menuju Indonesia Emas 2045.'
  },
  {
    id: 'hilirisasi',
    title: 'Hilirisasi Industri',
    description: 'Mengolah kekayaan alam di dalam negeri untuk nilai tambah maksimal.',
    progress: 0,
    status: 'Prioritas Ekonomi',
    icon: 'Factory',
    details: 'Fokus pada pengolahan nikel, bauksit, tembaga, dan komoditas perkebunan/perikanan. Target investasi hilirisasi mencapai US$ 545,3 Miliar hingga 2040 di 21 komoditas strategis.',
    images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'],
    impact: 'Peningkatan PDB dan penciptaan jutaan lapangan kerja berkualitas.'
  },
  {
    id: 'makan-gratis',
    title: 'Makan Bergizi Gratis',
    description: 'Program gizi nasional untuk anak sekolah, balita, dan ibu hamil.',
    progress: 0,
    status: 'Transformasi Sosial',
    icon: 'Utensils',
    details: 'Dikelola oleh Badan Gizi Nasional. Menargetkan 82,9 juta penerima manfaat. Menggunakan 5.885 unit Satuan Pelayanan Pemenuhan Gizi (SPPG) di seluruh Indonesia. Anggaran diproyeksikan mencapai Rp 335 Triliun.',
    images: ['https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&q=80&w=800'],
    impact: 'Penurunan angka stunting dan peningkatan kualitas SDM sejak dini.'
  },
  {
    id: 'danantara',
    title: 'BPI Danantara',
    description: 'Super-holding investasi strategis untuk mengelola aset negara secara profesional.',
    progress: 0,
    status: 'Rekayasa Kelembagaan',
    icon: 'Landmark',
    details: 'Badan Pengelola Investasi Daya Anagata Nusantara (Danantara) dirancang sebagai Sovereign Wealth Fund (SWF) raksasa dengan target kelolaan aset US$ 1 Triliun, mengonsolidasikan BUMN besar seperti BRI, Mandiri, Telkom, dan Pertamina.',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'],
    impact: 'Efisiensi pengelolaan aset negara dan peningkatan daya saing investasi global.'
  },
  {
    id: 'ina-digital',
    title: 'INA Digital',
    description: 'Transformasi digital birokrasi melalui satu portal layanan terpadu.',
    progress: 0,
    status: 'Efisiensi Birokrasi',
    icon: 'Cpu',
    details: 'Konsolidasi >27.000 aplikasi pemerintah menjadi satu portal nasional. Fokus pada 9 layanan esensial termasuk kesehatan, pendidikan, dan bantuan sosial. Menggunakan Single Sign-On (SSO) dan Digital ID.',
    images: ['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'],
    impact: 'Penghematan anggaran Rp 6,2 Triliun per tahun dan pelayanan publik yang lebih cepat.'
  },
  {
    id: 'swasembada',
    title: 'Swasembada Pangan & Energi',
    description: 'Kemandirian nasional dalam pemenuhan kebutuhan dasar rakyat.',
    progress: 0,
    status: 'Kedaulatan Nasional',
    icon: 'Zap',
    details: 'Cetak sawah baru 3 juta hektar, optimalisasi lahan rawa, dan pengembangan bioenergi (B50/B100). Target swasembada pangan tercapai dalam 3-4 tahun ke depan.',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'],
    impact: 'Ketahanan nasional terhadap gejolak harga dan pasokan global.'
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
    logo: 'https://asset.kompas.com/crops/gTR4Z2mKS7yUl6HEwwmZFLQyEZY=/0x0:5489x3659/1200x800/data/photo/2025/03/05/67c7847b11864.jpg',
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