<script lang="ts" setup>
import { NodeTypes } from '~/types'

const props = withDefaults(
  defineProps<{
    data: OrgHeaderNode
  }>(),
  {
    data: {
      type: NodeTypes.HEADER,
      children: [],
      title: '',
      level: 1,
    },
  }
)

const tag = computed(() => {
  return `h${props.data.level}`
})

onMounted(() => {
  console.log(props.data, 'mounted')
})
</script>

<template>
  <!-- header content is a TextNode -->
  <component :is="tag">
    <OrgTextNode :data="data.content" :type="data.type" />
  </component>
</template>

<style lang="scss" scoped></style>
