import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Data untuk aktiviti pembelajaran
const codingTerms = [
  {
    id: 1,
    term: 'VARIABLE',
    emoji: '📦',
    definition: 'Kotak untuk simpan maklumat',
    example: 'let nama = "Ahmad"',
    analogy: 'Macam bekas atau bakul untuk simpan barang'
  },
  {
    id: 2,
    term: 'FUNCTION',
    emoji: '⚙️',
    definition: 'Mesin yang buat kerja bila dipanggil',
    example: 'function buatJus() { ... }',
    analogy: 'Macam mesin jus - masuk buah, keluar jus'
  },
  {
    id: 3,
    term: 'LOOP',
    emoji: '🔁',
    definition: 'Ulang kerja berkali-kali',
    example: 'repeat 10 times { ... }',
    analogy: 'Macam lari mengelilingi padang 5 kali'
  },
  {
    id: 4,
    term: 'IF-ELSE',
    emoji: '🤔',
    definition: 'Buat keputusan berdasarkan keadaan',
    example: 'if (hujan) { bawa payung }',
    analogy: 'Macam pilih jalan kiri ATAU kanan'
  },
  {
    id: 5,
    term: 'ARRAY',
    emoji: '🗃️',
    definition: 'Senarai untuk simpan banyak item',
    example: 'buah = ["epal", "oren"]',
    analogy: 'Macam bakul yang ada banyak buah'
  },
  {
    id: 6,
    term: 'STRING',
    emoji: '📝',
    definition: 'Perkataan atau ayat dalam code',
    example: '"Hello World"',
    analogy: 'Macam tulis ayat dalam tanda petikan'
  },
  {
    id: 7,
    term: 'NUMBER',
    emoji: '🔢',
    definition: 'Nombor untuk kira atau matematik',
    example: '42 atau 3.14',
    analogy: 'Macam nombor biasa yang kita guna'
  },
  {
    id: 8,
    term: 'BOOLEAN',
    emoji: '✅❌',
    definition: 'TRUE (betul) atau FALSE (salah)',
    example: 'let hujan = true',
    analogy: 'Macam jawab soalan Ya atau Tidak'
  }
]

const matchingPairs = [
  { id: 1, term: 'VARIABLE', match: '📦 Simpan maklumat', termEmoji: '📦' },
  { id: 2, term: 'FUNCTION', match: '⚙️ Mesin buat kerja', termEmoji: '⚙️' },
  { id: 3, term: 'LOOP', match: '🔁 Ulang berkali-kali', termEmoji: '🔁' },
  { id: 4, term: 'IF-ELSE', match: '🤔 Buat keputusan', termEmoji: '🤔' },
  { id: 5, term: 'ARRAY', match: '🗃️ Senarai banyak item', termEmoji: '🗃️' },
  { id: 6, term: 'STRING', match: '📝 Perkataan/ayat', termEmoji: '📝' }
]

const fillInBlanks = [
  {
    id: 1,
    question: '_____ adalah kotak untuk simpan maklumat dalam coding.',
    answer: 'VARIABLE',
    options: ['VARIABLE', 'FUNCTION', 'LOOP']
  },
  {
    id: 2,
    question: '_____ digunakan untuk ulang kerja berkali-kali.',
    answer: 'LOOP',
    options: ['ARRAY', 'LOOP', 'STRING']
  },
  {
    id: 3,
    question: '_____ adalah senarai yang boleh simpan banyak item sekaligus.',
    answer: 'ARRAY',
    options: ['VARIABLE', 'ARRAY', 'BOOLEAN']
  },
  {
    id: 4,
    question: '_____ membantu kita buat keputusan dalam code.',
    answer: 'IF-ELSE',
    options: ['FUNCTION', 'IF-ELSE', 'NUMBER']
  }
]

