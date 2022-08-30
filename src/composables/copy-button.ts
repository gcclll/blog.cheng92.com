import { type Ref } from 'vue'

export interface UseCopyButtonOptions {
  done: (code: string) => void
}

export function useCopyButton(
  options: UseCopyButtonOptions,
): [
  Ref<HTMLPreElement | undefined>,
  Ref<boolean>,
  () => void,
  (show: boolean) => void,
] {
  const { done } = options || {}

  const codeRef = ref<HTMLPreElement | undefined>()
  const copyButtonVisible = ref(false)

  const copy = () => {
    if (codeRef.value) {
      const pre = codeRef.value.$el as HTMLPreElement
      const code = pre.querySelector('code')

      if (code) {
        const cloned = pre.cloneNode(true)
        const codeText = cloned.textContent
        codeText &&
          navigator.clipboard.writeText(codeText).then(() => {
            if (done) done(codeText)
          })
      }
    }
  }

  const showButton = (show: boolean) => {
    copyButtonVisible.value = !!show
  }

  return [codeRef, readonly(copyButtonVisible), copy, showButton]
}
