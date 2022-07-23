<script lang="ts" setup>
import {
  OrgNodeTypes,
  OrgColorfulTextNode,
  OrgEmphasisNode,
} from '~/parser'

const props = withDefaults(
  defineProps<{
    data: OrgColorfulTextNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.COLORFUL_TEXT,
      name: '',
    },
  },
)

 function padContent(content: string) {
   return ` ${content} `
 }
</script>

<template>
  <!-- TODO hover to show documentation -->
  <abbrev v-if="data.name === 'doc'">{{ padContent(data.content) }}</abbrev>
  <font v-else :color="data.name">{{ padContent(data.content) }}</font>
</template>

<style lang="scss" scoped>
abbrev {
  border-bottom: 1px dotted #000;
  color: red;
  text-decoration: none;
}
</style>
