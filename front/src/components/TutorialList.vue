<script setup>
import { computed } from "vue";
import { useTutorials } from "../store";

const tutorialStore = useTutorials();

const tutorials = computed(() => {
  return tutorialStore.getAllTutorials;
});

const selectedTutorial = computed(() => {
  return tutorialStore.currentTutorialId;
});

const tutorialSelected = (tutorialId) => {
  if (tutorialStore.currentTutorialId === tutorialId) {
    tutorialStore.selectTutorial(null);
  } else {
    tutorialStore.selectTutorial(tutorialId);
  }
};

const massDeleteTutorials = () => {
  tutorialStore.deleteAllTutorials();
};
</script>

<template>
  <div class="col-6">
    <h2>Tutorials</h2>
    <hr />
    <div class="list-group" v-if="tutorials && tutorials.length">
      <button
        v-for="tutorial in tutorials"
        :key="tutorial.id"
        @click="tutorialSelected(tutorial.id)"
        type="button"
        class="list-group-item list-group-item-action"
        :class="tutorial.id == selectedTutorial ? 'active' : ''"
        aria-current="true"
      >
        {{ tutorial.title }}
      </button>
    </div>
    <button
      @click="massDeleteTutorials"
      class="btn btn-sm btn-outline-danger m-3"
    >
      Eliminar todos
    </button>
  </div>
</template>

<style scoped></style>
