# Estándares de Código

## Configuración de Biome

El proyecto usa **Biome** para linting y formateo de código. No usar ESLint ni Prettier.

### Reglas de Formateo

#### General
- **Indentación**: 2 espacios
- **Line Ending**: LF (Unix)
- **Line Width**: 80 caracteres
- **Bracket Spacing**: `true`
- **Bracket Same Line**: `false`

#### JavaScript/TypeScript
- **Quotes**: Single quotes (`'`) para JS/TS
- **JSX Quotes**: Double quotes (`"`)
- **Semicolons**: `asNeeded` (solo cuando es necesario)
- **Trailing Commas**: `all` (siempre)
- **Arrow Parentheses**: `always` (siempre incluir paréntesis)

#### CSS/Tailwind
- **Quotes**: Double quotes (`"`)
- **Tailwind Directives**: Habilitado

### Comandos
```bash
# Formatear código
pnpm format

# Lint
pnpm lint
```

## Convenciones de Naming

### Archivos y Carpetas
- **Componentes React**: PascalCase - `LoginForm.tsx`, `Button.tsx`
- **Servicios/Utilidades**: kebab-case - `auth.service.ts`, `api.ts`
- **Hooks**: kebab-case con prefijo `use-` - `use-auth-mutations.ts`
- **Tipos**: kebab-case con sufijo `.types` - `api.types.ts`
- **Páginas**: PascalCase con sufijo `Page` - `LoginPage.tsx`
- **Layouts**: PascalCase con sufijo `Layout` - `AuthLayout.tsx`

### Variables y Constantes
- **Variables**: camelCase - `userData`, `isLoading`
- **Constantes globales**: UPPER_SNAKE_CASE - `PATHS`, `API_BASE_URL`
- **Funciones**: camelCase - `handleSubmit`, `getValidateToken`
- **React Components**: PascalCase - `LoginForm`, `Button`
- **Interfaces/Types**: PascalCase - `LoginRequest`, `AuthResponse`
- **Props Interfaces**: PascalCase con sufijo `Props` - `LoginFormProps`

### Funciones y Métodos
- **Handlers**: Prefijo `handle` - `handleSubmit`, `handleClick`
- **Event Callbacks**: Prefijo `on` - `onSubmit`, `onChange`
- **Boolean Functions**: Prefijo `is`, `has`, `should` - `isAuthenticated`, `hasAccess`
- **Async Functions**: Usar `async/await` explícitamente

## Estructura de Archivos

### Componentes React

```typescript
// 1. Imports externos
import { Label } from '@radix-ui/react-label'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

// 2. Imports internos (alias @/)
import { Button } from '../ui/button'
import { Input } from '../ui/input'

// 3. Interfaces (antes del componente)
interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  error?: string | null
}

// 4. Componente con typed props
export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  // Hooks primero
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>()

  // Return JSX
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* JSX */}
    </form>
  )
}
```

### Servicios

```typescript
// 1. Imports
import apiClient from '@/shared/lib/api'
import type { AuthResponse } from '@/shared/types/api.types'

// 2. Keys para queries (si aplica)
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
}

// 3. Objeto de servicio con JSDoc
/**
 * Servicio de autenticación
 * Contiene todas las funciones relacionadas con autenticación
 */
export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // Implementación
  },
}
```

## TypeScript

### Reglas Estrictas
- **noExplicitAny**: Error - No usar `any`
- **noUnusedVariables**: Error - Eliminar variables no usadas
- **noUnusedPrivateClassMembers**: Error
- **noUndeclaredVariables**: Error

### Tipos e Interfaces
- Preferir `interface` para definir shapes de objetos
- Usar `type` para unions, intersections y tipos complejos
- Siempre tipar props de componentes
- Usar `as const` para objetos literales inmutables
- Evitar `any`, usar `unknown` si es necesario

### Ejemplos
```typescript
// ✅ Correcto
interface User {
  id: string
  email: string
}

type Status = 'active' | 'inactive'

const PATHS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
} as const

// ❌ Incorrecto
const user: any = {} // no usar any
let data // sin tipo explícito
```

## React

### Componentes
- **Funcionales con arrow functions**: `export const Component: React.FC<Props> = () => {}`
- **Hooks**: Siempre al inicio del componente
- **Props destructuring**: En los parámetros de la función
- **Children**: Tipar explícitamente si se usa

### Hooks Personalizados
- Prefijo `use` obligatorio
- Retornar objeto o array según convenga
- Documentar con JSDoc si es complejo

