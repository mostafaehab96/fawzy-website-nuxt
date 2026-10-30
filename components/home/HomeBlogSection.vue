<script setup lang="ts">
/**
 * Home Blog Preview Section (`components/home/HomeBlogSection.vue`)
 * -----------------------------------------------------------------
 * Displays the "المدونة" decorative header and the featured blog cards
 * (`featuredOnHome: true` from `data/blogs.ts`) reusing `<BlogCard />`.
 */
import { blogPosts } from '~/data/blogs'

const featuredPosts = computed(() =>
  blogPosts.filter((post) => post.featuredOnHome)
)
</script>

<template>
  <div>
    <!-- Decorative "المدونة" Heading -->
    <section class="modaona_head_section">
      <div class="container">
        <div class="modaona_head_box">
          <h2 class="modaona_head_title">المدونة</h2>
          <img
            class="modaona_shape"
            src="/images/modaona_shape.svg"
            alt=""
          />
          <span class="modaona_pen">
            <img
              class="modaona_pen_img"
              src="/images/modaona_pen.svg"
              alt=""
            />
          </span>
        </div>
      </div>
    </section>

    <!-- Featured Blog Posts Grid -->
    <div class="blog-container blog_home">
      <div class="container">
        <div class="blog-grid">
          <BlogCard
            v-for="post in featuredPosts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ==========================================================================
   Home Blog Preview Styles (migrated from `home.css` & `blog.css`)
   ========================================================================== */

.modaona_head_section {
  margin: 120px auto 100px;
  direction: rtl;
}

.modaona_head_section .container {
  max-width: 1000px;
}

@media screen and (min-width: 1440px) {
  .modaona_head_section .container {
    width: 1000px;
  }
}

.modaona_head_box {
  width: fit-content;
  margin: 0 auto;
  position: relative;
}

.modaona_shape {
  position: absolute;
  z-index: -1;
  width: 230px;
  top: -32px;
  right: 50%;
  transform: translateX(50%);
}

.modaona_head_title {
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: 55px;
  text-align: center;
  color: #000000;
}

.modaona_pen {
  position: absolute;
  top: -20px;
  left: -100px;
}

@media screen and (max-width: 900px) {
  .modaona_head_section {
    margin: 100px auto 80px;
  }
  .modaona_shape {
    width: 180px;
  }
  .modaona_head_title {
    font-size: 40px;
  }
  .modaona_pen {
    top: -40px;
    left: -90px;
  }
  .modaona_pen_img {
    width: 80px;
    height: 80px;
  }
}

@media screen and (max-width: 700px) {
  .modaona_shape {
    width: 160px;
  }
  .modaona_head_title {
    font-size: 30px;
  }
  .modaona_pen {
    top: -25px;
    left: -80px;
  }
  .modaona_pen_img {
    width: 65px;
    height: 65px;
  }
}

/* Blog Grid Layout */
.blog-container {
  margin: 30px auto 150px;
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

@media (max-width: 500px) {
  .blog-container .container {
    padding: 0 20px;
  }
}
</style>
