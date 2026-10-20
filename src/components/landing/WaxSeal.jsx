import React from "react";
import { motion } from "framer-motion";
const sealImg = "https://via.placeholder.com/128?text=Seal"; // placeholder image // placeholder image path

const WaxSeal = ({ onOpen }) => {
  const handleClick = () => {
    // Simple scale & rotate animation before invoking onOpen
    onOpen();
  };

  return (
    <motion.div
      className="z-10 cursor-pointer"
      onClick={handleClick}
      initial={{ scale: 0.8, rotate: 0, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      whileTap={{ scale: 1.05, rotate: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={sealImg} alt="Wax Seal" className="w-32 h-32" />
    </motion.div>
  );
};

export default WaxSeal;
