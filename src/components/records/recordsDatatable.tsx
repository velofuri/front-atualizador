import type { RecordsType } from "@/types/records"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./datatable"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "../ui/badge"

const statusConfig = {
  CONCLUIDO: {
    variant: "default",
    label: "Concluído",
    className: "bg-green-600 hover:bg-green-700 text-white border-transparent",
  },
  PENDENTE: {
    variant: "secondary",
    label: "Pendente",
    className: "",
  },
  ERRO: {
    variant: "destructive",
    label: "Erro",
    className: "",
  },
  Processando: {
    variant: "outline",
    label: "Processando",
    className: "animate-pulse bg-background text-foreground",
  },
} as const

const columns: ColumnDef<RecordsType>[] = [
  {
    accessorKey: "acronym",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sigla
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original } }) => (
      <div className="font-mono font-medium tracking-wider text-muted-foreground uppercase">
        {original.acronym}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original } }) => (
      <div className="max-w-52 truncate font-medium">{original.name}</div>
    ),
  },
  {
    accessorKey: "version",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Versão
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original } }) => (
      <div className="w-fit rounded border bg-muted px-2 py-0.5 font-mono text-xs">
        v{original.version}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original } }) => {
      const status = original.status as keyof typeof statusConfig
      const config = statusConfig[status]

      if (!config) {
        return <Badge variant="outline">{original.status}</Badge>
      }

      return (
        <Badge variant={config.variant} className={config.className}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "note",
    header: "Obs",
    cell: ({ row: { original } }) => (
      <div className="max-w-72 truncate text-sm text-foreground">
        {original.note || (
          <span className="text-muted-foreground/40 italic">
            Sem observações
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-4 h-8"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original } }) => {
      if (!original.createdAt)
        return <div className="text-muted-foreground/40">-</div>

      // Formatação nativa do JavaScript (DD/MM/AAAA HH:mm)
      const dataFormatada = new Date(original.createdAt).toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      )

      return (
        <div className="font-variant-numeric-tabular-nums text-muted-foreground">
          {dataFormatada}
        </div>
      )
    },
  },
  {
    accessorKey: "createdBy",
    header: "Criado Por",
    cell: ({ row: { original } }) => (
      <div className="max-w-72 truncate text-sm text-muted-foreground">
        {original.createdBy.name.split(" ")[0]}
      </div>
    ),
  },
]

type RecordsDataTableProps = {
  records: RecordsType[]
}
export default function RecordsDataTable({ records }: RecordsDataTableProps) {
  return <DataTable columns={columns} data={records} />
}