// Logic Exercises - Brain Training!
const logicExercises = [
  {
    id: 1,
    type: 'if-else',
    title: '🌦️ Cuaca Hari Ini',
    scenario: 'Ali tengok cuaca pagi ini. Kalau HUJAN, dia akan bawa PAYUNG. Kalau TIDAK HUJAN, dia bawa TOPI.',
    question: 'Hari ini HUJAN. Apa yang Ali bawa?',
    options: ['Payung ☔', 'Topi 🎩', 'Tiada apa-apa'],
    answer: 'Payung ☔',
    explanation: 'IF hujan = TRUE, THEN bawa payung. Ini konsep IF-ELSE!'
  },
  {
    id: 2,
    type: 'if-else',
    title: '🌡️ Suhu Hari Ini',
    scenario: 'IF suhu > 30°C, pakai baju PENDEK.\nELSE IF suhu > 20°C, pakai baju BIASA.\nELSE, pakai JAKET.',
    question: 'Hari ini suhu 25°C. Apa yang kena pakai?',
    options: ['Baju Pendek 👕', 'Baju Biasa 👔', 'Jaket 🧥'],
    answer: 'Baju Biasa 👔',
    explanation: '25°C tidak lebih dari 30°C, tetapi lebih dari 20°C. Jadi pilih baju BIASA!'
  },
  {
    id: 3,
    type: 'loop',
    title: '🔁 Ulang 5 Kali',
    scenario: 'REPEAT 5 times: Tepuk tangan 👏\nBerapa kali Ali tepuk tangan?',
    question: 'Pilih jawapan yang betul:',
    options: ['1 kali', '5 kali', '10 kali'],
    answer: '5 kali',
    explanation: 'LOOP ulang 5 kali, jadi tepuk tangan 5 kali. Ini konsep LOOP!'
  },
  {
    id: 4,
    type: 'loop',
    title: '🍪 Kumpul Cookies',
    scenario: 'Siti ada 0 cookies.\nREPEAT 3 times: Ambil 2 cookies\nBerapa cookies Siti ada sekarang?',
    question: 'Jumlah cookies:',
    options: ['2 cookies', '4 cookies', '6 cookies'],
    answer: '6 cookies',
    explanation: 'Ulang 3 kali, setiap kali ambil 2. Jadi 2+2+2 = 6 cookies!'
  },
  {
    id: 5,
    type: 'variable',
    title: '📦 Kotak Ajaib',
    scenario: 'box = 10\nbox = box + 5\nBerapa nilai box sekarang?',
    question: 'Nilai dalam box:',
    options: ['5', '10', '15'],
    answer: '15',
    explanation: 'box mula-mula 10, kemudian tambah 5. Jadi 10 + 5 = 15!'
  },
  {
    id: 6,
    type: 'variable',
    title: '🎒 Beg Sekolah',
    scenario: 'buku = 3\npensil = 5\njumla = buku + pensil\nBerapa nilai jumla?',
    question: 'Nilai jumla:',
    options: ['3', '5', '8'],
    answer: '8',
    explanation: 'Variable buku = 3, pensil = 5. Jadi jumla = 3 + 5 = 8!'
  },
  {
    id: 7,
    type: 'array',
    title: '🗃️ Bakul Buah',
    scenario: 'buah = ["epal", "oren", "pisang"]\nBerapa BANYAK buah dalam array?',
    question: 'Jumlah item:',
    options: ['2 item', '3 item', '4 item'],
    answer: '3 item',
    explanation: 'Array ada 3 item: epal, oren, pisang. Ini konsep ARRAY LENGTH!'
  },
  {
    id: 8,
    type: 'array',
    title: '📍 Index dalam Array',
    scenario: 'nama = ["Ali", "Siti", "Ahmad"]\nApa yang ada di index 0?',
    question: 'Item di index 0:',
    options: ['Ali', 'Siti', 'Ahmad'],
    answer: 'Ali',
    explanation: 'Index bermula dari 0! Jadi index 0 = Ali, index 1 = Siti, index 2 = Ahmad.'
  },
  {
    id: 9,
    type: 'if-else',
    title: '💯 Markah Peperiksaan',
    scenario: 'IF markah >= 80, dapat A.\nELSE IF markah >= 60, dapat B.\nELSE, dapat C.',
    question: 'Ahmad dapat markah 75. Gred apa dia dapat?',
    options: ['Gred A', 'Gred B', 'Gred C'],
    answer: 'Gred B',
    explanation: '75 tidak sampai 80 (bukan A), tetapi lebih dari 60. Jadi dapat B!'
  },
  {
    id: 10,
    type: 'loop',
    title: '🌟 Lukis Bintang',
    scenario: 'stars = 0\nREPEAT 4 times:\n  stars = stars + 1\nBerapa nilai stars?',
    question: 'Nilai akhir stars:',
    options: ['1', '4', '5'],
    answer: '4',
    explanation: 'Bermula 0, kemudian tambah 1 sebanyak 4 kali. Jadi 0+1+1+1+1 = 4!'
  },
  {
    id: 11,
    type: 'boolean',
    title: '✅ TRUE atau FALSE',
    scenario: 'hujan = true\nayah = false\nIF hujan AND panas, pergi pantai.',
    question: 'Adakah mereka pergi pantai?',
    options: ['Ya, pergi', 'Tidak pergi'],
    answer: 'Tidak pergi',
    explanation: 'Hujan = TRUE tetapi panas = FALSE. Untuk AND, KEDUA-DUA mesti TRUE!'
  },
  {
    id: 12,
    type: 'complex',
    title: '🧠 Cabaran Otak!',
    scenario: 'x = 5\nIF x > 3:\n  x = x * 2\nELSE:\n  x = x + 10\nBerapa nilai x?',
    question: 'Nilai akhir x:',
    options: ['10', '15', '25'],
    answer: '10',
    explanation: '5 lebih besar dari 3 (TRUE), jadi x = 5 * 2 = 10. Tidak masuk ELSE!'
  }
]

