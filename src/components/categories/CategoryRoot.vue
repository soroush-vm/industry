<template>
  <q-page class="bg-page flex flex-center">
    <!-- نود مرکزی -->
    <div class="center-node" ref="centerRef">
      📦 دسته‌ها
    </div>

    <!-- نودهای دسته‌ها -->
    <div
      v-for="(cat, i) in rootCategories"
      :key="i"
      class="node"
      :style="getNodeStyle(i, rootCategories.length)"
      ref="nodeRefs"
      @click="onNodeClick(cat, i)"
    >
      {{ cat }}
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const router = useRouter();
const rootCategories = [
  "صنایع", "کشاورزی", "فناوری", "خدمات", "سلامت",
  "آموزش", "فرهنگ", "ورزش", "گردشگری", "حمل‌ونقل",
  "ساختمان", "انرژی", "محیط‌زیست", "مدیریت", "مالی",
  "حقوق", "ارتباطات", "رسانه", "بازرگانی"
];

const centerRef = ref(null);
const nodeRefs = ref([]);

// فاصله شعاعی نودها
const radius = 400;

const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { transform: `translate(${x}px, ${y}px)` };
};

// وقتی روی نود کلیک شد
const onNodeClick = (cat) => {
  // انیمیشن خروج نامنظم
  const timeline = gsap.timeline({
    onComplete: () => {
      router.push({ name: "Categories", params: { pathMatch: [cat] } });
    }
  });

  nodeRefs.value.forEach((node) => {
    const randX = (Math.random() - 0.5) * 800; // پراکندگی X
    const randY = (Math.random() - 0.5) * 800; // پراکندگی Y
    const randRot = (Math.random() - 0.5) * 720; // چرخش نامنظم
    const randScale = Math.random() * 0.8 + 0.2;

    timeline.to(node, {
      x: randX,
      y: randY,
      rotation: randRot,
      scale: randScale,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in"
    }, 0); // همه با هم شروع میشن
  });

  // مرکز هم میره
  timeline.to(centerRef.value, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  }, 0);
};

onMounted(async () => {
  await nextTick();

  // انیمیشن ورود
  gsap.fromTo(centerRef.value, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" });
  gsap.fromTo(nodeRefs.value, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" });
});
</script>

<style scoped>
.bg-page {
  background: linear-gradient(135deg, #9464c7, #17376d);
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

.center-node {
  position: absolute;
  width: 120px;
  height: 120px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #ffb703;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #222;
  z-index: 10;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
}

.node {
  position: absolute;
  width: 100px;
  height: 100px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #58a8f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.node:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 0 12px rgba(88, 168, 243, 0.9);
}
</style>
