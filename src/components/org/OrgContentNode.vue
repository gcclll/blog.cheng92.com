<script lang="ts" setup>
import { NodeTypes } from '~/types'

withDefaults(
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
</script>

<template>
  <div class="org-content">
    <div v-for="(node, i) in nodes" class="org-content-item" :key="i">
      <OrgHeaderNode v-if="node.type === NodeTypes.HEADER" :data="node" />
      <OrgTextNode v-else-if="node.type === NodeTypes.TEXT" :data="node" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
