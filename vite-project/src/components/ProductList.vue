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
  
          <select v-model="selectedCategory" class="p-2.5 px-4 border bg-white mb-4 ml-2 rounded-lg">
            <option value="">All Categories</option>
            <option value="air">Air</option>
            <option value="water">Water</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div>
          <a href="/product-form" class="bg-amber-500 text-white p-3 rounded-md hover:bg-amber-600">
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
                    <td class="py-2 px-4 ">
                        {{ product.description }}
                    </td>
                    <td class="py-2 px-4 ">
                        {{ product.date_and_time }}
                    </td>
                    <td class="py-2 px-4 ">{{ product.category }}</td>
                    <td class="py-2 px-4  flex items-center gap-2 ">
                            <router-link :to="{ name: 'product-form', query: { productId: JSON.stringify(product.id) } }" class="bg-blue-500 text-white p-2.5 rounded-md hover:bg-blue-600">
                                Update
                            </router-link>
                            <button @click="removeProduct(product.id)" class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                Remove
                            </button>
                </td>
                </tr>
            </tbody>
        </table>

        <div class="my-4">
            <button
                v-for="page in pageCount"
                :key="page"
                @click="setCurrentPage(page)"
                class="mx-1 p-2 border"
                :class="{ 'bg-blue-500 text-white': currentPage === page }"
            >
                {{ page }}
            </button>
        </div>
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
      currentPage: 1,
      itemsPerPage: 5,
      products: [], // Add this line to initialize products as an empty array
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
    this.ProductLoad(); // Change to this.ProductLoad()
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

      const start = (this.currentPage - 1) * this.itemsPerPage;
      return filtered.slice(start, start + this.itemsPerPage);
    },
    pageCount() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    ProductLoad() {
      var page = "http://praxxys.test/api/products";
      axios.get(page).then(({ data }) => {
        console.log(data);
        this.products = data; // Change to this.products
      });
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    async removeProduct(productId) {
      try {
        const response = await axios.delete(
          `http://praxxys.test/api/products/${productId}`
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
