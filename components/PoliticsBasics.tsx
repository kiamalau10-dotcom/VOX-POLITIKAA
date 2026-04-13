import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Award,
  TrendingUp,
  TrendingDown,
  Scale,
  Landmark,
  Users,
} from 'lucide-react';

// --- 1. DATA GLOSARIUM (KATA SULIT) ---
const glossaryData = {
  konsensus: {
    definition: 'Kesepakatan bersama yang dicapai melalui musyawarah dan mufakat, di mana semua pihak yang terlibat menyetujui suatu keputusan tanpa paksaan.',
    example: 'Contoh: Dalam rapat DPR, konsensus dicapai ketika semua fraksi setuju untuk mengesahkan RUU tertentu setelah melalui pembahasan panjang.',
  },
  ubiquitous: {
    definition: 'Berasal dari bahasa Latin "ubique" yang berarti "di mana-mana" atau "serba hadir". Dalam konteks politik, berarti politik tidak hanya terjadi di pemerintahan tetapi juga dalam kehidupan sehari-hari.',
    example: 'Contoh: Politik bersifat ubiquitous karena bahkan dalam organisasi sekolah pun ada proses pemilihan ketua OSIS yang melibatkan strategi dan kekuasaan.',
  },
  absolutism: {
    definition: 'Sistem pemerintahan di mana kekuasaan tertinggi terpusat pada satu orang atau satu kelompok tanpa adanya pembatasan hukum, konstitusi, atau oposisi.',
    example: 'Contoh: Monarki absolut di Prancis sebelum Revolusi Prancis, di mana Raja Louis XIV memegang kekuasaan mutlak.',
  },
  ideologi: {
    definition: 'Kumpulan ide, keyakinan, dan nilai-nilai yang menjadi dasar teori dan tujuan suatu sistem politik, ekonomi, atau sosial.',
    example: 'Contoh: Pancasila adalah ideologi bangsa Indonesia yang menjadi pedoman dalam berbangsa dan bernegara.',
  },
  kedaulatan: {
    definition: 'Kekuasaan tertinggi untuk membuat keputusan dalam suatu negara yang tidak berasal dari kekuasaan lain yang lebih tinggi.',
    example: 'Contoh: Kedaulatan rakyat berarti rakyat memiliki kekuasaan tertinggi yang diwujudkan melalui Pemilu.',
  },
  tirani: {
    definition: 'Pemerintahan yang dijalankan dengan kekuasaan sewenang-wenang, kejam, dan tidak adil, biasanya oleh seorang penguasa absolut.',
    example: 'Contoh: Tirani terjadi ketika penguasa mengabaikan hak asasi manusia dan hukum demi kepentingan pribadi.',
  },
  referendum: {
    definition: 'Pemungutan suara langsung oleh seluruh warga negara untuk mengambil keputusan politik tertentu, seperti mengubah konstitusi atau menentukan kebijakan penting.',
    example: 'Contoh: Referendum kemerdekaan Timor Timur tahun 1999.',
  },
  otonomi: {
    definition: 'Kewenangan untuk mengatur dan mengurus urusan sendiri secara mandiri tanpa campur tangan pihak luar.',
    example: 'Contoh: Otonomi daerah memberikan kewenangan kepada pemerintah daerah untuk mengelola sumber daya dan membuat kebijakan lokal.',
  },
  desentralisasi: {
    definition: 'Penyerahan wewenang pemerintahan dari pemerintah pusat kepada daerah otonom untuk mengatur dan mengurus urusan pemerintahan dalam sistem NKRI.',
    example: 'Contoh: Desentralisasi memungkinkan Kabupaten Bogor membuat peraturan daerah sendiri tentang pariwisata.',
  },
  dekonsentrasi: {
    definition: 'Pelimpahan wewenang dari pemerintah pusat kepada gubernur sebagai wakil pemerintah pusat di daerah.',
    example: 'Contoh: Gubernur Jawa Barat menjalankan fungsi dekonsentrasi saat mengkoordinasikan program nasional di wilayahnya.',
  },
  legitimasi: {
    definition: 'Pengakuan dan penerimaan masyarakat terhadap kekuasaan, wewenang, atau keputusan pemerintah sebagai sah dan layak dipatuhi.',
    example: 'Contoh: Legitimasi presiden diperoleh melalui Pemilu yang jujur dan adil.',
  },
  pluralisme: {
    definition: 'Sistem nilai yang mengakui dan menghormati keberagaman dalam masyarakat, baik suku, agama, ras, maupun golongan.',
    example: 'Contoh: Indonesia menjunjung tinggi pluralisme dengan semboyan Bhinneka Tunggal Ika.',
  },
  'check and balances': {
    definition: 'Sistem saling mengawasi dan mengimbangi antar lembaga negara untuk mencegah penyalahgunaan kekuasaan.',
    example: 'Contoh: DPR mengawasi kinerja presiden (eksekutif), sementara MK menguji undang-undang yang dibuat DPR dan presiden.',
  },
  'money politics': {
    definition: 'Praktik pemberian uang atau materi lainnya kepada pemilih atau penyelenggara pemilu untuk mempengaruhi hasil pemilihan.',
    example: 'Contoh: Politik uang terjadi ketika calon legislatif membagikan sembako kepada warga agar memilihnya.',
  },
  'judicial review': {
    definition: 'Proses pengujian undang-undang terhadap konstitusi oleh Mahkamah Konstitusi untuk menilai apakah suatu undang-undang bertentangan dengan UUD 1945.',
    example: 'Contoh: Masyarakat mengajukan judicial review UU Cipta Kerja ke MK karena merasa dirugikan.',
  },
  'omnibus law': {
    definition: 'Metode pembentukan undang-undang dengan menggabungkan beberapa undang-undang yang diubah sekaligus dalam satu payung hukum besar.',
    example: 'Contoh: UU Cipta Kerja adalah omnibus law yang mengubah puluhan undang-undang sekaligus.',
  },
  idiil: {
    definition: 'Berasal dari kata "idea" yang berarti cita-cita atau pandangan hidup. Landasan idiil berarti dasar yang bersumber dari nilai-nilai filosofis dan pandangan hidup bangsa.',
    example: 'Contoh: Pancasila adalah landasan idiil bagi politik luar negeri Indonesia.',
  },
  independen: {
    definition: 'Bebas dari campur tangan, pengaruh, atau tekanan pihak lain. Dalam konteks lembaga negara, berarti lembaga tersebut menjalankan fungsi dan wewenangnya tanpa intervensi dari kekuasaan lain.',
    example: 'Contoh: Hakim harus bersikap independen dalam memutus perkara, tidak terpengaruh oleh tekanan eksekutif atau legislatif.',
  },
};

