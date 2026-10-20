import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
import GlassCard from '../ui/GlassCard';

export default function Scene7_Venue({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
      onClick={onNext}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-dark overflow-hidden"
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-50"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <div className="z-10 w-full max-w-sm px-6 flex flex-col items-center">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-8"
        >
          <FaMapMarkerAlt size={50} className="text-gold drop-shadow-lg mx-auto" />
        </motion.div>

        <GlassCard delay={0.8} className="w-full text-white/90 border-white/20">
          <h2 className="font-serif text-3xl mb-2 text-white">The Grand Palace</h2>
          <p className="font-sans text-sm tracking-wide mb-6">123 Luxury Avenue, Royal City</p>
          
          <button 
            onClick={(e) => { e.stopPropagation(); window.open('https://maps.google.com', '_blank'); }}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 transition-colors rounded-full font-sans text-sm uppercase tracking-widest backdrop-blur-sm border border-white/30"
          >
            <FaLocationArrow /> Get Directions
          </button>
        </GlassCard>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-[10px] font-sans tracking-widest text-white/50 uppercase"
        >
          Tap anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  );
}
