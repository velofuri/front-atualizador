export type FetchRecords = {
  sigla?: string
  page: number
  limit: number
}

export type RecordsType = {
  id: string
  sigla: string
  nome: string
  versao: string
  status: "PENDENTE" | "CONCLUIDO" | "ERRO" | "PROCESSANDO"
  createdAt: string
  observacao: string
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
