# Roles y Permisos - Reglas de Negocio

## Descripción General

Este documento define las reglas de negocio relacionadas con los roles de usuario y sus permisos en el sistema de gestión de matrículas de la Escuela San Andrés. El sistema contempla tres roles principales: Administrador, Apoderado y Promotora.

## Roles del Sistema

### Rol: Administrador

**Descripción:** Usuario con acceso completo al sistema. Generalmente asignado a la directora del establecimiento.

### Rol: Apoderado

**Descripción:** Usuario que representa a un estudiante y puede realizar el proceso de matrícula.

### Rol: Promotora

**Descripción:** Usuario que capta matrículas y realiza seguimiento de las mismas.

## Reglas

### BR-ROLE-001: Definición y Asignación de Roles

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Todo el sistema

**Descripción:**
El sistema debe soportar tres roles principales: Administrador, Apoderado y Promotora. Cada usuario debe tener un único rol asignado al momento del registro o por asignación manual.

**Condiciones:**

- Cada usuario debe tener exactamente un rol asignado
- El rol debe estar definido antes de que el usuario acceda al sistema
- Los roles no pueden ser modificados por el propio usuario
- Solo un Administrador puede asignar o modificar roles de otros usuarios

**Comportamiento Esperado:**

- Al registrarse, los usuarios se registran automáticamente como "Apoderado" por defecto
- Los roles "Administrador" y "Promotora" deben ser asignados manualmente por un Administrador
- El rol se almacena en el perfil del usuario y se valida en cada solicitud
- Si un usuario no tiene rol asignado, no puede acceder a ninguna funcionalidad del sistema

**Excepciones:**

- Un Administrador no puede cambiar su propio rol
- Un Administrador no puede eliminar el último Administrador del sistema

**Ejemplos:**

- Ejemplo 1: Usuario se registra como apoderado → Rol "Apoderado" asignado automáticamente
- Ejemplo 2: Administrador asigna rol "Promotora" a un usuario → Rol actualizado en el sistema

**Referencias:**

- `src/routes/RoleBasedRoute.tsx` (cuando se implemente)
- `src/stores/authStore.js` (cuando se implemente)

---

### BR-ROLE-002: Permisos del Rol Administrador

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Portal de Administración

**Descripción:**
Los usuarios con rol Administrador tienen acceso completo al sistema y pueden gestionar todas las funcionalidades relacionadas con matrículas, usuarios y configuración.

**Condiciones:**

- El usuario debe estar autenticado
- El usuario debe tener rol "Administrador" asignado
- El acceso debe validarse en cada solicitud

**Permisos Específicos:**

- **Gestión de Matrículas:**

  - Ver todas las matrículas del sistema (pendientes, aprobadas, rechazadas)
  - Revisar detalles completos de cualquier matrícula
  - Aprobar matrículas
  - Rechazar matrículas con motivo
  - Solicitar cambios en matrículas
  - Ver documentos de cualquier matrícula
  - Exportar reportes de matrículas

- **Gestión de Usuarios:**

  - Ver lista de todos los usuarios
  - Asignar roles a usuarios
  - Modificar roles de usuarios existentes
  - Deshabilitar/habilitar cuentas de usuario
  - Ver información de contacto de usuarios

- **Estadísticas y Reportes:**

  - Acceder a dashboard con estadísticas generales
  - Ver cantidad total de matrículas por estado
  - Ver cantidad de matrículas por promotora
  - Generar reportes de matrículas

- **Configuración:**
  - Configurar documentos requeridos para matrícula
  - Gestionar términos y condiciones
  - Configurar parámetros del sistema

**Comportamiento Esperado:**

- Al iniciar sesión, redirigir a `/admin/dashboard`
- Mostrar menú de navegación con todas las opciones administrativas
- Validar permisos antes de mostrar cualquier acción administrativa
- Si no tiene permisos, mostrar error 403 (No autorizado)

**Excepciones:**

- Un Administrador no puede eliminar su propia cuenta
- Un Administrador no puede cambiar su propio rol

**Ejemplos:**

