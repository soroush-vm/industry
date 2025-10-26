<template>
  <q-page class="bg-page">
    <!-- لوگوی اصلی -->
    <img class="center-logo" src="/src/assets/logo-main.png" alt="center logo" />

    <!-- کانتینر آیکون‌ها -->
    <div class="icons-container">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="img-wrapper"
        ref="hexRefs"
        :style="{ top: cell.top, left: cell.left }"
        @click="goToCategory(cell.category, index)"
      >
        <div class="img-container">
          <img :src="cell.image" :alt="cell.text" class="category-img" />
        </div>
        <p class="img-text">{{ cell.text }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const hexRefs = ref([]);
const cells = ref([]);

/* ===== چیدمان دسکتاپ ===== */
const desktopCells = [
  { text: "سامانه جامع مالی", category: "mali", image: "/src/assets/mali.png", top: "40vh", left: "22vw" },
  { text: "سامانه جامع عمران", category: "omran", image: "/src/assets/omran.png", top: "70vh", left: "12vw" },
  { text: "سامانه جامع سلامت", category: "salamat", image: "/src/assets/salamat.png", top: "40vh", left: "12vw" },
  { text: "سامانه جامع صنایع", category: "sanaye", image: "/src/assets/sanaye.png", top: "70vh", left: "22vw" },
  { text: "سامانه جامع معادن", category: "maaden", image: "/src/assets/maaden.png", top: "40vh", left: "32vw" },
  { text: "سامانه جامع تجارت", category: "tejarat", image: "/src/assets/tejarat.png", top: "70vh", left: "32vw" },
  { text: "سامانه جامع کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png", top: "40vh", left: "65vw" },
  { text: "سامانه جامع حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png", top: "70vh", left: "65vw" },
  { text: "سامانه جامع گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png", top: "40vh", left: "75vw" },
  { text: "سامانه جامع فناوری", category: "fanavari", image: "/src/assets/fanavari.png", top: "70vh", left: "75vw" },
  { text: "سامانه جامع اصناف", category: "asnaf", image: "/src/assets/asnaf.png", top: "40vh", left: "85vw" },
  { text: "سامانه جامع آموزش", category: "amozesh", image: "/src/assets/amozesh.png", top: "70vh", left: "85vw" },
];

/* ===== چیدمان موبایل ===== */
const mobileCells = [
  { text: "مالی", category: "mali", image: "/src/assets/mali.png", top: "10vh", left: "18vw" },
  { text: "عمران", category: "omran", image: "/src/assets/omran.png", top: "10vh", left: "46vw" },
  { text: "سلامت", category: "salamat", image: "/src/assets/salamat.png", top: "10vh", left: "74vw" },
  { text: "صنایع", category: "sanaye", image: "/src/assets/sanaye.png", top: "27vh", left: "18vw" },
  { text: "معادن", category: "maaden", image: "/src/assets/maaden.png", top: "27vh", left: "46vw" },
  { text: "تجارت", category: "tejarat", image: "/src/assets/tejarat.png", top: "27vh", left: "74vw" },
  { text: "کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png", top: "44vh", left: "18vw" },
  { text: "حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png", top: "44vh", left: "46vw" },
  { text: "گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png", top: "44vh", left: "74vw" },
  { text: "فناوری", category: "fanavari", image: "/src/assets/fanavari.png", top: "61vh", left: "18vw" },
  { text: "اصناف", category: "asnaf", image: "/src/assets/asnaf.png", top: "61vh", left: "46vw" },
  { text: "آموزش", category: "amozesh", image: "/src/assets/amozesh.png", top: "61vh", left: "74vw" },
];

/* ===== رفتن به مسیر دسته‌بندی ===== */
const goToCategory = (cat, index) => {
  const el = hexRefs.value[index];
  if (!el) return;

  gsap.to(el, {
    opacity: 0,
    rotate: 180,
    scale: 0.9,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => router.push({ name: "Categories", params: { pathMatch: cat } }),
  });
};

/* ===== GSAP setup ===== */
onMounted(async () => {
  const mm = gsap.matchMedia();

  /* ==== موبایل ==== */
  mm.add("(max-width: 768px)", async () => {
    cells.value = mobileCells;
    await nextTick(); // صبر برای ساخت DOM

    gsap.from(".center-logo", { opacity: 0, y: -20, duration: 0.5 });

    gsap.from(hexRefs.value, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out"
    });
  });

  /* ==== دسکتاپ ==== */
  mm.add("(min-width: 769px)", async () => {
    cells.value = desktopCells;
    await nextTick(); // ✅ صبر تا hexRefs پر شود

    gsap.from(".center-logo", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "back.out(1.5)"
    });

    gsap.from(hexRefs.value, {
      opacity: 0,
      scale: 0.9,
      stagger: 0.08,
      duration: 0.7,
      ease: "power2.out"
    });

    // ✅ Hover Event بعد از ساخت کامل DOM
    hexRefs.value.forEach((el) => {
      el.addEventListener("mouseenter", () =>
        gsap.to(el, { scale: 1.06, duration: 0.25 })
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(el, { scale: 1, duration: 0.25 })
      );
    });
  });

  onBeforeUnmount(() => mm.revert());
});
</script>
<!-- 
<style scoped>
.bg-page {
  position: relative;
  background: url('/src/assets/back ground.png') no-repeat center center fixed;
  background-size: cover;
  width: 100vw;
  min-height: 100vh;
  border: 14px solid transparent;
  border-image: linear-gradient(to bottom, #009639 0%, #ffffff 50%, #da0000 100%) 1;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;
}

.center-logo {
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 160px);
  width: 300px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
}

