<template>
  <div class="product-page">
    <div class="left-field">
      <div class="filter-bar"></div>
    </div>
    <div class="right-field">
      <SearchBar
        :holder="'Search for products...'"
        @handleSearch="handleSearch"
      ></SearchBar>
      <div class="product-grid">
        <ProductCard
          v-for="(item, index) in items"
          :item="item"
          :key="index"
        ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/cards/ProductCard.vue";
import SearchBar from "../components/shared/SearchBar.vue";
import ProductService from '../services/productService.js';

export default {
  data() {
    return {
        items: []
    };
  },
  methods: {
    async getItems() {
        this.items = await ProductService.getAll();
    },
    async handleSearch(searchTerm) {
        this.items = await ProductService.findProduct({searchQuery: searchTerm});
    }
  },
  async created(){
    await this.getItems();
  },
  components: {
    SearchBar,
    ProductCard,
  },
};
</script>

<style scoped>
.product-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}

.left-field {
  width: 20%;
}

.right-field {
  padding: 1rem;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.filter-bar {
  display: flex;
  flex-direction: column;
  background-color: blueviolet;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}
</style>
