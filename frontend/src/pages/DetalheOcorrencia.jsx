import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../api/client'

function formatStatus(status) {
  if (!status) {
    return 'Nao informado'
  }

  return status.replaceAll('_', ' ')
}

function statusClasses(status) {
  const classes = {
    aberta: 'border-blue-200 bg-blue-50 text-blue-700',
    em_atendimento: 'border-amber-200 bg-amber-50 text-amber-700',
    finalizada: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    cancelada: 'border-red-200 bg-red-50 text-red-700',
  }

  return (
    classes[status] ??
    'border-slate-200 bg-slate-50 text-slate-700'
  )
}

export default function DetalheOcorrencia() {
  const { id } = useParams()

  const [occurrence, setOccurrence] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadOccurrence() {
      try {
        setLoading(true)
        setError('')

        const response = await api.get(`/occurrences/${id}`)

        if (active) {
          setOccurrence(response.data)
        }
      } catch (requestError) {
        console.error(requestError)

        if (!active) {
          return
        }

        if (requestError.response?.status === 404) {
          setError('A ocorrencia informada nao foi encontrada.')
        } else {
          setError('Nao foi possivel carregar os dados da ocorrencia.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadOccurrence()

    return () => {
      active = false
    }
  }, [id])

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Carregando detalhes da ocorrencia...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Link
          to="/ocorrencias"
          className="text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          Voltar para ocorrencias
        </Link>

        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-800">
            Nao foi possivel exibir a ocorrencia
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      </div>
    )
  }

  if (!occurrence) {
    return null
  }

  return (
    <div>
      <Link
        to="/ocorrencias"
        className="text-sm font-medium text-blue-700 hover:text-blue-900"
      >
        ← Voltar para ocorrencias
      </Link>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {occurrence.code ?? `Ocorrencia #${occurrence.id}`}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            {occurrence.title ?? 'Ocorrencia sem titulo'}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Identificador: {occurrence.id}
          </p>
        </div>

        <span
          className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-medium capitalize ${statusClasses(
            occurrence.status,
          )}`}
        >
          {formatStatus(occurrence.status)}
        </span>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Descricao
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {occurrence.description || 'Nenhuma descricao foi informada.'}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Status atual
          </p>

          <p className="mt-2 text-base font-semibold capitalize text-slate-900">
            {formatStatus(occurrence.status)}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            Prioridade sugerida
          </p>

          <p className="mt-2 text-base font-semibold capitalize text-slate-900">
            {occurrence.ai_priority ?? 'Nao definida'}
          </p>
        </div>
      </div>
    </div>
  )
}