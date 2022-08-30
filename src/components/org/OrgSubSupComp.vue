<script lang="ts" setup>
import { OrgNodeTypes, type OrgSubSupNode } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgSubSupNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.SUB_SUP,
      target: '',
      value: '',
      // sub or sup: boolean
    },
  },
)
</script>

<template>
  <span
    >{{ data.target
    }}<component :is="data.sup ? 'sup' : 'sub'"
      ><OrgTextComp :data="data.value" /></component
    >&nbsp;</span
  >
</template>

<style lang="scss" scoped></style>
