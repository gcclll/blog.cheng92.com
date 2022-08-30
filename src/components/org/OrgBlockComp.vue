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

const [codeRef, copyButtonVisible, copy, showButton] = useCopyButton()

function alert() {}
</script>

<template>
  <v-btn class="ma-2 pa-2" @click="alert('success', 'test message')"
    >Alert</v-btn
  >
  <v-btn class="ma-2 pa-2" @click="toggleDark()">改变主题</v-btn>
  <div class="gl-block-node">
    <p class="d-flex flex-row">
      <v-btn
        v-if="copyButtonVisible"
        class="ma-2 pa-2 gl-block__copy-button leading-[0.5rem]"
        size="x-small"
        color="secondary"
        @click="copy"
      >
        复 制
      </v-btn>
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
 .gl-block-node {
   position: relative;
   .gl-block__copy-button {
     position: absolute;
     right: 0;
     top: 2px;
     z-index: 99;
   }
 }
</style>
