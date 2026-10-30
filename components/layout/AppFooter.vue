<script setup lang="ts">
/**
 * Main Site Footer (`components/layout/AppFooter.vue`)
 * ----------------------------------------------------
 * Renders:
 *   1. `.main_footer`: Footer logo + bio, navigation links, and email signup input
 *   2. `.sub_footer`: Social media icons from `data/site.ts`
 */
import { SITE_CONFIG, SOCIAL_LINKS } from '~/data/site'

const email = ref('')
const submitted = ref(false)

function handleEmailSubmit() {
  if (!email.value.trim()) return
  submitted.value = true
  email.value = ''
  setTimeout(() => {
    submitted.value = false
  }, 3000)
}
</script>

<template>
  <div>
    <!-- Main Dark Navy Footer -->
    <footer class="main_footer">
      <div class="container">
        <div class="main_footer_box">
          <!-- Column 1: Logo & Bio -->
          <div class="logo_text flex_view">
            <img class="logo_footer" src="/images/footer_logo.svg" alt="Fawzy" />
            <p class="logo_paragraph">
              {{ SITE_CONFIG.footerBio }}
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="links flex_view">
            <NuxtLink class="footer_link" to="/blog">
              المـــــــــــــــــــــــــــــــدونــــة
            </NuxtLink>
            <NuxtLink class="footer_link" to="/#my_services">
              خدمـــــــــــــــــــــــــــــــاتـــي
            </NuxtLink>
            <NuxtLink class="footer_link" to="/videos">
              أعمــــــــــــــــــــــــــــــــــــالــي
            </NuxtLink>
          </div>

          <!-- Column 3: Email Registration -->
          <form class="email_register flex_view" @submit.prevent="handleEmailSubmit">
            <h4 class="register_head">سجل الآن</h4>
            <div class="register_input_container">
              <input
                id="blink_cursor_email_register"
                v-model="email"
                class="register_input"
                placeholder="none"
                required
                type="email"
              />
              <label class="placeholder" for="blink_cursor_email_register">
                your e-mail
              </label>
            </div>
            <button type="submit" class="register_submit">
              {{ submitted ? 'تم التسجيل ✓' : 'Submit' }}
            </button>
          </form>
        </div>
      </div>
    </footer>

    <!-- Bottom Social Bar -->
    <footer class="sub_footer">
      <div class="container">
        <div class="social_link_box">
          <a
            v-for="social in SOCIAL_LINKS"
            :key="social.name"
            :href="social.url"
            :aria-label="social.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i
              :class="[
                social.icon,
                'social_link',
                { rights_mark: social.rightsMark },
              ]"
            ></i>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Footer Styles (migrated from `footer.css`)
   ========================================================================== */

.main_footer {
  direction: rtl;
  width: 100%;
  min-height: 370px;
  background: #040935;
  padding: 100px;
}

.main_footer_box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
  margin: 0 auto;
  max-width: 1200px;
}

.logo_text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo_footer {
  width: fit-content;
  height: fit-content;
}

.logo_paragraph {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.7;
  text-align: right;
  color: #ffffff;
}

.links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  row-gap: 15px;
}

.footer_link {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 21px;
  text-align: right;
  color: #ffffff;
  text-decoration: none;
  transition: 0.3s;
}

.footer_link:hover {
  transform: translateY(-5px);
  color: #8891e4;
}

.email_register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  row-gap: 15px;
}

.register_head {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  text-align: right;
  color: #ffffff;
}

.register_input {
  border: 2px solid #a5a5a59f;
  border-radius: 20px;
  width: 250px;
  padding: 10px 15px;
  background-color: transparent;
  direction: ltr;
  transition: 0.2s;
  outline: none;
  color: #ffffff;
  font-size: 17px;
  caret-color: #ffffff;
}

.register_input::placeholder {
  opacity: 0;
  visibility: hidden;
  color: transparent;
}

.register_input:focus,
.register_input:hover {
  border: 2px solid #8891e4;
  transition: 0.3s;
  outline: none;
}

.register_input_container {
  position: relative;
}

.placeholder {
  position: absolute;
  font-size: 14px;
  font-weight: 400;
  left: 0;
  top: 0;
  padding: 11px 20px;
  color: #e9e9e9;
  transition: all 0.3s ease;
  z-index: 1;
  pointer-events: none;
  background-color: transparent;
}

.register_input:focus ~ .placeholder,
.register_input:not(:placeholder-shown):not(:focus) ~ .placeholder {
  top: -10px;
  left: 25px;
  z-index: 5;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  transition: all 0.2s ease-in-out;
  background: #040935;
  padding: 0 10px;
}

.register_submit {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  text-align: right;
  color: #ffffff;
  text-decoration: none;
  background: #0618c4;
  border: none;
  cursor: pointer;
  border-radius: 52px;
  padding: 5px 20px;
}

/* Sub Footer */
.sub_footer {
  width: 100%;
  height: 60px;
  background: #d3d3d3;
  direction: rtl;
  padding: 15px 0;
}

.social_link_box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  width: fit-content;
  margin: 0 auto;
}

.social_link_box::before {
  position: absolute;
  content: 'R';
  display: flex;
  justify-content: center;
  align-items: center;
  right: -10px;
  bottom: 1px;
  color: #888888;
  border: 1px solid #888888;
  font-size: 6px;
  font-weight: 800;
  border-radius: 50%;
  width: 7px;
  height: 7px;
}

.social_link {
  color: #888888;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s;
}

.social_link:hover {
  color: #424242;
}

@media screen and (max-width: 600px) {
  .main_footer_box {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    place-items: center;
  }

  .logo_footer {
    width: 107px !important;
    height: 78px !important;
    margin-bottom: 10px;
    margin-left: auto;
  }

  .flex_view {
    align-items: center !important;
  }
}

@media screen and (max-width: 500px) {
  .main_footer_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
  }

  .main_footer {
    padding: 100px 0;
  }

  .flex_view {
    align-items: center !important;
  }

  .logo_footer {
    width: 107px !important;
    height: 78px !important;
    margin-bottom: 10px;
    margin-left: auto;
  }
}
</style>
