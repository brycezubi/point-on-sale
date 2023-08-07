<script setup>
import Link from "@/components/UI/Link.vue";
import Product from "@/components/Product.vue";
import { useProductStore } from "@/stores/products";

const products = useProductStore();
</script>
<template>
  <div>
    <Link to="new-product">Nuevo Producto</Link>
  </div>
  <h1 class="text-4xl text-center font-semibold my-10">Productos</h1>

  <p class="text-center text-2xl text-red-500 font-medium" v-if="products.noResults">No Tenemos Resultados</p>

  <ul
    role="list"
    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
  >
    <Product
      v-for="product in products.productsCollection"
      :key="product.id"
      v-bind:product="product"
    />
  </ul>
</template>
