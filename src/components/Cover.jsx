import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Wax Seal SVG (rich red wax look) ─── */
const WaxSeal = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="58" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
    <path
      d="M60,10 C75,8 92,18 100,32 C110,48 108,68 98,82 C86,98 68,108 50,106 C32,104 16,92 10,76 C4,60 8,40 20,28 C32,16 45,12 60,10Z"
      fill="#8B0000"
    />
    <path
      d="M60,20 C72,18 86,26 92,38 C100,52 97,68 88,80 C78,92 62,100 48,97 C34,94 22,84 18,70 C14,56 18,40 28,30 C38,20 48,22 60,20Z"
      fill="#A52020"
    />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
      <line key={i} x1="60" y1="28" x2="60" y2="60" stroke="#FAE8E0" strokeWidth="1" opacity="0.35" transform={`rotate(${deg} 60 60)`} />
    ))}
    <circle cx="60" cy="60" r="22" fill="#8B0000" stroke="#D4AF37" strokeWidth="1.5" />
    <text x="60" y="55" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="#D4AF37" fontWeight="bold">H &amp;</text>
    <text x="60" y="70" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="#D4AF37" fontWeight="bold">M</text>
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <circle key={i} cx="60" cy="34" r="2" fill="#D4AF37" opacity="0.6" transform={`rotate(${deg} 60 60)`} />
    ))}
  </svg>
);

