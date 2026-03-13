import type { Config } from 'tailwindcss'

export default {
  content: [],
  theme: {
    extend: {
      colors: {
        navy: '#0B1E2D',
        cyan: '#00E5FF',
        orange: '#FF7A18',
        steel: '#5A6B7A',
        rust: '#B7410E',
        offwhite: '#E8F0F5',
        dark: '#0A0F14',
        darkcard: '#111A23',
        muted: '#8A9BAA',
      },
      fontFamily: {
        heading: ['"JetBrains Mono"', 'monospace'],
        body: ['Inter', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '768px',
        grid: '1200px',
      },
    },
  },
} satisfies Config
