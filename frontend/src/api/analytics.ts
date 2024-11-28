import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Remplacez par l'URL de votre backend

export const getTotalSales = async (period: string) => {
    const response = await axios.get(`${API_BASE_URL}/analytics/total_sales`, {
        params: { period },
    });
    return response.data;
};

export const getTrendingProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/analytics/trending_products`);
    return response.data;
};

export const getCategorySales = async () => {
    const response = await axios.get(`${API_BASE_URL}/analytics/category_sales`);
    return response.data;
};

export const getProducts = async () => {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
};
