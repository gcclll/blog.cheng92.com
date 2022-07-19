<script lang="ts" setup>
import { NodeTypes } from '~/types'

const props = withDefaults(
  defineProps<{
    data: OrgTextNode
  }>(),
  {
    data: {
      children: [],
    },
  }
)
</script>

<template>
  <div>
    <span v-for="(child, i) in data.children" :key="i">
      <span v-if="child.type === NodeTypes.TEXT">{{ child.content }}</span>
      <OrgEmphasisNode
        v-else-if="child.type === NodeTypes.EMPHASIS"
        :data="child"
      />
      <OrgSubSupNode
        v-else-if="child.type === NodeTypes.SUBSUP"
        :data="child"
      />
    </span>
  </div>
</template>

<style lang="scss" scoped></style>
