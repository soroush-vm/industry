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

const cells = [
  { text: "Cell 1" },
  { text: "Cell 2" },
  { text: "Cell 3" },
  { text: "Cell 4" },
  { text: "Cell 5" },
  { text: "Cell 6" },
];

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
  display: grid;
  grid-template-columns: repeat(3, 120px);
  grid-gap: 10px;
}

.hex {
  width: 120px;
  height: 104px;
  background: rgba(255, 215, 0, 0.1);
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
  border: 1px solid gold;
}

.hex-content {
  text-align: center;
  font-size: 14px;
  color: white;
  padding: 5px;
}
</style>
