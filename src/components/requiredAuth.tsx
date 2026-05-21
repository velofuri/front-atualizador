import { Navigate, useLocation } from "react-router-dom"
import { type JSX } from "react"
import { useAuthenticated } from "@/hooks/useData"

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation()
  const { data: authenticated, isLoading } = useAuthenticated()

  if (isLoading) {
    return null
  }

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
