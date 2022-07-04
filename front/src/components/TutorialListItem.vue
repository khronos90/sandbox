<script setup>
import { ref } from "vue";

defineProps({
  title: {
    type: String,
  },
  id: {
    type: String,
  },
  selected: {
    type: Boolean,
  },
  onTutorialSelection: {
    type: Function,
  },
});

const active = ref(false);
</script>

<template>
  <button
    @click="onTutorialSelection(id)"
    type="button"
    class="list-group-item list-group-item-action"
    :class="id === selected ? 'active' : ''"
    :aria-current="active"
  >
    <slot :title="title"> </slot>
  </button>
</template>