// --- 2. DATA TOKOH BANGSA ---
const tokohBangsa = [
  {
    id: 'soekarno',
    name: 'Ir. Soekarno',
    role: 'Presiden ke-1 / Proklamator',
    period: '1945 - 1967',
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Presiden_Sukarno.jpg',
    contribution: 'Merumuskan Pancasila sebagai dasar filsafat negara dan memimpin perjuangan kemerdekaan.',
    bio: 'Lahir di Surabaya, beliau adalah penyambung lidah rakyat yang menyatukan ribuan pulau dengan satu ideologi: Pancasila.',
    friendlyDesc: 'Bung Karno tuh orator ulung yang bisa bikin merinding seluruh rakyat Indonesia hanya dengan pidatonya. Di tengah ancaman negara-negara Barat yang nggak mau Indonesia merdeka, beliau berani memprakarsai Konferensi Asia Afrika (KAA) 1955. Bayangkan, 29 negara dari Asia dan Afrika datang ke Bandung! Hasilnya? Dunia mulai mengakui eksistensi Indonesia sebagai bangsa yang berdaulat. Beliau juga yang menciptakan istilah "Nekolim" (Neo-Kolonialisme dan Imperialisme) sebagai musuh bersama. Tanpa Bung Karno, mungkin Indonesia masih jadi "negara tak bernama" di mata dunia.',
  },
  {
    id: 'hatta',
    name: 'Mohammad Hatta',
    role: 'Wakil Presiden ke-1 / Bapak Koperasi',
    period: '1945 - 1956',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/VP_Hatta.jpg',
    contribution: 'Meletakkan fondasi ekonomi kerakyatan melalui Koperasi.',
    bio: 'Seorang pemikir ekonomi dan organisator ulung yang percaya bahwa kemerdekaan politik harus dibarengi kemandirian ekonomi.',
    friendlyDesc: 'Bung Hatta ini pinter banget soal ekonomi. Waktu Indonesia baru merdeka, kondisi keuangan amburadul, belum lagi Belanda masih main blokade ekonomi. Bung Hatta lantas mencetuskan ide Koperasi sebagai tulang punggung ekonomi rakyat, bukan sistem kapitalis yang menguntungkan segelintir orang. Beliau juga berperan besar dalam Konferensi Meja Bundar (KMB) 1949, yang hasilnya Belanda resmi ngakuin kemerdekaan Indonesia. Tanpa Bung Hatta, ekonomi Indonesia mungkin akan diatur oleh asing, dan kita cuma jadi penonton di negeri sendiri.',
  },
  {
    id: 'sjahrir',
    name: 'Sutan Sjahrir',
    role: 'Perdana Menteri Pertama Indonesia',
    period: '1945 - 1947',
    image: 'https://images.squarespace-cdn.com/content/v1/5cecd9c1f824ce00010c16c0/1576124355957-4YOYEEPN1LRN91WD0HEU/SutanSjahrir.jpg',
    contribution: 'Memperjuangkan kedaulatan RI di forum internasional dan memimpin diplomasi awal.',
    bio: 'Intelektual muda yang menjadi arsitek diplomasi Indonesia untuk mendapatkan pengakuan dunia luar.',
    friendlyDesc: 'Sjahrir ini "duta keliling" Indonesia di masa-masa kritis. Waktu Belanda melancarkan Agresi Militer, Sjahrir bergerilya lewat jalur diplomasi. Beliau lobi ke PBB dan negara-negara berpengaruh kayak India, Australia, sampai AS. Hasilnya, PBB membentuk Komisi Tiga Negara (KTN) yang membantu menyelesaikan konflik Indonesia-Belanda. Bahkan, beliau pernah diasingkan Belanda karena dianggap terlalu vokal. Intinya, kalau perjuangan fisik dilakuin TNI, perjuangan di meja diplomasi itu dimotori Sjahrir. Beliau buktiin bahwa pena (atau lobbying) bisa sama tajamnya dengan pedang.',
  },
  {
    id: 'kartini',
    name: 'R.A. Kartini',
    role: 'Pahlawan Emansipasi Wanita',
    period: '1879 - 1904',
    image: 'https://awsimages.detik.net.id/community/media/visual/2023/10/31/ra-kartini.jpeg?w=500&q=90',
    contribution: 'Memperjuangkan hak pendidikan bagi perempuan dan kesetaraan sosial.',
    bio: 'Pioneer pergerakan perempuan yang ide-idenya menjadi landasan kesetaraan gender dalam politik modern Indonesia.',
    friendlyDesc: 'Kartini hidup di zaman ketika perempuan Jawa nggak boleh sekolah tinggi dan harus dipingit sampai menikah. Tapi Kartini berani banget! Lewat surat-suratnya yang dikirim ke sahabatnya di Belanda (Mr. J.H. Abendanon), beliau mengkritik habis-habisan diskriminasi terhadap perempuan. Surat-surat itu kemudian dibukukan jadi "Habis Gelap Terbitlah Terang". Hasilnya? Gerakan feminisme di Indonesia mulai bangkit. Sekolah-sekolah untuk perempuan mulai berdiri. Sekarang, kita punya menteri-menteri perempuan, CEO perempuan, bahkan presiden perempuan (Ibu Megawati). Semua itu dimulai dari pemikiran Kartini yang sederhana: "Perempuan punya hak buat sekolah!"',
  },
  {
    id: 'tjokroaminoto',
    name: 'H.O.S. Tjokroaminoto',
    role: 'Guru Bangsa / Pemimpin Sarekat Islam',
    period: '1912 - 1934',
    image: 'https://kesbangpol.bandaacehkota.go.id/wp-content/uploads/2017/12/cokroaminoto_1-291x300.jpg',
    contribution: 'Mempelopori pergerakan politik massa pertama di Indonesia melalui Sarekat Islam.',
    bio: 'Guru bagi tokoh-tokoh besar seperti Soekarno; dikenal sebagai "Raja Jawa Tanpa Mahkota" karena pengaruh politiknya.',
    friendlyDesc: 'Coba bayangin, ada satu orang yang murid-muridnya jadi presiden, wapres, dan perdana menteri. Itu Tjokroaminoto. Beliau mendirikan Sarekat Islam (SI), organisasi politik modern pertama di Indonesia yang punya anggota sampai 2,5 juta orang! Luar biasa kan? Tjokroaminoto mengajarkan bagaimana cara melakukan pergerakan politik yang terorganisir, bukan cuma protes-protesan. Beliau juga yang membentuk "Pesantren" sebagai pusat kaderisasi. Murid-muridnya? Ada Soekarno, Semaoen, Alimin, Musso, dan Kartosuwiryo. Meskipun beliau nggak pernah jadi presiden, tapi pemikirannya menginspirasi seluruh pergerakan nasional. Makanya dijuluki "De Ongekroonde Koning van Java" (Raja Jawa Tanpa Mahkota).',
  },
  {
    id: 'tan-malaka',
    name: 'Tan Malaka',
    role: 'Bapak Republik Indonesia',
    period: '1921 - 1949',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Tan_Malaka%2C_date_unknown.png',
    contribution: 'Penulis "Naar de Republiek Indonesia", konsep pertama tentang negara Republik Indonesia.',
    bio: 'Pemikir revolusioner yang menghabiskan hidupnya dalam pelarian demi memperjuangkan kemerdekaan penuh.',
    friendlyDesc: 'Tan Malaka ini orang yang pertama kali menulis konsep tentang "Republik Indonesia" secara rinci, jauh sebelum proklamasi 1945 lho! Dalam bukunya "Naar de Republiek Indonesia" (Menuju Republik Indonesia) tahun 1925, beliau udah ngegambarin gimana bentuk negara merdeka nanti. Ngeri kan? Karena tulisannya terlalu "revolusioner", beliau diburu Belanda dan harus hidup berpindah-pindah dari Singapura, Manila, Bangkok, sampai India. Selama perang kemerdekaan, Tan Malaka juga punya konsep "Perjuangan Rakyat Semesta" (gerilya total). Sayangnya, beliau justru diculik dan dieksekusi oleh pihak sendiri di tahun 1949, hanya beberapa bulan sebelum Belanda mengakui kemerdekaan. Ironis banget, tapi pemikirannya tetap menginspirasi.',
  },
  {
    id: 'soeharto',
    name: 'Jenderal Besar TNI (Purn.) H.M. Soeharto',
    role: 'Presiden RI ke-2',
    period: '1967–1998',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/59/President_Suharto%2C_1993.jpg',
    contribution: 'Menekankan stabilitas politik dan pembangunan infrastruktur (Revolusi Hijau).',
    bio: 'Presiden yang memimpin era Orde Baru dengan fokus pada pembangunan nasional.',
    friendlyDesc: 'Pak Harto memimpin Indonesia selama 32 tahun, waktu yang sangat panjang! Di masa pemerintahannya, beliau menerapkan "Revolusi Hijau" yang bikin Indonesia swasembada beras di tahun 1984. Bayangkan, dari negara importir beras, kita bisa berhenti beli beras dari luar negeri. Selain itu, pembangunan infrastruktur kayak jalan tol, listrik masuk desa, dan irigasi masif dilakukan. Di geopolitik, beliau ikut mendirikan ASEAN (1967) bareng Malaysia, Filipina, Singapura, dan Thailand. Namun sayangnya, di akhir masa jabatan, krisis moneter 1997-1998 meluluhlantakkan ekonomi. Rupiah anjlok dari Rp2.400 per dolar AS menjadi Rp16.800! Rakyat protes besar-besaran, dan Pak Harto akhirnya mundur tahun 1998. Kompleks memang, tapi kontribusinya di bidang pangan dan stabilitas nggak bisa dilupakan.',
  },
  {
    id: 'gusdur',
    name: 'Abdurrahman Wahid',
    role: 'Presiden ke-4 / Bapak Pluralisme',
    period: '1999 - 2001',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/President_Abdurrahman_Wahid_-_Indonesia.jpg',
    contribution: 'Memulihkan hak-hak sipil warga Tionghoa dan mengakui Konghucu sebagai agama resmi.',
    bio: 'Tokoh kemanusiaan yang dikenal dengan pendekatan humor dalam menyelesaikan konflik.',
    friendlyDesc: 'Gus Dur ini presiden yang unik banget. Mata nya hampir buta, tapi cara pandangnya paling jelas di antara yang lain. Di masa pemerintahannya yang hanya 21 bulan, beliau mencabut larangan terhadap budaya Tionghoa (Inpres No. 14 Tahun 1967), dan mengakui Konghucu sebagai agama resmi ke-6 di Indonesia. Bayangkan, Imlek baru boleh dirayakan bebas lagi setelah 32 tahun dilarang! Di kancah internasional, Gus Dur justru mendekati Israel secara diplomatik untuk membantu perdamaian Palestina (kontroversial banget tapi dianggap berani). Beliau juga yang mengizinkan pendirian sekolah-sekolah internasional dan membuka ruang dialog antar agama. Gus Dur juga sering melucu di tengah krisis, salah satu kutipannya yang terkenal: "Saya ini presiden, bukan diktator. Diktator itu pakai tongkat, saya pakai kacamata." Humornya jadi perekat bangsa saat hampir pecah karena konflik horizontal di Ambon dan Poso.',
  },
  {
    id: 'megawati',
    name: 'Megawati Soekarnoputri',
    role: 'Presiden ke-5 / Presiden Wanita Pertama',
    period: '2001 - 2004',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/President_Megawati_Sukarnoputri_-_Indonesia.jpg/1200px-President_Megawati_Sukarnoputri_-_Indonesia.jpg',
    contribution: 'Membentuk lembaga KPK dan menyelenggarakan Pemilu langsung pertama tahun 2004.',
    bio: 'Putri proklamator yang membawa stabilitas politik pasca krisis.',
    friendlyDesc: 'Ibu Mega adalah presiden perempuan pertama di Indonesia dan Asia Tenggara. Waktu beliau naik tahun 2001, Indonesia masih berdarah-darah karena konflik di Aceh, Papua, dan Poso. Beliau mengambil langkah tegas dengan memberlakukan Darurat Militer di Aceh (2003-2004) yang akhirnya meredakan gerakan separatis GAM. Di ekonomi, beliau mewarisi utang luar negeri besar pasca krisis, tapi berhasil menurunkan rasio utang terhadap PDB. Pencapaian terbesarnya? Membentuk Komisi Pemberantasan Korupsi (KPK) lewat UU No. 30 Tahun 2002. Dan di tahun 2004, untuk pertama kalinya rakyat Indonesia memilih presiden secara langsung (sebelumnya dipilih MPR). Meskipun beliau kalah dari SBY di pemilu tersebut, warisan KPK dan Pemilu langsung masih kita rasakan sampai sekarang.',
  },
  {
    id: 'prabowo',
    name: 'Prabowo Subianto',
    role: 'Presiden RI ke-8',
    period: '2024 - Sekarang',
    image: 'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS6BG0QnyNRGPhMtH8Ky-QvhS_PGGtCCFolTB9uhTN-2oEgyLF50NmtKSZv85j3Q2yzGzYIbrdTK5-Vyfo',
    contribution: 'Memimpin pemerintahan dengan fokus pada ketahanan pangan, energi, dan hilirisasi industri.',
    bio: 'Mantan Danjen Kopassus dan Menteri Pertahanan yang kini memimpin Indonesia periode 2024-2029.',
    friendlyDesc: 'Pak Prabowo ini perjalanan karirnya panjang banget. Dari tentara (eks Danjen Kopassus dan KOPASSUS), lalu jadi pengusaha, menteri pertahanan, sekarang presiden. Beliau menjabat mulai 20 Oktober 2024. Di posisi presiden, beliau fokus banget pada "hilirisasi" — mengolah bahan mentah di dalam negeri sebelum diekspor. Contohnya, kita dulu ekspor nikel mentah ke China, sekarang kita bikin baterai kendaraan listrik sendiri. Targetnya, Indonesia bisa jadi pemain utama industri kendaraan listrik dunia. Di bidang geopolitik, Pak Prabowo terkenal dengan pendekatan "sahabat semua negara". Beliau dekat dengan China (investasi besar), juga dekat dengan AS dan Australia (latihan militer bersama). Ini strategi "bebas-aktif" ala Indonesia modern: tidak memihak, tapi manfaatkan semua peluang. Mampukah beliau membawa Indonesia jadi negara maju di 2045 (100 tahun Indonesia Merdeka)? Kita tunggu aja!',
  },
  {
    id: 'gibran',
    name: 'Gibran Rakabuming Raka',
    role: 'Wakil Presiden ke-14',
    period: '2024 - Sekarang',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Gibran_Rakabuming_2024_official_portrait.jpg',
    contribution: 'Wakil Presiden termuda dalam sejarah Indonesia, fokus pada pengembangan UMKM.',
    bio: 'Mantan Wali Kota Surakarta yang kini menjabat sebagai Wakil Presiden mendampingi Prabowo Subianto.',
    friendlyDesc: 'Mas Gibran ini anak sulung Presiden Jokowi. Tapi jangan salah, beliau nggak dapat posisi wakil presiden cuma karena "anak presiden". Sebelumnya, beliau sukses jadi pengusaha (katering, martabak, hingga kafe), lalu jadi Wali Kota Solo (2021-2024). Di Solo, beliau dikenal inovatif: bikin aplikasi "Solo Warga" buat aduan warga, revitalisasi taman kota, dan mendorong digitalisasi UMKM. Sekarang sebagai wakil presiden termuda (37 tahun saat dilantik 2024), Mas Gibran punya tugas besar: mendampingi Pak Prabowo dan fokus pada program prioritas seperti makan siang bergizi gratis untuk anak sekolah. Beliau juga dijuluki "wakil rakyat muda" karena dianggap bisa menjembatani aspirasi generasi milenial dan Gen Z yang mendominasi pemilih Pemilu 2024. Apakah beliau akan sukses? Banyak yang optimis karena Mas Gibran dikenal pekerja keras dan dekat dengan rakyat kecil. Tapi tentu saja, jadi wapres jauh lebih berat daripada jadi wali kota. Doain yang terbaik untuk Indonesia!',
  },
];

// --- 3. KOMPONEN GLOSARIUM POPUP ---
const GlossaryPopup = ({ term, onClose, position }) => {
  const termLower = term.toLowerCase();
  const data = glossaryData[termLower] || {
    definition: `Definisi untuk "${term}" sedang dalam pengembangan.`,
    example: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      style={{
        position: 'fixed',
        top: position.y - 150,
        left: position.x - 200,
        zIndex: 9999,
      }}
      className="w-96 bg-black text-white p-6 rounded-2xl border-4 border-red-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xl font-black uppercase text-red-500">{term}</h4>
        <button
          onClick={onClose}
          className="text-white hover:text-red-500 text-xl font-bold"
        >
          X
        </button>
      </div>
      <p className="text-sm mb-4 leading-relaxed">{data.definition}</p>
      {data.example && (
        <div className="border-t border-white/20 pt-4 mt-2">
          <p className="text-xs font-black text-red-400 mb-2">CONTOH:</p>
          <p className="text-sm italic opacity-80">{data.example}</p>
        </div>
      )}
    </motion.div>
  );
};

// --- 4. KOMPONEN TEKS DENGAN GLOSARIUM ---
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
        const cleanWord = word.replace(/[.,!?;:()]/g, '').toLowerCase();
        const isHardWord = hardWords.includes(cleanWord);

        if (isHardWord) {
          return (
            <React.Fragment key={index}>
              <span
                onClick={(e) => handleWordClick(e, cleanWord)}
                className="cursor-pointer border-b-2 border-dotted border-red-600 hover:bg-red-600 hover:text-white transition-colors px-1"
                title={`Klik untuk definisi ${cleanWord}`}
              >
                {word}
              </span>{' '}
            </React.Fragment>
          );
        }
        return <span key={index}>{word} </span>;
      })}

      <AnimatePresence>
        {activeTerm && (
          <>
            {createPortal(
              <>
                <div
                  className="fixed inset-0 z-[9998]"
                  onClick={() => setActiveTerm(null)}
                />
                <GlossaryPopup
                  term={activeTerm}
                  onClose={() => setActiveTerm(null)}
                  position={popupPosition}
                />
              </>,
              document.body
            )}
          </>
        )}
      </AnimatePresence>
    </span>
  );
};

