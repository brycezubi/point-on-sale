import { defineStore } from "pinia";
import { ref, computed, watch, watchEffect } from "vue";
import { useCouponStore } from "./coupon"
import { collection ,addDoc , runTransaction, doc } from 'firebase/firestore'
import { useFirestore} from 'vuefire'
import { getCurrentDate} from '../helpers/index'

export const useCartStore = defineStore("cart", () => {

  const coupon = useCouponStore()
  const db=useFirestore()

  const cart = ref([]);
  const subtotal = ref(0);
  const igv = ref(0);
  const total = ref(0);

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.18;

  // watch(cart,()=>{
  //   subtotal.value =  cart.value.reduce((acum,item)=> acum + (item.price *item.quantity),0)
  //   igv.value = subtotal.value * TAX_RATE
  //   total.value = subtotal.value +igv.value
  // },{
  //   deep:true
  // })

  watchEffect(() => {
    subtotal.value = cart.value.reduce(
      (acum, item) => acum + item.price * item.quantity,
      0
    );
    igv.value = Number((subtotal.value * TAX_RATE).toFixed(2));
    total.value = Number(((subtotal.value + igv.value) - coupon.discount).toFixed(2));
  });

  function addItem(item) {
    // Validamos el indice del articulo , se encuentra dentro del arreglo --- -1 , 0 , 1
    const index = isItemCart(item.id);
    if (index >= 0) {
      // Actualizamos la cantidad del articulo
      if(isProductAvailable(item,index))return 
      cart.value[index].quantity++
    } else {
      // Agregamos el item al carrito con un cantidad minima de 1
      cart.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    cart.value = cart.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }


  function removeItem(id){
    cart.value= cart.value.filter( item=>item.id !== id)
  }

  async function checkout(){
    try {
      await addDoc(collection(db,'sales'),{
        cart:cart.value.map( i=>{
          const {category,availability,...data} = i
          return data
        }),
        subtotal:subtotal.value,
        igv:igv.value,
        discount:coupon.discount,
        total:total.value,
        date:getCurrentDate()
      })

      // Sustraccion de la cantidad disponible
      cart.value.forEach( async(item)=>{
        const productRef = doc(db,'products',item.id)
        await runTransaction(db, async (transaction)=>{
          const productoActual = await transaction.get(productRef)
          const  availability=  productoActual.data().availability - item.quantity
          transaction.update(productRef,{availability})
        })
      })

      // Reiniciar el State
      cart.value = [];
      subtotal.value = 0;
      igv.value = 0;
      total.value = 0;
      coupon.$reset

    } catch (error) {
      console.log(error)
    }
  }

  const isItemCart = (id) => cart.value.findIndex((item) => item.id === id);

  const isProductAvailable = (item,index)=>{
    return cart.value[index].quantity >= item.availability || cart.value[index].quantity >= MAX_PRODUCTS
  }

  const isProducts = computed(() => {
    return cart.value.length === 0;
  });

  const checkProductAvaliable = computed(() => {
    return (prod) =>
      prod.availability < MAX_PRODUCTS ? prod.availability : MAX_PRODUCTS;
  });

  return {
    cart,
    subtotal,
    igv,
    total,
    addItem,
    removeItem,
    updateQuantity,
    checkout,
    checkProductAvaliable,
    isProducts,
  };
});
