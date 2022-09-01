export default {
  header: (level: number) => [`text-${5 - level}xl`, 'text-teal-600', 'pb-5'],
  states: (word: string) =>
    ({
      TODO: 'bg-red-600 text-white',
      DONE: 'bg-gray-400 text-white',
    }[word]),
  orgContent: 'org-content bg-gray-100 px-3 py-2',
}
