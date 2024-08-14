import { createRouter, createWebHistory } from "vue-router";
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';

const routes = [
    {
        path: "/",
        redirect: '/products',
        component: ProductList,
        meta: {
            authRequired: false,
            transition: 'slide-right'
        },
    },
    {
        path: "/products",
        name: "products",
        component: ProductList,
        meta: {
            authRequired: false,
            transition: 'slide-right'
        },
    },
    {
        path: "/product/:id",
        name: "landing",
        component: ProductDetail,
        meta: {
            authRequired: false,
            transition: 'slide-left'
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
