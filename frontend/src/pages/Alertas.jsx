import { useEffect, useMemo, useState } from 'react'
import api from '../api/client'

const statusOptions = [
  { value: 'aberto', label: 'Aberto' },
  { value: 'visualizado', label: 'Visualizado' },
  { value: 'resolvido', label: 'Resolvido' },
]

const severityOptions = [
  { value: 'baixo', label: 'Baixo' },
  { value: 'medio', label: 'Medio' },
  { value: 'alto', label: 'Alto' },
  { value: 'critico', label: 'Critico' },
]

const typeOptions = [
  { value: 'padrao_semelhante', label: 'Padrao semelhante' },
  { value: 'prioridade_critica', label: 'Prioridade critica' },
  { value: 'area_risco', label: 'Area de risco' },
]

const statusLabels = Object.fromEntries(
  statusOptions.map((status) => [status.value, status.label]),
)

const severityLabels = Object.fromEntries(
  severityOptions.map((severity) => [severity.value, severity.label]),
)

const typeLabels = Object.fromEntries(
  typeOptions.map((type) => [type.value, type.label]),
)

function buildParams(filters) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== ''),
  )
}

function formatDate(value) {
  if (!value) {
    return 'Nao informado'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

function severityBadgeClass(severity) {
  const classes = {
    baixo: 'bg-green-100 text-green-800',
    medio: 'bg-yellow-100 text-yellow-800',
    alto: 'bg-orange-100 text-orange-800',
    critico: 'bg-red-100 text-red-800',
  }

  return classes[severity] ?? 'bg-slate-100 text-slate-700'
}

function statusBadgeClass(status) {
  const classes = {
    aberto: 'bg-blue-100 text-blue-800',
    visualizado: 'bg-slate-100 text-slate-700',
    resolvido: 'bg-green-100 text-green-800',
  }

  return classes[status] ?? 'bg-slate-100 text-slate-700'
}

export default function Alertas() {
  const [alerts, setAlerts] = useState([])
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    type: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAlerts() {
      setLoading(true)
      setError('')

      try {
        const response = await api.get('/alerts', {
          params: buildParams(filters),
        })

        setAlerts(response.data.data ?? response.data)
      } catch (error) {
        console.error(error)
        setError('Nao foi possivel carregar os alertas.')
      } finally {
        setLoading(false)
      }
    }

    loadAlerts()
  }, [filters])

  const totals = useMemo(() => {
    return {
      total: alerts.length,
      open: alerts.filter((alert) => alert.status === 'aberto').length,
      critical: alerts.filter((alert) => alert.severity === 'critico').length,
    }
  }, [alerts])

  function handleFilterChange(event) {
    const { name, value } = event.target

    setFilters((currentFilters) => ({
      ...currentFilters,
      [name]: value,
    }))
  }

  function clearFilters() {
    setFilters({
      status: '',
      severity: '',
      type: '',
    })
  }

  if (loading) {
    return <p className="text-sm text-slate-600">Carregando alertas...</p>
  }

  if (error) {
    return (
      <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </p>
    )
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Alertas
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Alertas operacionais gerados por regras, IA e dados simulados.
          </p>
        </div>
      </div>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Alertas exibidos
          </p>

          <strong className="mt-3 block text-3xl font-bold text-slate-900">
            {totals.total}
          </strong>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Abertos
          </p>

          <strong className="mt-3 block text-3xl font-bold text-blue-700">
            {totals.open}
          </strong>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-600">
            Criticos
          </p>

          <strong className="mt-3 block text-3xl font-bold text-red-700">
            {totals.critical}
          </strong>
        </div>
      </section>

      <section className="mt-6 grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4">
        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Status
          </span>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todos</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Severidade
          </span>

          <select
            name="severity"
            value={filters.severity}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todas</option>
            {severityOptions.map((severity) => (
              <option key={severity.value} value={severity.value}>
                {severity.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Tipo
          </span>

          <select
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-700"
          >
            <option value="">Todos</option>
            {typeOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Limpar filtros
          </button>
        </div>
      </section>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-3 font-medium">Severidade</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Tipo</th>
              <th className="px-6 py-3 font-medium">Titulo</th>
              <th className="px-6 py-3 font-medium">Ocorrencia</th>
              <th className="px-6 py-3 font-medium">Origem</th>
              <th className="px-6 py-3 font-medium">Criado em</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${severityBadgeClass(alert.severity)}`}>
                    {severityLabels[alert.severity] ?? alert.severity}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadgeClass(alert.status)}`}>
                    {statusLabels[alert.status] ?? alert.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {typeLabels[alert.type] ?? alert.type}
                </td>

                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900">
                    {alert.title}
                  </p>

                  <p className="mt-1 max-w-md text-xs text-slate-500">
                    {alert.description}
                  </p>
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {alert.occurrence ? (
                    <div>
                      <p className="font-medium text-slate-900">
                        {alert.occurrence.code}
                      </p>

                      <p className="text-xs text-slate-500">
                        {alert.occurrence.region?.name ?? 'Regiao nao informada'}
                      </p>
                    </div>
                  ) : (
                    'Nao vinculada'
                  )}
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {alert.generated_by}
                </td>

                <td className="px-6 py-4 text-slate-700">
                  {formatDate(alert.created_at)}
                </td>
              </tr>
            ))}

            {alerts.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-sm text-slate-500">
                  Nenhum alerta encontrado para os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
