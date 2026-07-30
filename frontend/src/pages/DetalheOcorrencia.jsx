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

function alertSeverityClasses(severity) {
  const classes = {
    baixo: 'border-blue-200 bg-blue-50 text-blue-700',
    medio: 'border-amber-200 bg-amber-50 text-amber-700',
    alto: 'border-orange-200 bg-orange-50 text-orange-700',
    critico: 'border-red-200 bg-red-50 text-red-700',
  }

  return (
    classes[severity] ??
    'border-slate-200 bg-slate-50 text-slate-700'
  )
}

function formatDateTime(value) {
  if (!value) {
    return 'Nao informada'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date)
}

function formatPercentage(value) {
  if (value == null || value === '') {
    return 'Nao informada'
  }

  const number = Number(value)

  if (Number.isNaN(number)) {
    return value
  }

  return `${new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 2,
  }).format(number)}%`
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

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/ocorrencias/${occurrence.id}/editar`}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Editar ocorrencia
          </Link>

          <span
            className={`inline-flex w-fit rounded-full border px-3 py-1 text-sm font-medium capitalize ${statusClasses(
              occurrence.status,
            )}`}
          >
            {formatStatus(occurrence.status)}
          </span>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Descricao
        </h2>

        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
          {occurrence.description || 'Nenhuma descricao foi informada.'}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Dados operacionais
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Status</p>
            <p className="mt-2 font-semibold capitalize text-slate-900">
              {formatStatus(occurrence.status)}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Tipo da ocorrencia
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {occurrence.occurrence_type?.name ?? 'Nao informado'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Regiao</p>
            <p className="mt-2 font-semibold text-slate-900">
              {occurrence.region?.name ?? 'Nao informada'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {occurrence.region
                ? `${occurrence.region.city}/${occurrence.region.state}`
                : ''}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Gravidade informada
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {occurrence.informed_severity ?? 'Nao informada'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Prioridade humana
            </p>
            <p className="mt-2 font-semibold capitalize text-slate-900">
              {occurrence.human_priority ?? 'Nao definida'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Prioridade da IA
            </p>
            <p className="mt-2 font-semibold capitalize text-slate-900">
              {occurrence.ai_priority ?? 'Nao definida'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Data da ocorrencia
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {formatDateTime(occurrence.occurred_at)}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Tempo de resposta
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {occurrence.response_time_minutes != null
                ? `${occurrence.response_time_minutes} minutos`
                : 'Nao informado'}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Responsavel pelo cadastro
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {occurrence.created_by?.name ?? 'Nao informado'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {occurrence.created_by?.email ?? ''}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Localizacao
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">Latitude</p>
            <p className="mt-1 text-slate-900">
              {occurrence.latitude ?? 'Nao informada'}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">Longitude</p>
            <p className="mt-1 text-slate-900">
              {occurrence.longitude ?? 'Nao informada'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Historico de previsoes da IA
        </h2>

        {occurrence.ai_predictions?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {occurrence.ai_predictions.map((prediction) => (
              <article
                key={prediction.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Prioridade sugerida
                    </p>
                    <p className="mt-1 text-lg font-semibold capitalize text-slate-900">
                      {prediction.predicted_priority ?? 'Nao definida'}
                    </p>
                  </div>

                  <p className="text-sm text-slate-500">
                    {formatDateTime(prediction.created_at)}
                  </p>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Modelo
                    </p>
                    <p className="mt-1 break-words text-slate-900">
                      {prediction.model_name ?? 'Nao informado'}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Pontuacao de risco
                    </p>
                    <p className="mt-1 text-slate-900">
                      {formatPercentage(prediction.risk_score)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Confianca
                    </p>
                    <p className="mt-1 text-slate-900">
                      {formatPercentage(prediction.confidence_score)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-sm font-medium text-slate-500">
                    Explicacao
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {prediction.explanation ||
                      'Nenhuma explicacao foi registrada.'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">
              Esta ocorrencia ainda nao possui previsoes da IA.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Alertas relacionados
        </h2>

        {occurrence.alerts?.length > 0 ? (
          <div className="mt-4 space-y-4">
            {occurrence.alerts.map((alert) => (
              <article
                key={alert.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-500">
                      {formatDateTime(alert.created_at)}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {alert.title ?? 'Alerta sem titulo'}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium capitalize ${alertSeverityClasses(
                        alert.severity,
                      )}`}
                    >
                      {alert.severity ?? 'Nao informada'}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium capitalize text-slate-700">
                      {formatStatus(alert.status)}
                    </span>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {alert.description ||
                    'Nenhuma descricao foi informada.'}
                </p>

                <div className="mt-4 grid gap-4 border-t border-slate-100 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Tipo
                    </p>
                    <p className="mt-1 text-sm text-slate-900">
                      {formatStatus(alert.type)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Gerado por
                    </p>
                    <p className="mt-1 text-sm text-slate-900">
                      {alert.generated_by ?? 'Nao informado'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-600">
              Esta ocorrencia ainda nao possui alertas relacionados.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
