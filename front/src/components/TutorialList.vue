<script setup>
import { computed } from "vue";
import { useTutorials } from "../store";
import TutorialListItem from "./TutorialListItem.vue";

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
      <TutorialListItem
        v-for="tutorial in tutorials"
        :key="tutorial.id"
        :title="tutorial.title"
        :id="tutorial.id"
        :selected="selectedTutorial"
        :onTutorialSelection="tutorialSelected"
      >
        <template v-slot="slotProps"> {{ slotProps.title }}</template>
      </TutorialListItem>
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
