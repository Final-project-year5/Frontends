/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      boxShadow: {
        'green': '0 4px 6px -1px rgba(16, 185, 129, 0.5), 0 2px 4px -1px rgba(16, 185, 129, 0.5)',
        'red': '0 4px 6px -1px rgba(239, 68, 68, 0.5), 0 2px 4px -1px rgba(239, 68, 68, 0.5)',
        'blue': '0 4px 6px -1px rgba(59, 130, 246, 0.5), 0 2px 4px -1px rgba(59, 130, 246, 0.5)',
        'purple': '0 4px 6px -1px rgba(139, 92, 246, 0.5), 0 2px 4px -1px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}

