<template>
  <q-page class="bg-page flex flex-center">
    <div class="honeycomb">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="hex-wrapper"
      >
        <!-- سلول شش‌ضلعی -->
        <div
          class="hex"
          ref="hexRefs"
          @click="expandCell(index)"
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

// وقتی روی سلول کلیک میشه
const expandCell = async (index) => {
  activeCell.value = index;
  await nextTick();

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

// پخش شدن نودها به صورت دایره‌ای دور سلول
const getNodeStyle = (i, total) => {
  const angle = (i / total) * 2 * Math.PI;
  const radius = 90; // فاصله از مرکز شش‌ضلعی
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
  gap: 8px;
  box-sizing: border-box;
  grid-template-columns: repeat(4, calc((100vw - 3*8px)/4));
  grid-template-rows: repeat(12, calc((100vh - 11*8px)/12));
}

.hex-wrapper {
  position: relative; /* مهم! برای نودهای اطراف */
  display: flex;
  align-items: center;
  justify-content: center;
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
  background: rgba(27, 7, 58, 0.4);
  border: 3px solid rgba(164, 192, 8, 0.8);
}

.hex-content {
  text-align: center;
  font-size: clamp(10px, 1vw, 14px);
  color: white;
  padding: 5px;
}

/* نودهای اطراف */
.nodes-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
}

.node {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #ffc107;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 8px rgba(0,0,0,0.4);
}
</style>
