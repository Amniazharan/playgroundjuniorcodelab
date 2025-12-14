import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DragDropSpelling = ({ lesson, onComplete }) => {
  const [droppedSyllables, setDroppedSyllables] = useState([]);
  const [availableSyllables, setAvailableSyllables] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Shuffle syllables untuk drag
    const shuffled = [...lesson.syllables].sort(() => Math.random() - 0.5);
    setAvailableSyllables(shuffled);
    setDroppedSyllables(Array(lesson.syllables.length).fill(null));
    setIsCorrect(null);
    setShowHint(false);
    setAttempts(0);
  }, [lesson]);

  const handleDragStart = (e, syllable, index, source) => {
    setDraggedItem({ syllable, index, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (!draggedItem) return;

    const newDropped = [...droppedSyllables];
    const newAvailable = [...availableSyllables];

    // If dragging from available syllables
    if (draggedItem.source === 'available') {
      // Remove from available
      newAvailable.splice(draggedItem.index, 1);

      // If target has syllable, return it to available
      if (newDropped[targetIndex]) {
        newAvailable.push(newDropped[targetIndex]);
      }

      // Add to target
      newDropped[targetIndex] = draggedItem.syllable;
    }
    // If dragging from dropped area
    else if (draggedItem.source === 'dropped') {
      // Swap or move within dropped area
      const temp = newDropped[targetIndex];
      newDropped[targetIndex] = draggedItem.syllable;

      if (temp) {
        newDropped[draggedItem.index] = temp;
      } else {
        newDropped[draggedItem.index] = null;
      }
    }

    setDroppedSyllables(newDropped);
    setAvailableSyllables(newAvailable);
    setDraggedItem(null);
    setIsCorrect(null); // Reset checking
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();

    if (!draggedItem || draggedItem.source !== 'dropped') return;

    const newDropped = [...droppedSyllables];
    const newAvailable = [...availableSyllables];

    // Return to available
    newAvailable.push(draggedItem.syllable);
    newDropped[draggedItem.index] = null;

    setDroppedSyllables(newDropped);
    setAvailableSyllables(newAvailable);
    setDraggedItem(null);
  };

  const checkAnswer = () => {
    const userAnswer = droppedSyllables.join('');
    const correctAnswer = lesson.word;

    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setAttempts(attempts + 1);

    if (correct) {
      // Success - notify parent after delay
      setTimeout(() => {
        if (onComplete) {
          onComplete(lesson.id);
        }
      }, 2000);
    }
  };

  const resetLesson = () => {
    const shuffled = [...lesson.syllables].sort(() => Math.random() - 0.5);
    setAvailableSyllables(shuffled);
    setDroppedSyllables(Array(lesson.syllables.length).fill(null));
    setIsCorrect(null);
    setShowHint(false);
  };

  const allFilled = droppedSyllables.every(s => s !== null);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6">
      {/* Header dengan gambar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Eja Perkataan: <span className="text-orange-500">{lesson.title}</span>
        </h2>

        {/* Gambar emoji */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-64 h-64 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-blue-100 rounded-2xl flex items-center justify-center border-4 border-orange-200 shadow-lg"
        >
          <div className="text-9xl">
            {lesson.image}
          </div>
        </motion.div>

        {/* Hint button */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-blue-600 hover:text-blue-700 underline text-sm"
        >
          {showHint ? '🙈 Sembunyikan Petunjuk' : '💡 Tunjuk Petunjuk'}
        </button>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-gray-600 italic"
            >
              💭 {lesson.hint}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Drop Zone - tempat untuk letak suku kata */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 w-full"
      >
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
          📝 Susun Suku Kata Di Sini
        </h3>
        <div className="flex gap-3 justify-center flex-wrap">
          {droppedSyllables.map((syllable, index) => (
            <motion.div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`
                w-24 h-24 rounded-xl border-4 border-dashed flex items-center justify-center
                transition-all duration-200 text-2xl font-bold
                ${syllable ? 'bg-orange-100 border-orange-400' : 'bg-gray-50 border-gray-300'}
                ${!syllable && 'hover:bg-gray-100 hover:border-gray-400'}
              `}
              whileHover={{ scale: syllable ? 1.05 : 1.02 }}
            >
              {syllable ? (
                <motion.div
                  draggable
                  onDragStart={(e) => handleDragStart(e, syllable, index, 'dropped')}
                  className="cursor-move select-none text-orange-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileDrag={{ scale: 1.1, rotate: 5 }}
                >
                  {syllable}
                </motion.div>
              ) : (
                <span className="text-gray-400 text-4xl">?</span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Available Syllables - suku kata untuk di drag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 w-full"
      >
        <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
          🎯 Seret Suku Kata Ini
        </h3>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropToAvailable}
          className="flex gap-3 justify-center flex-wrap min-h-[120px] p-4 bg-blue-50 rounded-xl border-2 border-blue-200"
        >
          {availableSyllables.length === 0 ? (
            <div className="text-gray-400 italic py-8">
              Semua suku kata telah diseret 👍
            </div>
          ) : (
            availableSyllables.map((syllable, index) => (
              <motion.div
                key={`${syllable}-${index}`}
                draggable
                onDragStart={(e) => handleDragStart(e, syllable, index, 'available')}
                className="w-24 h-24 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center cursor-move shadow-lg text-white text-2xl font-bold"
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileDrag={{ scale: 1.15, rotate: 8, zIndex: 50 }}
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {syllable}
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <motion.button
          onClick={checkAnswer}
          disabled={!allFilled || isCorrect === true}
          whileHover={{ scale: allFilled && isCorrect !== true ? 1.05 : 1 }}
          whileTap={{ scale: allFilled && isCorrect !== true ? 0.95 : 1 }}
          className={`
            px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg
            ${allFilled && isCorrect !== true
              ? 'bg-green-500 hover:bg-green-600 cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
            }
          `}
        >
          ✅ Semak Jawapan
        </motion.button>

        <motion.button
          onClick={resetLesson}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gray-500 hover:bg-gray-600 rounded-xl font-bold text-white transition-all shadow-lg"
        >
          🔄 Cuba Lagi
        </motion.button>
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className={`
              p-6 rounded-2xl text-center font-bold text-xl shadow-2xl
              ${isCorrect
                ? 'bg-green-100 text-green-800 border-4 border-green-400'
                : 'bg-red-100 text-red-800 border-4 border-red-400'
              }
            `}
          >
            {isCorrect ? (
              <div>
                <div className="text-6xl mb-2">🎉</div>
                <div>Tahniah! Anda Betul!</div>
                <div className="text-sm mt-2">Perkataan: <span className="text-green-600">{lesson.word}</span></div>
              </div>
            ) : (
              <div>
                <div className="text-6xl mb-2">😅</div>
                <div>Cuba Lagi!</div>
                <div className="text-sm mt-2">Susun semula suku kata dengan betul</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats */}
      <div className="mt-4 text-center text-gray-600">
        <p className="text-sm">Cubaan: {attempts}</p>
        <p className="text-xs text-gray-500 mt-1">Kesukaran:
          <span className={`ml-2 font-semibold ${
            lesson.difficulty === 'easy' ? 'text-green-600' :
            lesson.difficulty === 'medium' ? 'text-orange-600' :
            'text-red-600'
          }`}>
            {lesson.difficulty === 'easy' ? '⭐ Mudah' :
             lesson.difficulty === 'medium' ? '⭐⭐ Sederhana' :
             '⭐⭐⭐ Susah'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default DragDropSpelling;