- Ejemplo 1: Administrador accede a lista de matrículas → Ve todas las matrículas del sistema
- Ejemplo 2: Administrador intenta aprobar matrícula → Acción permitida, matrícula aprobada

**Referencias:**

- `src/components/pages/admin/AdminDashboard.tsx` (cuando se implemente)
- `src/components/pages/admin/EnrollmentsListPage.tsx` (cuando se implemente)
- `src/components/pages/admin/UsersManagementPage.tsx` (cuando se implemente)

---

### BR-ROLE-003: Permisos del Rol Apoderado

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Portal de Apoderados

**Descripción:**
Los usuarios con rol Apoderado pueden gestionar las matrículas de sus hijos, ver información del establecimiento y realizar el proceso completo de matrícula.

**Condiciones:**

- El usuario debe estar autenticado
- El usuario debe tener rol "Apoderado" asignado
- El acceso debe validarse en cada solicitud

**Permisos Específicos:**

- **Gestión de Matrículas Propias:**

  - Crear nueva matrícula para su hijo/a
  - Ver lista de sus propias matrículas
  - Ver detalles de sus propias matrículas
  - Editar matrícula mientras esté en estado "Pendiente" o "Requiere Cambios"
  - Subir documentos para sus matrículas
  - Realizar firma electrónica de matrícula
  - Ver estado de sus matrículas

- **Información del Establecimiento:**

  - Ver landing page con información del establecimiento
  - Ver características y servicios de la escuela
  - Ver términos y condiciones

- **Perfil:**
  - Ver y editar su propio perfil
  - Cambiar su contraseña
  - Ver historial de sus matrículas

**Restricciones:**

- No puede ver matrículas de otros apoderados
- No puede aprobar o rechazar matrículas
- No puede ver documentos de otras matrículas
- No puede acceder a funcionalidades administrativas
- No puede ver estadísticas globales

**Comportamiento Esperado:**

- Al iniciar sesión, redirigir a `/parent/dashboard`
- Mostrar menú de navegación con opciones de apoderado
- Validar permisos antes de mostrar acciones
- Si intenta acceder a ruta no autorizada, redirigir a dashboard o mostrar error 403

**Excepciones:**

- Si una matrícula está en estado "Aprobada" o "Rechazada", no puede editarla
- Puede ver documentos de sus propias matrículas en cualquier estado

**Ejemplos:**

- Ejemplo 1: Apoderado crea nueva matrícula → Matrícula creada y vinculada a su cuenta
- Ejemplo 2: Apoderado intenta ver matrícula de otro usuario → Acceso denegado, error 403

**Referencias:**

- `src/components/pages/parent/ParentDashboard.tsx` (cuando se implemente)
- `src/components/pages/parent/NewEnrollmentPage.tsx` (cuando se implemente)
- `src/components/pages/parent/MyEnrollmentsPage.tsx` (cuando se implemente)

---

### BR-ROLE-004: Permisos del Rol Promotora

**Prioridad:** Media
**Estado:** Activa
**Aplicable a:** Portal de Promotoras

**Descripción:**
Los usuarios con rol Promotora pueden registrar matrículas captadas, realizar seguimiento de las mismas y ver estadísticas de sus captaciones.

**Condiciones:**

- El usuario debe estar autenticado
- El usuario debe tener rol "Promotora" asignado
- El acceso debe validarse en cada solicitud

**Permisos Específicos:**

- **Registro de Matrículas Captadas:**

  - Registrar nueva matrícula captada con datos básicos del apoderado y estudiante
  - Vincular matrícula captada a su cuenta de promotora
  - Ver lista de matrículas captadas por ella

- **Seguimiento de Matrículas:**

  - Ver estado de las matrículas que ha captado
  - Ver si el apoderado ha completado el proceso de matrícula
  - Ver si la matrícula fue aprobada o rechazada
  - Agregar notas de seguimiento a sus matrículas captadas

- **Estadísticas:**
  - Ver panel de estadísticas con cantidad de matrículas captadas
  - Ver cantidad de matrículas por estado (captada, pendiente, aprobada, rechazada)
  - Ver estadísticas de conversión (captadas vs completadas)

