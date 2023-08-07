import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSaleStore = defineStore("sales", () => {
  const db = useFirestore();
  const dateValue = ref("");
  const formater = ref({
    date: "DD/MM/YYYY",
    month: "MMMM",
  });

  const salesSource = computed(() => {
    if (dateValue.value) {
      const q = query(
        collection(db,'sales'),
        where('date','==',dateValue.value)
      );

      return q;
    }
  });

  const salesCollection = useCollection(salesSource);

  const isDateSelected = computed(() => dateValue.value);

  const totalSalesDay = computed(()=>{
    return salesCollection.value ? salesCollection.value.reduce((total, acum)=> total+acum.total,0) :0
  })

  return {
    dateValue,
    formater,
    isDateSelected,
    salesCollection,
    totalSalesDay
  };
});
