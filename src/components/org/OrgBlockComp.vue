<script lang="ts" setup>
import { type OrgBlockNode, OrgNodeTypes } from '~/utils/parser'
import config from '~/json/config'

const props = withDefaults(
  defineProps<{
    data: OrgBlockNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.BLOCK,
      children: [],
      code: '', // block content
      lang: '', // block language name
      name: '', // block name
      options: [],
    },
  },
)

const [codeRef, , copy, showButton] = useCopyButton()
const isCard = computed(() => {
  const { code, name } = props.data
  return (
    typeof code === 'object' &&
    code.type === OrgNodeTypes.TEXT &&
    name === 'textbox'
  )
})

const isDark = useDark()
onMounted(() => {
  console.log(props.data, 'xxx')
})
</script>

<template>
  <!-- <v-btn class="ma-2 pa-2" @click="toggleDark()">改变主题</v-btn> -->
  <v-card v-if="isCard"><OrgTextComp :data="data.code" /></v-card>
  <div v-else class="gl-block-node relative">
    <!-- 语言 - 复制按钮 -->
    <p class="flex flex-row absolute right-0 top-0 z-99 h-8 pt-2">
      <span class="text-pink-600 mr-2">{{data.lang}}</span>
      <span class="mr-2 cursor-pointer text-red-400" @click="copy">copy</span>
    </p>
    <highlightjs
      ref="codeRef"
      :language="data.lang"
      :code="data.code"
      @mouseenter="showButton(true)"
      @mouseleave="showButton(true)"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>
