<script lang="ts" setup>
import { NodeTypes } from '~/types'

// the properties of the whole chapter
// TODO set to page property
const properties = reactive({})
const nodeList = ref([])

const props = withDefaults(
  defineProps<{
    nodes: Array<{
      type: NodeTypes
      [propName]: any
    }>
  }>(),
  {
    nodes: [],
  }
)

watch(
  () => props.nodes,
  (nodes) => {
    nodeList.value = []
    props.nodes.forEach((node) => {
      if (node.type === NodeTypes.PROPERTY) {
        properties[node.name] = node.value.trim()
      } else {
        nodeList.value.push(node)
      }
    })
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<template>
  <div class="org-content">
    <OrgHeaderNode
      class="text-center"
      style="display: block"
      :data="{ type: NodeTypes.HEADER, content: properties.title, level: 1 }"
    />
    <div v-for="(node, i) in nodeList" class="org-content-item" :key="i">
      <OrgHeaderNode v-if="node.type === NodeTypes.HEADER" :data="node" />
      <OrgTextNode v-else-if="node.type === NodeTypes.TEXT" :data="node" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
