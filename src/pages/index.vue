<script setup lang="ts">
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = (_name?: string) => {
  if (_name) router.push('/org/demo')
  else if (name) router.push(`/hi/${encodeURIComponent(name)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t('intro.desc') }}</em>
    </p>

    <!-- bind to a data property named `code` -->
    <p>自动探测语言</p>
    <highlightjs autodetect code="var x = 5;" />
    <hr />
    <p>指定语言</p>
    <!-- or literal code works as well -->
    <highlightjs language="javascript" code="var x = 5;" />
    <div py-4 />

    <input
      id="input"
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      :aria-label="t('intro.whats-your-name')"
      type="text"
      autocomplete="false"
      p="x4 y2"
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    />
    <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>

    <div>
      <button btn m-3 text-sm :disabled="!name" @click="go">
        {{ t('button.go') }}
      </button>
      <button btn m-3 text-sm @click="go('org-demo')">ORG DEMO</button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
