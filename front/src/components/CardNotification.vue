<script setup>
defineProps({
  border: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="card" :class="border">
    <div class="card-body d-flex justify-content-center">
      <div>
        <h3>
          <slot name="description"></slot>
        </h3>
        <p>
          <slot name="action"></slot>
        </p>
      </div>
    </div>
  </div>
</template>
