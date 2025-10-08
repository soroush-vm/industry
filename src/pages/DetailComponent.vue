<template>
  <q-page class="profile-page">
    <!-- Header Section -->
    <q-header elevated class="header">
      <q-toolbar>
        <div class="logo-container">
          <q-img
            src="https://via.placeholder.com/100"
            alt="Trader Logo"
            class="logo"
          />
          <q-toolbar-title class="trader-name">نام تاجر یا برند</q-toolbar-title>
        </div>

        <q-btn
          flat
          round
          icon="home"
          label="بازگشت به خانه"
          to="/categories"
          class="return-btn"
        />
      </q-toolbar>
    </q-header>

    <!-- Scrollable Main Content -->
    <div class="page-content">
      <!-- Intro Section -->
      <div class="intro-section">
        <h2>معرفی</h2>
        <p>
          توضیح کوتاه درباره‌ی فرد یا کسب‌وکار: اینجا یک توضیح مختصر درباره‌ی تاجر یا برند
          نوشته می‌شود. مثلاً حوزه‌ی فعالیت، ویژگی‌های خاص یا ارزش‌های اصلی.
        </p>
        <p>
          <strong>تاریخچه شکل‌گیری:</strong> این کسب‌وکار در سال 1390 با هدف ارائه خدمات
          باکیفیت تأسیس شد و طی سال‌ها به یکی از پیشروهای صنعت تبدیل شده است.
        </p>
        <p>
          <strong>ظرفیت‌ها و توانمندی‌ها:</strong> دارای تیم 50 نفره، توانایی تولید 1000
          واحد محصول در ماه، و تخصص در زمینه‌های طراحی و تولید محصولات سفارشی.
        </p>
      </div>

      <!-- Activities Section -->
      <div class="activities-section">
        <h2>فعالیت‌ها و نمونه‌کارها</h2>
        <q-list bordered>
          <q-item v-for="(item, index) in activities" :key="index">
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
              <q-item-label caption>{{ item.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Footer Section -->
    <q-footer class="footer">
      <div class="contact-info">
        <h3>اطلاعات تماس</h3>
        <div class="contact-grid">
          <div class="contact-column">
            <p><strong>آدرس:</strong> تهران، خیابان نمونه، پلاک 123</p>
            <p><strong>شماره تماس:</strong> 021-12345678</p>
          </div>
          <div class="contact-column">
            <p><strong>ایمیل:</strong> info@traderbrand.com</p>
            <p>
              <strong>شبکه‌های اجتماعی:</strong>
              <a href="https://instagram.com/traderbrand">اینستاگرام</a> |
              <a href="https://t.me/traderbrand">تلگرام</a>
            </p>
          </div>
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'TraderProfile',
  data() {
    return {
      activities: [
        { title: 'پروژه شماره 1', description: 'طراحی و تولید محصول سفارشی برای مشتری بین‌المللی.' },
        { title: 'محصول شماره 2', description: 'تولید انبوه محصول با کیفیت بالا برای بازار داخلی.' },
        { title: 'خدمات مشاوره‌ای', description: 'ارائه مشاوره تخصصی در زمینه بهینه‌سازی تولید.' }
      ]
    }
  }
}
</script>

<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

/* ✅ فقط محتوای وسط صفحه اسکرول‌پذیر میشه */
.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* --- Header --- */
.header {
  background-color: #df2d16;
  color: white;
}
.logo-container {
  display: flex;
  align-items: center;
}
.logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.trader-name {
  font-size: 1.5rem;
  font-weight: bold;
}
.return-btn {
  margin-left: auto;
}

/* --- Content Sections --- */
.intro-section,
.activities-section {
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.intro-section h2,
.activities-section h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
}
.intro-section p {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 10px;
  color: #555;
}

/* --- Footer --- */
.footer {
  background-color: #333;
  color: white;
  padding: 30px 20px;
  text-align: center;
}
.contact-info {
  max-width: 800px;
  margin: 0 auto;
}
.contact-info h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.contact-grid {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
  flex-wrap: wrap;
}
.contact-column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: right;
}
.contact-column p {
  font-size: 1rem;
  margin: 5px 0;
}
.contact-info a {
  color: #42a5f5;
  text-decoration: none;
}
.contact-info a:hover {
  text-decoration: underline;
}
</style>