// Code Pattern Recognition
const codePatterns = [
  {
    id: 1,
    title: '🔍 Cari Pattern',
    code: `for i in range(3):
  print("Hello")`,
    question: 'Berapa kali "Hello" akan diprint?',
    options: ['1 kali', '3 kali', '5 kali'],
    answer: '3 kali',
    hint: 'range(3) bermaksud 0, 1, 2 - jadi 3 kali!'
  },
  {
    id: 2,
    title: '🔢 Matematik dalam Code',
    code: `a = 10
b = 20
c = a + b
print(c)`,
    question: 'Apa output yang akan keluar?',
    options: ['10', '20', '30'],
    answer: '30',
    hint: 'a + b = 10 + 20 = 30'
  },
  {
    id: 3,
    title: '🎯 Predict Output',
    code: `count = 0
for i in range(5):
  count = count + 1
print(count)`,
    question: 'Apa nilai count yang akan diprint?',
    options: ['0', '5', '10'],
    answer: '5',
    hint: 'Loop 5 kali, setiap kali tambah 1. Jadi 0+1+1+1+1+1 = 5'
  },
  {
    id: 4,
    title: '✅ TRUE or FALSE?',
    code: `x = 15
if x > 10:
  print("Big")
else:
  print("Small")`,
    question: 'Apa yang akan diprint?',
    options: ['Big', 'Small', 'Tiada output'],
    answer: 'Big',
    hint: '15 lebih besar dari 10, jadi print "Big"!'
  },
  {
    id: 5,
    title: '🗃️ Array Magic',
    code: `fruits = ["epal", "oren", "pisang"]
print(fruits[1])`,
    question: 'Apa yang akan diprint?',
    options: ['epal', 'oren', 'pisang'],
    answer: 'oren',
    hint: 'Index [1] adalah item KEDUA! (Index start dari 0)'
  },
  {
    id: 6,
    title: '🔁 Loop dalam Loop',
    code: `total = 0
for i in range(3):
  total = total + 2
print(total)`,
    question: 'Apa output?',
    options: ['2', '3', '6'],
    answer: '6',
    hint: 'Ulang 3 kali, setiap kali tambah 2. Jadi 0+2+2+2 = 6'
  }
]

