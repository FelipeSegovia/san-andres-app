# Arquitectura del Proyecto

## Visión General

Este proyecto es una aplicación web de React con TypeScript que utiliza Vite como build tool. Sigue una arquitectura modular basada en features y componentes, con separación clara de responsabilidades.

## Stack Tecnológico Principal

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6.2.0
- **Lenguaje**: TypeScript 5.7.2
- **Routing**: React Router DOM 7.10.1
- **Estado Cliente**: Zustand 5.0.9
- **Estado Servidor**: TanStack React Query 5.90.12
- **HTTP Client**: Axios 1.13.2
- **Estilos**: Tailwind CSS 4.1.18
- **Componentes UI**: Radix UI + Componentes Custom
- **Forms**: React Hook Form 7.68.0
- **Validación**: Joi 18.0.2

## Estructura de Carpetas

```
src/
├── assets/              # Recursos estáticos (imágenes, fonts, etc.)
├── components/          # Componentes de UI (Atomic Design)
│   ├── atoms/          # Componentes más básicos (vacío actualmente)
│   ├── molecules/      # Componentes compuestos simples (vacío actualmente)
│   ├── organisms/      # Componentes complejos (LoginForm, RegisterForm)
│   ├── pages/          # Componentes de página (LoginPage, DashboardPage, etc.)
│   ├── templates/      # Layouts de página (AuthLayout, DashboardLayout)
│   └── ui/            # Componentes base de UI (Button, Input, Card, etc.)
├── features/           # Módulos de funcionalidad por dominio
│   └── auth/          # Feature de autenticación
│       ├── hooks/     # Hooks personalizados del feature
│       └── services/  # Servicios API del feature
├── lib/               # Utilidades generales (utils.ts)
├── routes/            # Configuración de rutas
│   ├── AppRoutes.tsx          # Router principal
│   ├── PrivateRoute.tsx       # HOC para rutas protegidas
│   └── DashboardRedirect.tsx  # Lógica de redirección por rol
├── shared/            # Código compartido entre features
│   ├── hooks/        # Hooks compartidos
│   ├── lib/          # Configuraciones (api.ts, query-client.ts)
│   └── types/        # Tipos TypeScript compartidos
├── stores/           # Estado global con Zustand (vacío actualmente)
└── styles/           # Estilos globales adicionales
```

## Patrones de Arquitectura

### 1. Atomic Design (Componentes)

El proyecto sigue una estructura inspirada en Atomic Design para organizar componentes:

#### **atoms/** (Componentes Básicos)
- Actualmente vacío
- Destinado a componentes más simples y reutilizables

#### **molecules/** (Componentes Compuestos)
- Actualmente vacío
- Para combinaciones de atoms que forman funcionalidad específica

#### **organisms/** (Componentes Complejos)
- `LoginForm.tsx` - Formulario de inicio de sesión
- `RegisterForm.tsx` - Formulario de registro
- Componentes complejos con lógica de negocio

#### **templates/** (Layouts)
- `AuthLayout.tsx` - Layout para páginas de autenticación
- `DashboardLayout.tsx` - Layout del dashboard con sidebar
- Estructura visual de páginas sin contenido específico

#### **pages/** (Páginas Completas)
- `LoginPage.tsx` - Página de login
- `RegisterPage.tsx` - Página de registro
- `ParentDashboardPage.tsx` - Dashboard de apoderados
- `AdminDashboardPage.tsx` - Dashboard de administradores
- `PromoterDashboardPage.tsx` - Dashboard de promotoras
- `TermsAndConditionsPage.tsx` - Términos y condiciones
- Componentes de ruta que combinan organisms y templates

#### **ui/** (Componentes Base)
- Componentes de UI reutilizables basados en Radix UI
- `button.tsx`, `input.tsx`, `card.tsx`, `dropdown-menu.tsx`, etc.
- Styled con Tailwind y variants con CVA

### 2. Feature-Based Architecture

Cada feature es un módulo autocontenido con su propia estructura:

```
features/
└── auth/
    ├── hooks/
    │   ├── use-auth-queries.ts    # Queries de React Query
    │   └── use-auth-mutations.ts  # Mutations de React Query
    └── services/
        └── auth.service.ts         # Lógica de API
```

