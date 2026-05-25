import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type PaginationProps = {
  page: number
  totalPages: number
  limit: number

  onPageChange: (page: number) => void
  onLimitChange: (page: number) => void
}

export function PaginationControls({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-6">
      <Select
        value={String(limit)}
        onValueChange={(value) => {
          onLimitChange(Number(value))
        }}
      >
        <SelectTrigger className="w-18">
          <SelectValue placeholder="Limite" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div>
        <Pagination>
          <PaginationContent>
            {/* Botão Voltar */}
            <PaginationItem>
              <PaginationPrevious
                text="Anterior"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page - 1)
                }}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    onClick={(e) => {
                      e.preventDefault()
                      onPageChange(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Botão Avançar */}
            <PaginationItem>
              <PaginationNext
                text="Próximo"
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page + 1)
                }}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
