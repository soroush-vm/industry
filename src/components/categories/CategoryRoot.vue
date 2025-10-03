<template>
  <div>
    <h3>📦 دسته‌ها</h3>
    <q-list bordered>
      <q-item
        v-for="cat in rootCategories"
        :key="cat"
        clickable
        :to="{ name: 'Categories', params: { pathMatch: [cat] } }"
      >
        <q-item-section>{{ cat }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
const rootCategories = ['صنایع', 'کشاورزی', 'فناوری']
</script>
