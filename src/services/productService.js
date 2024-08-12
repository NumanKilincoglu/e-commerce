import { apiInstance } from "../utils/ApiUtil";

const getAll = async () => {
    try {
        const response = await apiInstance.get("/products");
        return response?.data?.products ?? [];

    } catch (error) {
        console.error('Error fetching products:', error);
        return [];

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
const ProductService = {
    getAll,
    findProduct
}

export default ProductService;