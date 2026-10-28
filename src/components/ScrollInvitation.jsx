import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from 'framer-motion';
import { FaHeart, FaMapMarkerAlt, FaLocationArrow } from 'react-icons/fa';
function FloralOverlay() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-[5]"
      style={{
        backgroundImage: "url('/floral_overlay.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.15,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
    />
  );
}

/* ── Reusable fade-in-up block triggered by scroll ── */
function RevealBlock({ children, delay = 0, className = '', direction = 'up', scrollRoot = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px', root: scrollRoot });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 60 : direction === 'down' ? -60 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Countdown ── */
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date('2026-12-20T00:00:00').getTime();
    const tick = () => {
      const dist = target - Date.now();
      if (dist > 0) {
        setTimeLeft({
          days: Math.floor(dist / 86400000),
          hours: Math.floor((dist % 86400000) / 3600000),
          minutes: Math.floor((dist % 3600000) / 60000),
          seconds: Math.floor((dist % 60000) / 1000),
        });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-4 md:gap-8 justify-center flex-wrap ">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((u, i) => (
        <RevealBlock key={u.label} delay={i * 0.12}>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
              <span className="font-serif text-3xl md:text-5xl text-[#D4AF37] drop-shadow z-10">
                {String(u.value).padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B7355] mt-2">{u.label}</span>
          </div>
        </RevealBlock>
      ))}
    </div>
  );
}

/* ── Section Divider ── */
function Divider() {
  return (
    <div className="flex items-center gap-4 w-full max-w-xs mx-auto my-2">

      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
      <FaHeart className="text-[#D4AF37] text-xs" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
    </div>
  );
}

/* ── Decorative Corners ── */
function Corners() {
  return (
    <>
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]/50 rounded-tl-2xl pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37]/50 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37]/50 rounded-bl-2xl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]/50 rounded-br-2xl pointer-events-none" />
    </>
  );
}

