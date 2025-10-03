<template>
  <div>
    <h3>📂 دسته سطح ۱: {{ segments[0] }}</h3>
    <q-list bordered>
      <q-item
        v-for="sub in subCategories"
        :key="sub"
        clickable
        :to="{ name: 'Categories', params: { pathMatch: [segments[0], sub] } }"
      >
        <q-item-section>{{ sub }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
defineProps({ segments: Array })
const subCategories = ['لبنی', 'غذای آماده', 'نوشیدنی']
</script>
