<script setup lang="ts">
/**
 * Services & Contact CTAs Section (`components/home/ServicesSection.vue`)
 * -----------------------------------------------------------------------
 * Anchor target `#my_services` linked from Header & Footer ("خدماتي").
 * Renders:
 *   1. Podcast Editing / Shorts banner + "اطلب خدمتي المميزة الآن" CTA
 *   2. Bento Grid: Whiteboard Animation, Collage Art Animation, YouTube Editing
 *   3. Dual WhatsApp + YouTube Channel CTA pill buttons
 */
import { SITE_CONFIG } from '~/data/site'
</script>

<template>
  <div>
    <!-- Podcast & Shorts Banner (#my_services) -->
    <div id="my_services" class="podcast_shorts_box">
      <div class="container">
        <div
          class="podcast_shorts_main"
          data-aos="zoom-in"
          data-aos-offset="1"
        >
          <div class="mic_head_box">
            <img
              class="mic_img"
              src="/images/Mic_Headphone_Smartphone .svg"
              alt="Podcast Editing"
            />
            <p class="mic_text">
              Podcast <br />
              Editing
            </p>
          </div>

          <p class="shotrs_text_1">Shorts</p>
          <p class="shotrs_text_2">Shorts</p>

          <a
            class="otlb_khedmty"
            :href="SITE_CONFIG.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            اطلب خدمتي المميزة الآن
          </a>
        </div>
      </div>
    </div>

    <!-- Bento Grid: Whiteboard, Collage, YouTube -->
    <section class="other_services">
      <div class="container">
        <div class="other_services_main_box">
          <div class="right_big_box" data-aos="zoom-in" data-aos-offset="1">
            <img
              class="whiteboard_img"
              src="/images/whiteboard.svg"
              alt="Whiteboard Animation"
            />
            <p class="Whiteboard_text">
              Whiteboard <br />
              Animation
            </p>
          </div>

          <div class="left_two_boxes">
            <div class="first_box" data-aos="fade-up" data-aos-offset="1">
              <img class="play" src="/images/play.svg" alt="" />
              <p class="Collage">
                Collage <br />
                Art Animation
              </p>
            </div>

            <div class="second_box" data-aos="fade-up" data-aos-offset="1">
              <img
                class="clacket_light"
                src="/images/clacket_light.svg"
                alt=""
              />
              <img
                class="clacket_solid"
                src="/images/clacket_solid.svg"
                alt=""
              />
              <p class="clacket_text">
                YouTube <br />
                Videos Editing
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dual Contact & YouTube Pill Buttons -->
    <div class="youtube_contact">
      <div class="container">
        <div class="youtube_contact_box">
          <a
            class="contact_btn"
            :href="SITE_CONFIG.whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            تواصـــــــــــل معي
            <img
              class="contact_tringle"
              src="/images/contact_tringle.svg"
              alt=""
            />
          </a>

          <a
            class="youtube_btn"
            :href="SITE_CONFIG.youtubeChannelUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            قنـــاة اليوتيــــــوب
            <img
              class="youtube_tringle"
              src="/images/youtube_tringe.svg"
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Services & CTA Styles (migrated from `home.css` lines 3712–4955)
   ========================================================================== */

.podcast_shorts_box {
  margin: 150px auto 50px;
  scroll-margin-top: 175px;
}

.podcast_shorts_box .container {
  max-width: 1300px;
}

@media screen and (min-width: 1440px) {
  .podcast_shorts_box .container {
    width: 1300px;
  }
}

.podcast_shorts_main {
  margin: 0 auto;
  background-image: url('/images/podcast_shorts_bg_img.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 330px;
  border-radius: 20px;
  position: relative;
}

.podcast_shorts_main::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  bottom: 0;
  right: 0;
  background-color: transparent;
  background-image:
    linear-gradient(0deg, #94d1ff4d 1px, transparent 1px),
    linear-gradient(90deg, #94d1ff4d 1px, transparent 1px);
  background-size: 50px 22px;
  z-index: 0;
  border-radius: 30px;
  pointer-events: none;
}

.mic_head_box {
  position: absolute;
  height: 100%;
  width: 35%;
  left: 0;
  top: 0;
  background: #8acaf0;
  box-shadow: 41px -1px 36.6px -7px rgba(19, 14, 87, 0.31);
  border-radius: 18px;
}

.mic_img {
  position: absolute;
  left: 35px;
  top: 25px;
}

.mic_text {
  position: absolute;
  bottom: 30px;
  left: 25px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 29px;
  line-height: 30px;
  color: #0e23c7;
}

.shotrs_text_1 {
  position: absolute;
  right: 80px;
  top: 45px;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 85px;
  text-align: right;
  color: #b2deff;
  z-index: 0;
}

.shotrs_text_2 {
  position: absolute;
  right: 84px;
  top: 49px;
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  font-weight: 900;
  font-size: 85px;
  text-align: right;
  color: transparent;
  -webkit-text-stroke: thin #b2deff;
}

.otlb_khedmty {
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  color: #ffffff;
  padding: 10px 40px;
  border-radius: 78px;
  margin-top: 30px;
  position: absolute;
  right: 80px;
  bottom: 70px;
  background: linear-gradient(120deg, #262d5c, #ae9712, #262d5c);
  background-size: 200% 100%;
  background-position: 100% 0;
  transition: background-position 0.3s;
  animation: gradientAnimation 1s infinite alternate;
  z-index: 1;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

.otlb_khedmty::before {
  content: '';
  position: absolute;
  width: 110%;
  height: 59.47px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid #c9e8ff;
  border-radius: 40px;
  padding: 5px 8px;
  pointer-events: none;
}

.otlb_khedmty:hover::before {
  border: 3px solid #c4aa16;
  transition: 0.4s;
}

@media screen and (max-width: 1100px) {
  .podcast_shorts_box {
    margin-top: 120px;
  }
  .podcast_shorts_box .container {
    width: 90%;
  }
  .podcast_shorts_main {
    height: 300px;
  }
  .podcast_shorts_main::before {
    background-size: 30px 17px;
  }
  .mic_img {
    left: 20px;
    top: 20px;
    width: 220px;
    height: 169px;
  }
  .mic_text {
    bottom: 20px;
    font-size: 23px;
    line-height: 32px;
  }
  .shotrs_text_1 {
    right: 30px;
    top: 20px;
    font-size: 70px;
  }
  .shotrs_text_2 {
    right: 34px;
    top: 24px;
    font-size: 70px;
  }
  .otlb_khedmty {
    font-size: 15px;
    padding: 10px 30px;
    right: 50px;
    bottom: 60px;
  }
  .otlb_khedmty::before {
    width: 105%;
    height: 50px;
    padding: 5px 10px;
  }
}

@media screen and (max-width: 900px) {
  .podcast_shorts_box {
    margin-top: 100px;
  }
  .podcast_shorts_box .container {
    width: 95%;
  }
  .podcast_shorts_main {
    height: 250px;
  }
  .podcast_shorts_main::before {
    background-size: 25px 14px;
  }
  .mic_head_box {
    width: 37%;
  }
  .mic_img {
    left: 25px;
    top: 25px;
    width: 190px;
    height: 146px;
  }
  .mic_text {
    bottom: 18px;
    font-size: 19px;
    line-height: 25px;
  }
  .shotrs_text_1 {
    right: 30px;
    top: 30px;
    font-size: 50px;
  }
  .shotrs_text_2 {
    right: 34px;
    top: 30px;
    font-size: 50px;
  }
  .otlb_khedmty {
    font-size: 11px;
    padding: 10px 30px;
    right: 38px;
    bottom: 50px;
  }
  .otlb_khedmty::before {
    width: 102%;
    height: 45px;
    padding: 5px 12px;
  }
}

@media screen and (max-width: 750px) {
  .podcast_shorts_box {
    margin-top: 60px;
  }
  .podcast_shorts_main {
    height: 200px;
  }
  .podcast_shorts_main::before {
    background-size: 20px 12px;
  }
  .mic_img {
    left: 15px;
    top: 15px;
    width: 150px;
    height: 115px;
  }
  .mic_text {
    font-size: 17px;
    line-height: 22px;
  }
  .shotrs_text_1 {
    right: 20px;
    top: 20px;
    font-size: 38px;
  }
  .shotrs_text_2 {
    right: 24px;
    top: 20px;
    font-size: 38px;
  }
  .otlb_khedmty {
    font-size: 18px;
    padding: 8px 22px;
    right: 28px;
    bottom: 35px;
  }
  .otlb_khedmty::before {
    width: 100%;
    height: 45px;
    padding: 5px 8px;
  }
}

@media screen and (max-width: 570px) {
  .podcast_shorts_box {
    margin-top: 70px;
  }
  .podcast_shorts_main {
    height: 150px;
  }
  .mic_head_box {
    width: 39%;
  }
  .mic_img {
    left: 12px;
    top: 12px;
    width: 115px;
    height: 89px;
  }
  .mic_text {
    bottom: 12px;
    left: 20px;
    font-size: 15px;
    line-height: 20px;
  }
  .otlb_khedmty {
    font-size: 13px;
    padding: 8px 16px;
    right: 25px;
    bottom: 25px;
  }
  .otlb_khedmty::before {
    height: 35px;
  }
}

@media screen and (max-width: 440px) {
  .podcast_shorts_box {
    margin-top: 0;
  }
  .podcast_shorts_main {
    height: 130px;
  }
  .mic_img {
    left: 8px;
    top: 8px;
    width: 95px;
    height: 73px;
  }
  .mic_text {
    bottom: 8px;
    left: 20px;
    font-size: 12px;
    line-height: 17px;
  }
  .shotrs_text_1 {
    font-size: 30px;
  }
  .shotrs_text_2 {
    font-size: 30px;
  }
  .otlb_khedmty {
    font-size: 12px;
    padding: 7px 16px;
    right: 20px;
    bottom: 20px;
  }
  .otlb_khedmty::before {
    height: 30px;
    padding: 5px 6px;
  }
}

/* Other Services Bento Grid */
.other_services {
  margin: 0 auto 50px;
  direction: rtl;
}

.other_services .container {
  max-width: 1300px;
}

@media screen and (min-width: 1440px) {
  .other_services .container {
    width: 1300px;
  }
}

.other_services_main_box {
  display: flex;
  gap: 40px;
}

.right_big_box {
  position: relative;
  width: 48%;
  height: 580px;
  background: #94d1ff;
  border-radius: 18px;
  filter: drop-shadow(-10px 12px 38.9px rgba(0, 0, 0, 0.12));
}

.left_two_boxes {
  width: 50%;
  height: 580px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.first_box {
  position: relative;
  width: 100%;
  height: 325px;
  background: #8acaf0;
  border-radius: 18px;
}

.second_box {
  position: relative;
  margin: 0 auto;
  background-image: url('/images/left_service_box_bg.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 255px;
  border-radius: 18px;
}

.second_box::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-image:
    linear-gradient(0deg, #94d1ff4d 1px, transparent 1px),
    linear-gradient(90deg, #94d1ff4d 1px, transparent 1px);
  background-size: 25px 15px;
  border-radius: 20px;
  pointer-events: none;
}

.whiteboard_img {
  position: absolute;
  right: 60px;
  top: -30px;
}

.Whiteboard_text {
  position: absolute;
  left: 35px;
  bottom: 20px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 30px;
  color: #19127c;
  text-align: left;
  line-height: 1.2;
}

.play {
  position: absolute;
  right: -70px;
  top: -45px;
}

.Collage {
  position: absolute;
  left: 35px;
  bottom: 25px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 27px;
  color: #19127c;
  text-align: left;
  line-height: 1.2;
}

.clacket_light {
  position: absolute;
  z-index: 0;
  right: -95px;
  top: -78px;
}

.clacket_solid {
  position: absolute;
  z-index: 0;
  right: -25px;
  top: -67px;
}

.clacket_text {
  position: absolute;
  left: 35px;
  bottom: 25px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 27px;
  color: #94d1ff;
  text-align: left;
  line-height: 1.2;
  z-index: 0;
}

@media screen and (max-width: 1100px) {
  .other_services .container {
    width: 90%;
  }
  .right_big_box,
  .left_two_boxes {
    height: 470px;
  }
  .whiteboard_img {
    right: 50%;
    transform: translateX(50%);
    top: -30px;
    width: 300px;
    height: 330px;
  }
  .Whiteboard_text,
  .Collage,
  .clacket_text {
    left: 30px;
    bottom: 20px;
    font-size: 23px;
    line-height: 1.3;
  }
  .play {
    right: -50px;
    top: -25px;
    width: 300px;
    height: 214px;
  }
  .clacket_light {
    right: -75px;
    top: -58px;
    width: 250px;
    height: 250px;
  }
  .clacket_solid {
    right: -5px;
    top: -47px;
    width: 250px;
    height: 250px;
  }
}

@media screen and (max-width: 900px) {
  .other_services .container {
    width: 95%;
  }
  .right_big_box,
  .left_two_boxes {
    height: 380px;
  }
  .whiteboard_img {
    top: -70px;
    width: 230px;
    height: 353px;
  }
  .Whiteboard_text,
  .Collage,
  .clacket_text {
    left: 25px;
    bottom: 15px;
    font-size: 19px;
  }
  .play {
    right: -40px;
    width: 220px;
    height: 157px;
  }
  .clacket_light {
    right: -55px;
    top: -48px;
    width: 190px;
    height: 190px;
  }
  .clacket_solid {
    right: -5px;
    top: -37px;
    width: 190px;
    height: 190px;
  }
}

@media screen and (max-width: 700px) {
  .other_services_main_box {
    gap: 25px;
  }
  .right_big_box,
  .left_two_boxes {
    height: 280px;
  }
  .whiteboard_img {
    top: -20px;
    width: 160px;
    height: 176px;
  }
  .Whiteboard_text {
    left: 20px;
    bottom: 15px;
    font-size: 16px;
  }
  .Collage,
  .clacket_text {
    left: 20px;
    bottom: 5px;
    font-size: 16px;
  }
  .play {
    right: -28px;
    top: -17px;
    width: 175px;
    height: 125px;
  }
  .clacket_light {
    right: -45px;
    top: -38px;
    width: 140px;
    height: 140px;
  }
  .clacket_solid {
    right: -10px;
    top: -27px;
    width: 140px;
    height: 140px;
  }
}

@media screen and (max-width: 540px) {
  .other_services {
    margin-top: -10px;
  }
  .other_services_main_box {
    gap: 15px;
  }
  .right_big_box,
  .left_two_boxes {
    height: 200px;
  }
  .whiteboard_img {
    width: 125px;
    height: 137px;
  }
  .Whiteboard_text {
    font-size: 14px;
  }
  .Collage,
  .clacket_text {
    left: 15px;
    font-size: 13px;
  }
  .play {
    right: -18px;
    top: -12px;
    width: 120px;
    height: 86px;
  }
  .clacket_light {
    right: -25px;
    top: -28px;
    width: 98px;
    height: 98px;
  }
  .clacket_solid {
    right: 0;
    top: -17px;
    width: 98px;
    height: 98px;
  }
}

@media screen and (max-width: 450px) {
  .other_services {
    margin-top: -20px;
  }
  .right_big_box,
  .left_two_boxes {
    height: 180px;
  }
  .left_two_boxes {
    row-gap: 15px;
  }
  .whiteboard_img {
    width: 100px;
    height: 110px;
  }
  .Whiteboard_text {
    left: 15px;
    font-size: 13px;
  }
  .Collage,
  .clacket_text {
    font-size: 11px;
  }
  .play {
    right: -14px;
    top: -10px;
    width: 100px;
    height: 71px;
  }
  .clacket_light {
    right: -25px;
    top: -22px;
    width: 88px;
    height: 88px;
  }
  .clacket_solid {
    right: 0;
    top: -11px;
    width: 88px;
    height: 88px;
  }
}

/* Dual Contact & YouTube Buttons */
.youtube_contact {
  margin: 120px auto 50px;
  direction: rtl;
}

.youtube_contact .container {
  max-width: 1000px;
}

@media screen and (min-width: 1440px) {
  .youtube_contact .container {
    width: 1000px;
  }
}

.youtube_contact_box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact_btn {
  text-decoration: none;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: 23px;
  text-align: right;
  color: #0618c4;
  background: #94d1ff;
  border: 3.5px solid #0618c4;
  border-radius: 105px;
  padding: 0 55px 5px 90px;
  position: relative;
  transition: 0.4s;
}

.contact_btn:hover {
  background: #86bce6;
}

.contact_tringle {
  position: absolute;
  right: -35px;
  width: 63px;
  height: 140%;
  transition: 0.6s;
  top: 0;
  bottom: 0;
  margin: auto 0;
}

.youtube_btn {
  text-decoration: none;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: 23px;
  text-align: right;
  color: #d7f0f2;
  background: #ff7174;
  border: 3.5px solid #ff0000;
  border-radius: 71px;
  padding: 0 55px 5px;
  position: relative;
  margin-right: -45px;
  transition: 0.4s;
}

.youtube_btn:hover {
  background: #e26466;
}

.youtube_tringle {
  position: absolute;
  left: -35px;
  width: 63px;
  height: 140%;
  top: 0;
  bottom: 0;
  margin: auto 0;
  transition: 0.6s;
}

@media screen and (max-width: 1000px) {
  .youtube_contact .container {
    max-width: 800px;
  }
  .contact_btn {
    font-size: 18px;
    border-radius: 50px;
    padding: 3px 35px 3px 50px;
  }
  .contact_tringle {
    right: -25px;
    width: 45px;
    height: 130%;
  }
  .youtube_btn {
    font-size: 18px;
    border-radius: 50px;
    padding: 3px 40px 3px 35px;
    margin-right: -25px;
  }
  .youtube_tringle {
    left: -25px;
    width: 45px;
    height: 130%;
  }
}

@media screen and (max-width: 767px) {
  .youtube_contact {
    margin-top: 70px;
  }
  .youtube_contact .container {
    max-width: 600px;
  }
  .contact_btn {
    font-size: 15px;
    padding: 3px 25px 3px 30px;
  }
  .youtube_btn {
    font-size: 15px;
    padding: 3px 25px 3px 20px;
  }
}
</style>
