<script setup>
import TutorialList from "../components/TutorialList.vue";
import TutorialDescription from "../components/TutorialDescription.vue";
import { useTutorials } from "../store";
import { computed, onMounted } from "vue";
import SearchBar from "./SearchBar.vue";
import CardNotification from "./CardNotification.vue";

const tutorialsStore = useTutorials();

const tutorials = computed(() => {
  return tutorialsStore.getAllTutorials;
});

const filter = computed(() => {
  return tutorialsStore.getFilter;
});

const clearFilter = () => {
  tutorialsStore.setFilter(null);
};

onMounted(() => {
  tutorialsStore.fetchTutorials();
});
</script>

<template>
  <div class="row" v-if="tutorials && tutorials.length">
    <SearchBar />
    <div class="row">
      <TutorialList />
      <TutorialDescription />
    </div>
  </div>
  <CardNotification v-else-if="filter" :border="'border-danger'">
    <template v-slot:description>
      No se encontraron tutoriales con el título "{{ filter.title }}"
    </template>
    <template v-slot:action>
      <a @click="clearFilter" href="#">Mostrar todos</a>
    </template>
  </CardNotification>
  <CardNotification v-else>
    <template v-slot:description> No hay tutoriales aquí </template>
    <template v-slot:action>
      Comencemos por
      <RouterLink class="link-success" to="/tutorial">agregar</RouterLink>
      uno
    </template>
  </CardNotification>
</template>
