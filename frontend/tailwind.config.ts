import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./api/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--brand-bg)",
        foreground: "var(--brand-text)",
        border: "var(--brand-border)",
        primary: {
          DEFAULT: "var(--brand-primary)",
          50: "var(--brand-primary-50)",
          100: "var(--brand-primary-100)",
          200: "var(--brand-primary-200)",
          300: "var(--brand-primary-300)",
          400: "var(--brand-primary-400)",
          500: "var(--brand-primary-500)",
          600: "var(--brand-primary-600)",
          700: "var(--brand-primary-700)",
          800: "var(--brand-primary-800)",
          900: "var(--brand-primary-900)",
        },
        secondary: {
          DEFAULT: "var(--brand-secondary)",
          50: "var(--brand-secondary-50)",
          100: "var(--brand-secondary-100)",
          200: "var(--brand-secondary-200)",
          300: "var(--brand-secondary-300)",
          400: "var(--brand-secondary-400)",
          500: "var(--brand-secondary-500)",
          600: "var(--brand-secondary-600)",
          700: "var(--brand-secondary-700)",
          800: "var(--brand-secondary-800)",
          900: "var(--brand-secondary-900)",
        },
        success: {
          DEFAULT: "var(--brand-success)",
          bg: "var(--brand-success-bg)",
        },
        warning: {
          DEFAULT: "var(--brand-warning)",
          bg: "var(--brand-warning-bg)",
        },
      },
    },
  },
}

export default config
