import { AxiosError } from 'axios'
import type { ApiError } from '@/shared/types/api.types'

/**
 * Hook reutilizable para extraer mensajes de error de manera consistente
 * Sigue el principio DRY - evita duplicar lógica de manejo de errores
 */
export const useErrorMessage = (error: unknown): string | null => {
  if (!error) return null

  // Si es un error de Axios con respuesta del servidor
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined
    if (apiError?.message) {
      return apiError.message
    }
    // Si hay errores de validación, mostrar el primero
    if (apiError?.errors) {
      const firstError = Object.values(apiError.errors)[0]
      if (firstError && firstError.length > 0) {
        return firstError[0]
      }
    }
    // Mensaje genérico de error de red
    if (error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado. Por favor, intenta nuevamente.'
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Error de conexión. Verifica tu conexión a internet.'
    }
    return error.message || 'Ocurrió un error inesperado.'
  }

  // Si es un Error estándar
  if (error instanceof Error) {
    return error.message
  }

  // Si es un string
  if (typeof error === 'string') {
    return error
  }

  // Mensaje por defecto
  return 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'
}
