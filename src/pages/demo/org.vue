<script lang="ts" setup>
 import { baseParse } from 'org-file-parser-with-js'
 const source = ref(`* header1

* empasis text

*bold*, /italic/, +line through+, _underline_

* special emphasis text

!!text!! !@text!@ !%text!% !&text!&

@!text@! @@text@@ @%text@% @&text@&

%!text%! %@text%@ %%text%% %&text%&

&!text&! &@text&@ &%text&% &&text&&

`)
 const nodes = ref([])

 watch(source, (value: string) => {
   nodes.value = baseParse(value)
   console.log(nodes.value, 111)
 }, {
   immediate: true
 })
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
        <OrgContentNode v-for="(node, i) in nodes"  :key="i" :data="node" />
      </div>
    </div>
  </div>
</template>

<style scoped>
div.columns-2 > .w-full {
  min-height: 70vh;
}
</style>
