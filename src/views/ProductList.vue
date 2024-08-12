<template>
  <div class="product-page">
    <div class="left-field">
      <div class="filter-bar">
        <div @click="toggleCategories" class="accordion-wrap">
          <h3>Categories</h3>
          <h5>{{ isOpen ? '▲' : '▼' }}</h5>
        </div>
        <transition name="fade">
          <div v-if="isOpen" class="category-group">
            <CheckBox v-for="(item, index) in checks" :key="index" v-model="item.isChecked">
              {{ item.name }}
            </CheckBox>
          </div>
        </transition>


      </div>
    </div>
    <div class="right-field">
      <SearchBar :holder="'Search for products...'" @handleSearch="handleSearch"></SearchBar>

      <div class="product-grid">
        <transition-group name="grid" tag="div" class="grid-container">
          <ProductCard v-for="(item, index) in items" :item="item" :key="index"></ProductCard>
        </transition-group>
      </div>
      <div class="page_row py-3 f align-center">
        <PaginationRow :numbers="pageNumbers" @move-page="movePage" :pageNumber="currentPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductService from '../services/productService.js';

let items = ref([]);
let checks = ref([]);
let currentPage = ref(1);
let pageNumbers = ref([1, 2, 3, 4, 5, 6]);
const isOpen = ref(true);

const toggleCategories = () => {
  isOpen.value = !isOpen.value;
};

const getCategories = async () => {
  const response = await ProductService.getCategories();

  if (!response) return;

  checks.value = response.map(e => ({
    slug: e.slug,
    name: e.name,
    url: e.url,
    isChecked: false
  }));
};

const getItems = async () => {
  items.value = await ProductService.getAll();
};

const handleSearch = async (searchTerm) => {
  items.value = await ProductService.findProduct({ searchQuery: searchTerm });
};

const movePage = async (type, number) => {
  if (type === "left_right") {
    currentPage = Math.max(1, currentPage + number);
  }
  if (type === "normal") {
    currentPage = number;
  }

  updatePageNumbers();
};

const updatePageNumbers = () => {
  const current = currentPage;
  const maxPage = pageNumbers[pageNumbers.value.length - 1];
  const minPage = pageNumbers.value[0];

  if (currentPage > maxPage) {
    const diff = current - maxPage;
    pageNumbers.value = pageNumbers.value.map((num) => num + diff);
  } else if (currentPage < minPage) {
    const diff = minPage - current;
    pageNumbers.value = pageNumbers.value.map((num) => num - diff);
  }
}

onMounted(async () => {
  await getItems();
  await getCategories();
});
</script>

<script>
import ProductCard from "../components/cards/ProductCard.vue";
import CheckBox from "../components/checkbox/CheckBox.vue";
import SearchBar from "../components/shared/SearchBar.vue";
import PaginationRow from '../components/shared/PaginationBar.vue';

export default {
  components: {
    SearchBar,
    ProductCard,
    CheckBox,
    PaginationRow
  }
};
</script>


<style scoped>
h3,
h4,
h5 {
  color: black;
  margin: 0;
}

.product-page {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
}

.left-field {
  width: 20%;
  padding: 1rem;
  padding-top: 5rem;
}

.right-field {
  padding: 1rem;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.accordion-wrap {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border: none;
  background-color: white;
  padding: 0;
  margin-bottom: 0.8rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.category-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: white;
}


.filter-bar {
  display: flex;
  flex-direction: column;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}

.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s ease;
}

.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
