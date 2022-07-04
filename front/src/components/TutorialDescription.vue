<script setup>
import { computed } from "vue";
import { useTutorials } from "../store";

const tutorialStore = useTutorials();

const tutorial = computed(() => {
  return tutorialStore.tutorial;
});
</script>

<template>
  <div class="col-6">
    <h2>Tutorial</h2>
    <hr />

    <div class="row" v-if="tutorial">
      <div>
        <strong>Título: </strong>
        <span>{{ tutorial.title }}</span>
      </div>
      <div>
        <strong>Descripción: </strong>
        <span>{{ tutorial.description }}</span>
      </div>
      <div>
        <strong>Estado: </strong>
        <span>{{ tutorial.published ? "Publicado" : "Oculto" }}</span>
      </div>
      <div>
        <RouterLink
          class="btn btn-warning btn-sm"
          :to="`/tutorial/${tutorial.id}`"
          >Editar</RouterLink
        >
      </div>
    </div>
    <div class="row" v-else>
      <div class="no-tutorial border-start border-primary border-3 p-2">
        Seleccion un tutorial para ver su información aquí!
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-tutorial {
  background: var(--bs-gray-100);
}
</style>