```typescript
// Ejemplo
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  return { user, setUser }
}
```

### Conditional Rendering
```typescript
// ✅ Correcto
{isLoading && <Spinner />}
{error ? <Error /> : <Content />}

// ❌ Evitar
{isLoading ? <Spinner /> : null}
```

## Imports

### Orden de Imports
1. React y dependencias principales
2. Bibliotecas de terceros
3. Imports con alias `@/`
4. Imports relativos
5. Tipos (al final con `type`)

```typescript
// 1. React
import { useState } from 'react'

// 2. Terceros
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'

// 3. Alias @/
import { Button } from '@/components/ui/button'
import { authService } from '@/features/auth/services/auth.service'

// 4. Relativos
import { LoginForm } from './LoginForm'

// 5. Tipos
import type { User } from '@/shared/types'
```

### Alias de Path
- Usar `@/` para imports absolutos desde `src/`
- Configurado en `tsconfig.json`: `"@/*": ["./src/*"]`

## Estilos y Tailwind

### Clases
- Usar la utilidad `cn()` de `@/lib/utils` para combinar clases
- Ordenar clases: layout → espaciado → tipografía → colores → efectos

```typescript
// ✅ Correcto
<div className={cn('flex items-center gap-2 p-4 text-sm bg-primary rounded-md')}>

// Con condicionales
<div className={cn(
  'flex items-center',
  isActive && 'bg-primary text-white',
  className,
)}>
```

### Variants con CVA
- Usar `class-variance-authority` para variantes de componentes
- Exportar `buttonVariants` si se necesita reutilizar

```typescript
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: 'bg-primary',
        outline: 'border',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)
```

## API y Data Fetching

### React Query
- Usar TanStack Query para manejo de estado del servidor
- Definir query keys como constantes
- Agrupar queries relacionadas en hooks personalizados

```typescript
// Keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
}

// Hook
export const useUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authService.getUser,
  })
}
```

### Axios
- Usar la instancia `apiClient` de `@/shared/lib/api`
- No crear nuevas instancias de axios
- El token se agrega automáticamente en el interceptor

```typescript
// ✅ Correcto
import apiClient from '@/shared/lib/api'

const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)

// ❌ Incorrecto
import axios from 'axios'
const data = await axios.post(...)
```

## Manejo de Errores

### Try-Catch
- Usar en funciones async
- Logging apropiado
- Siempre en bloques `finally` para cleanup

```typescript
async logout(): Promise<void> {
  try {
    await apiClient.post('/auth/logout')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  } finally {
    localStorage.removeItem('auth_token')
  }
}
```

### Validación de Formularios
- Usar `react-hook-form` para formularios
- Validaciones en el `register` o con `Joi`
- Mensajes de error en español

## Comentarios y Documentación

### JSDoc
- Usar en servicios y funciones públicas
- Descripción breve y concisa
- Documentar parámetros complejos

```typescript
/**
 * Servicio de autenticación
 * Contiene todas las funciones relacionadas con autenticación
 */
export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    // ...
  },
}
```

### Comentarios Inline
- Solo para lógica compleja no obvia
- Evitar comentarios obvios
- Mantener actualizados

## Estado Global

### Zustand
- Usar para estado global de aplicación
- Mantener stores pequeños y específicos
- No usar para estado del servidor (usar React Query)

## Performance

### Optimizaciones
- `Suspense` para code splitting de rutas
- Lazy loading de componentes pesados cuando sea apropiado
- Memoización solo cuando sea necesario (evitar optimización prematura)

## Testing

### Convenciones
- Archivos de test: `*.test.ts` o `*.spec.ts`
- Colocar tests junto al código que prueban
- Naming: `describe` con nombre del componente/función
- **Nota**: Actualmente no hay tests configurados en el proyecto

## Accesibilidad

### Prácticas
- Usar componentes Radix UI (ya son accesibles)
- Labels apropiados para inputs
- Contraste de colores adecuado
- Navegación por teclado

## Git y Commits

### Mensajes de Commit
- Usar español
- Formato: `tipo: descripción breve`
- Tipos: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

Ejemplos:
```
feat: agregar formulario de registro
fix: corregir validación de email
refactor: extraer lógica de autenticación a hook
```

## Checklist Pre-Commit

- [ ] `pnpm format` ejecutado
- [ ] `pnpm lint` sin errores
- [ ] `pnpm build` exitoso
- [ ] No hay `console.log` innecesarios
- [ ] Tipos TypeScript correctos
- [ ] Imports ordenados
- [ ] Nombres de variables descriptivos
