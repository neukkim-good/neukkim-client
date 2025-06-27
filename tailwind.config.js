// tailwind.config.js

import("tailwindcss").Config;
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        sway: "sway 2.5s ease-in-out infinite",
        "fade-in-up": "fadeInUp 1s ease-out",
        "fade-in-up-delay": "fadeInUp 1s ease-out 0.5s both",
        "text-shimmer": "textShimmer 3s ease-out infinite",
        typing: "typing 2s steps(22, end), blink-caret 0.75s step-end infinite",
        "spin-slow": "spin 4s linear infinite",
        progress: "progress 2s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s infinite ease-out",
        "fly-1": "flyAround1 linear infinite",
        "fly-2": "flyAround2 linear infinite",
        "fly-3": "flyAround3 ease-in-out infinite",
        "fly-4": "flyAround4 ease-in infinite",
      },
      keyframes: {
        wiggle: {
          "from, to": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "from, to": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sway: {
          "from, to": { transform: "rotate(10deg)" },
          "50%": { transform: "rotate(0deg)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        textShimmer: {
          from: { "background-position": "200% center" },
          to: { "background-position": "-200% center" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { "border-color": "transparent" },
          "50%": { "border-color": "#f97316" },
        },
        progress: {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        pulseGlow: {
          "from, to": {
            transform: "scale(1)",
            "box-shadow": "0 0 0 0 rgba(0, 255, 0, 0.7)",
          },
          "50%": {
            transform: "scale(1.05)",
            "box-shadow": "0 0 40px 20px rgba(0, 255, 0, 0)",
          },
        },
        flyAround1: {
          from: { transform: "translate(0, 10vh) rotate(0deg)", opacity: "1" },
          to: {
            transform: "translate(40vw, -110vh) rotate(360deg)",
            opacity: "0",
          },
        },
        flyAround2: {
          from: { transform: "translate(0, 10vh) rotate(0deg)", opacity: "1" },
          to: {
            transform: "translate(-50vw, -110vh) rotate(-360deg)",
            opacity: "0",
          },
        },
        flyAround3: {
          from: { transform: "translate(0, 10vh) rotate(0deg)", opacity: "1" },
          "50%": {
            transform: "translate(20vw, -60vh) rotate(180deg)",
            opacity: "0.8",
          },
          to: {
            transform: "translate(-30vw, -110vh) rotate(360deg)",
            opacity: "0",
          },
        },
        flyAround4: {
          from: { transform: "translate(0, 10vh) rotate(0deg)", opacity: "1" },
          "33%": {
            transform: "translate(-10vw, -40vh) rotate(120deg)",
            opacity: "1",
          },
          "66%": {
            transform: "translate(10vw, -80vh) rotate(240deg)",
            opacity: "0.5",
          },
          to: {
            transform: "translate(0vw, -110vh) rotate(360deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "animate-fly-1",
    "animate-fly-2",
    "animate-fly-3",
    "animate-fly-4",
    "animate-float",
    "animate-wiggle",
    "animate-progress",
    "animate-text-shimmer",
    "animate-fade-in-up",
    "animate-typing",
    "animate-pulse-glow",
    "flyAround1",
    "flyAround2",
    "flyAround3",
    "flyAround4",
  ],
};
