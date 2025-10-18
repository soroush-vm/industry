<template>
  <q-page class="bg-page flex flex-center">
    <q-btn
      label="بازگشت 🔙"
      color="amber"
      class="back-btn"
      @click="goBack"
    />
    <div class="center-node" ref="centerRef">
      <img src="/src/assets/gardeshgari.png" alt="مرحله اول" class="center-img" />
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
// const centerImg = ref(null);


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

// دکمه بازگشت → مرحله قبل
const goBack = () => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
      });
    },
  });

  animateExit(tl);
};


// فاصله شعاعی نودها
const radius = 350;

// محاسبه موقعیت دایره‌ای
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { "--node-translate": `translate(${x}px, ${y}px)` };
};

// هاور با GSAP
const hoverIn = (i) => {
  gsap.to(nodeRefs.value[i], { scale: 1.2, duration: 0.3, ease: "power2.out" });
};
const hoverOut = (i) => {
  gsap.to(nodeRefs.value[i], { scale: 1, duration: 0.3, ease: "power2.out" });
};

// کلیک روی نود → انیمیشن خروج + مسیر دهی
const onNodeClick = (sub) => {
  const timeline = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "Categories",
        params: { pathMatch: [segments[0], sub] },
      });
    }
  });

  // نودها پراکنده و چرخش و ناپدید شدن
  nodeRefs.value.forEach((node, i) => {
    const angle = (i / nodeRefs.value.length) * Math.PI * 2;
    const randX = Math.cos(angle) * 600 + (Math.random() - 0.5) * 200;
    const randY = Math.sin(angle) * 600 + (Math.random() - 0.5) * 200;
    const randRot = (Math.random() - 0.5) * 720;

    timeline.to(node, {
      x: randX,
      y: randY,
      rotation: randRot,
      scale: 0,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in"
    }, 0);
  });

  // مرکز هم محو و کوچک میشه
  timeline.to(centerRef.value, {
    scale: 0,
    opacity: 0,
    duration: 0.5,
    ease: "power3.in"
  }, 0);
};

// انیمیشن ورود
onMounted(async () => {
  await nextTick();

  // gsap.fromTo(centerImg.value,
  // { scale: 0, opacity: 0, rotation: -180 },
  // { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "elastic.out(1, 0.6)" }
  // );

  // // gsap.fromTo(centerRef.value,
  // //   { scale: 0, opacity: 0, y: -100 },
  // //   { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "elastic.out(1, 0.6)" }
  // // );
  // gsap.to(centerImg.value, {
  //   scale: 1.1,
  //   repeat: -1,
  //   yoyo: true,
  //   duration: 1.5,
  //   ease: "sine.inOut"
  // });

  gsap.fromTo(centerRef.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
  );

  gsap.fromTo(nodeRefs.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" }
  );
});

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
  background: linear-gradient(5deg, #ffffff, #2c1d21);
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
  font-weight: bold;
  text-align: center;
  color: #222;
  padding: 10px;
  z-index: 10;
}

.back-btn {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 50;
}


.node {
  position: absolute;
  width: 120px;
  height: 120px;
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
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease;

  transform: var(--node-translate) scale(1);
}
.center-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* هاور با GSAP انجام میشه، این فقط fallback */
.node:hover {
  box-shadow: 0 0 14px rgba(33, 150, 243, 0.9);
}
</style>
