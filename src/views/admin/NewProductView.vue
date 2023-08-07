<script setup>
import { reactive } from "vue";
import { useRouter} from 'vue-router'
import Link from "@/components/UI/Link.vue";
import useImage from "@/composables/useImage";
import { useProductStore } from "../../stores/products";

const products = useProductStore();
const { onFileChange, url, isImageUpload } = useImage();
const router =  useRouter()

const formData = reactive({
  name: "",
  image: "",
  category: "",
  price: "",
  availability: "",
});

const handleSubmit = async (data) => {
  const { image, ...values } = data;

  try {
    await products.createProduct({
      ...values,
      image: url.value,
    });

    router.push({name:'products'})

  } catch (error) {
    console.log(error);
  }
};

</script>
<template>
  <div>
    <Link to="products">Volver</Link>
  </div>
  <h1 class="text-4xl text-center font-semibold my-10">Nuevo Producto</h1>

  <section
    class="flex justify-center max-w-5xl mx-auto bg-white shadow-md rounded"
  >
    <div class="mt-10 px-10 pb-10 w-full 2xl:w-2/4">
      <FormKit
        type="form"
        submit-label="Agregar Producto"
        incomplete-message="No se puedo registrar revisa los campos"
        @submit="handleSubmit"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Nombre"
          name="name"
          placeholder="Nombre del Producto"
          validation="required"
          :validation-messages="{
            required: 'El nombre del producto es Obligatorio',
          }"
          v-model.trim="formData.name"
        />
        <FormKit
          type="file"
          label="Imagen Producto"
          name="image"
          validation="required"
          :validation-messages="{
            required: 'La imagen del producto es Obligatoria',
          }"
          accept=".jpg"
          @change="onFileChange"
          v-model.trim="formData.image"
        />
        <div v-if="isImageUpload">
          <p class="font-semibold text-lg">Imagen Producto:</p>

          <img
            :src="url"
            alt="Nueva imagen Producto"
            class="w-24 lg:w-32"
          />
        </div>
        <FormKit
          type="select"
          label="Categoria"
          name="category"
          validation="required"
          :validation-messages="{
            required: 'La categoria del producto es Obligatoria',
          }"
          :options="products.categoryOptions"
          v-model.number="formData.category"
        />

        <FormKit
          type="number"
          label="Precio"
          name="price"
          placeholder="Precio de Producto"
          validation="required"
          :validation-messages="{ required: 'El precio es Obligatorio' }"
          min="1"
          v-model.number="formData.price"
        />

        <FormKit
          type="number"
          label="Disponibles"
          name="availability"
          placeholder="Cantidad Disponible"
          validation="required"
          :validation-messages="{
            required: 'La cantidad disponible es Obligatoria',
          }"
          min="1"
          v-model.number="formData.availability"
        />
      </FormKit>
    </div>
  </section>
</template>
