<script lang="ts" setup>
import { type OrgHeaderNode, OrgNodeTypes } from '~/utils/parser'

const [classList] = useClassNames()

const props = withDefaults(
  defineProps<{
    data: OrgHeaderNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.HEADER,
      title: '',
      level: 1,
      tags: [],
      properties: [],
    },
  },
)

const tagName = computed(() => `h${props.data.level}`)
const [tagClsNames, tagChipColor, tagColors] = classList.tag

onUpdated(() => {
  console.log(props.data, 'org header node')
})
</script>

<template>
  <div class="relative pb-5">
    <component :is="tagName" :class="classList.header(data.level)"
      ><template v-if="typeof data.title === 'string'">{{
        data.title
      }}</template
      ><OrgTextComp v-else :data="data.title"
    /></component>
    <span
      ><v-chip
        v-for="(tag, i) in data.tags"
         :key="i"
         size="x-small"
        :class="tagClsNames"
        :color="tagColors[tag] || tagChipColor"
        label
        text-color="white"
        >{{ tag }}</v-chip
      ></span
    >
  </div>
</template>

<style lang="scss" scoped></style>
