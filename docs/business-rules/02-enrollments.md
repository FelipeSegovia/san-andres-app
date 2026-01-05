# Matrículas - Reglas de Negocio

## Descripción General

Este documento define las reglas de negocio relacionadas con el proceso de matrícula de alumnos en la Escuela San Andrés.

## Reglas

### BR-ENROLL-001: Creación de Matrícula por Apoderado

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Portal de Apoderados

**Descripción:**
Un apoderado puede crear una nueva matrícula para su hijo/a completando un formulario con datos del estudiante, datos del apoderado, y subiendo documentación requerida.

**Condiciones:**

- El apoderado debe estar autenticado
- Todos los campos obligatorios deben estar completos
- Los documentos requeridos deben ser subidos
- El RUT del estudiante debe ser válido y único en el sistema
- El estudiante no debe tener una matrícula activa previa

**Comportamiento Esperado:**

- Al completar el formulario, la matrícula se crea con estado "Pendiente"
- El apoderado puede ver su matrícula en "Mis Matrículas"
- Se envía una notificación a la administradora
- El apoderado puede editar la matrícula mientras esté en estado "Pendiente"

**Excepciones:**

- Si el RUT ya existe, mostrar error: "Este estudiante ya tiene una matrícula registrada"
- Si faltan documentos, permitir guardar como borrador pero no enviar

**Ejemplos:**

- Ejemplo 1: Apoderado completa formulario y sube documentos → Matrícula creada con estado "Pendiente"
- Ejemplo 2: Apoderado intenta matricular estudiante con RUT duplicado → Error de validación

---

### BR-ENROLL-002: Revisión de Matrícula por Administradora

**Prioridad:** Alta
**Estado:** Activa
**Aplicable a:** Portal de Administración

**Descripción:**
La directora puede revisar las matrículas pendientes, aprobarlas o rechazarlas, y solicitar información adicional.

**Condiciones:**

- Solo usuarios con rol "Administrador" pueden revisar matrículas
- La matrícula debe estar en estado "Pendiente" o "En Revisión"
- Todos los documentos deben estar presentes para aprobar

**Comportamiento Esperado:**

- La administradora puede ver lista de matrículas pendientes
- Puede ver detalles completos de cada matrícula
- Puede aprobar → Estado cambia a "Aprobada"
- Puede rechazar → Estado cambia a "Rechazada" con motivo
- Puede solicitar cambios → Estado cambia a "Requiere Cambios" con comentarios

**Excepciones:**

- Si faltan documentos, no se puede aprobar, solo solicitar cambios

**Ejemplos:**

- Ejemplo 1: Administradora revisa matrícula completa → Aprueba → Estado "Aprobada"
- Ejemplo 2: Administradora encuentra documento faltante → Solicita cambios → Estado "Requiere Cambios"

---

### BR-ENROLL-003: Registro de Matrícula por Promotora

**Prioridad:** Media
**Estado:** Activa
**Aplicable a:** Portal de Promotoras

**Descripción:**
Las promotoras pueden registrar matrículas captadas con datos básicos del apoderado y estudiante.

**Condiciones:**

- La promotora debe estar autenticada
- Debe proporcionar datos de contacto del apoderado
- La matrícula se crea con estado "Captada por Promotora"

**Comportamiento Esperado:**

- La matrícula aparece en el panel de estadísticas de la promotora
- El apoderado recibe notificación para completar su registro
- La matrícula queda vinculada a la promotora para seguimiento

**Excepciones:**

- Si el apoderado ya existe, se vincula la matrícula al apoderado existente

**Ejemplos:**

- Ejemplo 1: Promotora registra matrícula captada → Aparece en estadísticas → Apoderado recibe invitación
