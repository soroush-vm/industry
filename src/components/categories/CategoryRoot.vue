<template>
  <q-page class="bg-page">
    <!-- لوگوی وسط -->
    <img class="center-logo" src="/src/assets/logo-main.png" alt="center logo" />

    <!-- ساختار دو بخش چپ و راست -->
    <div class="main-grid">
      <!-- بخش چپ -->
      <div class="half-grid left-grid">
        <div
          v-for="(cell, index) in cellLeft"
          :key="'left-' + index"
          class="img-wrapper"
          ref="hexRefs"
          @click="goToCategory(cell.category, index, false)"
        >
          <div class="img-container">
            <img :src="cell.image" :alt="cell.text" class="category-img" />
          </div>
          <p class="img-text">{{ cell.text }}</p>
        </div>
      </div>

      <!-- بخش راست -->
      <div class="half-grid right-grid">
        <div
          v-for="(cell, index) in cellRight"
          :key="'right-' + index"
          class="img-wrapper"
          ref="hexRefs"
          @click="goToCategory(cell.category, index, true)"
        >
          <div class="img-container">
            <img :src="cell.image" :alt="cell.text" class="category-img" />
          </div>
          <p class="img-text">{{ cell.text }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";

const router = useRouter();
const hexRefs = ref([]);

const cellLeft = ref([
  { text: "مالی", category: "mali", image: "/src/assets/mali.png" },
  { text: "عمران", category: "omran", image: "/src/assets/omran.png" },
  { text: "سلامت", category: "salamat", image: "/src/assets/salamat.png" },
  { text: "صنایع", category: "sanaye", image: "/src/assets/sanaye.png" },
  { text: "معادن", category: "maaden", image: "/src/assets/maaden.png" },
  { text: "تجارت", category: "tejarat", image: "/src/assets/tejarat.png" },
]);

const cellRight = ref([
  { text: "کشاورزی", category: "keshavarzi", image: "/src/assets/keshavarzi.png" },
  { text: "حمل و نقل", category: "hamlonaghl", image: "/src/assets/hamlnaghl.png" },
  { text: "گردشگری", category: "gardeshgari", image: "/src/assets/gardeshgari.png" },
  { text: "فناوری", category: "fanavari", image: "/src/assets/fanavari.png" },
  { text: "اصناف", category: "asnaf", image: "/src/assets/asnaf.png" },
  { text: "آموزش", category: "amozesh", image: "/src/assets/amozesh.png" },
]);

// انیمیشن کلیک
const goToCategory = (cat, index, isRight = false) => {
  const actualIndex = isRight ? index + cellLeft.value.length : index;
  const el = hexRefs.value[actualIndex];
  if (!el) return;

  gsap.to(el, {
    opacity: 0,
    scale: 1,
    rotate: 180,
    duration: 0.5,
    ease: "power2.in",
    onComplete: () => {
      router.push({ name: "Categories", params: { pathMatch: cat } });
    },
  });
};

onMounted(async () => {
  await nextTick();

  // انیمیشن hover
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // انیمیشن لوگو
  gsap.from(".center-logo", {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // انیمیشن ورود آیتم‌ها
  gsap.from(hexRefs.value, {
    opacity: 0,
    y: 40,
    stagger: 0.05,
    duration: 0.6,
    ease: "power2.out",
  });
});
</script>

<style scoped>
/* ===== پس‌زمینه ===== */
.bg-page {
  position: relative;
  background: url('/src/assets/back ground.png') no-repeat center center fixed;
  background-size: cover;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 14px solid transparent;
  border-image: linear-gradient(to bottom, #009639 0%, #ffffff 50%, #da0000 100%) 1;
  border-radius: 20px;
}

.bg-page::before {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.25) inset;
  pointer-events: none;
}

.center-logo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 200px;
  height: auto;
  z-index: 8;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
  pointer-events: none;
}

/* ===== ساختار کلی ===== */
.main-grid {
  display: flex;
  width: 90%;
  height: 60%;
  justify-content: space-between;
  align-items: center;
  gap: 250px; /* کمتر شد برای سه‌تایی */
}

/* ===== چیدمان هر نیمه ===== */
.half-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ سه‌تایی */
  gap: 10px;
  justify-items: center;
  align-items: center;
}

/* ===== تصویر و متن ===== */
.img-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.img-container {
  width: 150px; /* کمی کوچک‌تر شد */
  height: 150px;
  overflow: hidden;
  border-radius: 16px;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 1s ease;
}

.img-text {
  color: black;
  text-align: center;
  margin-top: 4px;
  font-size: 1.3rem;
  font-weight: 600;
}
</style>
