<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");

import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(async () => {
    try {
        const token = `Bearer ${document.cookie.split('=')[1]}`;

        const res = await axios.get("http://localhost:3000/api/blog/posts", {
            headers: {
                'authorization': token
            }
        });

        console.log("Dati ricevuti:", res.data);
        posts.value = res.data;
        loading.value = false;
    } catch (err) {
    }
});

const filteredposts = () => {
    if (!searchQuery.value) return posts.value;
    return posts.value.filter(post =>
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);
};

const deletepost = async (postId) => {
    if (confirm("Sei sicuro di voler eliminare questo post?")) {
        try {
            const token = `Bearer ${document.cookie.split('=')[1]}`;
            await axios.delete(`http://localhost:3000/api/blog/posts/${postId}`, {
                headers: {
                    'authorization': token
                }
            });
            posts.value = posts.value.filter(post => post.id !== postId);
            window.location.reload();
        } catch (err) {
            error.value = "Errore nell'eliminazione dell'post";
        }
    }
};

const logout = () => {
    deleteCookie("token");
    router.push("/");
};

const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
};

</script>

<template>
    <div class="flex min-h-screen bg-gray-900">

        <div class="w-64 bg-gray-800 min-h-screen p-4">
            <div class="text-white text-2xl font-bold mb-8 p-2 border-b border-gray-700">
                Admin Dashboard
            </div>

            <nav>
                <router-link to="/dashboard" class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
                    active-class="bg-gray-700 text-white">
                    Home
                </router-link>

                <router-link to="/dashboard/users" class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
                    active-class="bg-gray-700 text-white">
                    Users
                </router-link>

                <router-link to="/dashboard/posts" class="block py-2 px-4 text-gray-300 hover:bg-gray-700 rounded mb-1"
                    active-class="bg-gray-700 text-white">
                    Post
                </router-link>

                <button
                    @click="logout"
                    class="mt-auto text-sm font-medium text-red-400 hover:text-red-300 px-3 py-1 rounded-lg"
                >
                    Logout
                </button>
            </nav>
        </div>

        <!-- Contenuto principale -->
        <div class="flex-1 p-6">
            <!-- Header -->
            <div class="flex justify-between items-center mb-8">
                <h1 class="text-3xl font-bold text-white">Gestione Posts</h1>
            </div>

            <!-- Search and Stats -->
            <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div class="relative w-full sm:w-64">
                        <input v-model="searchQuery" type="text" placeholder="Cerca post..."
                            class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div class="flex gap-4 flex-wrap">
                        <div class="bg-gray-700 px-4 py-2 rounded-lg text-center">
                            <p class="text-sm text-gray-300">Totali</p>
                            <p class="text-xl font-bold text-white">{{ filteredposts().length }}</p>
                        </div>
                        <div class="bg-gray-700 px-4 py-2 rounded-lg text-center">
                            <p class="text-sm text-gray-300">Admin</p>
                            <p class="text-xl font-bold text-indigo-400">{{filteredposts().filter(u => u.author_role
                                === 'admin').length }}</p>
                        </div>
                        <div class="bg-gray-700 px-4 py-2 rounded-lg text-center">
                            <p class="text-sm text-gray-300">Writer</p>
                            <p class="text-xl font-bold text-green-400">{{filteredposts().filter(u => u.author_role ===
                                'writer').length }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading/Error States -->
            <div v-if="loading" class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                <p class="mt-4 text-gray-300">Caricando i post...</p>
            </div>

            <div v-else-if="error" class="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg">
                {{ error }}
            </div>

            <!-- Tabella dei post -->
            <div v-else class="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-700">
                        <thead class="bg-gray-700">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Titolo</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Contenuto</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Autore</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Timestamp</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-gray-800 divide-y divide-gray-700">
                            <tr v-for="post in filteredposts()" :key="post.id"
                                class="hover:bg-gray-750 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap text-white">{{ post.title }}</td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-400"
                                    v-html="post.content.slice(0, 50) + '...'"></td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-400">
                                    <span :class="{
                                        'bg-blue-900 text-gray-300': post.author_role === 'admin',
                                        'bg-green-900 text-gray-300': post.author_role === 'writer',
                                        'bg-indigo-900 text-gray-300': post.author_role === 'user'
                                    }" class="px-2 py-1 text-xs font-medium rounded-full">
                                        {{ post.author }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-gray-400">{{ formatDate(post.timestamp) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex space-x-2">
                                        <router-link :to="`/dashboard/posts/edit/${post.id}`"
                                            class="text-indigo-400 hover:text-indigo-300">
                                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                                        </router-link>
                                        <button @click="deletepost(post.id)" class="text-red-400 hover:text-red-300">
                                            <font-awesome-icon :icon="['fas', 'trash']" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Stato vuoto -->
                <div v-if="filteredposts().length === 0" class="text-center py-12">
                    <svg class="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 class="mt-2 text-lg font-medium text-white">Nessun post trovato</h3>
                    <p class="mt-1 text-sm text-gray-400">Prova a modificare i criteri di ricerca</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px 16px;
    text-align: left;
}

th {
    background-color: #374151;
    color: #d1d5db;
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
}

tr:nth-child(even) {
    background-color: rgba(31, 41, 55, 0.5);
}

tr:hover {
    background-color: rgba(55, 65, 81, 0.5);
}
</style>
