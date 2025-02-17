import { createRouter, createWebHistory } from 'vue-router';
import Home from './home/Index.vue';
import TicketsIndex from './components/tickets/Index.vue';
import TicketsCreate from './components/tickets/Create.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/tickets', component: TicketsIndex },
  { path: '/tickets/create', component: TicketsCreate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;