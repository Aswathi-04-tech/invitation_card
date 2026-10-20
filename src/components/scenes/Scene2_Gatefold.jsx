import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Scene2_Gatefold({ onNext }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer2 = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => {
      clearTimeout(timer2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-ivory perspective-1000"
    >
      {/* Container for the gatefold card */}
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-[90vw] h-[80vh] max-w-md max-h-[600px] shadow-2xl rounded-sm flex items-center justify-center transform-style-3d cursor-pointer"
        onClick={onNext}
      >
        {/* Inside of the card */}
        <div className="absolute inset-0 bg-white shadow-inner flex flex-col items-center p-6 text-center border-4 border-double border-[#D4AF37]/30 rounded-sm">
          {/* Picture inside */}
          <motion.div 
            className="w-full aspect-[3/4] mb-6 rounded-md overflow-hidden border border-[#D4AF37]/40 shadow-sm relative"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={isOpen ? { opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Using a placeholder elegant wedding image */}
            <img 
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Couple" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
          </motion.div>
          
          {/* Names */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h2 className="font-sans tracking-[0.2em] text-gold text-[10px] uppercase mb-2">Together forever</h2>
            <h1 className="font-serif text-3xl sm:text-4xl text-dark leading-tight">
              Hiba <span className="text-gold-gradient italic">&</span> Mubashir
            </h1>
          </motion.div>
          
          <motion.p
             initial={{ opacity: 0 }}
             animate={isOpen ? { opacity: 1 } : {}}
             transition={{ delay: 1.5, duration: 0.8 }}
             className="absolute bottom-6 text-[10px] font-sans tracking-widest text-dark/40 uppercase"
          >
            Tap anywhere to continue
          </motion.p>
        </div>

        {/* Left Door */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 bg-[#fdfbf7] origin-left border-r border-black/5 shadow-[5px_0_15px_rgba(0,0,0,0.1)] rounded-l-sm z-10 flex items-center justify-end overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          animate={isOpen ? { rotateY: -130 } : { rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Subtle gradient for 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
          {/* Decorative left border of door */}
          <div className="h-[90%] w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent mr-2" />
        </motion.div>

        {/* Right Door */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 bg-[#fdfbf7] origin-right border-l border-black/5 shadow-[-5px_0_15px_rgba(0,0,0,0.1)] rounded-r-sm z-10 flex items-center justify-start overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          animate={isOpen ? { rotateY: 130 } : { rotateY: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        >
          {/* Subtle gradient for 3D effect */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5" />
          {/* Decorative right border of door */}
          <div className="h-[90%] w-px bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent ml-2" />
        </motion.div>


      </motion.div>
    </motion.div>
  );
}
