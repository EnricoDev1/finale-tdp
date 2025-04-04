<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import MarkdownIt from "markdown-it";
import DOMPurify from "dompurify";

const md = new MarkdownIt({ html: true, breaks: true, linkify: true });
const route = useRoute();
const post = ref(null);

onMounted(async () => {
  const res = await axios.get(`http://localhost:3000/api/blog/posts/${route.params.id}`);
  post.value = {
    ...res.data,
    content: DOMPurify.sanitize(md.render(res.data.content.trim()))
  };
});
</script>

<template>
  <div class="container" v-if="post">
    <h1>{{ post.title }}</h1>
    <p class="meta">{{ post.author }} | {{ post.timestamp }}</p>
    <div v-html="post.content" class="prose"></div>
  </div>
</template>

<style scoped>
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, sans-serif;
  background-color: #1e1e24;
  color: #eaeaea;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
  color: #ffffff;
}

.post {
  padding: 1.25rem 1.5rem;
  border: 1px solid #2a2a31;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background-color: #2a2a31;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.post:hover {
  background-color: #34343c;
  border-color: #3a3a42;
}

.post h2 {
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: #f0f0f0;
}

.meta {
  font-size: 0.85rem;
  color: #999;
  margin-bottom: 1rem;
}

.content {
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.6;
}

.content :deep(code) {
  background-color: #3a3a42;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
  color: #ffe484;
}
</style>
