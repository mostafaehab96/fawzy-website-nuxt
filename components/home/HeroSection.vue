<script setup lang="ts">
/**
 * Home Hero Section (`components/home/HeroSection.vue`)
 * -----------------------------------------------------
 * Top banner on `/`:
 *   - Right side (RTL): "شريكك الإبداعي" display headline, bio text, WhatsApp CTA
 *   - Left side: Portrait (`/images/fawzy.webp`), "+100 M" badges, decorative grid
 */
import { SITE_CONFIG } from '~/data/site'
</script>

<template>
  <section class="headline_and_image">
    <div class="container">
      <div class="headline_and_image_box">
        <!-- Headline, Bio & CTA -->
        <div class="head_box" data-aos="fade-up" data-aos-offset="1">
          <h1 class="first_head">
            شريكك <br />
          </h1>

          <div class="ract_ibda3y_box">
            <img
              class="ract_ibda3y_image"
              src="/images/Rectangle_ibda3y.svg"
              width="399"
              height="149"
              decoding="async"
              alt=""
            />
            <div class="ract_ibda3y_frame">
              <img
                class="ract_ibda3y_frame_image"
                src="/images/Ract_ibd3ay_frame.svg"
                width="404"
                height="150"
                decoding="async"
                alt=""
              />
            </div>
            <div class="span_rocket_box">
              <img
                class="span_rocket_image"
                src="/images/first_head_rocket.webp"
                width="295"
                height="270"
                fetchpriority="high"
                decoding="async"
                alt=""
              />
            </div>
          </div>

          <p class="bio">
            محرر فيديو محترف بخبرة تزيد عن 5 سنوات في مجال
            <span class="bio_span">
              إنتــــــــــــاج المحتــــــــوى المـــــــــــرئي والمــــونتاج
            </span>
            و عمـــــلت مـــع العديد من المؤسسات الكبرى وصناع المحتوى في الوطن
            العربي والعالم
          </p>

          <a
            class="contact_me"
            :href="SITE_CONFIG.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            تواصل معي
          </a>
        </div>

        <!-- Portrait & Decorative Graphic Elements -->
        <div class="image_box" data-aos="fade-down" data-aos-offset="1">
          <img
            class="fawzy_img"
            src="/images/fawzy.webp"
            width="372"
            height="521"
            fetchpriority="high"
            decoding="async"
            alt="محمود فوزي"
          />
          <div class="circle"></div>
          <img
            class="big_right_arrow"
            src="/images/big_arrow.svg"
            width="37"
            height="54"
            decoding="async"
            alt=""
          />
          <img
            class="small_right_arrow"
            src="/images/small_arrow.svg"
            width="29"
            height="37"
            decoding="async"
            alt=""
          />
          <img
            class="recta_with_name"
            src="/images/first_left_rect.svg"
            width="434"
            height="107"
            decoding="async"
            alt=""
          />
          <h2 class="fawzy_name">محمــــــود فــــــوزي</h2>

          <span class="first_number">+100 M</span>
          <span class="second_number">+100 M</span>
          <span class="third_number">+100 M</span>
          <span class="fourth_number">+100 M</span>

          <div class="first_bg_thin_lines"></div>
          <div class="second_bg_thin_lines"></div>
          <div class="third_bg_thin_lines"></div>
          <div class="fourth_bg_thin_lines"></div>
          <div class="fifth_bg_thin_lines"></div>
          <div class="sixth_bg_thin_lines"></div>
          <div class="seventh_bg_thin_lines"></div>
          <div class="grid_pattern"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==========================================================================
   Hero Section Styles (migrated from `home.css` lines 3–1363)
   ========================================================================== */

.headline_and_image {
  margin-top: 250px;
  direction: rtl;
}

.headline_and_image .container {
  padding: 0 20px;
}

.headline_and_image_box {
  display: flex;
  justify-content: center;
  column-gap: 200px;
  align-items: center;
}

.head_box {
  width: 40%;
  margin-top: 70px;
  margin-right: 50px;
}

