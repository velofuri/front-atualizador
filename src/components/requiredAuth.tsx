import { Navigate, useLocation } from "react-router-dom"
import { isAuthenticated } from "@/service/auth"
import { useEffect, useState, type JSX } from "react"

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
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
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
