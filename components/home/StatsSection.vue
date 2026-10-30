<script setup lang="ts">
/**
 * Portfolio Statistics Section (`components/home/StatsSection.vue`)
 * -----------------------------------------------------------------
 * Renders the 3 achievement highlight banners on the Home page:
 *   1. +1000 Videos Produced
 *   2. +30 Clients Worldwide
 *   3. +06 Countries Served
 */
</script>

<template>
  <div>
    <!-- +1000 Videos Card -->
    <div class="vd_number_box">
      <div class="container">
        <div class="vd_main_box" data-aos="zoom-out" data-aos-offset="1">
          <p class="vd_number_text">
            أنتجت بحــــــمد الله رب العالمين مايزيد عن ألف فيــــــــــــــديو
          </p>
          <div class="vd_sub_box">
            <span class="videos_number">+1000</span>
          </div>
          <img
            class="glowing_star"
            src="/images/Glowing Star.svg"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- +30 Clients & +06 Countries Cards -->
    <div class="omla_dowl">
      <div class="container">
        <div class="omla_dowl_box">
          <!-- Clients Card -->
          <div class="omla_box" data-aos="zoom-in" data-aos-offset="1">
            <p class="omla_text">
              أكثر من 30 عميل حــــــــول العــــــــــــــــــالم
            </p>
            <div class="omala_eub_right_box">
              <span class="omla_count">+30</span>
            </div>
            <div class="omala_eub_left_box">
              <span class="ameel_label">عميــــل</span>
            </div>
          </div>

          <!-- Countries Card -->
          <div class="dowl_box" data-aos="zoom-in" data-aos-offset="1">
            <p class="dowl_text">
              الإمارات، الســــــعودية، مصـــــــر، إنجـــــــــــــــلترا،
              الكـــــويت، أمريكـــــــا
            </p>
            <div class="dowl_eub_right_box"></div>
            <span class="dowl_count">+06</span>
            <div class="dowl_eub_left_box">
              <span class="dowl_label">دِول</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Stats Section Styles (migrated from `home.css` lines 2353–3181)
   ========================================================================== */

.vd_number_box {
  margin: 150px auto 20px;
}

.vd_number_box .container {
  max-width: 1100px;
  width: 87%;
}

@media screen and (min-width: 1440px) {
  .vd_number_box .container {
    width: 1100px;
  }
}

.vd_main_box {
  width: 100%;
  height: 170px;
  background: #94d1ff;
  border-radius: 20px;
  position: relative;
  margin: 0 auto;
}

.glowing_star {
  position: absolute;
  left: -80px;
  top: -30px;
  width: 220px;
  height: 220px;
}

.vd_sub_box {
  position: absolute;
  width: 35%;
  height: 100%;
  right: 0;
  top: 0;
  background: #0618c4;
  border-radius: 28px;
}

.videos_number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 700;
  font-size: 115.596px;
  line-height: 173px;
  text-align: right;
  color: #94d1ff;
}

.vd_number_text {
  position: absolute;
  right: 41%;
  top: 20px;
  width: 45%;
  font-weight: 400;
  font-size: 41.1969px;
  line-height: 150%;
  text-align: center;
  color: #5c93bc;
  direction: rtl !important;
  unicode-bidi: isolate;
}

@media screen and (max-width: 1270px) {
  .vd_main_box {
    height: 150px;
  }
  .glowing_star {
    left: -70px;
    width: 200px;
    height: 200px;
  }
  .videos_number {
    font-size: 80px;
  }
  .vd_number_text {
    top: 30px;
    font-size: 30px;
  }
}

@media screen and (max-width: 1000px) {
  .vd_number_box .container {
    margin-top: -50px;
  }
  .vd_main_box {
    height: 140px;
  }
  .glowing_star {
    left: -70px;
    width: 180px;
    height: 180px;
  }
  .videos_number {
    font-size: 70px;
  }
  .vd_number_text {
    top: 30px;
    font-size: 27px;
  }
}

@media screen and (max-width: 860px) {
  .vd_main_box {
    height: 120px;
  }
  .glowing_star {
    left: -70px;
    width: 170px;
    height: 170px;
  }
  .videos_number {
    font-size: 50px;
  }
  .vd_number_text {
    top: 25px;
    font-size: 20px;
  }
}

@media screen and (max-width: 767px) {
  .vd_number_box .container {
    max-width: 455px;
    width: 100%;
  }
  .vd_main_box {
    height: 120px;
    border-radius: 20px;
  }
  .glowing_star {
    left: -50px;
    top: 50%;
    transform: translateY(-50%);
    width: 140px;
    height: 140px;
  }
  .vd_sub_box {
    border-radius: 20px;
  }
  .videos_number {
    font-weight: 800;
    font-size: 43px;
  }
  .vd_number_text {
    right: 160px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
  }
}

@media screen and (max-width: 570px) {
  .vd_number_box .container {
    max-width: 448px;
  }
  .videos_number {
    font-size: 40px;
  }
  .vd_number_text {
    right: 150px;
  }
}

@media screen and (max-width: 500px) {
  .vd_number_box .container {
    max-width: 525px;
  }
  .glowing_star {
    left: -35px;
  }
  .vd_number_text {
    right: 160px;
    width: 42%;
    font-size: 18px;
  }
}

@media screen and (max-width: 460px) {
  .glowing_star {
    width: 125px;
    height: 125px;
  }
  .videos_number {
    font-size: 33px;
  }
  .vd_number_text {
    right: auto;
    left: 65px;
    width: 42%;
    font-size: 15px;
  }
}

