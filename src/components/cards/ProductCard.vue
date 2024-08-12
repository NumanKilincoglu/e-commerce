<template>
  <div
    @click="go"
    @mouseenter="showButton = true"
    @mouseleave="showButton = false"
    class="list-card select_item"
  >
    <a class="list-card-img">
      <img class="img" :src="item.thumbnail" />
    </a>
    <div class="list-card__title sell-card-title"></div>
    <div class="detail">
      <div>
        <h5>{{ item.title }}</h5>
      </div>
      <div class="f flex-column align-center fg1">
        <span class="f mid-span"> $ {{ item.price }} </span>
      </div>
    </div>
    <div v-if="showButton" class="add-cart">
      <button class="add-btn">
        <h5>Add to cart</h5>
      </button>
    </div>
    <div v-else="showButton" class="add-cart"></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
      showButton: false,
    };
  },
  methods: {
    go() {
      this.$emit("go-item", this.item.name);
    },
  },
};
</script>

<style scoped>
h5 {
  margin: 0;
  color: black;
}

.add-cart {
  display: flex;
  height: 35px;
  width: 100%;
}

.add-btn {
  width: 100%;
  background-color: white;
  border-radius: 6px;
  border: 1px solid rgb(152, 152, 152);
}

.add-btn:hover {
  transition: 0.3s;
  background-color: #0242e8;
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

.list-card__price {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  line-height: 25px;
  color: #dd1b5f;
  margin-top: 10px;
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
