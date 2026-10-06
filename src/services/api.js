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
