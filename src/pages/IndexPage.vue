<template>
  <q-page class="bg-page flex flex-center">
    <div class="honeycomb">
        <div
          v-for="(cell, index) in cells"
          :key="index"
          class="hex"
          ref="hexRefs"
        >
          <div class="hex-content">
            <p>{{ cell.text }}</p>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";

// generate 48 cells
const cells = Array.from({ length: 48 }, (_, i) => ({ text: `Cell ${i + 1}` }));

const hexRefs = ref([]);

onMounted(async () => {
  await nextTick();

  // GSAP hover animation
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // Entrance animation
  gsap.from(hexRefs.value, {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
  });
});
</script>

<style scoped>
.bg-page {
  /* تغییر بک‌گراند */
  background: linear-gradient(135deg, #9464c7, #17376d); /* مثال گرادینت */
  /* یا رنگ ساده: background-color: #1a1a1a; */
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* جلوگیری از اسکرول */
}

.honeycomb {
  display: grid;
  gap: 8px;
  box-sizing: border-box;

  /* موبایل: 4 ستون × 12 ردیف */
  grid-template-columns: repeat(4, calc((100vw - 3*8px)/4));
  grid-template-rows: repeat(12, calc((100vh - 11*8px)/12));
}

.hex {
  width: 100%;
  height: 100%;
  clip-path: polygon(
    50% 0%,
    93% 25%,
    93% 75%,
    50% 100%,
    7% 75%,
    7% 25%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;
  background: rgba(27, 7, 58, 0.4); /* رنگ پس‌زمینه */
  border: 3px solid rgba(164, 192, 8, 0.8); /* رنگ خط دور */
}

.hex-content {
  text-align: center;
  font-size: clamp(10px, 1vw, 14px); /* اندازه واکنش‌گرا */
  color: white;
  padding: 5px;
}

/* تبلت: 6 ستون × 8 ردیف */
@media (min-width: 600px) {
  .honeycomb {
    grid-template-columns: repeat(6, calc((100vw - 5*8px)/6));
    grid-template-rows: repeat(8, calc((100vh - 7*8px)/8));
  }
}

/* دسکتاپ: 8 ستون × 6 ردیف */
@media (min-width: 1000px) {
  .honeycomb {
    grid-template-columns: repeat(8, calc((100vw - 7*8px)/8));
    grid-template-rows: repeat(6, calc((100vh - 5*8px)/6));
  }
}
</style>
