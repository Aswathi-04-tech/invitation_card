import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const Location = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544598006-2586720e3a50?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-accent mb-12 drop-shadow-md">
            The Venue
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative bg-black/40 border border-accent/20 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden backdrop-blur-md"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-800/20 to-transparent"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-primary-800/80 flex items-center justify-center mb-8 border border-accent/40 shadow-lg">
              <MapPin className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>

            <h3 className="text-2xl md:text-4xl font-serif text-text-light mb-4 drop-shadow-sm">
              Ceremony & Reception
            </h3>
            
            <p className="text-lg text-text-light/90 font-sans font-light mb-10 max-w-lg mx-auto drop-shadow-sm">
              We look forward to celebrating with you. Please click the button below for the exact location and directions.
            </p>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.app.goo.gl/rXEQXB5VKkk3XN5o7?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-sans tracking-widest text-sm text-text-light uppercase bg-accent/20 border border-accent rounded-full overflow-hidden transition-all duration-300 hover:bg-accent hover:text-background shadow-lg"
            >
              <span className="flex items-center gap-2 font-medium">
                Open in Google Maps
                <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;
