<script setup>
import { useCouponStore } from "../../stores/coupon";

const store = useCouponStore();
</script>
<template>
  <p class="mt-8 py-5 border-t border-gray-200 font-bold">¿Tienes un cupón?</p>

  <div class="flex" :class="[store.isValidCoupon && 'opacity-30 cursor-none' ]">
    <input
      type="text"
      placeholder="Ingresa un cupón"
      class="p-2 bg-white border-gray-300 w-full"
      
      v-model="store.couponInput"
    />

    <button
      type="button"
      class="p-3 bg-green-400 font-bold"
      @click="store.applyDiscount"
      :disabled="store.isValidCoupon"
    >
      Canjear
    </button>
  </div>
  <p class="py-2 text-center text-sm font-bold">
    {{ store.validMessage }}
  </p>
</template>
