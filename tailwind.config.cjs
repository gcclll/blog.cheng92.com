const fontFamily = {
  cherry: ['CherryBomb'],
  eater: ['Eater'],
  lixbk: ['Linux Biolinum Keyboard'],
  finger: ['Finger Paint'],
  fuzzy: ['Fuzzy Bubbles'],
  henny: ['Henny Penny'],
  gloria: ['Gloria Hallelujah'],
  humor: ['Humor Sans'],
  diplo: ['Diplomata'],
  monaco: ['Monaco'],
  bitstm: ['Bitstream Vera Sans Mono'],
}

Object.keys(fontFamily).forEach((font) => {
  fontFamily[font] = [...fontFamily[font], 'sans', 'serif', 'mono']
})

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,md}'],
  theme: {
    extend: {
      screens: {
        ise: '375px', // iphone se
      },
    },
    fontFamily,
  },
  plugins: [],
}
