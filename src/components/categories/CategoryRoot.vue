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
import { api } from "boot/axios"; 
import gsap from "gsap";

const router = useRouter();
const cells = ref([]);
const hexRefs = ref([]);

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

const loadCategories = async () => {
  try {
    const { data } = await api.get("/categories");
    cells.value = data; // ✅ داده‌ها رو از بک‌اند ست می‌کنیم
  } catch (err) {
    console.error("خطا در گرفتن داده از بک‌اند:", err);
  }
};

// 🎯 وقتی صفحه لود شد
onMounted(async () => {
  await loadCategories();
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

  // انیمیشن ورود
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
