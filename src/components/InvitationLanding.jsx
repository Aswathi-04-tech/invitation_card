import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import WaxSeal from "./WaxSeal";
import InvitationCard from "./landing/InvitationCard";
import DustParticles from "./landing/DustParticles";

// Background and element variants
const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const sealVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
  tap: { scale: 1.05, rotate: 10, transition: { type: "spring", stiffness: 300 } },
};

const cardFloat = {
  hidden: { y: 0 },
  float: { y: [-2, 2, -2], transition: { repeat: Infinity, duration: 6 } },
};

export default function InvitationLanding() {
  const controls = useAnimation();

  // Start background fade‑in on mount
  useEffect(() => {
    controls.start("visible");
  }, []);

  const [opened, setOpened] = React.useState(false);

  const handleSealOpen = () => {
    setOpened(true);
  };

  return (
    <motion.div
      className="relative flex items-center justify-center w-screen h-screen bg-blush overflow-hidden"
      variants={backgroundVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Dust particles */}
      <DustParticles />

      {/* Wax seal – appears after background */}
      <motion.div variants={sealVariants} initial="hidden" animate={controls} whileTap="tap">
        <WaxSeal onOpen={handleSealOpen} />
      </motion.div>

      {/* Invitation card – floats and appears when seal opened */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={cardFloat}
        initial="hidden"
        animate={opened ? "float" : "hidden"}
      >
        <InvitationCard opened={opened} />
      </motion.div>
    </motion.div>
  );
}
