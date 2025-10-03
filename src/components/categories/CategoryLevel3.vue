<template>
  <div>
    <h3>📦 محصول سطح ۳: {{ segments[2] }}</h3>
    <p>📍 دسته کلی: {{ segments[0] }} → {{ segments[1] }} → {{ segments[2] }}</p>

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">{{ segments[2] }}</div>
        <div class="text-subtitle2">جزئیات محصول یا لیست محصولات مرتبط نمایش داده می‌شود.</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
defineProps({ segments: Array })
</script>
