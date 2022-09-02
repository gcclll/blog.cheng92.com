<script lang="ts" setup>
import { type OrgEmphasisNode, OrgNodeTypes } from '~/utils/parser'
import config from '~/json/config'

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

const [classList] = useClassNames()
const nodeClsName = computed(() => {
  const { sign = '', extra, background } = props.data || {}
  let styles = {
    '_': 'underline',
    '/': 'italic',
    '*': 'font-bold',
    '+': 'line-through',
  }

  if (extra) styles = classList.orgExtraTags

  const bgCss =
    background === true
      ? config.extraBackground
      : typeof background === 'string'
      ? background
      : ''

  return [bgCss, styles[sign], useClassNames('space')].filter(Boolean)
})
</script>

<template>
  <span :class="nodeClsName"
    ><template v-for="(child, i) in data.children" :key="i"
      ><OrgTextComp :data="child" /></template
  ></span>
</template>

<style lang="scss" scoped></style>