**Restricciones:**

- No puede ver matrículas captadas por otras promotoras
- No puede aprobar o rechazar matrículas
- No puede ver documentos de matrículas
- No puede editar matrículas completadas por apoderados
- No puede acceder a funcionalidades administrativas
- No puede ver estadísticas globales del sistema

**Comportamiento Esperado:**

- Al iniciar sesión, redirigir a `/promoter/dashboard`
- Mostrar menú de navegación con opciones de promotora
- Validar permisos antes de mostrar acciones
- Si intenta acceder a ruta no autorizada, redirigir a dashboard o mostrar error 403

**Excepciones:**

- Si una matrícula captada es completada por el apoderado, la promotora puede ver el estado final pero no editarla

**Ejemplos:**

- Ejemplo 1: Promotora registra matrícula captada → Matrícula vinculada a su cuenta, aparece en estadísticas
- Ejemplo 2: Promotora intenta ver matrícula de otra promotora → Acceso denegado, solo ve sus propias matrículas

**Referencias:**

- `src/components/pages/promoter/PromoterDashboard.tsx` (cuando se implemente)
- `src/components/pages/promoter/MyStatsPage.tsx` (cuando se implemente)

---

### BR-ROLE-005: Validación de Permisos en Rutas

**Prioridad:** Alta
**Estado:** En Desarrollo
**Aplicable a:** Sistema de rutas

**Descripción:**
El sistema debe validar los permisos del usuario antes de permitir el acceso a cualquier ruta protegida. Las rutas deben estar protegidas según el rol del usuario.

**Condiciones:**

- El usuario debe estar autenticado
- El rol del usuario debe ser válido
- La ruta debe estar definida en el sistema de permisos

**Comportamiento Esperado:**

- Las rutas públicas (`/auth/login`, `/auth/register`, `/terms-and-conditions`) son accesibles sin autenticación
- Las rutas protegidas requieren autenticación
- Las rutas específicas por rol solo son accesibles para usuarios con ese rol:
  - Rutas `/admin/*` → Solo Administradores
  - Rutas `/parent/*` → Solo Apoderados
  - Rutas `/promoter/*` → Solo Promotoras
- Si un usuario autenticado intenta acceder a una ruta de otro rol, redirigir a su dashboard correspondiente
- Si un usuario no autenticado intenta acceder a una ruta protegida, redirigir a `/auth/login`

**Excepciones:**

- Un Administrador puede acceder a todas las rutas del sistema
- Las rutas de error (404, 403) son accesibles para todos los usuarios autenticados

**Ejemplos:**

- Ejemplo 1: Apoderado intenta acceder a `/admin/dashboard` → Redirigido a `/parent/dashboard`
- Ejemplo 2: Usuario no autenticado intenta acceder a `/parent/dashboard` → Redirigido a `/auth/login`

**Referencias:**

- `src/routes/AppRoutes.tsx`
- `src/routes/ProtectedRoute.tsx` (cuando se implemente)
- `src/routes/RoleBasedRoute.tsx` (cuando se implemente)

---

### BR-ROLE-006: Asignación Manual de Roles por Administrador

**Prioridad:** Media
**Estado:** En Desarrollo
**Aplicable a:** Portal de Administración

**Descripción:**
Un Administrador puede asignar o modificar el rol de cualquier usuario del sistema, excepto el suyo propio.

**Condiciones:**

- Solo usuarios con rol "Administrador" pueden asignar roles
- El usuario objetivo debe existir en el sistema
- No se puede eliminar el último Administrador del sistema
- Un Administrador no puede cambiar su propio rol

**Comportamiento Esperado:**

- El Administrador accede a la página de gestión de usuarios
- Puede ver lista de usuarios con sus roles actuales
- Puede seleccionar un usuario y cambiar su rol
- Al cambiar el rol, el usuario debe cerrar sesión y volver a iniciar sesión para que los cambios surtan efecto
- Se registra un log de quién cambió el rol y cuándo

