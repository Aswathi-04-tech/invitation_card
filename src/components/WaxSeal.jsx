import React from "react";
import { motion } from "framer-motion";

// Simple wax seal component. When clicked, triggers onOpen callback.
// Uses framer-motion for a subtle pop animation.

const sealVariants = {
  idle: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: { type: "spring", stiffness: 300 },
  },
  tap: {
    scale: 0.9,
    rotate: -5,
    transition: { type: "spring", stiffness: 400 },
  },
};

export default function WaxSeal({ onOpen }) {
  return (
    <motion.button
      className="wax-seal"
      variants={sealVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onClick={onOpen}
      aria-label="Open invitation"
    >
      {/* Placeholder seal – a gold circle */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="55" fill="#D4AF37" />
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fontFamily="'Playfair Display', serif"
          fontSize="24"
          fill="white"
        >
          ✉️
        </text>
      </svg>
    </motion.button>
  );
}
