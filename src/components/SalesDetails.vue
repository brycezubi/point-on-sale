<script setup>
import { formatCurrency } from "../helpers/index";
import Amount from "./UI/Amount.vue";

defineProps({
  sale: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <article class="border-t border-gray-200 space-y-6 py-6">
    <h2 class="text-2xl font-semibold">Detalles de Venta:</h2>
    <p class="text-xl font-semibold text-gray-500">Productos Vendidos:</p>

    <ul
      role="list"
      class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      <li
        v-for="item in sale.cart"
        class="flex space-x-4 py-6"
      >
        <img
          :src="item.image"
          :alt="'Imagen de ' + item.name"
          class="w-20 h-20 flex-none rounded-lg object-cover"
        />
        <div class="flex-auto">
          <h2 class="text-gray-900">{{ item.name }}</h2>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Cantidad: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>
    <dl class="space-y-5 border-gray-200 pt-6 text-sm font-medium">
      <Amount>
        <template #label> Subtotal: </template>
        {{ formatCurrency(sale.subtotal) }}
      </Amount>
      <Amount>
        <template #label> Impuestos: </template>
        {{ formatCurrency(sale.igv) }}
      </Amount>
      <Amount v-if="sale.discount" class="bg-green-300 py-1">
        <template #label> Descuento: </template>
        {{ formatCurrency(sale.discount) }}
      </Amount>
      <Amount>
        <template #label> Total Pagado: </template>
        {{ formatCurrency(sale.total) }}
      </Amount>
    </dl>
  </article>
</template>
