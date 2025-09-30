<template>
  <q-page class="bg-page flex flex-center">
    <div class="honeycomb">
      <!-- همه سلول‌ها -->
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="hex-wrapper"
        ref="hexRefs"
        v-show="activeCell === null || activeCell === index"
        :class="{ 'active-hex': activeCell === index }"
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

    <!-- دکمه بازگشت -->
    <div v-if="activeCell !== null" class="back-btn" @click="collapse">
      بازگشت
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
const nodeCount = 6;
const rows = 6;
const cols = 8;

const getRowCol = (index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  return { row, col };
};

// وقتی روی سلول کلیک بشه
const expandCell = async (index) => {
  activeCell.value = index;
  await nextTick();

  // انیمیشن ظاهر شدن سلول انتخابی
  gsap.fromTo(
    hexRefs.value[index],
    { scale: 0.5, opacity: 0 },
    { scale: 1.5, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
  );

  // انیمیشن ظاهر شدن نودهای فرزند
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

// برگشت به حالت اولیه
const collapse = () => {
  activeCell.value = null;
};

// موقعیت‌دهی نودها
const getNodeStyle = (i, total) => {
  if (activeCell.value === null) return {};
  const { row, col } = getRowCol(activeCell.value);
  const baseRadius = 8 * window.innerWidth / 100;
  let angle;

  if (row === 0) {
    angle = (i / total) * Math.PI;
  } else if (row === rows - 1) {
    angle = Math.PI + (i / total) * Math.PI;
  } else if (col === 0) {
    angle = (i / total) * Math.PI - Math.PI / 2;
  } else if (col === cols - 1) {
    angle = (i / total) * Math.PI + Math.PI / 2;
  } else {
    angle = (i / total) * 2 * Math.PI;
  }

  const x = Math.cos(angle) * baseRadius;
  const y = Math.sin(angle) * baseRadius;

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
  grid-template-columns: repeat(8, 12.5vw);
  grid-template-rows: repeat(6, 14.43vh);
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hex-content {
  text-align: center;
  font-size: clamp(8px, 1vw, 10px);
  color: rgb(219, 199, 199);
  padding: 2px;
}

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

/* وقتی یک سلول انتخاب بشه */
.active-hex {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
  z-index: 20;
  transition: all 0.5s ease;
}

/* دکمه بازگشت */
.back-btn {
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 10px 20px;
  background: #ff6b6b;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  z-index: 30;
}

.back-btn:hover {
  background: #e63946;
}
</style>
