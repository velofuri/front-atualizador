import { queryClient } from "@/lib/reactQuery"
import { createRecord, uploadArquivo } from "@/service/api"
import { changePassword, login, logout } from "@/service/auth"
import { useMutation } from "@tanstack/react-query"

export function useRegisterMutate() {
  const mutate = useMutation({
    mutationFn: createRecord,
  })

  return mutate
}

export function useUploadFileMutate() {
  const mutate = useMutation({
    mutationFn: uploadArquivo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fileList"] })
    },
  })

  return mutate
}

export function useLoginMutate() {
  return useMutation({
    mutationFn: ({ user, password }: { user: string; password: string }) =>
      login(user, password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authenticated"],
      })
    },
  })
}

export function useLogoutMutate() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authenticated"],
      })
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: ({ password }: { password: string }) =>
      changePassword(password),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authenticated"],
      })
    },
  })
}
