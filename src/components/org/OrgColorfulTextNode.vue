<script lang="ts" setup>
 import { OrgNodeTypes, OrgColorfulTextNode, type OrgEmphasisNode } from 'org-file-parser-with-js'

 const props = withDefaults(
   defineProps<{
     data: OrgColorfulTextNode
   }>(),
   {
     data: {
       type: OrgNodeTypes.COLORFUL_TEXT,
       name: ''
     }
   }
 )
</script>

<template>
  <!-- TODO hover to show documentation -->
  <abbrev v-if="data.name === 'doc'">{{ data.content }}</abbrev>
  <font v-else :color="data.name">{{ data.content }}</font>
</template>

<style lang="scss" scoped>
 abbrev {
   border-bottom: 1px dotted #000;
   color: red;
   text-decoration: none;
 }
</style>
