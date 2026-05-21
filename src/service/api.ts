import { env } from "@/lib/env"
import type { FormValues } from "@/pages/form"
import type { ApiResponse, FetchRecords } from "@/types/records"

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

export async function fetchRecords({
  sigla,
  page,
  limit,
}: FetchRecords): Promise<ApiResponse> {
  const trimmed = sigla?.trim()

  const params = new URLSearchParams()
  params.set("page", String(page))
  params.set("limit", String(limit))
  if (trimmed) {
    params.set("acronym", trimmed)
  }

  const url = `${api_url}/update?${params.toString()}`

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

export async function getFileList() {
  const response = await fetch(`${api_url}/files`, {
    method: "GET",
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error?.message ?? `Erro HTTP ${response.status}`)
  }

  return await response.json()
}
