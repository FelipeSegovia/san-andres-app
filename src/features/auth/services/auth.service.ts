import apiClient from '@/shared/lib/api'
import type {
  AuthResponse,
  AuthValidateTokenResponse,
  LoginRequest,
  RegisterRequest,
  EmailUserRequest,
  GetUserResponse,
} from '@/shared/types/api.types'

// Clave para las queries de autenticación (usado para invalidar caché)
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
}

/**
 * Servicio de autenticación
 * Contiene todas las funciones relacionadas con autenticación
 */
export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials,
    )

    // Guardar token y email en localStorage
    if (data?.accessToken) {
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('user_email', credentials.email)
    }
    return data
  },

  /**
   * Registrar nuevo usuario
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>(
      '/auth/register',
      userData,
    )
    // Guardar token y email en localStorage
    if (data.accessToken) {
      localStorage.setItem('auth_token', data.accessToken)
      localStorage.setItem('user_email', userData.email)
    }
    return data
  },

  /**
   * Validar token
   */
  async getValidateToken(): Promise<AuthValidateTokenResponse> {
    const { data } =
      await apiClient.get<AuthValidateTokenResponse>('/auth/validate')
    return data
  },

  /**
   * Obtener información del usuario por email
   * Según la documentación, el endpoint GET /users/ recibe el email en el body
   * Sin embargo, para peticiones GET usamos params en lugar de data
   */
  async getUser(request: EmailUserRequest): Promise<GetUserResponse> {
    const { data } = await apiClient.get<GetUserResponse>('/users', {
      params: request,
    })
    return data
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      // Siempre eliminar el token y email local
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_email')
    }
  },
}
