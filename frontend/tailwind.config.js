module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#100e1a',
        surface: '#151327',
        brand: {
          50: '#eef1f7',
          100: '#dfbcc1',
          200: '#c3a0b2',
          400: '#a187a5',
          500: '#787298',
          600: '#465f88',
          700: '#384c6e',
          900: '#2a2438',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(42,36,56,0.06), 0 10px 30px rgba(42,36,56,0.08)',
      },
      keyframes: {
        shrinkWidth: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        barPulse: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
      animation: {
        'toast-bar': 'shrinkWidth linear forwards',
        'eq-bar': 'barPulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
