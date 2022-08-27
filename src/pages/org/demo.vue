<script lang="ts" setup>
import type { OrgNodeTypes, OrgRootNode } from '~/utils/parser'
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
</script>

<template>
  <div>
    <h3 class="text-center">ORG -> HTML</h3>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card-text class="left">
          <v-textarea v-model="source" class="org-source" />
        </v-card-text>
      </v-col>
      <v-col cols="6">
        <v-card-text class="org-content">
          <OrgContentComp :nodes="nodes.children" />
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.v-card-text {
  height: 70vh;
  overflow: scroll;
}

.v-card-text.left {
  overflow: hidden;
}

.org-source :deep(.v-field__input) {
  height: 70vh;
}

.org-content {
  background-color: #eee;
}
::-webkit-scrollbar {
  /* width: 0; */
}
</style>
