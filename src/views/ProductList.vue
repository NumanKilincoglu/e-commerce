<template>
  <div class="product-page">
    <div class="left-field">
      <div class="filter-bar">
        <h4>Filters</h4>
        <div
          @click="productStore.isCategoryOpen = !productStore.isCategoryOpen"
          class="accordion-wrap"
        >
          <h5>Category</h5>
          <span class="accordion-btn">{{
            productStore.isCategoryOpen ? "▲" : "▼"
          }}</span>
        </div>
        <transition name="fade">
          <div
            v-if="
              productStore.isCategoryOpen && productStore.categories.length > 0
            "
            class="category-group"
          >
            <CheckBox
              v-for="(item, index) in productStore.categories"
              :key="index"
              v-model="item.isChecked"
              @update:modelValue="
                (newValue) => onCategoryChange(newValue, index)
              "
            >
              {{ item.name }}
            </CheckBox>
          </div>
        </transition>

        <div
          @click="productStore.isPriceOpen = !productStore.isPriceOpen"
          class="accordion-wrap"
        >
          <h5>Price</h5>
          <h5>{{ productStore.isPriceOpen ? "▲" : "▼" }}</h5>
        </div>
        <transition name="fade">
          <div v-if="productStore.isPriceOpen" class="category-group">
            <CheckBox
              v-for="(item, index) in productStore.priceFilters"
              :key="index"
              :modelValue="item.isChecked"
              @update:modelValue="
                (newValue) => onPriceFilterChange(newValue, index)
              "
            >
              {{ item.name }}
            </CheckBox>
          </div>
        </transition>
      </div>
    </div>
    <div class="right-field">
      <div class="filter-wrap">
        <div class="search-wrap">
          <SearchBar
            :holder="'Search for products...'"
            @handleSearch="handleSearch"
          ></SearchBar>
        </div>
        <div class="drop-wrap">
          <Dropdown
            :options="productStore.dropdownOptions"
            v-model="productStore.selectedSorting"
          />
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <h5>
          {{ productStore.items.length }} of
          {{ productStore.productCount }} Products
        </h5>
        <button class="modal-button" @click="openModal">
          <VueIcon icon="mdi:filter-outline" width="20px" color="#BB3636">
          </VueIcon>
        </button>
      </div>

      <div class="product-grid">
        <transition-group name="grid" tag="div" class="grid-container">
          <ProductCard
            v-for="(item, index) in productStore.items"
            v-if="
              !productStore.loading &&
              productStore.items &&
              productStore.items.length > 0
            "
            :item="item"
            :key="item.id"
            @addToCart="addToCard"
            @go-product="goProductPage"
          ></ProductCard>
        </transition-group>
        <div class="grid-container">
          <ShimmerCard
            v-if="productStore.loading"
            v-for="n in productStore.filters.limit"
            :key="n"
          ></ShimmerCard>
        </div>
        <div
          class="empty-field"
          style="height: 150px"
          v-if="
            !productStore.loading &&
            productStore.items &&
            productStore.items.length == 0
          "
        >
          <h5>Items Not Found. Please try again</h5>
          <VueIcon height="30px" color="black" icon="mingcute:sad-line" />
        </div>
      </div>

      <div class="pagination-bar">
        <PaginationRow
          :numbers="productStore.pageNumbers"
          @move-page="movePage"
          :pageNumber="productStore.filters.page"
        />
      </div>
    </div>
  </div>

  <div>
    <div v-if="isModalOpen" class="overlay" @click="closeModal"></div>
    <transition name="slide-up">
      <div v-if="isModalOpen" class="mobile-modal">
        <div class="modal-header">
          <h5>Filters</h5>
          <button @click="closeModal" class="close-modal-btn">X</button>
        </div>

        <div class="filter-bar">
          <div
            @click="productStore.isCategoryOpen = !productStore.isCategoryOpen"
            class="accordion-wrap"
          >
            <h6>Category</h6>
            <span class="accordion-btn">{{
              productStore.isCategoryOpen ? "▲" : "▼"
            }}</span>
          </div>
          <transition name="fade">
            <div
              v-if="
                productStore.isCategoryOpen &&
                productStore.categories.length > 0
              "
              class="category-group"
            >
              <CheckBox
                v-for="(item, index) in productStore.categories"
                :key="index"
                v-model="item.isChecked"
                @update:modelValue="
                  (newValue) => onCategoryChange(newValue, index)
                "
              >
                {{ item.name }}
              </CheckBox>
            </div>
          </transition>

          <div
            @click="productStore.isPriceOpen = !productStore.isPriceOpen"
            class="accordion-wrap"
          >
            <h6>Price</h6>
            <h6>{{ productStore.isPriceOpen ? "▲" : "▼" }}</h6>
          </div>
          <transition name="fade">
            <div v-if="productStore.isPriceOpen" class="category-group">
              <CheckBox
                v-for="(item, index) in productStore.priceFilters"
                :key="index"
                :modelValue="item.isChecked"
                @update:modelValue="
                  (newValue) => onPriceFilterChange(newValue, index)
                "
              >
                {{ item.name }}
              </CheckBox>
            </div>
          </transition>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, watch, ref } from "vue";
