<script lang="ts" setup>
import { NodeTypes } from '~/types'

withDefaults(
  defineProps<{
    data: {
      type: NodeTypes
      [propName]: any
    }
  }>(),
  {
    data: {
      type: NodeTypes.HEADER, // default
      children: [],
    },
  }
)
</script>

<template>
  <div class="org-content">
    <OrgHeaderNode v-if="data.type === NodeTypes.HEADER" :data="data" />
    <OrgTextNode v-else-if="data.type === NodeTypes.TEXT" :data="data" />
  </div>
</template>

<style lang="scss" scoped></style>
