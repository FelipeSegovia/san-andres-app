import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  LoginPage,
  RegisterPage,
  TermsAndConditionsPage,
  ParentDashboardPage,
  AdminDashboardPage,
  PromoterDashboardPage,
} from '@/components/pages'
import { AuthLayout, DashboardLayout } from '@/components/templates'
import { PATHS } from '@/shared/types'
import { Suspense } from 'react'
import PrivateRoute from './PrivateRoute'
import { DashboardRedirect } from './DashboardRedirect'
import { useValidateToken } from '@/features/auth/hooks'

const AppRoutes = () => {
  const { isLoading, data } = useValidateToken()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.AUTH} element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route
          path={PATHS.DASHBOARD}
          element={
            <Suspense
              fallback={
                <div className="flex h-screen w-full items-center justify-center bg-background">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                </div>
              }
            >
              <PrivateRoute isAuthenticated={!!data?.validateToken}>
                <DashboardLayout />
              </PrivateRoute>
            </Suspense>
          }
        >
          <Route index element={<DashboardRedirect />} />
          <Route path="parent" element={<ParentDashboardPage />} />
          <Route path="admin" element={<AdminDashboardPage />} />
          <Route path="promoter" element={<PromoterDashboardPage />} />
        </Route>
        <Route
          path={PATHS.TERMS_AND_CONDITIONS}
          element={<TermsAndConditionsPage />}
        />
        <Route path="*" element={<Navigate to={PATHS.AUTH} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
