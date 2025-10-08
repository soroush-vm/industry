<template>
  <q-page class="bg-page flex flex-center">
    <div class="grid-wrapper">
      <div
        v-for="(cell, index) in cells"
        :key="index"
        class="para-wrapper"
        @click="onNodeClick(index + 1)"
        ref="setHexRef"
      >
        <div class="parallelogram">
          <div class="para-content">
            <p>{{ cell.text }}</p>
          </div>
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

// 🔹 گرید سلول‌ها
const cells = Array.from({ length: 48 }, (_, i) => ({
  text: `Cell ${i + 1}`,
}));

// 🔹 آرایه‌ی ref برای انیمیشن
const hexRefs = ref([]);

// تابع ثبت رفرنس‌ها (به‌جای ref مستقیم در v-for)
const setHexRef = (el) => {
  if (el) hexRefs.value.push(el);
};

// 🟣 انیمیشن‌ها بعد از mount
onMounted(async () => {
  await nextTick();

  // انیمیشن hover
  hexRefs.value.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(el, { scale: 1.1, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
  });

  // انیمیشن ورود اولیه
  gsap.from(hexRefs.value, {
    opacity: 0,
    y: 40,
    stagger: 0.05,
    duration: 0.6,
    ease: "power2.out",
  });
});

// 🟢 کلیک روی سلول → اجرای انیمیشن خروج و رفتن به صفحه جزئیات
const onNodeClick = (id) => {
  const tl = gsap.timeline({
    onComplete: () => {
      router.push({
        name: "categoryDetail",
        params: { id },
      });
    },
  });
  animateExit(tl);
};

// 🔄 انیمیشن خروج کل سلول‌ها
const animateExit = (tl) => {
  hexRefs.value.forEach((node, i) => {
    const angle = (i / hexRefs.value.length) * Math.PI * 2;
    const spiralX = Math.cos(angle) * (800 + Math.random() * 200);
    const spiralY = Math.sin(angle) * (800 + Math.random() * 200);
    const rot = 720 + Math.random() * 360;

    tl.to(
      node,
      {
        x: spiralX,
        y: spiralY,
        rotation: rot,
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
      },
      0
    );
  });
};
</script>

<style scoped>
/* 🟣 پس‌زمینه صفحه */
.bg-page {
  background: linear-gradient(135deg, #9464c7, #17376d);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

/* 🟡 گرید متوازی‌الاضلاع‌ها */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  width: 90vw;
  max-width: 1100px;
  justify-items: center;
  overflow: visible;
}

/* 🟢 باکس اصلی برای نگهداری شکل */
.para-wrapper {
  width: 120px;
  height: 90px;
  overflow: visible;
  transform-origin: center;
}

/* 🔶 خود متوازی‌الاضلاع */
.parallelogram {
  width: 100%;
  height: 100%;
  background: rgba(27, 7, 58, 0.4);
  border: 2px solid rgba(164, 192, 8, 0.8);
  transform: skew(-20deg);
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  border-radius: 6px;
}

/* ✨ محتوا با اصلاح skew */
.para-content {
  transform: skew(20deg);
  color: white;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  padding: 4px;
}

/* 📱 واکنش‌گرا */
@media (min-width: 600px) {
  .grid-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  }
}
@media (min-width: 1000px) {
  .grid-wrapper {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
