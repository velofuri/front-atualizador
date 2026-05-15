import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./pages/login"
import MainLayout from "./components/mainLayout"
import FormPage from "./pages/form"
import RecordsPage from "./pages/record"
import { RequireAuth } from "./components/requiredAuth"
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Navigate to="/records" replace />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/records" element={<RecordsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