export default function CodingTerms() {
  const [activeTab, setActiveTab] = useState('flip-cards')
  const navigate = useNavigate()
  const { user, profile, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Kembali
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📚 Belajar Term Coding
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-gray-600">
                Hi, <span className="font-semibold">{profile?.full_name || user.email?.split('@')[0] || 'Student'}</span>!
              </span>
            )}
            <button
              onClick={logout}
              className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Jom Belajar Istilah Coding! 🎉
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Aktiviti yang fun dan mudah diingat untuk kanak-kanak!
            </p>
            <div className="flex gap-4 justify-center items-center flex-wrap text-sm md:text-base">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                🎴 {codingTerms.length} Flip Cards
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                🧠 {logicExercises.length} Latihan Logik
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                🔍 {codePatterns.length} Pattern Quiz
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('flip-cards')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === 'flip-cards'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎴 Flip Cards
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === 'matching'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔗 Suaikan Term
            </button>
            <button
              onClick={() => setActiveTab('fill-blanks')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === 'fill-blanks'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✏️ Isi Tempat Kosong
            </button>
            <button
              onClick={() => setActiveTab('logic-exercise')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === 'logic-exercise'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🧠 Latihan Logik
            </button>
            <button
              onClick={() => setActiveTab('code-patterns')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === 'code-patterns'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🔍 Cari Pattern
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'flip-cards' && <FlipCardsActivity key="flip-cards" />}
          {activeTab === 'matching' && <MatchingActivity key="matching" />}
          {activeTab === 'fill-blanks' && <FillBlanksActivity key="fill-blanks" />}
          {activeTab === 'logic-exercise' && <LogicExerciseActivity key="logic-exercise" />}
          {activeTab === 'code-patterns' && <CodePatternsActivity key="code-patterns" />}
        </AnimatePresence>
      </section>
    </div>
  )
}

