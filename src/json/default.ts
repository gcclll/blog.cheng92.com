export default {
  hn: (level: number) => [`text-${5 - level}xl`, 'text-teal-600'],
  states: (word: string) =>
    ({
      TODO: 'bg-red-600 text-white',
      DONE: 'bg-gray-400 text-white',
    }[word]),
}
