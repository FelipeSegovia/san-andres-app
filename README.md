# Aplicación web Escuela San Andres

Esta aplicación web está destinada para la escuela de lenguaje San Andres.
Consta de un sistema que permite gestionar las matriculas de los alumnos, para ello
se tendrán tres portales web diferentes:

- Portal de administración: Aquí el panel de administración esta destinado para la directora
del establecimiento. Ella podrá gestionar las matriculas de los alumnos a medida que los
apoderados completen los formularios y envien la documentación requerida.
- Portal para los apoderados: Este portal será una landing page donde podrán ver caracteristicas
informativas del establecimiento y podrán registrarse con cuentas normal o a traves de
google signin, con el objetivo de realizar el proceso de matricula de su alumno en el establecimiento.
En el proceso de matricula, el apoderado podrá completar el formulario de matricula, subir
documentación requerida y por último firma electrónica.
- Portal para las promotoras: Este portal es simple. Las promotoras podrán registrar las matriculas
captadas, el seguimiento de estas. Un panel de estadísticas para visualizar la cantidad de
matriculas captadas.

## Estructura del proyecto
```
src/
├── components/
│   │
│   ├── atoms/                          # Componentes básicos indivisibles
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css      # O usar Tailwind inline
│   │   │
│   │   └── Typography/
│   │       ├── Heading.jsx
│   │       ├── Text.jsx
│   │       └── Caption.jsx
│   │
│   ├── molecules/                      # Combinaciones de atoms
│   │   ├── FormField/
│   │   │   └── FormField.jsx          # Label + Input + Error
│   │   │
│   │   ├── FileUpload/
│   │   │   ├── FileUpload.jsx         # Input file + Preview + Progress
│   │       └── FilePreview.jsx
│   │
│   ├── organisms/                      # Secciones complejas autónomas
│   │   │
│   │   ├── EnrollmentForm/
│   │   │   ├── EnrollmentForm.jsx            # Formulario completo
│   │   │   ├── StudentDataSection.jsx        # Sección datos estudiante
│   │   │   ├── ParentDataSection.jsx         # Sección datos apoderado
│   │   │   └── DocumentsSection.jsx          # Sección upload docs
│   │   │
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── SidebarItem.jsx
│   │   │
│   │   └── DocumentViewer/
│   │       └── DocumentViewer.jsx            # Modal para ver docs
│   │
│   ├── templates/                      # Layouts de páginas
│   │   ├── AuthLayout/
│   │   │   └── AuthLayout.jsx                # Layout login/register
│   │   │
│   │   ├── DashboardLayout/
│   │   │   ├── DashboardLayout.jsx           # Navbar + Sidebar + Content
│   │   │   └── DashboardContent.jsx
│   │
│   └── pages/                          # Páginas completas (Atomic Pages)
│       ├── auth/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── ForgotPasswordPage.jsx
│       │
│       ├── parent/                     # Rol: Apoderado
│       │   ├── ParentDashboard.jsx
│       │   ├── NewEnrollmentPage.jsx
│       │   ├── MyEnrollmentsPage.jsx
│       │   └── EnrollmentDetailPage.jsx
│       │
│       ├── admin/                      # Rol: Administrador
│       │   ├── AdminDashboard.jsx
│       │   ├── EnrollmentsListPage.jsx
│       │   ├── ReviewEnrollmentPage.jsx
│       │   └── UsersManagementPage.jsx
│       │
│       ├── promoter/                   # Rol: Promotora
│       │   ├── PromoterDashboard.jsx
│       │   └── MyStatsPage.jsx
│       │
│       └── errors/
│           ├── NotFoundPage.jsx
│           └── UnauthorizedPage.jsx
│
├── features/                           # Lógica de negocio (no visual)
│   ├── auth/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useLogin.js
│   │   └── services/
│   │       └── authService.js
│   │
│   ├── enrollments/
│   │   ├── hooks/
│   │   │   ├── useEnrollments.js
│   │   │   ├── useCreateEnrollment.js
│   │   │   └── useApproveEnrollment.js
│   │   └── services/
│   │       └── enrollmentService.js
│   │
│   └── documents/
│       ├── hooks/
│       │   └── useUploadDocument.js
│       └── services/
│           └── documentService.js
│
├── shared/                             # Utilidades compartidas
│   ├── hooks/
│   │   ├── useDebounce.js
│   │   ├── useMediaQuery.js
│   │   └── useLocalStorage.js
│   │
│   ├── utils/
│   │   ├── formatters.js              # formatRut, formatDate
│   │   ├── validators.js              # validateRut, validateEmail
│   │   └── constants.js
│   │
│   ├── lib/
│   │   ├── api.js                     # Axios configurado
│   │   └── queryClient.js             # React Query
│   │
│   └── types/
│       └── enrollment.types.js
│
├── routes/
│   ├── AppRoutes.jsx
│   ├── ProtectedRoute.jsx
│   └── RoleBasedRoute.jsx
│
├── stores/                             # Zustand stores
│   ├── authStore.js
│   └── uiStore.js
│
├── styles/
│   └── globals.css
│
├── App.jsx
└── main.jsx
```