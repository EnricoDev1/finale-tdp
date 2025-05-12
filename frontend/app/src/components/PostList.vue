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
  const isAuthenticated = ref(false);

  onMounted(async () => {

    isAuthenticated.value = !!document.cookie;

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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
</script>

<template>
  <header class="bg-gray-800 border-b border-gray-700">
  <div class="container mx-auto px-4 py-3 flex items-center">
    <div class="flex items-center space-x-6">
      <router-link to="/" class="text-white flex items-center">
        <font-awesome-icon :icon="['fas', 'newspaper']" class="h-6 w-6 text-indigo-400 mr-2" />
        <span class="text-xl font-bold">NewsPortal</span>
      </router-link>
      
      <nav class="hidden md:flex space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" active-class="text-white">
          Home
        </router-link>
        <router-link to="/news" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" active-class="text-white">
          News
        </router-link>
        <router-link to="/inflazione" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" active-class="text-white">
          Inflazione
        </router-link>
        <router-link to="/newpost" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium" active-class="text-white">
          Nuovo Post
        </router-link>
      </nav>
    </div>
      <button v-if="!isAuthenticated"
        @click="$router.push('/login')"
        class="absolute top-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Login
      </button>

      <button v-if="isAuthenticated"
        @click="$router.push('/dashboard')"
        class="absolute top-3 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Dashboard
      </button>      
    </div>
  </header>

    <div class="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-12">
          <div class="text-center w-full">
            <p class="text-xl text-gray-400">Pensieri ed idee sulle guerre economiche</p>
          </div>
        </div>

        <!-- Posts Grid -->
        <div class="space-y-6">
          <article
            v-for="post in posts"
            :key="post.id"
            @click="$router.push(`/post/${post.id}`)"
            class="group bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-700 hover:border-indigo-500 "
          >
            <div class="p-6 sm:p-8">
              <div class="flex items-center justify-between mb-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-900 text-indigo-200">
                  {{ post.category || 'Generale' }}
                </span>
                <span class="text-sm text-gray-400">🕒 {{ formatDate(post.timestamp) }}</span>
              </div>

              <h2 class="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-200 mb-3">
                {{ post.title }}
              </h2>

              <div class="flex items-center text-gray-400 mb-4">
                <span class="inline-block mr-2">✍️</span>
                <span class="font-medium">{{ post.author }}</span>
              </div>

              <div
                class="prose prose-invert max-w-none text-gray-300 mb-4 line-clamp-3"
                v-html="render(post.content.slice(0, 200) + '...')"
              ></div>

              <div class="flex justify-between items-center mt-6">
                <span class="text-indigo-400 font-medium group-hover:text-indigo-300 transition-colors duration-200">
                  Leggi tutto →
                </span>
                <span class="text-sm text-gray-500">{{ post.reading_time || '3 min' }} di lettura</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </template>

  <style>
  .prose-invert {
    --tw-prose-body: #e5e7eb;
    --tw-prose-headings: #f3f4f6;
    --tw-prose-lead: #d1d5db;
    --tw-prose-links: #818cf8;
    --tw-prose-code: #f0f0f0;
    --tw-prose-pre-code: #f0f0f0;
    --tw-prose-quotes: #e5e7eb;
  }

  .prose-invert code {
    @apply bg-gray-700 text-indigo-200 px-2 py-1 rounded;
  }

  .prose-invert pre {
    @apply bg-gray-700 border border-gray-600 rounded-lg overflow-x-auto;
  }

  .prose-invert pre code {
    @apply bg-transparent p-0;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
