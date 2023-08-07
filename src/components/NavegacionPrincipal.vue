<script setup>
import Logo from "./UI/Logo.vue"
import Link from "./UI/Link.vue";
import {useProductStore} from "../stores/products"

const product = useProductStore()

</script>
<template>
  <header class="py-8 bg-cyan-800">
    <div class="contenedor flex justify-between items-center">
      <div class="flex flex-col gap-3">
        <Logo />
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
          <h2 class="text-xl font-bold text-gray-100">Filtros:</h2>
          <div 
            v-for="category in product.categories"
            class="flex items-center gap-2" >
            <input type="radio"
              name="category"
              :value="category.id"
              class="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              :checked="product.selectCategory === category.id"
              @change="product.selectCategory = +$event.target.value"
            >
            <label class="text-gray-200">{{category.name}}</label>
          </div>
        </div>
      </div>
      <div>
        <Link to="sales">Administracion</Link>
      </div>
    </div>
  </header>
</template>
