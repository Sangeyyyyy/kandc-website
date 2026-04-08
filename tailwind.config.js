/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: '#1a2b4c',
                burgundy: '#60213a',
                rose: '#eec0bf',
                icy: '#b8d4f2',
                bronze: '#b27409',
                cream: '#FFFFFF',
                border: 'rgba(238, 192, 191, 0.2)',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', 'serif'],
                sans: ['Outfit', 'sans-serif'],
            },
            animation: {
                'power-fade': 'powerFade 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'scale-in': 'scaleIn 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards',
                'ken-burns': 'kenBurns 20s ease-out infinite alternate',
            },
            keyframes: {
                powerFade: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(1.1)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                kenBurns: {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.08)' },
                }
            }
        },
    },
    plugins: [],
}
