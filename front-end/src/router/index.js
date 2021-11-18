import { createRouter, createWebHashHistory } from 'vue-router'
// import Inscription from '../views/Inscription.vue'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    // component: Inscription
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: () => import('../views/Inscription.vue')
  },
  // {
  //   path: '/connect',
  //   name: 'Connexion',
  //   component: () => import('../views/connect.vue')
  // },
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/Article.vue')
  },
  
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
