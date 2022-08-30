<script lang="ts" setup>
import { type OrgEmphasisNode, OrgNodeTypes } from '~/utils/parser'
const props = withDefaults(
  defineProps<{
    data: OrgEmphasisNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.EMPHASIS,
      sign: '',
    },
  },
)

const nodeClsName = computed(
  () =>
    ({
      _: 'underline',
      '/': 'italic',
      '*': 'font-bold',
      '+': 'line-through',
    }[props.data?.sign] || ''),
)

onUpdated(() => {
  console.log(props.data, 'org emphasis node')
})
</script>

<template>
  <span :class="nodeClsName">{{ data.content }}</span>
</template>

<style lang="scss" scoped></style>
