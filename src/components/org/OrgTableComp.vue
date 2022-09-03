<script lang="ts" setup>
import { type OrgTableNode, OrgNodeTypes } from '~/utils/parser'

const props = withDefaults(
  defineProps<{
    data: OrgTableNode
  }>(),
  {
    data: {
      type: OrgNodeTypes.TABLE,
      nodes: [],
      columns: [], // caption
      name: '',
    },
  },
)

const columns = computed(() => props.data.columns?.length ?? 0)

onUpdated(() => {
  console.log(props.data, 'org table node')
})
</script>

<template>
  <div class="gl-org-table">
    <v-table>
      <thead>
        <tr>
          <th v-for="(col, i) in data.columns" :key="i">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(node, i) in data.nodes" :key="i">
          <td v-for="val in columns" :key="val">{{ node[val - 1] }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style lang="scss" scoped></style>
