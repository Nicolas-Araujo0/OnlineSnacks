import { createRouter, createWebHistory } from 'vue-router'
import Produits from "../views/Produits.vue"
import Historique from "../views/Historique.vue"
import Contact from "../views/Contact.vue"
import Favoris from "../views/Favoris.vue"
import Connexion from "../views/Connexion.vue"
import Provide from "../views/Provide.vue"
import Cart from "../views/Cart.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Connexion
    },
    {
      path: '/Favoris',
      name: 'Favoris',
      component: Favoris
    },
    {
      path: '/Historique',
      name: 'Historique',
      component: Historique
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/Produits',
      name: 'Produits',
      component: Produits
    },
    {
      path: '/Test',
      name: 'Test',
      component: Provide
    },
    {
    path: "/Cart",
    name: "Cart",
    component: Cart
    }
    /*,
{
  path: '/about',
  name: 'about',
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import('../views/AboutView.vue')
}
{
  path: '/',
  name: 'home',
  component: ""
}
*/
  ]
})
router.beforeEach(async (to, from) => {
  const isAuthenticated = localStorage.isAuthenticated;


  if (!isAuthenticated && to.path !== "/") {
    return { name: "home" }
  }
})
export default router