/* ── Floating Petals (seamless, no blank gaps) ── */
function FloatingPetals({ count = 12, color = 'bg-rose-300/20' }) {
  const petals = useRef(
    Array.from({ length: count }, (_, i) => {
      const dur = 12 + Math.random() * 10;
      return {
        id: i,
        left: Math.random() * 100,
        delay: (i / count) * dur * 0.6,
        dur,
        size: 10 + Math.random() * 16,
      };
    })
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute ${color} rounded-tl-full rounded-br-full`}
          style={{ width: p.size, height: p.size, left: `${p.left}%`, top: -30 }}
          animate={{ y: '110vh', x: [0, 30, -20, 0], rotate: 360 }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, repeatDelay: 0, ease: 'linear' }}
        />
      ))}
    </div>
  );
}

/* ── Flying Doves (Exact same animation from Scene1_Envelope) ── */
function FlyingDoves({ active = true, count = 4 }) {
  if (!active) return null;
  const doves = [
    { id: 1, startX: '-20vw', startY: '85vh', endX: '115vw', endY: '-15vh', delay: 0.3, duration: 6.8, scale: 0.9, rotate: -25 },
    { id: 2, startX: '-15vw', startY: '95vh', endX: '110vw', endY: '-25vh', delay: 0.9, duration: 7.6, scale: 0.7, rotate: -30 },
    { id: 3, startX: '-25vw', startY: '75vh', endX: '120vw', endY: '5vh', delay: 1.4, duration: 6.4, scale: 1.1, rotate: -20 },
    { id: 4, startX: '-10vw', startY: '90vh', endX: '105vw', endY: '-10vh', delay: 2.0, duration: 7.2, scale: 0.8, rotate: -28 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {doves.slice(0, count).map((d) => (
        <motion.div
          key={d.id}
          className="absolute"
          initial={{ x: d.startX, y: d.startY, opacity: 0, scale: d.scale * 0.4, rotate: d.rotate }}
          animate={{
            x: [d.startX, d.endX],
            y: [d.startY, d.endY],
            opacity: [0, 1, 1, 0],
            scale: [d.scale * 0.4, d.scale * 1.2, d.scale],
            rotate: [d.rotate, d.rotate + 10, d.rotate - 10],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {/* Wing flapping micro-animation */}
          <motion.div
            animate={{ scaleY: [1, 0.7, 1], y: [0, -8, 0] }}
            transition={{ duration: 0.48, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <img
              src="/dove.png"
              alt="Flying Dove"
              className="w-28 h-28 md:w-44 md:h-44 object-contain filter drop-shadow-[0_10px_20px_rgba(212,175,55,0.45)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/dove.svg";
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}


/* ── Sparkle Heart Animation ── */
function SparkleHeart() {
  const heartRef = useRef(null);
  const inView = useInView(heartRef, { margin: '-50px' }); // trigger on every entry
  const [sparkles, setSparkles] = useState([]);
  const [trailParticles, setTrailParticles] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  // regenerate sparkles periodically to keep animation looping
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => setResetKey((k) => k + 1), 5000);
    return () => clearInterval(interval);
  }, [inView]);

  // Heart path points generator
  const getHeartPoint = (t) => {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * 5.5 + 100, y: y * 5.5 + 100 };
  };

  // Generate sparkle trail points along the heart path
  useEffect(() => {
    if (!inView) return;
    const points = [];
    const totalPoints = 60;
    for (let i = 0; i <= totalPoints; i++) {
      const t = (i / totalPoints) * 2 * Math.PI;
      const point = getHeartPoint(t);
      points.push({
        id: i,
        x: point.x,
        y: point.y,
        delay: (i / totalPoints) * 2.5,
        size: 2 + Math.random() * 3,
      });
    }
    setSparkles(points);

    // Generate extra sparkle particles that fly outward from the heart
    const extras = [];
    for (let i = 0; i < 30; i++) {
      const t = Math.random() * 2 * Math.PI;
      const pt = getHeartPoint(t);
      const angle = Math.random() * 2 * Math.PI;
      const dist = 15 + Math.random() * 35;
      extras.push({
        id: i,
        startX: pt.x,
        startY: pt.y,
        endX: pt.x + Math.cos(angle) * dist,
        endY: pt.y + Math.sin(angle) * dist,
        delay: 0.8 + Math.random() * 2.2,
        duration: 0.8 + Math.random() * 1.2,
        size: 1 + Math.random() * 2.5,
      });
    }
    setTrailParticles(extras);
  }, [inView, resetKey]);

  return (
    <div ref={heartRef} className="flex items-center justify-center py-8">
      <svg
        viewBox="0 0 200 200"
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter for sparkle particles */}
        <defs>
          <filter id="sparkleGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sparkle particles tracing the heart outline */}
        {inView && sparkles.map((s) => (
          <motion.circle
            key={`trace-${s.id}`}
            cx={s.x}
            cy={s.y}
            r={s.size}
            fill="url(#sparkleGrad)"
            filter="url(#sparkleGlow)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.9, 1], scale: [0, 1.8, 1, 1.2] }}
            transition={{
              duration: 0.6,
              delay: s.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* The heart stroke that draws itself with a sparkle trail */}
        {inView && (
          <>
            <motion.path
              d={(() => { let d = ''; for (let i = 0; i <= 100; i++) { const t = (i / 100) * 2 * Math.PI; const p = getHeartPoint(t); d += (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`; } return d + 'Z'; })()}
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.2, repeat: Infinity, repeatDelay: 2 }}
            />

            {/* Soft gold heart fill that fades in after the sparkle draws */}
            <motion.path
              d={(() => { let d = ''; for (let i = 0; i <= 100; i++) { const t = (i / 100) * 2 * Math.PI; const p = getHeartPoint(t); d += (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`; } return d + 'Z'; })()}
              fill="#D4AF37"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 2.8, repeat: Infinity, repeatDelay: 2 }}
            />
          </>
        )}

        {/* Flying sparkle particles that burst outward from the heart */}
        {inView && trailParticles.map((p) => (
          <motion.circle
            key={`burst-${p.id}`}
            cx={p.startX}
            cy={p.startY}
            r={p.size}
            fill="#F1E5AC"
            filter="url(#sparkleGlow)"
            initial={{ opacity: 0, cx: p.startX, cy: p.startY, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: p.endX,
              cy: p.endY,
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Continuous shimmer sparkles after heart is complete */}
        {inView && [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const t = (i / 8) * 2 * Math.PI;
          const pt = getHeartPoint(t);
          return (
            <motion.circle
              key={`shimmer-${i}`}
              cx={pt.x}
              cy={pt.y}
              r="2"
              fill="#FFF8DC"
              filter="url(#sparkleGlow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{
                duration: 2,
                delay: 3.2 + i * 0.25,
                repeat: Infinity,
                repeatDelay: 1.5,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Function Sections (Individual Event Images) ── */
function FunctionSections({ scrollRootRef }) {
  const weddingFunctions = [
    { title: "Manavattti Raavu", date: "18th Dec, 2026", time: "3:30 PM — 8:00 PM", icon: "💍", bg: "/picturemrgpic/manavattti_raavu.png", tag: "Day 01" },
    { title: "Mehfil-e-Mehandi", date: "19th Dec, 2026", time: "10:00 AM — 12:00 PM", icon: "🌿", bg: "/picturemrgpic/mehfil_mehandi.png", tag: "Day 02 • Morning" },
    { title: "Bolly Beats & Bling", date: "19th Dec, 2026", time: "3:30 PM — 10:00 PM", icon: "🎵", bg: "/picturemrgpic/bolly_beats_bg.png", tag: "Day 02 • Evening" },
    { title: "Nikkah", date: "20th Dec, 2026", time: "4:00 PM", icon: "🕌", bg: "/picturemrgpic/nikkah.png", tag: "Day 03 • Sacred Vows" },
    { title: "Vibe After Vows", date: "20th Dec, 2026", time: "5:30 PM — 11:00 PM", icon: "🎉", bg: "/picturemrgpic/vibe_after_vows.png", tag: "Day 03 • Celebration" },
    { title: "Shaadi Saga", date: "21st Dec, 2026", time: "10:00 AM — 2:00 PM", icon: "👰", bg: "/picturemrgpic/shandi.png", tag: "Day 04 • Reception" },
    { title: "The Final Fate", date: "21st Dec, 2026", time: "4:00 PM", icon: "✨", bg: "/picturemrgpic/finalfate.png", tag: "Day 04 • Grand Finale" },
  ];

  return (
    <>
      {/* ─── Intro Heading Section ─── */}
      <section className="relative py-20 sm:py-24 px-4 flex flex-col items-center justify-center text-center bg-transparent overflow-hidden">
        {/* Animated breathing glow orbs */}
        <motion.div
          className="absolute -top-16 right-0 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-rose-300/15 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />

        <RevealBlock className="mb-3" scrollRoot={scrollRootRef}>
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, root: scrollRootRef }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#D4AF37] text-xs"
            >
              ✦
            </motion.span>
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.45em] uppercase text-[#8B7355] font-semibold">
              Celebrate With Us
            </p>
            <motion.span
              animate={{ rotate: [360, 180, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#D4AF37] text-xs"
            >
              ✦
            </motion.span>
          </motion.div>
        </RevealBlock>

        <RevealBlock delay={0.1} scrollRoot={scrollRootRef}>
          <h2
            className="text-[#5c4a3d] leading-tight mb-3 font-serif drop-shadow-sm"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 8vw, 3.6rem)', letterSpacing: '0.05em' }}
          >
            Our Functions
          </h2>
        </RevealBlock>

        <RevealBlock delay={0.2} scrollRoot={scrollRootRef}>
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent to-[#D4AF37]"
              initial={{ scaleX: 0, originX: 1 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, root: scrollRootRef }}
            />
            <motion.span
              className="text-[#D4AF37] text-base"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✦
            </motion.span>
            <motion.div
              className="w-16 sm:w-24 h-px bg-gradient-to-l from-transparent to-[#D4AF37]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, root: scrollRootRef }}
            />
          </div>
        </RevealBlock>

        <RevealBlock delay={0.3} scrollRoot={scrollRootRef}>
          <p className="font-sans text-xs sm:text-sm text-[#8B7355]/85 leading-relaxed max-w-xs sm:max-w-md font-light">
            Join us across four magical days of celebration, joy, and memories that will last a lifetime.
          </p>
        </RevealBlock>
      </section>

      {/* ─── Individual Function Pages with Rich Animations ─── */}
      {weddingFunctions.map((func, idx) => (
        <section
          key={idx}
          className="relative w-full overflow-hidden bg-[#0d0a06] group"
          style={{ height: 'clamp(300px, 65vw, 100vh)', maxHeight: '100vh', minHeight: '280px' }}
        >
          {/* Full-bleed background image with smooth Ken Burns zoom & parallax motion */}
          <motion.div
            className="absolute inset-0 z-0 origin-center"
            style={{
              backgroundImage: `url(${func.bg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
            initial={{ scale: 1.14, y: 15 }}
            whileInView={{ scale: 1, y: 0 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, root: scrollRootRef, margin: '-50px' }}
          />

          {/* Shimmer Light Beam Sweep on scroll into view */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 pointer-events-none z-[8]"
            initial={{ x: '-150%' }}
            whileInView={{ x: '180%' }}
            transition={{ duration: 1.6, delay: 0.25, ease: 'easeInOut' }}
            viewport={{ once: false, root: scrollRootRef }}
          />

          {/* Vignette & bottom dark gradient overlay for crystal clear readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />

          {/* Top Event Badge & Counter */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex items-center justify-between pointer-events-none">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg text-white"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, root: scrollRootRef }}
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="font-sans text-[10px] sm:text-xs font-medium tracking-wider uppercase text-amber-200">
                {func.tag}
              </span>
            </motion.div>

            <motion.div
              className="px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[10px] sm:text-xs"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: false, root: scrollRootRef }}
            >
              {String(idx + 1).padStart(2, '0')} / {String(weddingFunctions.length).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Title, Icon & Date/Time overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-8 pb-6 sm:pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4">
              {/* Left: icon + title with spring animation */}
              <div className="flex items-center gap-3">
                <motion.span
                  className="text-2xl sm:text-4xl drop-shadow-lg leading-none inline-block filter"
                  initial={{ scale: 0, rotate: -25 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.2 }}
                  viewport={{ once: false, root: scrollRootRef }}
                >
                  {func.icon}
                </motion.span>
                <motion.h3
                  className="font-serif font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] leading-tight tracking-wide"
                  style={{ fontSize: 'clamp(1.2rem, 4.5vw, 2.2rem)' }}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: false, root: scrollRootRef }}
                >
                  {func.title}
                </motion.h3>
              </div>

              {/* Right: date + time inside elegant glass pill */}
              <motion.div
                className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-0.5 bg-black/40 sm:bg-black/30 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/15 shadow-md w-fit"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, root: scrollRootRef }}
              >
                <span className="font-sans text-[11px] sm:text-xs text-[#E5C158] tracking-widest uppercase font-bold flex items-center gap-1">
                  <span>📅</span> {func.date}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] text-white/85 tracking-wide flex items-center gap-1">
                  <span>⏰</span> {func.time}
                </span>
              </motion.div>
            </div>

            {/* Gold animated separator line */}
            <motion.div
              className="mt-3 sm:mt-4 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#E5C158]/70 to-transparent rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, root: scrollRootRef }}
            />
          </div>
        </section>
      ))}
    </>
  );
}

