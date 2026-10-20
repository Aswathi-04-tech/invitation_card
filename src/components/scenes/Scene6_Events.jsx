import { motion } from 'framer-motion';

const events = [
  { name: "Haldi", date: "Dec 18", time: "10:00 AM" },
  { name: "Mehendi", date: "Dec 19", time: "4:00 PM" },
  { name: "Wedding", date: "Dec 20", time: "11:00 AM" },
  { name: "Reception", date: "Dec 20", time: "7:00 PM" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
};

export default function Scene6_Events({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: "-100vw" }}
      transition={{ duration: 0.8 }}
      onClick={onNext}
      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-ivory text-dark"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-10 text-center"
      >
        <h2 className="font-sans text-xs tracking-[0.3em] uppercase text-gold-gradient mb-2">The Celebration</h2>
        <h1 className="font-serif text-4xl">Wedding Events</h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-4 w-full max-w-md px-6"
      >
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            className="bg-white p-6 rounded-xl shadow-lg border border-champagne/40 flex flex-col items-center text-center transform transition-transform hover:scale-105"
          >
            <h3 className="font-serif text-2xl text-dark mb-2">{event.name}</h3>
            <div className="w-8 h-px bg-gold mb-2" />
            <p className="font-sans text-sm font-medium">{event.date}</p>
            <p className="font-sans text-xs text-dark/60 mt-1">{event.time}</p>
          </motion.div>
        ))}
      </motion.div>
      
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
