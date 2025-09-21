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
  background: url("/backGround.jpg") no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
}

.honeycomb {
  /* make the honeycomb fill the full viewport area and split into a fixed total of 48 cells
     using different column/row counts for breakpoints so cells always fill the page */
  height: 100vh;
  width: 100vw;
  display: grid;
  gap: 8px;
  /* default (mobile): 4 columns x 12 rows = 48 */
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(12, 1fr);
  box-sizing: border-box;
}

.hex {
  /* let each hex fill its grid cell */
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
  background: rgba(117, 50, 224, 0.2); /* رنگ جدید */
  border: 5px solid rgba(164, 192, 8, 0.6); /* رنگ خط دور */
}

.hex-content {
  text-align: center;
  font-size: 14px;
  color: white;
  padding: 5px;
}

/* medium screens: 6 columns x 8 rows */
@media (min-width: 600px) {
  .honeycomb {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
}

/* large screens: 8 columns x 6 rows */
@media (min-width: 1000px) {
  .honeycomb {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }
}
</style>
