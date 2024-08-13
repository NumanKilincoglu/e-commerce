<template>
  <div class="pagination">
    <a @click="movePage('left_right', -1)" class="previous">
      <VueIcon icon="mdi:arrow-left" width="20px" color="black" />
    </a>
    <a
      v-for="(item, index) in numbers"
      :key="index"
      @click="movePage('normal', item)"
      class="btn"
      :class="{ active: pageNumber === item }"
      >{{ item }}</a
    >
    <a @click="movePage('left_right', 1)" class="next">
      <VueIcon icon="mdi:arrow-right" width="20px" color="black" />
    </a>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "PaginationRow",
  props: {
    pageNumber: {
      type: Number,
      required: true,
    },
    numbers: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const movePage = (direction, value) => {
      emit("movePage", direction, value);
    };

    const isActive = computed(() => props.pageNumber);

    return {
      movePage,
      isActive,
    };
  },
});
</script>

<style scoped>
.pagination {
  text-align: center;
  display: flex;
  gap: 2px;
}

.pagination a {
  font-family: "Open Sans", sans-serif;
  color: white;
  height: 40px;
  width: 40px;
  text-decoration: none;
  position: relative;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  color: black;
}

.pagination a:hover {
  border: 1px solid black;
  transition-duration: 0.1s;
  cursor: pointer;
}

.pagination a.active {
  border: 1px solid black;
  background-color: black;
  color: white;
  transition-duration: 0.1s;
}
</style>
