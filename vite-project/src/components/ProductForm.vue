<template>
  <div class="container mx-auto py-10">
    <h2 class="text-2xl font-semibold mb-4">{{ formTitle }}</h2>
    <form @submit.prevent="handleSubmit" class="max-w-xl mx-auto bg-white p-8 rounded-lg">
      <div class="mb-4">
        <label for="productName" class="block text-gray-800 text-sm font-bold mb-2">Name</label>
        <input v-model="productName" type="text" id="productName" name="productName" class="w-full p-3 border rounded-lg" required>
      </div>
      <div class="mb-4">
        <label for="productDescription" class="block text-gray-800 text-sm font-bold mb-2">Description</label>
        <textarea v-model="productDescription" id="productDescription" name="productDescription" class="w-full p-3 border rounded-lg" required></textarea>
      </div>
      <div class="mb-4">
        <label for="productDateTime" class="block text-gray-800 text-sm font-bold mb-2 rounded-lg">Product Datetime</label>
        <input v-model="productDateTime" type="text" id="productDateTime" name="productDateTime" class="w-full p-3 border rounded" />
      </div>
      <label for="productCategory" class="block text-gray-800 text-sm font-bold mb-2">Category</label>
      <select v-model="productCategory" id="productCategory" name="productCategory" class="mb-4 bg-white border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
        <option value="air">Air</option>
        <option value="water">Water</option>
        <option value="land">Land</option>
      </select>
      <div class="flex items-center justify-end gap-2">
        <a href="/product-list" class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-lg">
          Cancel
        </a>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          {{ buttonLabel }}
        </button>
      </div>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {

  data() {
    return {
      productName: '',
      productDescription: '',
      productCategory: '',
      productDateTime: '',
    };
  },

  computed: {
    formTitle() {
      return this.$route.query.productId ? "Update Product" : "Create a New Product";
    },

    buttonLabel() {
      return this.$route.query.productId ? "Update" : "Save";
    },
  },
  created() {
    if (this.$route.query.productId) {
      this.fetchProductDetails(this.$route.query.productId);
    }
  },
  watch: {
    $route: {
      handler(route) {
        if (route.query.productId) {
          this.fetchProductDetails(route.query.productId);
        }
      },
      immediate: true,
    },
  },

  methods: {
    async fetchProductDetails(productId) {
      try {
        const response = await axios.get(`http://praxxys.test/api/products/${productId}`);
        const product = response.data;
        this.productName = product.name;
        this.productDescription = product.description;
        this.productCategory = product.category;
        this.productDateTime = product.date_and_time;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    },

    async handleSubmit() {
      if (this.$route.query.productId) {
        await this.updateProduct();
      } else {
        await this.createProduct();
      }
    },

    async createProduct() {
      try {
        const response = await axios.post('http://praxxys.test/api/products', {
          name: this.productName,
          description: this.productDescription,
          category: this.productCategory,
          date_and_time: this.productDateTime,
        });

        console.log(response.data);
        window.alert('Product created successfully');
        this.$router.push({ path: "/product-list" });
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },

    async updateProduct() {
      try {
        const response = await axios.put(`http://praxxys.test/api/products/${this.$route.query.productId}`, {
          name: this.productName,
          description: this.productDescription,
          category: this.productCategory,
          date_and_time: this.productDateTime,
        });

        console.log(response.data);
        window.alert('Product updated successfully');
        this.$router.push({ path: "/product-list" });
      } catch (error) {
        console.error('Error updating product:', error);
      }
    },
  },
};
</script>
  
  <style>
  </style>
  