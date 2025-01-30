import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        primaryYellow: "#E5AC00",
        panelColor: "#1c1c1c",
        bgMainColor: "#161616",
        hoverPanelButtonColor: "#2B2A22",
        panelButtonColor: "#292929",
        goldenrod: "#daa520",
        muted: {
          DEFAULT: "#6c757d",
          foreground: "#8a8d91",
        },
      },
      textColor: {
        offWhite: "#CDCDCD",
      },
      animation: {
        fadeInUp: "fadeInUp 2s ease-in-out 0.9s forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      screens: {
        sm: "0px",
        md: "640px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
} satisfies Config;
