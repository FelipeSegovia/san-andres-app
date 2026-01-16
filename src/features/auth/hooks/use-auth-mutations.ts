import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/shared/types'
import type { LoginRequest, RegisterRequest } from '@/shared/types/api.types'
import { authService, authKeys } from '../services/auth.service'

/**
 * Hook para manejar el login
 * Sigue el principio DRY - reutilizable y con manejo de errores centralizado
 */
export const useLogin = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: async () => {
      // Actualizar la caché directamente con el resultado de validación exitoso
      // Esto evita tener que esperar una petición adicional
      queryClient.setQueryData(authKeys.user(), {
        validateToken: true,
      })
      // Invalidar la query para que se sincronice con el servidor en segundo plano
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      // Redirigir al dashboard o página principal
      navigate(PATHS.DASHBOARD_PARENT, { replace: true })
    },
    onError: (error) => {
      console.error('Error en login:', error)
    },
  })
}

/**
 * Hook para manejar el registro
 * Reutiliza la misma estructura que useLogin (DRY)
 */
export const useRegister = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (userData: RegisterRequest) => authService.register(userData),
    onSuccess: async () => {
      // Actualizar la caché directamente con el resultado de validación exitoso
      // Esto evita tener que esperar una petición adicional
      queryClient.setQueryData(authKeys.user(), {
        validateToken: true,
      })
      // Invalidar la query para que se sincronice con el servidor en segundo plano
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
      // Redirigir al dashboard o página principal
      navigate(PATHS.DASHBOARD_PARENT, { replace: true })
    },
    onError: (error) => {
      console.error('Error en registro:', error)
    },
  })
}

/**
 * Hook para manejar el logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      // Importar el store dinámicamente para evitar problemas de importación circular
      const { useAuthStore } = await import('@/stores/auth.store')
      await authService.logout()
      // Limpiar el store de Zustand
      useAuthStore.getState().clearAuth()
    },
    onSuccess: () => {
      // Limpiar toda la caché
      queryClient.clear()
      // Redirigir al login
      navigate(PATHS.AUTH, { replace: true })
    },
    onError: (error) => {
      console.error('Error al cerrar sesión:', error)
      // Aún así, limpiar caché y redirigir
      queryClient.clear()
      navigate(PATHS.AUTH, { replace: true })
    },
  })
}
