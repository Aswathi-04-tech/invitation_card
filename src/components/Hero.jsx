import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/picturemrgpic/pic1.png')" }}
      ></div>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-black/50 bg-gradient-to-t from-background via-black/40 to-black/60 pointer-events-none"></div>

      <div className="z-10 text-center px-4 w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-8"
        >
          <h2 className="text-accent-light font-serif text-2xl sm:text-3xl md:text-5xl mb-4 drop-shadow-lg font-bold">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </h2>
          <p className="text-gray-300 font-sans tracking-[0.2em] text-xs md:text-sm uppercase drop-shadow-md">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="flex flex-row items-center justify-center gap-2 sm:gap-6 md:gap-8 mt-8 flex-wrap"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-text-light drop-shadow-2xl leading-tight">
            Hiba
          </h1>
          <span className="font-serif text-4xl sm:text-5xl md:text-7xl text-accent italic drop-shadow-lg">
            &
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-text-light drop-shadow-2xl leading-tight">
            Mubashir
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-24 flex flex-col items-center"
        >
           <p className="text-gray-200 font-sans font-light tracking-widest text-xs md:text-sm drop-shadow-md">
             SCROLL TO DISCOVER
           </p>
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
             className="w-px h-20 bg-gradient-to-b from-accent to-transparent mx-auto mt-6"
           />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
