<template>
  <div :class="['shimmer', type]" :style="{ width, height }"></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "20px",
    },
    type: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.shimmer {
  background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.shimmer.title {
  height: 30px;
  width: 60%;
  margin-bottom: 15px;
}
.shimmer.text {
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
}
.shimmer.image {
  height: 300px;
  width: 100%;
}
</style>
