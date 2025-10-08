// const routes = [
//   {
//     path: '/',
//     component: () => import('layouts/MainLayout.vue'),
//     children: [
//       { path: '', component: () => import('pages/IndexPage.vue') },
//       {
//         path: 'categories/:pathMatch(.*)*',
//         name: 'Categories',
//         component: () => import('pages/CategoryViewer.vue'),
//         children: [
//           {
//             path: 'detail/:id',
//             name: 'categoryDetail',
//             component: () => import('pages/DetailComponent.vue')
//           }
//         ]
//       },
//     ]
//   },
//   {
//     path: '/:catchAll(.*)*',
//     component: () => import('pages/ErrorNotFound.vue')
//   }
// ]

// export default routes
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },

      // 🟢 مسیر اصلی دسته‌ها
      {
        path: 'categories/:pathMatch(.*)*',
        name: 'Categories',
        component: () => import('pages/CategoryViewer.vue')
      },

      // 🟣 مسیر جداگانه برای جزئیات دسته
      {
        path: 'categories/detail/:id',
        name: 'categoryDetail',
        component: () => import('pages/DetailComponent.vue')
      }
    ]
  },

  // 🟥 صفحه 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
