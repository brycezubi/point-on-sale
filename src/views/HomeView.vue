<script setup>
import { storeToRefs } from "pinia";
import NavegacionPrincipal from "@/components/NavegacionPrincipal.vue";
import { useProductStore } from "../stores/products";
import ProductCard from "../components/UI/ProductCard.vue"
import Cart from "../components/Cart.vue";

const products = useProductStore();
const { filterProducts, noResults  } = storeToRefs(products);
</script>

<template>
  <NavegacionPrincipal />
  <main class="contenedor lg:flex pt-10 h-screen">
    <section class="lg:w-2/3 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <p
        class="text-center text-3xl text-red-500 font-medium"
        v-if="noResults"
      >
        No Tenemos Resultados
      </p>

      <div v-else
        class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
      >
        <ProductCard 
          v-for="product in filterProducts"
          v-bind:product="product"
          :key="product.id"
        />
      </div>
    </section>
    <aside class="lg:w-1/3 lg:screen lg:overflow-y-scroll pt-10 pb-32 px-10">
      <Cart />
    </aside>
  </main>
</template>
