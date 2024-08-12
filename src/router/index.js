import { createRouter, createWebHistory } from "vue-router";
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import store from '../store/index.js';

const routes = [
    {
        path: "/products",
        name: "products",
        component: ProductList,
        meta: {
            authRequired: false,
        },
    },
    {
        path: "/product/:id",
        name: "landing",
        component: ProductDetail,
        meta: {
            authRequired: false,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
