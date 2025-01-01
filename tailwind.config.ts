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
     },
     fontFamily: {
       sans: ['"Marhey"', "sans-serif"],
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