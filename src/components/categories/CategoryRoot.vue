<template>
  <q-page class="bg-page">
    <!-- لوگوهای دو طرف -->
    <img class="center-logo" src="/src/assets/logo-main.png" alt="center logo" />
    <img class="allah-logo-left" src="/src/assets/flag.png" alt="logo" />

    <!-- دو بخش چپ و راست -->
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

    <img class="allah-logo-right" src="/src/assets/flag.png" alt="logo" />
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

// ✅ اصلاح شده: جبران ایندکس برای آیتم‌های سمت راست
const goToCategory = (cat, index, isRight = false) => {
  const actualIndex = isRight ? index + cellLeft.value.length : index;
  const el = hexRefs.value[actualIndex];
  if (!el) return;

  gsap.to(el, {
    opacity: 0,
    scale: 0.5,
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

  // انیمیشن Hover
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

    gsap.from(".center-logo", {
    opacity: 0,
    scale: 0.7,
    duration: 0.8,
    ease: "back.out(1.7)",
  });


  // انیمیشن ورود
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
/* ===== پس‌زمینه اصلی ===== */
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

.center-logo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  width: 200px; /* اندازه دلخواه */
  height: auto;
  z-index: 8; /* بالاتر از بک‌گراند ولی زیر border */
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.2));
  pointer-events: none; /* باعث میشه کلیک‌ها به بقیه عناصر برسن */
}


.bg-page::before {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.25) inset;
  pointer-events: none;
}

.allah-logo-left,
.allah-logo-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  width: 60px;
  height: auto;
  z-index: 10;
}

/* حرکت دادن لوگو روی بردر چپ */
.allah-logo-left {
  left: 0;
  transform: translate(-20%, -20%); /* لوگو میاد روی بردر بیرونی */
}

/* حرکت دادن لوگو روی بردر راست */
.allah-logo-right {
  right: 0;
  transform: translate(20%, -20%);
}


/* ===== ساختار کلی دو بخش ===== */
.main-grid {
  display: flex;
  width: 90%;
  height: 60%;
  justify-content: space-between;
  align-items: center;
  gap: 300px;
}

/* ===== هر نیمه ===== */
.half-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 16px;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.img-text {
  color: black;
  text-align: center;
  margin-top: 8px;
  font-size: 1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .bg-page {
    height: auto; /* چون اسکرول می‌خواهیم، ارتفاع ثابت نمی‌خوایم */
    width: 100%;
    padding: 16px;
    overflow-y: auto; /* فعال شدن اسکرول عمودی */
    border-width: 6px;
  }

  .main-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    width: 100%;
  }

  .center-logo {
    position: relative;
    top: 0;
    left: 0;
    transform: none;
    width: 140px;
    height: auto;
    margin-bottom: 12px;
  }

  .half-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    justify-items: center;
    width: 100%;
  }

  /* اگر بخوای هر دسته تکی زیر هم باشه (نه دوتا در عرض)، این رو فعال کن */
  /* .half-grid {
    grid-template-columns: 1fr;
  } */

  .img-container {
    width: 140px;
    height: 140px;
  }

  .img-text {
    font-size: 0.9rem;
  }

  .allah-logo-left,
  .allah-logo-right {
    display: none;
  }
}

</style>
