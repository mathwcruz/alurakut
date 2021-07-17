import axios from 'axios';

export const authApi = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3000/api/auth',
});

export const api = axios.create();
