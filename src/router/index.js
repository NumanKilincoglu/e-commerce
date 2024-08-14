import { createRouter, createWebHistory } from "vue-router";
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Login from '../views/Login.vue';
import { useUserStore } from '../store/userStore.js';

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
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
        name: "product",
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


//Navigation guard for protecting routes
//for protecting routes we can change the (meta.authRequired tag to true)
//For now authRequired=false for all routes
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const isAuthenticated = userStore.isAuthenticated;

    if (to.meta.authRequired && !isAuthenticated) {
        alert('You are not allowed to visit this page. Please login first!');
        userStore.logout();
        next('/'); // redirect to login
    } else {
        next(); // contrinue
    }

});

export default router;
