/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#070A14',
          subtle: '#0C1020',
          elevated: '#11172D',
        },
        surface: {
          DEFAULT: '#131B33',
          hover: '#192444',
          glass: 'rgba(15, 22, 43, 0.82)',
          border: 'rgba(147, 197, 253, 0.15)',
          'border-active': 'rgba(167, 139, 250, 0.4)',
        },
        fantasy: {
          aqua: '#38BDF8',
          cyan: '#22D3EE',
          ice: '#BAE6FD',
          lavender: '#C4B5FD',
          violet: '#A78BFA',
          purple: '#8B5CF6',
          indigo: '#6366F1',
          navy: '#0B0F20',
          deep: '#060810',
          gold: '#E5C07B',
          'gold-glow': '#FDE047',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        editorial: ['Cormorant Garamond', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'dreamy-gradient': 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(11, 15, 32, 0.95) 100%)',
        'ethereal-glow': 'radial-gradient(circle at 50% 20%, rgba(167, 139, 250, 0.18) 0%, rgba(56, 189, 248, 0.08) 35%, transparent 70%)',
        'gold-shimmer': 'linear-gradient(90deg, #FDE68A 0%, #D4AF37 50%, #F59E0B 100%)',
      },
      boxShadow: {
        'glow-aqua': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-violet': '0 0 30px -5px rgba(167, 139, 250, 0.35)',
        'glow-gold': '0 0 20px -3px rgba(229, 192, 123, 0.3)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
