<template>
    <div class="min-h-screen bg-gray-900">
        <!-- Sidebar e contenuto principale -->
        <div class="flex">
            <!-- Sidebar -->
            <Sidebar />

            <!-- Contenuto principale -->
            <div class="flex-1 p-8">
                <!-- Titolo e pulsante indietro -->
                <div class="flex justify-between items-center mb-8">
                    <h1 class="text-3xl font-bold text-white">Modifica Utente</h1>
                    <router-link to="/dashboard/users"
                        class="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                        <font-awesome-icon :icon="['fas', 'arrow-left']" class="mr-2" />
                        Torna indietro
                    </router-link>
                </div>

                <!-- Card di modifica -->
                <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                    <div v-if="loading" class="text-center py-8">
                        <font-awesome-icon :icon="['fas', 'spinner']" spin class="text-white text-2xl" />
                        <p class="text-gray-300 mt-2">Caricamento utente...</p>
                    </div>

                    <div v-else>
                        <!-- Form di modifica -->
                        <form @submit.prevent="updateUser">
                            <!-- Nome -->
                            <div class="mb-6">
                                <label for="name" class="block text-gray-300 mb-2">Displayname</label>
                                <input type="text" id="name" v-model="user.displayname"
                                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    vlaue="" required />
                            </div>

                            <!-- Ruolo -->
                            <div class="mb-6">
                                <label for="role" class="block text-gray-300 mb-2">Ruolo</label>
                                <select id="role" v-model="user.role"
                                    class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required>
                                    <option value="user">Utente</option>
                                    <option value="writer">Writer</option>
                                    <option value="admin">Amministratore</option>
                                </select>
                            </div>

                            <!-- Data registrazione -->
                            <div class="mb-6">
                                <label class="block text-gray-300 mb-2">Data registrazione</label>
                                <div class="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300">
                                    {{ formatDate(user.lastLogin) }}
                                </div>
                            </div>

                            <!-- Pulsanti -->
                            <div class="flex justify-end space-x-4">
                                <button type="button" @click="confirmDelete"
                                    class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    Elimina
                                </button>
                                <button type="submit"
                                    class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
                                    Salva modifiche
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Messaggio di successo/errore -->
                <div v-if="message"
                    :class="['p-4 rounded-lg mb-6', message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100']">
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
import Sidebar from '../utils/Sidebar.vue'

const route = useRoute()
const router = useRouter()

const userId = route.params.id
const loading = ref(true)

const user = ref({
    displayname: '',
    role: '',
    lastLogin: new Date(),
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

const fetchUser = async () => {
    try {
        const token = `Bearer ${document.cookie.split('=')[1]}`;
        const res = await axios.post(`http://localhost:3000/api/users/${userId}`, {}, {
            headers: { authorization: token }
        });

        user.value = res.data[0]
        loading.value = false
    } catch (err) {
        console.error('Errore nel caricamento dell\'utente:', err)
        message.value = {
            type: 'error',
            text: 'Impossibile caricare l\'utente'
        }
        loading.value = false
    }
}

const updateUser = async () => {
    try {
        const token = `Bearer ${document.cookie.split('=')[1]}`
        const payload = {
            displayname: user.value.displayname,
            role: user.value.role
        }

        await axios.put(`http://localhost:3000/api/users/${userId}`, payload, {
            headers: { authorization: token }
        })

        message.value = {
            type: 'success',
            text: 'Utente aggiornato con successo!'
        }
        fetchUser()
        router.push('/dashboard/users');
    } catch (err) {
        console.error('Errore nell\'aggiornamento dell\'utente:', err)
        message.value = {
            type: 'error',
            text: 'Errore durante il salvataggio dell\'utente'
        }
    }
}

const confirmDelete = () => {
    if (confirm('Sei sicuro di voler eliminare questo utente? L\'azione è irreversibile.')) {
        deleteUser()
    }
}

const deleteUser = async () => {
    try {
        const token = `Bearer ${document.cookie.split('=')[1]}`
        await axios.delete(`http://localhost:3000/api/users/${userId}`, {
            headers: { authorization: token }
        })

        router.push('/dashboard/users')
    } catch (err) {
        console.error('Errore nell\'eliminazione dell\'utente:', err)
        message.value = {
            type: 'error',
            text: 'Errore durante l\'eliminazione dell\'utente'
        }
    }
}

onMounted(() => {
    fetchUser()
})
</script>
