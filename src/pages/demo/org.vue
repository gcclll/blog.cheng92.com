<script lang="ts" setup>
 import { baseParse } from 'org-file-parser-with-js'
 import axios from 'axios'

 const source = ref(``)
 axios.get('/posts/test.org').then(res => {
   source.value = res.data
 })

 const nodes = ref([])

 watch(
   source,
   (value: string) => {
     nodes.value = baseParse(value)
     console.log(nodes.value)
   },
   {
     immediate: true,
   }
 )

</script>

<template>
  <div>
    <h3>ORG -> HTML</h3>
    <div class="columns-2">
      <textarea
        v-model="source"
        class="w-full p-2 rounded bg-yellow-50 text-left align-text-top"
      />
      <div class="w-full p-2 rounded bg-teal-300 text-left">
        <OrgContentNode :nodes="nodes" />
      </div>
    </div>
  </div>
</template>

<style scoped>
div.columns-2 > .w-full {
  min-height: 70vh;
}
</style>
