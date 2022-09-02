export default {
  header: (level: number) => [`text-${5 - level}xl`, 'text-teal-600'],
  states: (word: string) =>
    ({
      TODO: 'bg-red-600 text-white rounded px-[5px]',
      DONE: 'bg-gray-400 text-white rounded px-[5px]',
      CANCELLED: 'bg-[#d0c8c8] text-white rounded px-[5px]',
    }[word]),
  orgContent: 'org-content bg-gray-100 dark:bg-gray-900 px-3 py-2',
  tag: ['mr-2', 'pink', { emacs: 'primary', vue: 'green', react: 'blue' }],
  // -> margin, font-family, weight, color, bg-color, underline
  // -> emacs org-special-block-extras
  orgExtraTags: {
    '!!': 'leading-normal mx-1 text-3xl font-cherry font-bold text-[#a53e2d] bg-[#fff8ca] underline',
    '!@': 'leading-normal mx-1 text-2xl font-eater text-[#eeb97e] bg-[#fff8ca]',
    '!%': 'leading-normal mx-1 text-3xl font-diplo font-bold text-[#683231] bg-[#fff8ca]',
    '!&': 'leading-normal mx-1 text-3xl font-lixbk font-bold text-[#353d8b] bg-[#fff8ca]',
    '@!': 'leading-normal mx-1 text-3xl font-finger font-bold text-[#54436e] bg-[#fff8ca]',
    '@@': 'leading-normal mx-1 text-3xl font-fuzzy font-bold text-[#d65d8f] bg-[#fff8ca]',
    '@%': 'leading-normal mx-1 text-3xl font-henny font-bold text-[#e5c494] bg-[#fff8ca]',
    '@&': 'leading-normal mx-1 text-3xl font-gloria font-bold text-[#0b9fcf] bg-[#fff8ca]',
    '%!': 'leading-normal mx-1 text-3xl font-humor text-[#c9564c] bg-[#fff8ca]',
    '%@': 'leading-normal mx-1 font-bitstm text-[#ff0000] bg-[#ffff00]',
    '%%': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
    '%&': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
    '&!': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
    '&@': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
    '&%': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
    '&&': 'leading-normal mx-1 font-monaco text-[#00ce00] bg-[#fff8ca]',
  },
}
