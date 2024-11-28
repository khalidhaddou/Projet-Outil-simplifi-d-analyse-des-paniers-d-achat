import { Request, Response } from 'express';
import { getTrendingProductsService } from '../services/analytics.service';
import { calculateTotalSales } from '../services/analytics.service';
import { getProductsWithSalesService } from '../services/analytics.service';
import { getCategorySales } from '../services/analytics.service';

export const getTotalSales = async (req: Request, res: Response) => {
    try {
        // Récupérer la période depuis les paramètres de la requête
        const { period } = req.query;

        if (!period || typeof period !== 'string') {
            return res.status(400).json({ message: 'Period is required and must be a string.' });
        }

        // Appeler le service pour calculer les ventes totales
        const totalSales = await calculateTotalSales(period);

        res.json({ totalSales, period });
    } catch (err: any) {
        if (err.message === 'Invalid period selected. Use 7d, 30d, or 12m.') {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Error fetching total sales', error: err.message });
    }
};

export const getTrendingProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const trendingProducts = await getTrendingProductsService();
    return res.status(200).json(trendingProducts);
  } catch (error) {
    console.error('Error fetching trending products:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export const getCategorySalesAnalytics = async (req: Request, res: Response) => {
  try {
      const salesData = await getCategorySales();
      return res.status(200).json({
          message: 'Répartition des ventes par catégorie récupérée avec succès.',
          data: salesData,
      });
  } catch (error) {
      console.error('Erreur lors de la récupération des ventes par catégorie :', error);
      return res.status(500).json({
          message: 'Erreur interne du serveur.',
      });
  }
};

export const getProductsWithSales = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Appel du service pour récupérer les produits et leurs ventes
    const productsWithSales = await getProductsWithSalesService();
    return res.status(200).json(productsWithSales);
  } catch (error) {
    console.error('Error fetching products with sales:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};