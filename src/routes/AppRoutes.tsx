import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import {
  LoginPage,
  RegisterPage,
  TermsAndConditionsPage,
} from '@/components/pages'
import { AuthLayout } from '@/components/templates'
import { PATHS } from '@/shared/types'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.AUTH} element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
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
