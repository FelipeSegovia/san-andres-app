import { ComponentProps, FC } from "react";
import PlaceholderImg from "@/assets/placeholder.svg";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { LoginForm } from "../organisms";
import { useLogin } from "@/features/auth/hooks";
import { useErrorMessage } from "@/shared/hooks/use-error-message";
import type { LoginRequest } from "@/shared/types";

export const LoginPage: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  const loginMutation = useLogin();

  const handleSubmitLoginForm = async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data).catch((error) => {
      console.error(error);
    });
    // La navegación se maneja en el hook useLogin
  };

  // Extraer mensaje de error de la mutación usando hook reutilizable
  const errorMessage = useErrorMessage(loginMutation.error);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm onSubmit={handleSubmitLoginForm} error={errorMessage} />
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
  );
};