**Principios**:
- Cada feature tiene su propia carpeta
- Contiene hooks, servicios, types específicos del dominio
- Exporta una API pública a través de `index.ts`
- Puede ser extraído a un paquete independiente

### 3. Separación de Responsabilidades

#### **Services Layer** (`features/*/services/`)
- Interacción directa con APIs
- Lógica de transformación de datos
- Manejo de tokens y headers
- Ejemplo: `auth.service.ts`

```typescript
export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const { data } = await apiClient.post('/auth/login', credentials)
    if (data?.accessToken) {
      localStorage.setItem('auth_token', data.accessToken)
    }
    return data
  },
}
```

#### **Hooks Layer** (`features/*/hooks/`)
- Abstracción de React Query
- Estado y side effects del feature
- Lógica de negocio del cliente
- Ejemplo: `use-auth-queries.ts`

```typescript
export const useValidateToken = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authService.getValidateToken(),
    enabled: !!localStorage.getItem('auth_token'),
  })
}
```

#### **Components Layer** (`components/`)
- Solo presentación y UI
- Reciben datos por props
- Emiten eventos (callbacks)
- No contienen lógica de negocio directa

### 4. State Management Strategy

#### **Estado del Servidor** (React Query)
- Datos de APIs (usuarios, autenticación, etc.)
- Cache automático
- Revalidación y sincronización
- Configurado en `shared/lib/query-client.ts`

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutos
      gcTime: 1000 * 60 * 10,        // 10 minutos
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
```

#### **Estado Global del Cliente** (Zustand)
- Estado de UI (modals, sidebar, theme)
- Preferencias de usuario
- Estado compartido entre features
- Actualmente no implementado (`stores/` vacío)

#### **Estado Local** (useState)
- Estado específico de componente
- Formularios (react-hook-form)
- Estado efímero de UI

### 5. Routing Architecture

```typescript
// main.tsx - Punto de entrada
<QueryClientProvider client={queryClient}>
  <AppRoutes />
  <ReactQueryDevtools />
</QueryClientProvider>