.first_head {
  font-family: 'fawzy', sans-serif;
  color: #0c00b5;
  font-size: 115px;
  transform: rotate(-7deg);
  font-weight: 400;
  z-index: -1;
  margin-right: 110px;
}

.ract_ibda3y_box {
  position: relative;
  margin-top: -20px;
  z-index: -5;
  width: fit-content;
}

.ract_ibda3y_image {
  width: auto;
  height: 200px;
}

.ract_ibda3y_box::before {
  position: absolute;
  content: 'الإبداعي';
  font-family: 'fawzy', sans-serif;
  font-size: 110px;
  color: #d7f0f2;
  top: 19px;
  right: 100px;
  transform: rotate(-3deg);
}

.ract_ibda3y_frame {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -10px;
  right: -10px;
  z-index: 1;
}

.ract_ibda3y_frame_image {
  width: auto;
  height: 97%;
}

.span_rocket_box {
  position: absolute;
  top: -130px;
  left: -110px;
  z-index: 5;
}

.span_rocket_image {
  width: 295px;
  height: 270px;
}

.bio {
  font-size: 20px;
  font-weight: 600;
  margin-top: 40px;
  line-height: 1.9;
  padding-left: 30px;
  margin-bottom: 30px;
}

.bio_span {
  font-size: 20px;
  color: #0618c4;
  font-weight: 600;
}

.contact_me {
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  background-color: #0618c4;
  color: #ffffff;
  padding: 10px 40px;
  border-radius: 78px;
  margin-top: 50px;
  position: relative;
  transition-duration: 0.3s;
  border: 2px solid #0c00b5;
}

.contact_me:hover {
  background-color: #eaf6ff;
  color: #0618c4;
  border: 2px solid #0c00b5;
}

.contact_me::before {
  content: '';
  position: absolute;
  width: 110%;
  height: 59.47px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #c9e8ff;
  border-radius: 40px;
  padding: 5px 8px;
  pointer-events: none;
}

/* Portrait & Graphic Overlays */
.image_box {
  position: relative;
  margin-top: -30px;
  margin-left: 50px;
}

