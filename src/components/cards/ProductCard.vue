<template>
  <div
    @mouseenter="showButton = true"
    @mouseleave="showButton = false"
    class="list-card"
  >
    <span class="discount">- {{ item.discountPercentage.toFixed(0) }} %</span>
    <a @click="go" class="list-card-img">
      <img class="img" :src="item.thumbnail" />
    </a>
    <div class="detail">
      <div>
        <h6>{{ item.title }}</h6>
        <div class="rating">
          <div>
            <h6>
              {{ item.rating.toFixed(1) }}
            </h6>
          </div>

          <div class="start-wrap">
            <span
              v-for="star in 5"
              :key="star"
              class="star"
              :class="{ filled: item.rating >= star }"
              >★
            </span>
          </div>
        </div>
      </div>
      <div class="f flex-column align-center fg1">
        <span class="f mid-span"> $ {{ item.price }} </span>
      </div>
    </div>
    <div v-if="showButton" class="add-cart">
      <button @click="addCart" class="add-btn">
        <h5>Add to cart</h5>
      </button>
    </div>
    <div v-else="showButton" class="add-cart"></div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isActive = ref(false);
const showButton = ref(false);

const emit = defineEmits();

const go = () => {
  emit("go-product", props.item.id);
};

const addCart = () => {
  emit("add-to-cart", props.item);
};
</script>

<style scoped>
h6,
h5 {
  margin: 0;
  color: black;
}

h5 {
  font-size: 1rem;
}

.discount {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ff0f0f;
  z-index: 3;
  border: 1px solid #ff0f0f;
  font-size: 11px;
  padding: 0.1rem 0.3rem;
  border-radius: 1px;
}

.add-cart {
  display: flex;
  height: 35px;
  width: 100%;
}

.add-btn {
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 1px solid rgb(152, 152, 152);
}

.add-btn:hover {
  transition: 0.3s;
  background-color: #0d0d0e;
  cursor: pointer;
}

.add-btn:hover h5 {
  transition: 0.3s;
  color: white;
}

p {
  margin-bottom: 0px;
}

.mid-span {
  font-size: 13px;
  color: black;
}

.list-card {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  position: relative;
  border: 1px solid transparent;
  padding: 0.2rem 0.3rem;
  border-radius: 4px;
}

.list-card:hover {
  transition: 0.3s;
  border-color: rgb(175, 175, 175);
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  text-align: start;
  width: 100%;
  min-height: 20px;
}

.start-wrap {
  display: flex;
  align-items: center;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
}

.star {
  color: #ddd;
  font-size: 20px;
  margin: 0 1px;
}

.star.filled {
  color: #f39c12;
}

a {
  text-decoration: none;
  cursor: pointer;
}

.list-card-img {
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  background-color: #f9f9f9;
}

.img {
  min-width: 100%;
  max-width: 100%;
  min-height: 180px;
  height: auto;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
}

.list-card__img {
  margin-top: 0;
}

.img-market {
  height: 25px;
  width: 25px;
  max-width: 25px;
  min-width: 25px;
}

.sell-card-title {
  line-height: 20px;
}

.list-card__title {
  padding: 0 5px;
}

.list-card__title {
  display: block;
  margin-top: 2px;
  font-weight: 600;
  font-size: 15px;
  line-height: 25px;
  color: #fff;
  text-align: center;
  -webkit-transition: 0.5s;
  -o-transition: 0.5s;
  transition: 0.5s;
}

@media screen and (min-width: 1100px) {
}

@media only screen and (min-width: 576px) and (max-width: 1100px) {
}

@media screen and (max-width: 576px) {
  .sell_card {
    height: 100%;
  }

  .mid-span {
    font-size: 16px;
  }

  p {
    font-size: 16px;
  }
}
</style>
