/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#050510',
        'bg-secondary': '#0b0f19',
        'bg-tertiary': '#111827',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
        'accent-blue': '#3b82f6',
        'accent-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}

