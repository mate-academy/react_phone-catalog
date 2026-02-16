/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '320px',
      tablet: '640px',
      desktop: '1200px',
    },
    extend: {
      colors: {
        'primary': '#313237',
        'secondary': '#89939a',
        'icons': '#b4bdc3',
        'elements': '#e2e6e9',
        'hover': '#fafbfc',
        'green': '#27ae60',
        'red': '#eb5757',
        // Purple colors for interactions
        'purple': '#8b5cf6',
        'purple-hover': '#7c3aed',
        // Button colors
        'button-active': '#2563eb',
        'button-inactive': '#4b5563',
        'button-hover': '#374151',
        'button-purple': '#8b5cf6',
        'button-purple-hover': '#7c3aed',
        // Arrow colors
        'arrow-active': '#313237',
        'arrow-disabled': '#374151',
        'arrow-border-active': '#b4bdc3',
        'arrow-border-disabled': '#b4bdc3',
        // Form colors
        'form-background': '#ffffff',
        'form-border': '#e5e7eb',
        'form-focus': '#d1d5db',
        // Pagination colors
        'pagination-text': '#6b7280',
        // Error colors
        'error-red': '#eb5757',
        'error-background-from': '#e0f2fe',
        'error-background-to': '#bfdbfe',
        'error-text': '#1e3a8a',
        'error-button': '#3b82f6',
        'error-button-hover': '#1d4ed8',
        // Card colors
        'card-background': '#ffffff',
        'card-border': '#e5e7eb',
        // Slider colors
        'slider-button': '#ffffff',
        'slider-inactive': '#6b7280',
        'slider-active': '#374151',
        // Message colors
        'message-background': '#ffffff',
        'message-border': '#e5e7eb',
        'message-text': '#374151',
        // Dark theme colors
        'dark-primary': '#ffffff',
        'dark-secondary': '#9ca3af',
        'dark-icons': '#6b7280',
        'dark-elements': '#374151',
        'dark-hover': '#1f2937',
        'dark-white': '#000000',
        'dark-background': '#111827',
        'dark-border': '#374151',
        'dark-button-active': '#3b82f6',
        'dark-button-inactive': '#374151',
        'dark-button-hover': '#4b5563',
        'dark-button-purple': '#8b5cf6',
        'dark-button-purple-hover': '#7c3aed',
        'dark-purple': '#a78bfa',
        'dark-purple-hover': '#8b5cf6',
        // Dark arrow colors
        'dark-arrow-active': '#ffffff',
        'dark-arrow-disabled': '#374151',
        'dark-arrow-border-active': '#6b7280',
        'dark-arrow-border-disabled': '#6b7280',
        'dark-form-background': '#374151',
        'dark-form-border': '#4b5563',
        'dark-form-focus': '#6b7280',
        'dark-card-background': '#1f2937',
        'dark-card-border': '#374151',
        'dark-slider-button': '#1f2937',
        'dark-slider-inactive': '#9ca3af',
        'dark-slider-active': '#6b7280',
        'dnd': '#FEF7FB',
        'dnd-hover': '#FDF2F8',
        'dark-dnd': '#EDE9FE',
        'dark-dnd-hover': '#E3DCFE',
      },
      cursor: {
        'grab-custom': "url('/cursors/cursor-grab.png') 0 0, grab",
        'not-allowed-custom':
          "url('/cursors/cursor-not-allowed.png') 0 0, not-allowed",
      },

      fontFamily: {
        mont: ['Mont', 'sans-serif'],
      },

      fontSize: {
        nav: ['12px', { lineHeight: '11px', letterSpacing: '0.04em' }],
        default: ['14px', { lineHeight: '21px' }],
        small: ['12px', { lineHeight: '1' }],
        price: ['22px', { lineHeight: '1' }],
      },

      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        jump: 'jump 1s infinite alternate ease-in-out',
      },
    },
  },
  plugins: [],
};
