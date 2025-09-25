<template>
  <svg :width="width" :height="height" class="bg-slate-900">
    <!-- نودهای اصلی -->
    <g
      v-for="node in mainNodes"
      :key="node.id"
      :transform="`translate(${node.x}, ${node.y})`"
      class="main-node"
      @mouseenter="showChildren(node)"
      @mouseleave="hideChildren(node)"
    >
      <polygon
        :points="hexPoints(0, 0, hexRadius)"
        :data-id="`hex-${node.id}`"
        :fill="node.fill"
        stroke="white"
        stroke-width="2"
      />
      <text
        x="0"
        y="5"
        text-anchor="middle"
        fill="white"
        font-size="12"
      >
        {{ node.label }}
      </text>
    </g>

    <!-- فرزندها -->
    <g
      v-if="activeNode"
      :transform="`translate(${activeNode.x}, ${activeNode.y})`"
      class="children-group"
    >
      <g
        v-for="child in children"
        :key="child.id"
        class="child-node"
        :transform="`translate(${child.x}, ${child.y})`"
      >
        <polygon
          :points="hexPoints(0, 0, hexRadius * 0.6)"
          :fill="child.fill"
          stroke="white"
          stroke-width="1.5"
        />
        <text
          x="0"
          y="4"
          text-anchor="middle"
          fill="white"
          font-size="10"
        >
          {{ child.label }}
        </text>
      </g>
    </g>
  </svg>
</template>

<script setup>
import { ref, nextTick } from "vue"
import { gsap } from "gsap"

const width = window.innerWidth
const height = window.innerHeight
const hexRadius = 70

const labels = [
  "پلاستیک",
  "غذایی",
  "شیمیایی",
  "رنگ و رزین",
  "چاپ",
  "بسته بندی",
  "چوب",
  "ساختمان",
  "فازی",
]

const mainNodes = labels.map((label, i) => {
  const angle = (i / labels.length) * Math.PI * 2
  return {
    id: i,
    label,
    x: width / 2 + 220 * Math.cos(angle),
    y: height / 2 + 220 * Math.sin(angle),
    fill: "#1976d2",
  }
})

const children = ref([])
const activeNode = ref(null)

function hexPoints(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i)
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)
    pts.push(`${x},${y}`)
  }
  return pts.join(" ")
}

function showChildren(node) {
  if (node.label !== "غذایی") return

  const childLabels = ["پروتئین", "نوشیدنی", "لبنی", "نان", "ترشیجات"]

  children.value = childLabels.map((lab, i) => {
    const angle = (i / childLabels.length) * Math.PI * 2
    return {
      id: `${node.id}-${i}`,
      label: lab,
      x: (hexRadius * 2) * Math.cos(angle),
      y: (hexRadius * 2) * Math.sin(angle),
      fill: "#f57c00",
    }
  })

  activeNode.value = node

  // scale نرم روی گروه نود
  gsap.to(`[data-id="hex-${node.id}"]`, {
    scale: 1.2,
    transformOrigin: "center center",
    duration: 0.4,
    ease: "power3.out",
  })

  // بعد از رندر فرزندها → انیمیشن ورود
  nextTick(() => {
    gsap.fromTo(
      ".child-node",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)", stagger: 0.05 }
    )
  })
}

function hideChildren(node) {
  // انیمیشن خروج فرزندها
  gsap.to(".child-node", {
    scale: 0,
    opacity: 0,
    duration: 0.25,
    ease: "power1.in",
    onComplete: () => {
      children.value = []
      activeNode.value = null
    },
  })

  gsap.to(`[data-id="hex-${node.id}"]`, {
    scale: 1,
    transformOrigin: "center center",
    duration: 0.25,
    ease: "power2.in",
  })
}
</script>

<style scoped>
svg {
  width: 100vw;
  height: 100vh;
  display: block;
}
</style>
