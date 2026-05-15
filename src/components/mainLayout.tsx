import { Outlet } from "react-router-dom"
import Header from "./header"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        {/* É aqui que as páginas (rotas filhas) vão aparecer */}
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
