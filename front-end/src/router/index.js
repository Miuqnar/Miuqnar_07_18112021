import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: () => import('../views/Connexion.vue'),
  },
  {
    path: '/accueil',
    name: 'Accueil',
    component: () => import('../views/Accueil.vue'),
  },
  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue'),
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const accPage  = ["/"]
  const requireAuth = !accPage.includes(to.path)
  const getStgLogin = localStorage.getItem("userId")
  const getToken    = localStorage.getItem("token")
  if (requireAuth && !getStgLogin && !getToken) {
     next("/")
  }else{
    next()
  }
  
})

export default router
