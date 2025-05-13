<template>
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

            <button @click="logout"
                class="mt-auto text-sm font-medium text-red-400 hover:text-red-300 px-3 py-1 rounded-lg">
                Logout
            </button>
        </nav>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
    deleteCookie("token");
    router.push("/");
};

const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
};

</script>
