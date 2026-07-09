import { useEffect, useState } from 'react'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import api from '../api/client'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
)

const chartColors = [
  '#2563eb',
  '#16a34a',
  '#ca8a04',
  '#ea580c',
  '#dc2626',
  '#7c3aed',
  '#0891b2',
  '#475569',
]

function chartData(items = [], labelKey, label) {
  return {
    labels: items.map((item) => item[labelKey]),
    datasets: [
      {
        label,
        data: items.map((item) => Number(item.total)),
        backgroundColor: chartColors,
        borderWidth: 1,
      },
    ],
  }
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const barOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0,
      },
    },
  },
}

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

  const priorityData = chartData(
    summary.occurrences.by_priority,
    'ai_priority',
    'Ocorrencias por prioridade',
  )

  const typeData = chartData(
    summary.occurrences.by_type,
    'name',
    'Ocorrencias por tipo',
  )

  const regionData = chartData(
    summary.occurrences.by_region,
    'name',
    'Ocorrencias por regiao',
  )

  const vehicleStatusData = chartData(
    summary.vehicles.by_status,
    'status',
    'Viaturas por status',
  )

  const alertSeverityData = chartData(
    summary.alerts.by_severity,
    'severity',
    'Alertas por severidade',
  )

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

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Ocorrencias por prioridade
          </h2>

          <div className="mt-4 h-72">
            <Doughnut data={priorityData} options={chartOptions} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Viaturas por status
          </h2>

          <div className="mt-4 h-72">
            <Doughnut data={vehicleStatusData} options={chartOptions} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Ocorrencias por tipo
          </h2>

          <div className="mt-4 h-80">
            <Bar data={typeData} options={barOptions} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Ocorrencias por regiao
          </h2>

          <div className="mt-4 h-80">
            <Bar data={regionData} options={barOptions} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-900">
            Alertas por severidade
          </h2>

          <div className="mt-4 h-72">
            <Bar data={alertSeverityData} options={barOptions} />
          </div>
        </div>
      </section>
    </main>
  )
}
