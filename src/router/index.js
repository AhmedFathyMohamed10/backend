import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/components/ProductList.vue'; // Adjust path as per your project structure
import ProductDetail from '@/components/ProductDetail.vue'; // Import ProductDetail component
import CheckInteractions from '@/components/CheckInteractions.vue'; // Import CheckInteractions component

const routes = [
  { path: '/', component: ProductList },
  { path: '/products/:set_id', component: ProductDetail },
  { path: '/check-interactions', component: CheckInteractions },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
