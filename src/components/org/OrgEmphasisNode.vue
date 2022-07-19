<script lang="ts" setup>
import { NodeTypes } from '~/types'

const props = withDefaults(
  defineProps<{
    data: OrgEmphasisNode
  }>(),
  {
    data: {
      type: NodeTypes.EMPHASIS,
      tag: '',
    },
  }
)

const classList = computed(() => {
  const list = {
    '/': 'italic', // italic
    '*': 'font-bold', // bold
    _: 'underline', // underline
    '+': 'line-through', // line through
    $: '', // latex
  }

  return [list[props.data.tag]].filter(Boolean).join(' ')
})
</script>

<template>
  <span :class="classList">{{ data.content }}</span>
</template>

<style lang="scss" scoped></style>
