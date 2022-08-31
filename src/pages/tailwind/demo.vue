<script lang="ts" setup>
 import classnames from 'classnames'
 const items = reactive(['bg-red', 'p-8', 'p-10' ,'bg-neutral-200'])
 const selectedItems = ref(['bg-red', 'p-8'])

 const clsList = computed(() => {
   return classnames(selectedItems.value)
 })
</script>

<template>
  <h3 class="text-center pb-5">Tailwind CSS Demo</h3>
  <v-row>
    <v-col cols="6">
      <v-autocomplete
        v-model="selectedItems"
        :items="items"
        clearable
        chips
        label="Class Name"
        multiple
      ></v-autocomplete>
    </v-col>
    <v-col cols="6"> <div :class="clsList">result block</div></v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