/* ── Luxury Dress Code Section ── */
const dressCodes = [
  {
    key: 'raavu',
    short: 'Manavattti Raavu',
    title: 'Manavattti Raavu',
    icon: '💍',
    when: '18th Dec • 3:30 PM',
    kasavu: true,
    theme: {
      bg: 'linear-gradient(160deg,#FFF9EA 0%,#F5EBD0 55%,#EBD9A6 100%)',
      text: '#493b32',
      sub: '#8B7355',
      accent: '#D4AF37',
    },
    lines: [
      { label: 'Ladies', value: 'Pattusari Saree', icon: '🥻' },
      { label: 'Gents & Boys', value: 'Mund & Shirt', icon: '👔' },
    ],
    swatches: [
      // { name: 'Kasavu Cream', color: '#F5EBD0' },
      // { name: 'Antique Gold', color: '#D4AF37' },
      // { name: 'Off White', color: '#FBF7EE' },
    ],
    // avoid: [
    //   // { name: 'Red', color: '#C62828' },
    //   // { name: 'Maroon', color: '#800000' },
    // ],
  },
  {
    key: 'bolly',
    short: 'Bolly Beats',
    title: 'Bolly Beats & Bling',
    icon: '🎵',
    when: '19th Dec • 3:30 PM',
    theme: {
      bg: 'linear-gradient(160deg,#2D0612 0%,#520E20 50%,#800020 100%)',
      text: '#FDF2F4',
      sub: '#ECA8B8',
      accent: '#E5C158',
    },
    lines: [
      { label: 'Theme', value: 'Bollywood glam', icon: '✨' },
      { label: 'Attire', value: 'Wine /Burgundy Only', icon: '💃' },
    ],
    swatches: [
      // { name: 'Wine', color: '#722F37' },
      { name: 'Burgundy/Wine', color: '#800020' },
    ],
  },
  {
    key: 'vibe',
    short: 'Vibe After Vows',
    title: 'Vibe After Vows',
    icon: '🎉',
    when: '20th Dec • 5:30 PM',
    theme: {
      bg: 'linear-gradient(160deg,#FBEAF0 0%,#EBE1F5 40%,#DCEBE3 75%,#DCEBF5 100%)',
      text: '#493b32',
      sub: '#8B7355',
      accent: '#B78BA8',
    },
    lines: [
      { label: 'Theme', value: 'Pastel colours', icon: '🎨' },
      { label: 'Style', value: 'Heavy party wear – Pakistani', icon: '✨' },
    ],
    swatches: [
      { name: 'Dusty Rose', color: '#C9A0A0' },
      { name: 'Sage Green', color: '#A8B5A0' },
      { name: 'Mauve', color: '#C4A1B5' },
      { name: 'Muted Blush', color: '#E8C9C5' },
      { name: 'Eucalyptus', color: '#9DB8A6' },
      { name: 'Ice Blue', color: '#CFE4EE' },
      { name: 'Light Lavender', color: '#DCD0F0' },
    ],
  },
];

const KASAVU_STRIPE =
  'repeating-linear-gradient(90deg,#D4AF37 0 12px,#F5EBD0 12px 16px,#D4AF37 16px 20px,#F5EBD0 20px 32px)';

