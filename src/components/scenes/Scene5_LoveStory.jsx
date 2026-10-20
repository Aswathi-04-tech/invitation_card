import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  {
    year: "2020",
    title: "How We Met",
    desc: "A chance encounter that changed everything. We met at a mutual friend's gathering and talked for hours."
  },
  {
    year: "2022",
    title: "First Date",
    desc: "A beautiful evening under the stars. That's when we knew this was something special."
  },
  {
    year: "2024",
    title: "The Proposal",
    desc: "A surprise sunset proposal. A moment of pure joy and a promise for a lifetime."
  }
];

export default function Scene5_LoveStory({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTap = () => {
    if (currentIndex < memories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      onClick={handleTap}
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-blush overflow-hidden"
    >
      <div className="absolute top-16 w-full text-center z-20">
        <h2 className="font-serif text-4xl text-dark mb-2">Our Story</h2>
        <div className="w-16 h-px bg-gold mx-auto" />
      </div>

      <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center mt-12 z-10 perspective-1000">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8, rotateY: 90, z: -100 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
            exit={{ opacity: 0, scale: 1.2, rotateY: -90, z: 100 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="absolute w-[80%] h-full bg-white shadow-xl rounded-lg p-8 flex flex-col items-center text-center border border-champagne/50"
          >
            <div className="w-16 h-16 rounded-full bg-champagne flex items-center justify-center text-gold font-serif text-lg mb-6 shadow-inner">
              {memories[currentIndex].year}
            </div>
            
            <h3 className="font-serif text-2xl text-dark mb-4">{memories[currentIndex].title}</h3>
            
            <p className="font-sans text-sm text-dark/70 leading-relaxed">
              {memories[currentIndex].desc}
            </p>

            <div className="mt-auto">
               <p className="text-[10px] font-sans tracking-widest text-dark/30 uppercase">
                {currentIndex < memories.length - 1 ? 'Tap for next chapter' : 'Tap to continue'}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Background Decor */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/20 blur-3xl pointer-events-none" />
    </motion.div>
  );
}
