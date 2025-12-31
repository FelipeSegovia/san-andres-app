import { ComponentProps } from 'react'
import PlaceholderImg from '@/assets/placeholder.svg'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { cn } from '@/lib/utils.ts'
import { RegisterForm } from '../organisms'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterPage = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  const handleSubmitRegisterForm = (data: RegisterFormData) => {
    console.log('Submit register form', data)
    // Aquí puedes agregar la lógica de registro
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <RegisterForm onSubmit={handleSubmitRegisterForm} />
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
