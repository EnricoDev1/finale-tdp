<template>
    <Navbar />
    <div class="min-h-screen bg-gray-900">
        <!-- Main Content -->
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-3xl font-bold text-white mb-8">Dati Inflazione per Paese</h1>

                <!-- Form di ricerca -->
                <div class="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                    <form @submit.prevent="fetchInflationData" class="flex flex-col md:flex-row gap-4">
                        <div class="flex-grow">
                            <label for="country" class="block text-gray-300 mb-2">Seleziona un paese</label>
                            <select id="country" v-model="selectedCountry"
                                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required>
                                <option value="" disabled>-- Seleziona --</option>
                                <option v-for="country in countries" :key="country.code" :value="country.code">
                                    {{ country.name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex items-end">
                            <button type="submit"
                                class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors h-[42px]"
                                :disabled="loading">
                                <span v-if="!loading">Cerca</span>
                                <font-awesome-icon v-else :icon="['fas', 'spinner']" spin />
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Messaggi di stato -->
                <div v-if="message"
                    :class="['p-4 rounded-lg mb-6', message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100']">
                    {{ message.text }}
                </div>

                <!-- Grafico -->
                <div v-if="chartData" class="bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-white mb-4">
                        Inflazione in {{ getCountryName(selectedCountry) }} (2000-2022)
                    </h2>
                    <div class="relative h-80">
                        <canvas id="inflationChart"></canvas>
                    </div>
                    <p class="text-gray-400 text-sm mt-4">
                        Fonte: World Bank API - Tasso di inflazione annuale (%)
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import Chart from 'chart.js/auto';
import Navbar from './utils/Navbar.vue';

// Lista paesi con relativi codici ISO
const countries = ref([
    { code: 'IT', name: 'Italia' },
    { code: 'FR', name: 'Francia' },
    { code: 'DE', name: 'Germania' },
    { code: 'US', name: 'Stati Uniti' },
    { code: 'GB', name: 'Regno Unito' },
    { code: 'JP', name: 'Giappone' },
    { code: 'BR', name: 'Brasile' },
    { code: 'TR', name: 'Turchia' },
    { code: 'CN', name: 'Cina' },
    { code: 'IN', name: 'India' }
])

const selectedCountry = ref('')
const chartData = ref(null)
const countryInfo = ref(null)
const loading = ref(false)
const message = ref(null)
let chartInstance = null

const getCountryName = (code) => {
    const country = countries.value.find(c => c.code === code)
    return country ? country.name : ''
}

const formatNumber = (num) => {
    return new Intl.NumberFormat('it-IT').format(num)
}

const fetchInflationData = async () => {
    if (!selectedCountry.value) return

    try {
        loading.value = true
        message.value = null

        // 2. Poi otteniamo i dati sull'inflazione
        const inflationUrl = `https://api.worldbank.org/v2/country/${selectedCountry.value}/indicator/FP.CPI.TOTL.ZG?format=json&date=2000:2022`
        const response = await fetch(inflationUrl)
        const data = await response.json()

        if (data[1]) {
            const records = data[1].filter(item => item.value !== null)
            if (records.length === 0) {
                throw new Error('Nessun dato disponibile per questo paese')
            }

            chartData.value = {
                labels: records.map(r => r.date).reverse(),
                values: records.map(r => r.value).reverse()
            }
            await nextTick()
            renderChart()
        } else {
            throw new Error('Dati non disponibili')
        }
    } catch (error) {
        console.error('Errore:', error)
        message.value = {
            type: 'error',
            text: error.message || 'Errore nel caricamento dei dati'
        }
        chartData.value = null
    } finally {
        loading.value = false
    }
}

const renderChart = () => {
    if (chartInstance) {
        chartInstance.destroy()
    }

    const ctx = document.getElementById('inflationChart');

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.value.labels,
            datasets: [{
                label: 'Inflazione (%)',
                data: chartData.value.values,
                fill: false,
                borderColor: '#ff9800',
                backgroundColor: '#ff9800',
                tension: 0.3,
                pointRadius: 3,
                pointBackgroundColor: '#ff9800'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f0f0f0',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#333',
                    titleColor: '#ff9800',
                    bodyColor: '#fff',
                    padding: 12,
                    bodyFont: {
                        size: 14
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#f0f0f0'
                    },
                    title: {
                        display: true,
                        text: '% Annuale',
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: '#333'
                    }
                },
                x: {
                    ticks: {
                        color: '#f0f0f0'
                    },
                    title: {
                        display: true,
                        text: 'Anno',
                        color: '#f0f0f0'
                    },
                    grid: {
                        color: '#333'
                    }
                }
            }
        }
    })
}

// Distruggi il grafico quando il componente viene smontato
onMounted(() => {
    return () => {
        if (chartInstance) {
            chartInstance.destroy()
        }
    }
})
</script>
