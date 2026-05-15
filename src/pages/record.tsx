import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetchRecords } from "@/service/api"

type RecordsType = {
  id: string
  sigla: string
  nome: string
  versao: string
  status: "PENDENTE" | "CONCLUIDO" | "ERRO" | "PROCESSANDO"
  createdAt: string
  observacao: string
}

export default function RecordsPage() {
  const [sigla, setSigla] = useState("")
  const [resultados, setResultados] = useState<RecordsType[]>([])
  const [loading, setLoading] = useState(false)

  const handleBuscar = async () => {
    setLoading(true)

    try {
      const records = await fetchRecords(sigla)
      setResultados(records)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro desconhecido")
      setResultados([])
    } finally {
      setLoading(false)
    }
  }

  const statusConfig = {
    CONCLUIDO: {
      variant: "default",
      label: "Concluído",
      className: "bg-green-600 hover:bg-green-700",
    },
    PENDENTE: {
      variant: "secondary",
      label: "Pendente",
      className: "",
    },
    ERRO: { variant: "destructive", label: "Erro", className: "" },
    Processando: {
      variant: "outline",
      label: "Processando",
      className: "animate-pulse",
    },
  } as const
  type StatusKey = keyof typeof statusConfig
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Registros</h1>

      <div className="mx-auto mb-6 flex max-w-56 gap-4">
        <Input
          placeholder="Digite a sigla"
          value={sigla}
          onChange={(e) => setSigla(e.target.value)}
          className="flex-1"
          maxLength={3}
        />
        <Button onClick={handleBuscar} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          {resultados.length === 0 ? (
            <p className="text-muted-foreground">
              {loading ? "Carregando..." : "Nenhum resultado encontrado."}
            </p>
          ) : (
            <ul className="space-y-4">
              {resultados.map((item, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0">
                  <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
                    <div>
                      <strong>Sigla:</strong> {item.sigla.toUpperCase()}
                    </div>
                    <div>
                      <strong>Nome:</strong> {item.nome}
                    </div>
                    <div>
                      <strong>Versão:</strong> {item.versao}
                    </div>
                    <div>
                      <strong>Status:</strong>{" "}
                      <Badge
                        variant={
                          statusConfig[item.status as StatusKey]?.variant ??
                          "default"
                        }
                        className={
                          statusConfig[item.status as StatusKey]?.className
                        }
                      >
                        {statusConfig[item.status as StatusKey]?.label ??
                          item.status}
                      </Badge>
                    </div>
                    <div className="md:col-span-2">
                      <strong>Data:</strong>{" "}
                      {new Date(item.createdAt).toLocaleString("pt-BR")}
                    </div>
                    <div className="md:col-span-2">
                      <strong>Observação:</strong> {item.observacao}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
