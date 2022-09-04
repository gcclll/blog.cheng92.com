<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    docName: string
    content: string
  }>(),
  { docName: '', content: '' },
)

const visible = ref(false)
const AsyncDocComp = useDocumentation(props.content)

const [classList] = useClassNames()
</script>

<template>
  <v-tooltip v-model="visible" location="top" activator="parent">
    <template #activator>
      <span :class="classList.docText" @click="visible = !visible">{{
        docName
      }}</span></template
    >
    <AsyncDocComp v-bind="props" />
  </v-tooltip>
</template>

<style lang="scss" scoped></style>
