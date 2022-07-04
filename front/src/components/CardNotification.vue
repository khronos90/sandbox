<script setup>
defineProps({
  borderColor: {
    type: String,
    default: "",
    validator(borderValue) {
      if (borderValue) {
        return [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "info",
          "light",
          "dark",
          "white",
        ].includes(borderValue);
      } else return true;
    },
  },
});
</script>

<template>
  <div class="card" :class="`border-${borderColor}`">
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
