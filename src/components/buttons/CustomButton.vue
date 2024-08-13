<template>
  <button
    @click="props.onClick"
    class="generic-button"
    :style="{ backgroundColor: currentColor }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
  <slot />
  </button>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: "white",
  },
  hoverColor: {
    type: String,
    default: "#0d0d0e",
  },
});

const currentColor = ref(props.backgroundColor);

const handleMouseEnter = () => {
  currentColor.value = props.hoverColor;
};

const handleMouseLeave = () => {
  currentColor.value = props.backgroundColor;
};
</script>

<style scoped>
.generic-button {
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgb(152, 152, 152);
  transition: background-color 0.2s;
  cursor: pointer;
}

.generic-button {
  transition: color 0.2s;
}

.generic-button:hover {
  color: white;
}
</style>
