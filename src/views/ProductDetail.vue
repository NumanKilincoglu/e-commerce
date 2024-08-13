<template>
  <div v-if="product" class="product-details-content">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-5 col-md-12 d-flex flex-column justify-content-center align-items-center mb-2"
        >
          <div id="carouselControls" class="carousel slide mt-3">
            <div class="carousel-inner">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img
                  :src="image"
                  :alt="product.title"
                  class="d-block w-100 carousel-image"
                  @click="updateThumbnail(image)"
                />
              </div>
            </div>
            <button
              class="carousel-control-prev carousel-dark"
              type="button"
              data-bs-target="#carouselControls"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next carousel-dark"
              type="button"
              data-bs-target="#carouselControls"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <div class="button-wrap">
            <GenericButton
              :backgroundColor="'white'"
              :hoverColor="'black'"
              :onClick="addToCard"
            >
              <h5>Add To Cart</h5>
            </GenericButton>
          </div>
        </div>
        <div class="col-lg-7 col-md-12">
          <h3 class="mb-3">{{ product.title }}</h3>
          <p><strong></strong> {{ product.description }}</p>
          <p><strong>Category:</strong> {{ product.category }}</p>
          <p><strong>Brand:</strong> {{ product.brand }}</p>
          <p><strong>SKU:</strong> {{ product.sku }}</p>
          <p><strong>Weight:</strong> {{ product.weight }}g</p>
          <p>
            <strong>Dimensions:</strong> {{ product.dimensions.width }} x
            {{ product.dimensions.height }} x {{ product.dimensions.depth }} cm
          </p>
          <p><strong>Warranty:</strong> {{ product.warrantyInformation }}</p>
          <p>
            <strong>Shipping Information:</strong>
            {{ product.shippingInformation }}
          </p>
          <p><strong>Return Policy:</strong> {{ product.returnPolicy }}</p>
          <p>
            <strong>Minimum Order Quantity:</strong>
            {{ product.minimumOrderQuantity }}
          </p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <h3 class="mb-3">Reviews</h3>
          <div
            v-for="review in product.reviews"
            :key="review.date"
            class="review-card mb-3 p-3 border rounded shadow-sm"
          >
            <div class="d-flex align-items-center mb-2">
              <h5 class="me-2 mb-0">{{ review.reviewerName }}</h5>
              <RatingBar :rating="review.rating" class="d-inline-block" />
            </div>
            <p class="mb-2">{{ review.comment }}</p>
            <p class="text-muted mb-0">
              {{ new Date(review.date).toLocaleDateString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ProductService from "../services/productService.js";
import { useCartStore } from "../store/cartStore";
const cart = useCartStore();

const route = useRoute();
const productId = route.params.id;
const product = ref(null);
const showDetails = ref(true);

const getProductDetail = async () => {
  product.value = await ProductService.findOneProduct({ id: productId });
};

const addToCard = () => {
  if (!product) return;
  const item = { ...product.value, quantity: 1 };
  cart.addItem(item);
};

const toggleDetails = () => {
  showDetails.value = !showDetails.value;
};

onMounted(() => {
  getProductDetail();
});
</script>

<script>
import RatingBar from "../components/shared/RatingBar.vue";
import GenericButton from "../components/buttons/CustomButton.vue";
export default {
  components: {
    RatingBar,
    GenericButton,
  },
};
</script>

<style scoped>

p {
  margin-bottom: 0.8rem;
}
.button-wrap {
  display: flex;
  height: 40px;
  width: 100%;
  margin-block: 0.5rem;
}

.product-details-content h3 {
  margin-top: 1rem;
}

.carousel {
  height: 400px;
  width: 200px;
}

.carousel-image {
  cursor: pointer;
  height: 400px;
  object-fit: cover;
}
.carousel-control-next {
  margin-left: 20px;
}
.carousel-control-prev {
  margin-right: 20px;
}

.review-card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.review-card:hover {
  background-color: #e9ecef;
}

.review-card h5 {
  font-size: 1.25rem;
  font-weight: 500;
}

.review-card p {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.review-card .text-muted {
  font-size: 0.875rem;
}

.review-card .rating-bar {
  margin-right: 1rem;
}
</style>
