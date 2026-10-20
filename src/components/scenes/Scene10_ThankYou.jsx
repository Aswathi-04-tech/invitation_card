import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import GlassCard from '../ui/GlassCard';

export default function Scene10_ThankYou({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      onClick={onNext}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-dark overflow-hidden"
    >
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Floating Hearts Background */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-gold opacity-40 z-10"
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
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
        >
          <FaHeart size={20} />
        </motion.div>
      ))}

      <div className="z-20 px-6 w-full max-w-md">
        <GlassCard delay={0.5} className="bg-dark/40 border-gold/30">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="font-serif text-5xl text-gold-gradient mb-6">Thank You</h1>
            <p className="font-sans text-sm text-white/80 leading-relaxed text-center">
              We can't wait to celebrate the beginning of our new life with you. Your presence will make our day truly special.
            </p>
            
            <div className="mt-8 w-16 h-px bg-gold/50" />
            
            <p className="font-serif text-2xl text-white mt-8">
              H & M
            </p>
          </motion.div>
        </GlassCard>
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-10 text-[10px] font-sans tracking-widest text-white/30 uppercase z-20"
      >
        Tap to restart
      </motion.p>
    </motion.div>
  );
}
