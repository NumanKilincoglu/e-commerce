<template>
  <div class="custom-dropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      {{ selectedOption.name || "Select sorting option" }}
      <span class="dropdown-arrow"></span>
    </button>
    <div v-if="isOpen" class="custom-dropdown-menu">
      <div
        v-for="option in options"
        :key="option.sortBy + '-' + option.order"
        class="custom-dropdown-item"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedOption = ref(
  props.options.find(
    (option) =>
      option.sortBy === props.modelValue.sortBy &&
      option.order === props.modelValue.order
  ) || {}
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit("update:modelValue", option);
  isOpen.value = false;
};
</script>

<style scoped>
.custom-dropdown {
  position: relative;
  display: inline-block;
  z-index: 999;
}

.dropdown-button {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  min-width: 145px;
}

.dropdown-button:hover {
  transition: 0.3s;
  border-color: rgb(98, 98, 98);
}

.custom-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-width: 300px;
  padding: 0.2rem;
}

.custom-dropdown-menu .custom-dropdown-item {
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
}

.custom-dropdown-menu .custom-dropdown-item:hover {
  background-color: #f1f1f1;
}

.dropdown-button:hover .dropdown-arrow {
  transform: rotate(-135deg);
}

@media screen and (max-width: 576px) {
  .dropdown-button {
    min-width: 120px;
    padding: 0px 5px;
    font-size: 10px;
    height: 40px;
  }

  .custom-dropdown-menu .custom-dropdown-item {
    font-size: 10px;
  }
}
</style>
