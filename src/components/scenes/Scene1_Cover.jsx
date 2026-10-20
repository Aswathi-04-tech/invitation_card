import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import WaxSeal from '../ui/WaxSeal';

export default function Scene1_Cover({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-ivory"
    >
      {/* Subtle Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Floating Hearts Background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-blush opacity-30"
          initial={{ 
            y: "100vh", 
            x: `${Math.random() * 100}vw`,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: "-10vh",
            x: `${Math.random() * 100}vw`,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          <FaHeart size={30} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-gold-gradient font-sans mb-4">You are invited</h2>
          <h1 className="text-6xl md:text-8xl font-serif text-dark leading-tight">
            Hiba <br/>
            <span className="text-3xl md:text-5xl italic text-gold-gradient">&</span> <br/>
            Mubashir
          </h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.5 }}
          className="relative mt-8"
        >
          <WaxSeal onClick={onNext} text="H&M" />
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            <p className="text-sm font-sans tracking-widest text-dark/60 uppercase">Tap to open</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
