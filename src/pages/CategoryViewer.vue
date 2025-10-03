<template>
  <q-page padding>
    <component :is="currentComponent" :segments="segments" />
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { defineAsyncComponent, computed } from 'vue'

const route = useRoute()

// normalize route param (pathMatch) to an array of decoded, non-empty segments
const raw = computed(() => route.params.pathMatch ?? '')

const segments = computed(() => {
  if (!raw.value) return []
  if (Array.isArray(raw.value)) {
    return raw.value.map(s => decodeURIComponent(String(s))).filter(Boolean)
  }
  return String(raw.value)
    .split('/')
    .map(s => decodeURIComponent(s))
    .filter(Boolean)
})

const depth = computed(() => segments.value.length)

const componentMap = {
  0: defineAsyncComponent(() => import('components/categories/CategoryRoot.vue')),
  1: defineAsyncComponent(() => import('components/categories/CategoryLevel1.vue')),
  2: defineAsyncComponent(() => import('components/categories/CategoryLevel2.vue')),
  3: defineAsyncComponent(() => import('components/categories/CategoryLevel3.vue'))
}

const currentComponent = computed(() => componentMap[Math.min(depth.value, 3)] || componentMap[0])

// در صورت نیاز برای دیباگ:
// console.log('route.params', route.params, 'segments', segments.value)
</script>
