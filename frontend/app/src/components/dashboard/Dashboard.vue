<template>
    <div class="min-h-screen bg-gray-900">
        <div class="flex">
            <Sidebar />

            <div class="flex-1 p-8">
                <h1 class="text-3xl font-bold text-white mb-8">Dashboard</h1>

                <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-semibold text-white">Statistiche Generali</h2>
                        <span class="text-sm text-gray-400">Ultimo aggiornamento: {{ formatDate(new Date()) }}</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="bg-gray-700 p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-300">Utenti totali</p>
                                    <p class="text-3xl font-bold text-white">{{ stats.totalUsers }}</p>
                                </div>
                                <div class="bg-gray-600 p-3 rounded-full">
                                    <font-awesome-icon :icon="['fas', 'users']" class="text-indigo-400 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-700 p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-300">Post totali</p>
                                    <p class="text-3xl font-bold text-white">{{ stats.totalPosts }}</p>
                                </div>
                                <div class="bg-gray-600 p-3 rounded-full">
                                    <font-awesome-icon :icon="['fas', 'file-lines']" class="text-green-400 text-xl" />
                                </div>
                            </div>
                        </div>

                        <div class="bg-gray-700 p-4 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-sm text-gray-300">Post medi per utente</p>
                                    <p class="text-3xl font-bold text-white">{{ stats.totalPosts / stats.totalUsers }}
                                    </p>
                                </div>
                                <div class="bg-gray-600 p-3 rounded-full">
                                    <font-awesome-icon :icon="['fas', 'file-lines']" class="text-green-400 text-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <router-link to="/dashboard/users"
                        class="bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-gray-750 transition-colors group">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-xl font-semibold text-white mb-2">Gestione Utenti</h2>
                                <p class="text-gray-400 mb-4">Visualizza e gestisci tutti gli utenti registrati</p>
                            </div>

                            <div class="bg-gray-700 group-hover:bg-gray-600 p-2 rounded-lg transition-colors">
                                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-gray-300" />
                            </div>
                        </div>
                    </router-link>
                    <router-link to="/dashboard/posts"
                        class="bg-gray-800 rounded-xl shadow-lg p-6 hover:bg-gray-750 transition-colors group">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-xl font-semibold text-white mb-2">Gestione Post</h2>
                                <p class="text-gray-400 mb-4">Visualizza e gestisci tutti i post pubblicati</p>
                            </div>

                            <div class="bg-gray-700 group-hover:bg-gray-600 p-2 rounded-lg transition-colors">
                                <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-gray-300" />
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Sidebar from '../utils/Sidebar.vue';

const stats = ref({
    totalUsers: 0,
    totalPosts: 0,
    usersGrowth: 0,
    postsGrowth: 0,
    activeUsersToday: 0,
    postsToday: 0
})

const loading = ref(true)

const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date)
}

onMounted(async () => {
    try {
        const token = `Bearer ${document.cookie.split('=')[1]}`

        // Simulazione dati (sostituisci con chiamate API reali)
        const resBlog = await axios.get('http://localhost:3000/api/blog/posts', {
            headers: { authorization: token }
        })

        const resUsers = await axios.get('http://localhost:3000/api/users', {
            headers: { authorization: token }
        })
        stats.value = {
            totalUsers: resUsers.data.length,
            totalPosts: resBlog.data.length,
        }

        loading.value = false
    } catch (err) {
        console.error('Errore nel caricamento delle statistiche:', err)
        // Fallback con dati di esempio
        stats.value = {
            totalUsers: 1243,
            totalPosts: 568,
            totalComments: 3245,
            usersGrowth: 2.4,
            postsGrowth: 5.7,
            commentsGrowth: -1.2,
            activeUsersToday: 24,
            postsToday: 8
        }
        loading.value = false
    }
})

</script>
