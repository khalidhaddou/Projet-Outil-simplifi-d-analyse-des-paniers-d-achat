<template>
    <div>
        <ul class="dark:bg-gray-800">
            <li v-for="(product, index) in topSellingProducts" :key="product._id"
                :style="{ '--accent-color': colors[index % colors.length] }">
                <div class="name dark:text-white">{{ index + 1 }} - {{ product . ProductName }}</div>
                <div class=" prix flex items-center gap-1">
                    <!-- Icône -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 dark:text-white text-gray-600">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    <!-- Texte "Prix : " -->
                    <div class="value font-semibold dark:text-white text-gray-800">Prix :</div>

                    <!-- Valeur dynamique -->
                    <div class="font-medium dark:text-white text-gray-700">{{ product . Price }}</div>
                </div>

                <div class=" qte_mt flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <div class="value font-semibold dark:text-white text-gray-800">Quantité vendue :</div>
                    <div class="font-medium dark:text-white text-gray-70">{{ product . totalQuantity }}</div>
                </div>

                <div class=" qte_mt flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>
                    <div class="value dark:text-white text-gray-800">Total des ventes : </div>
                    <div class=" dark:text-white text-gray-70">{{ product . totalSales }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        ref,
        onMounted
    } from 'vue';
    import {
        getTrendingProducts
    } from "@/api/analytics"; // Assurez-vous que cette fonction existe dans votre API
    import {
        useDark
    } from '@vueuse/core'
    // Gérer l'état du mode sombre
    const isDark = useDark()
    export default defineComponent({
        name: 'TopSellingProducts',
        setup() {
            const topSellingProducts = ref < any[] > ([]);
            const isLoading = ref < boolean > (true); // Indicateur de chargement

            // Tableau de couleurs d'accentuation
            const colors = ['#FBCA3E', '#E24A68', '#1B5F8C', '#4CADAD'];

            // Fonction pour récupérer les produits les plus vendus
            const fetchTopSellingProducts = async () => {
                try {
                    const products =
                await getTrendingProducts(); // Appel à l'API pour récupérer les produits
                    topSellingProducts.value = products;
                } catch (error) {
                    console.error("Erreur lors de la récupération des produits les plus vendus :",
                        error);
                } finally {
                    isLoading.value = false; // Le chargement est terminé
                }
            };

            // Appel initial pour récupérer les produits au montage du composant
            onMounted(() => {
                fetchTopSellingProducts();
            });

            return {
                topSellingProducts,
                isLoading,
                colors,
            };
        },
    });
</script>

<style scoped>
    /* Style du loader */
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

    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap");


    ul {
        --col-gap: 2rem;
        --row-gap: 2rem;
        --line-w: 0.25rem;
        display: grid;
        grid-template-columns: var(--line-w) 1fr;
        grid-auto-columns: max-content;
        column-gap: var(--col-gap);
        list-style: none;
        width: min(60rem, 100%);
        margin-inline: auto;
    }

    /* line */
    ul::before {
        content: "";
        grid-column: 1;
        grid-row: 1 / span 20;
        background: rgb(225, 225, 225);
        border-radius: calc(var(--line-w) / 2);
    }

    ul li:not(:last-child) {
        margin-bottom: var(--row-gap);
    }

    /* card */
    ul li {
        grid-column: 2;
        --inlineP: 0.5rem;
        margin-inline: var(--inlineP);
        grid-row: span 2;
        display: grid;
        grid-template-rows: min-content min-content min-content;
    }

    /* name */
    ul li .name {
        --nameH: 3rem;
        height: var(--nameH);
        margin-inline: calc(var(--inlineP) * -1);

        text-align: center;
        background-color: var(--accent-color);

        color: white;
        font-size: 1.25rem;
        font-weight: 500;

        display: grid;
        place-content: center;
        position: relative;

        border-radius: calc(var(--nameH) / 2) 0 0 calc(var(--nameH) / 2);
    }

    /* name flap */
    ul li .name::before {
        content: "";
        width: var(--inlineP);
        aspect-ratio: 1;
        background: var(--accent-color);
        background-image: linear-gradient(rgba(0, 0, 0, 0.2) 100%, transparent);
        position: absolute;
        top: 100%;

        clip-path: polygon(0 0, 100% 0, 0 100%);
        right: 0;
    }

    /* circle */
    ul li .name::after {
        content: "";
        position: absolute;
        width: 1.5rem;
        aspect-ratio: 1;
        background: var(--bgColor);
        border: 0.3rem solid var(--accent-color);
        border-radius: 50%;
        top: 50%;

        transform: translate(50%, -50%);
        right: calc(100% + var(--col-gap) + var(--line-w) / 2);
    }


    ul li .prix {
        overflow: hidden;
        padding-block-start: 0.5rem;

        font-weight: 300;
    }

    ul li .value {
        overflow: hidden;
        padding-block-start: 1.2rem;
        padding-block-end: 1rem;
        font-weight: 500;
        font-size: 15px;
    }

    /* shadows */
    ul li .prix::before,
    ul li .qte_mt::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 0.5rem;
    }

    ul li .prix::before {
        bottom: calc(100% + 0.125rem);
    }

    ul li .qte_mt::before {
        z-index: -1;
        bottom: 0.25rem;
    }

    @media (min-width: 40rem) {
        ul {
            grid-template-columns: 1fr var(--line-w) 1fr;
        }

        ul::before {
            grid-column: 2;
        }

        ul li:nth-child(odd) {
            grid-column: 1;
        }

        ul li:nth-child(even) {
            grid-column: 3;
        }

        /* start second card */
        ul li:nth-child(2) {
            grid-row: 2/4;
        }

        ul li:nth-child(odd) .name::before {
            clip-path: polygon(0 0, 100% 0, 100% 100%);
            left: 0;
        }

        ul li:nth-child(odd) .name::after {
            transform: translate(-50%, -50%);
            left: calc(100% + var(--col-gap) + var(--line-w) / 2);
        }

        ul li:nth-child(odd) .name {
            border-radius: 0 calc(var(--nameH) / 2) calc(var(--nameH) / 2) 0;
        }
    }

    .credits {
        margin-top: 1rem;
        text-align: right;
    }

    .credits a {
        color: var(--color);
    }
</style>
