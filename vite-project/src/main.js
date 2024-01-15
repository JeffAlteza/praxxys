import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./assets/style.css";
import App from "./App.vue";
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";
import LoginForm from "./components/Login.vue";
import SideBar from "./components/Sidebar.vue";
import { useAuthStore } from "./store/auth.js";
import { createPinia } from 'pinia';

window.domain = "http://praxxys.test";
const routes = [
    {
        path: "/",
        component: LoginForm,
        name: "login",
        meta: { requiresAuth: false },
    },
    {
        path: "/admin",
        name: "admin",
        component: SideBar,
        children: [
            {
                path: "product-list",
                name: "product-list",
                component: ProductList,
            },
            {
                path: "product-form",
                name: "product-form",
                component: ProductForm,
            },
        ],
        meta: { requiresAuth: true },
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const auth = useAuthStore();

    if (
        !auth.isAuthenticated() &&
        to.meta.requiresAuth
    ) {
        return { path: '/' };
    }
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount("#app");
