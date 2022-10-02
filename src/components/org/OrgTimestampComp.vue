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

onMounted(() => {
  console.log(props.data.timestamp, 'org timestamp')
})

const styles = useClassNames('timestamp')

const ts = computed(() => {
  const { time, date, week = '' } = props.data?.timestamp ?? {}
  return {
    time: `${week} ${time}`,
    date,
  }
})
</script>

<template>
  <!-- color: #AE8B2D -->
  <span :class="styles.wrapper">
    <span :class="styles.date">{{ ts.date }}</span>
    <span :class="styles.time">{{ ts.time }}</span>
  </span>
</template>
