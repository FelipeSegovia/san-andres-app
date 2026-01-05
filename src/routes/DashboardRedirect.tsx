import { Navigate } from "react-router-dom";
import { PATHS } from "@/shared/types";

/**
 * Componente que redirige desde /dashboard a la ruta correcta según el rol del usuario
 * Por ahora redirige a /dashboard/parent como default
 *
 * TODO: Cuando tengas información del rol del usuario disponible (por ejemplo desde el endpoint de validación),
 * puedes actualizar este componente para redirigir según el rol:
 * - 'parent' -> PATHS.DASHBOARD_PARENT
 * - 'admin' -> PATHS.DASHBOARD_ADMIN
 * - 'promoter' -> PATHS.DASHBOARD_PROMOTER
 */
export const DashboardRedirect = () => {
  // Por ahora, redirigir a parent como default
  // En el futuro, puedes obtener el rol del usuario desde:
  // - El endpoint de validación (si devuelve información del usuario)
  // - Un store de Zustand
  // - Context de React
  // - localStorage (si guardas el rol allí)

  // Ejemplo de cómo podría verse en el futuro:
  // const userRole = useUserRole(); // hook personalizado
  // const defaultPath = userRole === 'admin' ? PATHS.DASHBOARD_ADMIN
  //   : userRole === 'promoter' ? PATHS.DASHBOARD_PROMOTER
  //   : PATHS.DASHBOARD_PARENT;

  return <Navigate to={PATHS.DASHBOARD_PARENT} replace />;
};