// AppRoutes.tsx - Configuración de rutas
<BrowserRouter>
  <Routes>
    <Route path="/auth" element={<AuthLayout />}>
      <Route index element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
    
    <Route path="/dashboard" element={
      <PrivateRoute isAuthenticated={!!token}>
        <DashboardLayout />
      </PrivateRoute>
    }>
      <Route index element={<DashboardRedirect />} />
      <Route path="parent" element={<ParentDashboardPage />} />
      <Route path="admin" element={<AdminDashboardPage />} />
      <Route path="promoter" element={<PromoterDashboardPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**Características**:
- Rutas anidadas con Outlet
- Rutas protegidas con `PrivateRoute`
- Layouts compartidos
- Lazy loading con Suspense
- Redirección basada en roles

## Flujo de Datos

### 1. Flujo de Autenticación

```
Usuario → LoginForm → onSubmit
  ↓
useLogin (mutation) → authService.login
  ↓
API Request (axios) → Backend
  ↓
Token guardado en localStorage
  ↓
React Query invalida caché
  ↓
Redirección al dashboard
```

### 2. Flujo de Datos del Servidor

```
Componente → Custom Hook (useAuth)
  ↓
React Query (useQuery/useMutation)
  ↓
Service Layer (authService)
  ↓
API Client (axios instance)
  ↓
Interceptors (token, error handling)
  ↓
Backend API
```

### 3. Flujo de Rutas Protegidas

```
Usuario accede a ruta
  ↓
useValidateToken (query)
  ↓
Token existe? → authService.getValidateToken
  ↓
Token válido?
  ├─ Sí → Renderizar componente
  └─ No → Redirect a /auth
```

## Configuración de API

### API Client (`shared/lib/api.ts`)

```typescript
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// Request Interceptor - Agregar token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response Interceptor - Manejo de errores
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
    }
    return Promise.reject(error)
  }
)
```

## Tipos y Contratos

### Tipos Compartidos (`shared/types/`)

```typescript
// api.types.ts
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  statusCode?: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}

// paths.types.ts
export const PATHS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  DASHBOARD_PARENT: '/dashboard/parent',
  // ...
}
```

## Estilos y Theming

### Tailwind CSS
- Configuración en raíz (Tailwind 4)
- Clases utility-first
- Variables CSS para theming
- Responsive design mobile-first

### Componentes UI
- Basados en Radix UI (accesibilidad)
- Styled con Tailwind
- Variants con class-variance-authority
- Utilidad `cn()` para merge de clases

## Performance y Optimización

### Code Splitting
- Lazy loading de rutas con `Suspense`
- Chunks separados por features
- Bundle optimization con Vite

### React Query
- Cache inteligente (5 min stale, 10 min gc)
- Deduplicación de requests
- Retry automático (1 vez)
- Prefetching cuando sea necesario

### Build Optimization
- Tree shaking automático
- Minificación de código
- CSS purging (Tailwind)
- Asset optimization

## Seguridad

### Autenticación
- JWT tokens en localStorage
- Token enviado en header Authorization
- Validación en cada request protegido
- Logout limpia token local

### Rutas Protegidas
- HOC `PrivateRoute` valida autenticación
- Redirección automática si no autenticado
- Validación de roles en `DashboardRedirect`

### API
- Timeout configurado (10s)
- Error handling centralizado
- No exponer información sensible en errores

## Testing (Pendiente)

**Estado Actual**: No hay tests configurados

**Plan Futuro**:
- Unit tests con Vitest
- Component tests con React Testing Library
- E2E tests con Playwright
- API mocking con MSW

## Deployment

### Build Production
```bash
pnpm build  # Compila TypeScript + Vite build
```

### Variables de Entorno
```
VITE_API_BASE_URL=https://api.example.com
```

## Convenciones y Reglas

### Importaciones
1. Usar alias `@/` para imports desde `src/`
2. Orden: externos → internos → relativos
3. Agrupar por tipo (components, hooks, types)

### Componentes
1. Un componente por archivo
2. Exportar como named export
3. Props interface antes del componente
4. Tipar todos los props

### Features
1. Cada feature es autocontenido
2. Exports públicos vía `index.ts`
3. No importar directamente entre features (usar shared)

### Estado
1. React Query para datos del servidor
2. Zustand para estado global de UI
3. useState para estado local

## Escalabilidad

### Agregar Nuevo Feature

1. Crear carpeta en `features/`:
```
features/
└── nuevo-feature/
    ├── hooks/
    │   ├── index.ts
    │   └── use-nuevo-feature.ts
    ├── services/
    │   └── nuevo-feature.service.ts
    └── types/
        └── nuevo-feature.types.ts
```

2. Crear componentes en `components/`:
```
components/
├── organisms/
│   └── NuevoFeatureForm.tsx
└── pages/
    └── NuevoFeaturePage.tsx
```

3. Agregar rutas en `AppRoutes.tsx`
4. Agregar tipos en `shared/types/` si son compartidos

### Agregar Nuevo Componente UI

1. Crear en `components/ui/`
2. Usar Radix UI como base
3. Aplicar variants con CVA
4. Exportar tipos y variants
5. Documentar props con JSDoc

## Mejores Prácticas

1. **Separación de Responsabilidades**: Mantener lógica de negocio fuera de componentes
2. **Composición sobre Herencia**: Usar composición de componentes
3. **DRY**: No repetir código, extraer a utilidades/hooks
4. **Single Responsibility**: Cada módulo una responsabilidad
5. **TypeScript Strict**: Mantener tipos estrictos
6. **Inmutabilidad**: Evitar mutaciones directas de estado
7. **Error Boundaries**: Implementar para manejo de errores (pendiente)
8. **Accesibilidad**: Usar componentes Radix UI accesibles

## Recursos y Documentación

- **React Query**: [tanstack.com/query](https://tanstack.com/query)
- **React Router**: [reactrouter.com](https://reactrouter.com)
- **Radix UI**: [radix-ui.com](https://radix-ui.com)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **Zustand**: [github.com/pmndrs/zustand](https://github.com/pmndrs/zustand)
