<script setup>
import { useTutorials } from "../store";

const tutorialStore = useTutorials();
let searchValue = "";

const handleInputChange = (event) => {
  searchValue = event.target.value;
};

const handleSearch = () => {
  tutorialStore.setFilter({ title: searchValue });
};
</script>

<template>
  <form class="form" @submit.stop.prevent="handleSearch">
    <div class="input-group mb-3">
      <input
        :value="searchValue"
        @input="handleInputChange"
        type="text"
        class="form-control"
        placeholder="Buscar por título"
        aria-label="Buscar por título"
        aria-describedby="button-addon2"
      />
      <button type="submit" class="btn btn-outline-primary" id="button-addon2">
        Buscar
      </button>
    </div>
  </form>
</template>

<style scoped></style>