const RoseSVG = ({ size = 40 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
    <ellipse cx="32" cy="22" rx="8" ry="16" fill="#FADADD" opacity="0.7" />
    <ellipse cx="32" cy="22" rx="8" ry="16" fill="#FADADD" opacity="0.5" transform="rotate(72 32 32)" />
    <ellipse cx="32" cy="22" rx="8" ry="16" fill="#FADADD" opacity="0.5" transform="rotate(144 32 32)" />
    <ellipse cx="32" cy="22" rx="8" ry="16" fill="#FADADD" opacity="0.5" transform="rotate(216 32 32)" />
    <ellipse cx="32" cy="22" rx="8" ry="16" fill="#FADADD" opacity="0.5" transform="rotate(288 32 32)" />
    <circle cx="32" cy="32" r="8" fill="#D4AF37" opacity="0.8" />
  </svg>
);

const Cover = ({ onOpen }) => {
  const [phase, setPhase] = useState('idle'); // idle -> cracking -> opening -> done

  const handleSealClick = () => {
    if (phase !== 'idle') return;
    setPhase('cracking');
    setTimeout(() => {
      setPhase('opening');
      setTimeout(() => {
        setPhase('done');
        setTimeout(() => onOpen(), 700);
      }, 1100);
    }, 400);
  };

  const flapOpen = phase === 'opening' || phase === 'done';
  const sealGone = phase === 'cracking' || flapOpen;

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0a00 0%, #3b1a08 40%, #1a0a00 100%)' }}
    >
      {/* Ambient floating roses */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${5 + i * 11}%`, top: `${8 + (i % 4) * 20}%`, opacity: 0.10 + (i % 3) * 0.05 }}
          animate={{ y: [0, -18, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 5 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
        >
          <RoseSVG size={20 + i * 5} />
        </motion.div>
      ))}

      {/* Gold corner ornaments */}
      {[
        { style: { top: '12px', left: '12px' }, rotate: 0 },
        { style: { top: '12px', right: '12px' }, rotate: 90 },
        { style: { bottom: '12px', left: '12px' }, rotate: 270 },
        { style: { bottom: '12px', right: '12px' }, rotate: 180 },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ ...pos.style, opacity: 0.5 }}>
          <svg viewBox="0 0 40 40" width={40} height={40} style={{ transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M0,0 L40,0 L0,40" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="4" cy="4" r="2" fill="#D4AF37" />
          </svg>
        </div>
      ))}

      {/* Full-screen envelope */}
      <div className="absolute inset-0" style={{ perspective: '1200px' }}>

        {/* Envelope body – parchment */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #f5ede0 0%, #f0e0c8 50%, #e8d0b0 100%)' }}
        >
          {/* Bottom triangle */}
          <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '45%' }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,100 50,0 100,100" fill="rgba(139,80,30,0.12)" />
            </svg>
          </div>
          {/* Left triangle */}
          <div className="absolute top-0 left-0 pointer-events-none" style={{ width: '50%', height: '100%' }}>
            <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="0,0 0,200 100,100" fill="rgba(139,80,30,0.10)" />
            </svg>
          </div>
          {/* Right triangle */}
          <div className="absolute top-0 right-0 pointer-events-none" style={{ width: '50%', height: '100%' }}>
            <svg viewBox="0 0 100 200" preserveAspectRatio="none" className="w-full h-full">
              <polygon points="100,0 100,200 0,100" fill="rgba(139,80,30,0.10)" />
            </svg>
          </div>
          {/* Fold lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
            <line x1="0" y1="0" x2="50%" y2="50%" stroke="#8B501E" strokeWidth="1" />
            <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#8B501E" strokeWidth="1" />
            <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#8B501E" strokeWidth="1" />
            <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#8B501E" strokeWidth="1" />
          </svg>
          {/* Gold inner border frames */}
          <div className="absolute pointer-events-none" style={{ inset: '20px', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '2px' }} />
          <div className="absolute pointer-events-none" style={{ inset: '28px', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '2px' }} />

          {/* Arabic text – top */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute left-0 w-full text-center pointer-events-none"
            style={{ top: '6vh' }}
          >
            <p className="font-serif" style={{ fontSize: 'clamp(1rem, 3vw, 1.7rem)', color: '#7a4a1a', letterSpacing: '0.05em' }}>
              \u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650
            </p>
          </motion.div>

          {/* Names + date – bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="absolute left-0 w-full text-center pointer-events-none"
            style={{ bottom: '7vh' }}
          >
            <h1 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)', color: '#5a2d0c', fontWeight: 400 }}>
              Hiba <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>&amp;</span> Mubashir
            </h1>
            <p style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', color: '#7a4a1a', letterSpacing: '0.3em', marginTop: '8px', textTransform: 'uppercase' }}>
              Wedding Invitation · 21 · 12 · 2026
            </p>
          </motion.div>
        </div>

        {/* Top flap – opens on seal click */}
        <motion.div
          className="absolute top-0 left-0 w-full"
          style={{ height: '50%', zIndex: 20, transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
          animate={flapOpen ? { rotateX: -175, opacity: 0.5 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 100,0 50,90" fill="#d4a87a" />
            <line x1="0" y1="0" x2="50" y2="90" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6" />
            <line x1="100" y1="0" x2="50" y2="90" stroke="#D4AF37" strokeWidth="0.4" opacity="0.6" />
          </svg>
          <div
            className="absolute bottom-0 left-0 w-full"
            style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)', opacity: 0.7 }}
          />
        </motion.div>

        {/* WAX SEAL – dead center */}
        <motion.button
          onClick={handleSealClick}
          disabled={phase !== 'idle'}
          className="absolute cursor-pointer"
          style={{
            width: 'min(22vw, 160px)',
            height: 'min(22vw, 160px)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
            background: 'none',
            border: 'none',
            padding: 0,
          }}
          animate={sealGone ? { scale: 1.2, opacity: 0, rotate: 20 } : { scale: 1, opacity: 1, rotate: 0 }}
          whileHover={phase === 'idle' ? { scale: 1.07 } : {}}
          whileTap={phase === 'idle' ? { scale: 0.95 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute rounded-full"
            style={{ inset: '-14px', border: '1.5px solid rgba(212,175,55,0.55)', borderRadius: '50%' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full"
            style={{ inset: '-28px', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '50%' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
          <WaxSeal />
        </motion.button>

        {/* Tap hint */}
        <AnimatePresence>
          {phase === 'idle' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="absolute w-full text-center pointer-events-none"
              style={{
                top: 'calc(50% + min(13vw, 96px))',
                fontSize: 'clamp(0.6rem, 1.4vw, 0.8rem)',
                color: '#7a4a1a',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                zIndex: 31,
              }}
            >
              \u2736 Tap the seal to open \u2736
            </motion.p>
          )}
        </AnimatePresence>

        {/* Fade reveal when done */}
        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50"
              style={{ background: 'linear-gradient(160deg, #FFF8E1 0%, #FADADD 30%, #F7E7CE 60%, #fff 100%)' }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cover;
