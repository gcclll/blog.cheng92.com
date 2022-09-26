<script lang="ts" setup>
import { OrgNodeTypes, buildUrlParam } from '~/utils/parser'
const [classList] = useClassNames()

const valid = ref(true)
const badge = reactive({
  type: OrgNodeTypes.BADGE,
  label: '',
  labelColor: '',
  color: '',
  message: 'test',
  logo: '',
  logoColor: '',
  messageLink: '',
  labelLink: '',
  url: '',
})

function buildBadgeUrl(badge: OrgBadgeType) {
  const url = 'https://img.shields.io/static'
  const { schemaVersion = 1, messageLink, labelLink, ...params } = badge
  const query = buildUrlParam(params as any, true)
  const leftLink = messageLink ? `&link=${messageLink}` : ''
  const rightLink = labelLink ? `&link=${labelLink}` : ''
  return `${url}/v${schemaVersion}?${query}` + leftLink + rightLink
}

function submit() {
  console.log(badge)
  badge.url = ''
  badge.url = buildBadgeUrl(badge)
}

onMounted(() => {
  submit()
})
</script>

<template>
  <v-card :class="classList.content.card">
    <v-card-text :class="classList.content.text">
      <h1>Org Badge Demo</h1>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field v-model="badge.label" label="Label" />
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="badge.labelColor" label="Label Color" />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="badge.message" label="Message" required />
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field v-model="badge.color" label="Message Color" />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field v-model="badge.messageLink" label="Message Link" />
          </v-row>
          <v-row>
            <v-text-field v-model="badge.labelLink" label="Label Link" />
          </v-row>
          <v-row>
            <v-btn type="primary" @click.prevent="submit">生成BADGE</v-btn>
          </v-row>
        </v-container>
      </v-form>

      <p>{{ badge.url }}</p>
      <OrgBadgeComp :data="badge" />
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: blog
</route>
