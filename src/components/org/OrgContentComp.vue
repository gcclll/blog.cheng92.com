<script lang="ts" setup>
// https://github.com/antfu/vitesse/issues/296
import { components } from './'
import { OrgNodeTypes } from '~/utils/parser'

const { t } = useI18n()
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
      properties[node.name.toLowerCase()] = node.value.trim()
      else nodeList.value.push(node)
    })
  },
  {
    deep: true,
    immediate: true,
  },
)

onUpdated(() => {
  console.log(props.nodes, 'xxx')
})

const chapterAttrs = computed(() => {
  const required = ['author', 'email', 'published', 'updated']
  const attrs = []
  Object.keys(properties)
        .filter((p) => required.includes(p))
        .forEach((name) => {
          attrs.push({ name, value: properties[name] })
        })
  return attrs
})
</script>

<template>
  <div :class="classList.orgContent">
    <h1 class="pt-4 pb-8 text-center block" :class="classList.header(1)">
      <p>{{ properties.title }}</p>
      <p class="flex items-center justify-center space-x-4 text-[1rem] text-blue-600">
        <span
          v-for="(property, i) in chapterAttrs"
          :key="i"
          :class="`meta-${property.name}`"
          >{{ t(`keywords.${property.name}`) }}: {{ property.value }}</span
        >
      </p>
    </h1>
    <div v-for="(node, i) in nodeList" :key="i" class="org-content-item">
      <component :is="components()[node.type]" :data="node" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
