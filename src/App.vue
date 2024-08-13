<template>
  <NavBar />
  <Cart />
  <div class="router-wrap">
    <router-view :key="$route.fullPath" v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
