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
      },
      textColor: {
        offWhite: "#CDCDCD",
      },
    },
  },
  plugins: [],
} satisfies Config;
