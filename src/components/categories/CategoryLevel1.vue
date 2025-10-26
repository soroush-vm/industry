<template>
  <q-page class="bg-page flex flex-center">

    <!-- نوار breadcrumb سراسری -->
    <div class="breadcrumb-bar" ref="breadcrumbRef">
      <div class="breadcrumb">
        <span
          v-for="(seg, i) in segments"
          :key="i"
          class="crumb"
        >
          {{ seg }}
          <span v-if="i < segments.length - 1" class="arrow">→</span>
        </span>
      </div>
    </div>

    <div class="barInfo-info" ref="barInfoRef">
      <div class="barInfo">
        اطلاعات بیشتر درباره {{ segments[0] }}
      </div>
    </div>

    <!-- دکمه بازگشت -->
    <q-btn
      label="بازگشت"
      color="amber"
      class="back-btn"
      @click="goBack"
    />

    <!-- نود مرکزی -->
    <div class="center-node">
      <!-- ✅ تصویر داینامیک بر اساس segments[0] -->
      <img :src="centerImgSrc" alt="مرحله اول" class="center-img"/>
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
import { ref, onMounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const props = defineProps({
  segments: Array,
});
const segments = props.segments;
const router = useRouter();

const nodeRefs = ref([]);
const centerRef = ref(null);
const centerImg = ref(null);
const breadcrumbRef = ref(null);
const barInfoRef = ref(null);

// ✅ مسیر داینامیک تصویر مرکز
const centerImgSrc = computed(() => {
  if (!segments?.[0]) return "/src/assets/default.png"; // fallback
  try {
    return new URL(`/src/assets/${segments[0]}.png`, import.meta.url).href;
  } catch {
    return "/src/assets/default.png";
  }
});

const subCategories = [
  "لبنی",
  "غذای آماده",
  "نوشیدنی",
  "سبزیجات",
  "ترشیجات",
  "فراوری شده",
  "ارگانیک",
  "ترشبجات",
];

// دکمه بازگشت
const goBack = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({ name: "Categories" });
    },
  });
  animateExit(tl);
};

// فاصله شعاعی (کوچک‌تر شده به اندازه Level2)
const radius = 200;

// ✅ تابع حفظ‌شده با همان فرمت اصلی (CSS variable)
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    "--node-translate": `translate(${x}px, ${y}px)`,
  };
};

// هاور GSAP
const hoverIn = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1.2,
    duration: 0.3,
    ease: "power2.out",
  });
};
const hoverOut = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

// کلیک روی نود
const onNodeClick = (sub) => {
  const timeline = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
        params: { pathMatch: [segments[0], sub] },
      });
    },
  });

  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const randX = Math.cos(angle) * 600 + (Math.random() - 0.5) * 200;
    const randY = Math.sin(angle) * 600 + (Math.random() - 0.5) * 200;
    const randRot = (Math.random() - 0.5) * 720;
    timeline.to(
      node,
      {
        x: randX,
        y: randY,
        rotation: randRot,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in",
      },
      0
    );
  });

  timeline.to(
    centerRef.value,
    { scale: 0, opacity: 0, duration: 0.5, ease: "power3.in" },
    0
  );
};

// انیمیشن ورود (با اضافه کردن انیمیشن‌های breadcrumb و barInfo مانند Level2)
onMounted(async () => {
  await nextTick();

  gsap.fromTo(centerImg.value,
    { scale: 0, opacity: 0, rotation: -180 },
    { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.6)" }
  );

  gsap.to(centerImg.value, { scale: 1.1, repeat: -1, yoyo: true, duration: 1.5 });

  gsap.fromTo(nodeRefs.value,
    { scale: 0, opacity: 0, rotation: 180 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.8)" }
  );

  gsap.fromTo(breadcrumbRef.value,
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
  );

  gsap.fromTo(barInfoRef.value,
    { opacity: 0, y: -30 },
    { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
  );

  gsap.fromTo(".crumb",
    { opacity: 0, x: 30 },
    { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
  );
});

// خروج
const animateExit = (tl) => {
  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const spiralX = Math.cos(angle) * (800 + Math.random() * 200);
    const spiralY = Math.sin(angle) * (800 + Math.random() * 200);
    const rot = 720 + Math.random() * 360;
    tl.to(
      node,
      {
        x: spiralX,
        y: spiralY,
        rotation: rot,
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
      },
      0
    );
  });
  tl.to(
    centerRef.value,
    {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 0.7,
      ease: "power4.inOut",
    },
    0.1
  );
};
</script>

<style scoped>
.bg-page {
  background: linear-gradient(5deg, #ffffff, #2c1d21);
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* ✅ نوار breadcrumb */
.breadcrumb-bar {
  position: absolute;
  top: 18vh;
  width: 50vw;
  right: 0px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  padding: 8px 20px;
  z-index: 100;
  font-size: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: right;
}

.barInfo-info {
  position: absolute;
  top: 8vh;
  width: 100vw;
  display: flex;
  height: 8vh;
  background-color: rgba(133, 35, 224, 0.4);
  justify-content: right;
  z-index: 60;
}

.breadcrumb {
  display: flex;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
  gap: 6px;
  background: rgba(29, 3, 3, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  padding: 6px 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
}

.barInfo {
  display: flex;
  align-items: center;
  justify-items: left;
  margin-top: 8px;
  margin-bottom: 8px;
  gap: 6px;
  background: rgba(29, 3, 3, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  padding: 6px 20px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.15);
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

.back-btn {
  position: absolute;
  top: 90vh;
  left: 4vw;
  font-style: bold;
  z-index: 50;
}

.center-node {
  position: absolute;
  width: 170px;
  height: 220px;
  margin-top: 17vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 10;
}

.center-img {
  width: 100%;
  height: 100%;
  object-fit: fit;
}

.node {
  position: absolute;
  width: 110px;
  height: 110px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #2196f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 8px;
  margin-top: 17vh;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transform: var(--node-translate) scale(1);
  transition: box-shadow 0.3s ease;
}

.node:hover {
  box-shadow: 0 0 16px rgba(103, 58, 183, 0.9);
}
</style>