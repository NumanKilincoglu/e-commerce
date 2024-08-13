import { apiInstance } from "../utils/ApiUtil";

const getAll = async (queryString) => {
    try {

        const response = await apiInstance.get(`/products${queryString}`);
        const data = response?.data;

        if (!data) return null;

        return {
            items: data.products || [],
            total: data.total || 0
        };

    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

const findProduct = async (req) => {
    try {
        const response = await apiInstance.get(`/products/search?q=${req.searchQuery}`);
        return response?.data?.products ?? [];

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const findOneProduct = async (req) => {
    try {
        const response = await apiInstance.get(`/products/${req.id}`);
        return response?.data ?? null;

    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
};

const getCategories = async () => {
    try {
        const response = await apiInstance.get(`products/categories`);
        return response?.data ?? [];

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const ProductService = {
    getAll,
    findProduct,
    getCategories,
    findOneProduct
}

export default ProductService;