import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Details = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden bg-background">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-800/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[40vh] sm:h-[55vh] lg:h-[80vh] rounded-3xl overflow-hidden shadow-2xl border border-accent/20 group"
        >
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop')" }}>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-tra
          nsparent to-transparent"></div>
        </motion.div>

        {/* Text Details Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}

          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-accent mb-4 leading-tight">
              Join Us to Celebrate
            </h2>
            <p className="text-lg md:text-xl text-text-light/80 font-sans font-light leading-relaxed max-w-lg">
              We joyfully request the pleasure of your company as we celebrate our love and commitment. It will be a day filled with joy, laughter, and unforgettable memories.
            </p>
          </div>

          <div className="bg-primary-900/30 border border-accent/20 rounded-2xl p-8 md:p-10 backdrop-blur-md w-full relative overflow-hidden shadow-xl mt-8">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-accent/40 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-accent/40 rounded-br-2xl"></div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <Calendar className="w-10 h-10 text-accent mb-2" strokeWidth={1} />
              <h3 className="text-xl md:text-2xl font-serif text-text-light uppercase tracking-[0.3em]">
                Save The Date
              </h3>
              <div className="w-16 h-px bg-accent/50 my-2"></div>
              <p className="text-4xl md:text-6xl font-serif text-accent-light drop-shadow-md py-2">
                21 Dec 2026
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Details;
