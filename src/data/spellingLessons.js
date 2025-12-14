// Data untuk 30 pelajaran mengeja Bahasa Melayu
// Dari senang ke susah dengan sistem drag & drop suku kata

export const spellingLessons = [
  // TAHAP 1: KATA MUDAH (2 SUKU KATA) - Pelajaran 1-10
  {
    id: 1,
    title: "Bola",
    difficulty: "easy",
    word: "bola",
    syllables: ["bo", "la"],
    image: "⚽",
    hint: "Mainan bulat yang boleh ditendang",
    category: "Permainan"
  },
  {
    id: 2,
    title: "Mata",
    difficulty: "easy",
    word: "mata",
    syllables: ["ma", "ta"],
    image: "👁️",
    hint: "Kita guna untuk melihat",
    category: "Anggota Badan"
  },
  {
    id: 3,
    title: "Kaki",
    difficulty: "easy",
    word: "kaki",
    syllables: ["ka", "ki"],
    image: "🦶",
    hint: "Kita guna untuk berjalan",
    category: "Anggota Badan"
  },
  {
    id: 4,
    title: "Buku",
    difficulty: "easy",
    word: "buku",
    syllables: ["bu", "ku"],
    image: "📚",
    hint: "Kita baca di sekolah",
    category: "Sekolah"
  },
  {
    id: 5,
    title: "Nasi",
    difficulty: "easy",
    word: "nasi",
    syllables: ["na", "si"],
    image: "🍚",
    hint: "Makanan putih yang kita makan setiap hari",
    category: "Makanan"
  },
  {
    id: 6,
    title: "Baju",
    difficulty: "easy",
    word: "baju",
    syllables: ["ba", "ju"],
    image: "👕",
    hint: "Kita pakai di badan",
    category: "Pakaian"
  },
  {
    id: 7,
    title: "Meja",
    difficulty: "easy",
    word: "meja",
    syllables: ["me", "ja"],
    image: "🪑",
    hint: "Tempat kita menulis dan belajar",
    category: "Perabot"
  },
  {
    id: 8,
    title: "Kucing",
    difficulty: "easy",
    word: "kucing",
    syllables: ["ku", "cing"],
    image: "🐱",
    hint: "Haiwan yang suka mengejar tikus",
    category: "Haiwan"
  },
  {
    id: 9,
    title: "Ayam",
    difficulty: "easy",
    word: "ayam",
    syllables: ["a", "yam"],
    image: "🐔",
    hint: "Burung yang bertelur",
    category: "Haiwan"
  },
  {
    id: 10,
    title: "Kuda",
    difficulty: "easy",
    word: "kuda",
    syllables: ["ku", "da"],
    image: "🐴",
    hint: "Haiwan yang boleh ditunggang",
    category: "Haiwan"
  },

  // TAHAP 2: KATA SEDERHANA (3 SUKU KATA) - Pelajaran 11-20
  {
    id: 11,
    title: "Bintang",
    difficulty: "medium",
    word: "bintang",
    syllables: ["bin", "tang"],
    image: "⭐",
    hint: "Bercahaya di langit malam",
    category: "Alam"
  },
  {
    id: 12,
    title: "Kelapa",
    difficulty: "medium",
    word: "kelapa",
    syllables: ["ke", "la", "pa"],
    image: "🥥",
    hint: "Buah besar yang ada air di dalam",
    category: "Tumbuhan"
  },
  {
    id: 13,
    title: "Rama-rama",
    difficulty: "medium",
    word: "rama-rama",
    syllables: ["ra", "ma", "ra", "ma"],
    image: "🦋",
    hint: "Serangga cantik dengan sayap berwarna",
    category: "Serangga"
  },
  {
    id: 14,
    title: "Sekolah",
    difficulty: "medium",
    word: "sekolah",
    syllables: ["se", "ko", "lah"],
    image: "🏫",
    hint: "Tempat kita belajar",
    category: "Tempat"
  },
  {
    id: 15,
    title: "Durian",
    difficulty: "medium",
    word: "durian",
    syllables: ["du", "ri", "an"],
    image: "🥮",
    hint: "Buah berduri dengan bau yang kuat",
    category: "Buah-buahan"
  },
  {
    id: 16,
    title: "Telefon",
    difficulty: "medium",
    word: "telefon",
    syllables: ["te", "le", "fon"],
    image: "📱",
    hint: "Alat untuk bercakap jarak jauh",
    category: "Teknologi"
  },
  {
    id: 17,
    title: "Gajah",
    difficulty: "medium",
    word: "gajah",
    syllables: ["ga", "jah"],
    image: "🐘",
    hint: "Haiwan besar dengan belalai panjang",
    category: "Haiwan"
  },
  {
    id: 18,
    title: "Pisang",
    difficulty: "medium",
    word: "pisang",
    syllables: ["pi", "sang"],
    image: "🍌",
    hint: "Buah kuning panjang yang monyet suka",
    category: "Buah-buahan"
  },
  {
    id: 19,
    title: "Burung",
    difficulty: "medium",
    word: "burung",
    syllables: ["bu", "rung"],
    image: "🐦",
    hint: "Haiwan yang boleh terbang",
    category: "Haiwan"
  },
  {
    id: 20,
    title: "Bantal",
    difficulty: "medium",
    word: "bantal",
    syllables: ["ban", "tal"],
    image: "🛏️",
    hint: "Kita letak kepala di atasnya ketika tidur",
    category: "Perabot"
  },

  // TAHAP 3: KATA SUSAH (3-4 SUKU KATA) - Pelajaran 21-30
  {
    id: 21,
    title: "Keretapi",
    difficulty: "hard",
    word: "keretapi",
    syllables: ["ke", "re", "ta", "pi"],
    image: "🚂",
    hint: "Kenderaan panjang yang bergerak di atas landasan",
    category: "Kenderaan"
  },
  {
    id: 22,
    title: "Komputer",
    difficulty: "hard",
    word: "komputer",
    syllables: ["kom", "pu", "ter"],
    image: "💻",
    hint: "Mesin untuk coding dan belajar",
    category: "Teknologi"
  },
  {
    id: 23,
    title: "Helikopter",
    difficulty: "hard",
    word: "helikopter",
    syllables: ["he", "li", "kop", "ter"],
    image: "🚁",
    hint: "Kenderaan yang terbang dengan kipas di atas",
    category: "Kenderaan"
  },
  {
    id: 24,
    title: "Perpustakaan",
    difficulty: "hard",
    word: "perpustakaan",
    syllables: ["per", "pus", "ta", "ka", "an"],
    image: "📖",
    hint: "Tempat menyimpan banyak buku",
    category: "Tempat"
  },
  {
    id: 25,
    title: "Universiti",
    difficulty: "hard",
    word: "universiti",
    syllables: ["u", "ni", "ver", "si", "ti"],
    image: "🎓",
    hint: "Tempat belajar lepas sekolah menengah",
    category: "Tempat"
  },
  {
    id: 26,
    title: "Beruang",
    difficulty: "hard",
    word: "beruang",
    syllables: ["be", "ru", "ang"],
    image: "🐻",
    hint: "Haiwan besar berbulu yang suka makan madu",
    category: "Haiwan"
  },
  {
    id: 27,
    title: "Sayuran",
    difficulty: "hard",
    word: "sayuran",
    syllables: ["sa", "yu", "ran"],
    image: "🥗",
    hint: "Makanan hijau yang sihat untuk badan",
    category: "Makanan"
  },
  {
    id: 28,
    title: "Arnab",
    difficulty: "hard",
    word: "arnab",
    syllables: ["ar", "nab"],
    image: "🐰",
    hint: "Haiwan berbulu dengan telinga panjang yang suka makan lobak merah",
    category: "Haiwan"
  },
  {
    id: 29,
    title: "Kerajinan",
    difficulty: "hard",
    word: "kerajinan",
    syllables: ["ke", "ra", "ji", "nan"],
    image: "💪",
    hint: "Sifat rajin dan bekerja keras",
    category: "Sifat"
  },
  {
    id: 30,
    title: "Kebersihan",
    difficulty: "hard",
    word: "kebersihan",
    syllables: ["ke", "ber", "si", "han"],
    image: "🧹",
    hint: "Keadaan yang bersih dan suci",
    category: "Sifat"
  }
];

// Helper function untuk dapatkan lesson by ID
export const getLessonById = (id) => {
  return spellingLessons.find(lesson => lesson.id === parseInt(id));
};

// Helper function untuk dapatkan lessons by difficulty
export const getLessonsByDifficulty = (difficulty) => {
  return spellingLessons.filter(lesson => lesson.difficulty === difficulty);
};

// Helper function untuk dapatkan lessons by category
export const getLessonsByCategory = (category) => {
  return spellingLessons.filter(lesson => lesson.category === category);
};
