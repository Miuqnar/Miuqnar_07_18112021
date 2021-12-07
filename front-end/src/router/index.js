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
    path: '/listArticle',
    name: 'ListArticle',
    component: () => import('../views/ListArticle.vue')
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue')
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
