
export function useDocumentation(name: string) {
  return defineAsyncComponent(() => import(`~/documentations/${name}.md`))
}
