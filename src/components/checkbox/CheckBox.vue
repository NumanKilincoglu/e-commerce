<template>
    <label :class="['checkbox', { checked: isChecked }]">
        <input type="checkbox" v-model="isChecked" />
        <span class="checkbox-custom"></span>
        <span class="label-text">
            <slot></slot>
        </span>
    </label>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    }
});

const isChecked = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

watch(isChecked, (newValue) => {
    emit('update:modelValue', newValue);
});
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
    border-radius: 4px;
    background-color: white;
    transition: background-color 0.2s;
    margin-right: 8px;
}

.checkbox.checked .checkbox-custom {
    background-color: #007BFF;
}

.checkbox.checked .checkbox-custom:before {
    content: '✔';
    color: white;
    display: block;
    text-align: center;
    line-height: 20px;
}

.label-text {
    font-size: 16px;
    color: #333;
}
</style>