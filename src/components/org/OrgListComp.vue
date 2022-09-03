<script lang="ts" setup>
import { components } from './'
import { type OrgListNode, OrgNodeTypes } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgListNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.LIST,
      name: '',
      isOrder: false,
      items: [],
    },
  },
)

const compName = computed(() => (props.data.isOrder ? 'ol' : 'ul'))

const [classList] = useClassNames()
</script>

<template>
  <div>
    <component :is="compName" :class="classList[compName]">
      <li v-for="(item, i) in data.items" :key="i">
        <div>
          <OrgTextComp :data="item.content" />
        </div>
        <div v-if="item.children?.length">
          <div v-for="(node, j) in item.children" :key="j">
            <component :is="components()[node.type]" :data="node" />
          </div>
        </div>
      </li>
    </component>
  </div>
</template>

<style lang="scss" scoped></style>