.circle {
  position: absolute;
  width: 112px;
  height: 112px;
  background-color: #0618c4;
  top: 135px;
  right: 0;
  border-radius: 50%;
  filter: drop-shadow(-5px 6px 0px #19127c);
}

.big_right_arrow {
  position: absolute;
  width: 37px;
  height: 54px;
  top: 166px;
  right: 20px;
  filter: drop-shadow(-7px 0px 0px #19127c);
}

.small_right_arrow {
  position: absolute;
  width: 29px;
  height: 37px;
  top: 174px;
  right: 58px;
  filter: drop-shadow(-7px 0px 0px #19127c);
}

.recta_with_name {
  position: absolute;
  width: 434px;
  height: 107px;
  bottom: 80px;
  right: -40px;
  filter: drop-shadow(-20px 25px 0px #0617c0);
}

.fawzy_name {
  position: absolute;
  font-weight: bold;
  font-size: 55px;
  color: #0618c4;
  bottom: 97px;
  right: 0;
  white-space: nowrap !important;
}

.first_number {
  position: absolute;
  font-weight: bold;
  font-size: 31px;
  color: #0618c4;
  left: 0;
  top: 82px;
  direction: ltr;
}

.second_number {
  position: absolute;
  font-size: 31px;
  color: #ffffff;
  left: 0;
  top: 50px;
  direction: ltr;
  -webkit-text-stroke: thin #94d1ff;
  font-weight: bold;
}

.third_number {
  position: absolute;
  font-size: 31px;
  color: #ffffff;
  left: 0;
  top: 18px;
  direction: ltr;
  -webkit-text-stroke: thin #94d1ff88;
  font-weight: bold;
}

.fourth_number {
  position: absolute;
  font-size: 31px;
  color: #ffffff;
  left: 0;
  top: -12px;
  direction: ltr;
  -webkit-text-stroke: thin #94d1ff4c;
  font-weight: bold;
}

.first_bg_thin_lines,
.second_bg_thin_lines,
.third_bg_thin_lines,
.fourth_bg_thin_lines,
.fifth_bg_thin_lines,
.sixth_bg_thin_lines,
.seventh_bg_thin_lines {
  position: absolute;
  width: 310px;
  left: -15px;
  background-color: #0618c4;
  z-index: -1;
}

.first_bg_thin_lines {
  height: 13px;
  top: 140px;
}
.second_bg_thin_lines {
  height: 13px;
  top: 165px;
}
.third_bg_thin_lines {
  height: 13px;
  top: 190px;
}
.fourth_bg_thin_lines {
  height: 13px;
  top: 215px;
}
.fifth_bg_thin_lines {
  height: 13px;
  top: 240px;
}
.sixth_bg_thin_lines {
  height: 29px;
  top: 265px;
}
.seventh_bg_thin_lines {
  height: 53px;
  top: 305px;
}

.grid_pattern {
  position: absolute;
  width: 440px;
  height: 380px;
  top: 140px;
  right: -52px;
  background-color: transparent;
  background-image:
    linear-gradient(0deg, hsla(206, 100%, 79%, 0.6) 1px, transparent 1px),
    linear-gradient(90deg, hsla(206, 100%, 79%, 0.6) 1px, transparent 1px);
  background-size: 28px 28px;
  z-index: -1;
}

/* Responsive Breakpoints */
@media (min-width: 901px) and (max-width: 1200px) {
  .first_head {
    font-size: 85px;
    margin-right: 60px;
  }
  .ract_ibda3y_box {
    margin-top: -27px;
  }
  .ract_ibda3y_image,
  .ract_ibda3y_frame_image {
    width: 400px;
    height: 320px !important;
    margin-top: -60px;
  }
  .ract_ibda3y_box::before {
    font-size: 80px;
    width: 100%;
    height: 100%;
    top: 42px;
    right: 60px;
  }
  .span_rocket_box {
    top: -90px;
    left: -70px;
  }
  .span_rocket_image {
    width: 230px;
    height: 211px;
  }
  .bio {
    font-size: 18px;
    margin-top: -45px;
  }
  .headline_and_image_box {
    column-gap: 90px;
  }
  .fawzy_img {
    width: 330px;
    height: 462px;
  }
  .circle {
    width: 85px;
    height: 85px;
    top: 125px;
  }
  .big_right_arrow {
    width: 30px;
    height: 47px;
    top: 147px;
    right: 12px;
  }
  .small_right_arrow {
    width: 22px;
    height: 30px;
    top: 156px;
    right: 45px;
  }
  .recta_with_name {
    width: 390px;
    height: 107px;
    bottom: 60px;
    right: -40px;
  }
  .fawzy_name {
    font-size: 52px;
    bottom: 80px;
    right: -12px;
  }
  .first_number,
  .second_number,
  .third_number,
  .fourth_number {
    font-size: 27px;
  }
  .grid_pattern {
    width: 350px;
    height: 380px;
    right: -5px;
  }
}

@media (min-width: 650px) and (max-width: 900px) {
  .headline_and_image_box {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .head_box {
    width: 100%;
    margin-top: 80px;
    margin-right: 0 !important;
  }
  .first_head {
    font-size: 110px;
    width: fit-content;
    margin: 0 auto;
  }
  .ract_ibda3y_box {
    margin: -20px auto 0;
  }
  .ract_ibda3y_box::before {
    font-size: 105px;
    width: 100%;
    height: 100%;
    top: 27px;
    right: 100px;
  }
  .ract_ibda3y_frame_image {
    height: 200px;
  }
  .span_rocket_box {
    top: -110px;
    left: -80px;
  }
  .span_rocket_image {
    width: 270px;
    height: 247px;
  }
  .contact_me {
    margin-right: 30px;
  }
  .image_box {
    margin: 0 auto;
  }
  .fawzy_img {
    width: 350px;
    height: 490px;
  }
  .circle {
    width: 80px;
    height: 80px;
    top: 128px;
    right: 10px;
    filter: drop-shadow(-3px 4px 0px #19127c);
  }
  .big_right_arrow {
    width: 24px;
    height: 48px;
    top: 147px;
    right: 25px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .small_right_arrow {
    width: 18px;
    height: 37px;
    top: 152px;
    right: 52px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .fawzy_name {
    bottom: 95px;
  }
  .first_number {
    font-size: 28px;
    top: 90px;
  }
  .second_number {
    font-size: 28px;
    top: 54px;
  }
  .third_number {
    font-size: 28px;
    top: 22px;
  }
  .fourth_number {
    font-size: 28px;
    top: -8px;
  }
  .grid_pattern {
    width: 385px;
    right: -20px;
  }
}

@media (min-width: 530px) and (max-width: 650px) {
  .headline_and_image_box {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .head_box {
    width: 100%;
    margin-top: 120px;
    margin-right: 0 !important;
  }
  .first_head {
    font-size: 85px;
    width: fit-content;
    margin: 0 auto;
  }
  .ract_ibda3y_box {
    margin: -20px auto 0;
  }
  .ract_ibda3y_image,
  .ract_ibda3y_frame_image {
    width: 390px;
    height: 310px !important;
    margin-top: -60px;
  }
  .ract_ibda3y_box::before {
    font-size: 80px;
    width: 100%;
    height: 100%;
    top: 37px;
    right: 60px;
  }
  .span_rocket_box {
    top: -100px;
    left: -100px;
  }
  .span_rocket_image {
    width: 250px;
    height: 229px;
  }
  .bio {
    font-size: 18px;
    margin-top: -45px;
  }
  .contact_me {
    margin-right: 30px;
  }
  .image_box {
    margin: 0 auto;
  }
  .fawzy_img {
    width: 330px;
    height: 462px;
  }
  .circle {
    width: 80px;
    height: 80px;
    top: 128px;
    right: 10px;
    filter: drop-shadow(-3px 4px 0px #19127c);
  }
  .big_right_arrow {
    width: 24px;
    height: 48px;
    top: 147px;
    right: 25px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .small_right_arrow {
    width: 18px;
    height: 37px;
    top: 152px;
    right: 52px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .recta_with_name {
    width: 390px;
    bottom: 60px;
  }
  .fawzy_name {
    font-size: 50px;
    bottom: 80px;
    right: -3px;
  }
  .first_number,
  .second_number,
  .third_number,
  .fourth_number {
    font-size: 27px;
  }
  .grid_pattern {
    width: 380px;
    height: 330px;
    right: -40px;
  }
}

@media (min-width: 440px) and (max-width: 530px) {
  .headline_and_image_box {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .head_box {
    width: 100%;
    margin-top: 100px;
    margin-right: 0 !important;
  }
  .first_head {
    font-size: 75px;
    width: fit-content;
    margin: 0 auto;
  }
  .ract_ibda3y_box {
    margin: -20px auto 0;
  }
  .ract_ibda3y_image,
  .ract_ibda3y_frame_image {
    width: 350px;
    height: 270px !important;
    margin-top: -60px;
  }
  .ract_ibda3y_box::before {
    font-size: 68px;
    width: 100%;
    height: 100%;
    top: 26px;
    right: 60px;
  }
  .span_rocket_box {
    top: -85px;
    left: -75px;
  }
  .span_rocket_image {
    width: 200px;
    height: 183px;
  }
  .bio {
    font-size: 15px;
    margin-top: -25px;
  }
  .bio_span {
    font-size: 17px;
  }
  .contact_me {
    margin-top: 20px;
    margin-bottom: 70px;
    margin-right: 30px;
  }
  .image_box {
    margin: -30px auto 0;
  }
  .fawzy_img {
    width: 290px;
    height: 406px;
  }
  .circle {
    width: 65px;
    height: 65px;
    top: 105px;
    right: 10px;
    filter: drop-shadow(-3px 4px 0px #19127c);
  }
  .big_right_arrow {
    width: 17px;
    height: 48px;
    top: 115px;
    right: 23px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .small_right_arrow {
    width: 12px;
    height: 37px;
    top: 120px;
    right: 45px;
    filter: drop-shadow(-5px 0px 0px #19127c);
  }
  .recta_with_name {
    width: 325px;
    bottom: 50px;
    right: -15px;
  }
  .fawzy_name {
    font-size: 43px;
    bottom: 75px;
    right: 10px;
  }
  .first_number {
    font-size: 23px;
    left: -5px;
    top: 60px;
  }
  .second_number {
    font-size: 23px;
    left: -5px;
    top: 29px;
  }
  .third_number {
    font-size: 23px;
    left: -5px;
    top: -3px;
  }
  .fourth_number {
    font-size: 23px;
    left: -5px;
    top: -33px;
  }
  .first_bg_thin_lines {
    width: 260px;
    height: 10px;
    left: -10px;
    top: 110px;
  }
  .second_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 135px;
  }
  .third_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 160px;
  }
  .fourth_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 185px;
  }
  .fifth_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 210px;
  }
  .sixth_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 235px;
  }
  .seventh_bg_thin_lines {
    width: 260px;
    left: -10px;
    top: 275px;
  }
  .grid_pattern {
    width: 115%;
    height: 335px;
    top: 100px;
    right: -35px;
  }
}

@media (max-width: 440px) {
  .headline_and_image_box {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .head_box {
    width: 100%;
    margin-top: 100px;
    margin-right: 0 !important;
  }
  .first_head {
    font-size: 70px;
    width: fit-content;
    margin: 0 auto;
  }
  .ract_ibda3y_box {
    margin: -20px auto 0;
  }
  .ract_ibda3y_image,
  .ract_ibda3y_frame_image {
    width: 340px;
    height: 260px !important;
    margin-top: -60px;
  }
  .ract_ibda3y_box::before {
    font-size: 65px;
    width: 100%;
    height: 100%;
    top: 24px;
    right: 60px;
  }
  .span_rocket_box {
    top: -70px;
    left: -45px;
  }
  .span_rocket_image {
    width: 150px;
    height: 137px;
  }
  .bio {
    font-size: 14px;
    margin-top: -50px;
    padding-left: 20px;
  }
  .bio_span {
    font-size: 15px;
  }
  .contact_me {
    margin-top: 20px;
    margin-bottom: 70px;
    margin-right: 30px;
  }
  .image_box {
    margin: -30px auto 0;
  }
  .fawzy_img {
    width: 250px;
    height: 350px;
    margin-top: -10px;
  }
  .circle {
    width: 58px;
    height: 58px;
    top: 85px;
    right: 0;
    filter: drop-shadow(-2px 3px 0px #19127c);
  }
  .big_right_arrow {
    width: 15px;
    height: 48px;
    top: 93px;
    right: 12px;
    filter: drop-shadow(-4px 0px 0px #19127c);
  }
  .small_right_arrow {
    width: 12px;
    height: 37px;
    top: 98px;
    right: 30px;
    filter: drop-shadow(-4px 0px 0px #19127c);
  }
  .recta_with_name {
    width: 285px;
    bottom: 30px;
    right: -20px;
    filter: drop-shadow(-13px 15px 0px #0617c0);
  }
  .fawzy_name {
    font-size: 37px;
    bottom: 58px;
    right: 5px;
  }
  .first_number {
    font-size: 20px;
    left: -5px;
    top: 50px;
  }
  .second_number {
    font-size: 20px;
    left: -5px;
    top: 19px;
  }
  .third_number {
    font-size: 20px;
    left: -5px;
    top: -13px;
  }
  .fourth_number {
    font-size: 20px;
    left: -5px;
    top: -43px;
  }
  .first_bg_thin_lines {
    width: 240px;
    height: 10px;
    left: -10px;
    top: 90px;
  }
  .second_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 115px;
  }
  .third_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 140px;
  }
  .fourth_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 165px;
  }
  .fifth_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 190px;
  }
  .sixth_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 215px;
  }
  .seventh_bg_thin_lines {
    width: 240px;
    left: -10px;
    top: 255px;
  }
  .grid_pattern {
    width: 112%;
    height: 290px;
    top: 80px;
    right: -20px;
  }
}
</style>
