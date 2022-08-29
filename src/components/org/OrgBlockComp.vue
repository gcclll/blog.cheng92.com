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

// copy button
const showCopyButton = ref(false)
const codeRef = ref(null)
function copy(e) {
  if (codeRef.value) {
    const pre = codeRef.value.$el
    const code = pre.querySelector('code')
    if (code) {
      const cloned = codeRef.value.$el.cloneNode(true)
      const code = cloned.textContent
      navigator.clipboard.writeText(code).then(() => {
        console.log('copied!')
      })
    }
  }
}

function alert() {}
</script>

<template>
  <div
    class="gl-block-node"
    @mouseover="showCopyButton = true"
    @mouseout="showCopyButton = true"
  >
    <p class="d-flex flex-row">
      <v-btn class="ma-2 pa-2" @click="alert('success', 'test message')"
        >Alert</v-btn
      >
      <v-btn class="ma-2 pa-2" @click="toggleDark()">改变主题</v-btn>
      <v-btn
        class="ma-2 pa-2 gl-block__copy-button"
        v-if="showCopyButton"
        @click="copy"
      >
        复 制
      </v-btn>
    </p>
    <br />

    <highlightjs ref="codeRef" :language="data.lang" :code="data.code" />
  </div>
</template>

<style lang="scss" scoped>
.gl-block-node {
  position: relative;
  .gl-block__copy-button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 99;
  }
}
</style>
