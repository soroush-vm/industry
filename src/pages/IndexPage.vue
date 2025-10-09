<template>
  <q-page class="home-page flex flex-center column">
    <!-- عنوان -->
    <h1 ref="titleRef" class="title">
      به دنیای صنایع خوش آمدید 🌿
    </h1>

    <!-- متن توضیح -->
    <p ref="textRef" class="description">
      در این وب‌سایت، مجموعه‌ای از <b>صنایع و تولیدات محلی</b> را معرفی می‌کنیم.
      هدف ما آشنایی بیشتر با دسته‌های مختلف محصولات است — از مواد غذایی گرفته تا محصولات ارگانیک و فرآوری‌شده.
    </p>

    <!-- دکمه رفتن به دسته‌ها -->
    <q-btn
      ref="btnRef"
      label="برو به دسته‌ها"
      color="amber"
      class="go-btn"
      @click="goToCategories"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import gsap from "gsap";
// import bgImage from "../assets/tejarat.png"; // ← تصویر پس‌زمینه

const titleRef = ref(null);
const textRef = ref(null);
const btnRef = ref(null);
const router = useRouter();

const goToCategories = () => {
  const tl = gsap.timeline({
    onComplete: () => router.push("/categories"),
  });

  tl.to(btnRef.value, { scale: 0.9, duration: 0.2, ease: "power1.inOut" })
    .to(".home-page *", {
      opacity: 0,
      y: -40,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.in",
    });
};

// انیمیشن ورود
onMounted(() => {
  gsap.from(titleRef.value, {
    y: -40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(textRef.value, {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from(btnRef.value, {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    delay: 1,
    ease: "back.out(1.8)",
  });
});
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
  overflow: hidden;
  background: url('/src/assets/tejarat.png') center center / cover no-repeat;
}

/* لایه‌ی گرادیانت برای خوانایی بهتر متن */
.home-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 78, 146, 0.5));
  z-index: 0;
}

.title,
.description,
.go-btn {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 2.3rem;
  font-weight: 700;
  color: #ffeb3b;
  margin-bottom: 20px;
  text-shadow: 0 0 12px rgba(255, 235, 59, 0.5);
}

.description {
  max-width: 700px;
  color: #e0e0e0;
  font-size: 1.1rem;
  line-height: 1.8;
  margin: 0 auto 50px;
  direction: rtl;
}

.go-btn {
  font-size: 1.1rem;
  padding: 14px 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffca28, #ff9800);
  color: #1a1a1a;
  box-shadow: 0 6px 16px rgba(255, 193, 7, 0.3);
  transition: all 0.3s ease;
}

.go-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 22px rgba(255, 193, 7, 0.5);
}
</style>
