import { createRouter, createWebHistory } from "vue-router";
import wall from "@/views/wall.vue";
import profile from "@/views/profile.vue";
import faq from "@/views/faq.vue";
import admin from "@/views/admin.vue";
import auth from "@/components/login-signup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: auth
    },
    {
      path: '/wall',
      name: 'wall',
      component: wall
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: profile
    },
    {
      path: '/faq',
      name: 'faq',
      component: faq
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
  ],
});

export default router;
