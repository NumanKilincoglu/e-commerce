<template>
  <div v-if="!productStore.productLoading && productStore.product" class="product-details-content">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-5 col-md-12 d-flex flex-column justify-content-center align-items-center mb-2"
        >
          <div id="carouselControls" class="carousel slide mt-3">
            <div class="carousel-inner">
              <div
                v-for="(image, index) in productStore.product.images"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img
                  :src="image"
                  :alt="productStore.product.title"
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
          <h3 class="mb-3">{{ productStore.product.title }}</h3>
          <p><strong></strong> {{ productStore.product.description }}</p>
          <p><strong>Category:</strong> {{ productStore.product.category }}</p>
          <p><strong>Brand:</strong> {{ productStore.product.brand }}</p>
          <p><strong>SKU:</strong> {{ productStore.product.sku }}</p>
          <p><strong>Weight:</strong> {{ productStore.product.weight }}g</p>
          <p>
            <strong>Dimensions:</strong>
            {{ productStore.product.dimensions.width }} x
            {{ productStore.product.dimensions.height }} x
            {{ productStore.product.dimensions.depth }} cm
          </p>
          <p>
            <strong>Warranty:</strong>
            {{ productStore.product.warrantyInformation }}
          </p>
          <p>
            <strong>Shipping Information:</strong>
            {{ productStore.product.shippingInformation }}
          </p>
          <p>
            <strong>Return Policy:</strong>
            {{ productStore.product.returnPolicy }}
          </p>
          <p>
            <strong>Minimum Order Quantity:</strong>
            {{ productStore.product.minimumOrderQuantity }}
          </p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <h3 class="mb-3">
            Reviews ({{
              productStore?.product?.reviews
                ? productStore.product.reviews.length
                : 0
            }})
          </h3>
          <div
            v-if="
              productStore.product.reviews &&
              productStore.product.reviews.length > 0
            "
          >
            <div
              v-for="review in productStore.product.reviews"
              :key="review.reviewerName"
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
          <div v-else>
            <p class="text-muted">No reviews available for this product.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="productStore.productLoading" class="product-details-content shimmer-wrapper">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-5 col-md-12 d-flex flex-column justify-content-center align-items-center mb-2"
        >
          <ShimmerEffect
            class="button shimmer"
            height="400px"
            width="300px"
          ></ShimmerEffect>
        </div>
        <div class="col-lg-7 col-md-12">
          <ShimmerEffect class="title shimmer"></ShimmerEffect>
          <ShimmerEffect
            class="text shimmer"
            v-for="n in 6"
            :key="n"
          ></ShimmerEffect>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <ShimmerEffect class="title shimmer" width="40%"></ShimmerEffect>
          <ShimmerEffect
            class="text shimmer"
            height="80px"
            v-for="n in 3"
            :key="n"
          ></ShimmerEffect>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="empty-field" style="height: 150px">
    <h5>Items Not Found. Please try again</h5>
    <VueIcon height="30px" color="black" icon="mingcute:sad-line" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "../store/cartStore.js";
import { useProductStore } from "../store/productStore.js";
const error = ref(null);
const cart = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const productId = route.params.id;

const getProductDetail = async () => {
  await productStore.getProductDetail(productId);
};

const addToCard = () => {
  if (!productStore.product) return;
  const item = { ...productStore.product, quantity: 1 };
  cart.addItem(item);
};

onMounted(() => {
  getProductDetail();
});
</script>

<script>
import RatingBar from "../components/shared/RatingBar.vue";
import GenericButton from "../components/buttons/CustomButton.vue";
import ShimmerEffect from "../components/shimmer/ShimmerEffect.vue";

export default {
  components: {
    RatingBar,
    GenericButton,
    ShimmerEffect,
  },
};
</script>

<style scoped>
.shimmer-wrapper {
  background-color: #f6f7f8;
}

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

.empty-field {
  text-align: center;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