**Excepciones:**

- Si se cambia el rol de un usuario que está activo, se le notifica que debe reiniciar sesión
- Si se intenta cambiar el rol del último Administrador, se muestra error: "No se puede modificar el rol del último administrador"

**Ejemplos:**

- Ejemplo 1: Administrador cambia rol de usuario de "Apoderado" a "Promotora" → Rol actualizado, usuario notificado
- Ejemplo 2: Administrador intenta cambiar su propio rol → Error: "No puedes cambiar tu propio rol"

**Referencias:**

- `src/components/pages/admin/UsersManagementPage.tsx` (cuando se implemente)

---

### BR-ROLE-007: Acceso a Documentos según Rol

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Sistema de documentos

**Descripción:**
El acceso a documentos de matrículas está restringido según el rol del usuario. Solo ciertos roles pueden ver ciertos documentos.

**Condiciones:**

- El usuario debe estar autenticado
- El documento debe estar asociado a una matrícula
- El usuario debe tener permisos según su rol

**Permisos por Rol:**

- **Administrador:**

  - Puede ver todos los documentos de todas las matrículas
  - Puede descargar cualquier documento
  - Puede eliminar documentos (con restricciones)

- **Apoderado:**

  - Puede ver solo los documentos de sus propias matrículas
  - Puede subir documentos para sus matrículas
  - Puede descargar documentos de sus propias matrículas
  - No puede eliminar documentos ya subidos (solo reemplazar)

- **Promotora:**
  - No puede ver documentos de matrículas
  - No puede subir documentos
  - Solo puede ver información básica de las matrículas que captó

**Comportamiento Esperado:**

- Al intentar acceder a un documento, se valida el rol y los permisos
- Si no tiene permisos, mostrar error 403 (No autorizado)
- Los documentos se muestran en un visor seguro
- Los documentos no pueden ser accedidos directamente por URL sin autenticación

**Excepciones:**

- Un Administrador puede ver documentos incluso si la matrícula fue eliminada (si existe en historial)

**Ejemplos:**

- Ejemplo 1: Apoderado intenta ver documento de su matrícula → Acceso permitido
- Ejemplo 2: Apoderado intenta ver documento de matrícula de otro usuario → Error 403

**Referencias:**

- `src/components/organisms/DocumentViewer.tsx` (cuando se implemente)
- `src/features/documents/` (cuando se implemente)

---

### BR-ROLE-008: Herencia de Permisos y Restricciones

**Prioridad:** Media
**Estado:** Activa
**Aplicable a:** Todo el sistema

**Descripción:**
Los permisos se aplican de forma jerárquica. Un rol con más permisos puede realizar todas las acciones de roles con menos permisos, excepto cuando hay restricciones explícitas.

**Jerarquía de Roles:**

1. **Administrador** (máximo nivel de permisos)
2. **Apoderado** (permisos intermedios)
3. **Promotora** (permisos limitados)

**Condiciones:**

- Un Administrador puede realizar todas las acciones de Apoderado y Promotora
- Un Apoderado NO puede realizar acciones de Administrador o Promotora
- Una Promotora NO puede realizar acciones de Administrador o Apoderado
- Las restricciones específicas siempre tienen prioridad sobre la herencia

**Comportamiento Esperado:**

- Si una funcionalidad está disponible para múltiples roles, se muestra según el rol del usuario
- Las restricciones específicas (como "no puede ver documentos") siempre se aplican
- Un Administrador puede ver y gestionar todo, pero debe respetar restricciones de negocio (ej: no puede eliminar el último administrador)

**Excepciones:**

- Aunque un Administrador tiene todos los permisos, no puede realizar acciones que violen reglas de negocio (ej: aprobar matrícula sin documentos)

**Ejemplos:**

- Ejemplo 1: Administrador accede a crear matrícula → Puede hacerlo, pero normalmente no lo necesita
- Ejemplo 2: Promotora intenta ver documentos → Restricción específica aplica, acceso denegado

**Referencias:**

- Todas las reglas de permisos anteriores
