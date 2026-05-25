import { Outlet } from "react-router-dom"
import Header from "./header/header"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
