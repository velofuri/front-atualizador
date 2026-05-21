import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { useLogoutMutate } from "@/hooks/useMutate"

export function Header() {
  const location = useLocation()
  const { mutate } = useLogoutMutate()

  const navItems = [
    { label: "Registrar", path: "/form" },
    { label: "Registros", path: "/records" },
  ]

  return (
    <header className="border-b bg-secondary">
      <div className="container mx-auto px-4 py-4">
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
          <div>
            <Link to="/login">
              <Button
                variant="destructive"
                className="px-4"
                onClick={() => mutate()}
              >
                Sair
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
