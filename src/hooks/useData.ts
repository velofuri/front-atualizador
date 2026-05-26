import { fetchRecords, getFileList } from "@/service/api"
import { isAuthenticated } from "@/service/auth"
import type { FetchRecords } from "@/types/records"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export function useFileListData() {
  const query = useQuery<string[]>({
    queryKey: ["fileList"],
    queryFn: getFileList,
  })

  return query
}

export function useGetRecords({ sigla, page, limit }: FetchRecords) {
  const query = useQuery({
    queryKey: ["getRecords", sigla, page, limit],
    queryFn: () => fetchRecords({ sigla, page, limit }),
    placeholderData: keepPreviousData,
  })

  return query
}

export function useAuthenticated() {
  return useQuery({
    queryKey: ["authenticated"],
    queryFn: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: false,
  })
}
