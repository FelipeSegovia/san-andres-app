import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authService, authKeys } from '../services/auth.service'
import { useAuthStore } from '@/stores/auth.store'

/**
 * Hook para validar el token y obtener la información del usuario
 * Una vez validado el token, obtiene la información del usuario desde el endpoint GET /users/
 * y la almacena en el store de Zustand junto con el token
 */
export const useValidateToken = () => {
  const setAuthData = useAuthStore((state) => state.setAuthData)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  // Query para validar el token
  const validateQuery = useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getValidateToken(),
    enabled: !!localStorage.getItem('auth_token'),
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
  })

  // Query para obtener información del usuario (se ejecuta después de validar)
  const userQuery = useQuery({
    queryKey: [...authKeys.user(), 'info'],
    queryFn: async () => {
      const email = localStorage.getItem('user_email')
      if (!email) {
        throw new Error('Email del usuario no disponible')
      }
      return authService.getUser({ email })
    },
    enabled: validateQuery.isSuccess && !!validateQuery.data?.validateToken,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })

  // Efecto para almacenar el token y la información del usuario en Zustand
  useEffect(() => {
    const token = localStorage.getItem('auth_token')

    if (
      validateQuery.isSuccess &&
      userQuery.isSuccess &&
      token &&
      userQuery.data
    ) {
      // Almacenar el token y el usuario en el store
      setAuthData(token, userQuery.data)
    } else if (validateQuery.isError || userQuery.isError) {
      // Si hay error, limpiar la autenticación
      clearAuth()
    }
  }, [
    validateQuery.isSuccess,
    userQuery.isSuccess,
    userQuery.data,
    validateQuery.isError,
    userQuery.isError,
    setAuthData,
    clearAuth,
  ])

  return {
    isLoading: validateQuery.isLoading || userQuery.isLoading,
    data: validateQuery.data,
    user: userQuery.data,
    error: validateQuery.error || userQuery.error,
    isSuccess: validateQuery.isSuccess && userQuery.isSuccess,
  }
}
