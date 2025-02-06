import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        violet: '#7E33E0',
        lightpurple:'#F2F0FF',
        pink:'#FB2E86',
        green:'#08D15F',
        blue:'#2F1AC4',
        lightpink:'#FFF6FB',
        gradientLeft: '#8e24aa',
        gradientRight: '#1e88e5',
      },
    },
  },
  plugins: [],
};
export default config;
