<script lang="ts" setup>
import { type OrgColorfulTextNode, OrgNodeTypes } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgColorfulTextNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.COLORFUL_TEXT,
      color: '',
      content: '',
      children: [],
    },
  },
)
</script>

<template>
  <font v-if="data.children?.length === 0" :color="data.color">{{
    `${data.content.trim()} `
  }}</font>
  <OrgTextComp
    v-else
    :data="{ type: OrgNodeTypes.TEXT, children: data.children }"
  />
</template>

<style lang="scss" scoped></style>
