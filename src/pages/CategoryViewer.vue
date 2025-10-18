<template>
  <q-page>
    <component :is="currentComponent" :segments="segments" />
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import { defineAsyncComponent, computed } from "vue";

const route = useRoute();

// مسیر فعلی رو بخون
const raw = computed(() => route.params.pathMatch ?? "");

const segments = computed(() => {
  if (!raw.value) return [];
  if (Array.isArray(raw.value)) {
    return raw.value.map((s) => decodeURIComponent(String(s))).filter(Boolean);
  }
  return String(raw.value)
    .split("/")
    .map((s) => decodeURIComponent(s))
    .filter(Boolean);
});

// سطح عمق مسیر
const depth = computed(() => segments.value.length);

// 🔹 سامانه انتخاب‌شده (اولین سگمنت)
const category = computed(() => segments.value[0] || "");

// 🔹 تعریف Component Map عمومی
const defaultComponentMap = {
  0: defineAsyncComponent(() => import("components/categories/CategoryRoot.vue")),
  1: defineAsyncComponent(() => import("components/categories/CategoryLevel1.vue")),
  2: defineAsyncComponent(() => import("components/categories/CategoryLevel2.vue")),
  3: defineAsyncComponent(() => import("components/categories/CategoryLevel3.vue")),
};

// 🔹 تعریف Component Map مخصوص سلامت
const healthComponentMap = {
  0: defineAsyncComponent(() => import("components/categories/CategoryRoot.vue")),
  1: defineAsyncComponent(() => import("components/salamat/CategorySalamatLevel1.vue")),
  2: defineAsyncComponent(() => import("components/salamat/CategorySalamatLevel2.vue")),
};

// 🔹 انتخاب داینامیک بر اساس نوع سامانه
const componentMap = computed(() => {
  if (category.value === "health") {
    return healthComponentMap;
  }
  return defaultComponentMap;
});

// 🔹 انتخاب کامپوننت فعلی بر اساس عمق
const currentComponent = computed(() => {
  const map = componentMap.value;
  const maxDepth = Math.max(...Object.keys(map));
  return map[Math.min(depth.value, maxDepth)] || map[0];
});
</script>
