import { ComponentProps } from 'react'
import PlaceholderImg from '@/assets/placeholder.svg'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { cn } from '@/lib/utils.ts'
import { RegisterForm } from '../organisms'
import { useRegister } from '@/features/auth/hooks'
import { useErrorMessage } from '@/shared/hooks/use-error-message'
import type { RegisterRequest } from '@/shared/types'

interface RegisterFormData extends RegisterRequest {
  confirmPassword: string
}

export const RegisterPage = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  const registerMutation = useRegister()

  const handleSubmitRegisterForm = async (data: RegisterFormData) => {
    // Extraer confirmPassword antes de enviar
    const { confirmPassword, ...registerData } = data
    return new Promise<void>((resolve, reject) => {
      registerMutation.mutate(registerData, {
        onSuccess: () => resolve(),
        onError: (error) => reject(error),
      })
    })
  }

  // Extraer mensaje de error de la mutación usando hook reutilizable
  const errorMessage = useErrorMessage(registerMutation.error)

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <RegisterForm
            onSubmit={handleSubmitRegisterForm}
            error={errorMessage}
          />
          <div className="relative hidden bg-muted md:block">
            <img
              src={PlaceholderImg}
              alt="placeholder register"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
