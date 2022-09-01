export default {
  header: (level: number) => [`text-${5 - level}xl`, 'text-teal-600'],
  states: (word: string) =>
    ({
      TODO: 'bg-red-600 text-white',
      DONE: 'bg-gray-400 text-white',
    }[word]),
  orgContent: 'org-content bg-gray-100 dark:bg-gray-900 px-3 py-2',
  tag: ['mr-2', 'pink', { emacs: 'primary', vue: 'green', react: 'blue' }],
  // [font-family, weight, color, bg-color, underline]
  // -> emacs org-special-block-extras
  orgExtraTags: {
    '!!': ['font-cherry', 700, 'text-[#a53e2d]', 'bg-[#fff8ca]'],
    '!@': ['font-eater', null, 'text-[#eeb97e]', 'bg-[#fff8ca]'],
    '!%': ['font-diplo', 700, 'text-[#683231]', 'bg-[#fff8ca]'],
    '!&': ['font-lixbk', 700, 'text-[#353d8b]', 'bg-[#fff8ca]'],
    '@!': ['font-finger', 700, 'text-[#54436e]', 'bg-[#fff8ca]'],
    '@@': ['font-fuzzy', 700, 'text-[#d65d8f]', 'bg-[#fff8ca]'],
    '@%': ['font-henny', 700, 'text-[#e5c494]', 'bg-[#fff8ca]'],
    '@&': ['font-gloria', 700, 'text-[#0b9fcf]', 'bg-[#fff8ca]'],
    '%!': ['font-humor', null, 'text-[#c9564c]', 'bg-[#fff8ca]'],
    '%@': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '%%': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '%&': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '&!': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '&@': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '&%': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
    '&&': ['font-monaco', null, 'text-[#00ce00]', 'bg-[#fff8ca]'],
  },
}
