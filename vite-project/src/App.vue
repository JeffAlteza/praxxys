<script setup>
import Sidebar from "./components/Sidebar.vue";
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
    try {
        const productsResponse = await axios.get(
            "http://praxxys.test/api/products"
        );

        products.value = productsResponse.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});
</script>

<template>
    <div class="flex ">
        <Sidebar />
        <!-- <div class="p-10 lg:px-20 "> -->
          <RouterView />
            <!-- <ProductList :products="products" /> -->
            <!-- <ProductForm /> -->
        <!-- </div> -->
    </div>
</template>