<script lang="ts" setup>
// https://github.com/antfu/vitesse/issues/296
import { components } from './'
import { OrgNodeTypes } from '~/utils/parser'
import config from '~/json/config'

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
      if (node.type === OrgNodeTypes.PROPERTY) {
        const name = node.name.toLowerCase()
        let value = node.value.trim()
        const dateProps = ['published', 'updated']
        if (dateProps.includes(name)) {
          // 只保留年月日
          value = value.split(' ')?.[0] || ''
        }
        properties[name] = value
      } else {
        nodeList.value.push(node)
      }
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

function showAttrIcon(name) {
  return config.chapterPropertyStyle === 'icon' && config.icons[name]
}
</script>

<template>
  <v-card :class="classList.content.card">
    <v-card-text :class="classList.content.text">
      <h1 :class="[classList.header(1), classList.global.chapterTitle]">
        <p>{{ properties.title }}</p>
        <p :class="classList.global.information">
          <template v-for="(property, i) in chapterAttrs" :key="i">
            <span :class="`meta-${property.name}`">
              <v-icon v-if="showAttrIcon(property.name)" color="green darken-2">
                {{ config.icons[property.name] }}
              </v-icon>
              <span v-else>{{ t(`keywords.${property.name}`) }}：</span>
              <a
                v-if="property.name === 'email'"
                class="underline align-middle"
                target="_blank"
                :href="`mailto:${property.value}`">
                {{ property.value }}
              </a>
              <a
                v-else-if="property.name === 'author'"
                class="underline align-middle"
                target="_blank"
                :href="`https://github.com/${property.value}`">
                {{ property.value }}
              </a>
              <span v-else class="align-middle">{{ property.value }}</span>
            </span>
          </template>
        </p>
      </h1>
      <p>
        <v-img
          class="w-32"
          src="https://img.shields.io/badge/GCCLL-Homepage-green?logo=gnu-emacs" />
      </p>
      <div v-for="(node, i) in nodeList" :key="i" class="org-content-item">
        <component :is="components()[node.type]" :data="node" />
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
@media (prefers-color-scheme: dark) {
  .v-card-text {
    background: rgb(0 0 0 / 0.4);
  }
}
</style>
