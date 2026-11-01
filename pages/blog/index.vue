<script setup lang="ts">
/**
 * Blog Index Page (`pages/blog/index.vue`) — Route: `/blog`
 * ---------------------------------------------------------
 * Renders all articles from `data/blogs.ts` using `<BlogCard />`.
 * Placing this inside `pages/blog/index.vue` makes it effortless to add
 * dynamic article detail pages later via `pages/blog/[slug].vue`.
 */
import { blogPosts } from '~/data/blogs'

useHead({
  title: 'Fawzy — المدونة',
})
</script>

<template>
  <div class="blog-container">
    <div class="container">
      <div class="blog-grid">
        <BlogCard
          v-for="(post, index) in blogPosts"
          :key="post.id"
          :post="post"
          :priority="index < 2"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Blog Listing Page Styles (migrated from `blog.css`)
   ========================================================================== */

.blog-container {
  margin: 250px auto 150px;
}

.blog-container .container {
  padding: 0 100px;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  gap: 35px;
  row-gap: 45px;
}

@media (max-width: 1440px) {
  .blog-container .container {
    padding: 0 20px;
  }
}

@media (max-width: 1330px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  }
}

@media (max-width: 1125px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  }
}

@media (max-width: 815px) {
  .blog-container .container {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .blog-container {
    margin-top: 180px;
  }
}

@media (max-width: 500px) {
  .blog-container .container {
    padding: 0 20px;
  }
}
</style>
