// Data untuk 20 buku cerita mudah
// Maksimum 3 suku kata setiap perkataan - untuk kanak-kanak belajar membaca

export const storyBooks = [
  // TAHAP 1: CERITA SANGAT MUDAH (5-8 ayat, 1-2 suku kata) - Buku 1-7
  {
    id: 1,
    title: "Kucing Saya",
    difficulty: "easy",
    coverImage: "/images/stories/kucing-saya.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini kucing saya.",
        image: "/images/stories/kucing-saya-1.png",
        emoji: "🐱",
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 2,
        text: "Nama dia Mimi.",
        image: "/images/stories/kucing-saya-2.png",
        emoji: "😺",
        secondaryEmojis: ["✨", "💕"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 3,
        text: "Mimi suka main bola.",
        image: "/images/stories/kucing-saya-3.png",
        emoji: "🐱",
        secondaryEmojis: ["⚽", "🎾"],
        bgGradient: "bg-gradient-to-br from-green-100 to-blue-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Mimi suka makan ikan.",
        image: "/images/stories/kucing-saya-4.png",
        emoji: "😋",
        secondaryEmojis: ["🐟", "🍽️"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 5,
        text: "Saya sayang Mimi.",
        image: "/images/stories/kucing-saya-5.png",
        emoji: "🐱",
        secondaryEmojis: ["❤️", "🤗"],
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      }
    ]
  },
  {
    id: 2,
    title: "Bola Biru",
    difficulty: "easy",
    coverImage: "/images/stories/bola-biru.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini bola biru saya.",
        image: "/images/stories/bola-biru-1.png",
        emoji: "🔵",
        secondaryEmojis: ["⚽"],
        bgGradient: "bg-gradient-to-br from-blue-200 to-blue-100 border-blue-300"
      },
      {
        pageNumber: 2,
        text: "Bola ini besar.",
        image: "/images/stories/bola-biru-2.png",
        emoji: "⚽",
        bgGradient: "bg-gradient-to-br from-indigo-100 to-blue-100 border-indigo-200"
      },
      {
        pageNumber: 3,
        text: "Saya main dengan adik.",
        image: "/images/stories/bola-biru-3.png",
        emoji: "👦",
        secondaryEmojis: ["👧", "⚽"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Kami tendang bola.",
        image: "/images/stories/bola-biru-4.png",
        emoji: "🦵",
        secondaryEmojis: ["⚽", "💨"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Kami gembira!",
        image: "/images/stories/bola-biru-5.png",
        emoji: "😄",
        secondaryEmojis: ["🎉", "⭐"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      }
    ]
  },
  {
    id: 3,
    title: "Hari Hujan",
    difficulty: "easy",
    coverImage: "/images/stories/hari-hujan.png",
    pages: [
      {
        pageNumber: 1,
        text: "Hari ini hujan.",
        image: "/images/stories/hari-hujan-1.png",
        emoji: "🌧️",
        secondaryEmojis: ["☁️", "💧"],
        bgGradient: "bg-gradient-to-br from-gray-200 to-blue-100 border-gray-300"
      },
      {
        pageNumber: 2,
        text: "Saya buka payung.",
        image: "/images/stories/hari-hujan-2.png",
        emoji: "☂️",
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Payung saya merah.",
        image: "/images/stories/hari-hujan-3.png",
        emoji: "☂️",
        secondaryEmojis: ["❤️"],
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      },
      {
        pageNumber: 4,
        text: "Saya lompat dalam air.",
        image: "/images/stories/hari-hujan-4.png",
        emoji: "🦘",
        secondaryEmojis: ["💦", "💧"],
        bgGradient: "bg-gradient-to-br from-cyan-100 to-blue-200 border-cyan-200"
      },
      {
        pageNumber: 5,
        text: "Main hujan best!",
        image: "/images/stories/hari-hujan-5.png",
        emoji: "😄",
        secondaryEmojis: ["🌧️", "✨"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      }
    ]
  },
  {
    id: 4,
    title: "Makan Nasi",
    difficulty: "easy",
    coverImage: "/images/stories/makan-nasi.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini nasi putih.",
        image: "/images/stories/makan-nasi-1.png",
        emoji: "🍚",
        bgGradient: "bg-gradient-to-br from-white to-gray-100 border-gray-200"
      },
      {
        pageNumber: 2,
        text: "Ini ikan goreng.",
        image: "/images/stories/makan-nasi-2.png",
        emoji: "🐟",
        secondaryEmojis: ["🔥"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 3,
        text: "Ini sayur hijau.",
        image: "/images/stories/makan-nasi-3.png",
        emoji: "🥬",
        secondaryEmojis: ["🥦"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Saya makan semua.",
        image: "/images/stories/makan-nasi-4.png",
        emoji: "😋",
        secondaryEmojis: ["🍽️", "🍴"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Sedap sangat!",
        image: "/images/stories/makan-nasi-5.png",
        emoji: "😍",
        secondaryEmojis: ["⭐", "✨"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-red-100 border-pink-200"
      }
    ]
  },
  {
    id: 5,
    title: "Buku Saya",
    difficulty: "easy",
    coverImage: "/images/stories/buku-saya.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini buku saya.",
        image: "/images/stories/buku-saya-1.png",
        emoji: "📕",
        bgGradient: "bg-gradient-to-br from-red-100 to-orange-100 border-red-200"
      },
      {
        pageNumber: 2,
        text: "Buku ini tebal.",
        image: "/images/stories/buku-saya-2.png",
        emoji: "📚",
        bgGradient: "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Ada gambar cantik.",
        image: "/images/stories/buku-saya-3.png",
        emoji: "🖼️",
        secondaryEmojis: ["🎨", "✨"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      },
      {
        pageNumber: 4,
        text: "Saya baca setiap hari.",
        image: "/images/stories/buku-saya-4.png",
        emoji: "📖",
        secondaryEmojis: ["☀️"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Saya suka baca buku.",
        image: "/images/stories/buku-saya-5.png",
        emoji: "😊",
        secondaryEmojis: ["📚", "❤️"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      }
    ]
  },
  {
    id: 6,
    title: "Kereta Merah",
    difficulty: "easy",
    coverImage: "/images/stories/kereta-merah.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini kereta Ayah.",
        image: "/images/stories/kereta-merah-1.png",
        emoji: "🚗",
        bgGradient: "bg-gradient-to-br from-gray-100 to-slate-200 border-gray-300"
      },
      {
        pageNumber: 2,
        text: "Kereta ni merah.",
        image: "/images/stories/kereta-merah-2.png",
        emoji: "🚗",
        secondaryEmojis: ["❤️"],
        bgGradient: "bg-gradient-to-br from-red-100 to-orange-100 border-red-200"
      },
      {
        pageNumber: 3,
        text: "Kami naik kereta.",
        image: "/images/stories/kereta-merah-3.png",
        emoji: "👨",
        secondaryEmojis: ["👦", "🚗"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 4,
        text: "Pergi ke taman.",
        image: "/images/stories/kereta-merah-4.png",
        emoji: "🏞️",
        secondaryEmojis: ["🌳"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 5,
        text: "Selamat sampai!",
        image: "/images/stories/kereta-merah-5.png",
        emoji: "🎯",
        secondaryEmojis: ["👍", "✨"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      }
    ]
  },
  {
    id: 7,
    title: "Bunga di Taman",
    difficulty: "easy",
    coverImage: "/images/stories/bunga-taman.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ini taman bunga.",
        image: "/images/stories/bunga-taman-1.png",
        emoji: "🏡",
        secondaryEmojis: ["🌸", "🌺"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 2,
        text: "Ada bunga merah.",
        image: "/images/stories/bunga-taman-2.png",
        emoji: "🌹",
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      },
      {
        pageNumber: 3,
        text: "Ada bunga kuning.",
        image: "/images/stories/bunga-taman-3.png",
        emoji: "🌻",
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 4,
        text: "Rama-rama hinggap.",
        image: "/images/stories/bunga-taman-4.png",
        emoji: "🦋",
        secondaryEmojis: ["🌸"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      },
      {
        pageNumber: 5,
        text: "Cantik sangat!",
        image: "/images/stories/bunga-taman-5.png",
        emoji: "😍",
        secondaryEmojis: ["🌺", "✨"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200"
      }
    ]
  },

  // TAHAP 2: CERITA MUDAH (6-10 ayat, 2-3 suku kata) - Buku 8-14
  {
    id: 8,
    title: "Pergi Sekolah",
    difficulty: "medium",
    coverImage: "/images/stories/pergi-sekolah.png",
    pages: [
      {
        pageNumber: 1,
        text: "Pagi ini saya bangun awal.",
        image: "/images/stories/pergi-sekolah-1.png",
        emoji: "⏰",
        secondaryEmojis: ["🌅"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 2,
        text: "Saya pakai baju sekolah.",
        image: "/images/stories/pergi-sekolah-2.png",
        emoji: "👕",
        secondaryEmojis: ["🎒"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Ibu buat sarapan sedap.",
        image: "/images/stories/pergi-sekolah-3.png",
        emoji: "👩",
        secondaryEmojis: ["🍳", "😊"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200"
      },
      {
        pageNumber: 4,
        text: "Saya makan roti dan minum susu.",
        image: "/images/stories/pergi-sekolah-4.png",
        emoji: "🍞",
        secondaryEmojis: ["🥛"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Ayah hantar saya ke sekolah.",
        image: "/images/stories/pergi-sekolah-5.png",
        emoji: "🚗",
        secondaryEmojis: ["👨", "👦"],
        bgGradient: "bg-gradient-to-br from-gray-100 to-blue-100 border-gray-200"
      },
      {
        pageNumber: 6,
        text: "Saya jumpa kawan-kawan.",
        image: "/images/stories/pergi-sekolah-6.png",
        emoji: "👋",
        secondaryEmojis: ["👦", "👧"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 7,
        text: "Kami belajar dengan ceria!",
        image: "/images/stories/pergi-sekolah-7.png",
        emoji: "📚",
        secondaryEmojis: ["😄", "✨"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      }
    ]
  },
  {
    id: 9,
    title: "Main di Pantai",
    difficulty: "medium",
    coverImage: "/images/stories/main-pantai.png",
    pages: [
      {
        pageNumber: 1,
        text: "Kami pergi ke pantai.",
        image: "/images/stories/main-pantai-1.png",
        emoji: "🏖️",
        secondaryEmojis: ["🚗"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 2,
        text: "Pasir di pantai lembut.",
        image: "/images/stories/main-pantai-2.png",
        emoji: "🏝️",
        secondaryEmojis: ["✋"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 3,
        text: "Saya buat istana pasir.",
        image: "/images/stories/main-pantai-3.png",
        emoji: "🏰",
        secondaryEmojis: ["🪣", "⛱️"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200"
      },
      {
        pageNumber: 4,
        text: "Adik cari kerang cantik.",
        image: "/images/stories/main-pantai-4.png",
        emoji: "🐚",
        secondaryEmojis: ["👧", "✨"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 5,
        text: "Ombak datang ke pantai.",
        image: "/images/stories/main-pantai-5.png",
        emoji: "🌊",
        secondaryEmojis: ["💧"],
        bgGradient: "bg-gradient-to-br from-cyan-100 to-blue-200 border-cyan-200"
      },
      {
        pageNumber: 6,
        text: "Kami main air dengan gembira.",
        image: "/images/stories/main-pantai-6.png",
        emoji: "😄",
        secondaryEmojis: ["💦", "🏊"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-teal-100 border-blue-200"
      },
      {
        pageNumber: 7,
        text: "Hari yang sangat best!",
        image: "/images/stories/main-pantai-7.png",
        emoji: "🎉",
        secondaryEmojis: ["⭐", "☀️"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-pink-100 border-yellow-200"
      }
    ]
  },
  {
    id: 10,
    title: "Hari Lahir Saya",
    difficulty: "medium",
    coverImage: "/images/stories/hari-lahir.png",
    pages: [
      {
        pageNumber: 1,
        text: "Hari ini hari lahir saya!",
        image: "/images/stories/hari-lahir-1.png",
        emoji: "🎂",
        secondaryEmojis: ["🎉", "🎈"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 2,
        text: "Saya sudah enam tahun.",
        image: "/images/stories/hari-lahir-2.png",
        emoji: "6️⃣",
        secondaryEmojis: ["🎂"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Ibu buat kek coklat.",
        image: "/images/stories/hari-lahir-3.png",
        emoji: "🍰",
        secondaryEmojis: ["👩", "🍫"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 4,
        text: "Ada lilin di atas kek.",
        image: "/images/stories/hari-lahir-4.png",
        emoji: "🕯️",
        secondaryEmojis: ["🎂", "🔥"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Kawan-kawan datang ke rumah.",
        image: "/images/stories/hari-lahir-5.png",
        emoji: "👫",
        secondaryEmojis: ["🏡", "🎁"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 6,
        text: "Kami main dan ketawa.",
        image: "/images/stories/hari-lahir-6.png",
        emoji: "😂",
        secondaryEmojis: ["🎮", "🎪"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      },
      {
        pageNumber: 7,
        text: "Terima kasih semua!",
        image: "/images/stories/hari-lahir-7.png",
        emoji: "🙏",
        secondaryEmojis: ["❤️", "✨"],
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      }
    ]
  },
  {
    id: 11,
    title: "Kebun Nenek",
    difficulty: "medium",
    coverImage: "/images/stories/kebun-nenek.png",
    pages: [
      {
        pageNumber: 1,
        text: "Nenek ada kebun besar.",
        image: "/images/stories/kebun-nenek-1.png",
        emoji: "👵",
        secondaryEmojis: ["🌱", "🏡"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 2,
        text: "Ada banyak sayur hijau.",
        image: "/images/stories/kebun-nenek-2.png",
        emoji: "🥬",
        secondaryEmojis: ["🥦", "🌿"],
        bgGradient: "bg-gradient-to-br from-green-200 to-lime-100 border-green-300"
      },
      {
        pageNumber: 3,
        text: "Ada pokok tomato merah.",
        image: "/images/stories/kebun-nenek-3.png",
        emoji: "🍅",
        secondaryEmojis: ["🌱"],
        bgGradient: "bg-gradient-to-br from-red-100 to-orange-100 border-red-200"
      },
      {
        pageNumber: 4,
        text: "Saya tolong Nenek siram.",
        image: "/images/stories/kebun-nenek-4.png",
        emoji: "💧",
        secondaryEmojis: ["👦", "🚿"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 5,
        text: "Nenek petik sayur segar.",
        image: "/images/stories/kebun-nenek-5.png",
        emoji: "🧺",
        secondaryEmojis: ["👵", "🥬"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 6,
        text: "Kami masak untuk makan.",
        image: "/images/stories/kebun-nenek-6.png",
        emoji: "🍳",
        secondaryEmojis: ["👩‍🍳"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 7,
        text: "Sayur dari kebun paling sedap!",
        image: "/images/stories/kebun-nenek-7.png",
        emoji: "😋",
        secondaryEmojis: ["🥗", "⭐"],
        bgGradient: "bg-gradient-to-br from-green-100 to-yellow-100 border-green-200"
      }
    ]
  },
  {
    id: 12,
    title: "Kawan Baru",
    difficulty: "medium",
    coverImage: "/images/stories/kawan-baru.png",
    pages: [
      {
        pageNumber: 1,
        text: "Hari ini ada budak baru.",
        image: "/images/stories/kawan-baru-1.png",
        emoji: "👦",
        secondaryEmojis: ["🆕"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 2,
        text: "Nama dia Ahmad.",
        image: "/images/stories/kawan-baru-2.png",
        emoji: "😊",
        secondaryEmojis: ["👋"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 3,
        text: "Saya hulur tangan.",
        image: "/images/stories/kawan-baru-3.png",
        emoji: "🤝",
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 4,
        text: "Kami jadi kawan baik.",
        image: "/images/stories/kawan-baru-4.png",
        emoji: "👦",
        secondaryEmojis: ["👦", "❤️"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-red-100 border-pink-200"
      },
      {
        pageNumber: 5,
        text: "Main bola masa rehat.",
        image: "/images/stories/kawan-baru-5.png",
        emoji: "⚽",
        secondaryEmojis: ["🏃"],
        bgGradient: "bg-gradient-to-br from-green-100 to-lime-100 border-green-200"
      },
      {
        pageNumber: 6,
        text: "Belajar sama-sama.",
        image: "/images/stories/kawan-baru-6.png",
        emoji: "📚",
        secondaryEmojis: ["✏️", "👥"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200"
      },
      {
        pageNumber: 7,
        text: "Gembira ada kawan baru!",
        image: "/images/stories/kawan-baru-7.png",
        emoji: "😄",
        secondaryEmojis: ["🎉", "✨"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      }
    ]
  },
  {
    id: 13,
    title: "Pokok Mangga",
    difficulty: "medium",
    coverImage: "/images/stories/pokok-mangga.png",
    pages: [
      {
        pageNumber: 1,
        text: "Di rumah ada pokok mangga.",
        image: "/images/stories/pokok-mangga-1.png",
        emoji: "🏡",
        secondaryEmojis: ["🌳"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 2,
        text: "Pokok ni tinggi sangat.",
        image: "/images/stories/pokok-mangga-2.png",
        emoji: "🌳",
        secondaryEmojis: ["📏"],
        bgGradient: "bg-gradient-to-br from-green-200 to-lime-100 border-green-300"
      },
      {
        pageNumber: 3,
        text: "Buah mangga sudah masak.",
        image: "/images/stories/pokok-mangga-3.png",
        emoji: "🥭",
        secondaryEmojis: ["✨"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 4,
        text: "Datuk petik dengan galah.",
        image: "/images/stories/pokok-mangga-4.png",
        emoji: "👴",
        secondaryEmojis: ["🪝"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 5,
        text: "Mangga jatuh ke tanah.",
        image: "/images/stories/pokok-mangga-5.png",
        emoji: "🥭",
        secondaryEmojis: ["⬇️", "💥"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200"
      },
      {
        pageNumber: 6,
        text: "Saya makan mangga manis.",
        image: "/images/stories/pokok-mangga-6.png",
        emoji: "😋",
        secondaryEmojis: ["🥭"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 7,
        text: "Sedap dan segar!",
        image: "/images/stories/pokok-mangga-7.png",
        emoji: "😍",
        secondaryEmojis: ["⭐", "✨"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      }
    ]
  },
  {
    id: 14,
    title: "Jalan ke Pasar",
    difficulty: "medium",
    coverImage: "/images/stories/jalan-pasar.png",
    pages: [
      {
        pageNumber: 1,
        text: "Ibu ajak ke pasar pagi.",
        image: "/images/stories/jalan-pasar-1.png",
        emoji: "👩",
        secondaryEmojis: ["🌅", "🛒"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 2,
        text: "Pasar penuh dengan orang.",
        image: "/images/stories/jalan-pasar-2.png",
        emoji: "🏪",
        secondaryEmojis: ["👥", "👥"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Ada kedai sayur segar.",
        image: "/images/stories/jalan-pasar-3.png",
        emoji: "🥬",
        secondaryEmojis: ["🥕", "🥦"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Ada kedai ikan dan ayam.",
        image: "/images/stories/jalan-pasar-4.png",
        emoji: "🐟",
        secondaryEmojis: ["🐔"],
        bgGradient: "bg-gradient-to-br from-cyan-100 to-orange-100 border-cyan-200"
      },
      {
        pageNumber: 5,
        text: "Ibu beli banyak barang.",
        image: "/images/stories/jalan-pasar-5.png",
        emoji: "🛍️",
        secondaryEmojis: ["👩", "💰"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 6,
        text: "Saya tolong bawa beg.",
        image: "/images/stories/jalan-pasar-6.png",
        emoji: "👦",
        secondaryEmojis: ["🛍️", "💪"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200"
      },
      {
        pageNumber: 7,
        text: "Balik rumah dengan gembira.",
        image: "/images/stories/jalan-pasar-7.png",
        emoji: "🏡",
        secondaryEmojis: ["😊", "✨"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-green-100 border-yellow-200"
      }
    ]
  },

  // TAHAP 3: CERITA SEDERHANA (8-12 ayat, 3 suku kata max) - Buku 15-20
  {
    id: 15,
    title: "Lawatan ke Zoo",
    difficulty: "hard",
    coverImage: "/images/stories/lawatan-zoo.png",
    pages: [
      {
        pageNumber: 1,
        text: "Sekolah bawa kami ke zoo.",
        image: "/images/stories/lawatan-zoo-1.png",
        emoji: "🏫",
        secondaryEmojis: ["🚌", "🦁"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-green-100 border-blue-200"
      },
      {
        pageNumber: 2,
        text: "Kami naik bas besar.",
        image: "/images/stories/lawatan-zoo-2.png",
        emoji: "🚌",
        secondaryEmojis: ["👦", "👧"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 3,
        text: "Zoo ada banyak haiwan.",
        image: "/images/stories/lawatan-zoo-3.png",
        emoji: "🦁",
        secondaryEmojis: ["🐘", "🐒"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Saya nampak gajah yang besar.",
        image: "/images/stories/lawatan-zoo-4.png",
        emoji: "🐘",
        secondaryEmojis: ["👀"],
        bgGradient: "bg-gradient-to-br from-gray-100 to-blue-100 border-gray-200"
      },
      {
        pageNumber: 5,
        text: "Ada monyet main di pokok.",
        image: "/images/stories/lawatan-zoo-5.png",
        emoji: "🐒",
        secondaryEmojis: ["🌳", "🍌"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 6,
        text: "Harimau tidur dalam sangkar.",
        image: "/images/stories/lawatan-zoo-6.png",
        emoji: "🐅",
        secondaryEmojis: ["😴"],
        bgGradient: "bg-gradient-to-br from-orange-200 to-yellow-100 border-orange-300"
      },
      {
        pageNumber: 7,
        text: "Burung kakak tua pandai cakap.",
        image: "/images/stories/lawatan-zoo-7.png",
        emoji: "🦜",
        secondaryEmojis: ["💬", "✨"],
        bgGradient: "bg-gradient-to-br from-green-100 to-cyan-100 border-green-200"
      },
      {
        pageNumber: 8,
        text: "Kami makan di kantin zoo.",
        image: "/images/stories/lawatan-zoo-8.png",
        emoji: "🍽️",
        secondaryEmojis: ["🍔", "🥤"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 9,
        text: "Lawatan yang sangat seronok!",
        image: "/images/stories/lawatan-zoo-9.png",
        emoji: "🎉",
        secondaryEmojis: ["😄", "⭐"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      }
    ]
  },
  {
    id: 16,
    title: "Malam Cerah",
    difficulty: "hard",
    coverImage: "/images/stories/malam-cerah.png",
    pages: [
      {
        pageNumber: 1,
        text: "Malam ini langit cerah.",
        image: "/images/stories/malam-cerah-1.png",
        emoji: "🌙",
        secondaryEmojis: ["✨"],
        bgGradient: "bg-gradient-to-br from-indigo-200 to-purple-100 border-indigo-300"
      },
      {
        pageNumber: 2,
        text: "Bintang bersinar terang.",
        image: "/images/stories/malam-cerah-2.png",
        emoji: "⭐",
        secondaryEmojis: ["✨", "💫"],
        bgGradient: "bg-gradient-to-br from-blue-200 to-purple-200 border-blue-300"
      },
      {
        pageNumber: 3,
        text: "Bulan penuh bulat cantik.",
        image: "/images/stories/malam-cerah-3.png",
        emoji: "🌕",
        secondaryEmojis: ["✨"],
        bgGradient: "bg-gradient-to-br from-gray-100 to-blue-100 border-gray-200"
      },
      {
        pageNumber: 4,
        text: "Ayah bawa teleskop.",
        image: "/images/stories/malam-cerah-4.png",
        emoji: "🔭",
        secondaryEmojis: ["👨"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-indigo-100 border-blue-200"
      },
      {
        pageNumber: 5,
        text: "Kami tengok bintang sama-sama.",
        image: "/images/stories/malam-cerah-5.png",
        emoji: "👨‍👦",
        secondaryEmojis: ["⭐", "🔭"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      },
      {
        pageNumber: 6,
        text: "Ayah tunjuk bintang utara.",
        image: "/images/stories/malam-cerah-6.png",
        emoji: "⭐",
        secondaryEmojis: ["👉", "🧭"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 7,
        text: "Saya nampak galaksi jauh.",
        image: "/images/stories/malam-cerah-7.png",
        emoji: "🌌",
        secondaryEmojis: ["✨", "🪐"],
        bgGradient: "bg-gradient-to-br from-indigo-200 to-purple-200 border-indigo-300"
      },
      {
        pageNumber: 8,
        text: "Langit sangat indah malam ni.",
        image: "/images/stories/malam-cerah-8.png",
        emoji: "😍",
        secondaryEmojis: ["🌙", "⭐"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200"
      },
      {
        pageNumber: 9,
        text: "Saya suka ilmu falak!",
        image: "/images/stories/malam-cerah-9.png",
        emoji: "🔭",
        secondaryEmojis: ["❤️", "🌟"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200"
      }
    ]
  },
  {
    id: 17,
    title: "Tolong Ibu",
    difficulty: "hard",
    coverImage: "/images/stories/tolong-ibu.png",
    pages: [
      {
        pageNumber: 1,
        text: "Sabtu hari tolong Ibu.",
        image: "/images/stories/tolong-ibu-1.png",
        emoji: "🗓️",
        secondaryEmojis: ["👩", "❤️"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 2,
        text: "Saya sapu lantai rumah.",
        image: "/images/stories/tolong-ibu-2.png",
        emoji: "🧹",
        secondaryEmojis: ["👦"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Adik cuci pinggan mangkuk.",
        image: "/images/stories/tolong-ibu-3.png",
        emoji: "🍽️",
        secondaryEmojis: ["👧", "💦"],
        bgGradient: "bg-gradient-to-br from-cyan-100 to-blue-100 border-cyan-200"
      },
      {
        pageNumber: 4,
        text: "Kakak sidai baju basah.",
        image: "/images/stories/tolong-ibu-4.png",
        emoji: "👚",
        secondaryEmojis: ["👧", "☀️"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Abang potong rumput halaman.",
        image: "/images/stories/tolong-ibu-5.png",
        emoji: "🌱",
        secondaryEmojis: ["👦", "✂️"],
        bgGradient: "bg-gradient-to-br from-green-100 to-lime-100 border-green-200"
      },
      {
        pageNumber: 6,
        text: "Ibu masak dalam dapur.",
        image: "/images/stories/tolong-ibu-6.png",
        emoji: "👩‍🍳",
        secondaryEmojis: ["🍳", "🥘"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200"
      },
      {
        pageNumber: 7,
        text: "Rumah jadi bersih dan cantik.",
        image: "/images/stories/tolong-ibu-7.png",
        emoji: "🏡",
        secondaryEmojis: ["✨", "💫"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 8,
        text: "Ibu gembira dengan kami.",
        image: "/images/stories/tolong-ibu-8.png",
        emoji: "😊",
        secondaryEmojis: ["👩", "❤️"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200"
      },
      {
        pageNumber: 9,
        text: "Tolong Ibu buat hati senang.",
        image: "/images/stories/tolong-ibu-9.png",
        emoji: "❤️",
        secondaryEmojis: ["😄", "✨"],
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      }
    ]
  },
  {
    id: 18,
    title: "Hujan Lebat",
    difficulty: "hard",
    coverImage: "/images/stories/hujan-lebat.png",
    pages: [
      {
        pageNumber: 1,
        text: "Petang tadi langit gelap.",
        image: "/images/stories/hujan-lebat-1.png",
        emoji: "☁️",
        secondaryEmojis: ["🌑"],
        bgGradient: "bg-gradient-to-br from-gray-300 to-gray-200 border-gray-400"
      },
      {
        pageNumber: 2,
        text: "Angin kuat mula bertiup.",
        image: "/images/stories/hujan-lebat-2.png",
        emoji: "💨",
        secondaryEmojis: ["🌬️"],
        bgGradient: "bg-gradient-to-br from-gray-200 to-blue-100 border-gray-300"
      },
      {
        pageNumber: 3,
        text: "Kilat menyambar di langit.",
        image: "/images/stories/hujan-lebat-3.png",
        emoji: "⚡",
        secondaryEmojis: ["☁️"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-gray-200 border-yellow-200"
      },
      {
        pageNumber: 4,
        text: "Guruh berbunyi kuat sangat.",
        image: "/images/stories/hujan-lebat-4.png",
        emoji: "⚡",
        secondaryEmojis: ["💥", "🔊"],
        bgGradient: "bg-gradient-to-br from-gray-300 to-blue-200 border-gray-400"
      },
      {
        pageNumber: 5,
        text: "Hujan turun dengan lebat.",
        image: "/images/stories/hujan-lebat-5.png",
        emoji: "🌧️",
        secondaryEmojis: ["💧", "💧"],
        bgGradient: "bg-gradient-to-br from-blue-200 to-cyan-100 border-blue-300"
      },
      {
        pageNumber: 6,
        text: "Kami semua masuk rumah.",
        image: "/images/stories/hujan-lebat-6.png",
        emoji: "🏃",
        secondaryEmojis: ["🏡"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-green-100 border-blue-200"
      },
      {
        pageNumber: 7,
        text: "Ibu tutup semua tingkap.",
        image: "/images/stories/hujan-lebat-7.png",
        emoji: "🪟",
        secondaryEmojis: ["👩"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 8,
        text: "Kami minum coklat panas.",
        image: "/images/stories/hujan-lebat-8.png",
        emoji: "☕",
        secondaryEmojis: ["🍫", "😊"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200"
      },
      {
        pageNumber: 9,
        text: "Selamat di dalam rumah!",
        image: "/images/stories/hujan-lebat-9.png",
        emoji: "🏡",
        secondaryEmojis: ["😌", "✨"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      }
    ]
  },
  {
    id: 19,
    title: "Berkebun Bersama",
    difficulty: "hard",
    coverImage: "/images/stories/berkebun-bersama.png",
    pages: [
      {
        pageNumber: 1,
        text: "Pagi Ahad kami berkebun.",
        image: "/images/stories/berkebun-1.png",
        emoji: "🌅",
        secondaryEmojis: ["👨‍🌾", "🌱"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 2,
        text: "Ayah cangkul tanah keras.",
        image: "/images/stories/berkebun-2.png",
        emoji: "⛏️",
        secondaryEmojis: ["👨", "💪"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 3,
        text: "Ibu tanam benih sayur.",
        image: "/images/stories/berkebun-3.png",
        emoji: "👩‍🌾",
        secondaryEmojis: ["🌱", "✋"],
        bgGradient: "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Saya siram dengan air.",
        image: "/images/stories/berkebun-4.png",
        emoji: "💧",
        secondaryEmojis: ["👦", "🚿"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 5,
        text: "Setiap hari kami jaga.",
        image: "/images/stories/berkebun-5.png",
        emoji: "📅",
        secondaryEmojis: ["❤️", "🌱"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 6,
        text: "Sayur mula tumbuh hijau.",
        image: "/images/stories/berkebun-6.png",
        emoji: "🌱",
        secondaryEmojis: ["🌿", "✨"],
        bgGradient: "bg-gradient-to-br from-green-100 to-lime-100 border-green-200"
      },
      {
        pageNumber: 7,
        text: "Dua minggu sudah besar.",
        image: "/images/stories/berkebun-7.png",
        emoji: "🥬",
        secondaryEmojis: ["📏", "😊"],
        bgGradient: "bg-gradient-to-br from-green-200 to-emerald-100 border-green-300"
      },
      {
        pageNumber: 8,
        text: "Kami petik untuk makan.",
        image: "/images/stories/berkebun-8.png",
        emoji: "🧺",
        secondaryEmojis: ["🥬", "🥕"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-yellow-100 border-orange-200"
      },
      {
        pageNumber: 9,
        text: "Hasil kerja keras kami!",
        image: "/images/stories/berkebun-9.png",
        emoji: "🎉",
        secondaryEmojis: ["🥗", "⭐"],
        bgGradient: "bg-gradient-to-br from-green-100 to-yellow-100 border-green-200"
      }
    ]
  },
  {
    id: 20,
    title: "Sahabat Baik",
    difficulty: "hard",
    coverImage: "/images/stories/sahabat-baik.png",
    pages: [
      {
        pageNumber: 1,
        text: "Siti kawan baik saya.",
        image: "/images/stories/sahabat-baik-1.png",
        emoji: "👧",
        secondaryEmojis: ["👦", "❤️"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      },
      {
        pageNumber: 2,
        text: "Kami duduk sebelah-menyebelah.",
        image: "/images/stories/sahabat-baik-2.png",
        emoji: "👫",
        secondaryEmojis: ["🪑"],
        bgGradient: "bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200"
      },
      {
        pageNumber: 3,
        text: "Belajar sama-sama di kelas.",
        image: "/images/stories/sahabat-baik-3.png",
        emoji: "📚",
        secondaryEmojis: ["✏️", "👥"],
        bgGradient: "bg-gradient-to-br from-green-100 to-teal-100 border-green-200"
      },
      {
        pageNumber: 4,
        text: "Main bersama waktu rehat.",
        image: "/images/stories/sahabat-baik-4.png",
        emoji: "🎮",
        secondaryEmojis: ["⚽", "😄"],
        bgGradient: "bg-gradient-to-br from-yellow-100 to-orange-100 border-yellow-200"
      },
      {
        pageNumber: 5,
        text: "Kalau susah kami tolong.",
        image: "/images/stories/sahabat-baik-5.png",
        emoji: "🤝",
        secondaryEmojis: ["❤️"],
        bgGradient: "bg-gradient-to-br from-orange-100 to-red-100 border-orange-200"
      },
      {
        pageNumber: 6,
        text: "Kalau gembira kami kongsi.",
        image: "/images/stories/sahabat-baik-6.png",
        emoji: "😊",
        secondaryEmojis: ["🎉", "✨"],
        bgGradient: "bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200"
      },
      {
        pageNumber: 7,
        text: "Kawan baik selalu setia.",
        image: "/images/stories/sahabat-baik-7.png",
        emoji: "💖",
        secondaryEmojis: ["👫"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-rose-100 border-pink-200"
      },
      {
        pageNumber: 8,
        text: "Saya sayang kawan saya.",
        image: "/images/stories/sahabat-baik-8.png",
        emoji: "❤️",
        secondaryEmojis: ["👧", "👦"],
        bgGradient: "bg-gradient-to-br from-red-100 to-pink-100 border-red-200"
      },
      {
        pageNumber: 9,
        text: "Sahabat untuk selamanya!",
        image: "/images/stories/sahabat-baik-9.png",
        emoji: "🤗",
        secondaryEmojis: ["💕", "✨"],
        bgGradient: "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
      }
    ]
  }
];

// Helper function untuk dapatkan story by ID
export const getStoryById = (id) => {
  return storyBooks.find(story => story.id === parseInt(id));
};

// Helper function untuk dapatkan stories by difficulty
export const getStoriesByDifficulty = (difficulty) => {
  return storyBooks.filter(story => story.difficulty === difficulty);
};
