import { LoginForm } from "@/components/login/loginForm"
import { useAuthenticated } from "@/hooks/useData"
import { useLoginMutate } from "@/hooks/useMutate"
import { Loader } from "lucide-react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export default function LoginPage() {
  const navigate = useNavigate()
  const { data: authenticated, isLoading } = useAuthenticated()
  const { mutate, isPending } = useLoginMutate()

  if (isLoading) {
    return <Loader />
  }

  if (authenticated) {
    return <Navigate to="/records" replace />
  }

  function handleLogin({ user, password }: { user: string; password: string }) {
    mutate(
      { user, password },
      {
        onSuccess: () => {
          navigate("/records")
        },
        onError: (error) => {
          toast.error("Falha na autenticação " + error.message)
        },
      }
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm select-none md:max-w-4xl">
        <LoginForm onSubmit={handleLogin} isPending={isPending} />
      </div>
    </div>
  )
}
