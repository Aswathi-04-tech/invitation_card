import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-10 text-center relative z-10">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Heart className="w-6 h-6 text-accent/50 fill-accent/20" />
        <p className="font-serif text-lg text-text-light/80">
          Hiba & Mubashir
        </p>
        <p className="font-sans text-xs tracking-[0.2em] text-text-light/50 uppercase">
          Thank you for celebrating with us
        </p>
      </div>
    </footer>
  );
};

export default Footer;
