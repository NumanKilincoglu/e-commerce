import { defineStore } from 'pinia';
import ProductService from '../services/productService.js';

export const useProductStore = defineStore('product', {
    state: () => ({
        loading: true,
        items: [],
        productCount: 0,
        product: null,
        productLoading: true,
        categories: [],
        filters: {
            limit: 24,
            skip: 0,
            page: 1,
            searchQuery: '',
            sortBy: 'price',
            order: 'asc',
            category: '',
            priceFrom: null,
            priceTo: null,
        },
        isPriceOpen: false,
        isCategoryOpen: false,
        selectedSorting: {
            name: 'Price Ascending',
            sortBy: 'price',
            order: 'asc',
        },
        priceFilters: [
            { name: 'Under $5', min: 0, max: 5, isChecked: false },
            { name: '$5 to $10', min: 5, max: 10, isChecked: false },
            { name: '$10 to $20', min: 10, max: 20, isChecked: false },
            { name: '$20 to $50', min: 20, max: 50, isChecked: false },
            { name: '$50 to $100', min: 50, max: 100, isChecked: false },
            { name: '$100 to $200', min: 100, max: 200, isChecked: false },
            { name: '$200 to $500', min: 200, max: 500, isChecked: false },
            { name: 'Over $500', min: 500, max: 1000000, isChecked: false },
        ],
        dropdownOptions: [
            { name: 'Price Ascending', sortBy: 'price', order: 'asc' },
            { name: 'Price Descending', sortBy: 'price', order: 'desc' },
            { name: 'Rating Ascending', sortBy: 'rating', order: 'asc' },
            { name: 'Rating Descending', sortBy: 'rating', order: 'desc' },
            { name: 'Stock Descending', sortBy: 'stock', order: 'desc' },
            { name: 'Stock Ascending', sortBy: 'stock', order: 'asc' },
        ],
        pageNumbers: [1, 2, 3, 4, 5, 6],
    }),
    actions: {
        async getCategories() {
            const response = await ProductService.getCategories();

            if (response && response.length > 0) {
                this.categories = response.map((e) => ({
                    slug: e.slug,
                    name: e.name,
                    url: e.url,
                    isChecked: false,
                }));
            } else {
                this.categories = [];
            }
        },

        async getItems() {
            this.loading = true;
            const queryString = this.buildQueryString();

            const productResponse = await ProductService.getAll(queryString);
            if (productResponse) {
                this.items = productResponse.items;
                this.productCount = productResponse.total;
            } else {
                this.items = [];
                this.productCount = 0;
            }
            this.loading = false;
        },

        async getProductDetail(id) {
            try {
                this.productLoading = true
                const data = await ProductService.findOneProduct({ id: id });
                if (!data) {
                    this.product = null;
                    this.productLoading = false;
                    return
                }

                this.product = data;
                this.productLoading = false;

            } catch (err) {
                console.error(err);
                this.productLoading = false;
            }
        },

        async findProductByName(searchTerm) {
            if (!searchTerm || searchTerm == "")
                return this.filters.searchQuery = '';

            this.filters.searchQuery = searchTerm
            await this.getItems();
        },

        async selectCategory() {
            await this.getItems();
        },

        buildQueryString() {
            let queryString = '';

            if (this.filters.searchQuery) {
                queryString = `/search?q=${this.filters.searchQuery}&limit=${this.filters.limit}&skip=${this.skip}&sortBy=${this.filters.sortBy}&order=${this.filters.order}`;
            }

            if (this.filters.category) {
                queryString = `/category/${this.filters.category}?limit=${this.filters.limit}&skip=${this.skip}&sortBy=${this.filters.sortBy}&order=${this.filters.order}`;
            }

            if (queryString == '') {
                queryString = `?limit=${this.filters.limit}&skip=${this.skip}&sortBy=${this.filters.sortBy}&order=${this.filters.order}`
            }

            return queryString;
        },

        async filterByPrice() {
            if (this.filters.priceFrom == null || this.filters.priceTo == null) {
                return await this.getItems();
            } else {
                const oldItems = this.items;
                const findItems = this.items.filter(e => e.price > this.filters.priceFrom && e.price < this.filters.priceTo);
                this.items = findItems;
            }
        }
    },
    getters: {
        skip() {
            return (this.filters.page - 1) * this.filters.limit;
        },
    },
});