/* Clients & Countries Row */
.omla_dowl {
  margin: 0 0 100px;
  direction: rtl;
}

.omla_dowl .container {
  max-width: 1100px;
  width: 100%;
}

@media screen and (min-width: 1440px) {
  .omla_dowl .container {
    width: 1100px;
  }
}

.omla_dowl_box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
}

.omla_box,
.dowl_box {
  width: 50%;
  height: 170px;
  background-color: #94d1ff;
  border-radius: 30px;
  position: relative;
}

.omla_text {
  position: absolute;
  width: 45%;
  line-height: 1.3;
  left: 10px;
  bottom: 10px;
  color: #5c93bc;
  text-align: right;
  font-size: 27px;
  z-index: 1;
}

.omala_eub_right_box,
.dowl_eub_right_box {
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  border-radius: 30px;
  background-color: #0618c4;
}

.omala_eub_left_box,
.dowl_eub_left_box {
  position: absolute;
  left: 0;
  top: 0;
  width: 60%;
  height: 50%;
  border-radius: 30px;
  background-color: #94d1ff;
}

.omla_count {
  position: absolute;
  height: 158.26px;
  left: 53%;
  transform: translateX(-50%);
  top: 3%;
  direction: ltr;
  font-weight: 700;
  font-size: 110px;
  line-height: 174px;
  text-align: right;
  color: #94d1ff;
}

.ameel_label {
  position: absolute;
  height: 104px;
  left: 58%;
  transform: translateX(-50%);
  top: -15px;
  font-weight: 500;
  font-size: 70px;
  line-height: 104px;
  text-align: center;
  color: #19127c;
}

.dowl_text {
  position: absolute;
  width: 40%;
  line-height: 1.3;
  left: 25px;
  bottom: 7px;
  color: #5c93bc;
  text-align: right;
  font-size: 23px;
  z-index: 1;
}

.dowl_count {
  position: absolute;
  height: 158.26px;
  right: -50%;
  top: 50%;
  transform: translate(-140%, -50%);
  direction: ltr;
  font-weight: 700;
  font-size: 110px;
  line-height: 174px;
  text-align: right;
  color: #94d1ff;
}

.dowl_label {
  position: absolute;
  height: 104px;
  font-weight: 500;
  font-size: 55px;
  line-height: 104px;
  text-align: center;
  color: #19127c;
  left: 73%;
  transform: translateX(-50%);
  top: -20px;
}

@media screen and (max-width: 1100px) {
  .omla_dowl {
    margin-bottom: 80px;
  }
  .omla_dowl .container {
    max-width: 900px;
  }
  .omla_box,
  .dowl_box {
    height: 150px;
  }
  .omla_text {
    font-size: 22px;
  }
  .omla_count {
    top: -3%;
    font-size: 92px;
  }
  .ameel_label {
    left: 60%;
    font-size: 55px;
  }
  .dowl_text {
    width: 45%;
    line-height: 1.2;
    left: 6px;
    bottom: 9px;
    font-size: 19px;
  }
  .dowl_count {
    transform: translate(-130%, -50%);
    font-size: 92px;
  }
}

@media screen and (max-width: 900px) {
  .omla_dowl .container {
    max-width: 800px;
  }
  .omla_box,
  .dowl_box {
    height: 160px;
  }
  .omla_text {
    line-height: 1.4;
    left: 4px;
    bottom: 17px;
    font-size: 20px;
  }
  .omla_count {
    left: 55%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 75px;
  }
  .ameel_label {
    top: -20px;
    font-size: 50px;
  }
  .dowl_text {
    left: 4px;
    bottom: 15px;
    font-size: 17px;
  }
  .dowl_count {
    right: auto;
    top: 46%;
    left: 45%;
    transform: translate(-50%, -50%);
    font-size: 75px;
  }
  .dowl_label {
    font-size: 50px;
    left: 70%;
  }
}

@media screen and (max-width: 767px) {
  .omla_dowl {
    margin: 25px 0 20px;
  }
  .omla_dowl .container {
    max-width: 500px;
  }
  .omla_dowl_box {
    flex-direction: column;
    justify-content: center;
    row-gap: 40px;
    margin: 40px 0 120px;
  }
  .omla_box,
  .dowl_box {
    width: 90%;
    height: 120px;
    border-radius: 20px;
  }
  .omala_eub_right_box,
  .dowl_eub_right_box {
    width: 45%;
    border-radius: 20px;
  }
  .omala_eub_left_box,
  .dowl_eub_left_box {
    width: 68%;
    border-radius: 20px;
  }
  .omla_text {
    line-height: 1.7;
    left: 22px;
    bottom: 8px;
    font-size: 16px;
  }
  .omla_count {
    font-size: 50px;
  }
  .ameel_label {
    left: 70%;
    top: -25px;
    font-size: 33px;
  }
  .dowl_text {
    width: 46%;
    line-height: 1.8;
    left: 18px;
    bottom: 10px;
    font-size: 14px;
  }
  .dowl_count {
    top: 46%;
    left: 32%;
    font-size: 50px;
  }
  .dowl_label {
    left: 75%;
    top: -25px;
    font-size: 33px;
  }
}

@media screen and (max-width: 500px) {
  .omla_box,
  .dowl_box {
    width: 100%;
  }
  .omla_dowl_box {
    margin: 40px 0;
  }
  .dowl_count {
    top: 50%;
    left: 33%;
  }
  .dowl_text {
    width: 49%;
    line-height: 1.6;
    left: 8px;
  }
}
</style>
