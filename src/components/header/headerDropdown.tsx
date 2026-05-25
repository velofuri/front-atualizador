import { useAuthenticated } from "@/hooks/useData"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useLogoutMutate } from "@/hooks/useMutate"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { ChangePasswordDialog } from "./changePassword"

export function HeaderDropDown() {
  const { data } = useAuthenticated()
  const { mutate } = useLogoutMutate()
  const [openChangePassword, setOpenChangePassword] = useState(false)

  return (
    <div className="text-sm text-muted-foreground">
      {data?.name ? (
        <>
          <DropdownMenu>
            <span className="text-lg">Olá, </span>
            <DropdownMenuTrigger asChild>
              <button className="cursor-pointer">
                <strong className="text-xl font-semibold text-foreground">
                  {data.name.split(" ")[0]}
                </strong>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setOpenChangePassword(true)}>
                Alterar senha
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="max-h-1 text-red-500"
                    onClick={() => mutate()}
                  >
                    Sair
                  </Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ChangePasswordDialog
            open={openChangePassword}
            onOpenChange={setOpenChangePassword}
          />
        </>
      ) : (
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      )}
    </div>
  )
}