// Flip Cards Activity Component
function FlipCardsActivity() {
  const [flippedCards, setFlippedCards] = useState({})

  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎴 Flip Cards - Terbalikkan Kad!</h2>
        <p className="text-gray-600">Klik pada kad untuk lihat maksud dan contoh!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {codingTerms.map(term => (
          <motion.div
            key={term.id}
            className="perspective-1000"
            whileHover={{ scale: 1.05 }}
          >
            <div
              onClick={() => toggleCard(term.id)}
              className={`relative w-full h-64 cursor-pointer transition-all duration-500 transform-style-3d ${
                flippedCards[term.id] ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                transform: flippedCards[term.id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front of card */}
              <div
                className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-6xl mb-4">{term.emoji}</div>
                <h3 className="text-2xl font-bold text-white text-center">{term.term}</h3>
                <p className="text-white/80 text-sm mt-2">Klik untuk terbalik!</p>
              </div>

              {/* Back of card */}
              <div
                className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg p-6"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="text-4xl mb-3 text-center">{term.emoji}</div>
                  <h4 className="font-bold text-purple-600 text-lg mb-2 text-center">{term.term}</h4>
                  <p className="text-gray-700 text-sm mb-3 text-center">{term.definition}</p>
                  <div className="bg-purple-50 rounded-lg p-3 mb-2">
                    <p className="text-xs text-purple-900 font-mono">{term.example}</p>
                  </div>
                  <p className="text-xs text-gray-600 italic text-center">{term.analogy}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Matching Activity Component
function MatchingActivity() {
  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState([])
  const [shuffledMatches, setShuffledMatches] = useState([])
  const [score, setScore] = useState(0)

  // Shuffle matches on component mount
  useState(() => {
    const matches = [...matchingPairs.map(p => ({ id: p.id, text: p.match, type: 'match' }))]
    setShuffledMatches(matches.sort(() => Math.random() - 0.5))
  }, [])

  const handleTermClick = (pair) => {
    if (matched.includes(pair.id)) return

    if (!selected) {
      setSelected({ ...pair, type: 'term' })
    } else if (selected.type === 'match' && selected.id === pair.id) {
      // Correct match!
      setMatched([...matched, pair.id])
      setSelected(null)
      setScore(score + 10)
    } else {
      setSelected(null)
    }
  }

  const handleMatchClick = (match) => {
    if (matched.includes(match.id)) return

    if (!selected) {
      setSelected({ ...match, type: 'match' })
    } else if (selected.type === 'term' && selected.id === match.id) {
      // Correct match!
      setMatched([...matched, match.id])
      setSelected(null)
      setScore(score + 10)
    } else {
      setSelected(null)
    }
  }

  const resetGame = () => {
    setSelected(null)
    setMatched([])
    setScore(0)
    const matches = [...matchingPairs.map(p => ({ id: p.id, text: p.match, type: 'match' }))]
    setShuffledMatches(matches.sort(() => Math.random() - 0.5))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🔗 Suaikan Term dengan Maksud!</h2>
        <p className="text-gray-600 mb-4">Klik satu term, kemudian klik maksud yang betul!</p>
        <div className="flex gap-4 justify-center items-center">
          <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-bold">
            Skor: {score}
          </div>
          <button
            onClick={resetGame}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-bold transition-colors"
          >
            🔄 Main Lagi
          </button>
        </div>
      </div>

      {matched.length === matchingPairs.length && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl text-center"
        >
          <h3 className="text-3xl font-bold mb-2">🎉 Tahniah!</h3>
          <p className="text-xl">Anda berjaya suaikan semua! Skor: {score}</p>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Terms Column */}
        <div>
          <h3 className="text-lg font-bold text-purple-600 mb-4 text-center">📚 TERMS</h3>
          <div className="space-y-3">
            {matchingPairs.map(pair => (
              <motion.button
                key={`term-${pair.id}`}
                onClick={() => handleTermClick(pair)}
                disabled={matched.includes(pair.id)}
                whileHover={{ scale: matched.includes(pair.id) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-4 rounded-lg font-bold text-lg transition-all ${
                  matched.includes(pair.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed opacity-50'
                    : selected?.id === pair.id && selected?.type === 'term'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
                }`}
              >
                {pair.termEmoji} {pair.term}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Matches Column */}
        <div>
          <h3 className="text-lg font-bold text-pink-600 mb-4 text-center">💡 MAKSUD</h3>
          <div className="space-y-3">
            {shuffledMatches.map((match, index) => (
              <motion.button
                key={`match-${index}`}
                onClick={() => handleMatchClick(match)}
                disabled={matched.includes(match.id)}
                whileHover={{ scale: matched.includes(match.id) ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full p-4 rounded-lg font-bold text-lg transition-all ${
                  matched.includes(match.id)
                    ? 'bg-green-100 text-green-700 cursor-not-allowed opacity-50'
                    : selected?.id === match.id && selected?.type === 'match'
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'bg-white text-pink-600 hover:bg-pink-50 shadow-md'
                }`}
              >
                {match.text}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Fill in the Blanks Activity Component
function FillBlanksActivity() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  const question = fillInBlanks[currentQuestion]

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === question.answer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 25)
    }

    setTimeout(() => {
      if (currentQuestion < fillInBlanks.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setCompleted(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setCompleted(false)
  }

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-4xl font-bold mb-4">Tahniah!</h2>
          <p className="text-2xl mb-6">Anda telah selesai semua soalan!</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <p className="text-xl mb-2">Skor Akhir:</p>
            <p className="text-5xl font-bold">{score} / {fillInBlanks.length * 25}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            🔄 Cuba Lagi
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">✏️ Isi Tempat Kosong!</h2>
        <p className="text-gray-600">Pilih jawapan yang betul untuk isi tempat kosong</p>
        <div className="mt-4 flex gap-4 justify-center">
          <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-bold">
            Soalan {currentQuestion + 1} / {fillInBlanks.length}
          </div>
          <div className="bg-pink-100 text-pink-800 px-6 py-2 rounded-full font-bold">
            Skor: {score}
          </div>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="mb-8">
          <p className="text-2xl text-gray-800 leading-relaxed">
            {question.question.split('_____').map((part, index) => (
              <span key={index}>
                {part}
                {index < question.question.split('_____').length - 1 && (
                  <span className="inline-block mx-2 px-4 py-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg font-bold text-purple-900">
                    {selectedAnswer || '?????'}
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>

        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-red-500 text-white shadow-lg'
                  : selectedAnswer && option === question.answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {option}
              {selectedAnswer === option && isCorrect && ' ✓'}
              {selectedAnswer === option && !isCorrect && ' ✗'}
              {selectedAnswer && selectedAnswer !== option && option === question.answer && ' ✓ (Jawapan Betul)'}
            </motion.button>
          ))}
        </div>

        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl text-center font-bold ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isCorrect ? '🎉 Betul! Tahniah!' : '💪 Cuba lagi! Anda boleh buat!'}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Logic Exercise Activity Component - Brain Training!
function LogicExerciseActivity() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const exercise = logicExercises[currentQuestion]

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === exercise.answer
    setIsCorrect(correct)
    setShowExplanation(true)

    if (correct) {
      setScore(score + 10)
    }
  }

  const handleNext = () => {
    if (currentQuestion < logicExercises.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowExplanation(false)
    } else {
      setCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setCompleted(false)
    setShowExplanation(false)
  }

  if (completed) {
    const totalPoints = logicExercises.length * 10
    const percentage = Math.round((score / totalPoints) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : '💪'}
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {percentage >= 80 ? 'Cemerlang!' : percentage >= 60 ? 'Bagus!' : 'Teruskan Usaha!'}
          </h2>
          <p className="text-2xl mb-6">Anda telah selesai semua latihan logik!</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <p className="text-xl mb-2">Skor Akhir:</p>
            <p className="text-5xl font-bold mb-2">{score} / {totalPoints}</p>
            <p className="text-lg">({percentage}%)</p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            🔄 Cuba Lagi
          </button>
        </div>
      </motion.div>
    )
  }

  // Get emoji based on exercise type
  const getTypeEmoji = (type) => {
    switch(type) {
      case 'if-else': return '🤔'
      case 'loop': return '🔁'
      case 'variable': return '📦'
      case 'array': return '🗃️'
      case 'boolean': return '✅'
      case 'complex': return '🧠'
      default: return '💡'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🧠 Latihan Logik - Brain Training!</h2>
        <p className="text-gray-600 mb-4">Uji pemahaman konsep coding dengan senario sebenar</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-bold">
            Soalan {currentQuestion + 1} / {logicExercises.length}
          </div>
          <div className="bg-pink-100 text-pink-800 px-6 py-2 rounded-full font-bold">
            Skor: {score}
          </div>
          <div className="bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-bold">
            {getTypeEmoji(exercise.type)} {exercise.type.toUpperCase()}
          </div>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-purple-600 mb-4">{exercise.title}</h3>

          {/* Scenario Box */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border-l-4 border-purple-500">
            <p className="text-lg text-gray-800 whitespace-pre-line font-mono leading-relaxed">
              {exercise.scenario}
            </p>
          </div>

          {/* Question */}
          <p className="text-xl font-bold text-gray-900 mb-6">
            ❓ {exercise.question}
          </p>
        </div>

        {/* Options */}
        <div className="grid gap-4 mb-6">
          {exercise.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl font-bold text-lg transition-all text-left ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-red-500 text-white shadow-lg'
                  : selectedAnswer && option === exercise.answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
              {selectedAnswer === option && isCorrect && ' ✓'}
              {selectedAnswer === option && !isCorrect && ' ✗'}
              {selectedAnswer && selectedAnswer !== option && option === exercise.answer && ' ✓'}
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className={`p-6 rounded-xl mb-4 ${
              isCorrect ? 'bg-green-50 border-2 border-green-300' : 'bg-yellow-50 border-2 border-yellow-300'
            }`}>
              <p className="font-bold text-lg mb-2">
                {isCorrect ? '✅ Betul!' : '📚 Mari Belajar:'}
              </p>
              <p className="text-gray-800">{exercise.explanation}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
            >
              {currentQuestion < logicExercises.length - 1 ? 'Soalan Seterusnya →' : 'Lihat Keputusan 🎉'}
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Code Patterns Activity Component
function CodePatternsActivity() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const pattern = codePatterns[currentQuestion]

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    const correct = answer === pattern.answer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 15)
    }

    setTimeout(() => {
      if (currentQuestion < codePatterns.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setShowHint(false)
      } else {
        setCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setScore(0)
    setCompleted(false)
    setShowHint(false)
  }

  if (completed) {
    const totalPoints = codePatterns.length * 15
    const percentage = Math.round((score / totalPoints) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-12 rounded-2xl shadow-2xl max-w-2xl mx-auto">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '⭐' : '👍'}
          </div>
          <h2 className="text-4xl font-bold mb-4">
            {percentage >= 80 ? 'Pakar Code!' : percentage >= 60 ? 'Hebat!' : 'Keep Learning!'}
          </h2>
          <p className="text-2xl mb-6">Pattern recognition selesai!</p>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 mb-6">
            <p className="text-xl mb-2">Skor Akhir:</p>
            <p className="text-5xl font-bold mb-2">{score} / {totalPoints}</p>
            <p className="text-lg">({percentage}%)</p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
          >
            🔄 Cuba Lagi
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🔍 Cari Pattern dalam Code</h2>
        <p className="text-gray-600 mb-4">Baca code dan ramalkan output atau jawapan yang betul!</p>
        <div className="flex gap-4 justify-center">
          <div className="bg-blue-100 text-blue-800 px-6 py-2 rounded-full font-bold">
            Soalan {currentQuestion + 1} / {codePatterns.length}
          </div>
          <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-bold">
            Skor: {score}
          </div>
        </div>
      </div>

      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <h3 className="text-2xl font-bold text-blue-600 mb-6">{pattern.title}</h3>

        {/* Code Display */}
        <div className="bg-gray-900 text-green-400 rounded-xl p-6 mb-6 font-mono text-sm overflow-x-auto">
          <pre className="whitespace-pre">{pattern.code}</pre>
        </div>

        {/* Question */}
        <p className="text-xl font-bold text-gray-900 mb-6">
          ❓ {pattern.question}
        </p>

        {/* Hint Button */}
        {!selectedAnswer && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="mb-4 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
          >
            💡 {showHint ? 'Sembunyikan Hint' : 'Tunjuk Hint'}
          </button>
        )}

        {showHint && !selectedAnswer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded"
          >
            <p className="text-gray-700">{pattern.hint}</p>
          </motion.div>
        )}

        {/* Options */}
        <div className="grid gap-4">
          {pattern.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
              whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl font-bold text-lg transition-all ${
                selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-red-500 text-white shadow-lg'
                  : selectedAnswer && option === pattern.answer
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {option}
              {selectedAnswer === option && isCorrect && ' ✓'}
              {selectedAnswer === option && !isCorrect && ' ✗'}
              {selectedAnswer && selectedAnswer !== option && option === pattern.answer && ' ✓ (Jawapan Betul)'}
            </motion.button>
          ))}
        </div>

        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl text-center font-bold ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isCorrect ? '🎉 Betul! Anda faham pattern ini!' : '💡 Hint: ' + pattern.hint}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}
