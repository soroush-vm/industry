<template>
  <q-page class="bg-page flex flex-center">
    <q-btn
      label="بازگشت 🔙"
      color="amber"
      class="back-btn"
      @click="goBack"
    />

    <div class="center-node" ref="centerRef">
      <img src="/src/assets/gardeshgari.png" alt="مرکز" class="center-img" />
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

// فاصله شعاعی بین نودها
const radius = 350;

// موقعیت دایره‌ای نودها
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { "--node-translate": `translate(${x}px, ${y}px)` };
};

// GSAP hover
const hoverIn = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1.3,
    duration: 0.4,
    ease: "elastic.out(1, 0.5)",
  });
};
const hoverOut = (i) => {
  gsap.to(nodeRefs.value[i], {
    scale: 1,
    duration: 0.4,
    ease: "elastic.out(1, 0.5)",
  });
};

// انیمیشن ورود با GSAP مدرن
onMounted(async () => {
  await nextTick();

  const tl = gsap.timeline();

  tl.fromTo(centerRef.value,
    { scale: 0, opacity: 0, rotation: -90 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1,
      ease: "elastic.out(1, 0.6)",
    }
  );

  // نودها یکی یکی وارد می‌شوند با افکت پرش و چرخش
  tl.fromTo(
    nodeRefs.value,
    { scale: 0, opacity: 0, rotation: -180 },
    {
      scale: 1,
      opacity: 1,
      rotation: 0,
      stagger: 0.08,
      duration: 1.1,
      ease: "back.out(1.8)",
    },
    "-=0.4"
  );
});

// خروج با انیمیشن گردبادی برای بازگشت
const goBack = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({ name: "Categories" });
    },
  });
  animateExit(tl);
};

// کلیک روی نود → خروج و مسیر جدید
const onNodeClick = (sub) => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
        params: { pathMatch: [segments[0], sub] },
      });
    },
  });

  animateExit(tl);
};

// انیمیشن خروج جدید (حرکت تصادفی گردبادی)
const animateExit = (tl) => {
  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const randX = Math.cos(angle) * (600 + Math.random() * 300);
    const randY = Math.sin(angle) * (600 + Math.random() * 300);
    const randRot = gsap.utils.random(-720, 720);

    tl.to(
      node,
      {
        x: randX,
        y: randY,
        rotation: randRot,
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "expo.inOut",
      },
      0
    );
  });

  // مرکز با چرخش و fade out
  tl.to(
    centerRef.value,
    {
      scale: 0,
      rotation: 360,
      opacity: 0,
      duration: 0.8,
      ease: "expo.inOut",
    },
    0.2
  );
};
</script>

<style scoped>
.bg-page {
  background: radial-gradient(circle at center, #ffffff 0%, #2c1d21 100%);
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.center-node {
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.center-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.node {
  position: absolute;
  width: 120px;
  height: 120px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: linear-gradient(135deg, #4caf50, #2196f3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  font-size: 13px;
  text-align: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transform: var(--node-translate) scale(1);
  transition: box-shadow 0.3s ease;
}

.node:hover {
  box-shadow: 0 0 18px rgba(33, 150, 243, 1);
}

.back-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 50;
}
</style>
