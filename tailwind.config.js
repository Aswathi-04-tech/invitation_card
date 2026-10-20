// src/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#F8E8E8",
        lightGold: "#D4AF37",
      },
      fontFamily: {
        greatVibes: ["'Great Vibes'", "cursive"],
        cormorant: ["'Cormorant Garamond'", "serif"],
        playfair: ["'Playfair Display'", "serif"]
      },
      boxShadow: {
        "wax": "0 8px 15px rgba(0,0,0,0.15), inset 0 0 8px rgba(255,255,255,0.3)"
      },
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
          "100%": { transform: "translateY(0px)" }
        },
        dust: {
          "0%": { opacity: 0.2, transform: "translateY(0) scale(0.4)" },
          "100%": { opacity: 0, transform: "translateY(200px) scale(1)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        dust: "dust 6s linear infinite"
      },
      perspective: {
        "1000": "1000px"
      },
      transformStyle: {
        "preserve-3d": "preserve-3d"
      }
    }
  },
  plugins: []
};
