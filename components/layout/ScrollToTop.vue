<script setup lang="ts">
/**
 * Floating Scroll-To-Top Button (`components/layout/ScrollToTop.vue`)
 * -------------------------------------------------------------------
 * Appears in the bottom-right corner after scrolling down 300px.
 */

const isVisible = ref(false)

function handleScroll() {
  isVisible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <button
    id="to-top"
    type="button"
    aria-label="Scroll to top"
    :class="{ show: isVisible }"
    @click="scrollToTop"
  >
    <i class="fa-solid fa-chevron-up"></i>
  </button>
</template>

<style scoped>
#to-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #3a416e;
  color: #ffffff;
  font-size: 1.3em;
  width: 50px;
  height: 50px;
  border-radius: 4px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  transition:
    background-color 0.3s,
    opacity 0.5s,
    visibility 0.5s;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
}

#to-top:hover,
#to-top:active {
  cursor: pointer;
  background-color: #2a2f50;
}

#to-top.show {
  opacity: 1;
  visibility: visible;
}

@media screen and (max-width: 767px) {
  #to-top {
    width: 45px;
    height: 45px;
    bottom: 15px;
    right: 15px;
    font-size: 1.15em;
  }
}
</style>
