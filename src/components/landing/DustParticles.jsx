import React from "react";
import { motion } from "framer-motion";

// Simple dust particle animation using a small number of circles
const particles = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  // random start positions
  x: Math.random() * 100,
  delay: Math.random() * 2,
}));

export default function DustParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-white opacity-30 rounded-full"
          initial={{ opacity: 0, y: -10, x: `${p.x}%` }}
          animate={{ opacity: 0.2, y: 120, x: `${p.x}%` }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
