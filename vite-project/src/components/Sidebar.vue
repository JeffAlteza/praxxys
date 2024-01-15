<template>
    <div
      id="view"
      class="h-full flex flex-row"
      x-data="{ sidenav: true }"
      
    >

      <div
        id="sidebar"
        class="bg-white  h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
        x-show="sidenav"
        @click.away="sidenav = false"
      >
        <div class="space-y-6 md:space-y-10 mt-10">
          <h1 class="font-bold text-4xl text-center md:hidden">
            P<span class="text-amber-500">.</span>
          </h1>
          <h1 class="hidden md:block font-bold text-sm md:text-xl text-center">
            PRAXXYS<span class="text-amber-500">.</span>
          </h1>
          <div id="menu" class="flex flex-col space-y-2">
            <a
              href="/admin/product-list"
              class="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-amber-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                class="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                ></path>
              </svg>
              <span class="">Products</span>
            </a>

          </div>
        </div>
      </div>
     
    </div>
    <RouterView />

</template>

<script>
import { RouterView } from "vue-router";

export default {
    name: "Sidebar",
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
