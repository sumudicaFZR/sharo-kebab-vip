import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: "#0b0908",
        charcoal: "#171312",
        ember: "#ff7a1a",
        chili: "#e12d21",
        cream: "#f7e4bc",
        smoke: "#a9a29a"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(255, 122, 26, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
