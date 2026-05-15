import { LoginForm } from "@/components/login-form"
import { isAuthenticated, login } from "@/service/auth"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    async function checkAuth() {
      const result = await isAuthenticated()
      setAuthenticated(result)
    }
    checkAuth()
  }, [])

  if (authenticated === undefined) return null
  if (authenticated) {
    return <Navigate to="/records" replace />
  }

  const handleLogin = async ({
    user,
    password,
  }: {
    user: string
    password: string
  }) => {
    try {
      await login(user, password)
      navigate("/records")
    } catch (error) {
      alert("Falha na autenticação " + error)
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}
