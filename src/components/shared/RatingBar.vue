<template>
  <div class="star-wrap">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: rating >= star }"
      >★</span
    >
  </div>
</template>

<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped>
.star-wrap {
  display: inline-flex;
  font-size: 1.5rem;
  color: #ddd;
}

.star {
  margin-right: 2px;
}

.star.filled {
  color: #F7C000;
}
</style>
