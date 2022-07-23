<script lang="ts" setup>
import { OrgNodeTypes, OrgTextNode } from '~/parser'

const props = withDefaults(
  defineProps<{
    data: OrgTextNode
  }>(),
  {
    data: {
      children: [],
    },
  },
)
</script>

<template>
  <span v-for="(child, i) in data.children" :key="i">
    <span v-if="child.type === OrgNodeTypes.TEXT">{{ child.content }}</span>
    <OrgColorfulTextNode
      v-if="child.type === OrgNodeTypes.COLORFUL_TEXT"
      :data="child"
    />
    <OrgEmphasisNode
      v-else-if="child.type === OrgNodeTypes.EMPHASIS"
      :data="child"
    />
    <OrgSubSupNode
      v-else-if="child.type === OrgNodeTypes.SUBSUP"
      :data="child"
    />
  </span>
</template>

<style lang="scss" scoped></style>
