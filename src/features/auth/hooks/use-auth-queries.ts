import { useQuery } from "@tanstack/react-query";
import { authService, authKeys } from "../services/auth.service";

/**
 * Hook para validar el token
 */
export const useValidateToken = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getValidateToken(),
    enabled: !!localStorage.getItem("auth_token"), // Solo ejecutar si hay token
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
  });
};