import { useCartStore } from "../store/cartStore";
import { useProductStore } from "../store/productStore";

const productStore = useProductStore();
const cart = useCartStore();
const router = useRouter();
let timeout;

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Limits API requests while searching by debouncing the input
const handleSearch = async (searchTerm) => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await productStore.findProductByName(searchTerm);
  }, 750);
};

//goes product detail page by itemID
const goProductPage = (itemID) => {
  if (!itemID) return false;
  router.push({ path: `/product/${itemID}` });
};

const addToCard = (item) => {
  if (!item) return;
  item = { ...item, quantity: 1 };
  cart.addItem(item);
};

//Moves to a specific page or navigates left/right between pages.
const movePage = async (type, number) => {
  if (type === "left_right") {
    productStore.filters.page = Math.max(1, productStore.filters.page + number);
  }
  if (type === "normal") {
    productStore.filters.page = number;
  }

  updatePageNumbers();
  await productStore.getItems();
};

// Updates the visible page numbers based on the current page.
const updatePageNumbers = () => {
  const current = productStore.filters.page;
  const maxPage = productStore.pageNumbers[productStore.pageNumbers.length - 1];
  const minPage = productStore.pageNumbers[0];

  if (current > maxPage) {
    const diff = current - maxPage;
    productStore.pageNumbers = productStore.pageNumbers.map(
      (num) => num + diff
    );
  } else if (current < minPage) {
    const diff = minPage - current;
    productStore.pageNumbers = productStore.pageNumbers.map(
      (num) => num - diff
    );
  }
};

//Handles changes to the price filter.
const onPriceFilterChange = (newValue, index) => {
  if (newValue) {
    productStore.priceFilters.forEach((filter, i) => {
      filter.isChecked = i === index;
    });

    const selected = productStore.priceFilters[index];
    productStore.filters.priceFrom = selected.min;
    productStore.filters.priceTo = selected.max;
  } else {
    productStore.priceFilters[index].isChecked = false;
    productStore.filters.priceFrom = null;
    productStore.filters.priceTo = null;
  }

  productStore.filterByPrice();
};

//Handles changes to the category filter.
const onCategoryChange = async (newValue, index) => {
  if (newValue) {
    productStore.categories.forEach((filter, i) => {
      filter.isChecked = i === index;
    });

    const selected = productStore.categories[index];
    productStore.filters.category = selected.slug;
  } else {
    productStore.categories[index].isChecked = false;
    productStore.filters.category = null;
  }
  await productStore.getItems();
};

//watches for changes on sorting dropdown
watch(
  () => productStore.selectedSorting,
  async (newValue) => {
    productStore.filters.sortBy = newValue.sortBy || "price";
    productStore.filters.order = newValue.order || "asc";
    await productStore.getItems();
  },
  { deep: true }
);

onMounted(async () => {
  await productStore.getCategories();
  await productStore.getItems();
});
</script>

<script>
import ProductCard from "../components/cards/ProductCard.vue";
import CheckBox from "../components/checkbox/CheckBox.vue";
import SearchBar from "../components/shared/SearchBar.vue";
import PaginationRow from "../components/shared/PaginationBar.vue";
import Dropdown from "../components/dropdowns/SortDropdown.vue";
import GenericButton from "../components/buttons/CustomButton.vue";
import ShimmerCard from "../components/cards/ShimmerCard.vue";
export default {
  components: {
    SearchBar,
    ProductCard,
    CheckBox,
    PaginationRow,
    Dropdown,
    GenericButton,
    ShimmerCard,
  },
};
</script>

<style scoped>
h3,
h4,
h5 {
  color: black;
  margin: 0;
}

h5 {
  font-size: 1rem;
}

.empty-field {
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-height: 70vh;
}

.right-field {
  min-height: 70vh;
  padding: 1rem;
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.search-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.product-grid {
  min-height: 70vh;
}

.drop-wrap {
  width: auto;
}

.filter-wrap {
  display: flex;
  justify-content: space-between;
}

.accordion-wrap {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border: none;
  background-color: white;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgb(175, 175, 175);
}

.pagination-bar {
  display: flex;
  justify-content: center;
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
  gap: 0.5rem;
}

.modal-button {
  display: none;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}

.grid-enter-active,
.grid-leave-active {
  transition: opacity 0.5s;
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
}

@media screen and (max-width: 768px) {
  .product-page {
    flex-direction: column;
  }

  .right-field {
    width: 100%;
  }

  .left-field {
    display: none;
  }

  .grid-container {
    display: grid;
    grid-gap: 10px;
  }

  .filter-wrap {
    gap: 5px;
  }

  .search-wrap {
    display: flex;
  }

  .drop-wrap {
    width: 140px;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    align-items: center;
  }

  .mobile-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 400px;
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 30px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }

  .modal-body {
    padding: 10px 0;
  }

  .modal-footer {
    text-align: right;
  }

  .close-modal-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .apply-btn {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }

  .modal-button {
    display: flex;
    background-color: transparent;
    border: none;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
}
</style>
