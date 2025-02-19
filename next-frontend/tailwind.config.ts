import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#98FB98",
        secondary: "#7f7f7f",
        tertiary: "#e8e296"
      },
      backgroundImage: {
        "background": "url('/background.png')",
      }
    },
  },
  plugins: [flowbite.plugin()],
} satisfies Config;
