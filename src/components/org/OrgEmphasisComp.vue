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
      children: [],
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
  <span :class="nodeClsName"
    ><template v-for="(child, i) in data.children" :key="i"
      ><OrgTextComp :data="child" /></template
  ></span>
</template>

<style lang="scss" scoped></style>