// --- 5. KOMPONEN NAMA DENGAN PROFIL TOKOH ---
const NameWithProfile = ({ name }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const findTokoh = (searchName) => {
    const searchLower = searchName.toLowerCase();
    return tokohBangsa.find(
      (tokoh) =>
        tokoh.name.toLowerCase().includes(searchLower) ||
        searchLower.includes(tokoh.name.toLowerCase().split(' ')[0])
    );
  };

  const tokoh = findTokoh(name);

  if (!tokoh) return <span>{name}</span>;

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopupPosition({ x: rect.left + rect.width / 2, y: rect.top });
    setShowProfile(true);
  };

  return (
    <>
      <span
        onClick={handleClick}
        className="cursor-pointer font-bold bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded border-b-2 border-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
        title={`Klik untuk profil ${tokoh.name}`}
      >
        {name}
      </span>

      <AnimatePresence>
        {showProfile &&
          createPortal(
            <>
              <div
                className="fixed inset-0 z-[9998]"
                onClick={() => setShowProfile(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                style={{
                  position: 'fixed',
                  top: popupPosition.y - 300,
                  left: popupPosition.x - 250,
                  zIndex: 9999,
                }}
                className="w-96 bg-white dark:bg-zinc-900 p-6 rounded-2xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(220,38,38,1)]"
              >
                <button
                  onClick={() => setShowProfile(false)}
                  className="absolute top-4 right-4 text-black dark:text-white hover:text-red-600 text-xl font-bold"
                >
                  X
                </button>

                <div className="flex gap-4">
                  <img
                    src={tokoh.image}
                    alt={tokoh.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 object-cover rounded-xl border-2 border-black"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                  <div>
                    <h4 className="text-lg font-black uppercase leading-tight">
                      {tokoh.name}
                    </h4>
                    <p className="text-red-600 font-black text-xs mt-1">
                      {tokoh.role}
                    </p>
                    <p className="text-xs font-mono mt-1">{tokoh.period}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <p className="font-bold mb-2">Kontribusi:</p>
                  <p className="italic opacity-80">"{tokoh.contribution}"</p>
                </div>
              </motion.div>
            </>,
            document.body
          )}
      </AnimatePresence>
    </>
  );
};

// --- 6. KOMPONEN PROSES TEKS OTOMATIS ---
const SmartText = ({ text }) => {
  if (!text || typeof text !== 'string') return null;
  const knownNames = tokohBangsa.map((t) => t.name);
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const nameRegex = new RegExp(`(${knownNames.map(escapeRegExp).join('|')})`, 'g');

  const parts = text.split(nameRegex);

  return (
    <span className="leading-relaxed block">
      {parts.map((part, index) => {
        if (knownNames.includes(part)) {
          return <NameWithProfile key={index} name={part} />;
        }
        return <TextWithGlossary key={index} text={part} />;
      })}
    </span>
  );
};

// --- 7. KOMPONEN TABEL DATA ---
const DataTable = ({ data, columns }) => {
  if (!data || data.length === 0) return null;

  const keys = columns || Object.keys(data[0]);

  return (
    <div className="overflow-x-auto my-6 border-2 border-black rounded-xl">
      <table className="min-w-full divide-y divide-black">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {keys.map((key, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-xs font-black uppercase tracking-wider"
              >
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
                  {key === 'perubahan' && row.status === 'naik' && (
                    <TrendingUp className="inline ml-2 text-green-600 w-4 h-4" />
                  )}
                  {key === 'perubahan' && row.status === 'turun' && (
                    <TrendingDown className="inline ml-2 text-red-600 w-4 h-4" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ==========================================
// 8. DATA MODUL (LENGKAP 20 MODUL)
// ==========================================

const modules = [
  // === MODUL 1: HAKEKAT POLITIK ===
  {
    id: 'hakekat-politik',
    title: 'Hakekat Politik',
    desc: 'Seni dan ilmu pengelolaan kekuasaan, pengambilan keputusan, serta perumusan kebijakan publik untuk mencapai tujuan bersama, kebaikan umum, dan kesejahteraan rakyat.',
    icon: '⚖️',
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
      dataUtama: {
        judul: 'Indeks Kualitas Kebijakan Publik 2025',
        periode: 'Januari - September 2025',
        sumber: 'Kementerian PANRB',
        data: [
          { indikator: 'Partisipasi Masyarakat', skor: 78.5, perubahan: '+2.3' },
          { indikator: 'Transparansi Kebijakan', skor: 72.1, perubahan: '+1.8' },
          { indikator: 'Akuntabilitas Publik', skor: 69.7, perubahan: '-0.5' },
          { indikator: 'Responsivitas Pemerintah', skor: 74.2, perubahan: '+3.1' },
        ],
      },
      subSections: [
        {
          title: 'Kekuasaan & Etika dalam Praktik Terkini',
          content: 'Implementasi etika politik di lingkungan pemerintahan 2025',
          data: ['LHKPN: 87% pejabat wajib lapor telah menyerahkan laporan (target 95%)', 'Kasus pelanggaran etik DPR: 12 laporan ke MKD sepanjang 2025', 'Putusan DKPP: 8 penyelenggara pemilu dijatuhi sanksi etik'],
        },
        {
          title: 'Kebijakan Publik Prioritas 2025',
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

  // === MODUL 2: LEMBAGA NEGARA ===
  {
    id: 'lembaga-negara',
    title: 'Lembaga Negara',
    desc: 'Organisasi pemerintahan pusat yang dibentuk berdasarkan UUD 1945, undang-undang, atau peraturan lebih rendah, untuk menjalankan fungsi legislatif, eksekutif, dan yudikatif.',
    icon: '🏛️',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Lembaga negara Indonesia adalah organisasi pemerintahan pusat yang dibentuk berdasarkan UUD 1945, undang-undang, atau peraturan lebih rendah, untuk menjalankan fungsi legislatif, eksekutif, dan yudikatif. Utama (tinggi) negara meliputi MPR, DPR, DPD, Presiden/Wakil Presiden, MA, MK, dan BPK. Mereka menjaga demokrasi dan hukum.',
      bagianLembaga: [
        {
          kategori: 'Lembaga Legislatif (Pembuat Undang-Undang)',
          desc: 'Lembaga legislatif berfungsi membentuk peraturan perundang-undangan dan melakukan pengawasan terhadap jalannya pemerintahan.',
          lembaga: [
            { nama: 'Majelis Permusyawaratan Rakyat (MPR)', ketua: 'Ahmad Muzani', tugas: 'Berwenang mengubah dan menetapkan Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 serta melantik Presiden dan Wakil Presiden.' },
            { nama: 'Dewan Perwakilan Rakyat (DPR)', ketua: 'Puan Maharani', tugas: 'Bertugas membentuk undang-undang bersama Presiden, menyusun anggaran negara, dan mengawasi kebijakan pemerintah.' },
            { nama: 'Dewan Perwakilan Daerah (DPD)', ketua: 'Sultan Bachtiar Najamudin', tugas: 'Mewakili kepentingan daerah dengan mengajukan dan membahas rancangan undang-undang yang berkaitan dengan otonomi daerah, hubungan pusat–daerah, dan perimbangan keuangan.' },
          ],
        },
        {
          kategori: 'Lembaga Eksekutif (Pelaksana Undang-Undang)',
          desc: 'Lembaga eksekutif menjalankan undang-undang dan menyelenggarakan pemerintahan negara.',
          lembaga: [
            { nama: 'Presiden dan Wakil Presiden', ketua: 'Prabowo Subianto & Gibran Rakabuming Raka', tugas: 'Presiden adalah kepala negara sekaligus kepala pemerintahan, dibantu oleh Wakil Presiden dalam menjalankan tugas pemerintahan.' },
            { nama: 'Kementerian Negara', ketua: 'Lihat daftar kabinet', tugas: 'Membantu Presiden dalam menyelenggarakan urusan pemerintahan di bidang tertentu seperti pendidikan, kesehatan, pertahanan, dan keuangan.' },
          ],
        },
        {
          kategori: 'Lembaga Yudikatif (Kekuasaan Kehakiman)',
          desc: 'Lembaga yudikatif berfungsi menegakkan hukum dan keadilan secara independen.',
          catatan: 'independen berarti bebas dari campur tangan kekuasaan lain',
          lembaga: [
            { nama: 'Mahkamah Agung (MA)', ketua: 'Sunarto', tugas: 'Merupakan pengadilan tertinggi yang memeriksa dan memutus perkara pada tingkat kasasi serta mengawasi peradilan di bawahnya.' },
            { nama: 'Mahkamah Konstitusi (MK)', ketua: 'Suhartoyo', tugas: 'Berwenang menguji undang-undang terhadap UUD 1945, menyelesaikan sengketa kewenangan antar lembaga negara, serta memutus sengketa hasil pemilu.' },
            { nama: 'Komisi Yudisial (KY)', ketua: 'Abdul Chair Ramadhan', tugas: 'Bertugas menjaga dan mengawasi kehormatan, keluhuran martabat, serta perilaku hakim.' },
          ],
        },
        {
          kategori: 'Lembaga Eksaminatif / Auditor (Pemeriksa Keuangan Negara)',
          desc: 'Lembaga ini berfungsi mengawasi pengelolaan dan tanggung jawab keuangan negara.',
          lembaga: [
            { nama: 'Badan Pemeriksa Keuangan (BPK)', ketua: 'Isma Yatun', tugas: 'Memeriksa pengelolaan dan penggunaan keuangan negara untuk menjamin transparansi dan akuntabilitas.' },
          ],
        },
        {
          kategori: 'Lembaga Negara Lainnya (Lembaga Independen / Pendukung Negara)',
          desc: 'Lembaga ini dibentuk untuk mendukung penyelenggaraan negara secara profesional dan independen.',
          lembaga: [
            { nama: 'Komisi Pemilihan Umum (KPU)', ketua: 'Mochammad Afifuddin', tugas: 'Bertugas menyelenggarakan pemilihan umum secara langsung, umum, bebas, rahasia, jujur, dan adil.' },
            { nama: 'Komisi Pemberantasan Korupsi (KPK)', ketua: 'Setyo Budiyanto', tugas: 'Berperan dalam pencegahan dan pemberantasan tindak pidana korupsi.' },
            { nama: 'Bank Indonesia (BI)', ketua: 'Perry Warjiyo', tugas: 'Merupakan bank sentral yang bertugas menjaga stabilitas nilai rupiah dan sistem keuangan.' },
            { nama: 'Kepolisian Negara Republik Indonesia (Polri)', ketua: 'Listyo Sigit Prabowo', tugas: 'Bertanggung jawab menjaga keamanan dan ketertiban masyarakat serta menegakkan hukum.' },
          ],
        },
      ],
      triasPolitica: {
        pengertian: 'Trias Politika adalah konsep politik yang membagi kekuasaan pemerintahan negara menjadi tiga cabang utama, yaitu legislatif, eksekutif, dan yudikatif untuk mencegah absolutisme dan penyalahgunaan kekuasaan. Dicetuskan oleh John Locke dan dikembangkan oleh Montesquieu, konsep ini menerapkan sistem check and balance agar setiap lembaga saling mengawasi dan mengimbangi.',
        perbedaanPandangan: [
          {
            tokoh: 'John Locke',
            deskripsi: 'Membagi kekuasaan negara menjadi tiga, tetapi berbeda jenisnya dengan Trias Politica modern:',
            poin: [
              { nama: 'Legislatif', desc: 'Kekuasaan tertinggi untuk membuat undang-undang.' },
              { nama: 'Eksekutif', desc: 'Kekuasaan untuk melaksanakan undang-undang dan mengurus pemerintahan sehari-hari.' },
              { nama: 'Federatif', desc: 'Kekuasaan yang mengatur hubungan luar negeri, seperti perang, perdamaian, dan diplomasi.' },
            ],
            catatan: 'Locke tidak memisahkan kekuasaan yudikatif secara khusus. Kekuasaan mengadili dianggap bagian dari eksekutif.',
          },
          {
            tokoh: 'Montesquieu',
            deskripsi: 'Menyempurnakan gagasan Locke dan merumuskan Trias Politica yang dikenal dan digunakan sekarang:',
            poin: [
              { nama: 'Legislatif', desc: 'Membuat undang-undang.' },
              { nama: 'Eksekutif', desc: 'Melaksanakan undang-undang dan menjalankan pemerintahan.' },
              { nama: 'Yudikatif', desc: 'Mengadili dan menegakkan hukum secara independen.' },
            ],
            catatan: 'Menekankan pemisahan tegas antar kekuasaan. Setiap kekuasaan tidak boleh saling mencampuri. Bertujuan mencegah tirani dan penyalahgunaan kekuasaan.',
          },
        ],
      },
      dataUtama: {
        judul: 'Komposisi Lembaga Tinggi Negara 2024-2029',
        periode: 'Hasil Pemilu 2024',
        sumber: 'KPU RI',
        data: [
          { lembaga: 'Presiden & Wakil Presiden', hasil: 'Prabowo-Gibran', periode: '2024-2029' },
          { lembaga: 'DPR RI', hasil: '8 partai (58% kursi)', periode: '2024-2029' },
          { lembaga: 'DPD RI', hasil: '152 anggota', periode: '2024-2029' },
          { lembaga: 'MPR RI', hasil: '711 anggota (DPR+DPD)', periode: '2024-2029' },
        ],
      },
      subSections: [
        {
          title: 'Kinerja Lembaga Negara 2025',
          content: 'Capaian dan tantangan lembaga negara semester I 2025',
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

  // === MODUL 3: SISTEM DEMOKRASI (LENGKAP + MATERI PEMILU + DATA BERITA KPU) ===
  {
    id: 'sistem-demokrasi',
    title: 'Sistem Demokrasi',
    desc: 'Bentuk pemerintahan di mana kedaulatan atau kekuasaan tertinggi berada di tangan rakyat, baik secara langsung maupun melalui perwakilan.',
    icon: '🗳️',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Demokrasi adalah bentuk pemerintahan di mana kedaulatan atau kekuasaan tertinggi berada di tangan rakyat. Rakyat memiliki hak setara dalam pengambilan keputusan yang memengaruhi hidup mereka, baik secara langsung maupun melalui perwakilan. Di Indonesia, kita menganut Demokrasi Pancasila, yang memiliki ciri khas: (a) Mengutamakan Musyawarah untuk Mufakat, (b) Semangat Gotong Royong, (c) Keseimbangan antara hak dan kewajiban warga negara.',
      prinsipUtama: [
        { nama: 'Kedaulatan Rakyat', desc: 'Rakyat adalah sumber kekuasaan negara.' },
        { nama: 'Pemerintahan Berdasarkan Persetujuan', desc: 'Pemerintah memperoleh mandat melalui Pemilu yang jujur dan kompetitif.' },
        { nama: 'Perlindungan HAM', desc: 'Menjamin kebebasan berpendapat, beragama, dan berkumpul.' },
        { nama: 'Kesetaraan di Depan Hukum', desc: 'Tidak ada warga negara yang kebal hukum (Equality before the law).' },
        { nama: 'Trias Politica', desc: 'Pembagian kekuasaan agar tidak terjadi tirani.' },
      ],
      jenisDemokrasi: [
        { jenis: 'Demokrasi Langsung', desc: 'Rakyat ikut serta secara personal dalam membahas dan memutus kebijakan negara (contoh: referendum).' },
        { jenis: 'Demokrasi Tidak Langsung (Perwakilan)', desc: 'Rakyat memilih wakil-wakilnya (anggota parlemen) melalui Pemilu untuk duduk di pemerintahan dan mengambil keputusan atas nama rakyat.' },
      ],
      apaItuPemilu: {
        judul: 'Apa Itu Pemilu?',
        pengertian: 'Pemilihan Umum (Pemilu) adalah sarana pelaksanaan kedaulatan rakyat yang dilaksanakan secara langsung, umum, bebas, rahasia, jujur, dan adil dalam Negara Kesatuan Republik Indonesia berdasarkan Pancasila dan Undang-Undang Dasar 1945.',
        fungsiPemilu: [
          'Memilih wakil rakyat di DPR, DPD, dan DPRD',
          'Memilih Presiden dan Wakil Presiden',
          'Memilih kepala daerah (Gubernur, Bupati, Wali Kota) melalui Pilkada',
          'Menjamin pergantian kepemimpinan secara damai dan konstitusional',
          'Mewujudkan akuntabilitas pejabat publik terhadap rakyat',
        ],
      },
      prinsipPemilu: {
        judul: 'Asas Pemilu: LUBER JURDIL',
        penjelasan: 'Pemilu di Indonesia berlandaskan 6 asas yang disingkat LUBER JURDIL. Asas ini adalah jaminan bahwa Pemilu berlangsung demokratis.',
        daftar: [
          { asas: 'Langsung', desc: 'Rakyat memberikan suaranya secara langsung, tanpa perantara.' },
          { asas: 'Umum', desc: 'Semua warga negara yang memenuhi syarat berhak ikut memilih (tidak diskriminatif).' },
          { asas: 'Bebas', desc: 'Pemilih bebas menentukan pilihannya tanpa tekanan atau paksaan.' },
          { asas: 'Rahasia', desc: 'Pilihan pemilih dirahasiakan untuk mencegah intervensi.' },
          { asas: 'Jujur', desc: 'Proses penyelenggaraan Pemilu harus sesuai aturan, tidak ada kecurangan.' },
          { asas: 'Adil', desc: 'Setiap pemilih dan peserta Pemilu diperlakukan sama.' },
        ],
      },
      jenisPemiluDiIndonesia: {
        judul: 'Jenis-Jenis Pemilu di Indonesia',
        catatan: 'Sebagai negara demokrasi, Indonesia rutin mengadakan Pemilu untuk memilih berbagai tingkatan pemerintahan.',
        data: [
          { jenis: 'Pemilu Legislatif (Pileg)', desc: 'Memilih anggota DPR, DPD, DPRD Provinsi, dan DPRD Kabupaten/Kota. Diselenggarakan setiap 5 tahun sekali.', tahunTerakhir: '2024', tahunBerikutnya: '2029' },
          { jenis: 'Pemilu Presiden (Pilpres)', desc: 'Memilih Presiden dan Wakil Presiden secara langsung. Diselenggarakan setiap 5 tahun sekali.', tahunTerakhir: '2024', tahunBerikutnya: '2029' },
          { jenis: 'Pemilihan Kepala Daerah (Pilkada)', desc: 'Memilih Gubernur, Bupati, dan Wali Kota. Saat ini dilaksanakan secara serentak.', tahunTerakhir: '2024', tahunBerikutnya: '2029' },
        ],
      },
      tahapanPemilu: {
        judul: 'Tahapan Penyelenggaraan Pemilu',
        penjelasan: 'Agar demokrasi berjalan dengan baik, Pemilu harus mengikuti tahapan yang terencana. Berikut tahapan umum Pemilu di Indonesia:',
        daftarTahapan: [
          'Perencanaan dan Penetapan Jadwal: KPU menentukan jadwal lengkap Pemilu.',
          'Pendaftaran dan Verifikasi Partai Politik: Hanya partai yang memenuhi syarat yang boleh ikut.',
          'Pendaftaran Calon: Calon legislatif, presiden, atau kepala daerah mendaftar ke KPU.',
          'Kampanye: Masa sosialisasi program dan visi-misi calon.',
          'Masa Tenang: Tidak ada kampanye, pemilih diminta merenungkan pilihannya.',
          'Pemungutan dan Penghitungan Suara: Hari H pemilihan di TPS.',
          'Rekapitulasi dan Penetapan Hasil: Penghitungan suara secara berjenjang hingga pusat.',
          'Penyelesaian Sengketa: Jika ada keberatan, diajukan ke Bawaslu atau MK.',
        ],
      },
      demokrasiDanPemilu: {
        judul: 'Pemilu: Jantung Demokrasi',
        penjelasan: 'Pemilihan Umum (Pemilu) adalah instrumen utama dalam sistem demokrasi modern. Di Indonesia, Pemilu menjadi sarana bagi rakyat untuk menjalankan kedaulatannya secara langsung. Tanpa Pemilu yang bebas, jujur, dan adil, demokrasi hanya akan menjadi konsep kosong.',
        mengapaPemiluPentingDalamDemokrasi: [
          'Legitimasi Pemerintah: Pemilu memberikan mandat resmi dari rakyat kepada pemimpin yang terpilih.',
          'Pergantian Kekuasaan yang Damai: Pemilu memungkinkan pergantian kepemimpinan tanpa kekerasan atau kudeta.',
          'Akuntabilitas: Pejabat publik akan berpikir dua kali untuk menyalahgunakan kekuasaan karena mereka harus mempertanggungjawabkan kinerjanya di Pemilu berikutnya.',
          'Partisipasi Politik: Pemilu melatih warga negara untuk terlibat aktif dalam proses politik, bukan hanya sebagai penonton.',
        ],
        hubunganDenganDemokrasiPancasila: 'Dalam Demokrasi Pancasila, Pemilu tidak hanya sekadar kontestasi kekuasaan, tetapi juga sarana untuk memperkuat persatuan dan musyawarah. Karena itu, kampanye di Indonesia diatur agar tidak memecah belah bangsa (dilarang menyerang SARA) dan harus berorientasi pada gagasan, bukan sekadar popularitas.',
      },
      tantanganPemiluEraDigital: {
        judul: 'Tantangan Pemilu di Era Digital',
        penjelasan: 'Kemajuan teknologi membawa angin segar sekaligus ancaman serius bagi demokrasi dan Pemilu.',
        tantangan: [
          { nama: 'Hoaks dan Disinformasi', desc: 'Berita palsu bisa mempengaruhi opini publik dan hasil Pemilu.' },
          { nama: 'Polarisasi di Medsos', desc: 'Media sosial sering memecah belah masyarakat berdasarkan pilihan politik.' },
          { nama: 'Politik Uang Digital', desc: 'Praktik suap kini dilakukan lewat transfer uang elektronik yang sulit dilacak.' },
          { nama: 'Serangan Siber', desc: 'Potensi peretasan terhadap sistem rekapitulasi suara KPU.' },
        ],
        solusi: 'Bawaslu dan KPU bekerja sama dengan Kominfo dan platform digital untuk memerangi hoaks. Masyarakat juga didorong untuk memiliki literasi digital yang tinggi agar tidak mudah termakan provokasi.',
      },
      partisipasiPemudaDalamPemilu: {
        judul: 'Peran Generasi Muda dalam Pemilu',
        dataPemilu2024: 'Pada Pemilu 2024, pemilih muda (Gen Z dan Milenial) mendominasi hingga 56% dari total DPT (sekitar 114 juta pemilih).',
        bentukPartisipasi: [
          'Menjadi pemilih cerdas: Mengecek fakta, tidak golput.',
          'Menjadi relawan atau saksi di TPS.',
          'Mengawasi jalannya Pemilu melalui media sosial.',
          'Bergabung dengan organisasi kepemudaan atau partai politik.',
        ],
        pesan: 'Demokrasi bukan hanya tentang hari pemungutan suara. Partisipasi muda dalam mengawasi kebijakan setelah Pemilu sama pentingnya untuk memastikan janji kampanye benar-benar diwujudkan.',
      },
      indeksPartisipasiPemilu: {
        judul: 'KPU Luncurkan Indeks Partisipasi Pemilu (IPP) 2024',
        tanggal: '10 Februari 2025',
        lokasi: 'Ruang Sidang Utama KPU, Jakarta',
        sumber: 'kpu.go.id',
        penjelasan: 'Komisi Pemilihan Umum (KPU) resmi meluncurkan Indeks Partisipasi Pemilu (IPP) 2024. IPP merupakan alat untuk mengukur peran serta masyarakat dalam setiap proses tahapan pemilu. IPP diletakkan sebagai bagian upaya untuk menghadirkan potret lebih utuh tentang partisipasi masyarakat dalam pemilu.',
        capaianPartisipasi: [
          { jenisPemilu: 'Pemilu Presiden (Pilpres)', tingkatPartisipasi: '81,48%', keterangan: 'Tertinggi' },
          { jenisPemilu: 'Pemilu Legislatif (Pileg)', tingkatPartisipasi: '81,14%', keterangan: 'Sangat Tinggi' },
          { jenisPemilu: 'Pemilu DPD', tingkatPartisipasi: '81,50%', keterangan: 'Tertinggi' },
        ],
        pernyataanKPU: 'Anggota KPU August Mellaz menyatakan, "Tingkat partisipasi Pemilu Presiden 81,48 persen, Pemilu Legislatif 81,14 persen, dan DPD 81,50 persen, ini capaian yang luar biasa pada Pemilu Serentak 2024."',
        metodologiIPP: 'IPP disusun oleh para pakar dari luar KPU untuk meminimalisir subyektifitas, dengan metodologi kualitatif dan kuantitatif. Segala kerangka, konsep, dimensi, variabel, hingga indikator, dapat memilah mana porsinya KPU. Mengingat untuk menggerakkan pemilih ke TPS juga ada kontribusi dari peserta pemilu.',
        peluncuran: 'Pada seremoni peluncuran ini, Ketua KPU Mochammad Afifuddin bersama Anggota KPU August Mellaz, Idham Holik, dan Parsadaan Harahap, didampingi Bawaslu dan DKPP, menekan tombol peluncuran yang kemudian menampilkan tayangan video hasil IPP yang disaksikan seluruh tamu undangan dari Wakapolri, Ketua Bawaslu, DKPP, TNI, Kejaksaan, perwakilan Kementerian/Lembaga, BUMN, BUMD, Perusahaan Swasta, KPU Provinsi seluruh Indonesia, NGO, Pemerhati Pemilu, dan media massa.',
      },
      rekomendasiSosialisasiPemilu: {
        judul: 'Masukan dari Komisi II DPR RI untuk KPU',
        narasumber: 'Muhammad Rifqinizamy Karsayuda (Ketua Komisi II DPR RI)',
        poinMasukan: [
          'KPU perlu memilih segmen sosialisasi yang tidak duplikatif dan tidak terjangkau para politisi atau peserta pemilu.',
          'KPU dapat melakukan sosialisasi di sekolah, seperti menjadi inspektur upacara — tidak perlu alokasi anggaran dan hal itu tidak mungkin dilakukan oleh politisi maupun peserta pemilu.',
          'KPU dapat melakukan sosialisasi yang isinya ideologis, seperti kenapa harus ke TPS, dan apa pentingnya pemilih pemula.',
        ],
      },
      sejarahDemokrasi: [
        { periode: 'Demokrasi Parlementer/Liberal (1950–1959)', desc: 'Sistem di mana parlemen sangat kuat dan sering terjadi pergantian kabinet.' },
        { periode: 'Demokrasi Terpimpin (1959–1965)', desc: 'Kekuasaan cenderung berpusat pada satu tangan, yakni Presiden Soekarno.' },
        { periode: 'Demokrasi Pancasila Era Orde Baru (1966–1998)', desc: 'Menitikberatkan pada stabilitas politik untuk pembangunan ekonomi, namun partisipasi politik rakyat dibatasi.' },
        { periode: 'Demokrasi Pancasila Era Reformasi (1998–Sekarang)', desc: 'Fase keterbukaan. Kebebasan pers dijamin, Pemilu dilakukan secara langsung, dan transparansi pemerintahan lebih dijunjung tinggi.' },
      ],
      dataUtama: {
        judul: 'Indeks Demokrasi Indonesia (IDI) 2025',
        periode: 'Tahun 2025',
        sumber: 'Kemenko Polkam & BPS',
        peringkat: [
          { provinsi: 'DI Yogyakarta', skor: 89.25, perubahan: '+5.37', status: 'naik' },
          { provinsi: 'DKI Jakarta', skor: 84.67, perubahan: '+2.10', status: 'naik' },
          { provinsi: 'Jawa Tengah', skor: 83.42, perubahan: '+1.80', status: 'naik' },
          { provinsi: 'Bali', skor: 82.91, perubahan: '+0.50', status: 'naik' },
          { provinsi: 'Jawa Timur', skor: 81.73, perubahan: '-0.30', status: 'turun' },
        ],
      },
      subSections: [
        {
          title: '3 Aspek IDI 2025',
          content: 'Performa demokrasi berdasarkan tiga aspek utama',
          data: [
            { aspek: 'Kebebasan Sipil', skorNasional: 85.3, provinsiTertinggi: 'DIY (92.1)' },
            { aspek: 'Kesetaraan', skorNasional: 79.8, provinsiTertinggi: 'Bali (88.4)' },
            { aspek: 'Kapasitas Lembaga', skorNasional: 81.2, provinsiTertinggi: 'Jateng (87.6)' },
          ],
        },
        {
          title: 'Indeks Partisipasi Pemilu (IPP) 2024',
          content: 'Data capaian partisipasi masyarakat dalam Pemilu Serentak 2024 (Sumber: KPU)',
          data: [
            { kategori: 'Partisipasi Pilpres', persentase: '81,48%', status: 'Luar Biasa' },
            { kategori: 'Partisipasi Pileg', persentase: '81,14%', status: 'Luar Biasa' },
            { kategori: 'Partisipasi DPD', persentase: '81,50%', status: 'Luar Biasa' },
            { kategori: 'Rata-rata Partisipasi', persentase: '81,37%', status: 'Tertinggi dalam Sejarah Pemilu Indonesia' },
          ],
        },
        {
          title: 'Rekomendasi Sosialisasi Pemilu ke Depan',
          content: 'Masukan dari Komisi II DPR RI kepada KPU (Sumber: Berita KPU 10 Februari 2025)',
          data: [
            'Sosialisasi di sekolah (inspektur upacara) tanpa alokasi anggaran tambahan',
            'Edukasi ideologis: "Kenapa harus ke TPS?" dan pentingnya pemilih pemula',
            'Hindari segmentasi sosialisasi yang duplikatif dengan politisi/partai politik',
          ],
        },
        {
          title: 'Pemangku Kepentingan yang Hadir dalam Launching IPP',
          content: 'Daftar institusi yang menyaksikan peluncuran Indeks Partisipasi Pemilu 2024 di KPU',
          data: [
            'Wakapolri, Ketua Bawaslu, DKPP, TNI, Kejaksaan',
            'Kementerian/Lembaga, BUMN, BUMD, Perusahaan Swasta',
            'KPU Provinsi seluruh Indonesia, NGO, Pemerhati Pemilu, Media massa',
          ],
        },
      ],
    },
  },

  // === MODUL 4: MEKANISME PEMILU ===
  {
    id: 'mekanisme-pemilu',
    title: 'Mekanisme Pemilu',
    desc: 'Wujud nyata kedaulatan rakyat dengan asas Luber Jurdil (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil).',
    icon: '📩',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: 'Pemilu di Indonesia adalah wujud nyata dari kedaulatan rakyat. Seluruh prosesnya berpijak pada asas Luber Jurdil (Langsung, Umum, Bebas, Rahasia, Jujur, dan Adil) dan dikelola oleh lembaga independen seperti KPU (penyelenggara), Bawaslu (pengawas), dan DKPP (penegak kode etik).',
      tahapanPemilu: [
        {
          fase: 'Masa Persiapan & Pendaftaran',
          poin: [
            'Perencanaan: Penentuan anggaran dan penyusunan regulasi teknis.',
            'Pemutakhiran Data Pemilih (Coklit): Petugas mendatangi rumah warga untuk memastikan setiap orang yang berhak memilih terdaftar dalam DPT (Daftar Pemilih Tetap).',
            'Verifikasi Peserta: Partai politik harus melewati verifikasi administrasi dan faktual untuk bisa menjadi peserta Pemilu.',
          ],
        },
        {
          fase: 'Pencalonan & Kampanye',
          poin: [
            'Pencalonan: Pendaftaran pasangan Capres/Cawapres serta calon anggota legislatif (DPR, DPD, DPRD).',
            'Kampanye: Masa di mana calon menyampaikan visi, misi, dan program kerja. Ini diakhiri dengan Masa Tenang, di mana tidak boleh ada aktivitas kampanye sama sekali sebelum hari pemungutan suara.',
          ],
        },
        {
          fase: 'Pemungutan & Penghitungan Suara',
          poin: [
            'Di TPS: Rakyat memberikan suara secara langsung di bilik suara.',
            'Penghitungan Suara: Dilakukan secara terbuka di TPS segera setelah pemungutan suara selesai.',
            'Rekapitulasi Berjenjang: Suara dihitung secara manual dari tingkat paling bawah hingga nasional: TPS → PPK (Kecamatan) → KPU Kabupaten/Kota → KPU Provinsi → KPU RI.',
          ],
        },
        {
          fase: 'Penetapan Hasil & Sengketa',
          poin: [
            'Penetapan: KPU mengumumkan hasil resmi secara nasional.',
            'Sengketa di MK: Jika ada pihak yang merasa keberatan dengan hasil suara karena dugaan kecurangan, mereka dapat mengajukan gugatan ke Mahkamah Konstitusi (MK) sebagai benteng terakhir keadilan Pemilu.',
          ],
        },
      ],
      dataUtama: {
        judul: 'Rekapitulasi Pemilu 2024 & Pilkada 2024',
        periode: 'Pemilu 14 Feb 2024, Pilkada 27 Nov 2024',
        sumber: 'KPU RI',
        data: [
          { kategori: 'DPR RI', totalSuara: '151 juta', partisipasi: '81.4%' },
          { kategori: 'Presiden', pemenang: 'Prabowo-Gibran', persentase: '58.6%' },
          { kategori: 'Pilkada Serentak', jumlahDaerah: '545 daerah', partisipasi: '76.5%' },
        ],
      },
      subSections: [
        {
          title: 'Pilkada Ulang 2025',
          content: 'Daerah yang menggelar Pilkada ulang akibat sengketa atau bencana',
          data: [
            { daerah: 'Kabupaten Bangka', jadwal: 'Agustus 2025', partisipasi: '54,92%' },
            { daerah: 'Kota Pangkalpinang', jadwal: 'Agustus 2025', partisipasi: '48%' },
          ],
        },
      ],
    },
  },

  // === MODUL 5: PENYELENGGARA PEMILU ===
  {
    id: 'penyelenggara-pemilu',
    title: 'Penyelenggara Pemilu',
    desc: 'Tiga lembaga independen dengan sistem checks and balances: KPU, Bawaslu, dan DKPP.',
    icon: '🛡️',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Di Indonesia, terdapat tiga Lembaga penyelenggara pemilu yang didesain dengan sistem checks and balances (saling mengawasi) agar tidak ada lembaga yang memiliki kekuasaan absolut.',
      tigaLembaga: [
        {
          nama: 'KPU (Komisi Pemilihan Umum) – Sang Pelaksana',
          desc: 'KPU adalah lembaga yang bertanggung jawab penuh atas aspek teknis dan operasional pemilu.',
          tugas: [
            'Tugas Utama: Merencanakan anggaran, menyusun tahapan, memutakhirkan data pemilih, menyiapkan logistik (surat suara & kotak suara), hingga menetapkan hasil pemilu secara nasional.',
            'Struktur Berjenjang: KPU RI → KPU Provinsi → KPU Kabupaten/Kota → PPK (Kecamatan) → PPS (Desa/Kelurahan) → KPPS (Petugas di TPS).',
          ],
        },
        {
          nama: 'Bawaslu (Badan Pengawas Pemilu) – Sang Pengawas',
          desc: 'Bawaslu bertugas memastikan seluruh tahapan yang dijalankan KPU sesuai dengan aturan hukum.',
          tugas: [
            'Tugas Utama: Mengawasi jalannya tahapan (seperti kampanye dan pemungutan suara), menerima laporan dugaan pelanggaran, dan menyelesaikan sengketa proses pemilu.',
            'Wewenang: Jika ada kecurangan, Bawaslu-lah yang melakukan investigasi dan memberikan rekomendasi sanksi.',
          ],
        },
        {
          nama: 'DKPP (Dewan Kehormatan Penyelenggara Pemilu) – Penjaga Etika',
          desc: 'Berbeda dengan KPU dan Bawaslu, DKPP tidak mengurusi teknis atau pengawasan lapangan, melainkan mengurusi manusianya.',
          tugas: [
            'Tugas Utama: Menangani pelanggaran kode etik yang dilakukan oleh oknum anggota KPU maupun Bawaslu.',
            'Sanksi: Jika terbukti melanggar etika (misalnya tidak netral atau menerima suap), DKPP berwenang memberhentikan anggota penyelenggara pemilu tersebut.',
          ],
        },
      ],
      dataUtama: {
        judul: 'Kinerja Penyelenggara Pemilu 2025',
        periode: 'Januari - September 2025',
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
          ],
        },
      ],
    },
  },

  // === MODUL 6: HAK DAN KEWAJIBAN WARGA NEGARA ===
  {
    id: 'hak-kewajiban',
    title: 'Hak & Kewajiban Warga Negara',
    desc: 'Hubungan timbal balik antara warga negara dan negara yang diatur dalam konstitusi.',
    icon: '👤',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Hak adalah kewenangan atau kekuasaan yang diberikan oleh negara kepada warga negaranya (seperti hak perlindungan, pendidikan, dan kesehatan). Kewajiban adalah tanggung jawab atau beban yang harus dilaksanakan oleh warga negara terhadap negara (seperti membayar pajak dan menaati hukum).',
      hakWarga: [
        'Hak atas pekerjaan dan penghidupan yang layak (Pasal 27 ayat 2).',
        'Hak untuk hidup dan mempertahankan kehidupan (Pasal 28A).',
        'Hak mendapatkan perlindungan hukum dan keadilan (Pasal 27 ayat 1, Pasal 28D ayat 1).',
        'Hak mendapatkan pendidikan (Pasal 31 ayat 1).',
        'Hak atas kebebasan berpendapat, berserikat, dan berkumpul (Pasal 28).',
        'Hak atas lingkungan hidup yang baik dan sehat (Pasal 28H).',
      ],
      kewajibanWarga: [
        'Kewajiban menaati hukum dan pemerintahan (Pasal 27 ayat 1).',
        'Kewajiban membela negara (Pasal 27 ayat 3).',
        'Kewajiban menghormati hak asasi manusia orang lain (Pasal 28J ayat 1).',
        'Kewajiban tunduk kepada pembatasan yang ditetapkan dengan undang-undang (Pasal 28J ayat 2).',
        'Kewajiban ikut serta dalam upaya pembelaan negara (Pasal 30).',
        'Kewajiban membayar pajak (Pasal 23A).',
      ],
      dataUtama: {
        judul: 'Kepatuhan Wajib Pajak 2025',
        periode: 'Januari - Agustus 2025',
        sumber: 'Direktorat Jenderal Pajak',
        data: [
          { kategori: 'Wajib Pajak Orang Pribadi', kepatuhan: '72%', target: '80%' },
          { kategori: 'Wajib Pajak Badan', kepatuhan: '68%', target: '75%' },
          { kategori: 'Penerimaan Pajak', realisasi: 'Rp1.200 T', target: 'Rp1.850 T' },
        ],
      },
      subSections: [
        {
          title: 'Partisipasi Bela Negara',
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

  // === MODUL 7: FILSAFAT PANCASILA ===
  {
    id: 'filsafat-pancasila',
    title: 'Filsafat Pancasila',
    desc: 'Konsep pemikiran mendalam para pendiri bangsa yang menjadikan lima nilai dasar Pancasila sebagai pandangan hidup, sistem etika, dan landasan filosofis bernegara.',
    icon: '🇮🇩',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Filsafat Pancasila adalah konsep pemikiran mendalam (hasil permenungan) para pendiri bangsa yang menjadikan lima nilai dasar Pancasila sebagai pandangan hidup, sistem etika, dan landasan filosofis bernegara. Ini mencakup ajaran ontologis (hakikat keberadaan), epistemologis (sumber pengetahuan), dan aksiologis (nilai/manfaat) yang bersumber dari kebudayaan Indonesia.',
      poinPentingFilsafat: [
        'Pancasila sebagai sistem filsafat berarti kesatuan sila-silanya merupakan satu kesatuan organik, hierarkis, dan piramidal yang saling mengisi.',
        {
          landasan: 'Landasan Filosofis:',
          poin: [
            'Ontologis: Mengkaji hakikat keberadaan manusia Indonesia dan Tuhan sebagai pencipta.',
            'Epistemologis: Berasal dari nilai-nilai luhur budaya Indonesia (analitiko-sintesa).',
            'Aksiologis: Nilai-nilai Pancasila adalah pedoman tingkah laku dan moral (etika).',
          ],
        },
        'Tujuan: Menciptakan masyarakat yang religius, humanis, bersatu, demokratis, dan berkeadilan sosial.',
        'Fungsi: Sebagai pedoman hidup bangsa, dasar negara, dan jati diri bangsa.',
      ],
      dataUtama: {
        judul: 'Indeks Toleransi Beragama 2025',
        periode: 'Survei Setara Institute',
        sumber: 'Setara Institute',
        data: [
          { provinsi: 'Nusa Tenggara Timur', skor: 92.4, kategori: 'Sangat Tinggi' },
          { provinsi: 'Bali', skor: 90.2, kategori: 'Sangat Tinggi' },
          { provinsi: 'DIY', skor: 88.7, kategori: 'Tinggi' },
          { provinsi: 'DKI Jakarta', skor: 78.3, kategori: 'Sedang' },
          { provinsi: 'Aceh', skor: 65.1, kategori: 'Rendah' },
        ],
      },
      subSections: [
        {
          title: 'Implementasi Nilai Pancasila dalam Kebijakan',
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

  // === MODUL 8: POLITIK LUAR NEGERI ===
  {
    id: 'politik-luar-negeri',
    title: 'Politik Luar Negeri',
    desc: 'Strategi dan tindakan Pemerintah Indonesia dalam hubungan internasional berdasarkan prinsip bebas-aktif.',
    icon: '🌍',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Politik luar negeri adalah strategi dan tindakan Pemerintah Indonesia untuk mengelola hubungan dengan negara lain, organisasi internasional, dan subjek hukum internasional lainnya, guna mencapai tujuan nasional, mempertahankan kepentingan nasional, dan berpartisipasi dalam ketertiban dunia, berdasarkan prinsip "bebas-aktif".',
      landasanPrinsip: {
        landasan: 'Dasar Idiil adalah Pancasila, dan dasar Konstitusional adalah UUD 1945.',
        catatanIdiil: 'Idiil berarti bersumber dari cita-cita dan pandangan hidup bangsa.',
        bebas: 'Indonesia tidak memihak kekuatan-kekuatan dunia yang tidak sesuai dengan kepribadian bangsa dan tidak bergabung dengan pakta militer manapun.',
        aktif: 'Indonesia berperan aktif dalam menciptakan perdamaian dunia, penyelesaian konflik, serta menjalin kerja sama bilateral dan multilateral.',
      },
      tujuan: [
        'Kepentingan Nasional: Memperkuat keamanan, stabilitas, dan kemakmuran bangsa.',
        'Perdamaian Dunia: Ikut melaksanakan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial.',
        'Identitas Bangsa: Mencerminkan jati diri dan karakter Indonesia di dunia internasional.',
      ],
      implementasi: [
        'Diplomasi: Menggunakan metode kreatif dan antisipatif, tidak sekadar reaktif.',
        'Regional & Global: Fokus pada kerja sama ASEAN, berpartisipasi dalam PBB, G20, dan Gerakan Non-Blok.',
        'Ekonomi & Keamanan: Mengedepankan diplomasi ekonomi serta meningkatkan keamanan nasional dan regional.',
        'Era Terbaru: Di bawah pemerintahan Prabowo, terjadi penguatan diplomasi presidensial, diversifikasi kemitraan pertahanan, dan pendekatan yang lebih asertif dalam menjaga otonomi strategis di tengah rivalitas kekuatan besar.',
      ],
      dataUtama: {
        judul: 'Peran Indonesia di Kancah Internasional 2025',
        periode: '2025',
        sumber: 'Kementerian Luar Negeri',
        data: [
          { peran: 'Misi Perdamaian PBB (UNIFIL)', jumlahPersonel: '1.200 personel', negara: 'Lebanon' },
          { peran: 'Presidensi G20', tahun: '2022', capaian: '48 kesepakatan' },
          { peran: 'Keketuaan ASEAN', tahun: '2023', capaian: '54 dokumen' },
          { peran: 'Konferensi Tingkat Tinggi', tahun: '2025', tuanRumah: 'Indonesia-Afrika' },
        ],
      },
      subSections: [
        {
          title: 'Kerja Sama Ekonomi Internasional',
          content: 'Nilai perdagangan dan investasi dengan mitra strategis',
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

  // === MODUL 9: UUD 1945 ===
  {
    id: 'uud-1945',
    title: 'UUD 1945',
    desc: 'Hukum dasar tertulis yang menjadi sumber hukum tertinggi di Indonesia. Seluruh peraturan perundang-undangan di bawahnya tidak boleh bertentangan dengan UUD 1945.',
    icon: '📜',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'UUD 1945 adalah hukum dasar tertulis (konstitusi) yang menjadi sumber hukum tertinggi di Indonesia. Seluruh peraturan perundang-undangan di bawahnya tidak boleh bertentangan dengan UUD 1945.',
      strukturIsi: {
        pembukaan: 'Terdiri dari 4 alinea. (Bagian ini tidak dapat diubah karena mengandung dasar negara).',
        batangTubuh: ['16 Bab', '37 Pasal', '3 Pasal Aturan Peralihan', '2 Ayat Aturan Tambahan'],
      },
      sifat: ['Singkat: Hanya memuat aturan-aturan pokok.', 'Supel (Fleksibel): Dapat dikembangkan sesuai perkembangan zaman melalui amandemen.', 'Rigid: Memerlukan prosedur khusus untuk mengubahnya, tidak semudah mengubah undang-undang biasa.'],
      maknaAlinea: [
        {
          alinea: 'Pertama',
          teks: '"Bahwa sesungguhnya kemerdekaan itu ialah hak segala bangsa dan oleh sebab itu, maka penjajahan di atas dunia harus dihapuskan, karena tidak sesuai dengan perikemanusiaan dan perikeadilan."',
          makna: 'Mengandung dalil objektif (penjajahan itu salah secara moral/kemanusiaan) dan dalil subjektif (aspirasi bangsa Indonesia untuk merdeka). Indonesia menentang segala bentuk kolonialisme di dunia.',
        },
        {
          alinea: 'Kedua',
          teks: '"Dan perjuangan pergerakan kemerdekaan Indonesia telah sampailah kepada saat yang berbahagia dengan selamat sentausa mengantarkan rakyat Indonesia ke depan pintu gerbang kemerdekaan Negara Indonesia, yang merdeka, bersatu, berdaulat, adil dan makmur."',
          makna: 'Penghargaan atas perjuangan para pahlawan. Kemerdekaan bukanlah akhir, melainkan pintu masuk untuk mewujudkan cita-cita bangsa yang merdeka, bersatu, berdaulat, adil, dan makmur.',
        },
        {
          alinea: 'Ketiga',
          teks: '"Atas berkat rakhmat Allah Yang Maha Kuasa dan dengan didorongkan oleh keinginan luhur, supaya berkehidupan kebangsaan yang bebas, maka rakyat Indonesia menyatakan dengan ini kemerdekaannya."',
          makna: 'Pengakuan religius bahwa kemerdekaan Indonesia bukan semata-mata hasil usaha manusia, tetapi juga karena berkat rahmat Tuhan Yang Maha Esa. Ini menunjukkan bangsa Indonesia adalah bangsa yang spiritual.',
        },
        {
          alinea: 'Keempat',
          teks: '"Kemudian daripada itu untuk membentuk suatu Pemerintah Negara Indonesia yang melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia..." (dan seterusnya hingga rumusan Pancasila).',
          makna: 'Bagian ini paling krusial karena memuat: (1) Tujuan Negara: Melindungi segenap bangsa, memajukan kesejahteraan umum, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia. (2) Bentuk Negara: Republik yang berkedaulatan rakyat. (3) Dasar Negara: Pancasila.',
        },
      ],
      dataUtama: {
        judul: 'Perkara Uji Materi di Mahkamah Konstitusi 2025',
        periode: 'Januari - September 2025',
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

  // === MODUL 10: OTONOMI DAERAH ===
  {
    id: 'otonomi-daerah',
    title: 'Otonomi Daerah',
    desc: 'Hak, wewenang, dan kewajiban daerah untuk mengatur dan mengurus sendiri urusan pemerintahan dan kepentingan masyarakatnya berdasarkan aspirasi masyarakat.',
    icon: '🗺️',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Otonomi daerah adalah hak, wewenang, dan kewajiban daerah (Provinsi, Kabupaten, atau Kota) untuk mengatur dan mengurus sendiri urusan pemerintahan dan kepentingan masyarakatnya. Hal ini dilakukan berdasarkan aspirasi masyarakat dan sesuai dengan peraturan perundang-undangan. Tujuan utamanya: Meningkatkan pelayanan publik agar lebih cepat dan tepat sasaran, memberdayakan masyarakat lokal, dan meningkatkan daya saing daerah melalui pemanfaatan potensi asli daerah.',
      asas: [
        { nama: 'Desentralisasi', desc: 'Penyerahan wewenang sepenuhnya dari pemerintah pusat kepada daerah otonom (daerah jadi punya kuasa penuh atas urusan tersebut).' },
        { nama: 'Dekonsentrasi', desc: 'Pelimpahan wewenang dari pusat kepada Gubernur (sebagai wakil pemerintah pusat di daerah).' },
        { nama: 'Tugas Pembantuan', desc: 'Penugasan dari pusat ke daerah atau desa untuk melaksanakan tugas tertentu dengan biaya dan sarana dari yang memberi tugas.' },
      ],
      pembagianUrusan: [
        {
          kategori: 'Urusan Absolut (Mutlak Milik Pusat)',
          desc: 'Daerah tidak boleh ikut campur dalam 6 hal ini: Politik luar negeri, Pertahanan, Keamanan, Yustisi (hukum/peradilan), Moneter & Fiskal (keuangan negara), dan Agama.',
        },
        {
          kategori: 'Urusan Konkuren (Dibagi antara Pusat & Daerah)',
          desc: 'Urusan yang dikelola bersama, seperti Pendidikan, Kesehatan, Lingkungan Hidup, dan Pariwisata. Urusan ini dibagi lagi menjadi pelayanan dasar yang wajib dan pilihan.',
        },
        {
          kategori: 'Urusan Pemerintahan Umum',
          desc: 'Kewenangan yang menjadi ranah Presiden sebagai kepala pemerintahan.',
        },
      ],
      dasarHukum: ['UUD 1945: Pasal 18, 18A, dan 18B.', 'Undang-Undang: UU No. 23 Tahun 2014 tentang Pemerintahan Daerah (beserta perubahannya).'],
      manfaat: ['Efisiensi: Pengambilan keputusan lebih cepat karena tidak semua harus lapor ke Jakarta.', 'Keadilan: Daerah yang punya Sumber Daya Alam (SDA) besar bisa mengelola hasilnya untuk membangun daerahnya sendiri (melalui Pendapatan Asli Daerah/PAD).', 'Demokrasi Lokal: Rakyat di daerah bisa memilih pemimpin mereka sendiri (Gubernur/Bupati/Wali Kota) melalui Pilkada.'],
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
          title: 'Kinerja Pemerintah Daerah 2025',
          content: 'Evaluasi kinerja pemda berdasarkan laporan Kemendagri',
          data: [
            { provinsi: 'Jawa Timur', opiniBPK: 'WTP', inovasi: '25 program unggulan' },
            { provinsi: 'Jawa Barat', opiniBPK: 'WTP', inovasi: '18 program unggulan' },
            { provinsi: 'Papua', opiniBPK: 'WDP', inovasi: '5 program unggulan' },
          ],
        },
        {
          title: 'Provinsi Baru Hasil Pemekaran',
          content: 'Evaluasi 4 DOB Papua (2022-2025)',
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

  // === MODUL 11: PARTAI POLITIK ===
  {
    id: 'partai-politik',
    title: 'Partai Politik',
    desc: 'Organisasi yang dibentuk untuk memperjuangkan cita-cita dan kepentingan rakyat serta merebut kekuasaan secara konstitusional.',
    icon: '🚩',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Partai politik adalah organisasi yang dibentuk untuk memperjuangkan cita-cita dan kepentingan rakyat serta merebut kekuasaan secara konstitusional.',
      fungsiUtama: [
        'Sarana Komunikasi Politik: Menghubungkan aspirasi rakyat dengan kebijakan pemerintah.',
        'Sosialisasi Politik: Mendidik masyarakat agar sadar akan hak dan kewajibannya sebagai warga negara.',
        'Rekrutmen Politik: Mencari dan melatih kader-kader berbakat untuk menjadi pemimpin (seperti calon Presiden, Gubernur, atau anggota DPR).',
        'Pengatur Konflik: Membantu menyelesaikan perbedaan pendapat di masyarakat melalui cara-cara demokratis di parlemen.',
      ],
      peranPemilu: 'Di Indonesia, partai politik memiliki peran sentral karena: (a) Merupakan satu-satunya pintu bagi warga negara untuk mencalonkan diri sebagai anggota DPR dan DPRD. (b) Menjadi kendaraan utama untuk mengusung pasangan Calon Presiden dan Wakil Presiden.',
      tujuan: [
        'Mewujudkan cita-cita nasional bangsa Indonesia sebagaimana termaktub dalam Pembukaan UUD 1945.',
        'Mengembangkan kehidupan demokrasi berdasarkan Pancasila.',
        'Mencapai kesejahteraan bagi seluruh rakyat Indonesia melalui kekuasaan yang diperoleh secara sah.',
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
          title: 'Pendanaan Partai Politik 2025',
          content: 'Bantuan keuangan partai politik dari APBN',
          data: [
            'Total bantuan: Rp168 miliar per tahun',
            'Per kursi DPR: Rp1,5 miliar per tahun',
            'Partai penerima tertinggi: PDIP (Rp16,5 miliar)',
            'Sanksi pengurangan: 5 partai kena sanksi karena tidak laporkan keuangan',
          ],
        },
      ],
    },
  },

  // === MODUL 12: INTEGRITAS POLITIK ===
  {
    id: 'integritas-politik',
    title: 'Integritas Politik',
    desc: 'Konsistensi antara tindakan, nilai-nilai, metode, prinsip, serta harapan para aktor politik dengan aturan hukum dan etika yang berlaku.',
    icon: '💎',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Integritas politik adalah konsistensi antara tindakan, nilai-nilai, metode, prinsip, serta harapan yang mendasari perilaku para aktor politik (pemimpin, pejabat, dan partai politik) dengan aturan hukum dan etika yang berlaku.',
      pilarUtama: [
        { nama: 'Kejujuran', desc: 'Bertindak transparan dan memberikan informasi yang benar kepada publik tanpa manipulasi.' },
        { nama: 'Tanggung Jawab', desc: 'Berani menanggung risiko dan konsekuensi dari setiap keputusan yang diambil untuk kepentingan rakyat.' },
        { nama: 'Keadilan', desc: 'Tidak memihak atau melakukan diskriminasi, serta mendahulukan kepentingan umum di atas kepentingan pribadi atau golongan.' },
        { nama: 'Ketaatan Hukum', desc: 'Selalu bergerak dalam koridor aturan perundang-undangan (konstitusional).' },
      ],
      mengapaPenting: [
        'Membangun Kepercayaan Publik: Rakyat akan lebih percaya dan mendukung pemerintah jika para pemimpinnya memiliki rekam jejak yang bersih.',
        'Mencegah Korupsi: Integritas adalah benteng utama melawan praktik suap, gratifikasi, dan penyalahgunaan kekuasaan (KKN).',
        'Menciptakan Kebijakan Berkualitas: Keputusan politik yang didasari integritas akan berfokus pada kesejahteraan rakyat, bukan keuntungan kelompok tertentu.',
      ],
      penerapanPemilu: 'Dalam pemilu, integritas politik tercermin pada: (a) Penyelenggara pemilu (KPU/Bawaslu) yang netral. (b) Kandidat yang tidak melakukan politik uang (money politics). (c) Kampanye yang edukatif tanpa menyebarkan berita bohong (hoaks) atau ujaran kebencian.',
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
            { jenis: 'Kerugian Negara', nilai: 'Rp2,3 Triliun' },
          ],
        },
        {
          title: 'LHKPN 2025',
          content: 'Kepatuhan pelaporan harta kekayaan pejabat negara',
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

  // === MODUL 13: HAK KONSTITUSIONAL WARGA ===
  {
    id: 'hak-konstitusional',
    title: 'Hak Konstitusional Warga',
    desc: 'Hak-hak yang dimiliki setiap warga negara yang bersumber dan dilindungi langsung oleh konstitusi (UUD 1945).',
    icon: '⚖️',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Hak konstitusional adalah hak-hak yang dimiliki setiap warga negara yang bersumber dan dilindungi langsung oleh konstitusi (UUD 1945). Jika hak ini dilanggar, warga negara memiliki dasar hukum yang kuat untuk menuntut keadilan.',
      penggolongan: [
        { golongan: 'Hak Sipil dan Politik', desc: 'Hak untuk hidup, hak bebas dari penyiksaan, hak beragama, serta hak untuk memilih dan dipilih dalam Pemilu.' },
        { golongan: 'Hak Ekonomi, Sosial, dan Budaya', desc: 'Hak atas pekerjaan yang layak, hak mendapatkan pendidikan, dan hak atas jaminan sosial.' },
        { golongan: 'Hak Kelompok Khusus', desc: 'Perlindungan khusus bagi hak anak dan hak masyarakat adat.' },
      ],
      contohHak: [
        'Pasal 27 ayat (1): Hak atas kedudukan yang sama di dalam hukum dan pemerintahan.',
        'Pasal 28E ayat (3): Hak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat.',
        'Pasal 28G ayat (1): Hak atas perlindungan diri pribadi, keluarga, kehormatan, martabat, dan harta benda.',
        'Pasal 28I ayat (1): Hak untuk tidak dituntut atas dasar hukum yang berlaku surut (hak asasi yang tidak dapat dikurangi dalam keadaan apa pun).',
      ],
      alasanDijamin: [
        'Membatasi Kekuasaan Negara: Agar pemerintah tidak bertindak sewenang-wenang terhadap rakyatnya.',
        'Instrumen Penegakan Hukum: Menjadi dasar bagi warga negara untuk mengajukan Judicial Review (uji materi) ke Mahkamah Konstitusi jika ada Undang-Undang yang dirasa melanggar hak mereka.',
      ],
      dataUtama: {
        judul: 'Pengaduan Masyarakat ke Komnas HAM 2025',
        periode: 'Januari - September 2025',
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
          title: 'Permohonan Uji Materi ke MK',
          content: 'Perkara pengujian undang-undang oleh warga negara',
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

  // === MODUL 14: PARTISIPASI PUBLIK ===
  {
    id: 'partisipasi-publik',
    title: 'Partisipasi Publik',
    desc: 'Keterlibatan sukarela warga negara dalam proses pengambilan keputusan, perencanaan, pelaksanaan, dan pengawasan kebijakan pemerintah.',
    icon: '📣',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Partisipasi publik adalah keterlibatan sukarela warga negara dalam proses pengambilan keputusan, perencanaan, pelaksanaan, dan pengawasan kebijakan pemerintah. Dalam demokrasi, suara rakyat tidak hanya dibutuhkan saat Pemilu, tetapi juga dalam keseharian jalannya pemerintahan.',
      bentukPartisipasi: [
        { bentuk: 'Partisipasi Politik', desc: 'Menggunakan hak pilih dalam Pemilu atau Pilkada, serta menjadi anggota partai politik.' },
        { bentuk: 'Partisipasi Sosial', desc: 'Ikut serta dalam kegiatan kemasyarakatan, seperti gotong royong atau musyawarah warga.' },
        { bentuk: 'Partisipasi dalam Pengambilan Keputusan', desc: 'Memberikan masukan dalam penyusunan Undang-Undang atau Peraturan Daerah (misalnya melalui Public Hearing atau Uji Publik).' },
        { bentuk: 'Partisipasi Pengawasan', desc: 'Memantau kinerja pejabat publik dan melaporkan jika ada dugaan pelanggaran atau korupsi.' },
      ],
      mengapaPenting: [
        'Meningkatkan Kualitas Kebijakan: Kebijakan yang melibatkan rakyat akan lebih sesuai dengan kebutuhan nyata di lapangan.',
        'Mencegah Penyalahgunaan Kekuasaan: Semakin aktif rakyat mengawasi, semakin kecil peluang pejabat untuk melakukan korupsi.',
        'Legitimasi Pemerintah: Pemerintah yang sering mendengarkan rakyatnya akan mendapatkan dukungan dan kepercayaan (trust) yang lebih besar.',
        'Pendidikan Politik: Melatih warga negara untuk kritis, bertanggung jawab, dan peduli terhadap masa depan bangsa.',
      ],
      mediaDigital: ['Petisi daring (online petitions).', 'Media sosial untuk menyuarakan aspirasi atau kritik.', 'Aplikasi pengaduan resmi pemerintah (seperti LAPOR!).'],
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
          title: 'Pengaduan Melalui LAPOR!',
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

  // === MODUL 15: REKAM JEJAK DPR RI ===
  {
    id: 'rekam-jejak-dpr',
    title: 'Rekam Jejak DPR RI',
    desc: 'Catatan kinerja wakil rakyat selama masa jabatan, termasuk legislasi, anggaran, dan pengawasan.',
    icon: '📊',
    dataTahun: '2024-2025',
    fullContent: {
      pengertian: 'Rekam jejak anggota dewan adalah catatan kinerja wakil rakyat selama masa jabatan.',
      periode20192024: {
        judul: 'Periode 2019–2024 (Masa Jabatan Puan Maharani)',
        desc: 'Periode ini sering disebut sebagai periode yang "super produktif" dari segi kuantitas, namun sangat penuh polemik dari segi substansi.',
        kinerjaLegislasi: {
          judul: 'Kinerja Legislasi (Capaian Tertinggi dalam 15 Tahun)',
          desc: 'DPR periode ini berhasil mengesahkan total 225 Undang-Undang. Sebagai perbandingan:',
          perbandingan: ['Periode 2014–2019: Menghasilkan 91 UU.', 'Periode 2009–2014: Menghasilkan 126 UU.'],
          catatan: 'Meskipun angkanya besar, hanya sekitar 48 UU yang berasal dari daftar prioritas (Prolegnas), sementara sisanya adalah UU Kumulatif Terbuka (seperti ratifikasi perjanjian internasional atau pengesahan anggaran).',
        },
        uuKontroversial: [
          { nama: 'UU Cipta Kerja (Omnibus Law)', desc: 'Menggabungkan puluhan UU untuk kemudahan investasi. Dikritik karena prosesnya yang dianggap terburu-buru dan minim partisipasi publik.' },
          { nama: 'Revisi UU KPK (2019)', desc: 'Dianggap sebagai langkah pelemahan terhadap lembaga antirasuah.' },
          { nama: 'UU TPKS (Tindak Pidana Kekerasan Seksual)', desc: 'Salah satu rekam jejak positif yang sangat diapresiasi publik karena memberikan perlindungan nyata bagi korban kekerasan seksual.' },
          { nama: 'UU IKN (Ibu Kota Nusantara)', desc: 'Dasar hukum pemindahan ibu kota ke Kalimantan Timur.' },
          { nama: 'UU Kesehatan (Omnibus Law)', desc: 'Reformasi besar-besaran di sektor kesehatan yang sempat ditolak oleh organisasi profesi kedokteran.' },
        ],
        fungsiAnggaran: {
          pandemi: 'DPR memberikan persetujuan cepat terhadap Perpu No. 1 Tahun 2020 yang memberikan fleksibilitas anggaran luar biasa bagi pemerintah untuk menangani pandemi.',
          kunker: 'Tercatat ada sekitar 2.962 kunjungan kerja (daerah dan luar negeri) selama 5 tahun untuk menyerap aspirasi dan diplomasi parlemen.',
        },
      },
      periode20242029: {
        judul: 'Awal Rekam Jejak Periode 2024–2029',
        desc: 'Periode yang baru dimulai pada 1 Oktober 2024 ini memiliki karakteristik unik:',
        karakteristik: [
          'Komposisi Petahana: Sebanyak 53% anggota adalah "wajah lama" (petahana), sementara 47% adalah anggota baru.',
          'Penambahan Kursi: Jumlah anggota meningkat menjadi 580 orang (sebelumnya 575).',
          'Tantangan: Publik menanti apakah DPR periode ini bisa menjaga marwah "Check and Balances" mengingat besarnya koalisi pendukung pemerintah di parlemen.',
        ],
      },
      dataUtama: {
        judul: 'Kinerja DPR RI Tahun Sidang 2024-2025',
        periode: 'Agustus 2024 - Oktober 2025',
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
          title: 'Tunjangan Anggota DPR (Pasca Pemangkasan 2025)',
          content: 'Data tunjangan setelah pemangkasan September 2025',
          data: [
            { komponen: 'Take Home Pay sebelumnya', nominal: 'Rp100+ juta/bulan' },
            { komponen: 'Take Home Pay baru', nominal: 'Rp65,5 juta/bulan' },
            { komponen: 'Tunjangan Komunikasi Intensif', nominal: 'Rp20,03 juta/bulan' },
            { komponen: 'UMR Jakarta (pembanding)', nominal: 'Rp5,39 juta/bulan' },
          ],
        },
        {
          title: 'Kritik Formappi',
          content: 'Catatan Forum Masyarakat Peduli Parlemen Indonesia',
          data: [
            'Tunjangan komunikasi intensif belum jelas output komunikasi',
            'Duplikasi tunjangan: tunjangan jabatan dan tunjangan kehormatan',
            'Respon Puan Maharani: "DPR harus berani dikritik, jawab dengan kerja nyata"',
          ],
        },
      ],
    },
  },

  // === MODUL 16: APBN & APBD 2025-2026 ===
  {
    id: 'apbn-apbd',
    title: 'APBN & APBD 2025-2026',
    desc: 'Tulang punggung finansial negara. Tahun 2025-2026 adalah masa transisi krusial di mana anggaran mulai sepenuhnya mencerminkan visi pemerintahan baru hasil Pemilu 2024.',
    icon: '💰',
    dataTahun: '2025-2026',
    fullContent: {
      pengertian: 'Modul ini fokus pada tulang punggung finansial negara. Tahun 2025-2026 adalah masa transisi krusial di mana anggaran mulai sepenuhnya mencerminkan visi pemerintahan baru hasil Pemilu 2024.',
      fokusAPBN: 'Penyelarasan anggaran untuk program unggulan seperti makan siang bergizi gratis, hilirisasi industri, dan keberlanjutan pembangunan IKN (Ibu Kota Nusantara).',
      fokusAPBD: 'Sinkronisasi antara pusat dan daerah. Tantangan utamanya adalah mengurangi ketergantungan daerah pada dana transfer pusat (TKD) dan meningkatkan PAD (Pendapatan Asli Daerah).',
      targetMakro: 'Menjaga defisit anggaran di bawah 3% PDB sambil mengejar target pertumbuhan ekonomi di angka 5,2% - 5,5%.',
      dataUtama: {
        judul: 'Realisasi Program Prioritas APBN 2025',
        periode: 'Hingga Agustus 2025',
        sumber: 'Kementerian Keuangan',
        totalRealisasi: 'Rp 420,2 Triliun',
        data: [
          { program: 'Program Keluarga Harapan (PKH)', anggaran: 'Rp74,6 T', penerima: '10 juta keluarga' },
          { program: 'Tunjangan Profesi Guru', anggaran: 'Rp53,2 T', penerima: 'Guru dan dosen' },
          { program: 'Subsidi Energi', anggaran: 'Rp41,5 T', keterangan: 'Hingga September 2025' },
          { program: 'Kompensasi Energi', anggaran: 'Rp66,5 T', keterangan: 'Menjaga stabilitas harga' },
          { program: 'Program Sembako/BPNT', anggaran: 'Rp34,4 T', penerima: 'KPM' },
          { program: 'Jaminan Kesehatan Nasional', anggaran: 'Rp34,7 T', keterangan: 'Hingga September 2025' },
          { program: 'Program Indonesia Pintar', anggaran: 'Rp8,7 T', penerima: '18,6 juta siswa' },
          { program: 'KIP Kuliah', anggaran: 'Rp9,8 T', penerima: '1,05 juta mahasiswa' },
          { program: 'Tapera & FLPP', anggaran: 'Rp21,3 T', penerima: '226 ribu MBR' },
        ],
      },
      subSections: [
        {
          title: 'Program Makan Bergizi Gratis',
          content: 'Program unggulan pemerintahan baru',
          data: [
            { tahun: '2025', anggaran: 'Rp71 Triliun', keterangan: 'Anggaran awal' },
            { target: 'Penerima Manfaat', nilai: 'Anak sekolah dan ibu hamil', keterangan: 'Nasional' },
          ],
        },
        {
          title: 'Cek Kesehatan Gratis',
          content: 'Program prioritas kesehatan 2025',
          data: [
            { anggaran: 'Rp3,2 Triliun', keterangan: 'Alokasi APBN 2025' },
            { sumber: 'Kemenkeu', detail: 'Bagian dari belanja kesehatan Rp218,5 T' },
          ],
        },
      ],
    },
  },

  // === MODUL 17: INDEKS DEMOKRASI INDONESIA ===
  {
    id: 'indeks-demokrasi',
    title: 'Indeks Demokrasi Indonesia (IDI)',
    desc: 'Rapor mengenai kesehatan demokrasi Indonesia yang diukur berdasarkan tiga aspek utama: Kebebasan Sipil, Hak-Hak Politik, dan Lembaga Demokrasi.',
    icon: '📈',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Modul ini memberikan rapor mengenai kesehatan demokrasi kita. IDI diukur berdasarkan tiga aspek utama: Kebebasan Sipil, Hak-Hak Politik, dan Lembaga Demokrasi.',
      tren2025: 'Fokus pada pemulihan kebebasan berpendapat di ruang digital dan penguatan independensi lembaga peradilan.',
      indikatorKunci: [
        'Pengukuran dan Komponen: IDI mengukur tiga aspek utama: (1) Kebebasan Sipil, (2) Hak-hak Politik, dan (3) Lembaga Demokrasi. Data diambil dari surat kabar, dokumen MK, dan survei para ahli.',
        'Tren Skor Nasional: Partisipasi: Seberapa aktif warga terlibat dalam pengawasan kebijakan publik setelah Pemilu.',
        'Kinerja Parlemen: Efektivitas DPR dalam menjalankan fungsi check and balances.',
        'Budaya Politik: Penurunan polarisasi di tingkat akar rumput.',
      ],
      dataBPS: 'Berdasarkan data BPS, skor IDI sering bergerak fluktuatif, dengan penurunan signifikan terlihat pada tahun 2023.',
      peringkatInternasional: 'Laporan Economist Intelligence Unit (EIU) menunjukkan Indonesia berada dalam kategori "demokrasi cacat" dengan peringkat ke-56 pada 2023 dan menurun dari tahun sebelumnya.',
      faktorPenurun: 'Penurunan skor IDI disebabkan oleh pembatasan kebebasan berpendapat, kasus intoleransi, serta kelemahan peran lembaga representatif.',
      targetMasaDepan: 'Pemerintah (melalui Kemenko Polkam) berusaha mengoptimalkan penghitungan IDI di 38 provinsi untuk memperkuat stabilitas politik dan kualitas demokrasi substantif.',
      dataUtama: {
        judul: 'IDI 2025 - 10 Provinsi Tertinggi & Terendah',
        periode: 'Tahun 2025 (diumumkan September 2025)',
        sumber: 'Kemenko Polkam & BPS',
        peringkat: [
          { provinsi: 'DI Yogyakarta', skor: 89.25, perubahan: '+5.37', status: 'naik', peringkat: 1 },
          { provinsi: 'DKI Jakarta', skor: 84.67, perubahan: '+2.10', status: 'naik', peringkat: 2 },
          { provinsi: 'Jawa Tengah', skor: 83.42, perubahan: '+1.80', status: 'naik', peringkat: 3 },
          { provinsi: 'Bali', skor: 82.91, perubahan: '+0.50', status: 'naik', peringkat: 4 },
          { provinsi: 'Jawa Timur', skor: 81.73, perubahan: '-0.30', status: 'turun', peringkat: 5 },
          { provinsi: 'Papua', skor: 62.18, perubahan: '-2.50', status: 'turun', peringkat: 34 },
          { provinsi: 'Aceh', skor: 64.32, perubahan: '-1.80', status: 'turun', peringkat: 33 },
        ],
      },
      subSections: [
        {
          title: 'Studi Kasus: DIY vs Kaltim',
          content: 'Perbandingan faktor keberhasilan dan penurunan',
          data: [
            { provinsi: 'DI Yogyakarta (naik 5,37)', faktor: 'Kebebasan sipil terjamin, dialog publik konstruktif, nilai lokalitas' },
            { provinsi: 'Kalimantan Timur (turun 1,59)', faktor: 'Demo anarkis (kebebasan turun), resapan aspirasi menurun (kesetaraan turun)' },
          ],
        },
      ],
    },
  },

  // === MODUL 18: BUKU PUTIH KEBIJAKAN ===
  {
    id: 'buku-putih',
    title: 'Buku Putih Kebijakan',
    desc: 'Dokumen resmi yang berisi panduan strategis dan usulan kebijakan untuk menyelesaikan masalah spesifik bangsa.',
    icon: '📖',
    dataTahun: '2025',
    fullContent: {
      pengertian: 'Buku Putih adalah dokumen resmi yang berisi panduan strategis dan usulan kebijakan untuk menyelesaikan masalah spesifik bangsa.',
      isiModul: 'Analisis mendalam mengenai tantangan sektoral, misalnya transisi energi hijau (Net Zero Emission) atau penguatan pertahanan siber.',
      fungsi: 'Menjadi acuan bagi kementerian/lembaga untuk menyusun rencana kerja (Renja) agar tidak terjadi tumpang tindih regulasi.',
      output: 'Rekomendasi konkret yang berbasis data (evidence-based policy) untuk menghadapi ketidakpastian global di tahun 2026.',
      dataUtama: {
        judul: 'Naskah Akademik yang Disusun 2025',
        periode: 'Januari - September 2025',
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
          title: 'Penyempurnaan Naskah Akademik IDI',
          content: 'Penguatan metodologi IDI 2025',
          data: [
            'Indikator 15: Kinerja legislasi DPRD - disempurnakan',
            'Indikator 22: Fungsi kaderisasi partai politik - ditambahkan',
            'Indikator baru: Partisipasi perempuan dalam politik',
          ],
        },
      ],
    },
  },

  // === MODUL 20: KALENDER POLITIK 2025-2026 ===
  {
    id: 'kalender-politik',
    title: 'Kalender Politik 2025-2026',
    desc: 'Pasca pemilu besar 2024, kalender politik 2025-2026 fokus pada konsolidasi kekuasaan dan persiapan menuju pemerintahan yang stabil.',
    icon: '📅',
    dataTahun: '2025-2026',
    fullContent: {
      pengertian: 'Pasca pemilu besar 2024, kalender politik 2025-2026 fokus pada konsolidasi kekuasaan dan persiapan menuju pemerintahan yang stabil.',
      tahun2025: 'Fokus pada pelantikan dan penyesuaian kepala daerah hasil Pilkada Serentak 2024. Ini adalah tahun "pembuktian" bagi para pemimpin daerah baru.',
      tahun2026: 'Memasuki fase tengah masa jabatan (mid-term). Fokus pada evaluasi janji kampanye dan stabilitas koalisi partai politik di tingkat nasional.',
      agendaUtama: 'Pengisian jabatan strategis (staf ahli, duta besar, hingga pucuk pimpinan lembaga negara) dan penyusunan program kerja jangka menengah.',
      dataUtama: {
        judul: 'Agenda Politik Nasional 2025-2026',
        periode: 'Oktober 2025 - Desember 2026',
        sumber: 'KPU RI & DPR RI',
        data: [
          { tanggal: '16 Agustus 2025', agenda: 'Pidato Kenegaraan Presiden', keterangan: 'HUT RI ke-80' },
          { tanggal: 'September 2025', agenda: 'Pengumuman IDI 2025', keterangan: 'Kemenko Polkam' },
          { tanggal: 'Oktober - Desember 2025', agenda: 'Masa Sidang DPR', keterangan: 'Pembahasan RAPBN 2026' },
          { tanggal: 'Februari 2026', agenda: 'Pilkada Ulang', keterangan: 'Daerah sengketa' },
          { tanggal: 'Agustus 2026', agenda: 'Penyampaian RAPBN 2027', keterangan: 'Presiden' },
          { tanggal: 'November 2026', agenda: 'Reses DPR', keterangan: 'Penyerapan aspirasi' },
        ],
      },
      subSections: [
        {
          title: 'Tahapan Pemilu 2029',
          content: 'Jadwal persiapan Pemilu 2029 yang sudah dimulai',
          data: [
            '2025: Pemutakhiran data pemilih berkelanjutan',
            '2026: Penyusunan regulasi teknis',
            '2027: Verifikasi partai politik',
            '2028: Pendaftaran calon legislatif',
            '2029: Pelaksanaan Pemilu',
          ],
        },
      ],
    },
  },
];

// ==========================================
// 9. KOMPONEN STUDY ROOM
// ==========================================
const StudyRoom = ({ module, onBack, onComplete }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 z-[200] bg-zinc-50 dark:bg-zinc-950 overflow-y-auto"
    >
      <nav className="sticky top-0 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-4">
          <div className="flex gap-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-black">
              Data {module.dataTahun}
            </span>
            <span className="font-black text-red-600 uppercase text-xs">
              Modul: {module.title}
            </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <header className="mb-16">
          <span className="text-8xl mb-6 block">{module.icon}</span>
          <h1 className="text-6xl md:text-7xl font-black uppercase italic mb-4 leading-none">
            {module.title}
          </h1>

          <div className="text-2xl font-bold opacity-60 italic mb-6 border-l-8 border-red-600 pl-6">
            <SmartText text={'"' + module.fullContent.pengertian + '"'} />
          </div>

          {module.fullContent.dataUtama && (
            <div className="bg-black text-white p-8 rounded-[2rem] border-4 border-red-600 my-8">
              <h2 className="text-2xl font-black uppercase mb-4 text-red-500">
                {module.fullContent.dataUtama.judul}
              </h2>
              <p className="text-sm opacity-80 mb-6">
                Periode: {module.fullContent.dataUtama.periode} | Sumber: {module.fullContent.dataUtama.sumber}
              </p>
              {module.fullContent.dataUtama.peringkat && (
                <DataTable data={module.fullContent.dataUtama.peringkat} columns={['provinsi', 'skor', 'perubahan']} />
              )}
              {module.fullContent.dataUtama.data && (
                <DataTable data={module.fullContent.dataUtama.data} />
              )}
            </div>
          )}
        </header>

        <div className="space-y-24">
          {module.fullContent.subSections && module.fullContent.subSections.map((sub, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-3xl font-black uppercase text-red-600 border-b-4 border-black pb-2">
                {sub.title}
              </h3>
              <div className="text-xl font-medium leading-relaxed">
                <SmartText text={sub.content} />
              </div>
              {sub.data && Array.isArray(sub.data) && (
                <>
                  {typeof sub.data[0] === 'object' ? (
                    <DataTable data={sub.data} />
                  ) : (
                    <div className="grid grid-cols-1 gap-4 my-6">
                      {sub.data.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-center p-6 bg-white dark:bg-zinc-900 border-2 border-black rounded-2xl shadow-md">
                          <CheckCircle2 className="text-red-600 w-6 h-6 flex-shrink-0" />
                          <SmartText text={item} />
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
          onClick={() => {
            onComplete(module.id);
            onBack();
          }}
          className="w-full mt-16 py-8 bg-red-600 text-white text-2xl font-black uppercase rounded-[3rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all"
        >
          Tandai Selesai
        </button>
      </div>
    </motion.div>
  );
};

// ==========================================
// 10. KOMPONEN PROFILE ROOM
// ==========================================
const ProfileRoom = ({ tokoh, onBack }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="fixed inset-0 z-[300] bg-white dark:bg-zinc-950 overflow-y-auto"
    >
      <nav className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b-2 border-black dark:border-white">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-black uppercase text-xs hover:text-red-600"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-4">
          <span className="font-black text-red-600 uppercase text-xs tracking-widest">
            {tokoh.name}
          </span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="sticky top-32">
              <img
                src={tokoh.image}
                alt={tokoh.name}
                referrerPolicy="no-referrer"
                className="w-full aspect-[3/4] object-cover rounded-[3rem] border-4 border-black dark:border-white shadow-[15px_15px_0px_0px_rgba(220,38,38,1)] mb-8"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x800?text=' + tokoh.name;
                }}
              />
              <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl">
                <p className="text-xs font-black text-red-600 uppercase mb-2">Masa Pengabdian</p>
                <p className="text-2xl font-black italic">{tokoh.period}</p>
              </div>
            </div>
          </div>

          <div className="flex-[1.5]">
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
              {tokoh.name}
            </h1>
            <p className="text-2xl font-black text-red-600 uppercase mb-12 border-b-4 border-red-600 inline-block">
              {tokoh.role}
            </p>

            <div className="space-y-12">
              <section>
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-6">
                  <History className="w-6 h-6" /> Biografi Singkat
                </h3>
                <p className="text-2xl opacity-80 leading-relaxed font-medium">
                  {tokoh.bio}
                </p>
              </section>

              <section className="bg-black text-white dark:bg-white dark:text-black p-10 rounded-[3rem]">
                <h3 className="text-xl font-black uppercase flex items-center gap-2 mb-6 text-red-500">
                  <Award className="w-6 h-6" /> Kontribusi Terbesar
                </h3>
                <p className="text-3xl font-black italic leading-tight">
                  "{tokoh.contribution}"
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 11. KOMPONEN MODULE CARD
// ==========================================
const ModuleCard = ({ mod, completedModules, setActiveModule }) => {
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
        <p className="text-xs font-bold opacity-60 mb-3 line-clamp-2">{mod.desc}</p>
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

// ==========================================
// 12. KOMPONEN UTAMA
// ==========================================
const PoliticsBasics = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [activeTokoh, setActiveTokoh] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const handleComplete = (id) => {
    if (!completedModules.includes(id)) {
      setCompletedModules([...completedModules, id]);
    }
  };

  const kategori1 = modules.slice(0, 6);
  const kategori2 = modules.slice(6, 12);
  const kategori3 = modules.slice(12, 20);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white py-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
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
          </div>
        </header>

        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Landmark className="text-red-600 w-8 h-8" /> Dasar Tata Negara (1-6)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori1.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Scale className="text-red-600 w-8 h-8" /> Ideologi & Struktur Hukum (7-12)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori2.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-4 border-b-4 border-black pb-4">
            <Users className="text-red-600 w-8 h-8" /> Instrumen & Partisipasi Publik (13-20)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategori3.map((mod) => (
              <ModuleCard key={mod.id} mod={mod} completedModules={completedModules} setActiveModule={setActiveModule} />
            ))}
          </div>
        </section>

        <section className="mt-32">
          <h2 className="text-4xl font-black uppercase italic mb-12 flex items-center gap-4 border-b-4 border-black pb-4">
            <Award className="text-red-600 w-8 h-8" /> Galeri Kepemimpinan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tokohBangsa.map((tokoh) => (
              <motion.div
                key={tokoh.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveTokoh(tokoh)}
                className="group cursor-pointer relative h-[350px] rounded-[2rem] overflow-hidden bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
              >
                <img
                  src={tokoh.image}
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-all duration-500"
                  alt={tokoh.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x500?text=' + tokoh.name;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 flex flex-col justify-end">
                  <h4 className="text-xl font-black text-white uppercase leading-none mb-1 drop-shadow-lg">
                    {tokoh.name}
                  </h4>
                  <p className="text-red-500 font-black text-xs uppercase tracking-tighter drop-shadow-lg">
                    {tokoh.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="mt-40 text-center text-xs opacity-40">
          <p>
            20 Modul Pembelajaran Politik • Sumber: Kemenko Polkam, BPS, KPU, Bawaslu, MK, KPK, DPR RI, Kemenkeu, Formappi • Data diperbarui 2025-2026
          </p>
        </footer>

        <AnimatePresence>
          {activeModule && (
            <StudyRoom module={activeModule} onBack={() => setActiveModule(null)} onComplete={handleComplete} />
          )}
          {activeTokoh && (
            <ProfileRoom tokoh={activeTokoh} onBack={() => setActiveTokoh(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PoliticsBasics;