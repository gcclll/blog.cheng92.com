<script lang="ts" setup>
import { NodeTypes } from '~/types'

const props = withDefaults(
  defineProps<{
    type: NodeTypes
    data: OrgTextNode
  }>(),
  {
    data: {
      type: NodeTypes.TEXT,
      children: [],
    },
  }
)
</script>

<template>
  <div>
    <div v-if="type === NodeTypes.HEADER">1. {{ type }}: {{ data }}</div>
    <div v-else>2. {{ type }}: {{ data }}</div>
  </div>
</template>

<style lang="scss" scoped></style>
