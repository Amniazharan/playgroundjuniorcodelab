import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StoryBookReader from '../components/StoryBookReader';
import { getStoryById, storyBooks } from '../data/storyBooks';

const StoryWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [completedStories, setCompletedStories] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedStories');
    if (saved) {
      setCompletedStories(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const currentStory = getStoryById(id);
    if (currentStory) {
      setStory(currentStory);
    } else {
      navigate('/dashboard');
    }
  }, [id, navigate]);

  const handleComplete = (storyId) => {
    const updated = [...new Set([...completedStories, storyId])];
    setCompletedStories(updated);
    localStorage.setItem('completedStories', JSON.stringify(updated));
  };

  const handleNext = () => {
    const currentIndex = storyBooks.findIndex(s => s.id === parseInt(id));
    if (currentIndex < storyBooks.length - 1) {
      const nextStory = storyBooks[currentIndex + 1];
      navigate(`/story/${nextStory.id}`);
    }
  };

  const handlePrevious = () => {
    const currentIndex = storyBooks.findIndex(s => s.id === parseInt(id));
    if (currentIndex > 0) {
      const prevStory = storyBooks[currentIndex - 1];
      navigate(`/story/${prevStory.id}`);
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Memuat cerita...</p>
        </div>
      </div>
    );
  }

  const currentIndex = storyBooks.findIndex(s => s.id === parseInt(id));
  const isFirstStory = currentIndex === 0;
  const isLastStory = currentIndex === storyBooks.length - 1;
  const isCompleted = completedStories.includes(story.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white shadow-md sticky top-0 z-40 border-b-4 border-green-200"
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

            {/* Center - Info */}
            <div className="text-center">
              <div className="text-sm font-bold text-gray-700">
                {story.title}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-xs text-gray-500">Buku {story.id} / {storyBooks.length}</div>
                {isCompleted && <span className="text-green-600">✅</span>}
              </div>
            </div>

            {/* Right - Navigation */}
            <div className="flex gap-2">
              <motion.button
                onClick={handlePrevious}
                disabled={isFirstStory}
                whileHover={{ scale: isFirstStory ? 1 : 1.05 }}
                whileTap={{ scale: isFirstStory ? 1 : 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
                  isFirstStory
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                <span className="hidden sm:inline">⬅️ </span>Sebelum
              </motion.button>

              <motion.button
                onClick={handleNext}
                disabled={isLastStory}
                whileHover={{ scale: isLastStory ? 1 : 1.05 }}
                whileTap={{ scale: isLastStory ? 1 : 0.95 }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${
                  isLastStory
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
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
                animate={{ width: `${((story.id) / storyBooks.length) * 100}%` }}
                className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="py-8">
        <StoryBookReader
          story={story}
          onComplete={handleComplete}
        />
      </main>

      {/* Footer with Stats */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white border-t-4 border-green-200 py-6 mt-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border-2 border-green-200">
              <div className="text-3xl font-bold text-green-600">
                {completedStories.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Cerita Selesai</div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600">
                {Math.round((completedStories.length / storyBooks.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Kemajuan</div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border-2 border-teal-200">
              <div className="text-3xl font-bold text-teal-600">
                {storyBooks.length - completedStories.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Cerita Berbaki</div>
            </div>
          </div>

          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>📚 Teruskan membaca! Setiap cerita menjadikan anda lebih mahir membaca.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default StoryWorkspace;
