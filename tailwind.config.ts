import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

export default {
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
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        danger: "var(--color-danger)",
        gray: "var(--color-gray)",
        'gray-light': "var(--color-gray-light)",
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      display: ['no-scrollbar'],
    },
  },
 plugins: [
   plugin(({ addUtilities }) => {
     addUtilities({
       '.no-scrollbar::-webkit-scrollbar': {
         'display': 'none',
       },
       '.no-scrollbar': {
         '-ms-overflow-style': 'none',
         'scrollbar-width': 'none',
       },
     })
   }),
 ],
} satisfies Config;
