<template>
  <q-layout view="hHh lpR fFf">
    <!-- <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title>
          سامانه جامع
        </q-toolbar-title>
      </q-toolbar>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>
<style scoped>
.header {
  background-color: #463bdd;
  color: white;
}
</style>