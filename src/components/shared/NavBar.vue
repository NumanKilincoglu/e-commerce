<template>
  <nav class="navbar">
    <div class="navbar-content">
      <div class="navbar-left">
        <a href="/products" class="navbar-logo">
          <img :src="logoUrl" alt="Logo" />
        </a>
      </div>
      <div class="navbar-right">
        <h6>
          {{ userStore.$state.isAuthenticated ? userStore.username : "" }}
        </h6>
        <div class="user-avatar" @click="goToProfile">
          <img :src="avatarUrl" alt="User Avatar" />
        </div>
        <button class="navbar-button" @click="toggleCart">
          <span class="total-cart-count">{{ cartCount }}</span>
          <VueIcon icon="mdi:cart" width="18px" color="white"></VueIcon> Cart
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import logo from "../../assets/images/logo.svg";
import { useCartStore } from "../../store/cartStore.js";
import { useUserStore } from "../../store/userStore.js";

const avatarUrl = ref("https://avatar.iran.liara.run/public");
const logoUrl = ref(logo);
const cartCount = ref(0);
const cart = useCartStore();
const userStore = useUserStore();

cartCount.value = cart.itemCount.toString();

const toggleCart = () => {
  cart.toggleCart();
};

const goToProfile = () => {
  console.log("Navigating to profile");
};

watch(
  () => cart.itemCount,
  () => {
    cartCount.value = cart.itemCount.toString();
  }
);
</script>

<style scoped>
h6 {
  margin: 0;
  color: white;
}

.navbar {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 0.6rem 2rem;
}

.navbar-content {
  display: flex;
  width: 100%;
  max-width: auto;
  justify-content: space-between;
  align-items: center;
}

.navbar-left .navbar-logo {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar-button {
  background: none;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  padding: 8px 14px;
  border-radius: 3px;
  position: relative;
}

.total-cart-count {
  align-items: center;
  background: #fff;
  border-radius: 50%;
  color: #1a1c21;
  display: flex;
  height: 25px;
  width: 25px;
  justify-content: center;
  padding: 4px;
  position: absolute;
  top: -12px;
  right: -12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media screen and (max-width: 576px) {
  .navbar {
    padding: 0.8rem 1.2rem;
  }

  .navbar-right {
    gap: 0.5rem;
  }

  .navbar-logo img {
    width: 100px;
  }

  .navbar-button {
    font-size: 0.8rem;
    padding: 4px 8px;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
  }
}
</style>
