import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", delay = 0, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`glass-card p-8 flex flex-col items-center text-center ${className} ${onClick ? 'cursor-pointer hover:bg-white/40 transition-colors' : ''}`}
    >
      {children}
    </motion.div>
  );
}
