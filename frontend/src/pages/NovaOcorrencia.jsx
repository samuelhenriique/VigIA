import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/client'

export default function NovaOcorrencia() {
  const navigate = useNavigate()

  const [occurrenceTypes, setOccurrenceTypes] = useState([])
  const [regions, setRegions] = useState([])
  const [loadingOptions, setLoadingOptions] = useState(true)
  const [optionsError, setOptionsError] = useState('')
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const [formData, setFormData] = useState({
    occurrence_type_id: '',
    region_id: '',
    code: '',
    title: '',
    description: '',
    status: 'aberta',
    informed_severity: '1',
    human_priority: '',
    latitude: '',
    longitude: '',
    occurred_at: '',
    response_time_minutes: '',
  })

  useEffect(() => {
    let active = true

    async function loadOptions() {
      try {
        setLoadingOptions(true)
        setOptionsError('')

        const [typesResponse, regionsResponse] = await Promise.all([
          api.get('/occurrence-types'),
          api.get('/regions'),
        ])

        if (active) {
          setOccurrenceTypes(
            typesResponse.data.data ?? typesResponse.data,
          )

          setRegions(
            regionsResponse.data.data ?? regionsResponse.data,
          )
        }
      } catch (error) {
        console.error(error)

        if (active) {
          setOptionsError(
            'Nao foi possivel carregar os tipos e as regioes.',
          )
        }
      } finally {
        if (active) {
          setLoadingOptions(false)
        }
      }
    }

    loadOptions()

    return () => {
      active = false
    }
  }, [])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
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
        occurrence_type_id: Number(formData.occurrence_type_id),
        region_id: Number(formData.region_id),
        code: formData.code.trim(),
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        status: formData.status,
        informed_severity: Number(formData.informed_severity),
        human_priority: formData.human_priority || null,
        latitude: Number(formData.latitude),
        longitude: Number(formData.longitude),
        occurred_at: formData.occurred_at,
        response_time_minutes:
          formData.response_time_minutes === ''
            ? null
            : Number(formData.response_time_minutes),
      }

      const response = await api.post('/occurrences', payload)

      navigate(`/ocorrencias/${response.data.id}`)
    } catch (requestError) {
      console.error(requestError)

      if (requestError.response?.status === 422) {
        setValidationErrors(
          requestError.response.data.errors ?? {},
        )
        setSubmitError(
          'Verifique os campos informados e tente novamente.',
        )
      } else {
        setSubmitError(
          'Nao foi possivel cadastrar a ocorrencia.',
        )
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Link
        to="/ocorrencias"
        className="text-sm font-medium text-blue-700 hover:text-blue-900"
      >
        Voltar para ocorrencias
      </Link>

      <div className="mt-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Nova ocorrencia
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Preencha os dados para cadastrar uma nova ocorrencia.
        </p>
      </div>

      {optionsError && (
        <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {optionsError}
        </p>
      )}

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        {loadingOptions ? (
          <p className="text-sm text-slate-600">
            Carregando dados do formulario...
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="occurrence_type_id"
                className="text-sm font-medium text-slate-700"
              >
                Tipo da ocorrencia
              </label>

              <select
                id="occurrence_type_id"
                name="occurrence_type_id"
                required
                value={formData.occurrence_type_id}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Selecione um tipo</option>

                {occurrenceTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
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
                required
                value={formData.region_id}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Selecione uma regiao</option>

                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name} - {region.city}/{region.state}
                  </option>
                ))}
              </select>
            </div>

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
                placeholder="Ex.: OCO-2026-001"
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="text-sm font-medium text-slate-700"
              >
                Titulo
              </label>

              <input
                id="title"
                name="title"
                type="text"
                maxLength={160}
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Descricao
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
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
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="aberta">Aberta</option>
                <option value="em_atendimento">Em atendimento</option>
                <option value="finalizada">Finalizada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="informed_severity"
                className="text-sm font-medium text-slate-700"
              >
                Gravidade informada
              </label>

              <select
                id="informed_severity"
                name="informed_severity"
                value={formData.informed_severity}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="1">1 - Baixa</option>
                <option value="2">2</option>
                <option value="3">3 - Media</option>
                <option value="4">4</option>
                <option value="5">5 - Critica</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="human_priority"
                className="text-sm font-medium text-slate-700"
              >
                Prioridade humana
              </label>

              <select
                id="human_priority"
                name="human_priority"
                value={formData.human_priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="">Nao definida</option>
                <option value="baixa">Baixa</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Critica</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="occurred_at"
                className="text-sm font-medium text-slate-700"
              >
                Data e hora da ocorrencia
              </label>

              <input
                id="occurred_at"
                name="occurred_at"
                type="datetime-local"
                required
                value={formData.occurred_at}
                onChange={handleChange}
                className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
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

            <div>
              <label
                htmlFor="response_time_minutes"
                className="text-sm font-medium text-slate-700"
              >
                Tempo de resposta em minutos
              </label>

              <input
                id="response_time_minutes"
                name="response_time_minutes"
                type="number"
                min="0"
                value={formData.response_time_minutes}
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
                to="/ocorrencias"
                className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={saving || Boolean(optionsError)}
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Salvando...' : 'Cadastrar ocorrencia'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
