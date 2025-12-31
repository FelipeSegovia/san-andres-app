import { ComponentProps, FC } from 'react'
import PlaceholderImg from '@/assets/placeholder.svg'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { cn } from '@/lib/utils.ts'
import { LoginForm } from '../organisms'

interface LoginFormData {
  email: string
  password: string
}

export const LoginPage: FC<ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const onGoogleLogin = () => {
    console.log('Login on google')
  }

  const handleSubmitLoginForm = (data: LoginFormData) => {
    console.log('Submit login form', data)
    // Aquí puedes agregar la lógica de autenticación
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm
            onGoogleLogin={onGoogleLogin}
            onSubmit={handleSubmitLoginForm}
          />
          <div className="relative hidden bg-muted md:block">
            <img
              src={PlaceholderImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
