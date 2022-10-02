<script lang="ts" setup>
import { OrgNodeTypes, type OrgTimestampNode } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgTimestampNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.TIMESTAMP,
      timestamp: {},
    },
  },
)

const date = computed(() => {
  const {  } = props.data?.timestamp ?? {}
  return `${year}-${month}-${day}`
})
onMounted(() => {
  console.log(props.data, 'org timestamp')
})

</script>

<template>
  <span></span>
</template>
