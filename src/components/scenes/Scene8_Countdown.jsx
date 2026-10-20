import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Scene8_Countdown({ onNext }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to a fixed date in the future for demo purposes
    const targetDate = new Date("2026-12-20T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
      onClick={onNext}
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-champagne overflow-hidden"
    >
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="font-serif text-4xl text-dark mb-12"
      >
        The Countdown Begins
      </motion.h1>

      <div className="flex gap-4 md:gap-8 z-10 px-4">
        {timeUnits.map((unit, idx) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + idx * 0.2, type: "spring" }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white/50 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center border border-white mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />
              <span className="font-serif text-3xl md:text-5xl text-gold drop-shadow-sm z-10">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="font-sans text-xs tracking-widest uppercase text-dark/70">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 text-[10px] font-sans tracking-widest text-dark/40 uppercase"
      >
        Tap to continue
      </motion.p>
    </motion.div>
  );
}
