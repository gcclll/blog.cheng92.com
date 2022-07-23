<script lang="ts" setup>
import { OrgNodeTypes, OrgSubSupNode } from '~/parser'

const props = withDefaults(
  defineProps<{
    data: OrgSubSupNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.SUBSUP,
      sign: '',
      sub: '',
      sup: '',
      target: '',
    },
  },
)
</script>

<template>
  <span
    >{{ data.target }}<sub v-if="data.sub">{{ data.sub }}</sub
    ><sup v-else>{{ data.sup }}</sup></span
  >
</template>

<style lang="scss" scoped>
sub {
  color: red;
}
</style>
