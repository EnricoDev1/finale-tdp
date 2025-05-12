<template>
    <header class="bg-gray-800 border-b border-gray-700">
        <div class="container mx-auto px-4 py-3 flex items-center">
            <div class="flex items-center space-x-6">
                <router-link to="/" class="text-white flex items-center">
                    <font-awesome-icon :icon="['fas', 'newspaper']" class="h-6 w-6 text-indigo-400 mr-2" />
                    <span class="text-xl font-bold">Cavagni and Officioso's blog</span>
                </router-link>

                <nav class="hidden md:flex space-x-4">
                    <router-link to="/" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white">
                        Home
                    </router-link>
                    <router-link to="/news" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white">
                        News
                    </router-link>
                    <router-link to="/inflazione" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white">
                        Inflazione
                    </router-link>
                    <router-link v-if="isAuthenticated"  to="/newpost" class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                        active-class="text-white">
                        Nuovo Post
                    </router-link>
                </nav>
            </div>
            <button v-if="!isAuthenticated" @click="$router.push('/login')"
                class="absolute top-3 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Login
            </button>

            <button v-if="isAuthenticated" @click="$router.push('/dashboard')"
                class="absolute top-3 right-6 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">Dashboard
            </button>
        </div>
    </header>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    const isAuthenticated = ref(false);

    onMounted(() => {
        isAuthenticated.value = !!document.cookie;
    })
</script>
