import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ─── Rose SVG ─── */
const Rose = ({ size = 48 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
    {/* Petals */}
    {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
      <ellipse
        key={i}
        cx="32" cy="21"
        rx="5" ry="11"
        fill="#D4AF37"
        opacity={0.55 - i * 0.02}
        transform={`rotate(${deg} 32 32)`}
      />
    ))}
    <circle cx="32" cy="32" r="9" fill="#D4AF37" />
    <circle cx="32" cy="32" r="5" fill="#F3E5AB" />
    {/* Leaves */}
    <ellipse cx="17" cy="52" rx="6" ry="11" fill="#065F46" opacity="0.8" transform="rotate(-35 17 52)" />
    <ellipse cx="47" cy="52" rx="6" ry="11" fill="#065F46" opacity="0.8" transform="rotate(35 47 52)" />
  </svg>
);

/* ─── A single floating rose that drifts with scroll ─── */
const FloatingRose = ({ startX, startY, scrollRange, outputY, size, rotate, delay }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, scrollRange, outputY);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 0.7, 0.7, 0]);

  return (
    <motion.div
      className="fixed pointer-events-none z-20"
      style={{ left: startX, top: startY, y, opacity }}
      animate={{
        rotate: rotate ? [0, rotate, 0] : [0, -10, 10, 0],
        x: [0, 12, -12, 0],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      <Rose size={size} />
    </motion.div>
  );
};

/* ─── Falling rose petals (lightweight SVG circles) ─── */
const FallingPetal = ({ left, delay, duration }) => (
  <motion.div
    className="fixed pointer-events-none z-20"
    style={{ left }}
    initial={{ top: '-5vh', opacity: 0, rotate: 0 }}
    animate={{
      top: '105vh',
      opacity: [0, 0.6, 0.6, 0],
      rotate: 360,
      x: [0, 30, -30, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    <svg viewBox="0 0 20 20" width="14" height="14">
      <ellipse cx="10" cy="10" rx="5" ry="8" fill="#D4AF37" opacity="0.8" transform="rotate(20 10 10)" />
    </svg>
  </motion.div>
);

const FloatingElements = () => {
  const roses = [
    { startX: '3%',  startY: '15%', scrollRange: [0, 1], outputY: ['0vh', '60vh'],  size: 38, rotate: 15,  delay: 0 },
    { startX: '88%', startY: '10%', scrollRange: [0, 1], outputY: ['0vh', '80vh'],  size: 30, rotate: -20, delay: 1 },
    { startX: '5%',  startY: '45%', scrollRange: [0, 1], outputY: ['-5vh', '50vh'], size: 44, rotate: 10,  delay: 2 },
    { startX: '84%', startY: '40%', scrollRange: [0, 1], outputY: ['0vh', '55vh'],  size: 36, rotate: -12, delay: 0.5 },
    { startX: '48%', startY: '5%',  scrollRange: [0, 1], outputY: ['0vh', '70vh'],  size: 28, rotate: 25,  delay: 1.5 },
    { startX: '20%', startY: '70%', scrollRange: [0, 1], outputY: ['-10vh', '30vh'],size: 32, rotate: -8,  delay: 3 },
    { startX: '70%', startY: '65%', scrollRange: [0, 1], outputY: ['-5vh', '35vh'], size: 34, rotate: 18,  delay: 2.5 },
  ];

  const petals = Array.from({ length: 12 }).map((_, i) => ({
    left: `${(i * 8.5) % 95}%`,
    delay: i * 2.5,
    duration: 12 + i * 1.2,
  }));

  return (
    <>
      {roses.map((r, i) => <FloatingRose key={i} {...r} />)}
      {petals.map((p, i) => <FallingPetal key={`p-${i}`} {...p} />)}
    </>
  );
};

export default FloatingElements;
