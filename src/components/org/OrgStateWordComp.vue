<script lang="ts" setup>
import twCss from '~/json/'
import { OrgNodeTypes, type OrgStateNode } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgStateNode
  }>(),
  {
    type: OrgNodeTypes.STATE,
    state: '', // TODO, DONE
  },
)
</script>

<template>
  <span class="rounded px-2" :class="[twCss.states(data.state)]">{{
    data.state
  }}</span>
</template>

<style lang="scss" scoped></style>
