<template>
    <div class="container">
      <h1 class="title">📝 Il Mio Blog</h1>

      <div v-for="post in posts" :key="post.id" class="post" @click="$router.push(`/post/${post.id}`)">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="meta">✍️ {{ post.author }} • 🕒 {{ post.timestamp }}</p>
        <div class="content" v-html="render(post.content.slice(0, 200) + '...')"></div>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import MarkdownIt from "markdown-it";
  import DOMPurify from "dompurify";

  const md = new MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true,
  });

  const posts = ref([]);

  onMounted(async () => {
    const res = await axios.get("http://localhost:3000/api/blog/posts");
    posts.value = res.data.map((post) => ({
      ...post,
      content: post.content.trim(),
    }));
  });

  const render = (content) => {
    const cleanedContent = content.trim().replace(/^\s+/gm, "");
    return DOMPurify.sanitize(md.render(cleanedContent));
  };
  </script>

  <style scoped>
  :root {
    color-scheme: dark;
  }

  .container {
    max-width: 760px;
    margin: 0 auto;
    padding: 2rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #121217;
    color: #e0e0e0;
    min-height: 100vh;
  }

  .title {
    text-align: center;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    color: #ffffff;
  }

  .post {
    background: #1c1c22;
    border: 1px solid #2b2b33;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  .post:hover {
    background: #23232b;
    transform: translateY(-2px);
  }

  .post-title {
    font-size: 1.5rem;
    margin-bottom: 0.3rem;
    color: #fafafa;
    font-weight: 600;
  }

  .meta {
    font-size: 0.9rem;
    color: #999;
    margin-bottom: 1rem;
  }

  .content {
    font-size: 1rem;
    color: #ccc;
    line-height: 1.6;
  }

  .content :deep(a) {
    color: #91baff;
    text-decoration: underline;
  }

  .content :deep(code) {
    background-color: #2a2a36;
    color: #ffd580;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }

  .content :deep(pre) {
    background: #1e1e2a;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
  }
  </style>
