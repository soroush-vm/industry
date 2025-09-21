<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="app-header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Essential Links </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="app-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'About us',
    caption: 'everything about company',
    icon: 'apple',
    link: 'https://google.com',
  },
  {
    title: 'Admins',
    caption: 'this panel is for admins',
    icon: 'code',
    link: 'https://google.com',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style scoped>
.app-header {
  /* background with reduced opacity: change the color and alpha as needed */
  background-color: rgba(3, 3, 34, 0.9); /* semi-transparent black */
  color: #ffffff; /* ensure toolbar text/icons are readable */
}

/* If Quasar applies its own backdrop or box-shadow via the elevated prop, reduce it slightly */
.app-header.q-elevated {
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
}

.app-container {
  /* background with reduced opacity: change the color and alpha as needed */
  background-color: rgba(3, 3, 34, 0.9); /* semi-transparent black */
  color: #ffffff; /* ensure toolbar text/icons are readable */
}
</style>
