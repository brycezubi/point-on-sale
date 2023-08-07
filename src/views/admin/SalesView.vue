<script setup>
import { useSaleStore } from "../../stores/sale";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SaleDetails from "@/components/SalesDetails.vue";
import { formatCurrency } from "../../helpers";

const sales = useSaleStore();
</script>
<template>
  <h1 class="text-4xl text-center font-semibold my-10">Resumen de Ventas</h1>

  <section class="md:flex md:items-start md:gap-5">
    <div class="md:w-1/2 xl:w-1/3 flex justify-center">
      <vue-tailwind-datepicker
        as-single
        i18n="es-pe"
        placeholder="Fecha de ventas Realizados"
        no-input
        v-model="sales.dateValue"
        :formatter="sales.formater"
      />
    </div>
    <div
      class="md:w-1/2 lg:w-2/3 space-y-5 xl:h-screen lg:overflow-y-scroll p-5 pb-20"
    >
      <p
        class="text-center text-lg"
        v-if="sales.isDateSelected"
      >
        Ventas de la Fecha:
        <span class="font-bold">{{ sales.dateValue }}</span>
      </p>
      <p
        class="text-center text-lg font-semibold"
        v-else
      >
        Selecciona un Fecha
      </p>
      <div
        v-if="sales.salesCollection.length"
        class="space-y-5"
      >
        <p class="text-xl text-right font-semibold">
          Total Del Dia :
          <span class="font-black">{{
            formatCurrency(sales.totalSalesDay)
          }}</span>
        </p>
        <SaleDetails
          v-for="sale in sales.salesCollection"
          :key="sale.id"
          v-bind:sale="sale"
        />
      </div>
      <p
        v-else
        class="text-2xl font-semibold text-center"
      >
        No se registaron ventas
      </p>
    </div>
  </section>
</template>
