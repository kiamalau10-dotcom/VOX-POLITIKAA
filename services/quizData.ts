import { Question } from '../types';

export const ALL_QUESTIONS: Question[] = [
  // LEVEL 1-3: Dasar Politik & Pancasila (Kelas 10)
  {
    question: "Apa tugas utama dari lembaga Legislatif dalam sistem Trias Politika?",
    options: ["Menjalankan undang-undang", "Membuat undang-undang", "Mengadili pelanggar undang-undang", "Menjaga keamanan negara"],
    correctAnswer: 1,
    explanation: "Lembaga Legislatif (DPR/DPD) memiliki fungsi utama legislasi, yaitu merumuskan dan menetapkan undang-undang.",
    level: 1
  },
  {
    question: "Siapa yang memegang kekuasaan Eksekutif tertinggi di Indonesia?",
    options: ["Ketua DPR", "Ketua MA", "Presiden", "Panglima TNI"],
    correctAnswer: 2,
    explanation: "Sesuai UUD 1945, kekuasaan pemerintahan (eksekutif) dipegang oleh Presiden.",
    level: 1
  },
  {
    question: "Apa yang dimaksud dengan 'Checks and Balances'?",
    options: ["Sistem pembayaran pajak", "Saling mengawasi dan mengimbangi antar cabang kekuasaan", "Proses pemilihan umum", "Pembagian wilayah daerah"],
    correctAnswer: 1,
    explanation: "Checks and Balances adalah mekanisme di mana cabang-cabang kekuasaan (Eksekutif, Legislatif, Yudikatif) saling mengawasi untuk mencegah penyalahgunaan kekuasaan.",
    level: 2
  },
  {
    question: "Apa fungsi dari Badan Pemeriksa Keuangan (BPK)?",
    options: ["Membuat anggaran negara", "Memeriksa pengelolaan dan tanggung jawab keuangan negara", "Menagih pajak rakyat", "Mencetak uang kertas"],
    correctAnswer: 1,
    explanation: "BPK adalah lembaga negara yang bebas dan mandiri dengan tugas khusus memeriksa pengelolaan keuangan negara.",
    level: 2
  },
  {
    question: "Apa yang dimaksud dengan 'Kedaulatan Rakyat'?",
    options: ["Kekuasaan tertinggi ada di tangan Raja", "Kekuasaan tertinggi ada di tangan rakyat", "Kekuasaan tertinggi ada di tangan militer", "Kekuasaan tertinggi ada di tangan pengusaha"],
    correctAnswer: 1,
    explanation: "Kedaulatan rakyat berarti bahwa kekuasaan tertinggi dalam suatu negara berasal dari rakyat dan dijalankan untuk kepentingan rakyat.",
    level: 1
  },
  {
    question: "Apa itu 'Demokrasi Pancasila'?",
    options: ["Demokrasi yang berdasarkan suara mayoritas mutlak", "Demokrasi yang bersumber pada nilai-nilai luhur Pancasila", "Demokrasi yang hanya berlaku untuk umat beragama", "Demokrasi tanpa adanya partai politik"],
    correctAnswer: 1,
    explanation: "Demokrasi Pancasila adalah sistem demokrasi yang dijiwai oleh nilai-nilai Pancasila sebagai dasar negara Indonesia.",
    level: 1
  },
  {
    question: "Apa yang dimaksud dengan 'Otonomi Daerah'?",
    options: ["Pemisahan diri dari negara kesatuan", "Hak dan kewajiban daerah untuk mengatur urusan rumah tangganya sendiri", "Penghapusan pemerintahan pusat", "Sistem pemerintahan kerajaan di daerah"],
    correctAnswer: 1,
    explanation: "Otonomi daerah adalah kewenangan daerah otonom untuk mengatur dan mengurus kepentingan masyarakat setempat menurut prakarsa sendiri.",
    level: 3
  },
  {
    question: "Apa fungsi dari Mahkamah Agung (MA)?",
    options: ["Menguji undang-undang terhadap UUD", "Lembaga peradilan tertinggi yang membawahi peradilan umum, agama, militer, dan TUN", "Menyelenggarakan pemilu", "Membuat peraturan daerah"],
    correctAnswer: 1,
    explanation: "MA adalah pemegang kekuasaan kehakiman tertinggi di Indonesia yang membawahi berbagai lingkungan peradilan.",
    level: 2
  },
  {
    question: "Apa peran Dewan Perwakilan Daerah (DPD)?",
    options: ["Membuat undang-undang otonomi daerah", "Memilih menteri", "Mengadili kasus korupsi", "Menetapkan anggaran militer"],
    correctAnswer: 0,
    explanation: "DPD memiliki wewenang dalam pengajuan dan pembahasan RUU yang berkaitan dengan otonomi daerah, hubungan pusat dan daerah, serta pengelolaan sumber daya alam.",
    level: 3
  },
  {
    question: "Apa yang dimaksud dengan 'Bhinneka Tunggal Ika'?",
    options: ["Berbeda-beda tetapi tetap satu jua", "Satu bangsa tanpa perbedaan", "Perpecahan dalam kesatuan", "Sistem pemerintahan satu partai"],
    correctAnswer: 0,
    explanation: "Semboyan ini menekankan pentingnya persatuan di tengah keberagaman suku, agama, dan budaya di Indonesia.",
    level: 1
  },

  // LEVEL 4-6: Demokrasi & Hukum (Kelas 11)
  {
    question: "Apa syarat ambang batas parlemen (Parliamentary Threshold) untuk Pemilu 2024?",
    options: ["Ambang batas parlemen ditetapkan sebesar 3%", "Ambang batas parlemen ditetapkan sebesar 4%", "Ambang batas parlemen ditetapkan sebesar 5%", "Ambang batas parlemen ditetapkan sebesar 7%"],
    correctAnswer: 1,
    explanation: "Ambang batas parlemen untuk DPR RI pada Pemilu 2024 adalah 4% suara sah nasional.",
    level: 4
  },
  {
    question: "Apa peran Mahkamah Konstitusi (MK) dalam sengketa Pemilu?",
    options: ["Menghitung suara ulang di semua TPS secara manual", "Memutus perselisihan hasil pemilihan umum secara final", "Menangkap pelaku kecurangan dalam proses kampanye", "Membatalkan seluruh proses Pemilu jika ditemukan cacat"],
    correctAnswer: 1,
    explanation: "MK memiliki kewenangan konstitusional untuk memutus perselisihan tentang hasil pemilihan umum (PHPU).",
    level: 4
  },
  {
    question: "Apa itu 'Dissenting Opinion' dalam putusan hakim?",
    options: ["Pendapat hakim yang setuju dengan mayoritas hakim", "Pendapat hakim yang berbeda dari keputusan mayoritas", "Proses pembatalan putusan oleh lembaga yang lebih tinggi", "Tahap awal persidangan sebelum pengambilan keputusan"],
    correctAnswer: 1,
    explanation: "Dissenting opinion adalah pendapat seorang hakim yang tidak setuju dengan keputusan yang diambil oleh mayoritas hakim lainnya.",
    level: 5
  },
  {
    question: "Apa itu 'Ambang Batas Pencalonan Presiden' (Presidential Threshold)?",
    options: ["Syarat usia minimal bagi calon presiden dan wakil", "Syarat dukungan partai politik untuk mencalonkan presiden", "Batas maksimal masa jabatan presiden selama dua periode", "Jumlah minimal suara untuk menang dalam satu putaran"],
    correctAnswer: 1,
    explanation: "Presidential threshold adalah syarat minimal perolehan kursi atau suara partai politik untuk dapat mengusung pasangan calon presiden dan wakil presiden.",
    level: 5
  },
  {
    question: "Apa itu 'Hak Angket' DPR?",
    options: ["Hak untuk memilih menteri dalam kabinet presiden", "Hak untuk melakukan penyelidikan terhadap kebijakan pemerintah", "Hak untuk mengubah pasal-pasal dalam UUD 1945", "Hak untuk membubarkan organisasi masyarakat yang radikal"],
    correctAnswer: 1,
    explanation: "Hak angket adalah hak DPR untuk melakukan penyelidikan terhadap pelaksanaan suatu undang-undang atau kebijakan pemerintah yang diduga bertentangan dengan peraturan.",
    level: 6
  },
  {
    question: "Apa fungsi dari Komisi Yudisial (KY)?",
    options: ["Mengadili kasus korupsi yang melibatkan pejabat negara", "Mengusulkan pengangkatan hakim agung dan menjaga kehormatan hakim", "Membuat undang-undang yang berkaitan dengan sistem peradilan", "Mengawasi kinerja menteri dalam menjalankan kebijakan hukum"],
    correctAnswer: 1,
    explanation: "KY bertugas mengusulkan calon hakim agung kepada DPR dan mempunyai wewenang lain dalam rangka menjaga kehormatan dan perilaku hakim.",
    level: 5
  },
  {
    question: "Apa yang dimaksud dengan 'Kedaulatan Hukum' (Rule of Law)?",
    options: ["Hukum dibuat oleh penguasa untuk kepentingannya sendiri", "Semua orang, termasuk penguasa, tunduk pada hukum yang berlaku", "Hukum hanya berlaku bagi rakyat kecil dan tidak bagi elit", "Penghapusan sistem peradilan demi efisiensi pemerintahan"],
    correctAnswer: 1,
    explanation: "Rule of law berarti bahwa hukum adalah otoritas tertinggi dan setiap warga negara memiliki kedudukan yang sama di depan hukum.",
    level: 6
  },
  {
    question: "Apa itu 'Gerrymandering'?",
    options: ["Sistem pemilihan langsung untuk kepala daerah", "Manipulasi batas wilayah pemilihan untuk keuntungan politik", "Proses penghitungan suara secara elektronik di TPS", "Kampanye hitam yang menyerang pribadi calon lawan"],
    correctAnswer: 1,
    explanation: "Gerrymandering adalah praktik memanipulasi batas-batas distrik pemilihan untuk memberikan keuntungan bagi satu pihak atau kelompok.",
    level: 6
  },
  {
    question: "Apa peran 'Ombudsman'?",
    options: ["Mengadili kasus pidana berat di tingkat nasional", "Mengawasi penyelenggaraan pelayanan publik oleh pemerintah", "Mengatur keuangan negara and distribusi pajak daerah", "Menjaga keamanan nasional dari ancaman terorisme"],
    correctAnswer: 1,
    explanation: "Ombudsman adalah lembaga negara yang mempunyai kewenangan mengawasi penyelenggaraan pelayanan publik.",
    level: 4
  },
  {
    question: "Apa yang dimaksud dengan 'Good Governance'?",
    options: ["Pemerintahan yang otoriter namun stabil secara ekonomi", "Tata kelola pemerintahan yang transparan and akuntabel", "Pemerintahan yang hanya fokus pada pertumbuhan ekonomi", "Sistem pemerintahan tanpa adanya hukum yang mengikat"],
    correctAnswer: 1,
    explanation: "Good governance adalah prinsip pengelolaan pemerintahan yang bersih, efektif, dan bertanggung jawab kepada masyarakat.",
    level: 4
  },

  // LEVEL 7+: Politik Internasional & HOTS (12th Grade)
  {
    question: "Apa yang dimaksud dengan politik luar negeri 'Bebas Aktif'?",
    options: ["Bebas berpihak pada blok manapun sesuai kepentingan", "Bebas menentukan sikap and aktif menjaga perdamaian dunia", "Aktif mengikuti perintah negara maju dalam diplomasi", "Bebas dari segala aturan internasional yang mengikat"],
    correctAnswer: 1,
    explanation: "Bebas berarti tidak memihak blok kekuatan manapun, Aktif berarti ikut serta dalam memelihara perdamaian dunia.",
    level: 7
  },
  {
    question: "Apa dampak dari diterapkannya ambang batas parlemen 4%?",
    options: ["Membatasi jumlah partai di DPR guna stabilitas politik", "Memberikan peluang besar bagi partai baru untuk memimpin", "Mengurangi hak suara rakyat dalam memilih wakil daerah", "Memastikan setiap warga negara mendapatkan bantuan sosial"],
    correctAnswer: 0,
    explanation: "Ambang batas parlemen bertujuan untuk menyederhanakan sistem kepartaian di parlemen agar proses pengambilan keputusan lebih stabil.",
    level: 8,
    isHots: true
  },
  {
    question: "Manakah yang merupakan contoh kebijakan strategis dalam pembangunan ekonomi?",
    options: ["Memberi bantuan tunai langsung kepada masyarakat miskin", "Membangun jalan desa menggunakan dana desa secara masif", "Hilirisasi industri untuk menciptakan nilai tambah komoditas", "Membagikan sembako gratis menjelang hari raya keagamaan"],
    correctAnswer: 2,
    explanation: "Hilirisasi adalah strategi kompleks yang mengubah bahan mentah menjadi barang jadi, menciptakan ekosistem industri dan nilai tambah ekonomi yang tinggi.",
    level: 9,
    isHots: true
  },
  {
    question: "Apa peran 'PBB' (Perserikatan Bangsa-Bangsa) dalam konflik global?",
    options: ["Mengatur ekonomi dunia secara mutlak melalui sanksi", "Menjaga perdamaian internasional and mendorong kerja sama", "Menjadi pemerintah dunia yang membawahi semua negara", "Membentuk tentara global untuk menyerang negara agresor"],
    correctAnswer: 1,
    explanation: "PBB adalah organisasi internasional yang bertujuan menjaga perdamaian dunia, mengembangkan hubungan persahabatan, dan meningkatkan kerja sama internasional.",
    level: 7
  },
  {
    question: "Apa yang dimaksud dengan 'Geopolitik'?",
    options: ["Studi tentang batuan bumi and kekayaan alam mineral", "Studi pengaruh faktor geografis terhadap politik internasional", "Sistem pemetaan wilayah untuk kepentingan pajak daerah", "Kebijakan lingkungan hidup untuk mencegah pemanasan global"],
    correctAnswer: 1,
    explanation: "Geopolitik mempelajari bagaimana lokasi, sumber daya, dan geografi suatu wilayah mempengaruhi kekuatan dan strategi politik suatu negara.",
    level: 8
  },
  {
    question: "Apa itu 'Soft Power' dalam diplomasi?",
    options: ["Kekuatan militer yang besar namun jarang digunakan", "Kemampuan mempengaruhi melalui daya tarik budaya and nilai", "Sistem persenjataan canggih yang berbasis teknologi siber", "Tekanan ekonomi yang kuat melalui embargo perdagangan"],
    correctAnswer: 1,
    explanation: "Soft power adalah kemampuan untuk mendapatkan apa yang diinginkan melalui daya tarik daripada paksaan atau pembayaran.",
    level: 8
  },
  {
    question: "Apa peran 'ASEAN' bagi stabilitas regional Indonesia?",
    options: ["Sebagai alat untuk menguasai negara tetangga secara politik", "Wadah kerja sama regional untuk stabilitas and pertumbuhan", "Organisasi militer bersama untuk menghadapi ancaman luar", "Satu-satunya sumber bantuan keuangan bagi pembangunan"],
    correctAnswer: 1,
    explanation: "ASEAN adalah organisasi kawasan yang menjadi pilar penting politik luar negeri Indonesia untuk menjaga stabilitas dan kemakmuran regional.",
    level: 7
  },
  {
    question: "Apa yang dimaksud dengan 'Populisme' dalam politik modern?",
    options: ["Kebijakan yang hanya menguntungkan kelompok orang kaya", "Gaya politik yang mengklaim mewakili rakyat melawan elit", "Sistem pemerintahan yang sangat populer di kalangan muda", "Gerakan seni yang berkembang pesat di tengah masyarakat"],
    correctAnswer: 1,
    explanation: "Populisme adalah pendekatan politik yang membagi masyarakat menjadi dua kelompok: rakyat yang murni dan elit yang korup.",
    level: 9,
    isHots: true
  },
  {
    question: "Apa itu 'Sanction' (Sanksi) dalam hubungan internasional?",
    options: ["Bantuan keuangan untuk negara yang sedang berkonflik", "Tindakan hukuman ekonomi/politik terhadap negara pelanggar", "Perjanjian persahabatan antar negara yang bertetangga", "Pertukaran pelajar untuk meningkatkan pemahaman budaya"],
    correctAnswer: 1,
    explanation: "Sanksi internasional adalah tindakan pembatasan atau hukuman ekonomi/politik yang diberikan kepada suatu negara karena melanggar hukum internasional.",
    level: 7
  },
  {
    question: "Apa fungsi dari Dewan Keamanan PBB?",
    options: ["Mengatur perdagangan dunia and menetapkan tarif bea cukai", "Menjaga perdamaian and keamanan internasional secara kolektif", "Menyelenggarakan bantuan kemanusiaan di daerah bencana", "Mengadili sengketa wilayah laut antar negara anggota"],
    correctAnswer: 1,
    explanation: "Dewan Keamanan adalah organ PBB yang bertanggung jawab utama untuk memelihara perdamaian dan keamanan internasional.",
    level: 8
  },
  {
    question: "Apa konsekuensi logis dari sistem presidensial terhadap stabilitas pemerintahan?",
    options: ["Pemerintah mudah dijatuhkan oleh parlemen kapan saja", "Masa jabatan eksekutif tetap dan tidak tergantung dukungan parlemen", "Presiden harus selalu berasal dari partai pemenang pemilu", "Parlemen memiliki kekuasaan mutlak atas kebijakan luar negeri"],
    correctAnswer: 1,
    explanation: "Dalam sistem presidensial, eksekutif memiliki masa jabatan yang tetap (fixed term) sehingga tidak mudah dijatuhkan oleh mosi tidak percaya parlemen, memberikan stabilitas lebih tinggi.",
    level: 8,
    isHots: true
  },
  {
    question: "Mengapa hilirisasi nikel dianggap sebagai langkah geopolitik yang berisiko sekaligus menguntungkan?",
    options: ["Karena nikel hanya ada di Indonesia dan tidak ada di negara lain", "Karena menantang dominasi pasar global sambil membangun industri dalam negeri", "Karena proses pengolahan nikel tidak membutuhkan teknologi tinggi", "Karena nikel akan digantikan oleh baterai berbasis air dalam waktu dekat"],
    correctAnswer: 1,
    explanation: "Hilirisasi menantang arus perdagangan bahan mentah global yang menguntungkan negara maju, namun memberikan kemandirian ekonomi jangka panjang bagi Indonesia.",
    level: 10,
    isHots: true
  },
  {
    question: "Apa peran 'Cyber Diplomacy' dalam konflik modern antar negara?",
    options: ["Mengirimkan bantuan fisik melalui jalur internet", "Mengelola hubungan internasional melalui ruang siber dan keamanan data", "Menghapus seluruh akun media sosial pemimpin negara lawan", "Membangun jaringan internet gratis di seluruh dunia"],
    correctAnswer: 1,
    explanation: "Diplomasi siber fokus pada norma internasional di ruang digital, perlindungan infrastruktur kritis, dan pencegahan perang siber.",
    level: 9,
    isHots: true
  }
];
