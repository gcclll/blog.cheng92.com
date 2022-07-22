<script lang="ts" setup>
import { OrgNodeTypes, type OrgSubSupNode } from 'org-file-parser-with-js'

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
