import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

export default {
    getProducts: () => api.get('/products'),
    createProduct: (product) => api.post('/products', product),
    updateProduct: (id, product) => api.put(`/products/${id}`, product),
    deleteProduct: (id) => api.delete(`/products/${id}`),
};
