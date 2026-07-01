import { useEffect, useState } from 'react'
import api from '../api/client'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSummary() {
      try {
        const response = await api.get('/dashboard/summary')
        setSummary(response.data)
      } catch (error) {
        console.error(error)
        setError('Nao foi possivel carregar o dashboard.')
      } finally {
        setLoading(false)
      }
    }

    loadSummary()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="text-sm text-slate-600">Carregando dashboard...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Painel operacional do VigIA.
        </p>
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Ocorrencias
          </p>

          <strong className="mt-3 block text-3xl font-bold text-slate-900">
            {summary.occurrences.total}
          </strong>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Viaturas
          </p>

          <strong className="mt-3 block text-3xl font-bold text-slate-900">
            {summary.vehicles.total}
          </strong>

          <p className="mt-2 text-sm text-slate-500">
            {summary.vehicles.active} ativas
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Alertas
          </p>

          <strong className="mt-3 block text-3xl font-bold text-slate-900">
            {summary.alerts.total}
          </strong>

          <p className="mt-2 text-sm text-slate-500">
            {summary.alerts.open} abertos
          </p>
        </div>
      </section>
    </main>
  )
}
