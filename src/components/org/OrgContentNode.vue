<script lang="ts" setup>
 import { OrgNodeTypes } from 'org-file-parser-with-js'

const props = withDefaults(
  defineProps<{
    nodes: Array<{
      type: OrgNodeTypes
    }>
  }>(),
  {
    nodes: [] as any,
  },
)

// the properties of the whole chapter
// TODO set to page property
const properties = reactive<{ title?: string }>({})
const nodeList = ref([])

watch(
  () => props.nodes,
  (nodes) => {
    nodeList.value = []
    props.nodes.forEach((node) => {
      if (node.type === OrgNodeTypes.PROPERTY) {
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
      :data="{ type: OrgNodeTypes.HEADER, content: properties.title, level: 1 }"
    />
    <div v-for="(node, i) in nodeList" class="org-content-item" :key="i">
      <OrgHeaderNode v-if="node.type === OrgNodeTypes.HEADER" :data="node" />
      <OrgTextNode v-else-if="node.type === OrgNodeTypes.TEXT" :data="node" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
