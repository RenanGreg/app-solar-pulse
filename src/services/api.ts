import axios from 'axios';

// ⚠️ CONFIGURAÇÃO DA API
// Para desenvolvimento local: use http://localhost:3001/api
// Para produção no Render: use https://sua-api.onrender.com/api
const API_URL = __DEV__ 
  ? 'http://localhost:3001/api'  // Desenvolvimento
  : 'https://sua-api.onrender.com/api';  // Produção (ajuste após deploy)

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 segundos (para cold start do Render)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para log de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========== TIPOS ==========

export interface UserData {
  name: string;
  email: string;
  phone: string;
  metadata?: Record<string, any>;
}

export interface BudgetData {
  name: string;
  email: string;
  phone: string;
  address?: string;
  powerBill?: string;
  roofType?: string;
  comments?: string;
}

export interface ContactData {
  name: string;
  email: string;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// ========== FUNÇÕES DA API ==========

/**
 * Cadastra usuário e envia email de boas-vindas
 */
export const createUser = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/users', {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      metadata: userData.metadata || {},
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao criar usuário' };
  }
};

/**
 * Envia solicitação de orçamento
 */
export const sendBudgetRequest = async (budgetData: BudgetData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/budget', {
      name: budgetData.name,
      email: budgetData.email,
      phone: budgetData.phone,
      address: budgetData.address,
      powerBill: budgetData.powerBill,
      roofType: budgetData.roofType,
      comments: budgetData.comments,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao enviar solicitação de orçamento' };
  }
};

/**
 * Envia mensagem de contato
 */
export const sendContactMessage = async (contactData: ContactData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/contact', {
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao enviar mensagem' };
  }
};

/**
 * Lista todos os usuários (opcional - para admin)
 */
export const getUsers = async (
  page: number = 1,
  limit: number = 10,
  status: string | null = null
): Promise<ApiResponse> => {
  try {
    const params: any = { page, limit };
    if (status) params.status = status;

    const response = await api.get('/users', { params });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar usuários' };
  }
};

/**
 * Busca estatísticas (opcional - para admin)
 */
export const getStats = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao buscar estatísticas' };
  }
};

/**
 * Verifica se a API está online
 */
export const checkHealth = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/health', {
      baseURL: API_URL.replace('/api', ''), // Remove /api
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Erro ao verificar saúde da API' };
  }
};

export default api;
