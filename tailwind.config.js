/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      jetbrains: ['"JetBrains Mono"', 'monospace'], // Adding JetBrains Mono
      },
      colors: {
        primaryYellow: "#E5AC00",
        panelColor: '#1c1c1c', 
        bgMainColor: "#161616",
        hoverPanelButtonColor: "#2B2A22",
        panelButtonColor: "#292929",
      },
      textColor: {
        offWhite: "#CDCDCD"
      }
    },
  },
  plugins: [],
}
