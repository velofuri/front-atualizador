import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchRecords } from "@/service/api"

import { Loader2 } from "lucide-react"

import type { RecordsType } from "@/types/records"
import { toast } from "sonner"
import { PaginationControls } from "@/components/pagination"
import RecordsDataTable from "@/components/recordsDatatable"

export default function RecordsPage() {
  const [sigla, setSigla] = useState("")
  const [resultados, setResultados] = useState<RecordsType[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleBuscar()
  }, [page, limit])

  const handleBuscar = async () => {
    setLoading(true)
    try {
      const records = await fetchRecords({ sigla, limit, page })
      setResultados(records.data)
      setTotalPages(records.meta.totalPages)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erro desconhecido")
      setResultados([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!loading) {
      handleBuscar()
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Registros</h1>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-6 flex max-w-80 gap-4"
        >
          <Input
            placeholder="Digite a sigla"
            value={sigla}
            onChange={(e) => setSigla(e.target.value)}
            className="flex-1"
            maxLength={3}
          />
          <Button type="submit" disabled={loading} className="w-24">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando
              </>
            ) : (
              "Buscar"
            )}
          </Button>
        </form>

        <RecordsDataTable records={resultados} />
      </div>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        limit={limit}
        onPageChange={handlePageChange}
        onLimitChange={(newLimit) => {
          setLimit(newLimit)
          setPage(1)
        }}
      />
    </>
  )
}
