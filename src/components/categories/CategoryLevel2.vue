<template>
  <q-page class="bg-page flex flex-center">

    <!-- دکمه بازگشت -->
    <q-btn
      label="بازگشت 🔙"
      color="amber"
      class="back-btn"
      @click="goBack"
    />

    <!-- مسیر فعلی -->
    <div class="breadcrumb" ref="breadcrumbRef">
      <span
        v-for="(seg, i) in segments"
        :key="i"
        class="crumb"
      >
        {{ seg }}
        <span v-if="i < segments.length - 1" class="arrow">→</span>
      </span>
    </div>


    <!-- نود مرکزی -->
    <div class="center-node" ref="centerRef">
      <img src="/src/assets/layer1.png" alt="مرحله اول" class="center-img" ref="centerImg" />
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
const centerImg = ref(null);
const breadcrumbRef = ref(null);


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
  gsap.fromTo(centerImg.value,
  { scale: 0, opacity: 0, rotation: -180 },
  { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.6)" }
  );

  // gsap.fromTo(centerRef.value,
  //   { scale: 0, opacity: 0, y: -100 },
  //   { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" }
  // );
  gsap.to(centerImg.value, {
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut"
  });

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
  // انیمیشن ورود breadcrumb
  gsap.fromTo(breadcrumbRef.value,
    { opacity: 0, y: -30, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }
  );

  gsap.fromTo(".crumb",
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
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

/* .center-node {
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
} */

.center-node {
  position: absolute;
  width: 140px;
  height: 140px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%; /* اگه بخوای دایره بشه */
  overflow: hidden;
  background: transparent; /* چون حالا از تصویر استفاده می‌کنی */
  box-shadow: 0 0 14px rgba(255, 179, 0, 0.4);
}

.center-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.breadcrumb {
  position: absolute;
  top: 25px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  padding: 6px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
  overflow: hidden;
  z-index: 60;
}

.crumb {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.arrow {
  margin: 0 6px;
  color: #ffb300;
  font-weight: bold;
}


.node:hover {
  box-shadow: 0 0 16px rgba(103, 58, 183, 0.9);
}
</style>
