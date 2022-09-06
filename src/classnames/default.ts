export default {
  space: ['pr-1'], // 文字之间的间隔
  header: (level: number) => `text-${5 - level}xl text-teal-600 align-middle`,
  states: (word: string) =>
    ({
      TODO: 'bg-red-600 text-white rounded px-[5px]',
      DONE: 'bg-gray-400 text-white rounded px-[5px]',
      CANCELLED: 'bg-[#d0c8c8] text-white rounded px-[5px]',
    }[word]),
  tag: ['mr-2', 'pink', { emacs: 'primary', vue: 'green', react: 'blue' }],
  // -> margin, font-family, weight, color, bg-color, underline
  // -> emacs org-special-block-extras
  orgExtraTags: {
    '!!': 'leading-normal mx-1 text-3xl font-cherry font-bold text-[#a53e2d] underline',
    '!@': 'leading-normal mx-1 text-2xl font-eater text-[#eeb97e] ',
    '!%': 'leading-normal mx-1 text-3xl font-diplo font-bold text-[#683231] ',
    '!&': 'leading-normal mx-1 text-3xl font-lixbk font-bold text-[#353d8b] ',
    '@!': 'leading-normal mx-1 text-3xl font-finger font-bold text-[#54436e] ',
    '@@': 'leading-normal mx-1 text-3xl font-fuzzy font-bold text-[#d65d8f] ',
    '@%': 'leading-normal mx-1 text-3xl font-henny font-bold text-[#e5c494] ',
    '@&': 'leading-normal mx-1 text-3xl font-gloria font-bold text-[#0b9fcf] ',
    '%!': 'leading-normal mx-1 text-3xl font-humor text-[#c9564c] ',
    '%@': 'leading-normal mx-1 font-bitstm text-[#ff0000] bg-[#ffff00]',
    '%%': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
    '%&': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
    '&!': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
    '&@': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
    '&%': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
    '&&': 'leading-normal mx-1 font-monaco text-[#00ce00] ',
  },
  ol: 'list-decimal ml-4',
  ul: 'list-disc ml-4',
  // 内容区
  content: {
    card: 'w-10/12 mx-auto max-w-[800px]',
    text: 'bg-gradient-to-b from-slate-300 via-slate-100 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-700',
  },
  docText: 'underline decoration-dashed text-red underline-offset-4 pr-1',
  // 针对文章全局通用样式
  global: {
    // 文章信息，在文章标题下方(如：EMail, Author, Publish, Updated 日期)
    information: 'flex flex-col items-start md:flex-row justify-center md:space-x-4 text-[1rem]  text-blue-600',
    // 文章标题
    chapterTitle: 'pt-4 pb-8 text-center block',
    // 博客主体背景色
    background:
    'bg-gradient-to-b from-green-300 via-green-100 to-slate-200 dark:from-black dark:via-black dark:to-black',
  },
}
