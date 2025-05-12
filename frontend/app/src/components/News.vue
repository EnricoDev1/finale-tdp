<template>
  <div class="min-h-screen bg-gray-900">
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
        class="absolute top-3 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Login
      </button>

      <button v-if="isAuthenticated"
        @click="$router.push('/dashboard')"
        class="absolute top-3 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Dashboard
      </button>      
    </div>
  </header>
  
      <div class="flex">  
        <!-- Contenuto principale -->
        <div class="flex-1 p-8">
          <!-- Titolo e pulsante refresh -->
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-white">Ultime Notizie</h1>
            <button
              @click="fetchNews"
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <font-awesome-icon :icon="['fas', 'sync']" class="mr-2" />
            </button>
          </div>
  
          <!-- [Resto del tuo codice esistente rimane identico...] -->
          <div v-if="message" :class="['p-4 rounded-lg mb-6', message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100']">
            {{ message.text }}
          </div>
  
          <div v-if="loading" class="text-center py-12">
            <font-awesome-icon :icon="['fas', 'spinner']" spin class="text-white text-4xl" />
            <p class="text-gray-300 mt-4">Caricamento notizie in corso...</p>
          </div>
  
          <div v-else class="space-y-6">
            <div 
                v-for="(newsItem, index) in news.slice(0, 50)" 
                :key="index"
                class="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.01]"
                >
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <h2 class="text-xl font-bold text-white">{{ newsItem.title }}</h2>
                  <span class="text-sm text-gray-400">{{ formatDate(newsItem.publishedAt) }}</span>
                </div>
                
                <p class="text-gray-300 mb-4">{{ newsItem.description }}</p>
                
                <div class="flex justify-between items-center">
                  <span class="text-sm text-indigo-400">{{ newsItem.source.name }}</span>
                  <a 
                    :href="newsItem.url" 
                    target="_blank"
                    class="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  >
                    Leggi tutto <font-awesome-icon :icon="['fas', 'external-link-alt']" class="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const loading = ref(true)
  const message = ref(null)
  const news = ref([])
  const isAuthenticated = ref(false); 

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const fetchNews = async () => {
    try {
      loading.value = true
      message.value = null
      
      const response = await axios.get("http://localhost:3000/api/news")
      
      news.value = response.data.articles
      console.log(news.value[0])
      
    } catch (error) {
      console.error('Errore nel caricamento delle notizie:', error)
      message.value = {
        type: 'error',
        text: 'Impossibile caricare le notizie. Riprova più tardi.'
      }
      
      news.value = [
        {
          title: "Notizia di esempio 1",
          description: "Questo è un esempio di notizia che verrebbe caricata dall'API.",
          publishedAt: new Date(),
          source: { name: "Fonte esempio" },
          url: "#"
        },
        {
          title: "Notizia di esempio 2",
          description: "Un altro esempio di notizia che mostra come verrebbero visualizzati i dati reali.",
          publishedAt: new Date(Date.now() - 86400000),
          source: { name: "Fonte test" },
          url: "#"
        }
      ]
      totalPages.value = 2
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    fetchNews()
    isAuthenticated.value = !!document.cookie;
    
})
  </script>