<script lang="ts" setup>
import { NodeTypes } from '~/types'

withDefaults(defineProps<{
   data: OrgEmphasisNode
 }>(), {
   data: {
     type: NodeTypes.EMPHASIS
   }
 })
</script>

<template>
  <span>
    
  </span>
</template>

<style lang="scss" scoped>

</style>
