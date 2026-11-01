<script setup lang="ts">
/**
 * Reusable Blog Article Card (`components/blog/BlogCard.vue`)
 * -----------------------------------------------------------
 * Shared between:
 *   - `components/home/HomeBlogSection.vue` (Home preview)
 *   - `pages/blog/index.vue` (Full `/blog` listing)
 *
 * If `post.url` is set in `data/blogs.ts`, clicking "عرض المقال" navigates to it.
 * Otherwise, it displays the glassmorphic "Coming Soon" dialog (replacing the
 * external SweetAlert2 CDN dependency with native Vue 3 `<Teleport>`).
 */
import type { BlogPostItem } from '~/data/blogs'

const props = defineProps<{
  post: BlogPostItem
  priority?: boolean
}>()

const showComingSoonModal = ref(false)

function handleReadMore(e: MouseEvent) {
  if (props.post.url) return
  e.preventDefault()
  showComingSoonModal.value = true
}

function closeModal() {
  showComingSoonModal.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && showComingSoonModal.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <article class="blog-card">
    <div class="card-image">
      <img
        :src="post.image"
        :alt="post.imageAlt"
        width="720"
        height="480"
        :loading="priority ? 'eager' : 'lazy'"
        :fetchpriority="priority ? 'high' : undefined"
        decoding="async"
      />
    </div>

    <div class="card-content">
      <h3 class="card-title">{{ post.title }}</h3>
      <p class="card-excerpt">{{ post.excerpt }}</p>

      <NuxtLink
        v-if="post.url && post.url.startsWith('/')"
        :to="post.url"
        class="read-more"
      >
        عرض المقال
      </NuxtLink>
      <a
        v-else
        :href="post.url || '#'"
        :target="post.url ? '_blank' : undefined"
        :rel="post.url ? 'noopener noreferrer' : undefined"
        class="read-more"
        @click="handleReadMore"
      >
        عرض المقال
      </a>
    </div>

    <!-- Glassmorphic "Coming Soon" Modal (replaces SweetAlert2 `blogs.js`) -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showComingSoonModal"
          class="modal-backdrop"
          role="dialog"
          aria-modal="true"
          @click.self="closeModal"
        >
          <div class="my-swal-popup">
            <div class="info-icon-circle">
              <span>i</span>
            </div>
            <p class="my-swal-text">سيكون المقال متوفر قريبًا</p>
            <button type="button" class="my-swal-button" @click="closeModal">
              OK
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </article>
</template>

<style scoped>
/* ==========================================================================
   Blog Card & Coming-Soon Modal Styles (migrated from `blog.css`)
   ========================================================================== */

.blog-card {
  background: #f4f2ef;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 20px #00000007;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px #00000009;
}

.card-image {
  height: 300px;
  text-align: center;
  margin: 35px 0 0;
}

.card-image img {
  width: 90%;
  border-radius: 20px;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card-content {
  padding: 1.5rem;
  padding-right: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  direction: rtl;
}

.card-title {
  font-size: 1.7rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.card-excerpt {
  color: #707070;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1.7em;
}

.read-more {
  display: inline-block;
  color: #0c00b5;
  font-weight: 600;
  font-size: 19px;
  text-decoration: none;
  position: relative;
  padding-bottom: 3px;
  width: fit-content;
  cursor: pointer;
}

.read-more::after {
  content: '';
  position: absolute;
  bottom: -5px;
  right: 0;
  width: 0;
  height: 2px;
  background: #0c00b5;
  transition: width 0.3s ease;
}

.read-more:hover::after {
  width: 130%;
}

.read-more::before {
  content: '\f060';
  font-family: 'Font Awesome 6 Free', 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -25px;
  color: #0c00b5;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .card-image {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .card-content {
    padding: 1.5rem;
  }
}

/* Coming Soon Glassmorphic Dialog */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 16px;
}

.my-swal-popup {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  backdrop-filter: blur(10px) saturate(50%);
  -webkit-backdrop-filter: blur(10px) saturate(20%);
  background-color: rgba(255, 255, 255, 0.72);
  border: 2px solid #634f4f96;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.info-icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid #4e45c5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0c00b5;
  font-size: 42px;
  font-weight: 700;
  font-family: serif;
}

.my-swal-text {
  color: #373a3b;
  font-weight: 800;
  font-size: 20px;
  direction: rtl;
}

.my-swal-button {
  background-color: #0c364e;
  color: #ffffff;
  border-radius: 12px;
  border: 2px solid #0c364e;
  padding: 10px 30px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
}

.my-swal-button:hover {
  color: #0c364e;
  background-color: transparent;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .my-swal-popup {
    width: 92%;
  }
}
</style>
