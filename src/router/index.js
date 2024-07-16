import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/ProductList.vue'; // Adjust path as per your project structure
import ProductDetail from '@/components/ProductDetail.vue'; // Import ProductDetail component

const routes = [
  { path: '/', component: ProductList },
  { path: '/products/:set_id', component: ProductDetail }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
