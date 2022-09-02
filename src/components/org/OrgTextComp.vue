<script lang="ts" setup>
import { components } from './'
import { OrgNodeTypes, type OrgTextNode } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgTextNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.TEXT,
      children: [],
      content: '',
      indent: 0,
    },
  },
)

const hasChild = computed(() => props.data.children?.length > 0)
</script>

<template>
  <span :class="useClassNames('space')">
    <span v-if="hasChild">
      <template v-for="(child, i) in data.children" :key="i">
        <component :is="components()[child.type]" :data="child" />
      </template>
    </span>
    <span v-else-if="data.content">{{
      data.content.trim()
    }}</span>
  </span>
</template>

<style lang="scss" scoped></style>
