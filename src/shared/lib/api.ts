import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import type { ApiResponse, ApiError } from '@/shared/types/api.types'

// Re-exportar tipos para compatibilidad
export type { ApiResponse, ApiError }

// Crear instancia de axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para requests - agregar token si existe
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Interceptor para responses - manejo de errores centralizado
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Manejo de errores HTTP
    if (error.response) {
      const { status, data } = error.response

      // Token expirado o inválido
      if (status === 401) {
        localStorage.removeItem('auth_token')
        // Opcional: redirigir al login
        // window.location.href = '/auth'
      }

      // Error del servidor
      if (status >= 500) {
        console.error(
          'Error del servidor:',
          data?.message || 'Error interno del servidor',
        )
      }
    } else if (error.request) {
      // Error de red
      console.error('Error de red: No se pudo conectar al servidor')
    } else {
      // Error en la configuración de la petición
      console.error('Error:', error.message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
