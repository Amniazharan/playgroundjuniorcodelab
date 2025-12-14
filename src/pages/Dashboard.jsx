import { useState } from 'react'
import { motion } from 'framer-motion'
import { categories, exercises, getExercisesByCategory } from '../data/exercises'
import { spellingLessons } from '../data/spellingLessons'
import { sentenceLessons } from '../data/sentenceLessons'
import { storyBooks } from '../data/storyBooks'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSection, setActiveSection] = useState('spelling') // 'spelling' or 'playground'
  const [activeSpellingTab, setActiveSpellingTab] = useState('eja') // 'eja', 'ayat', or 'cerita'
  const navigate = useNavigate()
  const { user, profile, logout } = useAuth()

  const displayedExercises = activeCategory === 'all'
    ? exercises
    : getExercisesByCategory(activeCategory)

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-orange-100 text-orange-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
            🎮 JuniorCodeLab Playground
          </h1>
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

      <section className="bg-gradient-to-r from-orange-500 to-blue-500 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Selamat Datang ke JuniorCodeLab!
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Pilih aktiviti yang anda suka
            </p>

            {/* Section Toggle Buttons */}
            <div className="flex gap-4 justify-center mb-8">
              <motion.button
                onClick={() => setActiveSection('spelling')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  activeSection === 'spelling'
                    ? 'bg-white text-orange-500'
                    : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white'
                }`}
              >
                ✏️ Belajar Mengeja
              </motion.button>

              <motion.button
                onClick={() => setActiveSection('playground')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  activeSection === 'playground'
                    ? 'bg-white text-blue-500'
                    : 'bg-white/20 backdrop-blur-sm text-white border-2 border-white'
                }`}
              >
                🎮 Coding Playground
              </motion.button>
            </div>

            {/* Tabs for Spelling Section - Different Design */}
            {activeSection === 'spelling' && (
              <div className="flex gap-4 justify-center mb-6 flex-wrap px-4">
                <motion.div
                  onClick={() => setActiveSpellingTab('eja')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg border-3 ${
                    activeSpellingTab === 'eja'
                      ? 'bg-white text-orange-600 border-4 border-orange-400 shadow-orange-200'
                      : 'bg-white/40 backdrop-blur-sm text-white border-2 border-white/60'
                  }`}
                >
                  <div className="text-2xl mb-1">✏️</div>
                  <div className="text-sm font-bold">Eja Perkataan</div>
                </motion.div>
                <motion.div
                  onClick={() => setActiveSpellingTab('ayat')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg border-3 ${
                    activeSpellingTab === 'ayat'
                      ? 'bg-white text-blue-600 border-4 border-blue-400 shadow-blue-200'
                      : 'bg-white/40 backdrop-blur-sm text-white border-2 border-white/60'
                  }`}
                >
                  <div className="text-2xl mb-1">📝</div>
                  <div className="text-sm font-bold">Susunan Ayat</div>
                </motion.div>
                <motion.div
                  onClick={() => setActiveSpellingTab('cerita')}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`cursor-pointer px-6 py-4 rounded-2xl font-semibold transition-all shadow-lg border-3 ${
                    activeSpellingTab === 'cerita'
                      ? 'bg-white text-green-600 border-4 border-green-400 shadow-green-200'
                      : 'bg-white/40 backdrop-blur-sm text-white border-2 border-white/60'
                  }`}
                >
                  <div className="text-2xl mb-1">📚</div>
                  <div className="text-sm font-bold">Buku Cerita</div>
                </motion.div>
              </div>
            )}

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              {activeSection === 'spelling' ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="text-3xl font-bold">
                    {activeSpellingTab === 'eja' ? spellingLessons.length :
                     activeSpellingTab === 'ayat' ? sentenceLessons.length :
                     storyBooks.length}
                  </span>
                  <span className="ml-2">
                    {activeSpellingTab === 'eja' ? 'Pelajaran Eja' :
                     activeSpellingTab === 'ayat' ? 'Pelajaran Ayat' :
                     'Buku Cerita'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                    <span className="text-3xl font-bold">{exercises.length}</span>
                    <span className="ml-2">Aktiviti Playground</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-2 text-sm">
                    <span className="opacity-75">Baru dalam coding?</span>
                  </div>
                  <motion.div
                    onClick={() => navigate('/coding-terms')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-xl shadow-xl border-2 border-white/30 hover:shadow-2xl transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <span>Belajar Term Coding</span>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter - only for playground section */}
      {activeSection === 'playground' && (
        <section className="bg-white border-b sticky top-16 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeCategory === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Semua
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.emoji} {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content - changes based on active section */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {activeSection === 'spelling' ? (
          <>
            {/* Eja Perkataan Tab */}
            {activeSpellingTab === 'eja' && (
              <motion.div
                key="spelling-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {spellingLessons.map(lesson => (
                  <motion.div
                    key={lesson.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border-2 border-orange-100"
                    onClick={() => navigate(`/spelling/${lesson.id}`)}
                  >
                    <div className="p-6">
                      <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center text-6xl">
                        {lesson.image}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                        {lesson.title}
                      </h3>

                      <div className="flex gap-2 mb-3 justify-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty === 'easy' ? '⭐ Mudah' :
                           lesson.difficulty === 'medium' ? '⭐⭐ Sederhana' :
                           '⭐⭐⭐ Susah'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                          {lesson.syllables.length} suku kata
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 text-center italic">
                        {lesson.hint}
                      </p>

                      <button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all">
                        ✏️ Mula Mengeja
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Susunan Ayat Tab - List View */}
            {activeSpellingTab === 'ayat' && (
              <motion.div
                key="sentence-list"
                className="max-w-4xl mx-auto space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {sentenceLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    whileHover={{ x: 8, boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.15)' }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border-l-8 border-blue-400 hover:border-blue-600 transition-all"
                    onClick={() => navigate(`/sentence/${lesson.id}`)}
                  >
                    <div className="p-5 flex items-center gap-4">
                      {/* Number Badge */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-600">{index + 1}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <h3 className="text-base font-bold text-gray-900 mb-1">
                          {lesson.correctOrder.join(' ')}
                        </h3>
                        <p className="text-gray-600 text-sm italic">
                          {lesson.hint}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex-shrink-0 flex gap-2 items-center">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                          {lesson.difficulty === 'easy' ? '⭐ Mudah' :
                           lesson.difficulty === 'medium' ? '⭐⭐ Sederhana' :
                           '⭐⭐⭐ Susah'}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                          {lesson.words.length} perkataan
                        </span>
                        <div className="text-blue-500 text-xl">
                          →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Buku Cerita Tab */}
            {activeSpellingTab === 'cerita' && (
              <motion.div
                key="story-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {storyBooks.map(story => (
                  <motion.div
                    key={story.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border-2 border-green-100"
                    onClick={() => navigate(`/story/${story.id}`)}
                  >
                    <div className="p-6">
                      <div className="w-full h-40 bg-gradient-to-br from-green-100 to-yellow-100 rounded-lg mb-3 flex items-center justify-center text-5xl">
                        📚
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                        {story.title}
                      </h3>

                      <div className="flex gap-2 mb-3 justify-center">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(story.difficulty)}`}>
                          {story.difficulty === 'easy' ? '⭐ Mudah' :
                           story.difficulty === 'medium' ? '⭐⭐ Sederhana' :
                           '⭐⭐⭐ Susah'}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                          {story.pages.length} muka surat
                        </span>
                      </div>

                      <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all mt-4">
                        📖 Baca Cerita
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          // Playground Activities - List View
          <>
            <motion.div
              key="playground-list"
              className="max-w-5xl mx-auto space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.04
                  }
                }
              }}
            >
              {displayedExercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ x: 6, boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.2)' }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border-l-8 border-gradient-to-b from-orange-500 to-blue-500 hover:border-l-12 transition-all group"
                  onClick={() => navigate(`/exercise/${exercise.id}`)}
                  style={{ borderLeftColor: index % 3 === 0 ? '#f97316' : index % 3 === 1 ? '#3b82f6' : '#8b5cf6' }}
                >
                  <div className="p-4 flex items-center gap-4">
                    {/* Emoji Icon */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                      {exercise.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                        {exercise.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-1">
                        {exercise.description}
                      </p>
                    </div>

                    {/* Tags and Arrow */}
                    <div className="flex-shrink-0 flex gap-3 items-center">
                      <div className="flex flex-col gap-1">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                          {exercise.difficulty}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-center">
                          {exercise.duration}
                        </span>
                      </div>
                      <div className="text-2xl text-blue-500 group-hover:translate-x-2 transition-transform">
                        ▶
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {displayedExercises.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Tiada aktiviti dalam kategori ini lagi.</p>
              </div>
            )}
          </>
        )}
      </section>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600 text-sm">
          JuniorCodeLab 2025
        </div>
      </footer>
    </div>
  )
}
