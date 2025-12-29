import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PATHS } from '@/shared/types'
import { AuthLayout } from '@/components/templates'
import { LoginPage, RegisterPage } from '@/components/pages'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.AUTH} element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path="*" element={<Navigate to={PATHS.AUTH} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
