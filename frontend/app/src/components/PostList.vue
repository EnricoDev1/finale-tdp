<template>
    <div class="container">
      <h1 class="text-3xl font-bold text-blue-600">Ciao Vue + Tailwind!</h1>
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
