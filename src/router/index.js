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

const isAuthenticated = false;

//navigation guard for protecting routes
//for protecting routes we can change the (meta.authRequired tag to true)
router.beforeEach((to, from, next) => {
    if (to.meta.authRequired && !isAuthenticated) {

        // Redirect to login or another route if not authenticated for now its /products route
        next('/products');
        alert('You are not allowed to visit this page. Please login first!')
    } else {
        next(); // Continue to route
    }
});

export default router;
