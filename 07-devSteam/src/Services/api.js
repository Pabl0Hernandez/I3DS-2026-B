import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptador para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Endpoints de Usuário/Perfil
export const userAPI = {
  // Obter dados do usuário
  getProfile: async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Atualizar dados do usuário
  updateProfile: async (userId, userData) => {
    try {
      const response = await api.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Buscar usuário por email
  getUserByEmail: async (email) => {
    try {
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
