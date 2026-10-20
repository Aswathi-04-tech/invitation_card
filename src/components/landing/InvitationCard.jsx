import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Variants for the card opening animation
const cardVariants = {
  closed: {
    rotateY: 0,
    opacity: 1,
  },
  open: {
    rotateY: -180,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
      duration: 2.5,
    },
  },
};

// Text fade‑up sequence after the card opens
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.4, duration: 0.8 },
  }),
};

export default function InvitationCard({ opened }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Card container */}
      <motion.div
        className="relative w-80 h-[480px] bg-white rounded-xl shadow-xl overflow-hidden"
        variants={cardVariants}
        initial="closed"
        animate={opened ? "open" : "closed"}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side (visible before opening) */}
        <div className="absolute inset-0 bg-white" />
        {/* Inside content – revealed after opening */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center p-4 space-y-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.h1
                className="font-greatVibes text-5xl text-gold"
                custom={1}
                variants={textVariants}
              >
                Priyanka &amp; Akash
              </motion.h1>
              <motion.p
                className="font-cormorant text-lg text-gold text-center"
                custom={2}
                variants={textVariants}
              >
                Together with their families request the pleasure of your company
                to celebrate their wedding
              </motion.p>
              <motion.h2
                className="font-playfair text-3xl text-gold"
                custom={3}
                variants={textVariants}
              >
                Save the Date
              </motion.h2>
              <motion.p
                className="font-cormorant text-xl text-gold"
                custom={4}
                variants={textVariants}
              >
                December 12, 2026
              </motion.p>
              <motion.button
                className="mt-4 px-4 py-2 bg-gold text-white rounded-full font-cormorant"
                custom={5}
                variants={textVariants}
                whileHover={{ scale: 1.05 }}
              >
                Tap to Continue
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
