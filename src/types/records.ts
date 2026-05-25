export type FetchRecords = {
  sigla?: string
  page: number
  limit: number
}

export type RecordsType = {
  id: string
  acronym: string
  name: string
  version: string
  status: "PENDENTE" | "CONCLUIDO" | "ERRO" | "PROCESSANDO"
  createdAt: string
  note: string
  createdBy: { name: string }
}

export type ApiResponse = {
  data: RecordsType[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
