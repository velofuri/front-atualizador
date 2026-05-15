import { env } from "@/lib/env"
import type { FormValues } from "@/pages/form"

const api_url = env.VITE_API_URL

export async function createRecord(payload: FormValues) {
  const response = await fetch(`${api_url}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message ?? "Falha ao criar registro")
  }

  return data
}

export async function fetchRecords(sigla?: string) {
  const trimmed = sigla?.trim()

  const url = trimmed
    ? `${api_url}/records/${encodeURIComponent(trimmed)}`
    : `${api_url}/update`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message ?? "Falha ao buscar registros")
  }

  return data
}

export async function uploadArquivo(arquivo: File) {
  const formData = new FormData()
  formData.append("arquivo", arquivo)
  const response = await fetch(`${api_url}/upload/file`, {
    method: "POST",
    body: formData,
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.message ?? `Erro HTTP ${response.status}`)
  }

  return await response.json()
}
