# Autenticación - Reglas de Negocio

## Descripción General

Este documento define las reglas de negocio relacionadas con la autenticación de usuarios en el sistema de gestión de matrículas de la Escuela San Andrés.

## Reglas

### BR-AUTH-001: Registro de Apoderados

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Portal de Apoderados

**Descripción:**
Los apoderados pueden registrarse en el sistema mediante dos métodos: registro tradicional con email/contraseña o mediante Google Sign-In.

**Condiciones:**

- El email debe ser único en el sistema
- La contraseña debe cumplir con los requisitos de seguridad (mínimo 8 caracteres)
- El usuario debe aceptar los términos y condiciones antes de registrarse
- El nombre completo es obligatorio en el registro

**Comportamiento Esperado:**

- Si el registro es exitoso, el usuario es redirigido al dashboard de apoderados
- Si el email ya existe, se muestra un error: "Este correo electrónico ya está registrado"
- Si la contraseña es débil, se muestra: "La contraseña es muy débil"
- El perfil del usuario debe incluir el nombre proporcionado

**Excepciones:**

- Si el usuario se registra con Google Sign-In, el nombre se obtiene automáticamente del perfil de Google
- Si el usuario cancela el popup de Google, no se debe mostrar error, solo cerrar el modal

**Ejemplos:**

- Ejemplo 1: Apoderado registra con email "juan.perez@email.com" y contraseña "MiPass123" → Registro exitoso
- Ejemplo 2: Apoderado intenta registrar con email ya existente → Error: "Este correo electrónico ya está registrado"

**Referencias:**

- `src/services/auth.service.ts` - Función `registerWithEmail`
- `src/components/organisms/RegisterForm.tsx`

---

### BR-AUTH-002: Inicio de Sesión

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Todos los portales

**Descripción:**
Los usuarios pueden iniciar sesión con email/contraseña o Google Sign-In. El sistema debe validar las credenciales y redirigir según el rol del usuario.

**Condiciones:**

- El email debe estar registrado en el sistema
- La contraseña debe ser correcta
- El usuario no debe estar deshabilitado
- El inicio de sesión sirve para los apoderados que quieren matricular a sus hijos, el director que quiere ver la cantidad de alumnos matriculados y ejecutar el proceso de matricula y para las promotoras que registran nuevas matriculas.

**Comportamiento Esperado:**

- Si las credenciales son correctas, redirigir según rol:
  - Apoderado → `/parent/dashboard`
  - Administrador → `/admin/dashboard`
  - Promotora → `/promoter/dashboard`
- Si las credenciales son incorrectas, mostrar: "Credenciales inválidas"
- Si hay demasiados intentos fallidos, mostrar: "Demasiados intentos fallidos. Intenta más tarde"

**Excepciones:**

- Si el usuario está deshabilitado, mostrar: "Esta cuenta ha sido deshabilitada"

**Ejemplos:**

- Ejemplo 1: Login exitoso con email válido → Redirección al dashboard correspondiente
- Ejemplo 2: Login con contraseña incorrecta → Error: "Credenciales inválidas"

**Referencias:**

- `src/services/auth.service.ts` - Función `loginWithEmail`
