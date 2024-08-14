<template>
  <transition name="cart-panel">
    <div v-show="isOpen" class="cart-panel">
      <div class="header">
        <h3>Cart</h3>
        <button class="close-btn" @click="toggleCart">✕</button>
      </div>
      <div class="content">
        <div v-if="cart.items.length === 0">Cart is empty</div>
        <div v-else>
          <div v-for="item in cart.items" :key="item.id" class="item">
            <div class="d-flex gap-3">
              <div class="d-flex">
                <img
                  class="small-image"
                  :src="item.thumbnail"
                  :alt="item.title"
                />
              </div>
              <div>
                <h6>{{ item.title }}</h6>
                <div class="d-flex">
                  <span>x{{ item.quantity }} &nbsp;</span>
                  <span>${{ item.price }}</span>
                </div>
              </div>
            </div>

            <button class="close-btn" @click="removeFromCart(item.id)">
              <VueIcon
                icon="mdi:trash-can-outline"
                width="20px"
                color="#BB3636"
              >
              </VueIcon>
            </button>
          </div>
          <p>Total: ${{ cart.cartTotal.toFixed(2) }}</p>
          <div class="button-wrap">
            <GenericButton
              :backgroundColor="'white'"
              :hoverColor="'#BB3636'"
              :onClick="clearCart"
            >
              <h5>Clear Cart</h5>
            </GenericButton>
          </div>
          <div class="button-wrap">
            <GenericButton
              :backgroundColor="'white'"
              :hoverColor="'black'"
              :onClick="proceed"
            >
              <h5>Proceed to checkout</h5>
            </GenericButton>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from "vue";
import { useCartStore } from "../../store/cartStore.js";
const isOpen = ref(false);
const cart = useCartStore();

isOpen.value = cart.$state.isOpen;

const toggleCart = () => {
  cart.toggleCart();
};

const removeFromCart = (itemId) => {
  cart.removeItem(itemId);
};

const clearCart = () => {
  cart.clearCart();
};

const proceed = () => {
  cart.proceedCheckout();
};

watch(
  () => cart.isOpen,
  (newValue) => {
    isOpen.value = newValue;
  }
);
</script>

<script>
import GenericButton from "../buttons/CustomButton.vue";

export default {
  components: {
    GenericButton,
  },
};
</script>

<style scoped>
.cart-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: transform 0.3s ease;
}

.cart-panel-enter-active {
  transform: translateX(350px);
}

.cart-panel-leave-active {
  transform: translateX(0px);
}

.cart-panel .header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-panel .content {
  padding: 1rem;
  overflow-y: auto;
}

.cart-panel .close-btn {
  background: none;
  cursor: pointer;
  border: none;
  font-size: 15px;
}

.cart-panel .item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.small-image {
  width: 50px;
  height: 45px;
}

.button-wrap {
  display: flex;
  height: 30px;
  width: 100%;
  margin-block: 0.5rem;
}

h2,
h5,
h6 {
  margin: 0;
}

h5 {
  font-size: 14px;
}

@media screen and (max-width: 576px) {
  .cart-panel {
    width: 100%;
    transition: transform 0.2s ease-in;
  }
}
</style>
