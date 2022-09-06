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
  <v-tooltip
    v-model="visible"
    class="gl-doc__tooltip"
    loca-gtion="top"
    activator="parent">
    <template #activator>
      <span :class="classList.docText" @click.stop="visible = !visible">
        {{ docName }}
      </span>
    </template>

    <v-card prepend-icon="mdi-note">
      <template #title>
        <h3>{{ content }}</h3>
      </template>
      <v-card-text>
        <AsyncDocComp v-bind="props" />
      </v-card-text>
    </v-card>
  </v-tooltip>
</template>

<style lang="scss" scoped>
 .gl-doc__tooltip :deep(.v-overlay__content) {
   background: none;
 }
</style>
