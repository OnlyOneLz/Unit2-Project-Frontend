import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home'
import Collection from '../components/Collection'
import AddProduct from '../components/AddProduct'
import AboutUs from '../components/AboutUs'
import Product from '../components/Product'
import EditProduct from '../components/EditProduct'
import Basket from '../components/Basket'
import LoginForm from '../components/auth/Login'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/AddProduct',
    name: 'product',
    component: AddProduct
  },
  {
    path: '/AboutUs',
    name: 'AboutUs',
    component: AboutUs
  },
  {
    path: '/Product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/EditProduct/:id',
    name: 'EditProduct',
    component: EditProduct
  },
  {
    name: 'LoginForm',
    path: '/Login',
    component: LoginForm
  },
  {
    path: '/Basket',
    name: 'BasketVue',
    component: Basket
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
