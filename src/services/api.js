import { create } from 'axios';

const api = create({
  baseURL: 'https://dummyjson.com',
});

export async function getUsers() {
  const response = await api.get('/users');
  return response.data.users;
}

export async function login(credentials) {
  const response = await api.post('/auth/login', credentials);
  return response.data;
}

export async function getProducts() {
  const response = await api.get('/products?limit=0');
  return response.data.products;
}

export async function getProductsByCategory(category) {
  const response = await api.get(
    `/products/category/${category}?limit=0`
  );

  return response.data.products;
}

export async function getProductById(productId) {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export async function getProductCategories() {
  const response = await api.get('/products/categories');
  return response.data;
}