<script lang="ts" setup>
// https://github.com/antfu/vitesse/issues/296
import { components } from './'
import { OrgNodeTypes } from '~/utils/parser'

const [classList] = useClassNames()

const props = withDefaults(
  defineProps<{
    nodes: Array<{
      type: OrgNodeTypes
    }>
  }>(),
  {
    nodes: [] as any,
  },
)

// the properties of the whole chapter
// TODO set to page property
const properties = reactive<{ title?: string }>({})
const nodeList = ref([])

watch(
  () => props.nodes,
  (nodes) => {
    nodeList.value = []
    props.nodes.forEach((node) => {
      if (node.type === OrgNodeTypes.PROPERTY)
        properties[node.name] = node.value.trim()
      else nodeList.value.push(node)
    })
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>

<template>
  <div :class="classList.orgContent">
    <OrgHeaderComp
      class="text-center"
      style="display: block"
      :data="{ type: OrgNodeTypes.HEADER, content: properties.title, level: 1 }"
    />
    <div v-for="(node, i) in nodeList" :key="i" class="org-content-item">
      <component :is="components()[node.type]" :data="node" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
