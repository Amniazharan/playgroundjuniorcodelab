import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DragDropSpelling from '../components/DragDropSpelling';
import { getLessonById, spellingLessons } from '../data/spellingLessons';

const SpellingWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    // Load completed lessons from localStorage
    const saved = localStorage.getItem('completedSpellingLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const currentLesson = getLessonById(id);
    if (currentLesson) {
      setLesson(currentLesson);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handleComplete = (lessonId) => {
    // Save completed lesson
    const updated = [...new Set([...completedLessons, lessonId])];
    setCompletedLessons(updated);
    localStorage.setItem('completedSpellingLessons', JSON.stringify(updated));
  };

  const handleNext = () => {
    const currentIndex = spellingLessons.findIndex(l => l.id === parseInt(id));
    if (currentIndex < spellingLessons.length - 1) {
      const nextLesson = spellingLessons[currentIndex + 1];
      navigate(`/spelling/${nextLesson.id}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = spellingLessons.findIndex(l => l.id === parseInt(id));
    if (currentIndex > 0) {
      const prevLesson = spellingLessons[currentIndex - 1];
      navigate(`/spelling/${prevLesson.id}`);
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Memuat pelajaran...</p>
        </div>
      </div>
    );
  }

  const currentIndex = spellingLessons.findIndex(l => l.id === parseInt(id));
  const isFirstLesson = currentIndex === 0;
  const isLastLesson = currentIndex === spellingLessons.length - 1;
  const isCompleted = completedLessons.includes(lesson.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-md sticky top-0 z-40 border-b-4 border-orange-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Back Button */}
            <motion.button
              onClick={handleDashboard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all shadow-md"
            >
              <span>🏠</span>
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>

            {/* Center - Progress */}
            <div className="text-center">
              <div className="text-sm text-gray-600">
                Pelajaran {lesson.id} / {spellingLessons.length}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs text-gray-500">Kategori: {lesson.category}</div>
                {isCompleted && <span className="text-green-600">✅</span>}
              </div>
            </div>

            {/* Right - Navigation */}
            <div className="flex gap-2">
              <motion.button
                onClick={handlePrevious}
                disabled={isFirstLesson}
                whileHover={{ scale: isFirstLesson ? 1 : 1.05 }}
                whileTap={{ scale: isFirstLesson ? 1 : 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
                  isFirstLesson
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                <span className="hidden sm:inline">⬅️ </span>Sebelum
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={isLastLesson}
                whileHover={{ scale: isLastLesson ? 1 : 1.05 }}
                whileTap={{ scale: isLastLesson ? 1 : 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
                  isLastLesson
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Seterusnya<span className="hidden sm:inline"> ➡️</span>
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((lesson.id) / spellingLessons.length) * 100}%` }}
                className="bg-gradient-to-r from-orange-500 to-blue-500 h-2 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-8">
        <DragDropSpelling
          lesson={lesson}
          onComplete={handleComplete}
        />
      </main>

      {/* Footer with Stats */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border-t-4 border-orange-200 py-6 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600">
                {completedLessons.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pelajaran Selesai</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-200">
              <div className="text-3xl font-bold text-orange-600">
                {Math.round((completedLessons.length / spellingLessons.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Kemajuan</div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
              <div className="text-3xl font-bold text-blue-600">
                {spellingLessons.length - completedLessons.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pelajaran Berbaki</div>
            </div>
          </div>

          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>🎯 Teruskan usaha! Setiap pelajaran menjadikan anda lebih mahir mengeja.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default SpellingWorkspace;
