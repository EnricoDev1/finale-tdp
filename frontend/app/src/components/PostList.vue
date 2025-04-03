<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import MarkdownIt from "markdown-it";
import DOMPurify from 'dompurify';

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
  xhtmlOut: true
});
const posts = ref([]);

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/blog/posts");
  posts.value = res.data;
  posts.value = res.data.map(post => ({
  ...post,
  content: post.content.trim()
  }));
  console.log(posts.value); // Controlla se vedi *test* letteralmente o \*test\*
});

const render = (content) => {
  const cleanedContent = content
    .trim()
    .replace(/^\s+/gm, '');

  return DOMPurify.sanitize(md.render(cleanedContent));
};

</script>

<template>
  <div>
    <h1>Blog</h1>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <div v-html="render(post.content)"></div>
    </div>
  </div>
</template>

<style scoped>
.prose {
  max-width: 700px;
  margin: auto;
  font-family: sans-serif;
  line-height: 1.6;
}

/* :deep serve solo perché vue è una ***** lol */
:deep(strong) {
  font-weight: bold;
}
</style>
