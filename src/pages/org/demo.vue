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
  <div>
    <v-row v-if="showEditor" no-gutters>
      <v-col cols="6">
        <v-card-text class="overflow-hidden">
          <v-textarea v-model="source" class="org-source" />
        </v-card-text>
      </v-col>
      <v-col cols="6">
        <v-card-text class="org-content h-[70vh] overflow-scroll">
          <OrgContentComp :nodes="nodes.children" />
        </v-card-text>
      </v-col>
    </v-row>
    <v-card-text v-else :class="classList.content"
      >
      <OrgContentComp :nodes="nodes.children"
    /></v-card-text>
  </div>
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
