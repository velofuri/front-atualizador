import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { useLogoutMutate } from "@/hooks/useMutate"
import { useAuthenticated } from "@/hooks/useData"
import { ChangePasswordDialog } from "./changePassword"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useState } from "react"

export function Header() {
  const location = useLocation()
  const { mutate } = useLogoutMutate()
  const { data } = useAuthenticated()
  const [openChangePassword, setOpenChangePassword] = useState(false)

  const navItems = [
    { label: "Registrar", path: "/form" },
    { label: "Registros", path: "/records" },
  ]

  return (
    <header className="border-b bg-secondary select-none">
      <div className="container mx-auto max-w-5/6 px-4 py-4">
        <nav className="flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xl font-bold">Atualizador</div>
            <div className="flex items-center gap-2 pl-10">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={
                      location.pathname === item.path ? "default" : "ghost"
                    }
                    className="px-4"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
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
                      {/* O item do menu agora apenas altera o estado para abrir o modal */}
                      <DropdownMenuItem
                        onSelect={() => setOpenChangePassword(true)}
                      >
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
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
