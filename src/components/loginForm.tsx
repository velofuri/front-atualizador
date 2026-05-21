import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface LoginFormProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit: (credentials: { user: string; password: string }) => void
}

export function LoginForm({ className, onSubmit, ...props }: LoginFormProps) {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <h1 className="mx-auto items-center text-3xl font-bold">
        Painel Atualizador-ERP
      </h1>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit({ user, password })
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bem Vindo</h1>
                <p className="text-balance text-muted-foreground">
                  Entre com suas credenciais
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="user">Usuário</FieldLabel>
                <Input
                  id="user"
                  type="text"
                  placeholder="usuário"
                  required
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Entrar</Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/src/assets/lacteus.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
