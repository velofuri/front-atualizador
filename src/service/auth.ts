import { env } from "@/lib/env"

const API_URL = env.VITE_API_URL
const AUTH_KEY = "isAuthenticated"

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || "Erro ao autenticar")
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, "true")
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY)
  }

  return fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  })
}

export async function isAuthenticated() {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Não autorizado")
  }
  const result = await response.json()
  return result
}

export async function changePassword(password: string) {
  const response = await fetch(`${API_URL}/auth/changepass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.message || "Erro ao redefinir senha")
  }

  return response
}
