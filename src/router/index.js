import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminLayout from '../views/admin/AdminLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'shop',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children:[
        {
          path:'productos',
          name:'products',
          component:()=> import('../views/admin/ProductsView.vue')
        },
        {
          path:'productos/nuevo',
          name:'new-product',
          component:()=> import('../views/admin/NewProductView.vue')
        },
        {
          path:'productos/editar/:id',
          name:'edit-product',
          component:()=> import('../views/admin/EditProductView.vue')
        },
        {
          path:'seeder',
          name:'seeder',
          component:()=> import('../views/admin/SeederView.vue')
        },
        {
          path:'ventas',
          name:'sales',
          component:()=> import('../views/admin/SalesView.vue')
        }
      ]
    },
   
  ]
})

export default router
