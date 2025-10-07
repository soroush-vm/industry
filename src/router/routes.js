// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: 'categories/:pathMatch(.*)*',
        name: 'Categories',
        component: () => import('pages/CategoryViewer.vue'),
          children: [
            {
              path: 'detail/:id',
              name: 'categoryDetail',
              component: () => import('pages/DetailComponent.vue')
            }
          ]
      },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
