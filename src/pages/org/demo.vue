<script lang="ts" setup>
import { type OrgRootNode } from '~/utils/parser'

const root = ref<OrgRootNode>({})

onMounted(async () => {
  // const ast = await usePoster("build_your_own_react")
  const ast = await usePoster("test")
  console.log(ast, 'demo org')
  if (ast) root.value = ast
})
</script>

<template>
  <OrgContentComp :nodes="root.children || []" />
</template>

<route lang="yaml">
meta:
  layout: blog
</route>
