# Instrucciones de Herramientas de Desarrollo

## Gestor de Paquetes
- **Gestor**: pnpm
- **Motivo**: Optimización de espacio en disco y velocidad de instalación
- **Uso**: Siempre usar `pnpm` en lugar de npm o yarn

## Stack Tecnológico

### Framework y Build
- **Vite**: 6.2.0 - Build tool y dev server
- **React**: 19.0.0 - Biblioteca UI
- **TypeScript**: 5.7.2 - Tipado estático
- **@vitejs/plugin-react-swc**: 3.8.0 - Compilación rápida con SWC

### Estilos
- **Tailwind CSS**: 4.1.18 - Framework CSS utility-first
- **@tailwindcss/vite**: 4.1.18 - Plugin de Vite para Tailwind
- **tailwind-merge**: 3.4.0 - Utilidad para merge de clases
- **class-variance-authority**: 0.7.1 - Variants para componentes
- **tw-animate-css**: 1.4.0 - Animaciones con Tailwind

### UI Components
- **Radix UI**: Componentes accesibles headless
- **lucide-react**: 0.562.0 - Iconos
- **react-icons**: 5.5.0 - Biblioteca de iconos adicional

### Routing
- **react-router-dom**: 7.10.1 - Manejo de rutas

### State Management
- **zustand**: 5.0.9 - Estado global ligero

### Data Fetching
- **@tanstack/react-query**: 5.90.12 - Manejo de estado del servidor
- **@tanstack/react-query-devtools**: 5.91.1 - DevTools para React Query
- **axios**: 1.13.2 - Cliente HTTP

### Forms & Validation
- **react-hook-form**: 7.68.0 - Manejo de formularios
- **joi**: 18.0.2 - Validación de esquemas

### Code Quality
- **Biome**: 2.3.9 - Linter y formatter rápido (reemplaza ESLint + Prettier)


### Configuración TypeScript
- Usa `tsconfig.json` como configuración base
- `tsconfig.app.json` para el código de aplicación
- `tsconfig.node.json` para scripts de Node/Vite

### Estructura de Importaciones
- Preferir imports absolutos cuando sea posible
- Usar alias de path si están configurados en tsconfig
- Ordenar imports: externos → internos → relativos

## Entorno de Desarrollo

### Puerto Predeterminado
- Dev server: Puerto 5173 (Vite default)
- Preview: Puerto 4173 (Vite default)

### Variables de Entorno
- Prefijo requerido: `VITE_` para variables accesibles en el cliente
- Archivo: `.env.local` (no commiteado)
- Tipos: Definir en `src/vite-env.d.ts`

### Hot Module Replacement
- Habilitado por defecto en modo desarrollo
- React Fast Refresh habilitado via @vitejs/plugin-react-swc

## Notas Importantes
- **NO usar npm o yarn**: Siempre usar pnpm
- **Biome en lugar de ESLint/Prettier**: El proyecto usa Biome para linting y formateo
- **React 19**: Versión más reciente con nuevas características
- **TypeScript estricto**: Mantener configuración strict habilitada
- **Componentes Radix UI**: Preferir estos para componentes accesibles
