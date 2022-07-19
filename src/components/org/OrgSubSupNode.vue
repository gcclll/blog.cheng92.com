<script lang="ts" setup>
import { NodeTypes } from '~/types'
const props = withDefaults(
  defineProps<{
    data: OrgSubSupNode
  }>(),
  {
    data: {
      type: NodeTypes.SUBSUP,
      sign: '',
      sub: '',
      sup: '',
      target: '',
    },
  }
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
