<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../store/auth.js";
import { useRouter } from 'vue-router'

const auth = useAuthStore();
const admin = ref({
  email: 'email',
  password: 'password',
});
const router = useRouter();

async function login() {
  try {
    await auth.login({
      email: admin.value.email,
      password: admin.value.password,
    });

    router.push('/admin/product-list');

  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
    <div class="h-screen mx-auto flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-md w-96">
              <h1 class="text-2xl font-semibold mb-4">Login</h1>
              
              <form  @submit.prevent="login" id="loginForm">
                  <div class="mb-4">
                      <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
                      <input v-model="admin.email" type="email" id="email" name="email" class="form-control mt-1 p-2 w-full border rounded-md">
                  </div>
                  
                  <div class="mb-4">
                      <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
                      <input v-model="admin.password" type="password" id="password" name="password" class="form-control mt-1 p-2 w-full border rounded-md">
                  </div>
                  
                  <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Login</button>
              </form>
          </div>
    </div>
</template>