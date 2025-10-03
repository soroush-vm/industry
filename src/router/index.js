// src/router/index.js
import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export default route(function () {
  const Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL || '/'),
    routes
  })

  return Router
})
