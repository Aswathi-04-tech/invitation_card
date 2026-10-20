import { motion } from 'framer-motion';

export default function WaxSeal({ onClick, text = "H & M", className = "" }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-24 h-24 rounded-full flex items-center justify-center ${className}`}
      style={{
        background: 'radial-gradient(circle at 30% 30%, #b22222, #8b0000, #5c0000)',
        boxShadow: `
          0 10px 15px -3px rgba(0, 0, 0, 0.3),
          inset 0 4px 6px rgba(255, 255, 255, 0.4),
          inset 0 -4px 6px rgba(0, 0, 0, 0.5),
          0 0 0 4px #8b0000,
          0 0 0 6px rgba(139, 0, 0, 0.5)
        `
      }}
    >
      {/* Irregular edge effect */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{
          border: '2px solid rgba(255, 255, 255, 0.1)',
          filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))',
        }}
      />
      <span 
        className="font-serif text-3xl text-[#ffe4e1] font-bold z-10 drop-shadow-md"
        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.2)' }}
      >
        {text}
      </span>
    </motion.button>
  );
}
