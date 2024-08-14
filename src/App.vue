<template>
  <NavBar />
  <Cart />

  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div class="router-wrap" :key="route.fullPath">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>


</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
