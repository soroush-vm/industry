<template>
  <q-page class="bg-page flex flex-center">

    <!-- دکمه بازگشت -->
    <q-btn
      label="بازگشت 🔙"
      color="amber"
      class="back-btn"
      @click="goBack"
    />

    <!-- نود مرکزی -->
    <div class="center-node" ref="centerRef">
      {{ segments[1] }}
    </div>

    <!-- نودهای زیر دسته -->
    <div
      v-for="(sub, i) in subCategories"
      :key="sub"
      class="node"
      :style="getNodeStyle(i, subCategories.length)"
      ref="nodeRefs"
      @mouseenter="hoverIn(i)"
      @mouseleave="hoverOut(i)"
      @click="onNodeClick(sub)"
    >
      {{ sub }}
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const props = defineProps({ segments: Array });
const segments = props.segments;

const router = useRouter();
const nodeRefs = ref([]);
const centerRef = ref(null);

const subCategories = ["الف", "ب", "پ", "ت", "ث", "ج", "چ", "ح"];
const radius = 300;

// موقعیت دایره‌ای
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { "--node-translate": `translate(${x}px, ${y}px)` };
};

// هاور
const hoverIn = (i) => {
  gsap.to(nodeRefs.value[i], { scale: 1.25, duration: 0.25, ease: "power2.out" });
};
const hoverOut = (i) => {
  gsap.to(nodeRefs.value[i], { scale: 1, duration: 0.25, ease: "power2.out" });
};

// انیمیشن ورود
onMounted(async () => {
  await nextTick();

  gsap.fromTo(centerRef.value,
    { scale: 0, opacity: 0, y: -100 },
    { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" }
  );

  gsap.fromTo(nodeRefs.value,
    { scale: 0, opacity: 0, rotation: 180 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "back.out(1.8)",
    }
  );
});

// کلیک روی نود → مرحله بعد
const onNodeClick = (sub) => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
        params: { pathMatch: [segments[0], segments[1], sub] },
      });
    },
  });

  animateExit(tl);
};

// دکمه بازگشت → مرحله قبل
const goBack = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
        params: { pathMatch: [segments[0]] },
      });
    },
  });

  animateExit(tl);
};

// تابع مشترک انیمیشن خروج
const animateExit = (tl) => {
  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const spiralX = Math.cos(angle) * (800 + Math.random() * 200);
    const spiralY = Math.sin(angle) * (800 + Math.random() * 200);
    const rot = 720 + Math.random() * 360;

    tl.to(node, {
      x: spiralX,
      y: spiralY,
      rotation: rot,
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power4.inOut",
    }, 0);
  });

  tl.to(centerRef.value, {
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 0.7,
    ease: "power4.inOut",
  }, 0.1);
};
</script>

<style scoped>
.bg-page {
  background: linear-gradient(135deg, #1a1a1a, #2b006e);
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.back-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 50;
}

.center-node {
  position: absolute;
  width: 140px;
  height: 140px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #ffb300;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  color: #222;
  box-shadow: 0 0 14px rgba(255, 179, 0, 0.4);
  padding: 10px;
  z-index: 10;
}

.node {
  position: absolute;
  width: 110px;
  height: 110px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #673ab7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transform: var(--node-translate) scale(1);
  transition: box-shadow 0.3s ease;
}

.node:hover {
  box-shadow: 0 0 16px rgba(103, 58, 183, 0.9);
}
</style>
