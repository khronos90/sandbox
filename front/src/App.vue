<script setup>
import { RouterView } from "vue-router";

import TheNav from "./components/TheNav.vue";
import MainContainer from "./components/MainContainer.vue";
</script>

<template>
  <header>
    <TheNav />
  </header>
  <MainContainer>
    <RouterView />
  </MainContainer>
</template>