.icons-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 5;
}

.img-wrapper {
  position: absolute;
  top: 10vh;
  left: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.img-container {
  width: 240px;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.img-text {
  color: #000;
  text-align: center;
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 6px;
}

/* ==== موبایل ==== */
@media (max-width: 768px) {
  .bg-page {
    height: 100vh;
    padding: 0 10px;
  }

  .center-logo {
    position: relative;
    top: 5vh;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    margin-bottom: 4vh;
  }

  .icons-container {
    position: relative;
    height: auto;
    min-height: 100vh;
  }

  .img-wrapper {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .img-container {
    width: 120px;
    height: 120px;
  }

  .img-text {
    font-size: 1.5rem;
  }
}
</style> -->

<style scoped>
.bg-page {
  position: relative;
  background: url('/src/assets/back ground.png') no-repeat center center fixed;
  background-size: cover;
  width: 100%;
  min-height: 100%;
  border: 14px solid transparent;
  border-image: linear-gradient(to bottom, #009639 0%, #ffffff 50%, #da0000 100%) 1;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;
}

.center-logo {
  position: absolute;
  top: calc(50% - 150px);
  left: calc(50% - 160px);
  width: 300px;
  height: auto;
  z-index: 10;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25));
}

.icons-container {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 5;
}

.img-wrapper {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.img-container {
  width: 240px;
  height: 240px;
  border-radius: 16px;
  overflow: hidden;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.img-text {
  color: #000;
  text-align: center;
  font-weight: 600;
  font-size: 1.3rem;
  margin-top: 6px;
}

/* ==== موبایل ==== */
@media (max-width: 768px) {
  .bg-page {
    overflow-y: hidden;
    height: 100vh;
    padding: 0 10px;
  }

  .center-logo {
    position: relative;
    top: 5vh;
    left: 50%;
    transform: translateX(-50%);
    width: 90px;
    margin-bottom: 4vh;
  }

  .icons-container {
    position: relative;
    height: auto;
    min-height: 100vh;
  }

  .img-wrapper {
    position: absolute;
    transform: translate(-50%, -50%);
  }

  .img-container {
    width: 120px;
    height: 120px;
  }

  .img-text {
    font-size: 1.5rem;
  }
}
</style>
