import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function AppLayout() {
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error(error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('token_type')
      localStorage.removeItem('user')

      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-slate-900">
              VigIA
            </h1>

            <p className="text-sm text-slate-500">
              Painel operacional.
            </p>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/dashboard"
              className="font-medium text-slate-700 hover:text-blue-700"
            >
              Dashboard
            </Link>

            <Link
              to="/ocorrencias"
              className="font-medium text-slate-700 hover:text-blue-700"
            >
              Ocorrencias
            </Link>

            <Link
              to="/viaturas"
              className="font-medium text-slate-700 hover:text-blue-700"
            >
              Viaturas
            </Link>

            <Link
              to="/mapa"
              className="font-medium text-slate-700 hover:text-blue-700"
            >
              Mapa
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-slate-300 px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
