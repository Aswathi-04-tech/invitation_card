import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaxSeal from "../WaxSeal";
import InvitationCard from "./InvitationCard";

// Envelope animation variants
const flapVariants = {
  closed: { rotateX: 0 },
  open: { rotateX: -120, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function EnvelopeIntro() {
  // step 0: show wax seal
  // step 1: envelope flap opening
  // step 2: show invitation card
  const [showCurtains, setShowCurtains] = useState(false);

  // When user taps the wax seal, open flap then reveal curtains
  const handleSealClick = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    // After flap animation (≈800ms), show curtains
    setTimeout(() => {
      setShowCurtains(true);
      // After curtains slide (≈1s), move to next scene
      setTimeout(() => onNext(), 1000);
    }, 800);
  };

  return (
    <div className="envelope-intro flex items-center justify-center">
      <AnimatePresence>
        {/* Wax seal – visible only at step 0 */}
        {step === 0 && (
          <motion.div
            key="seal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
          >
            <WaxSeal onOpen={handleSealClick} />
          </motion.div>
        )}

        {/* Envelope with opening flap – visible at step 1 */}
        {step === 1 && (
          <motion.div
            key="envelope"
            className="envelope-container relative w-80 h-56 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Envelope body */}
            <div className="absolute inset-0 bg-white" />
            {/* Flap */}
            <motion.div
              className="envelope-flap absolute inset-x-0 top-0 h-1/2 bg-white"
              variants={flapVariants}
              initial="closed"
              animate="open"
            />
          </motion.div>
        )}

        {/* Invitation card – visible at step 2 */}
        {step === 2 && (
          <motion.div
            key="card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <InvitationCard opened={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
