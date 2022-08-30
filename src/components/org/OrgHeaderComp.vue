<script lang="ts" setup>
import twCss from '~/json'
import { type OrgHeaderNode, OrgNodeTypes } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgHeaderNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.HEADER,
      title: '',
      level: 1,
      tags: [],
      properties: [],
    },
  },
)

const tagName = computed(() => `h${props.data.level}`)

onUpdated(() => {
  console.log(twCss, 'org header node')
})
</script>

<template>
  <component :is="tagName" :class="twCss.hn(data.level)"
    ><template v-if="typeof data.title === 'string'">{{ data.title }}</template
    ><OrgTextComp v-else :data="data.title"
  /></component>
</template>

<style lang="scss" scoped></style>
