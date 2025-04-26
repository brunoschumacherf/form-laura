import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',   // Azul
        gold: '#facc15',      // Dourado
      },
    },
  },
  plugins: [],
}

export default config
