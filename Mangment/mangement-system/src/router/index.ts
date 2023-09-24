import Dashboard from '@/views/Dashboard.vue'
import HomeView from '@/views/HomeView.vue'
import DocumentCreate from '@/views/dashboard/DocumentCreate.vue'
import DocumentUpload from '@/views/dashboard/DocumentUpload.vue'
import Documentlist from '@/views/dashboard/Documentlist.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'documentlist',
          name: 'dashboard-list',
          component: Documentlist,
        },
        {
          path: 'documentupload',
          name: 'dashboard-upload',
          component: DocumentUpload,
        },
        {
          path: 'documentcreate',
          name: 'dashboard-create',
          component: DocumentCreate,
        },
      ],
    },
  ],
})

export default router
