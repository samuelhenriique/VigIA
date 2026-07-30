import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../api/client'

export default function EditarViatura() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [regions, setRegions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const [formData, setFormData] = useState({
    region_id: '',
    code: '',
    team_name: '',
    status: 'disponivel',
    patrol_type: '',
    latitude: '',
    longitude: '',
    active: true,
  })

  useEffect(() => {
    let active = true

    async function loadData() {
      try {
        setLoading(true)
        setLoadError('')

        const [vehicleResponse, regionsResponse] =
          await Promise.all([
            api.get(`/vehicles/${id}`),
            api.get('/regions'),
          ])

        if (!active) {
          return
        }

        const vehicle = vehicleResponse.data

        setRegions(
          regionsResponse.data.data ?? regionsResponse.data,
        )

        setFormData({
          region_id: String(vehicle.region_id ?? ''),
          code: vehicle.code ?? '',
          team_name: vehicle.team_name ?? '',
          status: vehicle.status ?? 'disponivel',
          patrol_type: vehicle.patrol_type ?? '',
          latitude: String(vehicle.latitude ?? ''),
          longitude: String(vehicle.longitude ?? ''),
          active: Boolean(vehicle.active),
        })
      } catch (requestError) {
        console.error(requestError)

        if (!active) {
          return
        }

        if (requestError.response?.status === 404) {
          setLoadError(
            'A viatura informada nao foi encontrada.',
          )
        } else {
          setLoadError(
            'Nao foi possivel carregar os dados da viatura.',
          )
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, [id])

  function handleChange(event) {
    const { name, type, value, checked } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setValidationErrors((currentErrors) => {
      const nextErrors = { ...currentErrors }
      delete nextErrors[name]

      return nextErrors
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setSaving(true)
      setSubmitError('')
      setValidationErrors({})

      const payload = {
        region_id:
          formData.region_id === ''
            ? null
            : Number(formData.region_id),
        code: formData.code.trim(),
        team_name: formData.team_name.trim() || null,
        status: formData.status,
        patrol_type: formData.patrol_type.trim() || null,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        active: formData.active,
      }

      await api.put(`/vehicles/${id}`, payload)

      navigate('/viaturas')
    } catch (requestError) {
      console.error(requestError)

      if (requestError.response?.status === 422) {
        setValidationErrors(
          requestError.response.data.errors ?? {},
        )

        setSubmitError(
          'Verifique os campos informados e tente novamente.',
        )
      } else if (requestError.response?.status === 404) {
        setSubmitError(
          'A viatura informada nao foi encontrada.',
        )
      } else {
        setSubmitError(
          'Nao foi possivel atualizar a viatura.',
        )
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-600">
          Carregando dados da viatura...
        </p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div>
        <Link
          to="/viaturas"
          className="text-sm font-medium text-blue-700 hover:text-blue-900"
        >
          Voltar para viaturas
        </Link>

        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-6">
          <h1 className="text-lg font-semibold text-red-800">
            Nao foi possivel editar a viatura
          </h1>

          <p className="mt-2 text-sm text-red-700">
            {loadError}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Link
        to="/viaturas"
        className="text-sm font-medium text-blue-700 hover:text-blue-900"
      >
        Voltar para viaturas
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Editar viatura
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Atualize os dados da viatura selecionada.
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 sm:grid-cols-2"
        >
          <div>
            <label
              htmlFor="code"
              className="text-sm font-medium text-slate-700"
            >
              Codigo
            </label>

            <input
              id="code"
              name="code"
              type="text"
              maxLength={30}
              required
              value={formData.code}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="team_name"
              className="text-sm font-medium text-slate-700"
            >
              Nome da equipe
            </label>

            <input
              id="team_name"
              name="team_name"
              type="text"
              maxLength={100}
              value={formData.team_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="region_id"
              className="text-sm font-medium text-slate-700"
            >
              Regiao
            </label>

            <select
              id="region_id"
              name="region_id"
              value={formData.region_id}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">Sem regiao definida</option>

              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name} - {region.city}/{region.state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="disponivel">
                Disponivel
              </option>

              <option value="em_atendimento">
                Em atendimento
              </option>

              <option value="indisponivel">
                Indisponivel
              </option>

              <option value="manutencao">
                Manutencao
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="patrol_type"
              className="text-sm font-medium text-slate-700"
            >
              Tipo de patrulha
            </label>

            <input
              id="patrol_type"
              name="patrol_type"
              type="text"
              maxLength={60}
              value={formData.patrol_type}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
              <input
                name="active"
                type="checkbox"
                checked={formData.active}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-blue-700"
              />

              Viatura ativa
            </label>
          </div>

          <div>
            <label
              htmlFor="latitude"
              className="text-sm font-medium text-slate-700"
            >
              Latitude
            </label>

            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              min="-90"
              max="90"
              required
              value={formData.latitude}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="longitude"
              className="text-sm font-medium text-slate-700"
            >
              Longitude
            </label>

            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              min="-180"
              max="180"
              required
              value={formData.longitude}
              onChange={handleChange}
              className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 sm:col-span-2">
              <p className="text-sm text-red-700">
                {submitError}
              </p>

              {Object.keys(validationErrors).length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-700">
                  {Object.entries(validationErrors).flatMap(
                    ([field, messages]) =>
                      messages.map((message) => (
                        <li key={`${field}-${message}`}>
                          {message}
                        </li>
                      )),
                  )}
                </ul>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
            <Link
              to="/viaturas"
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? 'Salvando...'
                : 'Salvar alteracoes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}