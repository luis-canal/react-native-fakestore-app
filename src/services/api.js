import { create } from 'axios';

const api = create({
  baseURL: 'https://fakestoreapi.com',
});

export async function getUsers() {
  const response = await api.get('/users');
  return response.data;
}

export async function login(credentials) {
  const response = await api.post('/auth/login', credentials);
  return response.data;
}

export async function getProducts() {
  const response = await api.get('/products');
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await api.get(
    `/products/category/${encodeURIComponent(category)}`
  );

  return response.data;
}

export class ProductNotFoundError extends Error {
  constructor(productId) {
    super(`Produto ${productId} não encontrado.`);
    this.name = 'ProductNotFoundError';
  }
}

export async function getProductById(productId, { signal } = {}) {
  const id = Number(productId);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ProductNotFoundError(productId);
  }

  const response = await api.get(`/products/${id}`, {
    signal,
    timeout: 10000,
  });

  // A Fake Store responde 200 com corpo vazio quando o ID não existe.
  if (!response.data || !response.data.id) {
    throw new ProductNotFoundError(id);
  }

  return response.data;
}

export async function getProductCategories() {
  const response = await api.get('/products/categories');
  return response.data;
}
