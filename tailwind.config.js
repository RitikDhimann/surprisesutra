module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: "#F7A8C4",    // soft Instagram pink
          blue: "#515BD4",    // Instagram blue-purple
          green: "#86EFAC",
          purple: "#C77DFF",  // warm Instagram purple tint
          yellow: "#FEDA77",  // Instagram golden yellow
          orange: "#F58529",  // Instagram warm orange
        },
        brand: {
          primary: "#c73020",   // New Brand Red
          secondary: "#fdd825", // New Brand Yellow
          accent: "#fdd825",    // Vibrant Yellow Accent
          brown: "#3D1A47",     // deep plum for contrast
          pink: "#fff1f2",      // ultra-light red tint for backgrounds
        }
      },
      fontFamily: {
        brand: ["'Playfair Display'", "serif"],
        playful: ["'Playfair Display'", "serif"],
        heading: ["'Playfair Display'", "serif"],
        libre: ["'Playfair Display'", "serif"],
        sans: ["'Playfair Display'", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pop': 'pop 0.3s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
