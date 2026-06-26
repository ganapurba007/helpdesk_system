<script setup>
import Nav from "./components/Nav.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <Nav />

  <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
    <RouterView />
  </main>
</template>

<style scoped></style>
