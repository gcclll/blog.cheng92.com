<script lang="ts" setup>
import { type OrgHeaderNode, OrgNodeTypes } from '~/utils/parser'

const [classList] = useClassNames()

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
  console.log(props.data, 'org header node')
})
</script>

<template>
  <component :is="tagName" :class="classList.header(data.level)"
    ><template v-if="typeof data.title === 'string'">{{ data.title }}</template
    ><OrgTextComp v-else :data="data.title"
  /></component>
</template>

<style lang="scss" scoped></style>
