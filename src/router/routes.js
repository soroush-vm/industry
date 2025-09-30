const routes = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/IndexPage.vue') },
      // { path: '', component: () => import('pages/LandingPageIndustry.vue') },
      { path: '', component: () => import('pages/LandingPagezwei.vue') },
      { path: 'solar', name: 'solar', component: () => import('pages/SolarSystem.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
