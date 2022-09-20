<script lang="ts" setup>
import { OrgNodeTypes, type OrgBadgeType } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgBadgeType
  }>(),
  {
    data: {
      type: OrgNodeTypes.BADGE,
      url: '',
    },
  },
)

onMounted(() => {
  console.log(props.data, 'badge')
})
</script>

<template>
  <span class="inline-block align-middle">
    <!-- 没有 url 时候使用普通的 img 就够了 -->
    <object v-if="data.messageLink || data.labelLink" :data="data.url"></object>
    <img v-else alt="" :src="data.url"/>
  </span>
</template>

<style lang="scss" scoped></style>
