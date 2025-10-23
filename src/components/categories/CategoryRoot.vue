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
  { text: "مالی", category: "mali", image: "/src/assets/mali.png", top: "40vh", left: "22vw" },
  { text: "عمران", category: "omran", image: "/src/assets/omran.png", top: "60vh", left: "12vw" },
  { text: "سلامت", category: "salamat", image: "/src/assets/salamat.png", top: "40vh", left: "12vw" },
  { text: "صنایع", category: "sanaye", image: "/src/assets/sanaye.png", top: "60vh", left: "22vw" },
  { text: "معادن", category: "maaden", image: "/src/assets/maaden.png", top: "40vh", left: "32vw" },
  { text: "تجارت", category: "tejarat", image: "/src/assets/tejarat.png", top: "60vh", left: "32vw" },
  { text: "کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png", top: "40vh", left: "65vw" },
  { text: "حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png", top: "60vh", left: "65vw" },
  { text: "گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png", top: "40vh", left: "75vw" },
  { text: "فناوری", category: "fanavari", image: "/src/assets/fanavari.png", top: "60vh", left: "75vw" },
  { text: "اصناف", category: "asnaf", image: "/src/assets/asnaf.png", top: "40vh", left: "85vw" },
  { text: "آموزش", category: "amozesh", image: "/src/assets/amozesh.png", top: "60vh", left: "85vw" },
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

/* ===== GSAP setup با ScrollTrigger.matchMedia ===== */
onMounted(async () => {
  await nextTick();

  const ctx = gsap.context(() => {
    ScrollTrigger.matchMedia({
      /* ===== موبایل ===== */
      "(max-width: 768px)": function () {
        cells.value = mobileCells;

        gsap.from(".center-logo", { opacity: 0, y: -20, duration: 0.5 });

        hexRefs.value.forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.out"
          });

          el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.06, duration: 0.25 }));
          el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.25 }));
        });

        // ✅ کنترل اسکرول با فاصله 250px از پایین صفحه
        const pageEl = document.querySelector(".bg-page");
        const contentEl = document.querySelector(".icons-container");

        const checkOverflow = () => {
          const minGap = 250; // اگر کمتر از این فاصله با انتهای صفحه داشت، اسکرول فعال شود
          const diff = window.innerHeight - contentEl.scrollHeight;

          if (diff < minGap) {
            pageEl.style.overflowY = "auto";
          } else {
            pageEl.style.overflowY = "hidden";
          }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
      },

      /* ===== دسکتاپ ===== */
      "(min-width: 769px)": function () {
        cells.value = desktopCells;

        gsap.from(".center-logo", {
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          ease: "back.out(1.5)"
        });

        hexRefs.value.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            scale: 0.9,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out"
          });

          el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.06, duration: 0.25 }));
          el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1, duration: 0.25 }));
        });
      }
    });
  });

  onBeforeUnmount(() => ctx.revert());
});
</script>

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
  top: calc(50% - 75px);
  left: calc(50% - 75px);
  width: 150px;
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
  width: 140px;
  height: 140px;
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
  font-size: 1.2rem;
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
    width: 90px;
    height: 90px;
  }

  .img-text {
    font-size: 1rem;
  }
}
</style>
