<script setup>
import { useCartStore } from "../stores/cart";
import { useCouponStore } from "../stores/coupon";
import Amount from "./UI/Amount.vue";
import CouponForm from "./UI/CouponForm.vue";
import ItemCart from "./ItemCart.vue";
import { formatCurrency } from "../helpers";

const carrito = useCartStore();
const coupon = useCouponStore();
</script>
<template>
  <p
    v-if="carrito.isProducts"
    class="text-center text-gray-700 text-2xl font-semibold"
  >
    No tenemos articulos agregados al carrito
  </p>
  <div v-else>
    <h2 class="text-2xl xl:text-3xl font-bold text-gray-900 mb-8">
      Resumen de Venta
    </h2>
    <ul
      role="list"
      class="my-6 divide-y divide-gray-300"
    >
      <ItemCart
        v-for="item in carrito.cart"
        :key="item.id"
        v-bind:item="item"
      />
    </ul>
    <dl class="space-y-5 border-gray-200 pt-6 text-sm font-medium">
      <Amount>
        <template #label> Subtotal: </template>
        {{ formatCurrency(carrito.subtotal) }}
      </Amount>
      <Amount>
        <template #label> Impuestos: </template>
        {{ formatCurrency(carrito.igv) }}
      </Amount>
      <Amount v-if="coupon.isValidCoupon">
        <template #label> Descuento: </template>
        {{ formatCurrency(coupon.discount) }}
      </Amount>
      <Amount>
        <template #label> Total a Pagar: </template>
        {{ formatCurrency(carrito.total) }}
      </Amount>
    </dl>
    <CouponForm />

    <button
      type="button"
      class="mt-10 w-full bg-indigo-600 text-white hover:tracking-wider hover:bg-indigo-700 p-3 uppercase font-semibold transition-all"
      @click="carrito.checkout"
    >Confirmar Compra</button>
  </div>
</template>
