<template>
    <div class="min-h-screen bg-gray-900">
      <!-- Sidebar e contenuto principale -->
      <div class="flex">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-800 min-h-screen p-4">
          <div class="text-white text-2xl font-bold mb-8 p-2 border-b border-gray-700">
            Admin Dashboard
          </div>
  
          <nav>
            <router-link
              to="/dashboard"
              class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
              active-class="bg-gray-700 text-white"
            >
              Panoramica
            </router-link>
  
            <router-link
              to="/dashboard/users"
              class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
              active-class="bg-gray-700 text-white"
            >
              Utenti
            </router-link>
  
            <router-link
              to="/dashboard/posts"
              class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
              active-class="bg-gray-700 text-white"
            >
              Post
            </router-link>
          </nav>
        </div>
  
        <!-- Contenuto principale -->
        <div class="flex-1 p-8">
          <!-- Titolo e pulsante indietro -->
          <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-white">Modifica Post</h1>
            <router-link 
              to="/dashboard/posts"
              class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
              Torna indietro
            </router-link>
          </div>
  
          <!-- Card di modifica -->
          <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div v-if="loading" class="text-center py-8">
              <font-awesome-icon :icon="['fas', 'spinner']" spin class="text-white text-2xl" />
              <p class="text-gray-300 mt-2">Caricamento post...</p>
            </div>
  
            <div v-else>
              <!-- Form di modifica -->
              <form @submit.prevent="updatePost">
                <!-- Titolo -->
                <div class="mb-6">
                  <label for="title" class="block text-gray-300 mb-2">Titolo</label>
                  <input
                    type="text"
                    id="title"
                    v-model="post.title"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
  
                <!-- Contenuto -->
                <div class="mb-6">
                  <label for="content" class="block text-gray-300 mb-2">Contenuto</label>
                  <textarea
                    id="content"
                    v-model="post.content"
                    rows="8"
                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>
  
                <!-- Autore e data -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-gray-300 mb-2">Autore</label>
                    <div class="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300">
                      {{ post.author || 'N/A' }}
                    </div>
                  </div>
                  <div>
                    <label class="block text-gray-300 mb-2">Data creazione</label>
                    <div class="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300">
                      {{ formatDate(post.createdAt) }}
                    </div>
                  </div>
                </div>
    
                <!-- Pulsanti -->
                <div class="flex justify-end space-x-4">
                  <button
                    type="button"
                    @click="confirmDelete"
                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Elimina
                  </button>
                  <button
                    type="submit"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Salva modifiche
                  </button>
                </div>
              </form>
            </div>
          </div>
  
          <!-- Messaggio di successo/errore -->
          <div v-if="message" :class="['p-4 rounded-lg mb-6', message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100']">
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import axios from 'axios'
  
  const route = useRoute()
  const router = useRouter()
  
  const postId = route.params.id

  const loading = ref(true)
  const post = ref({
    title: '',
    content: '',
    author: '',
    createdAt: new Date(),
  })
  
  const message = ref(null)
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  
  const fetchPost = async () => {
    try {
      const token = `Bearer ${document.cookie.split('=')[1]}`
      const res = await axios.get(`http://localhost:3000/api/blog/posts/${postId}`, {
        headers: { authorization: token }
      })
      
      post.value = res.data
      loading.value = false
    } catch (err) {
      console.error('Errore nel caricamento del post:', err)
      message.value = {
        type: 'error',
        text: 'Impossibile caricare il post'
      }
      loading.value = false
    }
  }
  
  const updatePost = async () => {
    try {
      const token = `Bearer ${document.cookie.split('=')[1]}`;
      const payload = {
        title: post.value.title,
        content: post.value.content
      }
      await axios.put(`http://localhost:3000/api/blog/posts/${postId}`, payload , {
        headers: { authorization: token }
      })
      
      message.value = {
        type: 'success',
        text: 'Post aggiornato con successo!'
      }
      
      // Aggiorna i dati dopo il salvataggio
      fetchPost()
    } catch (err) {
      console.error('Errore nell\'aggiornamento del post:', err)
      message.value = {
        type: 'error',
        text: 'Errore durante il salvataggio del post'
      }
    }
  }
  
  const confirmDelete = () => {
    if (confirm('Sei sicuro di voler eliminare questo post? L\'azione è irreversibile.')) {
      deletePost()
    }
  }
  
  const deletePost = async () => {
    try {
      const token = `Bearer ${document.cookie.split('=')[1]}`
      await axios.delete(`http://localhost:3000/api/posts/${postId}`, {
        headers: { authorization: token }
      })
      
      router.push('/dashboard/posts')
    } catch (err) {
      console.error('Errore nell\'eliminazione del post:', err)
      message.value = {
        type: 'error',
        text: 'Errore durante l\'eliminazione del post'
      }
    }
  }
  
  onMounted(() => {
    fetchPost()
  })
  </script>