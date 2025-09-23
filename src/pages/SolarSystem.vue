<template>
  <q-page class="circle-page flex flex-center fullscreen">
    <div class="zoom-controls">
      <button class="zoom-btn" @click="zoomOut">-</button>
      <button class="zoom-btn" @click="resetZoom">◯</button>
      <button class="zoom-btn" @click="zoomIn">+</button>
    </div>

    <div ref="graphWrap" class="graph-wrap">
      <v-network-graph
        class="graph"
        :nodes="nodes"
        :edges="edges"
        :layouts="layouts"
        :configs="configs"
      />
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
import gsap from "gsap"
import { defineConfigs } from "v-network-graph"

// ----------------------
// تعریف نودها
// ----------------------
const nodes = {
  center: { name: "مرکزی" },

  // چهار نود اصلی
  nodeA: { name: "Node A" },
  nodeB: { name: "Node B" },
  nodeC: { name: "Node C" },
  nodeD: { name: "Node D" },
}

// ساخت ۶ فرزند برای هر نود اصلی
for (let n of ["A", "B", "C", "D"]) {
  for (let i = 1; i <= 6; i++) {
    nodes[`${n}${i}`] = { name: `${n}${i}` }
  }
}

// ----------------------
// تعریف یال‌ها (اتصالات)
// ----------------------
const edges = {}

// اتصال مرکز به ۴ نود اصلی
edges.eA = { source: "center", target: "nodeA" }
edges.eB = { source: "center", target: "nodeB" }
edges.eC = { source: "center", target: "nodeC" }
edges.eD = { source: "center", target: "nodeD" }

// اتصال فرزندها به پدر خودشون
for (let n of ["A", "B", "C", "D"]) {
  for (let i = 1; i <= 6; i++) {
    edges[`${n}${i}`] = { source: `node${n}`, target: `${n}${i}` }
  }
}

// ----------------------
// موقعیت‌دهی دستی
// ----------------------
const layouts = { nodes: {} }

// مرکز
layouts.nodes.center = { x: 0, y: 0 }

// نودهای اصلی در چهار جهت
layouts.nodes.nodeA = { x: 250, y: 0 }
layouts.nodes.nodeB = { x: -250, y: 0 }
layouts.nodes.nodeC = { x: 0, y: 250 }
layouts.nodes.nodeD = { x: 0, y: -250 }

// فرزندها در اطراف پدر
function placeChildren(parent, count, radius) {
  const angleStep = (2 * Math.PI) / count
  for (let i = 0; i < count; i++) {
    const angle = i * angleStep
    const x = layouts.nodes[parent].x + radius * Math.cos(angle)
    const y = layouts.nodes[parent].y + radius * Math.sin(angle)
    layouts.nodes[`${parent[4]}${i + 1}`] = { x, y }
  }
}

placeChildren("nodeA", 6, 100)
placeChildren("nodeB", 6, 100)
placeChildren("nodeC", 6, 100)
placeChildren("nodeD", 6, 100)

// ----------------------
// تنظیمات استایل گراف
// ----------------------
const configs = defineConfigs({
  view: {
    // غیرفعال کردن زوم داخلی کتابخانه (touchpad / native scroll zoom)
    zoomEnabled: false,
    // اگر می‌خواهی pan (جابجایی) هم غیرفعال باشد این را false کن
    panEnabled: true,
  },
  node: {
    normal: { radius: 20, color: "#8e44ad", strokeColor: "#fff" },
    hover: { radius: 25, color: "#3498db" },
    label: { visible: true, fontSize: 12, color: "#fff" },
  },
  edge: {
    normal: { color: "#aaa", width: 2 },
  },
})
  gsap.to(".v-ng-edge path", {
    strokeWidth: 4,         // ضخامت یال‌ها زیاد و کم شود
    stroke: "#f1c40f",      // رنگ یال‌ها در پالسی تغییر کند (اختیاری)
    duration: 1,            // هر پالس ۱ ثانیه
    yoyo: true,             // بازگشت به حالت اولیه
    repeat: -1,             // تکرار بی‌نهایت
    ease: "sine.inOut",
    stagger: {
      each: 0.1             // فاصله شروع هر یال برای جلوه آبشاری
    }
  })

// ----------------------
// GSAP انیمیشن
// ----------------------
// onMounted(() => {
//   gsap.from(".v-ng-node circle", {
//     scale: 0,
//     opacity: 0,
//     stagger: 0.05,
//     duration: 0.5,
//     ease: "back.out(1.7)",
//   })

//   gsap.to(".v-ng-node circle", {
//     scale: 1.2,
//     yoyo: true,
//     repeat: -1,
//     duration: 1.5,
//     ease: "sine.inOut",
//     stagger: {
//       amount: 2,
//       repeat: -1,
//     },
//   })
// })
// Zoom state and handlers

const graphWrap = ref(null)
const scale = ref(1)
const MIN_SCALE = 0.3
const MAX_SCALE = 3
const SCALE_STEP = 0.1

function applyScale() {
  const el = graphWrap.value
  if (!el) return
  el.style.transform = `scale(${scale.value})`
  el.style.transformOrigin = '50% 50%'
}

function zoomIn() {
  scale.value = Math.min(MAX_SCALE, +(scale.value + SCALE_STEP).toFixed(3))
  applyScale()
}

function zoomOut() {
  scale.value = Math.max(MIN_SCALE, +(scale.value - SCALE_STEP).toFixed(3))
  applyScale()
}

function resetZoom() {
  scale.value = 1
  applyScale()
}

function onWheel(e) {
  // Use Ctrl+wheel or plain wheel for zoom depending on preference
  const doZoom = e.ctrlKey || true // allow plain wheel as well; set to `e.ctrlKey` to require ctrl
  if (!doZoom) return
  e.preventDefault()
  const delta = e.deltaY
  if (delta > 0) {
    zoomOut()
  } else if (delta < 0) {
    zoomIn()
  }
}

onMounted(() => {
  gsap.from(".v-ng-node circle", {
    opacity: 0,
    scale: 0,
    stagger: 0.05,
    duration: 0.6,
    ease: "back.out(1.7)",
  })

  gsap.to(".v-ng-node circle", {
    fill: "#f1c40f",
    opacity: 0.6,
    yoyo: true,
    repeat: -1,
    duration: 1.5,
    stagger: {
      each: 0.1,
    },
    ease: "power1.inOut",
  })

  // attach wheel listener to container for zoom
  const wrapEl = graphWrap.value || document
  wrapEl.addEventListener("wheel", onWheel, { passive: false })
  // initial scale apply
  applyScale()
})

onBeforeUnmount(() => {
  const wrapEl = graphWrap.value || document
  wrapEl.removeEventListener("wheel", onWheel)
})

</script>

<style scoped>
.circle-page {
  background: radial-gradient(circle at center, #1e1e2f, #0d0d17);
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.graph {
  width: 100%;
  height: 100%;
}

.graph-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform will be applied by JS for zoom */
}

.zoom-controls {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
  z-index: 20;
}

.zoom-btn {
  background: rgba(0,0,0,0.6);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.12);
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.zoom-btn:hover { opacity: 0.9 }
</style>
