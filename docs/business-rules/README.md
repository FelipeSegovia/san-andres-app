# Reglas de Negocio - Escuela San Andrés

## Índice

- [Autenticación](./01-authentication.md)
- [Matrículas](./02-enrollments.md)
- [Roles y Permisos](./03-roles-permissions.md)
- [Documentos](./04-documents.md)
- [Promotoras](./05-promoters.md)
- [Validaciones](./06-validation.md)

## Convenciones

### Formato de IDs

- `BR-[DOMINIO]-[NÚMERO]`: Identificador único de regla
- Ejemplo: `BR-AUTH-001`, `BR-ENROLL-002`

### Prioridades

- **Alta**: Crítica para el funcionamiento del sistema
- **Media**: Importante pero no bloqueante
- **Baja**: Mejora o optimización

### Estados

- **Activa**: Regla implementada y en producción
- **En Desarrollo**: Regla planificada o en implementación
- **Deprecada**: Regla obsoleta que ya no aplica

## Cómo agregar nuevas reglas

1. Identifica el dominio (AUTH, ENROLL, DOCS, etc.)
2. Asigna el siguiente número disponible
3. Completa todos los campos del formato estándar
4. Agrega referencias al código relacionado
5. Actualiza este README con el nuevo enlace
