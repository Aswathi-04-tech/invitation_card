import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function Scene3_Invitation({ onNext }) {
  const text = "Hiba & Mubashir";
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: "-100vw", transition: { duration: 0.8, ease: "anticipate" } }}
      transition={{ duration: 1 }}
      onClick={onNext}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-ivory"
    >
      <div className="relative w-[90%] h-[85%] max-w-md bg-white shadow-2xl rounded-sm border-4 border-double border-[#D4AF37]/40 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Floral Decorative Corners (using CSS shapes as placeholders for luxury feel) */}
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold opacity-50 rounded-tl-3xl" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold opacity-50 rounded-tr-3xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold opacity-50 rounded-bl-3xl" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold opacity-50 rounded-br-3xl" />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-dark/70 mb-8"
        >
          Together with their families
        </motion.p>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="font-serif text-5xl md:text-6xl text-dark leading-relaxed mb-8 flex flex-wrap justify-center gap-x-2"
        >
          {text.split("").map((char, index) => (
            <motion.span 
              key={index} 
              variants={itemVariants}
              className={char === '&' ? 'text-gold-gradient italic' : ''}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="font-sans text-sm tracking-widest text-dark/80"
        >
          REQUEST THE HONOR OF YOUR PRESENCE
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="mt-12 py-4 border-y border-gold/30 w-full"
        >
          <p className="font-serif text-2xl text-dark">Sunday, 20th December</p>
          <p className="font-sans text-xs tracking-widest mt-2 text-dark/60">TWO THOUSAND TWENTY-SIX</p>
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <p className="text-[10px] font-sans tracking-widest text-dark/40 uppercase">Tap to continue</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
