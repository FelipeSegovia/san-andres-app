import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { PATHS } from '@/shared/types/paths.types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void
  error?: string | null
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  error,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>()

  return (
    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Crea una cuenta</h1>
          <p className="text-balance text-muted-foreground">Registrate</p>
        </div>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        <div className="flex flex-row gap-2 mt-6">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              {...register('firstName', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 2,
                  message: 'El nombre debe tener al menos 2 caracteres',
                },
              })}
            />
            <div className="min-h-[20px]">
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Apellido</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register('lastName', {
                required: 'El apellido es requerido',
                minLength: {
                  value: 2,
                  message: 'El apellido debe tener al menos 2 caracteres',
                },
              })}
            />
            <div className="min-h-[20px]">
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email', {
              required: 'El correo electrónico es requerido',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Correo electrónico inválido',
              },
            })}
          />
          <div className="min-h-[20px]">
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
          />
          <div className="min-h-[20px]">
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-2 mb-6">
          <Label htmlFor="confirmPassword">Repetir contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Por favor confirma tu contraseña',
              validate: (value) =>
                value === watch('password') || 'Las contraseñas no coinciden',
            })}
          />
          <div className="min-h-[20px]">
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </Button>
        <div className="text-center text-sm">
          Ya tienes una cuenta?{' '}
          <Link to={PATHS.AUTH} className="underline underline-offset-4">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </form>
  )
}
