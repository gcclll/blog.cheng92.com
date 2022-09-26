<script lang="ts" setup>
const [classList] = useClassNames()

onUpdated(() => {
  console.log({ isDark })
})
</script>

<template>
  <!-- 可以随机背景图 image="https://picsum.photos/1920/1080?random" -->
  <v-app-bar color="primary" density="compact">
    <!-- 背景色 -->
    <template #image>
      <v-img :gradient="classList.bar.bgBlue" />
    </template>
    <template #prepend>
      <v-app-bar-nav-icon />
    </template>
    <v-app-bar-title>My Blog</v-app-bar-title>
    <template #append>
      <!-- 搜索按钮 -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- 收藏按钮 -->
      <v-btn icon>
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>
      <v-btn v-if="isDark" icon class="dark:hidden" @click="toggleDark()">
        <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-btn v-else icon class="hidden dark:inline" @click="toggleDark()">
        <v-icon color="blue">mdi-weather-night</v-icon>
      </v-btn>
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
