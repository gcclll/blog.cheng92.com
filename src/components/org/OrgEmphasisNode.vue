<script lang="ts" setup>
import { OrgNodeTypes, type OrgEmphasisNode } from 'org-file-parser-with-js'

const props = withDefaults(
  defineProps<{
    data: OrgEmphasisNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.EMPHASIS,
      tag: '',
    },
  },
)

const classList = computed(() => {
  const list = {
    '/': 'italic', // italic
    '*': 'font-bold', // bold
    _: 'underline', // underline
    '+': 'line-through', // line through
    $: '', // latex
  }

  const signs = ['!', '@', '%', '&']
  const dsigns = []
  for (let i = 0; i < signs.length; i++)
    for (let j = 0; j < signs.length; j++) dsigns.push(signs[i] + signs[j])

  for (let k = 0; k < dsigns.length; k++) {
    const s = dsigns[k]
    const idx = k + 1
    list[s] = `gl-org-em-${idx < 10 ? `0${idx}` : idx}`
  }

  return [list[props.data.tag]].filter(Boolean).join(' ')
})
</script>

<template>
  <span :class="classList">{{ data.content }}</span>
</template>

<style lang="scss" scoped>
/* @import url(`@/styles/org.scss`); */
@import '~/styles/org.scss';
</style>