function DressCodeSection({ scrollRootRef }) {
  const [active, setActive] = useState(0);
  const d = dressCodes[active];
  const t = d.theme;

  return (
    <section className="relative py-28 px-4 overflow-hidden bg-[#f8f5ef]">

      {/* Background luxury ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-[#d9c5c5]/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-[#e8dfd2]/30 blur-3xl" />

        <div className="absolute top-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <RevealBlock scrollRoot={scrollRootRef} className="text-center mb-14">

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.45em' }}
            transition={{ duration: 1 }}
            viewport={{ once: true, root: scrollRootRef }}
            className="font-sans text-[10px] uppercase text-[#9a8051] font-semibold mb-5"
          >
            The Art of Dressing
          </motion.p>

          <h2
            className="text-[#493b32] leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 9vw, 5rem)',
              fontWeight: 500,
            }}
          >
            Dress Code
          </h2>

          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />

            <motion.div
              animate={{
                rotate: [45, 135, 45],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2.5 h-2.5 border border-[#D4AF37] rotate-45"
            />

            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>

          <p className="max-w-md mx-auto mt-6 text-[#8b7355] text-xs md:text-sm leading-relaxed">
            Each celebration carries its own mood, colour and character.
            Dress beautifully and become part of the story.
          </p>
        </RevealBlock>

        {/* Function selector */}
        <RevealBlock delay={0.1} scrollRoot={scrollRootRef} className="mb-12">
          <div className="flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-full bg-white/70 backdrop-blur-md border border-[#D4AF37]/20 shadow-sm">

              {dressCodes.map((c, i) => {
                const selected = i === active;

                return (
                  <motion.button
                    key={c.key}
                    onClick={() => setActive(i)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`
                      relative flex items-center gap-2
                      px-5 py-2.5
                      rounded-full
                      text-[10px]
                      tracking-widest
                      uppercase
                      transition-all duration-500
                      ${selected
                        ? 'text-[#241b13]'
                        : 'text-[#8B7355] hover:text-[#493b32]'
                      }
                    `}
                  >
                    {selected && (
                      <motion.span
                        layoutId="dressActive"
                        className="absolute inset-0 rounded-full bg-[#D4AF37]"
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}

                    <span className="relative z-10">{c.icon}</span>

                    <span className="relative z-10 hidden sm:block">
                      {c.short}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </RevealBlock>

        {/* Main luxury card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={d.key}
            initial={{ opacity: 0, y: 35, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.98 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Champagne-gold outer frame */}
            <div
              className="relative p-[1px] rounded-[2rem] shadow-[0_30px_80px_rgba(70,50,30,0.15)]"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    #D4AF37,
                    #F4E4AE,
                    #B78A2C,
                    #F1D77B,
                    #D4AF37
                  )
                `,
              }}
            >
              <div
                className="relative rounded-[calc(2rem-1px)] overflow-hidden"
                style={{
                  background: t.bg,
                  color: t.text,
                }}
              >
                {/* Top gold strip */}
                <div className="h-1.5 bg-gradient-to-r from-[#9b762c] via-[#F5E6AF] to-[#9b762c]" />

                {/* Decorative corners */}
                <div className="absolute top-7 left-7 w-14 h-14 border-t border-l border-[#D4AF37]/50 rounded-tl-xl" />
                <div className="absolute top-7 right-7 w-14 h-14 border-t border-r border-[#D4AF37]/50 rounded-tr-xl" />
                <div className="absolute bottom-7 left-7 w-14 h-14 border-b border-l border-[#D4AF37]/50 rounded-bl-xl" />
                <div className="absolute bottom-7 right-7 w-14 h-14 border-b border-r border-[#D4AF37]/50 rounded-br-xl" />

                {/* Ambient glow */}
                <motion.div
                  className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                  style={{
                    background: t.accent,
                    opacity: 0.12,
                  }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <div className="relative px-6 sm:px-12 md:px-20 py-14 sm:py-16">

                  {/* Function icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 180,
                      damping: 15,
                    }}
                    className="flex justify-center mb-5"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg"
                      style={{
                        background: `${t.accent}18`,
                        border: `1px solid ${t.accent}55`,
                      }}
                    >
                      {d.icon}
                    </div>
                  </motion.div>

                  {/* Function title */}
                  <div className="text-center">
                    <p
                      className="uppercase tracking-[0.4em] text-[9px] font-semibold mb-3"
                      style={{ color: t.accent }}
                    >
                      {d.when}
                    </p>

                    <h3
                      className="leading-tight"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(2rem, 6vw, 3.4rem)',
                        fontWeight: 500,
                      }}
                    >
                      {d.title}
                    </h3>

                    <div className="flex items-center justify-center gap-3 mt-5">
                      <div className="w-12 h-px" style={{ background: t.accent }} />
                      <span className="text-xs" style={{ color: t.accent }}>✦</span>
                      <div className="w-12 h-px" style={{ background: t.accent }} />
                    </div>
                  </div>

                  {/* What to wear */}
                  <div className="mt-12">
                    <p
                      className="text-center uppercase tracking-[0.35em] text-[9px] font-semibold mb-6"
                      style={{ color: t.sub }}
                    >
                      What to Wear
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                      {d.lines.map((line, i) => (
                        <motion.div
                          key={line.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.2 + i * 0.12,
                            duration: 0.6,
                          }}
                          className="min-w-[190px] text-center px-6 py-5 rounded-2xl"
                          style={{
                            background: `${t.accent}12`,
                            border: `1px solid ${t.accent}35`,
                          }}
                        >
                          <div className="text-2xl mb-2">{line.icon}</div>

                          <p
                            className="uppercase tracking-[0.25em] text-[8px] font-semibold mb-1"
                            style={{ color: t.sub }}
                          >
                            {line.label}
                          </p>

                          <p
                            className="font-serif text-lg"
                            style={{ color: t.text }}
                          >
                            {line.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Colour palette */}
                  {/* Colour Palette - Show only when colours are provided */}
{d.swatches && d.swatches.length > 0 && (
  <div className="mt-14">
    <div className="flex items-center gap-4 mb-8">
      <div
        className="flex-1 h-px"
        style={{ background: `${t.accent}40` }}
      />

      <p
        className="uppercase tracking-[0.35em] text-[9px] font-semibold whitespace-nowrap"
        style={{ color: t.sub }}
      >
        Colour Palette
      </p>

      <div
        className="flex-1 h-px"
        style={{ background: `${t.accent}40` }}
      />
    </div>

    {/* Colour circles */}
    <div className="flex flex-wrap justify-center gap-7">
      {d.swatches.map((swatch, i) => (
        <motion.div
          key={swatch.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3 + i * 0.08,
            duration: 0.5,
          }}
          whileHover={{ y: -7 }}
          className="text-center"
        >
          <div
            className="relative w-16 h-16 rounded-full mx-auto mb-3"
            style={{
              backgroundColor: swatch.color,
              boxShadow: `
                0 8px 25px ${swatch.color}66,
                inset 0 0 0 1px rgba(255,255,255,0.6)
              `,
            }}
          >
            <div className="absolute inset-1 rounded-full border border-white/40" />

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/10" />
          </div>

          <p
            className="text-[9px] font-medium whitespace-nowrap"
            style={{ color: t.sub }}
          >
            {swatch.name}
          </p>
        </motion.div>
      ))}
    </div>

    {/* Palette ribbon */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: 0.6, duration: 1 }}
      className="flex h-1.5 max-w-md mx-auto mt-10 rounded-full overflow-hidden"
    >
      {d.swatches.map((swatch) => (
        <span
          key={swatch.name}
          className="flex-1"
          style={{ backgroundColor: swatch.color }}
        />
      ))}
    </motion.div>
  </div>
)}

                  {/* Avoid colours */}
                  {d.avoid && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mt-12 text-center"
                    >
                      <p className="text-[9px] uppercase tracking-[0.3em] text-red-700/70 font-semibold mb-4">
                        Kindly Avoid
                      </p>

                      <div className="flex justify-center gap-8">
                        {d.avoid.map((avoid) => (
                          <div key={avoid.name} className="text-center">
                            <div
                              className="relative w-12 h-12 rounded-full mx-auto mb-2"
                              style={{ backgroundColor: avoid.color }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center text-white/90 text-lg">
                                ×
                              </div>
                            </div>

                            <p className="text-[9px] text-[#8B7355]">
                              {avoid.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Bottom gold strip */}
                <div className="h-1 bg-gradient-to-r from-[#9b762c] via-[#F5E6AF] to-[#9b762c]" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footnote */}
        <RevealBlock
          delay={0.2}
          scrollRoot={scrollRootRef}
          className="text-center mt-10"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-[#D4AF37] text-xs">✦</span>

            <p className="font-serif italic text-sm text-[#8B7355]/70">
              Dress with love, celebrate with joy.
            </p>

            <span className="text-[#D4AF37] text-xs">✦</span>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN SCROLL INVITATION COMPONENT
═══════════════════════════════════════════════ */
export default function ScrollInvitation({ onRestart }) {
  const containerRef = useRef(null);
  // Expose containerRef so RevealBlock can use it as the scroll root
  const scrollRootRef = containerRef;
  const audioRef = useRef(null);

  // Play audio on mount (user already tapped the door, so interaction requirement is met)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {
        // Browser still blocked it, try again on next user interaction
        const playOnClick = () => {
          audioRef.current?.play();
          document.removeEventListener('click', playOnClick);
        };
        document.addEventListener('click', playOnClick);
      });
    }
  }, []);
  const { scrollYProgress } = useScroll({ container: containerRef });

  // List of images we have in /public
  const bgImages = [
    '/picturemrgpic/pic1.png',
    '/picturemrgpic/pic3.png',
    '/picturemrgpic/pic4.png',
    '/picturemrgpic/pic5.png',
    '/picturemrgpic/pic6.png',
    '/picturemrgpic/pic7.png',
    '/picturemrgpic/pic8.png',
    '/picturemrgpic/pic9.png',
    '/picturemrgpic/pic10.png',
    '/picturemrgpic/pic11.png',
    '/picturemrgpic/pic12.png',
    '/picturemrgpic/pic13.png',
    '/picturemrgpic/pic14.png',
    '/picturemrgpic/pic15.png',
    '/picturemrgpic/pic16.png',
    '/picturemrgpic/pic17.png',
    '/picturemrgpic/pic18.png',
  ];


  const functionSectionRef = useRef(null);
  const [funcSectionRatio, setFuncSectionRatio] = useState(0.42);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile devices need a tighter image crop and faster background transitions.
  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Measure exact scroll point where function section begins
  useEffect(() => {
    const calculateRatio = () => {
      if (containerRef.current && functionSectionRef.current) {
        const maxScroll = containerRef.current.scrollHeight - containerRef.current.clientHeight;
        const targetScroll = functionSectionRef.current.offsetTop;
        if (maxScroll > 0 && targetScroll > 0) {
          const ratio = Math.max(0.15, Math.min(0.85, targetScroll / maxScroll));
          setFuncSectionRatio(ratio);
        }
      }
    };

    calculateRatio();
    window.addEventListener('resize', calculateRatio);
    const t1 = setTimeout(calculateRatio, 300);
    const t2 = setTimeout(calculateRatio, 1000);
    return () => {
      window.removeEventListener('resize', calculateRatio);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Balanced spring physics — snappy but silky smooth
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.0005
  });

  // Map smooth scroll progress (0 up to reaching the function section) to full animation of all images
  const activeIndex = useTransform(
    smoothScrollProgress,
    [0, funcSectionRatio],
    [0, bgImages.length - 1],
    { clamp: true }
  );
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Sync index on scroll change
  useEffect(() => {
    return activeIndex.onChange((latest) => {
      const idx = Math.min(Math.floor(latest), bgImages.length - 1);
      setCurrentImgIndex(idx);
    });
  }, [activeIndex]);

  // Parallax transforms
  const heroBg = useTransform(scrollYProgress, [0, 0.20], [0, -80]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 2, scale: 1 }}
      exit={{ opacity: 0, filter: 'blur(12px)' }}
      transition={{ duration: 1.02, ease: 'easeOut' }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#faf9f6]"
    >
      {/* Background ambient music */}
      <audio ref={audioRef} src="/audio/bridesong.mp3" loop preload="auto" />

      {/* Floral overlay decoration */}
      <FloralOverlay />

      {/* ── Fixed Scrolling Background Images ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* All images share the same fixed container for identical size and position */}
        <div className="absolute inset-0 w-full h-full">
          {bgImages.map((src, idx) => {
            const isActive = idx === currentImgIndex;
            return (
              <motion.img
                key={src}
                src={src}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.88 : 0 }}
                transition={{
                  duration: isMobile ? 0.28 : 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute  inset-[1.5%] w-[100%] h-[100%] object-contain sm:inset-0 sm:w-full sm:h-full"
                style={{
                  objectPosition: isMobile ? "center 70%" : "center center",
                }}
              />
            );
          })}
        </div>
        {/* Soft background vignette / gradient overlay to make text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6]/90 via-transparent to-[#faf9f6]/95 z-10" />
      </div>

      {/* ── Scrollable Container ── */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scroll-smooth z-20"
        style={{ scrollBehavior: 'smooth' }}
      >

        {/* ══════════ SECTION 1 – HERO / COUPLE NAMES & DATES ══════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent py-16">
          <FloatingPetals count={14} color="bg-rose-200/25" />
          <FlyingDoves count={3} />

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-300/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-amber-200/10 rounded-full blur-3xl" />

          <motion.div style={{ y: heroBg }} className="relative z-10 flex flex-col items-center text-center px-6">
            <RevealBlock delay={0}>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#8B7355] mb-4">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
              </p>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
                <FaHeart className="text-[#D4AF37] text-sm" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
              </div>
            </RevealBlock>

            <RevealBlock delay={0.25}>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8B7355]/80 mb-6">
                Together with their families
              </p>
            </RevealBlock>

            <RevealBlock delay={0.35}>
              <h1
                className="leading-tight drop-shadow-sm text-[#8B7355]"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3.5rem, 14vw, 7rem)' }}
              >
                Hiba
              </h1>
            </RevealBlock>

            <RevealBlock delay={0.45}>
              <span
                className="block text-[#D4AF37] my-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontStyle: 'italic' }}
              >
                &amp;
              </span>
            </RevealBlock>

            <RevealBlock delay={0.55}>
              <h1
                className="leading-tight drop-shadow-sm text-[#8B7355]"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3.5rem, 14vw, 7rem)' }}
              >
                Mubashir
              </h1>
            </RevealBlock>

            <RevealBlock delay={0.7} className="mt-6">
              <p className="font-sans text-xs tracking-widest uppercase text-[#8B7355]/60">
                Request the Honor of Your Presence
              </p>
            </RevealBlock>

            <RevealBlock delay={0.85} className="mt-6 mb-10">
              <div className="border-y border-[#D4AF37]/30 py-4 px-12 text-center">
                <p
                  className="text-[#5c4a3d]"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}
                >
                  Sunday, 20th December
                </p>
                <p className="font-sans text-[10px] tracking-widest uppercase text-[#8B7355]/60 mt-1">
                  Two Thousand Twenty-Six
                </p>
              </div>
            </RevealBlock>

            {/* Scroll indicator */}
            <RevealBlock delay={1.0} className="mt-4">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#8B7355]/50">Scroll to explore</span>
                <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/60 to-transparent mx-auto" />
              </motion.div>
            </RevealBlock>
          </motion.div>
        </section>

        {/* ══════════ SECTION 2 – COUNTDOWN ══════════ */}
        <section className="relative py-24 px-4 bg-transparent overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto text-center">
            <RevealBlock className="mb-14">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#8B7355]/70 mb-3">Until The Big Day</p>
              <h2
                className="text-[#5c4a3d]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 7vw, 3rem)' }}
              >
                The Countdown Begins
              </h2>
              <div className="w-14 h-px bg-[#D4AF37] mx-auto mt-4" />
            </RevealBlock>

            <Countdown />
          </div>
        </section>

        {/* ══════════ SECTION 3 – WELCOME NOTE & IMAGES ══════════ */}
        <section className="relative py-24 px-4 bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/10 to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
            <RevealBlock delay={0}>
              <h2
                className="text-[#5c4a3d] mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 7vw, 3rem)' }}
              >
                Welcome to Our Wedding
              </h2>
              <blockquote className="relative px-8 max-w-lg mx-auto">
                <span className="absolute -left-2 top-0 text-5xl text-[#D4AF37]/25 font-serif leading-none">"</span>
                <p
                  className="text-[#5c4a3d] italic leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.3rem, 4vw, 1.9rem)' }}
                >
                  And We created you in pairs
                </p>
                <span className="absolute -right-2 bottom-0 text-5xl text-[#D4AF37]/25 font-serif leading-none rotate-180">"</span>
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8B7355]/60 mt-4">— Quran 78:8</p>
              </blockquote>
            </RevealBlock>

            <Divider />

            <RevealBlock delay={0.2} className="w-full">
              <p className="font-sans text-sm text-[#5c4a3d]/85 leading-relaxed max-w-md mx-auto mb-6">
                It is with great joy that we welcome you to share in our celebration. We invite you to join us as we embark on this blessed journey together.
              </p>

              <div className="mb-10 max-w-md mx-auto px-4 py-2 border-y border-[#D4AF37]/20">
                <p className="text-[#D4AF37] text-lg sm:text-xl font-serif mb-1 leading-loose">
                  اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَكُمَا فِي خَيْرٍ
                </p>
                <p className="text-[#8B7355]/85 font-sans italic text-[10px] tracking-wide">
                  "O Allah, bless them, shower Your blessings upon them, and unite them in goodness."
                </p>
              </div>

              {/* Sparkle Heart – particles trace and form a heart shape */}
              <SparkleHeart />
            </RevealBlock>
          </div>
        </section>

        {/* ══════════ SECTION 4 – WEDDING ITINERARY TIMELINE ══════════ */}
        <section className="relative py-24 px-4 overflow-hidden bg-transparent">
          {/* Decorative background glow */}
          <div className="absolute -top-20 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 left-0 w-64 h-64 bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-lg mx-auto">
            {/* Section Header */}
            <RevealBlock className="text-center mb-16" scrollRoot={scrollRootRef}>
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#8B7355]/70 mb-3">The Celebration</p>
              <h2
                className="text-[#5c4a3d] mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.08em' }}
              >
                WEDDING
              </h2>
              <h2
                className="text-[#5c4a3d]"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 8vw, 3rem)', letterSpacing: '0.08em' }}
              >
                ITINERARY
              </h2>
              <div className="w-14 h-px bg-[#D4AF37] mx-auto mt-4" />
            </RevealBlock>

            {/* ─── DAY 1 & 2: 18th & 19th Dec 2026 ─── */}
            <RevealBlock delay={0.1} className="text-center mb-10" scrollRoot={scrollRootRef}>
              <div className="inline-block bg-white/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-8 py-3 shadow-md">
                <p className="font-serif text-lg text-[#5c4a3d] tracking-wide">
                  18<sup>th</sup> & 19<sup>th</sup> Dec, 2026
                </p>
              </div>
            </RevealBlock>

            {/* Timeline container */}
            <div className="relative">
              {/* Vertical golden timeline line */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
                style={{ background: 'linear-gradient(180deg, #D4AF37 0%, #c9a84c 50%, #D4AF37 100%)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true, root: scrollRootRef }}
              />

              {/* Event 1 - LEFT: Manavattti Raavu */}
              <div className="relative flex items-center mb-12">
                <RevealBlock delay={0.15} direction="right" className="w-[45%] flex justify-end pr-3" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-right max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Manavattti<br />Raavu
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">3:30 PM — 8:00 PM</p>
                  </div>
                </RevealBlock>
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">💍</span>
                  </motion.div>
                </div>
                <div className="w-[45%] pl-3" />
              </div>

              {/* Event 2 - RIGHT: Mehfil-e-Mehandi */}
              <div className="relative flex items-center mb-12">
                <div className="w-[45%] pr-3" />
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">🌿</span>
                  </motion.div>
                </div>
                <RevealBlock delay={0.2} direction="left" className="w-[45%] flex justify-start pl-16" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-left max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Mehfil-e<br />Mehandi
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">10:00 AM — 12:00 PM</p>
                  </div>
                </RevealBlock>
              </div>

              {/* Event 3 - LEFT: Bolly Beats & Bling */}
              <div className="relative flex items-center mb-12">
                <RevealBlock delay={0.25} direction="right" className="w-[45%] flex justify-end pr-3" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-right max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Bolly Beats<br />&amp; Bling
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">3:30 PM — 10:00 PM</p>
                  </div>
                </RevealBlock>
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">🎵</span>
                  </motion.div>
                </div>
                <div className="w-[45%] pl-3" />
              </div>
            </div>

            {/* ─── DAY 3: 20th Dec '26 ─── */}
            <RevealBlock delay={0.1} className="text-center my-10" scrollRoot={scrollRootRef}>
              <div className="inline-block bg-white/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-8 py-3 shadow-md">
                <p className="font-serif text-lg text-[#5c4a3d] tracking-wide">
                  20<sup>th</sup> Dec, 2026
                </p>
              </div>
            </RevealBlock>

            <div className="relative">
              {/* Vertical golden timeline line */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
                style={{ background: 'linear-gradient(180deg, #D4AF37 0%, #c9a84c 50%, #D4AF37 100%)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true, root: scrollRootRef }}
              />

              {/* Event 4 - RIGHT: Nikkah */}
              <div className="relative flex items-center mb-12">
                <div className="w-[45%] pr-3" />
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">🕌</span>
                  </motion.div>
                </div>
                <RevealBlock delay={0.15} direction="left" className="w-[45%] flex justify-start pl-16" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-left max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Nikkah
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">4:00 PM</p>
                  </div>
                </RevealBlock>
              </div>

              {/* Event 5 - LEFT: Vibe After Vows */}
              <div className="relative flex items-center mb-12">
                <RevealBlock delay={0.2} direction="right" className="w-[45%] flex justify-end pr-3" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-right max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Vibe After<br />Vows
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">5:30 PM — 11:00 PM</p>
                  </div>
                </RevealBlock>
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">🎉</span>
                  </motion.div>
                </div>
                <div className="w-[45%] pl-3" />
              </div>
            </div>

            {/* ─── DAY 4: 21st Dec '26 ─── */}
            <RevealBlock delay={0.1} className="text-center my-10" scrollRoot={scrollRootRef}>
              <div className="inline-block bg-white/60 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-8 py-3 shadow-md">
                <p className="font-serif text-lg text-[#5c4a3d] tracking-wide">
                  21<sup>st</sup> Dec, 2026
                </p>
              </div>
            </RevealBlock>

            <div className="relative">
              {/* Vertical golden timeline line */}
              <motion.div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
                style={{ background: 'linear-gradient(180deg, #D4AF37 0%, #c9a84c 50%, #D4AF37 100%)' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 2, ease: 'easeOut' }}
                viewport={{ once: true, root: scrollRootRef }}
              />

              {/* Event 6 - RIGHT: Shaadi Saga */}
              <div className="relative flex items-center mb-12">
                <div className="w-[45%] pr-3" />
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">👰</span>
                  </motion.div>
                </div>
                <RevealBlock delay={0.15} direction="left" className="w-[45%] flex justify-start pl-16" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-left max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      Shaadi<br />Saga
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">10:00 AM — 2:00 PM</p>
                  </div>
                </RevealBlock>
              </div>

              {/* Event 7 - LEFT: The Final Fate */}
              <div className="relative flex items-center mb-8">
                <RevealBlock delay={0.2} direction="right" className="w-[45%] flex justify-end pr-3" scrollRoot={scrollRootRef}>
                  <div className="bg-white/75 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl px-4 py-3 shadow-sm text-right max-w-[160px]">
                    <h3 className="font-serif text-sm font-bold text-[#5c4a3d] uppercase tracking-wider leading-tight">
                      The Final<br />Fate
                    </h3>
                    <p className="font-sans text-[10px] text-[#8B7355] mt-1 tracking-wide">4:00 PM</p>
                  </div>
                </RevealBlock>
                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-white border-2 border-[#D4AF37] shadow-lg flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                    viewport={{ once: true, root: scrollRootRef }}
                  >
                    <span className="text-lg">✨</span>
                  </motion.div>
                </div>
                <div className="w-[45%] pl-3" />
              </div>
            </div>

            {/* Bottom decorative end dot */}
            <RevealBlock delay={0.3} className="flex justify-center mt-4" scrollRoot={scrollRootRef}>
              <motion.div
                className="w-5 h-5 rounded-full bg-[#D4AF37] shadow-lg"
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </RevealBlock>
          </div>
        </section>

        {/* ══════════ SECTION 4.5 – INDIVIDUAL FUNCTION CARDS ══════════ */}
        <div ref={functionSectionRef}>
          <FunctionSections scrollRootRef={scrollRootRef} />
        </div>

        {/* ══════════ SECTION 4.75 – DRESS CODE ══════════ */}
        <DressCodeSection scrollRootRef={scrollRootRef} />

        {/* ══════════ SECTION 5 – VENUE DETAILS & MAP ══════════ */}
        <section ref={functionSectionRef} className="relative min-h-[80vh] flex items-center justify-center py-24 px-4 overflow-hidden bg-[#faf9f6]/90">
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent z-0" />

          <div className="relative z-10 w-full max-w-md mx-auto text-center">
            <RevealBlock delay={0} scrollRoot={scrollRootRef}>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="mb-6"
              >
                <FaMapMarkerAlt className="text-[#D4AF37] text-5xl mx-auto drop-shadow-lg" />
              </motion.div>
            </RevealBlock>

            <RevealBlock delay={0.2} scrollRoot={scrollRootRef}>
              <div className="bg-[#faf9f6]/95 backdrop-blur-md border-[2px] border-[#D4AF37]/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Elegant gold corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37]/60 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37]/60 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37]/60 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37]/60 rounded-br-lg pointer-events-none" />

                <h2
                  className="text-[#5c4a3d] mb-1 font-serif text-2xl font-bold tracking-wide"
                >
                  The Wedding Venue
                </h2>
                <p className="font-sans text-[9px] text-[#D4AF37] tracking-[0.25em] uppercase mb-4 font-semibold">
                  Venue Details
                </p>
                <p className="font-sans text-sm text-[#5c4a3d] tracking-wide mb-6">
                  Cherandathur, Kerala
                </p>
                <p className="font-sans text-xs text-[#8B7355]/80 italic leading-relaxed mb-6 px-2">
                  Join us at our beautiful venue as we step into our forever. We look forward to welcoming you to this special celebration.
                </p>

                {/* Google Map Embed */}
                <div className="w-full h-48 sm:h-64 rounded-xl overflow-hidden mb-6 border border-[#D4AF37]/40 shadow-inner">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3909.0209204367866!2d75.6746711750533!3d11.550356888649397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDMzJzAxLjMiTiA3NcKwNDAnMzguMSJF!5e0!3m2!1sen!2sin!4v1790415012745!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                </div>

                <button
                  onClick={() => window.open('https://www.google.com/maps?q=11.550356888649397,75.6746711750533', '_blank')}
                  className="flex items-center gap-2 px-8 py-3 bg-[#D4AF37] hover:bg-[#B8860B] transition-all duration-300 rounded-full font-sans text-xs uppercase tracking-widest text-[#1a1209] font-bold mx-auto shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FaLocationArrow />
                  Get Directions
                </button>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ══════════ SECTION 5 – THANK YOU, BLESSINGS & ARABIC DU'A ══════════ */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-24 px-4 overflow-hidden bg-[#1a1209]">
          {/* Background using cartoon couple illustration */}
          <motion.div
            className="absolute inset-0 z-0 opacity-25"
            style={{
              backgroundImage: 'url("nn")',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            viewport={{ once: true }}
          />

          {/* Floating hearts (seamless, no blank gaps) */}
          {[...Array(8)].map((_, i) => {
            const dur = 12 + (i * 2.5);
            const xStart = (i * 12.5) % 100;
            return (
              <motion.div
                key={i}
                className="absolute text-[#D4AF37]/40 z-10 pointer-events-none"
                initial={{ y: '100vh', x: `${xStart}vw`, scale: 0.5 + (i % 3) * 0.25 }}
                animate={{ y: '-10vh', x: `${(xStart + 10) % 100}vw` }}
                transition={{ duration: dur, repeat: Infinity, repeatDelay: 0, ease: 'linear', delay: (i / 8) * dur * 0.5 }}
              >
                <FaHeart size={18} />
              </motion.div>
            );
          })}

          <div className="relative z-20 w-full max-w-lg mx-auto text-center">
            <RevealBlock delay={0}>
              <div className="bg-black/35 backdrop-blur-md border border-[#D4AF37]/25 rounded-3xl p-8 sm:p-10 shadow-2xl">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                  viewport={{ once: true }}
                >
                  <h2
                    className="mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(2.2rem, 8vw, 3.5rem)',
                      background: 'linear-gradient(to right, #D4AF37, #F1E5AC)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Thank You
                  </h2>

                  {/* Arabic Marriage Blessing */}
                  <div className="my-6 px-4">
                    <p className="text-[#D4AF37] text-xl sm:text-2xl font-serif mb-2 leading-loose drop-shadow-md">
                      بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
                    </p>
                    <p className="text-gray-300 font-sans italic text-[11px] tracking-wide leading-relaxed">
                      "May Allah bless you both, shower His blessings upon you, and join you together in goodness."
                    </p>
                  </div>

                  <div className="w-14 h-px bg-[#D4AF37]/50 mx-auto mb-6" />

                  <p className="font-sans text-sm text-white/75 leading-relaxed mb-6">
                    We can't wait to celebrate the beginning of our new life with you. Your presence and prayers will make our day truly special.
                  </p>

                  <div className="w-10 h-px bg-[#D4AF37]/35 mx-auto mb-6" />

                  <p
                    className="text-white"
                    style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem' }}
                  >
                    Hiba &amp; Mubashir
                  </p>

                  <p className="font-sans text-[10px] tracking-widest uppercase text-[#D4AF37]/70 mt-2">
                    20 December 2026
                  </p>
                </motion.div>
              </div>
            </RevealBlock>

            {/* Restart button */}
            <RevealBlock delay={0.6} className="mt-10">
              <button
                onClick={onRestart}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#D4AF37]/60 text-white/70 hover:text-[#D4AF37] font-sans text-[10px] tracking-[0.3em] uppercase rounded-full backdrop-blur-sm transition-all duration-400"
              >
                ↩ View Again
              </button>
            </RevealBlock>
          </div>
        </section>

        {/* ══════════ SECTION 6 (LAST) – VENUE, NOTES & MAP ══════════ */}


      </div>{/* end scroll container */}
    </motion.div>
  );
}