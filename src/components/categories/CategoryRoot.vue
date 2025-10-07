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
        <div class="rectangle">
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

// داده‌های گرید با 13 سلول
const cells = ref(
  Array.from({ length: 13 }, (_, i) => ({
    text: `Cell ${i + 1}`,
    category: `category-${i + 1}`,
  }))
);
const hexRefs = ref([]);

// تابع کلیک برای انتقال به مسیر Categories با انیمیشن نابودی
const goToCategory = (cat, index) => {
  const el = hexRefs.value[index];
  gsap.to(el, {
    opacity: 0,
    scale: 0.5,
    rotate: 180,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      cells.value.splice(index, 1);
      router.push({ name: "Categories", params: { pathMatch: cat } });
    },
  });
};

onMounted(async () => {
  await nextTick();

  // Hover animation
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Entrance animation
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
/* 🟣 پس‌زمینه صفحه */
.bg-page {
  background: linear-gradient(135deg, #9464c7, #17376d);
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* 🟡 گرید تمام‌صفحه */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
  gap: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 🟢 باکس اصلی برای نگهداری شکل */
.rect-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: center;
}

/* 🔶 خود مستطیل */
.rectangle {
  width: 100%;
  height: 100%;
  background: rgba(27, 7, 58, 0.4);
  border: 1px solid rgba(164, 192, 8, 0.8);
  transform: none;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 4px;
}

/* ✨ محتوا */
.rect-content {
  color: white;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  padding: 8px;
}

/* 📱 واکنش‌گرا */
@media (min-width: 600px) {
  .grid-wrapper {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
  }
  .rect-content {
    font-size: 16px;
  }
}
@media (min-width: 1000px) {
  .grid-wrapper {
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
  }
  .rect-content {
    font-size: 18px;
  }
}
</style>  