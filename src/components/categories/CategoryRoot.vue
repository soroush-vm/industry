<template>
  <q-page class="bg-page">
    <div class="grid-wrapper">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="rect-wrapper"
        ref="hexRefs"
        @click="goToCategory(cell.category, index)"
      >
        <div class="rectangle" :style="{ backgroundColor: cell.color || 'rgba(27, 7, 58, 0.4)' }">
          <div class="rect-content">
            <p>{{ cell.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const router = useRouter();
const hexRefs = ref([]);

// ✅ داده‌های ثابت به جای دریافت از API
const cells = ref([
  { text: "ابرسامانه تجارت و بازرگانی", category: "commerce", color: "#17376d" },
  { text: "ابرسامانه اصناف و خدمات شهری", category: "services", color: "#1d5e8a" },
  { text: "ابرسامانه کشاورزی و امنیت غذایی", category: "agriculture", color: "#2a7b6f" },
  { text: "ابرسامانه گردشگری و میراث فرهنگی", category: "tourism", color: "#b36d2d" },
  { text: "ابرسامانه سلامت و رفاه اجتماعی", category: "health", color: "#8a2e5c" },
  { text: "ابرسامانه معدن و منابع طبیعی", category: "mining", color: "#5f3a92" },
  { text: "ابرسامانه نفت، انرژی و محیط زیست", category: "energy", color: "#c94a3d" },
  { text: "ابرسامانه دانش، فناوری و سرمایه انسانی", category: "knowledge", color: "#1f7a9d" },
]);

const goToCategory = (cat, index) => {
  const el = hexRefs.value[index];
  gsap.to(el, {
    opacity: 0,
    scale: 0.5,
    rotate: 180,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      router.push({ name: "Categories", params: { pathMatch: cat } });
    },
  });
};

onMounted(async () => {
  await nextTick();

  // انیمیشن hover
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  gsap.from(hexRefs.value, {
    opacity: 0,
    y: 40,
    stagger: 0.05,
    duration: 0.6,
    ease: "power2.out",
  });
});
</script>

<style scoped>
.bg-page {
  background: linear-gradient(135deg, #9464c7, #17376d);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 30px;
  width: 90%;
  height: 90%;
}

.rect-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: center;
}

.rectangle {
  width: 100%;
  height: 100%;
  border: 1px solid rgba(164, 192, 8, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.rect-content {
  color: white;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 12px;
  line-height: 1.6;
}
</style>
