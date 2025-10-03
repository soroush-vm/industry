<template>
  <q-page class="bg-page flex flex-center">
    <!-- نود مرکزی -->
    <div class="center-node" ref="centerRef">
      مرحله اول
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

  gsap.fromTo(centerRef.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
  );

  gsap.fromTo(nodeRefs.value,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)" }
  );
});
</script>

<style scoped>
.bg-page {
  background: linear-gradient(135deg, #000000, #6d011c);
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
  width: 150px;
  height: 150px;
  clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background: #5dad2f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  color: #222;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  padding: 10px;
  z-index: 10;
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

/* هاور با GSAP انجام میشه، این فقط fallback */
.node:hover {
  box-shadow: 0 0 14px rgba(33, 150, 243, 0.9);
}
</style>
