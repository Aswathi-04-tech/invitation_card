import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Scene2_Envelope({ onNext }) {
  const containerRef = useRef(null);
  const ribbonRef = useRef(null);
  const leftFlapRef = useRef(null);
  const rightFlapRef = useRef(null);
  const cardRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Create a GSAP timeline for the envelope opening sequence
    const tl = gsap.timeline({
      onComplete: () => {
        // Wait a brief moment after revealing the card, then transition to Scene 3
        setTimeout(onNext, 500);
      }
    });

    // 1. Initial pause
    tl.to({}, { duration: 0.5 });

    // 2. Ribbon dissolves
    tl.to(ribbonRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.8,
      ease: "power2.inOut"
    });

    // 3. Flaps open like double doors
    tl.to(leftFlapRef.current, {
      rotateY: -140,
      duration: 1.2,
      ease: "power3.inOut"
    }, "-=0.2");

    tl.to(rightFlapRef.current, {
      rotateY: 140,
      duration: 1.2,
      ease: "power3.inOut"
    }, "<");

    // 4. Background slightly blurs/darkens
    tl.to(bgRef.current, {
      backgroundColor: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(5px)",
      duration: 1
    }, "<");

    // 5. Card slides out slightly and scales up
    tl.to(cardRef.current, {
      scale: 1.1,
      y: -20,
      duration: 1,
      ease: "back.out(1.2)"
    }, "-=0.5");

    return () => tl.kill();
  }, [onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-champagne perspective-1000"
      ref={containerRef}
    >
      {/* Background overlay that will blur */}
      <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Envelope Container */}
      <div className="relative w-[90%] max-w-[400px] h-[550px] flex items-center justify-center z-10 transform-style-3d">
        
        {/* The Card Inside */}
        <div 
          ref={cardRef}
          className="absolute inset-0 bg-white shadow-2xl rounded-sm flex flex-col items-center justify-center border-4 border-double border-[#D4AF37]/30 p-8"
        >
          <div className="text-center">
            <h2 className="font-sans tracking-widest text-gold text-xs uppercase mb-4">You are invited</h2>
            <h1 className="font-serif text-3xl text-dark">Hiba & Mubashir</h1>
          </div>
        </div>

        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#f5e6d3] rounded-sm shadow-inner pointer-events-none" />

        {/* Left Flap */}
        <div 
          ref={leftFlapRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-[#fdfbf7] origin-left border-r border-black/5 shadow-[5px_0_15px_rgba(0,0,0,0.1)] rounded-l-sm"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
        </div>

        {/* Right Flap */}
        <div 
          ref={rightFlapRef}
          className="absolute inset-y-0 right-0 w-1/2 bg-[#fdfbf7] origin-right border-l border-black/5 shadow-[-5px_0_15px_rgba(0,0,0,0.1)] rounded-r-sm"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5" />
        </div>

        {/* Ribbon and Ribbon Seal */}
        <div 
          ref={ribbonRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        >
          {/* Horizontal Ribbon */}
          <div className="absolute w-full h-8 bg-[#8b0000] shadow-md opacity-90" />
          {/* Vertical Ribbon */}
          <div className="absolute h-full w-8 bg-[#8b0000] shadow-md opacity-90" />
          
          {/* The Wax Seal Residue / Center */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#b22222] to-[#5c0000] shadow-xl flex items-center justify-center wax-seal border-2 border-white/20">
             <span className="font-serif text-3xl text-[#ffe4e1] font-bold z-10 drop-shadow-md">
                H&M
              </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
