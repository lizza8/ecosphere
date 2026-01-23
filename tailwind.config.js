module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240, 8%, 25%)",
        input: "hsl(240, 8%, 25%)",
        ring: "hsl(185, 100%, 65%)",
        background: "hsl(265, 70%, 15%)",
        foreground: "hsl(185, 100%, 68%)",
        primary: {
          DEFAULT: "hsl(185, 100%, 55%)",
          foreground: "hsl(240, 9%, 8%)",
        },
        secondary: {
          DEFAULT: "hsl(265, 70%, 25%)",
          foreground: "hsl(315, 100%, 70%)",
        },
        tertiary: {
          DEFAULT: "hsl(215, 100%, 18%)",
          foreground: "hsl(215, 100%, 60%)",
        },
        neutral: {
          DEFAULT: "hsl(240, 9%, 6%)",
          foreground: "hsl(0, 0%, 95%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(240, 8%, 18%)",
          foreground: "hsl(240, 8%, 75%)",
        },
        accent: {
          DEFAULT: "hsl(315, 100%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        popover: {
          DEFAULT: "hsl(240, 9%, 12%)",
          foreground: "hsl(0, 0%, 95%)",
        },
        card: {
          DEFAULT: "hsl(240, 9%, 12%)",
          foreground: "hsl(0, 0%, 95%)",
        },
        success: "hsl(140, 100%, 45%)",
        warning: "hsl(25, 100%, 55%)",
        cyan: "hsl(185, 100%, 55%)",
        magenta: "hsl(315, 100%, 60%)",
        violet: "hsl(265, 70%, 20%)",
        blue: "hsl(215, 100%, 60%)",
        lime: "hsl(90, 100%, 65%)",
        hero: "hsl(185, 100%, 90%)",
        navbar: "hsl(315, 100%, 80%)",
        gray: {
          50: "hsl(240, 8%, 98%)",
          100: "hsl(240, 8%, 90%)",
          200: "hsl(240, 8%, 75%)",
          300: "hsl(240, 8%, 60%)",
          400: "hsl(240, 8%, 45%)",
          500: "hsl(240, 8%, 35%)",
          600: "hsl(240, 8%, 25%)",
          700: "hsl(240, 8%, 18%)",
          800: "hsl(240, 9%, 12%)",
          900: "hsl(240, 10%, 6%)",
        },
      },
      backgroundImage: {
        "gradient-1": "linear-gradient(135deg, hsl(315, 100%, 60%) 0%, hsl(185, 100%, 55%) 100%)",
        "gradient-2": "linear-gradient(135deg, hsl(215, 100%, 60%) 0%, hsl(90, 100%, 65%) 100%)",
        "button-border-gradient": "linear-gradient(120deg, hsl(185, 100%, 65%) 0%, hsl(315, 100%, 65%) 100%)",
      },
      fontFamily: {
        sans: ["Geist", ['"DM Sans"'], "sans-serif"],
        serif: [['"Source Serif Pro"'], "serif"],
        mono: [['"Fira Code"'], "monospace"],
      },
      fontSize: {
        h1: ["3.998rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "500" }],
        h2: ["2.827rem", { lineHeight: "1.2", letterSpacing: "-0.025em", fontWeight: "500" }],
        h3: ["1.999rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "400" }],
        body: ["1rem", { lineHeight: "1.5", fontWeight: "300" }],
        small: ["0.875rem", { fontWeight: "300" }],
        label: ["0.875rem", { letterSpacing: "0.05em", fontWeight: "400" }],
      },
      borderRadius: {
        lg: "12px",
        md: "10px",
        sm: "8px",
      },
      spacing: {
        '4': '1rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
        '24': '6rem',
        '32': '8rem',
        '48': '12rem',
        '64': '16rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.3s ease-out",
      },
    },
  },
  plugins: [],
}
