import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryBookReader = ({ story, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);

  const handleNextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Last page - complete
      if (onComplete) {
        onComplete(story.id);
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleOpenBook = () => {
    setIsBookOpen(true);
    setCurrentPage(0);
  };

  const handleCloseBook = () => {
    setIsBookOpen(false);
    setCurrentPage(0);
  };

  const page = story.pages[currentPage];
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === story.pages.length - 1;

  if (!isBookOpen) {
    // Cover Page
    return (
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Book Cover */}
          <div className="relative perspective-1000">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 rounded-2xl shadow-2xl border-8 border-yellow-800 p-8 transform-style-3d"
            >
              {/* Cover Image Placeholder */}
              <div className="w-full h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-xl mb-6 flex items-center justify-center text-7xl border-4 border-yellow-700">
                📚
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                {story.title}
              </h1>

              {/* Difficulty Badge */}
              <div className="flex justify-center mb-4">
                <span className={`px-4 py-2 rounded-full font-semibold text-sm ${
                  story.difficulty === 'easy' ? 'bg-green-200 text-green-800' :
                  story.difficulty === 'medium' ? 'bg-orange-200 text-orange-800' :
                  'bg-red-200 text-red-800'
                }`}>
                  {story.difficulty === 'easy' ? '⭐ Mudah' :
                   story.difficulty === 'medium' ? '⭐⭐ Sederhana' :
                   '⭐⭐⭐ Susah'}
                </span>
              </div>

              {/* Page Count */}
              <p className="text-center text-gray-700 mb-6">
                {story.pages.length} muka surat
              </p>

              {/* Open Book Button */}
              <motion.button
                onClick={handleOpenBook}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
              >
                📖 Buka Buku
              </motion.button>
            </motion.div>

            {/* Book Spine Shadow */}
            <div className="absolute top-0 left-0 w-4 h-full bg-yellow-900 rounded-l-2xl -z-10 transform -translate-x-2"></div>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-gray-600 bg-blue-50 p-4 rounded-lg"
        >
          <p className="text-sm">
            💡 <strong>Petua:</strong> Baca dengan perlahan dan fahami setiap perkataan.
            Perkataan dalam buku ini maksimum 3 suku kata sahaja!
          </p>
        </motion.div>
      </div>
    );
  }

  // Book Pages
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6">
      {/* Book Page */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white rounded-2xl shadow-2xl border-8 border-yellow-700 p-8 mb-6"
      >
        {/* Page Number */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">Muka surat {page.pageNumber}</div>
          <div className="text-sm text-gray-500">{currentPage + 1} / {story.pages.length}</div>
        </div>

        {/* Page Image - Enhanced with emoji and gradients */}
        <div className={`w-full h-80 rounded-xl mb-6 flex flex-col items-center justify-center border-4 relative overflow-hidden ${
          page.bgGradient || 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-200'
        }`}>
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
            <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white rounded-full"></div>
          </div>

          {/* Main illustration */}
          <div className="text-9xl mb-4 z-10 drop-shadow-lg">
            {page.emoji || '📖'}
          </div>

          {/* Secondary emojis if available */}
          {page.secondaryEmojis && (
            <div className="flex gap-4 text-4xl z-10">
              {page.secondaryEmojis.map((emoji, idx) => (
                <span key={idx} className="animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Page Text */}
        <div className="bg-yellow-50 rounded-lg p-6 border-2 border-yellow-200">
          <p className="text-2xl md:text-3xl text-center font-serif text-gray-800 leading-relaxed">
            {page.text}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentPage + 1) / story.pages.length) * 100}%` }}
              className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-6">
        <motion.button
          onClick={handlePreviousPage}
          disabled={isFirstPage}
          whileHover={{ scale: isFirstPage ? 1 : 1.05 }}
          whileTap={{ scale: isFirstPage ? 1 : 0.95 }}
          className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            isFirstPage
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          ⬅️ Sebelum
        </motion.button>

        <motion.button
          onClick={handleCloseBook}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 rounded-xl font-bold text-white transition-all shadow-lg"
        >
          📕 Tutup Buku
        </motion.button>

        <motion.button
          onClick={handleNextPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-bold text-white transition-all shadow-lg"
        >
          {isLastPage ? '✅ Tamat' : 'Seterusnya ➡️'}
        </motion.button>
      </div>

      {/* Completion Message */}
      <AnimatePresence>
        {isLastPage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="bg-green-100 text-green-800 p-6 rounded-2xl text-center font-bold border-4 border-green-400 shadow-2xl"
          >
            <div className="text-5xl mb-2">🎉</div>
            <div className="text-xl">Tahniah! Anda telah selesai membaca!</div>
            <div className="text-sm mt-2">Cerita: <span className="text-green-600">{story.title}</span></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Tips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-gray-600 bg-yellow-50 p-4 rounded-lg max-w-2xl"
      >
        <p className="text-sm">
          💭 <strong>Bacaan:</strong> Jika ada perkataan yang susah, cuba baca perlahan-lahan mengikut suku kata.
        </p>
      </motion.div>
    </div>
  );
};

export default StoryBookReader;
