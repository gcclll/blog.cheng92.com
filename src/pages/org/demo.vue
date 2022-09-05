<script lang="ts" setup>
import axios from 'axios'
import { OrgNodeTypes, type OrgRootNode } from '~/utils/parser'
import { baseParse } from '~/utils/parser'

const source = ref('')
const nodes = ref<OrgRootNode>({})

let timer
watch(
  source,
  (value: string) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      nodes.value = baseParse(value)
    }, 1000)
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  axios.get('/posts/test.org').then((res) => {
    source.value = res.data
  })
})

const showEditor = ref(false)
const [classList] = useClassNames()
</script>

<template>
  <OrgContentComp :nodes="nodes.children" />
</template>

<style scoped>
.org-source :deep(.v-field__input) {
  height: 70vh;
}
</style>

<route lang="yaml">
meta:
  layout: blog
</route>
