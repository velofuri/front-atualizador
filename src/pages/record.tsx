import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { PaginationControls } from "@/components/records/pagination"
import RecordsDataTable from "@/components/records/recordsDatatable"
import { useGetRecords } from "@/hooks/useData"

export default function RecordsPage() {
  const [sigla, setSigla] = useState("")
  const [siglaInput, setSiglaInput] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { data: resultados, isLoading: loading } = useGetRecords({
    sigla,
    page,
    limit,
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setPage(1)
    setSigla(siglaInput)
  }

  function handlePageChange(page: number) {
    const totalPages = resultados?.meta.totalPages ?? 1
    if (page >= 1 && page <= totalPages) {
      setPage(page)
    }
  }

  return (
    <>
      <div className="mx-auto max-w-5/6 p-6 select-none">
        <h1 className="mb-6 text-2xl font-bold">Registros</h1>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-6 flex max-w-80 gap-4"
        >
          <Input
            placeholder="Digite a sigla"
            value={siglaInput}
            onChange={(e) => setSiglaInput(e.target.value)}
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

        <RecordsDataTable records={resultados?.data ?? []} />
      </div>
      <PaginationControls
        page={page}
        totalPages={resultados?.meta.totalPages ?? 1}
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
