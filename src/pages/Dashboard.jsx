import { useState } from 'react'
import { motion } from 'framer-motion'
import { categories, exercises, getExercisesByCategory } from '../data/exercises'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('all')
  const navigate = useNavigate()

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
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">
            🎮 JuniorCodeLab Playground
          </h1>
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
              Selamat Datang!
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Jom main dengan block coding yang best!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-3xl font-bold">{exercises.length}</span>
                <span className="ml-2">Aktiviti Menarik</span>
              </div>
              <button
                onClick={() => navigate(`/exercise/${exercises[0].id}`)}
                className="bg-white text-orange-500 font-bold px-8 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Mula Sekarang
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
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

      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
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
          {displayedExercises.map(exercise => (
            <motion.div
              key={exercise.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
              onClick={() => navigate(`/exercise/${exercise.id}`)}
            >
              <div className="p-6">
                <div className="text-5xl mb-3">{exercise.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{exercise.title}</h3>

                <div className="flex gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {exercise.duration}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {exercise.description}
                </p>

                <button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all">
                  Try It
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {displayedExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Tiada aktiviti dalam kategori ini lagi.</p>
          </div>
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
