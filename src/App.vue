<template>
  <NavBar />
  <Cart />
  <div class="router-wrap">
    <router-view :key="$route.fullPath" />
  </div>
</template>
