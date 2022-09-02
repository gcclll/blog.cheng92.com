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
  <span :class="useClassNames('space')"
    >{{ data.target
    }}<component :is="data.sup ? 'sup' : 'sub'">
      <span v-if="typeof data.value === 'string'">{{ data.value }}</span>
      <OrgTextComp v-else :data="data.value" /></component
  ></span>
</template>

<style lang="scss" scoped></style>
