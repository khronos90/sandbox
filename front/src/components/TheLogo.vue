<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  src: {
    type: String,
  },
});
</script>

<template>
  <a class="navbar-brand" href="#">
    <img
      v-if="src"
      :src="src"
      width="30"
      height="30"
      class="d-inline-block align-top"
      :alt="title"
    />
    {{ title }}
  </a>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -100px;
}
</style>
