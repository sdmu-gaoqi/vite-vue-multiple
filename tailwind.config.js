/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#6102fd',
        fontPrimary: '#6a6d82'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.table-btn': {
          marginRight: '10px',
          display: 'block',
          userSelect: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#6102fd',
          cursor: 'pointer',
          '&:hover': {
            opacity: '0.6'
          }
        },
        '.table-btn-danger': {
          marginRight: '16px',
          display: 'block',
          color: 'red',
          userSelect: 'none',
          fontWeight: 'bold',
          fontSize: '12px',
          cursor: 'pointer',
          '&:hover': {
            color: 'red',
            opacity: '0.6'
          }
        },
        '.last': {
          marginRight: 0,
          paddingRight: 0
        },
        '.ell': {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          wordBreak: 'keep-all'
        },
        '.wh-100': {
          width: '100%',
          height: '100%',
          minWidth: '100vw',
          minHeight: '100vh'
        }
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ]
}
