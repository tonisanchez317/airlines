import Vue from 'vue';
import VueRouter from 'vue-router';
import ROUTES from './routes';

const ListView = () => import(/* webpackChunkName: "list" */ '@/views/ListView.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: ROUTES.list,
    component: ListView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes,
});

export default router;
