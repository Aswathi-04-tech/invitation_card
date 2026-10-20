import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Falling Rose Petals ─── */
function FallingPetals({ count = 18 }) {
  const petals = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,              // start x %
      size: 10 + Math.random() * 16,        // 10–26 px
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,      // 6–14 s
      drift: (Math.random() - 0.5) * 60,    // horizontal sway px
      rotation: Math.random() * 360,
      color: ['#f9a8d4', '#fbbfc7', '#fda4af', '#e9d5ff', '#fbcfe8'][i % 5],
      opacity: 0.35 + Math.random() * 0.35,
    })), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[20] overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.65,
            background: p.color,
            borderRadius: '50% 0 50% 50%',
            filter: 'blur(0.5px)',
          }}
          initial={{ y: -30, x: 0, rotate: p.rotation, opacity: 0 }}
          animate={{
            y: ['calc(-5vh)', 'calc(105vh)'],
            x: [0, p.drift, -p.drift * 0.5, p.drift * 0.3],
            rotate: [p.rotation, p.rotation + 360],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Floating Sparkle Particles ─── */
function FloatingSparkles({ count = 22 }) {
  const sparkles = useMemo(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    })), [count]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[21] overflow-hidden">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(255,255,255,0.6), 0 0 ${s.size * 6}px ${s.size * 2}px rgba(249,168,212,0.3)`,
          }}
          animate={{
            opacity: [0, 0.9, 0],
            scale: [0.5, 1.3, 0.5],
            y: [0, -15, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Soft Light Rays ─── */
function LightRays() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[19] overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: '-10%',
            left: `${25 + i * 20}%`,
            width: '120px',
            height: '130%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,220,240,0.08) 50%, transparent 100%)',
            transformOrigin: 'top center',
            filter: 'blur(20px)',
          }}
          animate={{
            rotate: [-5 + i * 3, 5 + i * 2, -5 + i * 3],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Scene1_Envelope({ onNext, isRevealing = false, onRevealComplete }) {
  const [phase, setPhase] = useState('idle');
  // Phases: 'idle' -> 'opening' -> 'zooming' -> 'fading'
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Fade in the welcome text after a small delay
    const t = setTimeout(() => setShowText(true), 600);
    return () => clearTimeout(t);
  }, []);

  // Handle external trigger if any
  useEffect(() => {
    if (isRevealing && phase === 'idle') {
      setPhase('opening');
    }
  }, [isRevealing]);

  // Sequence timings
  useEffect(() => {
    if (phase === 'opening') {
      const t1 = setTimeout(() => setPhase('zooming'), 2500); // Start walking away after doors open
      return () => clearTimeout(t1);
    } else if (phase === 'zooming') {
      const t2 = setTimeout(() => setPhase('fading'), 3500); // Walk for a few seconds, then fade out
      return () => clearTimeout(t2);
    } else if (phase === 'fading') {
      const t3 = setTimeout(() => {
        if (onRevealComplete) onRevealComplete();
      }, 2000); // Time for the fade out to finish
      return () => clearTimeout(t3);
    }
  }, [phase, onRevealComplete]);

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    if (onNext) onNext(); // Start scroll behind immediately
  };

  const isOpening = phase !== 'idle';
  const isZooming = phase === 'zooming' || phase === 'fading';
  const isFading = phase === 'fading';

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isOpening ? 'transparent' : '#faf4f6',
        transition: 'background-color 1.5s ease-in-out',
      }}
    >
      {/* Background Environment (Image 3: Garden) — stays static or slightly moves */}
      <motion.div
        className="absolute inset-0 bg-[url('/garden.png')] bg-cover bg-center z-0"
        initial={{ opacity: 1, scale: 1.05 }}
        animate={{
          opacity: isFading ? 0 : 1,
          scale: isZooming ? 1.0 : 1.05
        }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />

      {/* The Couple (Image 2: Bride and Groom) — walks away/zooms out */}
      <motion.div
        className="absolute inset-0 bg-[url('/couple.png')] bg-contain bg-center bg-no-repeat z-[1]"
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: isZooming ? 0.65 : 1, // Walk forward / zoom out
          opacity: isFading ? 0 : 1
        }}
        transition={{
          scale: { duration: 4, ease: 'easeOut' },
          opacity: { duration: 2, ease: 'easeInOut' }
        }}
      />

      {/* Warm dreamy overlay — fades when doors open */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center 70%, rgba(255,255,255,0) 0%, rgba(250,240,245,0.2) 70%, rgba(245,230,240,0.4) 100%)',
        }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* Animated Decorations */}
      <motion.div
        animate={{ opacity: isZooming ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      >
        <FallingPetals count={18} />
        <FloatingSparkles count={22} />
        <LightRays />
      </motion.div>

      {/* Golden light burst when doors open */}
      <AnimatePresence>
        {isOpening && !isZooming && (
          <motion.div
            className="absolute inset-0 z-[3] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(212,175,55,0.3) 0%, rgba(255,248,220,0.1) 40%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Bismillah text appears when doors open */}
      <AnimatePresence>
        {isOpening && !isFading && (
          <motion.div
            className="absolute top-[12%] z-30 flex flex-col items-center justify-center pointer-events-none w-full"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
          >
            <p className="text-5xl md:text-6xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'serif' }}>
              ﷽
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`relative flex items-center justify-center w-full h-full pb-10 z-[10] ${!isOpening ? 'cursor-pointer' : ''}`}
        style={{ perspective: '2000px' }}
        onClick={handleOpen}
        animate={{ opacity: isZooming ? 0 : 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* The Arch Frame containing the doors (Image 1: Door) */}
        <div className="absolute inset-0 w-full h-full flex" style={{ transformStyle: 'preserve-3d' }}>

          {/* Left Door - Opens INWARDS (+105 deg) */}
          <motion.div
            className="w-1/2 h-full origin-left relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.2), -5px 0 30px rgba(0,0,0,0.1)',
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpening ? 105 : 0 }}
            transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            {/* Split Image mapping for left half */}
            <div className="absolute top-0 left-0 w-[100vw] h-full bg-[url('/door.png')] bg-cover bg-center pointer-events-none" />
          </motion.div>

          {/* Right Door - Opens INWARDS (-105 deg) */}
          <motion.div

            className="w-1/2 h-full origin-right relative overflow-hidden"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              boxShadow: 'inset 10px 0 20px rgba(0,0,0,0.2), 5px 0 30px rgba(0,0,0,0.1)',
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isOpening ? -105 : 0 }}
            transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            {/* Split Image mapping for right half */}
            <div className="absolute top-0 right-0 w-[100vw] h-full bg-[url('/door.png')] bg-cover bg-center pointer-events-none" />
          </motion.div>

        </div>

        {/* Welcome text on doors */}
        <AnimatePresence>
          {!isOpening && showText && (
            <motion.div
              className="absolute z-20 flex flex-col items-center text-center pointer-events-none select-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <motion.p
                className="font-serif text-sm md:text-base tracking-[0.3em] uppercase text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                You are invited to
              </motion.p>
              <h1 className="font-greatVibes text-5xl md:text-7xl text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)] mb-3">
                Hiba & Mubashir
              </h1>
              <p className="font-serif text-xs md:text-sm tracking-[0.25em] uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                Wedding Celebration
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-12 z-50 text-white font-sans text-sm tracking-widest uppercase pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              Tap anywhere to open
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
