import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Interface para la información del usuario
 */
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
  roleId: string | null
  role?: {
    id: string
    name: string
    description: string
  }
  createdAt: string
  updatedAt: string
}

/**
 * Interface para el store de autenticación
 */
interface AuthStore {
  // Estado
  token: string | null
  user: User | null

  // Acciones
  setToken: (token: string) => void
  setUser: (user: User) => void
  setAuthData: (token: string, user: User) => void
  clearAuth: () => void
}

/**
 * Store de Zustand para la autenticación
 * Utiliza persist para mantener el estado en localStorage
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Estado inicial
      token: null,
      user: null,

      // Acciones
      setToken: (token) => set({ token }),

      setUser: (user) => set({ user }),

      setAuthData: (token, user) => set({ token, user }),

      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // nombre de la key en localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // solo persistir token y user
    },
  ),
)
