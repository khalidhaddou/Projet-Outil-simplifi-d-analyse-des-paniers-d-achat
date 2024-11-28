<script lang="ts">
    import {
        defineComponent,
        ref,
        onMounted,
        computed
    } from "vue";
    import {
        getProducts
    } from "@/api/analytics"; // Assurez-vous que cette fonction existe dans votre API
    import {
        Bar
    } from "vue-chartjs";
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        BarElement,
        CategoryScale,
        LinearScale
    } from "chart.js";
    import {
        useDark
    } from '@vueuse/core'
    // Gérer l'état du mode sombre
    const isDark = useDark()
    // Enregistrement des composants de Chart.js
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

    export default defineComponent({
        name: "SalesChart",
        components: {
            Bar,
        },
        setup() {
            const products = ref([]); // Liste des produits
            const loading = ref(true); // Indicateur de chargement

            // Fonction pour récupérer les données des produits
            const fetchProductSales = async () => {
                try {
                    const response =
                await getProducts(); // Assurez-vous que cette fonction existe et est correcte
                    console.log("Données des produits reçues :", response);

                    // Vérifiez que la réponse contient une clé "data" avec un tableau
                    products.value = Array.isArray(response) ? response : [];
                    console.log("Liste des produits :", products.value);

                    // Afficher les ventes pour chaque produit
                    products.value.forEach((item) => {
                        console.log("Produit:", item.ProductName, "Ventes totales:", item
                            .totalSales);
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits", error);
                } finally {
                    loading.value = false;
                }
            };

            // Appel initial pour récupérer les données des produits
            onMounted(() => {
                fetchProductSales();
            });

            // Données du graphique en barres
            const barChartData = computed(() => {
                if (!Array.isArray(products.value)) return {
                    labels: [],
                    datasets: []
                };

                const labels = products.value.map((item) => item.ProductName); // Noms des produits
                const data = products.value.map((item) => item.totalSales); // Ventes totales

                return {
                    labels: labels,
                    datasets: [{
                            label: "Total des ventes par ce produit est ",
                            data: data,
                            backgroundColor: "#4BC0C0", // Couleur des barres
                        },

                    ],
                };
            });

            // Options du graphique
            const chartOptions = computed(() => ({
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true, // Assurez-vous que l'axe Y commence à zéro
                    },
                },
                plugins: {
                    datalabels: {
                        display: false, // Désactive les labels de données
                    },
                },
            }));

            return {
                products,
                loading,
                barChartData,
                chartOptions,
            };
        },
    });
</script>

<template>
    <div class="flex flex-col items-center dark:bg-gray-800  min-h-screen  p-8">
        <!-- Section Ventes par Produit -->
        <div class="bg-whit  dark:bg-gray-800  p-6 w-full mb-8">

            <!-- Affichage du chargement -->
            <div v-if="loading" class="loader-wrapper">
                <div class="loader"></div>
            </div>

            <!-- Graphique en barres -->
            <div v-if="!loading" class="mb-8 dark:text-white">
                <Bar class="  dark:text-white" :data="barChartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* Loader en CSS personnalisé */
    .loader-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
    }

    .loader {
        border: 5px solid #f3f3f3;
        /* Gris clair */
        border-top: 5px solid #3498db;
        /* Couleur de la barre de chargement */
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }

    /* Animation du loader (rotation) */
    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>
