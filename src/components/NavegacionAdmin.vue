<script setup>
  import Link from '../components/UI/Link.vue'
  import Logo from '../components/UI/Logo.vue'
</script>
<template>
   <header class="py-8 bg-cyan-800">
    <div class="contenedor flex justify-between items-center">
      <Logo />
      <nav>
        <RouterLink :to="{name:'products'}" class="text-white text-lg font-semibold p-2 rounded">
          Productos
        </RouterLink>
        <RouterLink :to="{name:'sales'}" class="text-white text-lg font-semibold p-2 rounded">
          Ventas
        </RouterLink>
        <Link to="shop">Ir a Tienda</Link>
      </nav>
    </div>
  </header>
</template>