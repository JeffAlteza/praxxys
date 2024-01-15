<!-- src/components/ProductList.vue -->

<template>
  <div class="my-4 py-20 px-40">
    <div class="flex justify-between">
      <div>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="Search by Name or Description"
          class="p-2 border mb-4 rounded-lg"
        />

        <select
          v-model="selectedCategory"
          class="p-2.5 px-4 border bg-white mb-4 ml-2 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="air">Air</option>
          <option value="water">Water</option>
          <option value="land">Land</option>
        </select>
      </div>
      <div>
        <a
          href="/admin/product-form"
          class="bg-amber-500 text-white p-3 rounded-md hover:bg-amber-600"
        >
          Create Product
        </a>
      </div>
    </div>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Description</th>
          <th class="py-2 px-4 border-b">Date and Time</th>
          <th class="py-2 px-4 border-b">Category</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b" v-for="product in filteredProducts" :key="product.id">
          <td class="py-2 px-4 ">{{ product.name }}</td>
          <td class="py-2 px-4 ">{{ product.description }}</td>
          <td class="py-2 px-4 ">{{ product.date_and_time }}</td>
          <td class="py-2 px-4 ">{{ product.category }}</td>
          <td class="py-2 px-4  flex items-center gap-2 ">
            <router-link
              :to="{ name: 'product-form', query: { productId: JSON.stringify(product.id) } }"
              class="bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600"
            >
              Update
            </router-link>
            <button
              @click="removeProduct(product.id)"
              class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import ProductForm from "./ProductForm.vue";

export default {
  name: "ProductList",
  data() {
    return {
      searchKeyword: "",
      selectedCategory: "",
      products: [],
      product: {
        id: "",
        name: "",
        description: "",
        date_and_time: "",
        category: "",
      },
    };
  },
  created() {
    this.ProductLoad();
  },
  computed: {
    filteredProducts() {
      let filtered = this.products;

      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(keyword) ||
            product.description.toLowerCase().includes(keyword)
        );
      }

      if (this.selectedCategory) {
        filtered = filtered.filter(
          (product) => product.category === this.selectedCategory
        );
      }

      return filtered;
    },
  },
  methods: {
    ProductLoad() {
      var page = domain + "/api/products";
      axios.get(page).then(({ data }) => {
        console.log(data);
        this.products = data;
      });
    },
    async removeProduct(productId) {
      try {
        const response = await axios.delete(
          domain + `/api/products/${productId}`
        );
        window.alert(response.data.message);
        window.location.reload();
      } catch (error) {
        console.error("Error removing product:", error);
      }
    },
  },
  components: {
    ProductForm,
  },
};
</script>
