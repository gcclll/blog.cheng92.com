<script lang="ts" setup>
import { NodeTypes } from '~/types'
import classnames from '~/config/classnames'

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
  },
)

const tag = computed(() => {
  return `h${props.data.level}`
})

const classList = computed(() => {
  return classnames[tag.value]
})
</script>

<template>
  <!-- header content is a TextNode -->
  <component :is="tag" :class="classList">
    <span v-if="typeof data.content === 'string'">{{ data.content }}</span>
    <OrgTextNode v-else :data="data.content" />
  </component>
</template>

<style lang="scss" scoped></style>
