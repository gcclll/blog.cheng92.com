<script lang="ts" setup></script>

<template>
  <!-- 可以随机背景图 image="https://picsum.photos/1920/1080?random" -->
  <v-app-bar color="primary" density="compact">
    <!-- 背景色 -->
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)" />
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
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped></style>
