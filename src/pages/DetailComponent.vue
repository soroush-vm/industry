<template>
  <q-page class="detail-page">
    <!-- هدر با نام و لوگو -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ cell.name }}
        </q-toolbar-title>
        <q-avatar>
          <img :src="cell.logo" alt="لوگو" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <!-- دیباچه (مقدمه) -->
    <div class="intro-section q-pa-md">
      <h5>توضیحات</h5>
      <p>{{ cell.description }}</p>

      <h5>تاریخچه</h5>
      <p>{{ cell.history }}</p>

      <h5>ظرفیت</h5>
      <p>{{ cell.capacity }}</p>
    </div>

    <!-- بخش فعالیت‌ها با اسکرول -->
    <div class="activities-section q-pa-md">
      <h4>فعالیت‌ها</h4>
      <q-scroll-area style="height: 300px; border: 1px solid #ccc;">
        <div v-for="(activity, index) in cell.activities" :key="index" class="activity-item q-mb-md">
          <h6>شرح فعالیت {{ index + 1 }}</h6>
          <p>{{ activity.description }}</p>

          <div v-if="activity.images.length">
            <h6>تصاویر</h6>
            <q-carousel
              v-model="slide"
              transition-prev="slide-right"
              transition-next="slide-left"
              swipeable
              animated
              control-color="primary"
              navigation
              padding
              arrows
              height="200px"
              class="bg-grey-1 shadow-1 rounded-borders"
            >
              <q-carousel-slide v-for="(img, imgIndex) in activity.images" :key="imgIndex" :name="imgIndex" :img-src="img" />
            </q-carousel>
          </div>

          <div v-if="activity.videos.length">
            <h6>ویدیوها</h6>
            <video v-for="(video, vidIndex) in activity.videos" :key="vidIndex" controls width="100%" class="q-mb-sm">
              <source :src="video" type="video/mp4" />
              مرورگر شما از ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>
        </div>
      </q-scroll-area>
    </div>

    <!-- فوتر با اطلاعات تماس و آدرس -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ cell.contact }}<br />
          {{ cell.address }}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

// دریافت id از پارامترهای مسیر
const route = useRoute();
const cellId = parseInt(route.params.id);
const slide = ref(0);

// داده‌های نمونه - در اپ واقعی، از API یا store استفاده کنید
const cellsData = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  name: `نام سلول ${i + 1}`,
  logo: "https://example.com/logo.png",
  description: `توضیحات سلول ${i + 1}: این یک توضیح نمونه است.`,
  history: `تاریخچه: تاسیس در سال 2000، توسعه در 2010.`,
  capacity: `ظرفیت: 100 واحد`,
  activities: [
    {
      description: "شرح فعالیت 1: فعالیت نمونه اول.",
      images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
      videos: ["https://example.com/video1.mp4"],
    },
    {
      description: "شرح فعالیت 2: فعالیت نمونه دوم.",
      images: ["https://example.com/image3.jpg"],
      videos: ["https://example.com/video2.mp4"],
    },
  ],
  contact: "تماس: info@example.com",
  address: "آدرس: خیابان نمونه، شهر نمونه",
}));

// پیدا کردن سلول بر اساس id
const cell = cellsData.find(c => c.id === cellId) || {};
</script>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.intro-section {
  flex: 1;
  background: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 16px;
}

.activities-section {
  flex: 1;
}

.activity-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.q-carousel {
  max-width: 100%;
}
</style>