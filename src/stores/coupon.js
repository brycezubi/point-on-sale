import { defineStore } from 'pinia'
import {ref, watch , computed} from 'vue'
import { useCartStore } from './cart'


export const useCouponStore =  defineStore('coupon',()=>{

  const cart = useCartStore()

  const couponInput = ref('')
  const validMessage = ref('')
  const discountPercentage=ref(0)
  const discount=ref(0)


  watch(discountPercentage,()=>{
    discount.value =(cart.total * discountPercentage.value).toFixed(2)
  })

  const VALID_COUPONS = [
    {name:'10DESCUENTO',discount:.10},
    {name:'20DESCUENTO',discount:.20}
  ]

  function applyDiscount(){

    if(VALID_COUPONS.some(c=>c.name == couponInput.value)){
      validMessage.value='Aplicando... '

      setTimeout(() => {
        discountPercentage.value =VALID_COUPONS.find(c=>c.name = couponInput.value).discount
        validMessage.value='Descuento Aplicado'
      }, 1500);
      
    }else{
      validMessage.value='No existe Cupón'
    }

    setTimeout(() => {
      validMessage.value=''
    }, 4000);
  }

  function $reset(){
    couponInput.value = ''
    validMessage.value = ''
    discountPercentage.value=0
    discount.value=0
  }


  const isValidCoupon = computed(()=>{
    return discountPercentage.value > 0
  })

  return{
    couponInput,
    applyDiscount,
    validMessage,
    discount,
    isValidCoupon,
    $reset
  }
})