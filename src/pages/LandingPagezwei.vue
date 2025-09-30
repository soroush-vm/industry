<template>
  <q-page class="bg-page flex flex-center" @click.self="collapse">
    <div class="honeycomb">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="hex-wrapper"
        ref="hexRefs"
      >
        <!-- سلول شش‌ضلعی -->
        <div
          class="hex"
          @click.stop="expandCell(index)"
        >
          <div class="hex-content">
            <p>{{ cell.text }}</p>
          </div>
        </div>

        <!-- نودهای اطراف -->
        <div
          v-if="activeCell === index"
          class="nodes-wrapper"
        >
          <div
            v-for="(node, i) in nodeCount"
            :key="i"
            class="node"
            :style="getNodeStyle(i, nodeCount)"
            @click.stop="onNodeClick(i)"
            ref="nodeRefs"
          >
            N{{ i + 1 }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, nextTick } from "vue";
import gsap from "gsap";

const activeCell = ref(null);
const cells = Array.from({ length: 48 }, (_, i) => ({ text: `Cell ${i + 1}` }));

const hexRefs = ref([]);
const nodeRefs = ref([]);
const nodeCount = 6; // چندتا آیتم دور شش‌ضلعی

// // وقتی روی سلول کلیک میشه
// const expandCell = async (index) => {
//   activeCell.value = index;
//   await nextTick();

//   const selected = hexRefs.value[index].getBoundingClientRect();

//   // همه‌ی سلول‌ها رو بررسی کن
//   hexRefs.value.forEach((hex, i) => {
//     const rect = hex.getBoundingClientRect();
//     const dx = rect.x - selected.x;
//     const dy = rect.y - selected.y;
//     const dist = Math.sqrt(dx * dx + dy * dy);

//     if (i !== index && dist < 250) {
//       // فقط سلول‌های نزدیک رو حرکت بده
//       gsap.to(hex, {
//         x: dx * 0.15, // مقدار جابه‌جایی نسبی
//         y: dy * 0.15,
//         duration: 0.5,
//         ease: "power2.out",
//       });
//     }
//   });

//   // انیمیشن ظاهر شدن نودهای فرزند
//   gsap.fromTo(
//     nodeRefs.value,
//     { scale: 0, opacity: 0 },
//     {
//       scale: 1,
//       opacity: 1,
//       duration: 0.5,
//       stagger: 0.1,
//       ease: "back.out(1.7)",
//     }
//   );
// };
const expandCell = async (index) => {
  activeCell.value = index;
  await nextTick();

  const selected = hexRefs.value[index].getBoundingClientRect();
  const centerX = selected.x + selected.width / 2;
  const centerY = selected.y + selected.height / 2;

  hexRefs.value.forEach((hex, i) => {
    if (i === index) return;

    const rect = hex.getBoundingClientRect();
    const hexCenterX = rect.x + rect.width / 2;
    const hexCenterY = rect.y + rect.height / 2;

    const dx = hexCenterX - centerX;
    const dy = hexCenterY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 300) {
      const factor = 50 / dist; // هرچی نزدیک‌تره بیشتر هل داده بشه
      gsap.to(hex, {
        x: dx * factor,
        y: dy * factor,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });

  // انیمیشن ظاهر شدن نودها
  gsap.fromTo(
    nodeRefs.value,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    }
  );
};


// بستن و برگشتن همه به حالت اولیه
const collapse = () => {
  activeCell.value = null;
  gsap.to(hexRefs.value, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
  });
};

// پخش شدن نودها به صورت دایره‌ای دور سلول
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const radius = 8 * window.innerWidth / 100; // فاصله نسبی از مرکز
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return {
    transform: `translate(${x}px, ${y}px)`,
  };
};

const onNodeClick = (i) => {
  console.log("Node clicked:", i);
};
</script>

<style scoped>
.bg-page {
  background: linear-gradient(135deg, #9464c7, #17376d);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.honeycomb {
  display: grid;
  gap: 4px;
  box-sizing: border-box;
  grid-template-columns: repeat(8, 12.5vw);
  grid-template-rows: repeat(6, 14.43vh);
  width: 100vw;
  height: 100vh;
  padding: 0;
  align-content: center;
  justify-content: center;
}

.hex-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hex {
  width: 12.5vw;
  height: 14.43vh;
  clip-path: polygon(
    50% 0%,
    95% 25%,
    95% 75%,
    50% 100%,
    5% 75%,
    5% 25%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(27, 7, 58, 0.4);
  border: 2px solid rgba(164, 192, 8, 0.8);
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
}

.hex:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 0 10px rgba(164, 192, 8, 0.8);
  filter: brightness(1.2);
}

.hex-content {
  text-align: center;
  font-size: clamp(8px, 1vw, 10px);
  color: rgb(219, 199, 199);
  padding: 2px;
}

/* نودهای اطراف */
.nodes-wrapper {
  position: absolute;
  z-index: 10;
  top: 25%;
  left: 25%;
}

.node {
  position: absolute;
  width: 6vw;
  height: 6.93vh;
  clip-path: polygon(
    50% 0%,
    95% 25%,
    95% 75%,
    50% 100%,
    5% 75%,
    5% 25%
  );
  background: #58a8f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(6px, 0.8vw, 8px);
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.node:hover {
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 0 8px rgba(88, 168, 243, 0.8);
}
</style>
