<script lang="ts" setup>
import { OrgNodeTypes, type OrgStateNode } from '~/utils/parser'

const [classList] = useClassNames()

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
  <span class="rounded px-2" :class="[classList.states(data.state)]">{{
    data.state
  }}</span>
</template>

<style lang="scss" scoped></style>
