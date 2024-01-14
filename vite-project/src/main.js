import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/style.css'
import App from './App.vue'
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";

const routes = [
    { path: "/product-list", component: ProductList},
    { path: "/product-form",  name: "product-form", component: ProductForm},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')