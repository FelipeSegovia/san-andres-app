import { QueryClient } from '@tanstack/react-query'

// Configuración del QueryClient con valores por defecto
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo que los datos se consideran "frescos" (staleTime)
      staleTime: 1000 * 60 * 5, // 5 minutos
      // Tiempo que los datos se mantienen en caché (gcTime, antes cacheTime)
      gcTime: 1000 * 60 * 10, // 10 minutos
      // Reintentar automáticamente en caso de error
      retry: 1,
      // No refetch automático cuando la ventana recupera el foco
      refetchOnWindowFocus: false,
      // No refetch automático al reconectar
      refetchOnReconnect: true,
    },
    mutations: {
      // Reintentar automáticamente en caso de error
      retry: 1,
    },
  },
})
