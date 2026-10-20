import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GlassCard from '../ui/GlassCard';

export default function Scene4_Portrait({ onNext }) {
  const containerRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: "100vw", scale: 1.1 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 1 } }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      onClick={onNext}
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-dark overflow-hidden"
    >
      {/* Background Parallax Image */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-60"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Floating Petals Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-pink-300/30 rounded-tl-full rounded-br-full"
            style={{
              width: Math.random() * 20 + 10 + 'px',
              height: Math.random() * 20 + 10 + 'px',
              left: Math.random() * 100 + 'vw',
              top: -50,
            }}
            animate={{
              y: '120vh',
              x: (Math.random() - 0.5) * 200 + 'px',
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className="z-20 relative w-full h-full flex items-end justify-center pb-24 px-6">
        <GlassCard delay={1} className="w-full max-w-sm">
          <h2 className="font-serif text-3xl text-gold-gradient mb-2">Two Souls</h2>
          <h3 className="font-sans text-xs tracking-[0.2em] uppercase text-white/80">One Beautiful Journey</h3>
        </GlassCard>
      </div>
    </motion.div>
  );
}
