<template>
  <label :class="['checkbox', { checked: modelValue }]">
    <input type="checkbox" :checked="modelValue" @change="onChange" />
    <span class="checkbox-custom"></span>
    <span class="label-text">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const onChange = (event) => {
  emit("update:modelValue", event.target.checked);
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox input[type="checkbox"] {
  display: none;
}
.checkbox-custom {
  width: 15px;
  height: 15px;
  border: 2px solid black;
  border-radius: 0px;
  background-color: white;
  transition: background-color 0.2s, border-color 0.2s;
  margin-right: 8px;
  position: relative;
}

.checkbox.checked .checkbox-custom {
  border-color: black;
}

.checkbox.checked .checkbox-custom::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: black;
  border-radius: 0px;
  z-index: 1;
}

.label-text {
  font-size: 14px;
  color: #333;
}
</style>
