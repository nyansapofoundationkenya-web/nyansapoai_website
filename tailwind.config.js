/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        hero: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url('/hero.png')",
      },
     colors: {
  accent2: "#5aa2ce",
  navy: {
    DEFAULT: "#142848",
    900: "#0b1627",
    800: "#142848",
    700: "#1e3c6b",
  },
  yellow: {
    DEFAULT: "#f7cc1c",
    400: "#f7cc1c",
    500: "#e5bc19",
  },
  lightblue: {
    DEFAULT: "#5aa2ce",
    50: "#f0f7fb",
    100: "#e1eff7",
  },
  border: "hsl(var(--border) / <alpha-value>)",
  input: "hsl(var(--input) / <alpha-value>)",
  ring: "hsl(var(--ring) / <alpha-value>)",
  background: "hsl(var(--background) / <alpha-value>)",
  foreground: "hsl(var(--foreground) / <alpha-value>)",
  primary: {
    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
    foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
  },
  secondary: {
    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
  },
  destructive: {
    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
  },
  muted: {
    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
    foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
  },
  accent: {
    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
    foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
  },
  popover: {
    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
    foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
  },
  card: {
    DEFAULT: "hsl(var(--card) / <alpha-value>)",
    foreground: "hsl(var(--card-foreground) / <alpha-value>)",
  },
},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
}
