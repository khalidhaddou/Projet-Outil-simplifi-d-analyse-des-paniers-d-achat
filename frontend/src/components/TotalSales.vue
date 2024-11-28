<script lang="ts">
    import {
        defineComponent,
        ref,
        onMounted
    } from "vue";
    import {
        getTotalSales
    } from "@/api/analytics"; // Assurez-vous que cette fonction existe dans votre API
    import {
        useDark
    } from '@vueuse/core'
    // Gérer l'état du mode sombre
    const isDark = useDark()
    export default defineComponent({
        name: "TotalSales",
        setup() {
            const totalSales = ref(0);
            const selectedPeriod = ref("7d"); // Valeur par défaut (7 derniers jours)
            const isLoading = ref(false); // Indicateur de chargement

            // Fonction pour récupérer les ventes totales selon la période sélectionnée
            const fetchSalesData = async () => {
                try {
                    isLoading.value = true; // Démarre le chargement
                    const period = selectedPeriod
                    .value; // Valeur envoyée (par exemple '7d', '30d', '12m')
                    totalSales.value = await getTotalSales(
                    period); // Assurez-vous que la fonction passe la période correctement
                } catch (error) {
                    console.error("Erreur lors de la récupération des ventes totales :", error);
                } finally {
                    isLoading.value = false; // Arrête le chargement une fois les données récupérées
                }
            };

            // Appel initial pour les ventes des 7 derniers jours
            onMounted(() => {
                fetchSalesData();
            });

            return {
                totalSales,
                selectedPeriod,
                fetchSalesData,
                isLoading, // Expose isLoading pour l'utiliser dans le template
            };
        },
    });
</script>

<template>
    <div class="flex flex-col items-center w-full  p-4 space-y-6">
        <!-- Menu déroulant pour sélectionner une période -->
        <div class="w-full max-w-lg flex items-center space-x-6">
            <!-- Label -->
            <label for="time-period" class="text-gray-800 dark:text-white font-medium whitespace-nowrap">
                Sélectionnez une période :
            </label>

            <!-- Select -->
            <select v-model="selectedPeriod" @change="fetchSalesData" id="time-period"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 text-gray-900  bg-white dark:bg-gray-800  dark:text-white">
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="12m">12 derniers mois</option>
            </select>
        </div>


        <!-- Section Ventes totales -->
        <div class=" w-full max-w-lg  transform ">
            <!-- Loader affiché pendant le chargement -->
            <div v-if="isLoading" class="flex justify-center items-center h-16">
                <div class="w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
            </div>

            <!-- Afficher les ventes totales -->
            <p v-else class="text-md font-medium subpixel-antialiased text-gray-900 dark:text-white">
                le montant total des ventes réalisées pour cette période est :
                <span v-if="totalSales.totalSales !== undefined" class="text-white text-2xl bg-[#4CADAD] px-2 rounded">
                    {{ totalSales . totalSales . toLocaleString() }} €
                </span>
            </p>
        </div>
    </div>
</template>


<style scoped>
    /* Style pour le select menu avec effet interactif */
    .select-period {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        border-radius: 8px;
        border: 1px solid #ddd;
        background-color: #fff;
        transition: all 0.3s ease;
        cursor: pointer;
    }

    /* Effet au survol et au focus du menu déroulant */
    .select-period:hover,
    .select-period:focus {
        border-color: #00bfae;
        outline: none;
        box-shadow: 0 0 10px rgba(0, 191, 174, 0.3);
        background-color: #f0fdf4;
        /* Changement de fond au survol */
    }

    /* Section des ventes avec ombre douce et effet interactif */
    .sales-box {
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        margin-bottom: 2rem;
        transition: transform 0.3s ease;
    }

    /* Effet interactif : agrandir légèrement au survol */
    .sales-box:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

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

    /* Propriétés typographiques pour l'affichage des chiffres */
    .proportional-nums {
        font-variant-numeric: proportional-nums;
        font-weight: 600;
        color: #00bfae;
        transition: color 0.3s ease;
    }

    /* Effet au survol sur le texte des ventes */
    .proportional-nums:hover {
        color: #3498db;
        cursor: pointer;
    }
</style>
