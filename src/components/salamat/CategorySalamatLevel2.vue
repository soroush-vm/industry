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

// هاور GSAP
const hoverIn = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1.25,
    duration: 0.3,
    ease: "elastic.out(1, 0.4)",
  });
};
const hoverOut = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

// انیمیشن ورود
onMounted(async () => {
  await nextTick();

  const tl = gsap.timeline();

  // مرکز
  tl.fromTo(centerImg.value,
    { scale: 0, opacity: 0, rotation: -180 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1.1, ease: "elastic.out(1, 0.6)" }
  );

  // پالس ملایم بی‌نهایت برای مرکز
  gsap.to(centerImg.value, {
    scale: 1.1,
    repeat: -1,
    yoyo: true,
    duration: 2.5,
    ease: "sine.inOut",
  });

  // نودها - ورود نرم با پرش
  tl.fromTo(nodeRefs.value,
    { scale: 0, opacity: 0, rotation: -90 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "back.out(1.8)",
    },
    "-=0.4"
  );

  // breadcrumb
  tl.fromTo(breadcrumbRef.value,
    { opacity: 0, y: -30, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "expo.out" },
    "-=0.5"
  );

  gsap.fromTo(".crumb",
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
  );

  // حرکت مدور دائم (Orbit) برای نودها
  nodeRefs.value.forEach((node) => {
    const delay = Math.random() * 2;
    gsap.to(node, {
      rotation: "+=360",
      transformOrigin: "center center",
      repeat: -1,
      ease: "none",
      duration: 30 + delay * 5,
    });
  });
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

// انیمیشن خروج مدرن (گردبادی و محو)
const animateExit = (tl) => {
  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const randX = Math.cos(angle) * (800 + Math.random() * 300);
    const randY = Math.sin(angle) * (800 + Math.random() * 300);
    const randRot = gsap.utils.random(-720, 720);

    tl.to(node, {
      x: randX,
      y: randY,
      rotation: randRot,
      scale: 0,
      opacity: 0,
      duration: 1.2,
      ease: "expo.inOut",
    }, 0);
  });

  tl.to(centerRef.value, {
    scale: 0,
    rotation: 360,
    opacity: 0,
    duration: 0.8,
    ease: "expo.inOut",
  }, 0.2);

  tl.to(breadcrumbRef.value, {
    opacity: 0,
    y: -50,
    duration: 0.6,
    ease: "power2.inOut",
  }, 0);
};
</script>

<style scoped>
.bg-page {
  background: radial-gradient(circle at center, #12002b, #2b006e);
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
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  background: transparent;
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
  background: linear-gradient(145deg, #8e24aa, #5e35b1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: var(--node-translate) scale(1);
  transition: box-shadow 0.3s ease;
}

.node:hover {
  box-shadow: 0 0 16px rgba(156, 39, 176, 0.9);
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
</style>
